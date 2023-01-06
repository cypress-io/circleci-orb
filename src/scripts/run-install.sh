#!/bin/bash
YARN=/${WORKING_DIRECTORY}/yarn.lock
PACKAGELOCK=/${WORKING_DIRECTORY}/package-lock.json

if [ "${INSTALL_COMMAND}" ]; then
    echo "Installing using custom command"
    echo "${INSTALL_COMMAND}"
    ${INSTALL_COMMAND}

if [ -f "$YARN" ]; then
    echo "Installing using Yarn"
    echo "yarn install --frozen-lockfile"
    yarn install --frozen-lockfile

if [ -f "$PACKAGELOCK"]; then
    echo "The Cypress orb uses 'npm ci' to install 'node_modules', which requires a 'package-lock.json'."
    echo "A 'package-lock.json' file was not found. Please run 'npm install' in your project,"
    echo "and commit 'package-lock.json' to your repo."
    exit 1

else
    echo "Installing dependencies using NPM ci"
    npm ci

fi