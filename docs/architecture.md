# Architecture Overview

## Philosophy: Hybrid Static & Dynamic

The Greek Learning App uses a hybrid architecture designed to match the user's learning workflow:

1.  **Static Content (Fast & Reliable)**: Grammar rules, verb tables, and reference guides are hardcoded as static React components. This ensures instant loading during lessons without database latency.
2.  **Dynamic Content (Personalized)**: Vocabulary progress, problem words, and practice history are stored in a PostgreSQL database. This allows for tracking learning over time.

## Frontend Architecture

The frontend is built with **React + TypeScript + Vite**.

### Key Components

*   **`QuickReference`**: A dashboard for instant grammar lookups (Articles, Pronouns, Verb Patterns).
*   **`CategoryVocabulary`**: A study interface organized by practical usage (Food, Family) rather than grammatical category.
*   **`TargetedPractice`**: A quiz system that focuses on identified weak areas and problem words.
*   **`WordInbox`**: A rapid-entry form for capturing new words during lessons for later processing.

## Backend Architecture

The backend uses **PostgreSQL** as the primary data store, managed via **Docker Compose**.

### Data Access

*   **Kysely**: We use Kysely for type-safe SQL queries.
*   **Express API**: A lightweight Node.js server handles database operations.
*   **API-First**: The frontend fetches data via `/api` endpoints (e.g., `/api/vocabulary`), ensuring security and browser compatibility.

## Data Flow

1.  **Read**: Static content is loaded immediately. Dynamic vocabulary is fetched from Postgres on component mount.
2.  **Write**: New words go to the `vocabulary` table with status `unprocessed`.
3.  **Process**: Words are enriched (category, gender) and moved to `processed` status.
4.  **Practice**: Quiz results update `mistake_count` and `weak_areas` tables to inform future practice sessions.
