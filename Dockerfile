## ---------------------------------------------------------------------
## ---------------------------------------------------------------------
## This Dockerfile is to setup app in only ONE Container 
## ---------------------------------------------------------------------
## ---------------------------------------------------------------------

# -------------------
# BUILD - Frontend
# -------------------
FROM node:18.17.0-alpine AS build-frontend

WORKDIR /app/frontend

COPY frontend/package.json .
COPY frontend/yarn.lock .

# Install dependencies
RUN yarn install

# Copy the rest of the frontend application files
COPY frontend/ .

# Build
RUN yarn build-only

# -------------------
# BUILD - Backend
# -------------------
FROM node:18.17.0-alpine AS build-backend

WORKDIR /app/backend

COPY backend/package.json .
COPY backend/yarn.lock .

# Install dependencies
RUN yarn install

COPY backend/ .

# Build
RUN yarn build

# -------------------
# Runner
# -------------------
FROM node:18.17.0-alpine AS runner

WORKDIR /app

COPY --from=build-backend /app/backend/dist dist/
COPY --from=build-backend /app/backend/node_modules node_modules/
COPY --from=build-frontend /app/frontend/dist client/

COPY registros.yaml .
COPY usuarios.yaml .

EXPOSE 3000

CMD ["node", "dist/main"]
