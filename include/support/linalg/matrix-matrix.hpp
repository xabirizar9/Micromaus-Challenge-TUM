#pragma once

// matrix-matrix operations

template <typename T, typename S, unsigned int A, unsigned int B, unsigned int C>
Mat<std::common_type_t<T, S>, A, C> operator*(const Mat<T, A, B>& a, const Mat<S, B, C>& b) {
	Mat<std::common_type_t<T, S>, A, C> out;
	for (unsigned int r = 0; r < A; ++r) {
		for (unsigned int c = 0; c < C; ++c) {
			for (unsigned int i = 0; i < B; ++i) {
				out.at(r, c) += a.at(r, i) * b.at(i, c);
			}
		}
	}
	return std::move(out);
}

template <typename T, typename S, unsigned int A>
std::common_type_t<T, S> dot(const Mat<T, A, 1>& l, const Mat<S, A, 1>& r) {
	std::common_type_t<T, S> out = 0;
	for (unsigned int i = 0; i < A; ++i) {
		out += l.at(i, 0) * r.at(i, 0);
	}
	return std::move(out);
}

/**
 * Vec2 cross product, returns z component of result
 */
template <typename T, typename S>
std::common_type_t<T, S> cross(const Mat<T, 2, 1>& l, const Mat<S, 2, 1>& r) {
	return l.data[0] * r.data[1] - l.data[1] * r.data[0];
}
