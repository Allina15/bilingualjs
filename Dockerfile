FROM public.ecr.aws/docker/library/node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
COPY package-lock.json ./
RUN npm install --force

COPY . .
RUN npm run build

FROM public.ecr.aws/nginx/nginx:stable-perl

COPY --from=build /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD [ "nginx", "-g", "daemon off;" ]