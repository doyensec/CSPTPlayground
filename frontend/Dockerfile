# Use the official Node.js image as the base image
FROM node:20.9.0

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY /app/ ./

# Install dependencies
RUN npm install

# Build the application
RUN npm run build

# Install a simple HTTP server to serve the build
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 5000

# Define the command to serve the application
CMD ["serve", "-s", "build","-l","3000"]