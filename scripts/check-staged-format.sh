#!/bin/sh

echo "" | clang-format -n -Werror $(git status --short --porcelain | sed -ne 's/^[MARC]  \(.*\.[ch]pp\)$/\1/p')
exit $?

