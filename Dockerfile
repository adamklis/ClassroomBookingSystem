### STAGE 1: Build ###
FROM node:14.15.3-alpine3.12 AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
RUN npm install -g @angular/cli
COPY . .
RUN ng build --prod

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/ClassroomBookingSystem /usr/share/nginx/html
