#!/bin/bash
echo "The Cypress orb uses 'npm ci' to install 'node_modules', which requires a 'package-lock.json'."
echo "A 'package-lock.json' file was not found. Please run 'npm install' in your project,"
echo "and commit 'package-lock.json' to your repo."
exit 1