#!/bin/bash
YARN=${WORKING_DIRECTORY}/yarn.lock
PACKAGELOCK=${WORKING_DIRECTORY}/package-lock.json


echo "${WORKING_DIRECTORY}"

if [ "${INSTALL_COMMAND}" ]; then
    echo "Installing using custom command"
    echo "${INSTALL_COMMAND}"
    ${INSTALL_COMMAND}

elif [ -f "$YARN" ]; then
    echo "Installing using Yarn"
    echo "yarn install --frozen-lockfile"
    yarn install --frozen-lockfile

elif [ -f "$PACKAGELOCK" ]; then
    echo "The Cypress orb uses 'npm ci' to install 'node_modules', which requires a 'package-lock.json'."
    echo "A 'package-lock.json' file was not found. Please run 'npm install' in your project,"
    echo "and commit 'package-lock.json' to your repo."
    exit 1

else
    echo "Installing dependencies using NPM ci"
    echo "${PACKAGELOCK}"
    cd ~/tmp/kitchensink || exit
    ls -l
    npm ci

fi