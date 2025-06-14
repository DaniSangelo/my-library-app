# STEP 1: Build
FROM node:20-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# STEP 2: Running
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY --from=builder /app/dist ./dist
COPY prisma ./prisma
COPY .env .env

RUN npx prisma generate

CMD ["node", "dist/main.js"]