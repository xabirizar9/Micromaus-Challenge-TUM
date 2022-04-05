#pragma once

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
