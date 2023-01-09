#!/bin/bash
PACKAGELOCK=/${WORKING_DIRECTORY}/package-lock.json
if [ -f "$PACKAGELOCK" ]; then
    true

else
    false

fi