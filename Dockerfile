FROM node:18
RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN npm i
RUN npm run build
COPY entrypoint.sh /entrypoint.sh
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /entrypoint.sh /wait-for-it.sh
ENTRYPOINT ["/entrypoint.sh"]