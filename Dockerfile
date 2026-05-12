FROM node:26-alpine AS base
RUN apk add --no-cache ca-certificates
RUN npm install -g corepack && corepack enable && corepack install -g pnpm@11.0.9

FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    pnpm fetch --frozen-lockfile

FROM deps AS build
COPY . .
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile
RUN NITRO_PRESET=node-server pnpm build && cp dist/sw.js .output/public/sw.js

FROM node:26-alpine AS runner
RUN apk add --no-cache tini
WORKDIR /app
COPY --from=build /app/.output ./
EXPOSE 3000
ENTRYPOINT ["/sbin/tini", "-g", "--"]
CMD ["node", "server/index.mjs"]
