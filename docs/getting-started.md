# Getting Started

## Prerequisites

*   **Node.js** (v18+)
*   **Docker Desktop** (for PostgreSQL)

## Setup

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Start Database**:
    ```bash
    docker-compose up -d
    ```

3.  **Run Migrations**:
    Initialize the database schema:
    ```bash
    npm run db:migrate
    ```

4.  **Seed Data** (Optional):
    Populate the database with initial vocabulary:
    ```bash
    npm run db:seed
    ```

## Development

Start the development server:
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

## Testing

Run unit tests with Vitest:
```bash
npm test
```
