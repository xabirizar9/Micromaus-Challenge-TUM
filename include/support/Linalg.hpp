#pragma once

#include <cstdint>
#include <array>
#include <type_traits>

namespace linalg
{

template <typename T>
struct Vec
{
	union {
		std::array<T, 3> buffer;
		struct {
			T x;
			T y;
			T z;
		};
	};
};

template<typename T, typename S>
Vec<std::common_type_t<T, S>> operator*(const Vec<T>& v, const S& t) {
	return {v.x * t, v.y * t, v.z * t};
}

template<typename T, typename S>
Vec<std::common_type_t<T, S>> operator*(const S& t, const Vec<T>& v) {
	return v * t;
}

template<typename T, typename S>
Vec<std::common_type_t<T, S>> operator+(const Vec<T>& v, const Vec<S>& w) {
	return {v.x + w.x, v.y + w.y, v.z + w.z};
}

template<typename T, typename S>
Vec<std::common_type_t<T, S>> operator-(const Vec<T>& v, const Vec<S>& w) {
	return {v.x - w.x, v.y - w.y, v.z - w.z};
}

template<typename T, typename S>
Vec<std::common_type_t<T, S>> operator/(const Vec<T>& v, const S& t) {
	return {v.x / t, v.y / t, v.z / t};
}

}

/*
template<typename T>
linalg::Vec<T> operator+(const linalg::Vec<T>& v, const linalg::Vec<T>& w) {
	return {v.x + w.x, v.y + w.y, v.z + w.z};
}
*/
