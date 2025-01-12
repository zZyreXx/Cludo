# Use the official Node.js 18 image as the base image
FROM node:18-buster

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port your application runs on (e.g., 3000 for typical Node.js apps)
EXPOSE 3000

# Specify the command to run the application
CMD ["npm", "start"]
