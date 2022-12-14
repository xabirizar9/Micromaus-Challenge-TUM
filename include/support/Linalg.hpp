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

	Mat<T, R, C>& operator=(const std::array<T, R * C>& r) {
		data = r;
		return *this;
	}

	T& at(unsigned int r, unsigned int c) {
		return data.at(r * C + c);
	}

	const T& at(unsigned int r, unsigned int c) const {
		return data.at(r * C + c);
	}

	Mat<T, C, R> trans() const {
		Mat<T, C, R> out;
		for (unsigned int c = 0; c < C; ++c) {
			for (unsigned int r = 0; r < R; ++r) {
				out.at(c, r) = at(r, c);
			}
		}
		return std::move(out);
	}

	template <bool ON = (C == 1) && (R > 0)>
	std::enable_if_t<ON, T&> x() {
		return data[0];
	}

	template <bool ON = (C == 1) && (R > 0)>
	const std::enable_if_t<ON, T&> x() const {
		return data[0];
	}

	template <bool ON = (C == 1) && (R > 1)>
	std::enable_if_t<ON, T&> y() {
		return data[1];
	}

	template <bool ON = (C == 1) && (R > 1)>
	const std::enable_if_t<ON, T&> y() const {
		return data[1];
	}

	template <bool ON = (C == 1) && (R > 2)>
	std::enable_if_t<ON, T&> z() {
		return data[2];
	}

	template <bool ON = (C == 1) && (R > 2)>
	const std::enable_if_t<ON, T&> z() const {
		return data[2];
	}
};

template <typename T, unsigned int R>
struct Vec : public Mat<T, R, 1> {
	using Mat<T, R, 1>::Mat;

	constexpr Vec(const Mat<T, R, 1>& m) : Mat<T, R, 1>(m.data) {}

	template <unsigned int X = R>
	constexpr Vec(const T x, const T y, typename std::enable_if_t<X == 2, bool> = true)
		: Mat<T, R, 1>({x, y}) {}

	template <unsigned int X = R>
	constexpr Vec(const T x, const T y, const T z, typename std::enable_if_t<X == 3, bool> = true)
		: Mat<T, R, 1>({x, y, z}) {}

	T& at(unsigned int r) {
		return Mat<T, R, 1>::at(r, 1);
	}

	const T& at(unsigned int r) const {
		return Mat<T, R, 1>::at(r, 1);
	}

	operator Mat<T, R, 1>&() {
		return *this;
	}
};

#include "support/linalg/matrix-matrix.hpp"
#include "support/linalg/matrix-scalar.hpp"

using Vec2f = Vec<float, 2>;
using Vec3f = Vec<float, 3>;
using Mat3f = Mat<float, 3, 3>;

}  // namespace la
