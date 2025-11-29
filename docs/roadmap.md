# Project Roadmap

## Current Status: Phase 1 (In Progress)

We are currently in the middle of a major rewrite to move from a static-only app to a hybrid static/dynamic architecture.

### ✅ Completed
*   **Database Infrastructure**: Docker Compose setup for PostgreSQL.
*   **Schema Design**: Kysely schema defined for Vocabulary, Grammar, and Practice.
*   **Migrations**: Initial migration scripts created.

### 🚧 In Progress / Pending
*   **Frontend Components**:
    *   [ ] `QuickReference` (Dashboard for grammar)
    *   [ ] `CategoryVocabulary` (Study interface)
    *   [ ] `TargetedPractice` (Quiz system)
    *   [ ] `WordInbox` (Data entry)
*   **Data Migration**:
    *   [ ] Seeding script to move `constants/*.ts` to DB.
    *   [ ] Quiz generation logic.

## Future Phases

### Phase 2: AI Integration
*   **Goal**: Remove manual data entry bottleneck.
*   **Features**:
    *   "Auto-fill with AI" button in Word Processor.
    *   Automatic generation of example sentences and gender/type classification.

### Phase 3: Automation
*   **Goal**: Fully autonomous word processing.
*   **Features**:
    *   Background worker to process the inbox.
    *   Automatic categorization of new words.
