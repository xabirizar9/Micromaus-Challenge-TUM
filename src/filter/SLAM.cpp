#include "filter/SLAM.hpp"

#include <esp_log.h>
#include <esp_timer.h>

static const char* TAG = "SLAM";

SLAM::SLAM() : lastUpdateTime(esp_timer_get_time()) {}

void SLAM::predict(float leftVelocity, float rightVelocity) {
	const unsigned long long now = esp_timer_get_time();
	const float delT = ((now - lastUpdateTime) / 1000ULL) / 1000.f;
	location.predict(leftVelocity, rightVelocity, delT);
	lastUpdateTime = now;
}
