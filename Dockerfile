# AI Web Upgrader - Orchestrator Service Dockerfile

FROM node:18-alpine AS base

# Install system dependencies
RUN apk add --no-cache curl libc6-compat

# Set working directory
WORKDIR /app

# Install dependencies
FROM base AS deps
COPY package*.json ./
RUN npm ci --only=production

# Build the application
FROM base AS builder
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production image
FROM base AS runner

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Ensure correct file structure for Next.js standalone
RUN chown -R nextjs:nodejs /app/.next

USER nextjs

# Expose port (default 3000)
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

# Start the application
ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000

# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED=1

CMD ["node", "server.js"]