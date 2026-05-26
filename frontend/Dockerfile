# ── Stage 1: Dependencies ────────────────────────────────────
FROM node:22-alpine AS deps

# working directory for the image
WORKDIR /app
# Enable pnpm via corepack (built into Node 20)
RUN corepack enable && corepack prepare pnpm@latest --activate


COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --dangerously-allow-all-builds
# ── Stage 2: Development ─────────────────────────────────────
FROM node:22-alpine AS development

WORKDIR /app
# could we use a pnpm version instead of latest
RUN corepack enable && corepack prepare pnpm@11.1.1 --activate

# Copy installed node_modules from deps stage
COPY  --from=deps /app/node_modules ./node_modules

# Copy the rest of the source code
COPY . .

# why not expose post 5173 
EXPOSE 8080 

CMD ["pnpm", "run", "dev"]
