#!/usr/bin/env bash

echo "Building docker image";
docker build . -t portal || exit 1

echo "Done. Image ready: portal";
