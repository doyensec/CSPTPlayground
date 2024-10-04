# Use the official Node.js image as the base image
FROM node:20.9.0

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY /app/package*.json .

# Install dependencies
RUN npm install

COPY /app .

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the application
CMD ["npm", "start"]