#!/bin/bash

# Start Frontend
http-server frontend/dist &

# Start Backend
# cd backend && node backend/dist/main &
cd backend && yarn start:prod &

# Start Nginx
nginx -g 'daemon off;'
