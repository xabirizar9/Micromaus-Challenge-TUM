#!/bin/sh

clang-format -n -Werror $(git status --short --porcelain | sed -ne 's/^M  \(.*\.[ch]pp\)$/\1/p')
exit $?

