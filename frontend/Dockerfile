FROM node:20-alpine

# working directory for the image
WORKDIR /app
# Enable pnpm via corepack (built into Node 20)
RUN corepack enable && corepack prepare pnpm@latest --activate


COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

# why not expose post 5173 
EXPOSE 8080 

CMD ["pnpm", "run", "dev"]
