#!/usr/bin/sh

# list all modified, filter c++ files, filter only existing, print file list, do it
git ls-files -m | \
	grep '\.cpp$\|\.hpp$' | \
	xargs ls 2>/dev/null | \
	tee /dev/stderr | \
	xargs clang-format -i

