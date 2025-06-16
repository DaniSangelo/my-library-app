# STEP 1: Build
FROM node:20-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# STEP 2: Production
FROM node:20-alpine

WORKDIR /app

# Copia apenas os node_modules de produção do builder
COPY --from=builder /app/node_modules ./node_modules

# Copia arquivos de build e config
COPY --from=builder /app/dist ./dist
COPY package*.json ./

# Start
CMD ["node", "dist/main.js"]
