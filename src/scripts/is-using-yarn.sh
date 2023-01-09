#!/bin/bash
YARN=/${WORKING_DIRECTORY}/yarn.lock
if [ -f "$YARN" ]; then
    true

else
    false

fi