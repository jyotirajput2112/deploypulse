# Stage 1: Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Stage 2: Runtime stage
FROM node:20-alpine AS runner
WORKDIR /app

# Non-root user for security
RUN addgroup -g 1001 -S nodejs && adduser -u 1001 -S nodejs -G nodejs

COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./
COPY server.js ./

USER nodejs
EXPOSE 3000
CMD ["node", "server.js"]