# syntax = docker/dockerfile:1

# Use a lightweight Node.js image as the base
ARG NODE_VERSION=20.12.2
FROM node:${NODE_VERSION}-slim AS base


LABEL fly_launch_runtime="Node.js"

# Set the working directory inside the container
WORKDIR /app

# Install dependencies and build the application
FROM base AS build

# Install build tools
RUN apt-get update -qq && apt-get install --no-install-recommends -y \
    build-essential \
    node-gyp \
    python-is-python3 \
    pkg-config

# Copy package.json and yarn.lock first for dependency installation
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Copy env file
COPY .env .env



# Increase memory limit for Node.js processes
ENV NODE_OPTIONS="--max-old-space-size=2048"

# Build the application (e.g., compile TypeScript, generate `dist`)
RUN yarn build

# Remove dev dependencies
RUN yarn install --production --frozen-lockfile

# Create the final production image
FROM base AS production

# Copy built application and production dependencies from the build stage
COPY --from=build /app /app

# Expose the application port
EXPOSE 6002

# Start the application
CMD ["node", "dist/app/app.js"]
