#!/bin/bash
YARN=/${WORKING_DIRECTORY}/yarn.lock

if [ -f "$YARN" ]; then
    echo "Installing using Yarn"
    echo "yarn install --frozen-lockfile"
    yarn install --frozen-lockfile

else
    false

fi