.PHONY: dev build deploy preview help duplicates duplicates-report duplicates-llm \
	db-push db-studio db-seed db-setup db-push-local

# Development
dev:
	pnpm dev

build:
	pnpm build

preview:
	pnpm preview


# Production database (Turso Cloud)
# `.env` already holds the production credentials and drizzle-kit auto-loads it,
# so these hit prod directly. There is no .env.prod; the prod-db-* targets that
# sourced one could never run and have been removed.
db-push:
	pnpm db:push

db-studio:
	pnpm db:studio

# db:seed does not load .env by itself. Seeding is an idempotent additive
# upsert, so re-running against prod only adds and updates rows.
db-seed:
	node --env-file=.env --import tsx src/scripts/seed.ts

db-setup: db-push db-seed

# Schema-only iteration against a local file, no Docker: a file: URL makes
# drizzle.config.ts drop the auth token and use the embedded driver.
db-push-local:
	TURSO_DATABASE_URL=file:./local.db pnpm exec drizzle-kit push

# Code quality
duplicates:
	pnpm duplicates

duplicates-report:
	pnpm duplicates:report

duplicates-llm:
	pnpm duplicates:llm

# Help
help:
	@echo "Available targets:"
	@echo ""
	@echo "Development:"
	@echo "  dev              - Start development server"
	@echo "  build            - Build for production"
	@echo "  preview          - Serve production build locally"
	@echo ""
	@echo "Database (Turso — .env holds PRODUCTION credentials):"
	@echo "  db-push          - Push schema to production"
	@echo "  db-seed          - Seed production (vocab + verb conjugations; idempotent)"
	@echo "  db-setup         - Push schema and seed production"
	@echo "  db-studio        - Open Drizzle Studio (production)"
	@echo "  db-push-local    - Push schema to a local file DB (no Docker, no prod)"

