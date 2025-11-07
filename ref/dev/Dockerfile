# Use an official Node runtime (16 as of now)
FROM node:20-alpine

# Set working directory to /app
WORKDIR /app

# Copy package*.json to /app
COPY . .

# Install dependencies
RUN npm install

# Set Environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Build the application
RUN npm run build

# Expose the port
EXPOSE 3000

# Run the command to start the development server or production environment (you can choose one)
CMD [ "npm", "run", "start" ]