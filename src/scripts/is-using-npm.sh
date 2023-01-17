#!/bin/bash
PACKAGELOCK=/${WORKING_DIRECTORY}/package-lock.json
if [ -f "$PACKAGELOCK" ]; then
    echo "$PACKAGELOCK"
    echo true
    true

else
    echo "$PACKAGELOCK"
    echo false
    false

fi