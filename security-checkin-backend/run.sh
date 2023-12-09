#!/bin/bash

# if run with production mode
if [ "${1}" = "production" ]; then
    echo "Starting in production mode"

    sleep 10s
    yarn prisma migrate deploy

    yarn build

    yarn start:prod
fi

# if run with
# development mode
if [ "${1}" = "development" ]; then
    echo "Starting in development mode"

    sleep 10s
    npx prisma migrate dev

    yarn start:dev
fi
