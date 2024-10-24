FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENV PORT=${PORT}
ENV CORS_ORIGINS=${CORS_ORIGINS}
ENV TELEGRAM_BOT_TOKEN=${TELEGRAM_BOT_TOKEN}
ENV TELEGRAM_CHAT_ID=${TELEGRAM_CHAT_ID}

CMD ["npm", "run", "start:prod"]

EXPOSE ${PORT}