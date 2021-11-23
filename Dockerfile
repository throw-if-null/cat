FROM node:16.10.0 as build

WORKDIR /usr/local/app

# Add the source code to app
COPY ./ /usr/local/app/

RUN npm install

RUN npm run build

FROM nginx:latest

# Copy the client app output to replace the default nginx contents.
COPY --from=build /usr/local/app/dist/apps/client /usr/share/nginx/html

# Expose port 80
EXPOSE 80
