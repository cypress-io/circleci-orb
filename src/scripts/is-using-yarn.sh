#!/bin/bash
YARN=/${WORKING_DIRECTORY}/yarn.lock
if [ -f "$YARN" ]; then
    echo "$YARN"
    echo true
    true
else
    echo "$YARN"
    echo false
    false

fi