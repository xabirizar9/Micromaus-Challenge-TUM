#include <stdint.h>

static constexpr float PI = 3.141592653589793238462643383279502884;

static constexpr float radPerDegree = PI / 180.f;

static const float encoderTicksToMm = 0.0892497913;

// distance between the wheels in millimeters
static const float wheelDistance = 125.0;

// conversion from mm -> to wheel rotation
static const float mmToRp = 0.0053051648;  // 1 / (2 * PI * 30)

// number of ticks in a full wheel rotation
static const float ticksPerRevolution = 2112.0;

inline float convertMillimetersToRevolutions(int16_t millis) {
	// this depends on wheel size
	return (float)millis * mmToRp;
}

inline float mmsToTicks(float millis) {
	return millis * mmToRp * ticksPerRevolution;
}

inline float convertMMsToTPS(float millis) {
	return convertMillimetersToRevolutions(millis) * ticksPerRevolution;
}
