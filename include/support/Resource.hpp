#pragma once

#include <exception>
extern "C" {
#include <sys/lock.h>
}
#include <cstdint>

class OutOfResource : public std::exception {
	virtual const char* what() const noexcept override {
		return "of this resource, no more left to allocate";
	}
};

template <typename T, T max>
class CountedResource {
	static_assert(max <= 32, "more than 32 resources not allowed in CountedResource");

   public:
	CountedResource() : ours(allot()) {}
	~CountedResource() {
		free(ours);
	}

	CountedResource(CountedResource&) = delete;
	CountedResource(CountedResource&&) = delete;

	operator T() const {
		return ours;
	}

	static T allot() {
		_lock_acquire(&lock);
		for (unsigned int i = 0; i < (unsigned int)max; ++i) {
			const unsigned int mask = (1 << i);
			if ((mask & allocated) == 0) {
				// this one is free, so allocate it
				allocated |= mask;
				_lock_release(&lock);
				return (T)i;
			}
		}
		_lock_release(&lock);
		throw OutOfResource();
	}

	static void free(const T which) {
		const unsigned int mask = (1 << ((unsigned int)which));
		_lock_acquire(&lock);
		allocated &= ~mask;
		_lock_release(&lock);
	}

   private:
	static _lock_t lock;
	static uint32_t allocated;	// bit field stores which ones are allocated

	T ours;	 // this is the resource we allocated
};

template <typename T, T max>
_lock_t CountedResource<T, max>::lock;

template <typename T, T max>
uint32_t CountedResource<T, max>::allocated = 0;
