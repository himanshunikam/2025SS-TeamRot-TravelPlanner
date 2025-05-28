# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=22.15.1

FROM node:${NODE_VERSION}-alpine

RUN npm install -g concurrently


WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage a bind mounts to package.json and package-lock.json to avoid having to copy them into
# into this layer.

COPY server/package*.json ./server/
RUN cd server && npm install

# Copy and install client dependencies
COPY client/package*.json ./client/
RUN cd client && npm install





# Copy the rest of the source files into the image.
COPY . .

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001
RUN chown -R nodejs:nodejs /usr/src/app
# Run the application as a non-root user.
USER node

# Expose the port that the application listens on.
EXPOSE 3000 5000

# Run the application.
CMD ["concurrently", "npm run server", "npm run client"]
