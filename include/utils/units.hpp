#include <stdint.h>

static constexpr float PI = 3.141592653589793238462643383279502884;

static constexpr float radPerDegree = PI / 180.f;

// sensor offset from maus center‚
static const float leftSensorOffsetY = -53.0;
static const float leftSensorOffsetX = 32.0;

static const float rightSensorOffsetY = -53.0;
static const float rightSensorOffsetX = 32.0;

static const float frontSensorOffsetY = 0.0;
static const float frontSensorOffsetX = 67.0;

static const float encoderTicksToMm = 0.0892497913;

static const float mazeCellSize = 180.0;

// bot measurements:
//  distance between the wheels in millimeters
static const float wheelDistance = 122.0;
static const float InnercurveRadius = 30;
static const float OutercurveRadius = 150;

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

inline bool isWallGiven(float sensor) {
	return (sensor > 0.2) && (sensor < 70);
}
inline bool isSensorValid(float contraSensor) {
	return contraSensor < 55;
}
