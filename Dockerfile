## ---------------------------------------------------------------------
## ---------------------------------------------------------------------
## This Dockerfile is to setup app in only ONE Container 
## ---------------------------------------------------------------------
## ---------------------------------------------------------------------
FROM node:18.17.0 as build

# Set the working directory inside the container
WORKDIR /app

RUN mkdir backend && mkdir frontend

# -------------------
# FRONTEND
# -------------------
COPY frontend/package.json ./frontend/
COPY frontend/yarn.lock ./frontend/

# Install dependencies
RUN cd frontend && yarn install

# Copy the rest of the frontend application files
COPY frontend/ ./frontend

# Build
RUN cd frontend && yarn build-only

# -------------------
# BACKEND
# -------------------
COPY backend/package.json ./backend/
COPY backend/yarn.lock ./backend/

# Install dependencies
RUN cd backend && yarn install

# Copy the rest of the backend application files
COPY backend/ ./backend

COPY registros.yaml ./backend/
COPY usuarios.yaml ./backend/
COPY .env.backend ./backend/.env

# Build
RUN cd backend && yarn build

# -------------------
## HOSTING
# -------------------
# Install Nginx
RUN apt-get update && apt-get install -y nginx

COPY infra/nginx-single-container/nginx.conf /etc/nginx/nginx.conf

RUN npm install -g http-server

EXPOSE 80
EXPOSE 443

COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

CMD ["./start.sh"]
