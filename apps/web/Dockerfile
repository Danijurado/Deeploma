FROM node:20-alpine AS base

FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN apk update

# Set working directory
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune web --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
# Requesting coursers during build time to generate the sitemap
ENV NEXT_PUBLIC_API_URL https://api.deeploma.me
ENV API_URL https://api.deeploma.me
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

# First install the dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install

# Build the project
COPY --from=builder /app/out/full/ .
RUN yarn turbo run build --filter=web
RUN yarn install --prod

FROM gcr.io/distroless/nodejs20-debian11 as release
WORKDIR /app

# Copy from build
COPY --from=installer /app/apps/web/.next/standalone/apps/web/.next ./.next
COPY --from=installer /app/apps/web/.next/standalone/apps/web/server.js ./server.js
COPY --from=installer /app/apps/web/.next/standalone/node_modules ./node_modules
COPY --from=installer /app/apps/web/.next/static ./.next/static
COPY --from=installer /app/apps/web/public ./public

# Run app command
CMD ["server"]
