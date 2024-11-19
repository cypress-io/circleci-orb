#!/usr/bin/env bash

# Check if a version parameter is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <version>"
  exit 1
fi

VERSION=$1

if ! pnpm --version | grep -q "$VERSION"; then
  echo "pnpm version $VERSION not found"
  exit 1
fi
