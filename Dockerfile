FROM node:16-alpine AS deps

# Build args
ARG REACT_APP_URL_API_GATEWAY
ARG REACT_APP_URL_API_IMAGE_UPLOAD
ARG REACT_APP_URL_API_GATEWAY_LOGIN
ARG REACT_APP_URL_API_GET_ADD_VARIANT

# Environment vars
ENV REACT_APP_URL_API_GATEWAY=$REACT_APP_URL_API_GATEWAY
ENV REACT_APP_URL_API_GATEWAY_LOGIN=$REACT_APP_URL_API_GATEWAY_LOGIN
ENV REACT_APP_URL_API_IMAGE_UPLOAD=$REACT_APP_URL_API_IMAGE_UPLOAD
ENV REACT_APP_URL_API_GET_ADD_VARIANT=$REACT_APP_URL_API_GET_ADD_VARIANT


WORKDIR /app

COPY . /app

RUN apk add --no-cache git

RUN npm install

RUN npm install -g serve

RUN npm run build

EXPOSE 5000

# Run application
CMD ["serve", "-l", "5000", "-s" ,"build"]
# CMD serve -s build