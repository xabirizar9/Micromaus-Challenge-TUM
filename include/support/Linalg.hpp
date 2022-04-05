#pragma once

#include <algorithm>
#include <array>
#include <cstdint>
#include <type_traits>

namespace la {

/**
 * Vector class
 * T: number type
 * R: number of Rows
 */
template <typename T, unsigned int R>
struct Vec : public std::array<T, R> {
	Vec() : std::array<T, R>() {}
	Vec(std::array<T, R> l) : std::array<T, R>(l) {}
};

template <typename T, typename S, unsigned int R>
Vec<std::common_type_t<T, S>, R> operator*(const Vec<T, R>& v, const S& t) {
	Vec<std::common_type_t<T, S>, R> out;
	std::transform(v.cbegin(), v.cend(), out.begin(), [t](T in) { return in * t; });
	return std::move(out);
}

template <typename T, typename S, unsigned int R>
Vec<std::common_type_t<T, S>, R> operator*(const S& t, const Vec<T, R>& v) {
	return v * t;
}

template <typename T, typename S, unsigned int R>
Vec<std::common_type_t<T, S>, R> operator+(const Vec<T, R>& v, const Vec<S, R>& w) {
	Vec<std::common_type_t<T, S>, R> out;
	for (unsigned int i = 0; i < R; ++i)
		out[i] = v[i] + w[i];
	return std::move(out);
}

template <typename T, typename S, unsigned int R>
Vec<std::common_type_t<T, S>, R> operator-(const Vec<T, R>& v, const Vec<S, R>& w) {
	Vec<std::common_type_t<T, S>, R> out;
	for (unsigned int i = 0; i < R; ++i)
		out[i] = v[i] - w[i];
	return std::move(out);
}

template <typename T, typename S, unsigned int R>
Vec<std::common_type_t<T, S>, R> operator/(const Vec<T, R>& v, const S& t) {
	Vec<std::common_type_t<T, S>, R> out;
	std::transform(v.cbegin(), v.cend(), out.begin(), [t](T in) { return in / t; });
	return std::move(out);
}

}  // namespace la
