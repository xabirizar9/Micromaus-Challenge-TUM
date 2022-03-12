#include <stdint.h>
#include <string.h>
#include <stdbool.h>
#include <stdio.h>
#include "freertos/FreeRTOS.h"
#include "freertos/queue.h"
#include "freertos/task.h"
#include "nvs.h"
#include "nvs_flash.h"
#include "esp_log.h"
#include "esp_bt.h"
#include "esp_bt_main.h"
#include "esp_gap_bt_api.h"
#include "esp_bt_device.h"
#include "esp_spp_api.h"

#include "pb_decode.h"
#include "pb_encode.h"
#include "message.pb.h"

#include "periph/BluetoothCore.hpp"

#define BT_CORE_TAG "BT_CORE"
#define SPP_SERVER_NAME "MAUS_SPP_SERVER"
#define EXAMPLE_DEVICE_NAME "MAUS_BT_SERIAL"

using namespace BluetoothCore;

/**
 * method stubs for low level bluetooth functions
 */
bool prepareBtStack();
static void btSppCallback(esp_spp_cb_event_t event, esp_spp_cb_param_t *param);
static void btGapCallback(esp_bt_gap_cb_event_t event, esp_bt_gap_cb_param_t *param);
static char *btAddrToStr(uint8_t *bda, char *str, size_t size);

static struct timeval time_new, time_old;
static const esp_spp_mode_t esp_spp_mode = ESP_SPP_MODE_CB;

static const esp_spp_sec_t sec_mask = ESP_SPP_SEC_AUTHENTICATE;
static const esp_spp_role_t role_slave = ESP_SPP_ROLE_SLAVE;

bool setupCompleted = false;
bool sppActive = false;

uint32_t btSppHandle = 0;

QueueHandle_t cmdSenderQueue;
QueueHandle_t cmdReceiverQueue;
void (*incomingMessageHandler)(MausIncomingMessage *);

static bool processIncomingMessage(esp_spp_cb_param_t *param)
{
    if (!sppActive)
    {
        return false;
    }

    ESP_LOGI(BT_CORE_TAG, "ESP_SPP_DATA_IND_EVT len:%d handle:%d",
             param->data_ind.len, param->data_ind.handle);
    if (param->data_ind.len < 128)
    {
        esp_log_buffer_hex("", param->data_ind.data, param->data_ind.len);
    }

    xQueueSend(cmdReceiverQueue, param->data_ind.data, param->data_ind.len);
    return true;
}

/**
 * @brief
 *
 * @param handler
 * @return true
 * @return false
 */
static void btSppCallback(esp_spp_cb_event_t event, esp_spp_cb_param_t *param)
{
    char bda_str[18] = {0};

    switch (event)
    {
    case ESP_SPP_INIT_EVT:
        if (param->init.status == ESP_SPP_SUCCESS)
        {
            ESP_LOGI(BT_CORE_TAG, "ESP_SPP_INIT_EVT");
            esp_spp_start_srv(sec_mask, role_slave, 0, SPP_SERVER_NAME);
        }
        else
        {
            ESP_LOGE(BT_CORE_TAG, "ESP_SPP_INIT_EVT status:%d", param->init.status);
        }
        break;
    case ESP_SPP_DISCOVERY_COMP_EVT:
        ESP_LOGI(BT_CORE_TAG, "ESP_SPP_DISCOVERY_COMP_EVT");
        break;
    case ESP_SPP_OPEN_EVT:
        ESP_LOGE(BT_CORE_TAG, "ESP_SPP_OPEN_EVT status:%d", param->open.status);
        break;
    case ESP_SPP_CLOSE_EVT:
        ESP_LOGI(BT_CORE_TAG, "ESP_SPP_CLOSE_EVT status:%d handle:%d close_by_remote:%d", param->close.status,
                 param->close.handle, param->close.async);
        sppActive = false;
        break;
    case ESP_SPP_START_EVT:
        if (param->start.status == ESP_SPP_SUCCESS)
        {
            ESP_LOGI(BT_CORE_TAG, "ESP_SPP_START_EVT handle:%d sec_id:%d scn:%d", param->start.handle, param->start.sec_id,
                     param->start.scn);
            esp_bt_dev_set_device_name(EXAMPLE_DEVICE_NAME);
            esp_bt_gap_set_scan_mode(ESP_BT_CONNECTABLE, ESP_BT_GENERAL_DISCOVERABLE);

            // store handle for later use
            btSppHandle = param->start.handle;
        }
        else
        {
            ESP_LOGE(BT_CORE_TAG, "ESP_SPP_START_EVT status:%d", param->start.status);
        }
        break;
    case ESP_SPP_CL_INIT_EVT:
        ESP_LOGI(BT_CORE_TAG, "ESP_SPP_CL_INIT_EVT");
        break;
    case ESP_SPP_DATA_IND_EVT:
        processIncomingMessage(param);
        break;
    case ESP_SPP_CONG_EVT:
        ESP_LOGI(BT_CORE_TAG, "ESP_SPP_CONG_EVT");
        break;
    case ESP_SPP_WRITE_EVT:
        ESP_LOGI(BT_CORE_TAG, "ESP_SPP_WRITE_EVT len=%d cong=%d", param->write.len, param->write.cong);
        break;
    case ESP_SPP_SRV_OPEN_EVT:
        ESP_LOGI(BT_CORE_TAG, "ESP_SPP_SRV_OPEN_EVT");
        sppActive = true;
        break;
    case ESP_SPP_SRV_STOP_EVT:
        ESP_LOGI(BT_CORE_TAG, "ESP_SPP_SRV_STOP_EVT");
        break;
    case ESP_SPP_UNINIT_EVT:
        ESP_LOGI(BT_CORE_TAG, "ESP_SPP_UNINIT_EVT");
        break;
    default:
        break;
    }
}

static void btGapCallback(esp_bt_gap_cb_event_t event, esp_bt_gap_cb_param_t *param)
{
    char bda_str[18] = {0};

    switch (event)
    {
    case ESP_BT_GAP_AUTH_CMPL_EVT:
    {
        if (param->auth_cmpl.stat == ESP_BT_STATUS_SUCCESS)
        {
            ESP_LOGI(BT_CORE_TAG, "authentication success: %s bda:[%s]", param->auth_cmpl.device_name,
                     btAddrToStr(param->auth_cmpl.bda, bda_str, sizeof(bda_str)));
        }
        else
        {
            ESP_LOGE(BT_CORE_TAG, "authentication failed, status:%d", param->auth_cmpl.stat);
        }
        break;
    }
    case ESP_BT_GAP_PIN_REQ_EVT:
    {
        ESP_LOGI(BT_CORE_TAG, "ESP_BT_GAP_PIN_REQ_EVT min_16_digit:%d", param->pin_req.min_16_digit);
        if (param->pin_req.min_16_digit)
        {
            ESP_LOGI(BT_CORE_TAG, "Input pin code: 0000 0000 0000 0000");
            esp_bt_pin_code_t pin_code = {0};
            esp_bt_gap_pin_reply(param->pin_req.bda, true, 16, pin_code);
        }
        else
        {
            ESP_LOGI(BT_CORE_TAG, "Input pin code: 1234");
            esp_bt_pin_code_t pin_code;
            pin_code[0] = '1';
            pin_code[1] = '2';
            pin_code[2] = '3';
            pin_code[3] = '4';
            esp_bt_gap_pin_reply(param->pin_req.bda, true, 4, pin_code);
        }
        break;
    }

#if (CONFIG_BT_SSP_ENABLED == true)
    case ESP_BT_GAP_CFM_REQ_EVT:
        ESP_LOGI(BT_CORE_TAG, "ESP_BT_GAP_CFM_REQ_EVT Please compare the numeric value: %d", param->cfm_req.num_val);
        esp_bt_gap_ssp_confirm_reply(param->cfm_req.bda, true);
        break;
    case ESP_BT_GAP_KEY_NOTIF_EVT:
        ESP_LOGI(BT_CORE_TAG, "ESP_BT_GAP_KEY_NOTIF_EVT passkey:%d", param->key_notif.passkey);
        break;
    case ESP_BT_GAP_KEY_REQ_EVT:
        ESP_LOGI(BT_CORE_TAG, "ESP_BT_GAP_KEY_REQ_EVT Please enter passkey!");
        break;
#endif

    case ESP_BT_GAP_MODE_CHG_EVT:
        ESP_LOGI(BT_CORE_TAG, "ESP_BT_GAP_MODE_CHG_EVT mode:%d bda:[%s]", param->mode_chg.mode,
                 btAddrToStr(param->mode_chg.bda, bda_str, sizeof(bda_str)));
        break;

    default:
    {
        ESP_LOGI(BT_CORE_TAG, "event: %d", event);
        break;
    }
    }
    return;
}

bool bluetoothEspSetup()
{

    esp_err_t ret = nvs_flash_init();
    if (ret == ESP_ERR_NVS_NO_FREE_PAGES || ret == ESP_ERR_NVS_NEW_VERSION_FOUND)
    {
        ESP_ERROR_CHECK(nvs_flash_erase());
        ret = nvs_flash_init();
    }
    ESP_ERROR_CHECK(ret);
    esp_bt_controller_mem_release(ESP_BT_MODE_BLE);

    esp_bt_controller_config_t bt_cfg = BT_CONTROLLER_INIT_CONFIG_DEFAULT();
    if ((ret = esp_bt_controller_init(&bt_cfg)) != ESP_OK)
    {
        ESP_LOGE(BT_CORE_TAG, "%s initialize controller failed: %s\n", __func__, esp_err_to_name(ret));
        return false;
    }

    if ((ret = esp_bt_controller_enable(ESP_BT_MODE_CLASSIC_BT)) != ESP_OK)
    {
        ESP_LOGE(BT_CORE_TAG, "%s enable controller failed: %s\n", __func__, esp_err_to_name(ret));
        return false;
    }

    if ((ret = esp_bluedroid_init()) != ESP_OK)
    {
        ESP_LOGE(BT_CORE_TAG, "%s initialize bluedroid failed: %s\n", __func__, esp_err_to_name(ret));
        return false;
    }

    if ((ret = esp_bluedroid_enable()) != ESP_OK)
    {
        ESP_LOGE(BT_CORE_TAG, "%s enable bluedroid failed: %s\n", __func__, esp_err_to_name(ret));
        return false;
    }

    if ((ret = esp_bt_gap_register_callback(btGapCallback)) != ESP_OK)
    {
        ESP_LOGE(BT_CORE_TAG, "%s gap register failed: %s\n", __func__, esp_err_to_name(ret));
        return false;
    }

    if ((ret = esp_spp_register_callback(btSppCallback)) != ESP_OK)
    {
        ESP_LOGE(BT_CORE_TAG, "%s spp register failed: %s\n", __func__, esp_err_to_name(ret));
        return false;
    }

    if ((ret = esp_spp_init(esp_spp_mode)) != ESP_OK)
    {
        ESP_LOGE(BT_CORE_TAG, "%s spp init failed: %s\n", __func__, esp_err_to_name(ret));
        return false;
    }
    return true;

    // just use secure default paring
    /* Set default parameters for Secure Simple Pairing */
    esp_bt_sp_param_t param_type = ESP_BT_SP_IOCAP_MODE;
    esp_bt_io_cap_t iocap = ESP_BT_IO_CAP_IO;
    esp_bt_gap_set_security_param(param_type, &iocap, sizeof(uint8_t));

    /*
     * Set default parameters for Legacy Pairing
     * Use variable pin, input pin code when pairing
     */
    esp_bt_pin_type_t pin_type = ESP_BT_PIN_TYPE_VARIABLE;
    esp_bt_pin_code_t pin_code;
    esp_bt_gap_set_pin(pin_type, 0, pin_code);

    // ESP_LOGI(BT_CORE_TAG, "Own address:[%s]", btAddrToStr((uint8_t *)esp_bt_dev_get_address(), bda_str, sizeof(bda_str)));

    return true;
}

void senderTask(void *pvParameter)
{
    uint8_t encoderBuffer[256];
    bool encodeStatus;
    MausOutgoingMessage msg;
    pb_ostream_t stream;
    uint8_t test = 'c';
    while (true)
    {
        // if SPP is not active yet wait for it
        if (!sppActive)
        {
            vTaskDelay(1000 / portTICK_PERIOD_MS);
            continue;
        }

        // esp_spp_cb_param_t *param = (esp_spp_cb_param_t *)pvParameter;
        if (cmdSenderQueue == NULL)
        {
            ESP_LOGI(BT_CORE_TAG, "not initialized");
            continue;
        }
        if (!xQueueReceive(cmdSenderQueue, &msg, 0))
        {
            continue;
        }

        stream = pb_ostream_from_buffer(encoderBuffer, sizeof(encoderBuffer));

        if (!pb_encode(&stream, MausOutgoingMessage_fields, &msg))
        {
            ESP_LOGI(BT_CORE_TAG, "failed to encode: %s\n", PB_GET_ERROR(&stream));
            continue;
        }

        // reset stream to start of buffer
        esp_spp_write(btSppHandle, 1, &test); // stream.bytes_written, stream.state);

        ESP_LOGI(BT_CORE_TAG, "writing %d", stream.bytes_written);
    }
}

void receiverTask(void *pvParameter)
{
    uint8_t buf[256];
    MausIncomingMessage msg;
    // Read in buffer
    pb_istream_t istream;
    while (true)

    {
        if (!sppActive)
        {
            vTaskDelay(1000 / portTICK_PERIOD_MS);
            continue;
        }

        if (cmdReceiverQueue == NULL)
        {
            ESP_LOGI(BT_CORE_TAG, "not initialized");
            continue;
        }
        if (xQueueReceive(cmdReceiverQueue, &buf, 0))
        {
            continue;
        }
        pb_istream_from_buffer((pb_byte_t *)buf, sizeof(MausIncomingMessage));

        if (!pb_decode(&istream, MausIncomingMessage_fields, &msg))
        {
            ESP_LOGE(BT_CORE_TAG, "failed to decode: %s", PB_GET_ERROR(&istream));
            continue;
        }

        incomingMessageHandler(&msg);
    }
}

bool BluetoothCore::setup(void (*handler)(MausIncomingMessage *))
{
    if (setupCompleted)
    {
        ESP_LOGE(BT_CORE_TAG, "setup already completed");
        return false;
    }

    cmdSenderQueue = xQueueCreate(10, sizeof(MausOutgoingMessage));
    cmdReceiverQueue = xQueueCreate(10, sizeof(MausIncomingMessage));

    // setup incoming message handler
    incomingMessageHandler = handler;

    // setup sender thread
    xTaskCreate(senderTask, "senderTask", 2048, NULL, 5, NULL);
    // setup receiver thread
    xTaskCreate(receiverTask, "receiverTask", 2048, NULL, 5, NULL);

    if (!bluetoothEspSetup())
    {
        return false;
    }

    setupCompleted = true;
    return true;
}

/**
 * Utils
 */

static char *btAddrToStr(uint8_t *bda, char *str, size_t size)
{
    if (bda == NULL || str == NULL || size < 18)
    {
        return NULL;
    }

    uint8_t *p = bda;
    sprintf(str, "%02x:%02x:%02x:%02x:%02x:%02x",
            p[0], p[1], p[2], p[3], p[4], p[5]);
    return str;
}
