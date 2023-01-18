#!/bin/bash

DIR=${WORKING_DIRECTORY}

echo "${DIR}"

if [ "${INSTALL_COMMAND}" ]; then
    echo "Installing using custom command"
    echo "${INSTALL_COMMAND}"
    cd ${DIR} || exit 1
    ${INSTALL_COMMAND}

elif [ -f "${DIR}/yarn.lock" ]; then
    echo "Installing using Yarn"
    echo "yarn install --frozen-lockfile"
    cd ${DIR} || exit 1
    yarn install --frozen-lockfile

elif [ ! -f "${DIR}/package-lock.json" ]; then
    echo "The Cypress orb uses 'npm ci' to install 'node_modules', which requires a 'package-lock.json'."
    echo "A 'package-lock.json' file was not found. Please run 'npm install' in your project,"
    echo "and commit 'package-lock.json' to your repo."
    exit 1

else
    echo "Installing dependencies using NPM ci"
    echo "Install in ${WORKING_DIRECTORY}"
    cd ${DIR} || exit 1
    npm ci

fi