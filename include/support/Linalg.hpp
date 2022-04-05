#pragma once

#include <algorithm>
#include <array>
#include <cstdint>
#include <type_traits>

namespace la {

template <typename T, unsigned int R, unsigned int C>
struct Mat {
	std::array<T, R * C> data;

	constexpr Mat() : data() {}
	constexpr Mat(const std::array<T, R * C>& l) : data(l) {}

	T& at(unsigned int r, unsigned int c) {
		return data.at(r * C + c);
	}

	const T& at(unsigned int r, unsigned int c) const {
		return data.at(r * C + c);
	}
};

template <typename T, unsigned int R>
struct Vec : public Mat<T, R, 1> {
	using Mat<T, R, 1>::Mat;

	constexpr Vec(const Mat<T, R, 1>& m) : Mat<T, R, 1>(m.data) {}

	T& at(unsigned int r) {
		return Mat<T, R, 1>::at(r, 1);
	}

	const T& at(unsigned int r) const {
		return Mat<T, R, 1>::at(r, 1);
	}
};

// Matrix-Scalar operations
template <typename T, typename S, unsigned int R, unsigned int C>
Mat<std::common_type_t<T, S>, R, C> operator*(const Mat<T, R, C>& v, const S& t) {
	Mat<std::common_type_t<T, S>, R, C> out;
	std::transform(v.data.cbegin(), v.data.cend(), out.data.begin(), [t](T in) { return in * t; });
	return std::move(out);
}

template <typename T, typename S, unsigned int R, unsigned int C>
Mat<std::common_type_t<T, S>, R, C> operator*(const S& t, const Mat<T, R, C>& v) {
	return v * t;
}

template <typename T, typename S, unsigned int R, unsigned int C>
Mat<std::common_type_t<T, S>, R, C> operator+(const Mat<T, R, C>& v, const Mat<S, R, C>& w) {
	Mat<std::common_type_t<T, S>, R, C> out;
	for (unsigned int i = 0; i < R * C; ++i)
		out.data[i] = v.data[i] + w.data[i];
	return std::move(out);
}

template <typename T, typename S, unsigned int R, unsigned int C>
Mat<std::common_type_t<T, S>, R, C> operator-(const Mat<T, R, C>& v, const Mat<S, R, C>& w) {
	Mat<std::common_type_t<T, S>, R, C> out;
	for (unsigned int i = 0; i < R * C; ++i)
		out.data[i] = v.data[i] - w.data[i];
	return std::move(out);
}

template <typename T, typename S, unsigned int R, unsigned int C>
Mat<std::common_type_t<T, S>, R, C> operator/(const Mat<T, R, C>& v, const S& t) {
	Mat<std::common_type_t<T, S>, R, C> out;
	std::transform(v.data.cbegin(), v.data.cend(), out.data.begin(), [t](T in) { return in / t; });
	return std::move(out);
}

}  // namespace la
