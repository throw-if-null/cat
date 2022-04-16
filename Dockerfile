# Stage 1
#FROM node:16.10.0 as build
#
#RUN mkdir -p /app
#
#WORKDIR /app
#
#COPY . /app
#
#RUN npm ci --include dev
#
#RUN npm run build


# Stage 2
FROM nginx:latest

# Server config
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
# Copy the client app output to replace the default nginx contents.
COPY ./dist/apps/cat /usr/share/nginx/html

# Expose port 80
EXPOSE 80
