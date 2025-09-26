# ========================================
# Build Stage
# ========================================
FROM node:22-alpine AS builder

# ติดตั้ง dependencies ที่จำเป็นสำหรับ build
RUN apk add --no-cache libc6-compat

# ตั้ง working directory
WORKDIR /app

# คัดลอกไฟล์ package.json และ package-lock.json ก่อน (สำหรับ layer caching)
COPY package*.json ./
COPY prisma ./prisma/

# ติดตั้ง dependencies
RUN npm ci --only=production && npm cache clean --force

# คัดลอกไฟล์ source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# สร้างไฟล์ build
RUN npm run build

# ========================================
# Production Stage
# ========================================
FROM node:22-alpine AS production

# ติดตั้ง dumb-init สำหรับ proper signal handling
RUN apk add --no-cache dumb-init

# สร้าง non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001

# ตั้ง working directory
WORKDIR /app

# คัดลอกไฟล์ที่จำเป็นจาก build stage
COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/package*.json ./
COPY --from=builder --chown=nestjs:nodejs /app/prisma ./prisma

# เปลี่ยนเป็น non-root user
USER nestjs

# เปิดพอร์ตที่แอปพลิเคชันจะใช้งาน
EXPOSE 3333

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node dist/src/health-check.js || exit 1

# ใช้ dumb-init เป็น entrypoint สำหรับ proper signal handling
ENTRYPOINT ["dumb-init", "--"]

# คำสั่งที่ใช้ในการรันแอปพลิเคชัน
CMD ["node", "dist/src/main.js"]
