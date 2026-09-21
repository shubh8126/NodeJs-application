FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --omit=dev

COPY . .

ENV NODE_ENV=production
ENV PORT=4034
ENV HOST=0.0.0.0

EXPOSE 4034

CMD ["npm", "start"]
