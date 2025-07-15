# Greek Learning App Rewrite Plan

## Overview

Rewrite the Greek language learning app using TanStack Router for file-based routing and PostgreSQL for robust data persistence. The new architecture focuses on three main pillars: Reference materials, Lesson state tracking, and Interactive quizzes.

## Architecture Changes

### Current Structure → New Structure

```
Current: Component-based SPA
New: File-based routed app with local database

Components → Routes + Database
- Static content → Reference routes
- Learning materials → Lesson tracking system
- Practice → Quiz system with progress tracking
```

## Technology Stack

### Core Technologies

- **TanStack Router**: File-based routing with type safety
- **PostgreSQL**: Robust relational database for data persistence
- **Kysely**: Type-safe SQL query builder for TypeScript
- **React 18**: UI framework
- **TypeScript**: Type safety
- **Vite**: Build tool

### Key Features from Documentation

- File-based routing with automatic code splitting
- Pathless layout routes for shared UI
- Route-level authentication/guards
- PostgreSQL transactions for data integrity
- Connection pooling for performance
- Type-safe database queries with Kysely
- Schema migrations and introspection
- Advanced SQL features (JSON, arrays, full-text search)

## Database Schema

### Tables Structure

```sql
-- Core user table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR NOT NULL, -- Or use an auth provider
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- User progress and settings
CREATE TABLE user_settings (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  settings JSONB DEFAULT '{}', -- Flexible settings storage
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ENUMs for data integrity
CREATE TYPE lesson_section_type AS ENUM ('vocabulary', 'grammar', 'examples', 'notes', 'dialogue');
CREATE TYPE quiz_question_type AS ENUM ('multiple_choice', 'translation', 'fill_blank', 'matching', 'pronunciation');
CREATE TYPE lesson_focus_area AS ENUM ('vocabulary', 'grammar', 'conversation', 'reading', 'listening');
CREATE TYPE grammar_category AS ENUM ('cases', 'tenses', 'pronouns', 'articles', 'verbs', 'adjectives');

-- Lesson categories and metadata
CREATE TABLE lesson_categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  description TEXT,
  order_index INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Individual lessons (structured, no JSONB)
CREATE TABLE lessons (
  id SERIAL PRIMARY KEY,
  category_id INTEGER NOT NULL REFERENCES lesson_categories(id),
  title VARCHAR NOT NULL,
  description TEXT,
  lesson_date DATE,
  order_index INTEGER,
  focus_area lesson_focus_area,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Lesson content sections (replaces JSONB content)
CREATE TABLE lesson_sections (
  id SERIAL PRIMARY KEY,
  lesson_id INTEGER NOT NULL REFERENCES lessons(id),
  section_type lesson_section_type NOT NULL,
  title VARCHAR,
  content TEXT NOT NULL,
  order_index INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Vocabulary entries
CREATE TABLE vocabulary (
  id SERIAL PRIMARY KEY,
  greek_text VARCHAR NOT NULL,
  english_translation VARCHAR NOT NULL,
  pronunciation VARCHAR,
  category VARCHAR, -- grammar, directional, numbers, etc.
  example_sentence_greek TEXT,
  example_sentence_english TEXT,
  tags TEXT[], -- PostgreSQL array for multiple tags
  lesson_id INTEGER REFERENCES lessons(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Grammar rules and patterns
CREATE TABLE grammar_rules (
  id SERIAL PRIMARY KEY,
  title VARCHAR NOT NULL,
  description TEXT NOT NULL,
  pattern VARCHAR, -- e.g., "ΔΕΝ+μου +ΑΡΕΣΕΙ/ΑΡΕΣΟΥΝ"
  category grammar_category,
  difficulty_level INTEGER DEFAULT 1,
  lesson_id INTEGER REFERENCES lessons(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Grammar rule examples (replaces JSONB examples)
CREATE TABLE grammar_examples (
  id SERIAL PRIMARY KEY,
  grammar_rule_id INTEGER NOT NULL REFERENCES grammar_rules(id),
  greek_example TEXT NOT NULL,
  english_translation TEXT NOT NULL,
  notes TEXT,
  order_index INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- User progress tracking
CREATE TABLE user_progress (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lesson_id INTEGER NOT NULL REFERENCES lessons(id),
  completed BOOLEAN DEFAULT FALSE,
  score DECIMAL(5,2), -- percentage or points with precision
  time_spent INTEGER, -- seconds
  attempts INTEGER DEFAULT 0,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Quiz questions
CREATE TABLE quiz_questions (
  id SERIAL PRIMARY KEY,
  lesson_id INTEGER REFERENCES lessons(id),
  question_type quiz_question_type NOT NULL,
  question_text TEXT NOT NULL,
  correct_answer TEXT NOT NULL,
  explanation TEXT,
  difficulty INTEGER DEFAULT 1 CHECK (difficulty BETWEEN 1 AND 5),
  tags TEXT[],
  created_at TIMESTAMP DEFAULT NOW()
);

-- Quiz multiple choice options (replaces JSONB options)
CREATE TABLE quiz_options (
  id SERIAL PRIMARY KEY,
  question_id INTEGER NOT NULL REFERENCES quiz_questions(id),
  option_text TEXT NOT NULL,
  is_correct BOOLEAN DEFAULT FALSE,
  order_index INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Quiz sessions to group attempts
CREATE TABLE quiz_sessions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lesson_id INTEGER REFERENCES lessons(id),
  started_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,
  score DECIMAL(5,2),
  total_questions INTEGER,
  correct_answers INTEGER
);

-- Quiz attempts and results (simplified, no JSONB)
CREATE TABLE quiz_attempts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  session_id INTEGER REFERENCES quiz_sessions(id) ON DELETE CASCADE,
  question_id INTEGER NOT NULL REFERENCES quiz_questions(id),
  user_answer TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL,
  time_taken INTEGER, -- seconds
  hints_used INTEGER DEFAULT 0,
  attempted_at TIMESTAMP DEFAULT NOW()
);

-- Daily patterns and common phrases
CREATE TABLE daily_patterns (
  id SERIAL PRIMARY KEY,
  pattern_greek VARCHAR NOT NULL,
  pattern_english VARCHAR NOT NULL,
  usage_context VARCHAR,
  frequency_score INTEGER DEFAULT 1, -- how common/important
  lesson_id INTEGER REFERENCES lessons(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Daily pattern examples (relational structure)
CREATE TABLE daily_pattern_examples (
  id SERIAL PRIMARY KEY,
  pattern_id INTEGER NOT NULL REFERENCES daily_patterns(id) ON DELETE CASCADE,
  greek_example TEXT NOT NULL,
  english_translation TEXT NOT NULL,
  context TEXT,
  order_index INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_vocabulary_category ON vocabulary(category);
CREATE INDEX idx_vocabulary_lesson_id ON vocabulary(lesson_id);
CREATE INDEX idx_grammar_rules_category ON grammar_rules(category);
CREATE INDEX idx_quiz_questions_lesson_id ON quiz_questions(lesson_id);
CREATE INDEX idx_user_progress_lesson_id ON user_progress(lesson_id);
CREATE INDEX idx_vocabulary_greek_text ON vocabulary USING gin(to_tsvector('english', greek_text));
CREATE INDEX idx_vocabulary_english_text ON vocabulary USING gin(to_tsvector('english', english_translation));
```

## File Structure

### Route Structure (TanStack Router)

```
src/routes/
├── __root.tsx                 # Root layout with navigation
├── index.tsx                  # Dashboard/home page
├── reference/                 # Reference materials
│   ├── index.tsx             # Reference home
│   ├── vocabulary.tsx        # Searchable vocabulary
│   ├── grammar.tsx           # Grammar rules
│   ├── patterns.tsx          # Daily patterns
│   └── search.tsx            # Global search
├── lessons/                   # Lesson system
│   ├── index.tsx             # Lessons overview
│   ├── $categoryId.tsx       # Category view
│   ├── $categoryId.$lessonId.tsx  # Individual lesson
│   └── create.tsx            # Add new lesson (admin)
├── quiz/                      # Quiz system
│   ├── index.tsx             # Quiz dashboard
│   ├── practice.tsx          # Practice mode
│   ├── $lessonId.tsx         # Lesson-specific quiz
│   └── results.tsx           # Results and analytics
├── progress/                  # Progress tracking
│   ├── index.tsx             # Progress overview
│   ├── analytics.tsx         # Detailed analytics
│   └── export.tsx            # Export progress data
└── settings/                  # App settings
    ├── index.tsx             # General settings
    ├── data.tsx              # Data management
    └── import.tsx            # Import lessons/vocab
```

### Database Integration Structure

```
src/db/
├── index.ts                   # Database & Kysely initialization
├── schema.ts                  # TypeScript database schema
├── migrations/                # Kysely migrations
│   ├── 001_initial_schema.ts
│   ├── 002_add_indexes.ts
│   └── 003_sample_data.ts
├── queries/                   # Type-safe Kysely queries
│   ├── lessons.ts
│   ├── vocabulary.ts
│   ├── progress.ts
│   └── quiz.ts
└── types.ts                   # Database types & interfaces
```

## Implementation Plan

### Phase 1: Database Setup & Migration

1. **Database initialization with Kysely**

   ```typescript
   // src/db/index.ts
   import { Pool } from 'pg';
   import { Kysely, PostgresDialect } from 'kysely';
   import { Database as DatabaseSchema } from './schema';
   
   const pool = new Pool({
     host: process.env.DATABASE_HOST || 'localhost',
     port: parseInt(process.env.DATABASE_PORT || '5432'),
     database: process.env.DATABASE_NAME || 'greek_learning',
     user: process.env.DATABASE_USER || 'postgres',
     password: process.env.DATABASE_PASSWORD,
     max: 20, // Maximum number of clients in the pool
     idleTimeoutMillis: 30000,
     connectionTimeoutMillis: 2000,
   });
   
   export const db = new Kysely<DatabaseSchema>({
     dialect: new PostgresDialect({
       pool,
     }),
   });
   
   export default db;
   ```

2. **Database schema definition**

   ```typescript
   // src/db/schema.ts
   import { 
     Generated, 
     Insertable, 
     Selectable, 
     Updateable, 
     ColumnType 
   } from 'kysely';
   
   export interface Database {
     users: UsersTable;
     user_settings: UserSettingsTable;
     lesson_categories: LessonCategoriesTable;
     lessons: LessonsTable;
     lesson_sections: LessonSectionsTable;
     vocabulary: VocabularyTable;
     grammar_rules: GrammarRulesTable;
     grammar_examples: GrammarExamplesTable;
     user_progress: UserProgressTable;
     quiz_questions: QuizQuestionsTable;
     quiz_options: QuizOptionsTable;
     quiz_sessions: QuizSessionsTable;
     quiz_attempts: QuizAttemptsTable;
     daily_patterns: DailyPatternsTable;
     daily_pattern_examples: DailyPatternExamplesTable;
   }
   
   // ENUM types
   export type LessonSectionType = 'vocabulary' | 'grammar' | 'examples' | 'notes' | 'dialogue';
   export type QuizQuestionType = 'multiple_choice' | 'translation' | 'fill_blank' | 'matching' | 'pronunciation';
   export type LessonFocusArea = 'vocabulary' | 'grammar' | 'conversation' | 'reading' | 'listening';
   export type GrammarCategory = 'cases' | 'tenses' | 'pronouns' | 'articles' | 'verbs' | 'adjectives';
   
   export interface UsersTable {
     id: Generated<number>;
     username: string;
     email: string;
     password_hash: string;
     created_at: ColumnType<Date, string | undefined, never>;
     updated_at: ColumnType<Date, string | undefined, never>;
   }
   
   export interface UserSettingsTable {
     id: Generated<number>;
     user_id: number;
     settings: Record<string, any>; // JSONB
     created_at: ColumnType<Date, string | undefined, never>;
     updated_at: ColumnType<Date, string | undefined, never>;
   }
   
   export interface VocabularyTable {
     id: Generated<number>;
     greek_text: string;
     english_translation: string;
     pronunciation: string | null;
     category: string | null;
     example_sentence_greek: string | null;
     example_sentence_english: string | null;
     tags: string[] | null; // PostgreSQL array type
     lesson_id: number | null;
     created_at: ColumnType<Date, string | undefined, never>;
   }
   
   export interface LessonsTable {
     id: Generated<number>;
     category_id: number;
     title: string;
     description: string | null;
     lesson_date: string | null;
     order_index: number | null;
     focus_area: LessonFocusArea | null;
     notes: string | null;
     created_at: ColumnType<Date, string | undefined, never>;
   }
   
   export interface LessonSectionsTable {
     id: Generated<number>;
     lesson_id: number;
     section_type: LessonSectionType;
     title: string | null;
     content: string;
     order_index: number | null;
     created_at: ColumnType<Date, string | undefined, never>;
   }
   
   export interface GrammarRulesTable {
     id: Generated<number>;
     title: string;
     description: string;
     pattern: string | null;
     category: GrammarCategory | null;
     difficulty_level: number;
     lesson_id: number | null;
     created_at: ColumnType<Date, string | undefined, never>;
   }
   
   export interface GrammarExamplesTable {
     id: Generated<number>;
     grammar_rule_id: number;
     greek_example: string;
     english_translation: string;
     notes: string | null;
     order_index: number | null;
     created_at: ColumnType<Date, string | undefined, never>;
   }
   
   export interface QuizQuestionsTable {
     id: Generated<number>;
     lesson_id: number | null;
     question_type: QuizQuestionType;
     question_text: string;
     correct_answer: string;
     explanation: string | null;
     difficulty: number;
     tags: string[] | null;
     created_at: ColumnType<Date, string | undefined, never>;
   }
   
   export interface QuizOptionsTable {
     id: Generated<number>;
     question_id: number;
     option_text: string;
     is_correct: boolean;
     order_index: number | null;
     created_at: ColumnType<Date, string | undefined, never>;
   }
   
   export interface QuizSessionsTable {
     id: Generated<number>;
     user_id: number;
     lesson_id: number | null;
     started_at: ColumnType<Date, string | undefined, never>;
     completed_at: ColumnType<Date, string | undefined, string | undefined>;
     score: number | null;
     total_questions: number | null;
     correct_answers: number | null;
   }
   
   export interface QuizAttemptsTable {
     id: Generated<number>;
     user_id: number;
     session_id: number | null;
     question_id: number;
     user_answer: string;
     is_correct: boolean;
     time_taken: number | null;
     hints_used: number;
     attempted_at: ColumnType<Date, string | undefined, never>;
   }
   
   export interface UserProgressTable {
     id: Generated<number>;
     user_id: number;
     lesson_id: number;
     completed: boolean;
     score: number | null;
     time_spent: number | null;
     attempts: number;
     completed_at: ColumnType<Date, string | undefined, string | undefined>;
     created_at: ColumnType<Date, string | undefined, never>;
   }
   
   export interface DailyPatternsTable {
     id: Generated<number>;
     pattern_greek: string;
     pattern_english: string;
     usage_context: string | null;
     frequency_score: number;
     lesson_id: number | null;
     created_at: ColumnType<Date, string | undefined, never>;
   }
   
   export interface DailyPatternExamplesTable {
     id: Generated<number>;
     pattern_id: number;
     greek_example: string;
     english_translation: string;
     context: string | null;
     order_index: number | null;
     created_at: ColumnType<Date, string | undefined, never>;
   }
   
   export type Vocabulary = Selectable<VocabularyTable>;
   export type NewVocabulary = Insertable<VocabularyTable>;
   export type VocabularyUpdate = Updateable<VocabularyTable>;
   
   export type Lesson = Selectable<LessonsTable>;
   export type NewLesson = Insertable<LessonsTable>;
   export type LessonUpdate = Updateable<LessonsTable>;
   
   export type LessonSection = Selectable<LessonSectionsTable>;
   export type NewLessonSection = Insertable<LessonSectionsTable>;
   export type LessonSectionUpdate = Updateable<LessonSectionsTable>;
   
   export type GrammarRule = Selectable<GrammarRulesTable>;
   export type NewGrammarRule = Insertable<GrammarRulesTable>;
   export type GrammarRuleUpdate = Updateable<GrammarRulesTable>;
   
   export type GrammarExample = Selectable<GrammarExamplesTable>;
   export type NewGrammarExample = Insertable<GrammarExamplesTable>;
   export type GrammarExampleUpdate = Updateable<GrammarExamplesTable>;
   
   export type QuizQuestion = Selectable<QuizQuestionsTable>;
   export type NewQuizQuestion = Insertable<QuizQuestionsTable>;
   export type QuizQuestionUpdate = Updateable<QuizQuestionsTable>;
   
   export type QuizOption = Selectable<QuizOptionsTable>;
   export type NewQuizOption = Insertable<QuizOptionsTable>;
   export type QuizOptionUpdate = Updateable<QuizOptionsTable>;
   
   export type User = Selectable<UsersTable>;
   export type NewUser = Insertable<UsersTable>;
   export type UserUpdate = Updateable<UsersTable>;
   
   export type UserSettings = Selectable<UserSettingsTable>;
   export type NewUserSettings = Insertable<UserSettingsTable>;
   export type UserSettingsUpdate = Updateable<UserSettingsTable>;
   
   export type QuizSession = Selectable<QuizSessionsTable>;
   export type NewQuizSession = Insertable<QuizSessionsTable>;
   export type QuizSessionUpdate = Updateable<QuizSessionsTable>;
   
   export type UserProgress = Selectable<UserProgressTable>;
   export type NewUserProgress = Insertable<UserProgressTable>;
   export type UserProgressUpdate = Updateable<UserProgressTable>;
   
   export type DailyPattern = Selectable<DailyPatternsTable>;
   export type NewDailyPattern = Insertable<DailyPatternsTable>;
   export type DailyPatternUpdate = Updateable<DailyPatternsTable>;
   
   export type DailyPatternExample = Selectable<DailyPatternExamplesTable>;
   export type NewDailyPatternExample = Insertable<DailyPatternExamplesTable>;
   export type DailyPatternExampleUpdate = Updateable<DailyPatternExamplesTable>;
   ```

3. **Kysely migration system**

   ```typescript
   // src/db/migrations/001_initial_schema.ts
   import { Kysely, sql } from 'kysely';
   
   export async function up(db: Kysely<any>): Promise<void> {
     // Create lesson categories table
     await db.schema
       .createTable('lesson_categories')
       .addColumn('id', 'serial', (col) => col.primaryKey())
       .addColumn('name', 'varchar', (col) => col.notNull())
       .addColumn('description', 'text')
       .addColumn('order_index', 'integer')
       .addColumn('created_at', 'timestamp', (col) =>
         col.defaultTo(sql`now()`).notNull()
       )
       .execute();
   
     // Create lessons table
     await db.schema
       .createTable('lessons')
       .addColumn('id', 'serial', (col) => col.primaryKey())
       .addColumn('category_id', 'integer', (col) =>
         col.references('lesson_categories.id').notNull()
       )
       .addColumn('title', 'varchar', (col) => col.notNull())
       .addColumn('description', 'text')
       .addColumn('lesson_date', 'date')
       .addColumn('order_index', 'integer')
       .addColumn('focus_area', 'lesson_focus_area')
       .addColumn('notes', 'text')
       .addColumn('created_at', 'timestamp', (col) =>
         col.defaultTo(sql`now()`).notNull()
       )
       .execute();
   
     // Create vocabulary table
     await db.schema
       .createTable('vocabulary')
       .addColumn('id', 'serial', (col) => col.primaryKey())
       .addColumn('greek_text', 'varchar', (col) => col.notNull())
       .addColumn('english_translation', 'varchar', (col) => col.notNull())
       .addColumn('pronunciation', 'varchar')
       .addColumn('category', 'varchar')
       .addColumn('example_sentence_greek', 'text')
       .addColumn('example_sentence_english', 'text')
       .addColumn('tags', sql`text[]`) // PostgreSQL array
       .addColumn('lesson_id', 'integer', (col) =>
         col.references('lessons.id')
       )
       .addColumn('created_at', 'timestamp', (col) =>
         col.defaultTo(sql`now()`).notNull()
       )
       .execute();
   
     // Create indexes
     await db.schema
       .createIndex('idx_vocabulary_category')
       .on('vocabulary')
       .column('category')
       .execute();
   
     await db.schema
       .createIndex('idx_vocabulary_greek_text')
       .on('vocabulary')
       .using('gin')
       .expression(sql`to_tsvector('english', greek_text)`)
       .execute();
   }
   
   export async function down(db: Kysely<any>): Promise<void> {
     await db.schema.dropTable('vocabulary').execute();
     await db.schema.dropTable('lessons').execute();
     await db.schema.dropTable('lesson_categories').execute();
   }
   ```

4. **Data import from current notes**
   - Parse `8 July.md` and import vocabulary using Kysely
   - Create lesson entries for existing content
   - Set up grammar rules and patterns with type safety

### Phase 2: TanStack Router Setup

 1. **Install dependencies**

   ```bash
   npm install @tanstack/react-router @tanstack/router-plugin pg kysely
   npm install -D @types/pg
   ```

2. **Vite configuration**

   ```typescript
   // vite.config.ts
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'
   import { tanstackRouter } from '@tanstack/router-plugin/vite'
   
   export default defineConfig({
     plugins: [
       tanstackRouter({
         target: 'react',
         autoCodeSplitting: true,
       }),
       react(),
     ],
   })
   ```

3. **Root layout with navigation**

   ```typescript
   // src/routes/__root.tsx
   import { createRootRoute, Outlet } from '@tanstack/react-router'
   import { Navigation } from '../components/Navigation'
   
   export const Route = createRootRoute({
     component: () => (
       <div className="app">
         <Navigation />
         <main>
           <Outlet />
         </main>
       </div>
     ),
   })
   ```

### Phase 3: Core Routes Implementation

1. **Reference System**
   - Searchable vocabulary with filters
   - Grammar rules with examples
   - Daily patterns browser
   - Global search across all content

2. **Lesson System**
   - Lesson categories and progression
   - Individual lesson views
   - Progress tracking per lesson
   - Note-taking capabilities

3. **Quiz System**
   - Multiple question types
   - Adaptive difficulty
   - Progress analytics
   - Spaced repetition logic

### Phase 4: Data Integration from Current Notes

**From `8 July.md`, extract and categorize:**

1. **Lessons with sections (structured, no JSONB):**

   ```typescript
   // src/db/queries/lessons.ts
   import db from '../index';
   import { NewLesson, NewLessonSection } from '../schema';
   
   export async function createLessonWithSections(
     lesson: NewLesson,
     sections: Omit<NewLessonSection, 'lesson_id'>[]
   ) {
     return await db.transaction().execute(async (trx) => {
       const insertedLesson = await trx
         .insertInto('lessons')
         .values(lesson)
         .returningAll()
         .executeTakeFirstOrThrow();
       
       if (sections.length > 0) {
         await trx
           .insertInto('lesson_sections')
           .values(sections.map((section, index) => ({
             ...section,
             lesson_id: insertedLesson.id,
             order_index: section.order_index ?? index
           })))
           .execute();
       }
       
       return insertedLesson;
     });
   }
   
   export async function getLessonWithSections(lessonId: number) {
     const lesson = await db
       .selectFrom('lessons')
       .selectAll()
       .where('id', '=', lessonId)
       .executeTakeFirst();
     
     if (!lesson) return null;
     
     const sections = await db
       .selectFrom('lesson_sections')
       .selectAll()
       .where('lesson_id', '=', lessonId)
       .orderBy('order_index')
       .execute();
     
     return { ...lesson, sections };
   }
   
   // Example: Creating a lesson from your July 8 notes
   const july8Lesson = {
     lesson: {
       category_id: 1,
       title: 'Daily Vocabulary & Grammar Patterns',
       description: 'Learning directional words and like/dislike expressions',
       lesson_date: '2024-07-08',
       focus_area: 'vocabulary_grammar',
       notes: 'Practice with pronouns and directional concepts'
     } as NewLesson,
     sections: [
       {
         section_type: 'vocabulary',
         title: 'New Vocabulary',
         content: 'στο γραφείο (to the office), στη δουλειά (to work), το κύμα (wave), δυνατός (strong/loud)'
       },
       {
         section_type: 'vocabulary', 
         title: 'Directional Words',
         content: 'έξω (outside), μέσα (inside), μέση (middle), κάτω (under), πάνω (over), μπροστά (in front), πίσω (behind), δίπλα (next to)'
       },
       {
         section_type: 'grammar',
         title: 'Like/Dislike Pattern',
         content: 'ΔΕΝ+μου +ΑΡΕΣΕΙ/ΑΡΕΣΟΥΝ - sentences about other people using μου, σου, του, της, μας, σας, τους'
       },
       {
         section_type: 'examples',
         title: 'Time Expressions',
         content: 'όταν ήμουν παιδί (when I was a kid), όταν μιλάω με την πεθερά μου νευριάζω (when I speak with my mother in law I get nervous)'
       }
     ]
   };
   ```

2. **Vocabulary entries with Kysely:**

   ```typescript
   // src/db/queries/vocabulary.ts
   import db from '../index';
   import { NewVocabulary } from '../schema';
   
   export async function insertVocabularyBatch(entries: NewVocabulary[]) {
     return await db.transaction().execute(async (trx) => {
       const results = [];
       for (const entry of entries) {
         const result = await trx
           .insertInto('vocabulary')
           .values(entry)
           .returningAll()
           .executeTakeFirstOrThrow();
         results.push(result);
       }
       return results;
     });
   }
   
   export async function getVocabularyByCategory(category: string) {
     return await db
       .selectFrom('vocabulary')
       .selectAll()
       .where('category', '=', category)
       .orderBy('greek_text')
       .execute();
   }
   
   // Data to import
   const vocabularyEntries: NewVocabulary[] = [
     { greek_text: 'στο γραφείο', english_translation: 'to the office', category: 'locations' },
     { greek_text: 'στη δουλειά', english_translation: 'to work', category: 'locations' },
     { greek_text: 'το κύμα', english_translation: 'wave', category: 'nature' },
     { greek_text: 'δυνατός', english_translation: 'strong/loud', category: 'adjectives' },
     // Directional words
     { greek_text: 'έξω', english_translation: 'outside', category: 'directional' },
     { greek_text: 'μέσα', english_translation: 'inside', category: 'directional' },
     // ... etc
   ];
   ```

2. **Grammar patterns with relational structure:**

   ```typescript
   // src/db/queries/grammar.ts
   import db from '../index';
   import { NewGrammarRule, NewGrammarExample, GrammarRule } from '../schema';
   import { sql } from 'kysely';
   
   export async function insertGrammarRuleWithExamples(
     rule: NewGrammarRule, 
     examples: Omit<NewGrammarExample, 'grammar_rule_id'>[]
   ) {
     return await db.transaction().execute(async (trx) => {
       const insertedRule = await trx
         .insertInto('grammar_rules')
         .values(rule)
         .returningAll()
         .executeTakeFirstOrThrow();
       
       if (examples.length > 0) {
         await trx
           .insertInto('grammar_examples')
           .values(examples.map((example, index) => ({
             ...example,
             grammar_rule_id: insertedRule.id,
             order_index: index
           })))
           .execute();
       }
       
       return insertedRule;
     });
   }
   
   export async function getGrammarRulesByCategory(category: string) {
     return await db
       .selectFrom('grammar_rules')
       .selectAll()
       .where('category', '=', category)
       .orderBy('difficulty_level')
       .orderBy('title')
       .execute();
   }
   
   export async function getGrammarRuleWithExamples(ruleId: number) {
     const rule = await db
       .selectFrom('grammar_rules')
       .selectAll()
       .where('id', '=', ruleId)
       .executeTakeFirst();
     
     if (!rule) return null;
     
     const examples = await db
       .selectFrom('grammar_examples')
       .selectAll()
       .where('grammar_rule_id', '=', ruleId)
       .orderBy('order_index')
       .execute();
     
     return { ...rule, examples };
   }
   
   export async function searchGrammarRules(searchTerm: string) {
     return await db
       .selectFrom('grammar_rules')
       .selectAll()
       .where((eb) => eb.or([
         eb('title', 'ilike', `%${searchTerm}%`),
         eb('description', 'ilike', `%${searchTerm}%`),
         eb('pattern', 'ilike', `%${searchTerm}%`)
       ]))
       .orderBy('difficulty_level')
       .execute();
   }
   
   // Example data insertion
   const grammarRuleData = {
     rule: {
       title: 'Like/Dislike with Pronouns',
       pattern: 'ΔΕΝ+μου +ΑΡΕΣΕΙ/ΑΡΕΣΟΥΝ',
       description: 'Expressing likes/dislikes about other people',
       category: 'pronouns',
       difficulty_level: 2
     } as NewGrammarRule,
     examples: [
       { greek_example: 'μου αρέσει', english_translation: 'I like', notes: 'singular object' },
       { greek_example: 'σου αρέσει', english_translation: 'you like', notes: 'singular object' },
       { greek_example: 'του αρέσει', english_translation: 'he likes', notes: 'singular object' },
       { greek_example: 'μου αρέσουν', english_translation: 'I like', notes: 'plural objects' }
     ]
   };

   // Usage
   await insertGrammarRuleWithExamples(grammarRuleData.rule, grammarRuleData.examples);
   ```

3. **Quiz questions with options (relational structure):**

   ```typescript
   // src/db/queries/quiz.ts
   import db from '../index';
   import { NewQuizQuestion, NewQuizOption } from '../schema';
   
   export async function createQuizQuestionWithOptions(
     question: NewQuizQuestion,
     options: Omit<NewQuizOption, 'question_id'>[]
   ) {
     return await db.transaction().execute(async (trx) => {
       const insertedQuestion = await trx
         .insertInto('quiz_questions')
         .values(question)
         .returningAll()
         .executeTakeFirstOrThrow();
       
       if (options.length > 0) {
         await trx
           .insertInto('quiz_options')
           .values(options.map((option, index) => ({
             ...option,
             question_id: insertedQuestion.id,
             order_index: option.order_index ?? index
           })))
           .execute();
       }
       
       return insertedQuestion;
     });
   }
   
   export async function getQuizQuestionWithOptions(questionId: number) {
     const question = await db
       .selectFrom('quiz_questions')
       .selectAll()
       .where('id', '=', questionId)
       .executeTakeFirst();
     
     if (!question) return null;
     
     const options = await db
       .selectFrom('quiz_options')
       .selectAll()
       .where('question_id', '=', questionId)
       .orderBy('order_index')
       .execute();
     
     return { ...question, options };
   }
   
   // Example quiz question about directional words
   const directionalQuiz = {
     question: {
       lesson_id: 1,
       question_type: 'multiple_choice',
       question_text: 'What does "μέσα" mean in English?',
       correct_answer: 'inside',
       explanation: 'μέσα (mesa) means inside, the opposite of έξω (outside)',
       difficulty: 2,
       tags: ['directional', 'vocabulary']
     } as NewQuizQuestion,
     options: [
       { option_text: 'inside', is_correct: true },
       { option_text: 'outside', is_correct: false },
       { option_text: 'middle', is_correct: false },
       { option_text: 'under', is_correct: false }
     ]
   };
   ```

4. **Daily patterns with database integration:**

   ```typescript
   // src/db/queries/patterns.ts
   import db from '../index';
   import { NewDailyPattern } from '../schema';
   
   export async function insertDailyPattern(pattern: NewDailyPattern) {
     return await db
       .insertInto('daily_patterns')
       .values(pattern)
       .returningAll()
       .executeTakeFirstOrThrow();
   }
   
   export async function getDailyPatternsByFrequency() {
     return await db
       .selectFrom('daily_patterns')
       .selectAll()
       .orderBy('frequency_score', 'desc')
       .orderBy('pattern_greek')
       .execute();
   }
   
   const dailyPatterns: NewDailyPattern[] = [
     { 
       pattern_greek: 'καλή όρεξη', 
       pattern_english: 'bon appétit', 
       usage_context: 'before meals',
       frequency_score: 5
     },
     { 
       pattern_greek: 'όταν μιλάω με την πεθερά μου νευριάζω', 
       pattern_english: 'when I speak with my mother in law I get nervous',
       usage_context: 'expressing emotions',
       frequency_score: 3
     }
   ];
   ```

## Key Features & Improvements

### Kysely Integration Benefits

1. **Type Safety**: Compile-time validation of all database operations
2. **IntelliSense**: Full autocompletion for tables, columns, and query methods
3. **Refactoring Safety**: Schema changes are caught at compile time
4. **Query Building**: Composable, reusable query functions
5. **Migration System**: Type-safe schema migrations with up/down functions
6. **Performance**: Compiled queries with optimal SQL generation

### Enhanced Learning Experience

1. **Spaced Repetition**: Quiz system with intelligent scheduling
2. **Progress Analytics**: Visual progress tracking and statistics
3. **Contextual Learning**: Related vocabulary and grammar linked together
4. **Search & Discovery**: Powerful search across all content types

### Data Management

1. **Robust Database**: PostgreSQL with ACID compliance and reliability
2. **Type-Safe Queries**: Kysely provides compile-time query validation
3. **Migration Management**: Version-controlled schema changes with Kysely migrations
4. **Advanced Features**: JSONB, arrays, full-text search, and GIN indexes
5. **Performance**: Connection pooling and query optimization
6. **Query Composition**: Reusable, composable query functions
7. **Scalability**: Easy to scale from local development to production

### User Experience

1. **Fast Navigation**: File-based routing with code splitting
2. **Type Safety**: Full TypeScript integration
3. **Responsive Design**: Mobile-first approach
4. **Accessibility**: ARIA labels and keyboard navigation

## Migration Strategy

### From Current App

1. **Extract existing data** from components into database
2. **Preserve current UI patterns** but enhance with routing
3. **Gradual migration** - implement new features alongside existing
4. **Data validation** - ensure no content is lost in transition

### Testing Strategy

1. **Database tests** for data integrity
2. **Route tests** for navigation flows
3. **Integration tests** for quiz system
4. **Performance tests** for large datasets

## Future Enhancements

### Advanced Features

1. **Audio Integration**: Pronunciation guides
2. **Image Support**: Visual vocabulary cards
3. **Sync**: Cloud backup and multi-device sync
4. **AI Integration**: Adaptive learning algorithms
5. **Community Features**: Shared lessons and progress

### Technical Improvements

1. **PWA Support**: Offline capability
2. **Performance Monitoring**: Query optimization
3. **Advanced Analytics**: Learning pattern analysis
4. **Plugin System**: Extensible content types

## PostgreSQL Development Setup

### Local Development

```bash
# Using Docker for local PostgreSQL
docker run --name greek-learning-db \
  -e POSTGRES_PASSWORD=your_password \
  -e POSTGRES_DB=greek_learning \
  -p 5432:5432 \
  -d postgres:15

# Or using Homebrew (macOS)
brew install postgresql@15
brew services start postgresql@15
createdb greek_learning
```

### Environment Variables

```bash
# .env.local
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=greek_learning
DATABASE_USER=postgres
DATABASE_PASSWORD=your_password
```

### Production Deployment

- **Supabase**: Managed PostgreSQL with real-time features
- **Railway**: Simple PostgreSQL deployment
- **Neon**: Serverless PostgreSQL with branching
- **Vercel Postgres**: Integrated with Vercel deployments

## PostgreSQL Advantages for Language Learning

### Advanced Features

1. **Relational Structure**: Fully normalized schema with predictable data structures
2. **Type Safety**: Complete TypeScript type safety with Kysely throughout the application
3. **Array Types**: Multiple tags and categories per vocabulary item
4. **Full-Text Search**: Advanced search across Greek and English text
5. **GIN Indexes**: Optimized performance for text search and array queries
6. **Window Functions**: Advanced analytics and progress tracking
7. **Triggers**: Automatic timestamp updates and data validation

### Relational Design Benefits

1. **Predictable Rendering**: All data structures are known at compile time
2. **Type-Safe Queries**: No guessing about JSONB structure, full TypeScript support
3. **Better Performance**: Normalized queries are more efficient than JSON operations
4. **Easier Maintenance**: Clear relationships between entities
5. **Query Flexibility**: Join operations for complex data retrieval
6. **Data Integrity**: Foreign key constraints ensure referential integrity

### Performance Benefits

1. **Connection Pooling**: Efficient resource management
2. **Query Optimization**: Advanced query planner
3. **Concurrent Access**: Multiple users without locking issues
4. **Indexing**: Multiple index types for different query patterns
5. **Partitioning**: Scale large tables (future growth)

## Timeline

### Week 1-2: Foundation

- PostgreSQL setup and connection
- Database schema and migrations with Kysely
- Basic routing setup with TanStack Router
- Data import from current notes

### Week 3-4: Core Features

- Reference system with full-text search
- Lesson structure with relational sections
- Progress tracking with analytics
- Tag-based vocabulary organization

### Week 5-6: Quiz System

- Advanced question types with relational options
- Results tracking and analytics
- Spaced repetition algorithms
- Performance insights

### Week 7-8: Polish & Testing

- Advanced search functionality
- Performance optimization
- Database query optimization
- Comprehensive testing

This rewrite will transform the Greek learning app into a comprehensive, production-ready learning platform with PostgreSQL's robust relational features, fully type-safe database operations via Kysely, and modern routing with TanStack Router. The relational design ensures predictable data structures, better performance, and complete type safety throughout the application.
