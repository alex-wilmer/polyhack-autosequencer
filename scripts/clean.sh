#!/usr/bin/env bash
rm -rf node_modules
rm yarn.lock
find pkgs -maxdepth 2 -type d -iname "node_modules" -exec rm -rvf {} \;
find pkgs -maxdepth 2 -name "yarn.lock" -exec rm {} \;
