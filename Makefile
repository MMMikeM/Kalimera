.PHONY: dev build deploy preview help duplicates duplicates-report

# Development
dev:
	pnpm dev

build:
	pnpm build

preview:
	pnpm preview


# Production database (Turso Cloud - loads from .env.prod)
# Note: Uses generate + migrate to avoid transaction bug with db:push and PRAGMA foreign_keys
prod-db-push:
	set -a && . ./.env.prod && set +a && pnpm drizzle-kit generate && \
	set -a && . ./.env.prod && set +a && pnpm drizzle-kit migrate

prod-db-seed:
	set -a && . ./.env.prod && set +a && pnpm db:seed

prod-db-setup: prod-db-push prod-db-seed

prod-db-studio:
	set -a && . ./.env.prod && set +a && pnpm db:studio

# Code quality
duplicates:
	pnpm duplicates

duplicates-report:
	pnpm duplicates:report

# Help
help:
	@echo "Available targets:"
	@echo ""
	@echo "Development:"
	@echo "  dev              - Start development server"
	@echo "  build            - Build for production"
	@echo "  preview          - Preview with Wrangler locally"
	@echo ""
	@echo "Production Database (Turso):"
	@echo "  prod-db-push              - Push schema to production"
	@echo "  prod-db-seed              - Seed production database (vocab + verb conjugations)"
	@echo "  prod-db-setup             - Push schema and seed production"
	@echo "  prod-db-studio            - Open Drizzle Studio (production)"

