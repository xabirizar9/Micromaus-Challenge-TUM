#include "net/WifiCommunicator.hpp"

#include <stdbool.h>
#include <stdint.h>
#include <stdio.h>
#include <string.h>

#include "Credentials.h"
#include "esp_event.h"
#include "esp_log.h"
#include "esp_netif.h"
#include "esp_system.h"
#include "esp_wifi.h"
#include "esp_wifi_default.h"
#include "freertos/FreeRTOS.h"
#include "freertos/event_groups.h"
#include "freertos/message_buffer.h"
#include "freertos/queue.h"
#include "freertos/semphr.h"
#include "freertos/task.h"
#include "lwip/err.h"
#include "lwip/netdb.h"
#include "lwip/sockets.h"
#include "lwip/sys.h"
#include "mdns.h"
#include "message.pb.h"
#include "net/NetController.hpp"
#include "nvs.h"
#include "nvs_flash.h"
#include "pb_decode.h"
#include "pb_encode.h"
#include "periph/Led.hpp"

// only include enterprise connection if credentials present
#ifdef USE_802_1x
#include "esp_wpa2.h"
#endif

/* The examples use WiFi configuration that you can set via project configuration menu
   If you'd rather not, just change the below entries to strings with
   the config you want - ie #define EXAMPLE_WIFI_SSID "mywifissid"
*/
#define WIFI_CHANNEL 11
#define PORT 8888

#define STA_MODE

static const char *TAG = "[WIFI]";

static esp_ip4_addr_t s_ip_addr;

QueueHandle_t cmdSenderQueue;
MessageBufferHandle_t cmdReceiverMsgBuffer;
TaskHandle_t senderTaskHandle;

static SemaphoreHandle_t s_semph_get_ip_addrs;

/**
 * @brief Checks the netif description if it contains specified prefix.
 * All netifs created withing common connect component are prefixed with the module TAG,
 * so it returns true if the specified netif is owned by this module
 */
static bool is_our_netif(const char *prefix, esp_netif_t *netif) {
	return strncmp(prefix, esp_netif_get_desc(netif), strlen(prefix) - 1) == 0;
}

void start_mdns_service() {
	// initialize mDNS service
	esp_err_t err = mdns_init();
	if (err) {
		printf("MDNS Init failed: %d\n", err);
		return;
	}

	// set hostname
	mdns_hostname_set("waxn-maus");
	// set default instance
	mdns_instance_name_set("WAXN Micromaus v7");

	mdns_service_port_set("_robo", "_udp", 8888);
}

static void on_got_ip(void *arg, esp_event_base_t event_base, int32_t event_id, void *event_data) {
	ip_event_got_ip_t *event = (ip_event_got_ip_t *)event_data;
	if (!is_our_netif(TAG, event->esp_netif)) {
		ESP_LOGW(TAG,
				 "Got IPv4 from another interface \"%s\": ignored",
				 esp_netif_get_desc(event->esp_netif));
		return;
	}
	ESP_LOGI(TAG,
			 "Got IPv4 event: Interface \"%s\" address: " IPSTR,
			 esp_netif_get_desc(event->esp_netif),
			 IP2STR(&event->ip_info.ip));
	memcpy(&s_ip_addr, &event->ip_info.ip, sizeof(s_ip_addr));
	xSemaphoreGive(s_semph_get_ip_addrs);
}

static void wifi_event_handler(void *arg,
							   esp_event_base_t event_base,
							   int32_t event_id,
							   void *event_data) {
	switch (event_id) {
#ifdef AP_MODE
		case WIFI_EVENT_AP_STACONNECTED: {
			wifi_event_ap_staconnected_t *event = (wifi_event_ap_staconnected_t *)event_data;
			ESP_LOGI(TAG, "station " MACSTR " join, AID=%d", MAC2STR(event->mac), event->aid);
			return;
		}
		case WIFI_EVENT_AP_STADISCONNECTED: {
			wifi_event_ap_stadisconnected_t *event = (wifi_event_ap_stadisconnected_t *)event_data;
			ESP_LOGI(TAG, "station " MACSTR " leave, AID=%d", MAC2STR(event->mac), event->aid);
			return;
		}
#else
		case WIFI_EVENT_STA_CONNECTED: {
			wifi_event_sta_connected_t *event = (wifi_event_sta_connected_t *)event_data;
			ESP_LOGI(TAG, "ssid " MACSTR " join, BSSID=%s", MAC2STR(event->ssid), event->bssid);
			return;
		}
		case WIFI_EVENT_STA_DISCONNECTED: {
			wifi_event_sta_disconnected_t *event = (wifi_event_sta_disconnected_t *)event_data;
			ESP_LOGI(TAG,
					 "bssid " MACSTR " leave, SSID=%s, reason=%d",
					 MAC2STR(event->bssid),
					 event->ssid,
					 event->reason);
			return;
		}
#endif
	}
}
static esp_netif_t *setupWifi(void) {
	char *desc;
	esp_netif_inherent_config_t esp_netif_config = ESP_NETIF_INHERENT_DEFAULT_WIFI_STA();
	// Prefix the interface description with the module TAG
	// Warning: the interface desc is used in tests to capture actual connection details (IP, gw,
	// mask)
	asprintf(&desc, "%s: %s", TAG, esp_netif_config.if_desc);
	esp_netif_config.if_desc = desc;
	esp_netif_config.route_prio = 128;
	esp_netif_t *netif = esp_netif_create_wifi(WIFI_IF_STA, &esp_netif_config);
	free(desc);

#ifdef AP_MODE
	esp_wifi_set_default_wifi_ap_handlers();
#else
	esp_wifi_set_default_wifi_sta_handlers();
#endif
	wifi_init_config_t cfg = WIFI_INIT_CONFIG_DEFAULT();
	ESP_ERROR_CHECK(esp_wifi_init(&cfg));

	ESP_ERROR_CHECK(esp_event_handler_instance_register(
		WIFI_EVENT, ESP_EVENT_ANY_ID, &wifi_event_handler, NULL, NULL));

	ESP_ERROR_CHECK(
		esp_event_handler_instance_register(IP_EVENT, ESP_EVENT_ANY_ID, &on_got_ip, NULL, NULL));

	// TODO: switch to FLASH after config is stable
	ESP_ERROR_CHECK(esp_wifi_set_storage(WIFI_STORAGE_RAM));
	wifi_config_t wifi_config = {};
#ifdef AP_MODE
	wifi_ap_config_t wifi_ap_config = {};
	strcpy((char *)wifi_ap_config.ssid, WIFI_SSID);
	strcpy((char *)wifi_ap_config.password, WIFI_PW);
	wifi_ap_config.channel = WIFI_CHANNEL;
	wifi_ap_config.max_connection = 1;
	wifi_ap_config.authmode = WIFI_AUTH_WPA_WPA2_PSK;
	wifi_config.ap = wifi_ap_config;
	ESP_ERROR_CHECK(esp_wifi_set_mode(WIFI_MODE_AP));
	ESP_ERROR_CHECK(esp_wifi_set_config(WIFI_IF_AP, &wifi_config));
#else
#ifdef USE_802_1x
	wifi_sta_config_t wifi_sta_config = {};
	strcpy((char *)wifi_sta_config.ssid, WIFI_SSID);
	wifi_sta_config.pmf_cfg.required = false;

	wifi_config.sta = wifi_sta_config;
	ESP_ERROR_CHECK(esp_wifi_set_mode(WIFI_MODE_STA));
	ESP_ERROR_CHECK(esp_wifi_set_config(WIFI_IF_STA, &wifi_config));

	ESP_ERROR_CHECK(
		esp_wifi_sta_wpa2_ent_set_username((uint8_t *)WIFI_IDENTITY, strlen(WIFI_IDENTITY)));
	ESP_ERROR_CHECK(esp_wifi_sta_wpa2_ent_set_password((uint8_t *)WIFI_PW, strlen(WIFI_PW)));

	ESP_ERROR_CHECK(esp_wifi_sta_wpa2_ent_enable());  // set config settings to enable function
#else
	wifi_sta_config_t wifi_sta_config = {};
	strcpy((char *)wifi_sta_config.ssid, WIFI_SSID);
	strcpy((char *)wifi_sta_config.password, WIFI_PW);

	// wifi_sta_config.channel = WIFI_CHANNEL;
	wifi_sta_config.pmf_cfg.required = false;
	wifi_sta_config.threshold.authmode = WIFI_AUTH_OPEN;
	wifi_config.sta = wifi_sta_config;
	ESP_ERROR_CHECK(esp_wifi_set_mode(WIFI_MODE_STA));
	ESP_ERROR_CHECK(esp_wifi_set_config(WIFI_IF_STA, &wifi_config));
#endif	// END USE_802_1x
#endif	// END AP/STA MODE
	ESP_ERROR_CHECK(esp_wifi_start());

#ifndef AP_MODE
	esp_wifi_connect();
#endif

	ESP_LOGI(TAG,
			 "wifi_init_softap finished. SSID:%s password:%s channel:%d",
			 WIFI_SSID,
			 WIFI_PW,
			 WIFI_CHANNEL);

	return netif;
}

static void udpReceiverTask(void *pvParameters) {
	uint8_t rx_buffer[256];

	UdpCommunicator *com = WifiCommunicator::getInstance().com;
	MessageBufferHandle_t msgBuf = WifiCommunicator::getInstance().getCmdReceiverMsgBuffer();

	while (true) {
		int len = com->read(rx_buffer, sizeof(rx_buffer));
		// Error occurred during receiving
		if (len < 0) {
			ESP_LOGE(TAG, "recvfrom failed: errno %d", errno);
			break;
		}

		// Data received
		else {
			ESP_LOGI(TAG, "read %d bytes", len);
			xMessageBufferSend(msgBuf, rx_buffer, len, 0);
		}
	}

	vTaskDelete(NULL);
}

static void udpSenderTask(void *pvParameters) {
	uint8_t rx_buffer[128];
	uint16_t msgLen = 0;
	UdpCommunicator *com = WifiCommunicator::getInstance().com;
	MessageBufferHandle_t msgBuf = WifiCommunicator::getInstance().getCmdSenderMsgBuffer();

	while (true) {
		msgLen = xMessageBufferReceive(msgBuf, rx_buffer, sizeof(rx_buffer), 0);
		if (msgLen == 0) {
			// ESP_LOGI(tag, "queue empty");
			vTaskDelay(pdMS_TO_TICKS(20));
			continue;
		}
		// ESP_LOGI(TAG, "Waiting for data");
		int len = com->write(rx_buffer, msgLen);

		// Error occurred during receiving
		if (len != msgLen) {
			ESP_LOGE(TAG, "write failed %d!=%d", len, msgLen);
			continue;
		}
		// Data received
		else {}
	}

	vTaskDelete(NULL);
}

UdpCommunicator::UdpCommunicator(uint16_t port) {
	int addr_family = AF_INET;
	int ip_protocol = IPPROTO_IP;
	ESP_LOGI(TAG, "Socket created 1");
	struct sockaddr_in dest_addr = {};

	dest_addr.sin_addr.s_addr = htonl(INADDR_ANY);
	dest_addr.sin_family = AF_INET;
	dest_addr.sin_port = htons(port);
	ip_protocol = IPPROTO_IP;

	this->sock = socket(addr_family, SOCK_DGRAM, ip_protocol);
	ESP_LOGI(TAG, "6");
	if (sock < 0) {
		ESP_LOGE(TAG, "Unable to create socket: errno %d", errno);
		vTaskDelete(NULL);
		return;
	}
	ESP_LOGI(TAG, "Socket created");

	int err = bind(sock, (struct sockaddr *)&dest_addr, sizeof(dest_addr));
	if (err < 0) {
		ESP_LOGE(TAG, "Socket unable to bind: errno %d", errno);
		return;
	}
	ESP_LOGI(TAG, "Socket bound, port %d", PORT);
};

int UdpCommunicator::read(uint8_t *buf, size_t bufLen) {
	ESP_LOGI(TAG, "reading data");
	return recvfrom(
		this->sock, buf, bufLen, 0, (struct sockaddr *)&this->sourceAddr, &this->socklen);
};

int UdpCommunicator::write(uint8_t *buf, size_t msgLen) {
	// Get the sender's ip address as string
	inet_ntoa_r(((struct sockaddr_in *)&this->sourceAddr)->sin_addr,
				this->addrTmp,
				sizeof(this->addrTmp) - 1);
	// ESP_LOGI(TAG, "Sending %d bytes to %s:", msgLen, this->addrTmp);

	return sendto(
		sock, buf, msgLen, 0, (struct sockaddr *)&this->sourceAddr, sizeof(this->sourceAddr));
};

WifiCommunicator::WifiCommunicator() {
	LedController led1 = LedController((gpio_num_t)4);
	led1.startBlinking(400);

	s_semph_get_ip_addrs = xSemaphoreCreateCounting(1, 0);
	ESP_ERROR_CHECK(nvs_flash_init());
	ESP_ERROR_CHECK(esp_netif_init());
	ESP_ERROR_CHECK(esp_event_loop_create_default());

	ESP_LOGI(TAG, "setting up wifi");
	setupWifi();

	// wait for ip
	xSemaphoreTake(s_semph_get_ip_addrs, portMAX_DELAY);

	this->com = new UdpCommunicator();

	start_mdns_service();
	xTaskCreate(udpReceiverTask, "udpReceiverTask", 4096, (void *)AF_INET, 3, NULL);
	xTaskCreate(udpSenderTask, "udpSenderTask", 4096, (void *)AF_INET, 3, NULL);

	led1.set(false);
}

WifiCommunicator::~WifiCommunicator() {}
