#!/usr/bin/env bash

echo "Building docker image";
docker build . -t kapeta/portal || exit 1

echo "Done. Image ready: kapeta/portal";
