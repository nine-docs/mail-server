# 빌드 단계
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install # 모든 의존성 설치
COPY . .
RUN npm run build

# 실행 단계
# 실행 단계
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package*.json ./
COPY --from=builder /app/node_modules ./node_modules
ENV NODE_ENV=production

RUN apk add --no-cache tini
ENTRYPOINT ["/sbin/tini", "--"]

EXPOSE 3000
CMD ["node", "dist/main"]

