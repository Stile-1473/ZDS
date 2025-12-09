# Stage 1: Build the React application
FROM node:alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker's layer caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application for production
RUN npm run build

# Stage 2: Serve the built application with Nginx
FROM nginx:alpine

# Copy the Nginx configuration file (optional, if you have a custom one)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built React application from the builder stage to Nginx's web root
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80 to allow external access to the Nginx server
EXPOSE 80

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]