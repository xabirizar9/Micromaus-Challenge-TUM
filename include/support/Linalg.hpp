#pragma once

#include <cstdint>
#include <array>

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
}
