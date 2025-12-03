.PHONY: dev build deploy preview help

# Development
dev:
	pnpm dev

build:
	pnpm build

preview:
	pnpm preview

# Local database (Docker libsql-server)
db-push:
	TURSO_DATABASE_URL=http://127.0.0.1:8080 pnpm db:push

db-seed:
	TURSO_DATABASE_URL=http://127.0.0.1:8080 pnpm db:seed

db-setup: db-push db-seed

db-studio:
	TURSO_DATABASE_URL=http://127.0.0.1:8080 pnpm db:studio

# Production database (Turso Cloud - loads from .env)
prod-db-push:
	set -a && . ./.env && set +a && pnpm db:push

prod-db-seed:
	set -a && . ./.env && set +a && pnpm db:seed

prod-db-setup: prod-db-push prod-db-seed

prod-db-studio:
	set -a && . ./.env && set +a && pnpm db:studio

# Deployment
deploy: build
	pnpm exec wrangler deploy

deploy-dry:
	pnpm build
	pnpm exec wrangler deploy --dry-run

# Secrets management
secrets-list:
	pnpm exec wrangler secret list

secrets-set-turso:
	@echo "Enter TURSO_DATABASE_URL:"; \
	read url; \
	echo "$$url" | pnpm exec wrangler secret put TURSO_DATABASE_URL
	@echo "Enter TURSO_AUTH_TOKEN:"; \
	read token; \
	echo "$$token" | pnpm exec wrangler secret put TURSO_AUTH_TOKEN

# Logs
logs:
	pnpm exec wrangler tail

# Help
help:
	@echo "Available targets:"
	@echo ""
	@echo "Development:"
	@echo "  dev              - Start development server"
	@echo "  build            - Build for production"
	@echo "  preview          - Preview with Wrangler locally"
	@echo ""
	@echo "Local Database (Docker):"
	@echo "  db-push          - Push schema to local database"
	@echo "  db-seed          - Seed local database"
	@echo "  db-setup         - Push schema and seed locally"
	@echo "  db-studio        - Open Drizzle Studio (local)"
	@echo ""
	@echo "Production Database (Turso):"
	@echo "  prod-db-push     - Push schema to production"
	@echo "  prod-db-seed     - Seed production database"
	@echo "  prod-db-setup    - Push schema and seed production"
	@echo "  prod-db-studio   - Open Drizzle Studio (production)"
	@echo ""
	@echo "Deployment:"
	@echo "  deploy           - Build and deploy to Cloudflare"
	@echo "  deploy-dry       - Dry run deployment"
	@echo ""
	@echo "Secrets:"
	@echo "  secrets-list     - List Cloudflare secrets"
	@echo "  secrets-set-turso - Set Turso credentials as secrets"
	@echo ""
	@echo "  logs             - Tail Cloudflare Worker logs"
