#!/bin/bash
set -u
APP_SERVER_CONTAINER_ID=`docker ps | grep 'app_server' | awk '{ print $1 }'`
docker exec $APP_SERVER_CONTAINER_ID /bin/bash -c 'npm run seed'
