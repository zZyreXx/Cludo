# Use the official Node.js 18 image as the base image
FROM node:18-buster

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Specify the command to run the application
CMD ["npm", "start"]
