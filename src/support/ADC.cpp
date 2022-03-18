#include "support/ADC.hpp"

#include <driver/adc.h>
#include <esp_adc_cal.h>
#include <esp_log.h>

#include <exception>

static const char* TAG = "adc";
static const adc_bits_width_t ADC1_BIT_WIDTH = ADC_WIDTH_MAX;
static const adc_bits_width_t ADC2_BIT_WIDTH = ADC_WIDTH_MAX;

class InvalidADC1Channel : public std::exception {
   public:
	const char* what() const noexcept override {
		return "ADC1 does not have a cannel for the pin you requested";
	}
};

ADC1::ADC1() : characteristics(new esp_adc_cal_characteristics_t()) {
	adc1_config_width(ADC1_BIT_WIDTH);
	esp_err_t ok = esp_adc_cal_check_efuse(ESP_ADC_CAL_VAL_EFUSE_VREF);
	if (ok == ESP_OK) {
		ESP_LOGI(TAG, "ADC has VREF calibration data in eFuse");
	} else if (ok == ESP_ERR_NOT_SUPPORTED) {
		ESP_LOGW(TAG, "ADC does not have VREF calibration data in eFuse");
	}
	ok = esp_adc_cal_check_efuse(ESP_ADC_CAL_VAL_EFUSE_TP);
	if (ok == ESP_OK) {
		ESP_LOGI(TAG, "ADC has TP calibration data in eFuse");
	} else if (ok == ESP_ERR_NOT_SUPPORTED) {
		ESP_LOGW(TAG, "ADC does not have TP calibration data in eFuse");
	}

	esp_adc_cal_characteristics_t* c =
		reinterpret_cast<esp_adc_cal_characteristics_t*>(characteristics);
	esp_adc_cal_value_t mode =
		esp_adc_cal_characterize(ADC_UNIT_1, ADC_ATTEN_DB_11, ADC1_BIT_WIDTH, 1100, c);
	if (mode == ESP_ADC_CAL_VAL_EFUSE_VREF) {
		ESP_LOGI(TAG, "ADC1 characterized by eFuse VREF");
	} else if (mode == ESP_ADC_CAL_VAL_EFUSE_TP) {
		ESP_LOGI(TAG, "ADC1 characterized by eFuse TP");
	} else if (mode == ESP_ADC_CAL_VAL_DEFAULT_VREF) {
		ESP_LOGI(TAG, "ADC1 characterized by default VREF");
	}

	ESP_LOGI(TAG,
			 "ADC1 characteristics: a = %u, b = %u, vref=%umV data %p %p",
			 c->coeff_a,
			 c->coeff_b,
			 c->vref,
			 c->low_curve,
			 c->high_curve);
}

ADC1::~ADC1() {
	delete reinterpret_cast<esp_adc_cal_characteristics_t*>(characteristics);
}

static adc1_channel_t adc1GetChannelByGPIONumber(uint8_t n) {
	// TODO this only works on S2
	if (n < 1 || n > 10) {
		throw InvalidADC1Channel();
	}
	// these are consecutive in an enum
	return static_cast<adc1_channel_t>(static_cast<uint8_t>(ADC1_CHANNEL_0) + (n - 1));
}

ADCChannel ADC1::configurePin(uint8_t pin) {
	return configureChannel(adc1GetChannelByGPIONumber(pin));
}

ADCChannel ADC1::configureChannel(adc1_channel_t channel) {
	adc1_config_channel_atten(channel, ADC_ATTEN_DB_11);
	return ADCChannel(channel);
}

int ADC1::read(uint8_t ch) {
	int v = adc1_get_raw((adc1_channel_t)ch);
	if (v < 0)	// error value
		return v;

	uint32_t mVolts = esp_adc_cal_raw_to_voltage(
		v, reinterpret_cast<esp_adc_cal_characteristics_t*>(characteristics));
	return mVolts;
}

int ADCChannel::read() {
	return ADC1::instance().read(channel);
}
