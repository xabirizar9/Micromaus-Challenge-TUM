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

	Mat<T, C, R> trans() const {
		Mat<T, C, R> out;
		for (unsigned int c = 0; c < C; ++c) {
			for (unsigned int r = 0; r < R; ++r) {
				out.at(c, r) = at(r, c);
			}
		}
		return std::move(out);
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

	operator Mat<T, R, 1>&() {
		return *this;
	}
};

#include "support/linalg/matrix-matrix.hpp"
#include "support/linalg/matrix-scalar.hpp"

}  // namespace la
