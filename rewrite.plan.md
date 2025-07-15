# Greek Learning App Minimal Database Enhancement

## Overview

**Focus:** Add a lightweight database for dynamic vocabulary tracking and quiz generation while keeping static grammar rules and lessons as frontend components. This solves the real problems (searchable vocabulary, progress tracking, quiz system) without over-engineering.

**Timeline:** 1-2 hours of implementation, not weeks.

## Architecture Philosophy

### What Goes in Database (Dynamic Data)

- **Vocabulary:** Searchable, trackable, with progress states
- **Quizzes:** Auto-generated from vocabulary, with performance tracking
- **Progress:** Simple tracking of learning states

### What Stays Frontend (Static Data)

- **Grammar rules:** Keep in `constants/recognition.ts`
- **Verb conjugations:** Keep in `constants/verbs.ts`
- **Article patterns:** Keep in `constants/articles.ts`
- **Lesson content:** Keep as components (no complex CMS needed)

## Technology Stack

### Minimal Stack

- **PostgreSQL**: Production-ready database with Docker Compose
- **Kysely**: Type-safe queries (keep the good parts)
- **Existing React components**: Enhance, don't replace
- **TanStack Router**: Optional, can add later if needed

## Database Schema (5 Tables Only)

```sql
-- Core vocabulary with learning progress
CREATE TABLE vocabulary (
  id SERIAL PRIMARY KEY,
  greek_text VARCHAR NOT NULL,
  english_translation VARCHAR NOT NULL,
  pronunciation VARCHAR,
  category VARCHAR, -- 'grammar', 'directional', 'numbers', etc.
  difficulty_level INTEGER DEFAULT 0, -- 0=new, 1=learning, 2=mastered
  review_count INTEGER DEFAULT 0,
  last_reviewed DATE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Auto-generated quiz questions from vocabulary
CREATE TABLE quiz_questions (
  id SERIAL PRIMARY KEY,
  vocabulary_id INTEGER REFERENCES vocabulary(id),
  question_type VARCHAR, -- 'greek_to_english', 'english_to_greek', 'multiple_choice'
  question_text TEXT NOT NULL,
  correct_answer TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Quiz sessions (group of questions attempted together)
CREATE TABLE quiz_sessions (
  id SERIAL PRIMARY KEY,
  category VARCHAR, -- filter by vocab category
  total_questions INTEGER,
  correct_answers INTEGER,
  started_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);

-- Individual quiz attempts
CREATE TABLE quiz_attempts (
  id SERIAL PRIMARY KEY,
  session_id INTEGER REFERENCES quiz_sessions(id),
  question_id INTEGER REFERENCES quiz_questions(id),
  user_answer TEXT,
  is_correct BOOLEAN,
  time_taken INTEGER, -- seconds
  attempted_at TIMESTAMP DEFAULT NOW()
);

-- Simple progress tracking for any item
CREATE TABLE progress (
  id SERIAL PRIMARY KEY,
  item_type VARCHAR, -- 'vocabulary', 'lesson', 'pattern'
  item_id VARCHAR,   -- vocabulary.id or lesson name
  status VARCHAR,    -- 'difficult', 'learning', 'mastered', 'review'
  notes TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_vocabulary_greek_text ON vocabulary(greek_text);
CREATE INDEX idx_vocabulary_category ON vocabulary(category);
CREATE INDEX idx_vocabulary_difficulty ON vocabulary(difficulty_level);
CREATE INDEX idx_progress_item ON progress(item_type, item_id);

-- Optional: Full-text search indexes
CREATE INDEX idx_vocabulary_search ON vocabulary USING gin(to_tsvector('english', greek_text || ' ' || english_translation));
```

## Database Setup (PostgreSQL + Docker Compose)

### 1. Docker Compose Setup (1 minute)

```yaml
# docker-compose.yml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: greek_learning
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: your_password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

```bash
# Start database
docker-compose up -d
```

### 2. Install Dependencies (1 minute)

```bash
npm install pg kysely
npm install -D @types/pg
```

### 3. Database Configuration

```typescript
// src/db/index.ts
import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';
import { DatabaseSchema } from './schema';

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'greek_learning',
  user: 'postgres',
  password: 'your_password',
  max: 20,
});

export const db = new Kysely<DatabaseSchema>({
  dialect: new PostgresDialect({
    pool,
  }),
});

// Simple migration on startup
export async function initializeDatabase() {
  // Run the schema creation SQL here
  // (could extract to separate migration file later if needed)
}
```

### 3. TypeScript Schema

```typescript
// src/db/schema.ts
import { Generated, Insertable, Selectable, Updateable, ColumnType } from 'kysely';

export interface DatabaseSchema {
  vocabulary: VocabularyTable;
  quiz_questions: QuizQuestionsTable;
  quiz_sessions: QuizSessionsTable;
  quiz_attempts: QuizAttemptsTable;
  progress: ProgressTable;
}

export interface VocabularyTable {
  id: Generated<number>;
  greek_text: string;
  english_translation: string;
  pronunciation: string | null;
  category: string | null;
  difficulty_level: number;
  review_count: number;
  last_reviewed: ColumnType<Date, string | undefined, string | undefined>;
  created_at: ColumnType<Date, string | undefined, never>;
}

export interface QuizQuestionsTable {
  id: Generated<number>;
  vocabulary_id: number;
  question_type: string;
  question_text: string;
  correct_answer: string;
  created_at: ColumnType<Date, string | undefined, never>;
}

export interface QuizSessionsTable {
  id: Generated<number>;
  category: string | null;
  total_questions: number | null;
  correct_answers: number | null;
  started_at: ColumnType<Date, string | undefined, never>;
  completed_at: ColumnType<Date, string | undefined, string | undefined>;
}

export interface QuizAttemptsTable {
  id: Generated<number>;
  session_id: number;
  question_id: number;
  user_answer: string;
  is_correct: boolean;
  time_taken: number | null;
  attempted_at: ColumnType<Date, string | undefined, never>;
}

export interface ProgressTable {
  id: Generated<number>;
  item_type: string;
  item_id: string;
  status: string;
  notes: string | null;
  updated_at: ColumnType<Date, string | undefined, never>;
}

// Type helpers
export type Vocabulary = Selectable<VocabularyTable>;
export type NewVocabulary = Insertable<VocabularyTable>;
export type VocabularyUpdate = Updateable<VocabularyTable>;

export type QuizSession = Selectable<QuizSessionsTable>;
export type NewQuizSession = Insertable<QuizSessionsTable>;

export type QuizAttempt = Selectable<QuizAttemptsTable>;
export type NewQuizAttempt = Insertable<QuizAttemptsTable>;

export type Progress = Selectable<ProgressTable>;
export type NewProgress = Insertable<ProgressTable>;
```

## Data Migration (15 minutes)

### Import Existing Vocabulary

```typescript
// src/db/migrations/import-vocabulary.ts
import { db } from '../index';
import { ALL_WORDS } from '../../constants/vocabulary';

export async function importVocabularyData() {
  console.log('Importing vocabulary data...');
  
  for (const word of ALL_WORDS) {
    await db.insertInto('vocabulary').values({
      greek_text: word.greek,
      english_translation: word.english,
      pronunciation: word.pronunciation || null,
      category: word.category || 'general',
      difficulty_level: 0,
      review_count: 0
    }).execute();
  }
  
  console.log(`Imported ${ALL_WORDS.length} vocabulary words`);
}

// Auto-generate quiz questions for all vocabulary
export async function generateQuizQuestions() {
  const vocabulary = await db.selectFrom('vocabulary').selectAll().execute();
  
  for (const vocab of vocabulary) {
    // Greek → English question
    await db.insertInto('quiz_questions').values({
      vocabulary_id: vocab.id,
      question_type: 'greek_to_english',
      question_text: `What does "${vocab.greek_text}" mean?`,
      correct_answer: vocab.english_translation
    }).execute();
    
    // English → Greek question  
    await db.insertInto('quiz_questions').values({
      vocabulary_id: vocab.id,
      question_type: 'english_to_greek',
      question_text: `How do you say "${vocab.english_translation}" in Greek?`,
      correct_answer: vocab.greek_text
    }).execute();
  }
  
  console.log(`Generated ${vocabulary.length * 2} quiz questions`);
}
```

## Enhanced Components (30 minutes)

### 1. Enhanced Vocabulary Search

```typescript
// src/components/EnhancedVocabulary.tsx
import { useState, useEffect } from 'react';
import { db } from '../db';
import { Vocabulary } from '../db/schema';

export function EnhancedVocabulary() {
  const [vocabulary, setVocabulary] = useState<Vocabulary[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    loadVocabulary();
  }, [searchTerm, categoryFilter]);

  const loadVocabulary = async () => {
    let query = db.selectFrom('vocabulary').selectAll();
    
    if (searchTerm) {
      query = query.where((eb) => eb.or([
        eb('greek_text', 'like', `%${searchTerm}%`),
        eb('english_translation', 'like', `%${searchTerm}%`)
      ]));
    }
    
    if (categoryFilter !== 'all') {
      query = query.where('category', '=', categoryFilter);
    }
    
    const results = await query.execute();
    setVocabulary(results);
  };

  const markDifficulty = async (vocabId: number, level: number) => {
    await db.updateTable('vocabulary')
      .set({ difficulty_level: level, last_reviewed: new Date().toISOString() })
      .where('id', '=', vocabId)
      .execute();
    
    loadVocabulary(); // Refresh
  };

  return (
    <div className="vocabulary-enhanced">
      <div className="search-controls">
        <input
          type="text"
          placeholder="Search vocabulary..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select 
          value={categoryFilter} 
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="grammar">Grammar</option>
          <option value="directional">Directional</option>
          <option value="numbers">Numbers</option>
        </select>
      </div>

      <div className="vocabulary-list">
        {vocabulary.map((word) => (
          <div key={word.id} className="vocabulary-item">
            <div className="word-pair">
              <span className="greek">{word.greek_text}</span>
              <span className="english">{word.english_translation}</span>
              {word.pronunciation && (
                <span className="pronunciation">/{word.pronunciation}/</span>
              )}
            </div>
            
            <div className="difficulty-controls">
              <button 
                onClick={() => markDifficulty(word.id, 0)}
                className={word.difficulty_level === 0 ? 'active' : ''}
              >
                New
              </button>
              <button 
                onClick={() => markDifficulty(word.id, 1)}
                className={word.difficulty_level === 1 ? 'active' : ''}
              >
                Learning
              </button>
              <button 
                onClick={() => markDifficulty(word.id, 2)}
                className={word.difficulty_level === 2 ? 'active' : ''}
              >
                Mastered
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 2. Simple Quiz System

```typescript
// src/components/SimpleQuiz.tsx
import { useState, useEffect } from 'react';
import { sql } from 'kysely';
import { db } from '../db';
import { QuizQuestion, NewQuizSession, NewQuizAttempt } from '../db/schema';

export function SimpleQuiz({ category }: { category?: string }) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  useEffect(() => {
    startQuiz();
  }, [category]);

  const startQuiz = async () => {
    // Get random questions, optionally filtered by category
    let query = db.selectFrom('quiz_questions')
      .innerJoin('vocabulary', 'vocabulary.id', 'quiz_questions.vocabulary_id')
      .selectAll();
    
    if (category) {
      query = query.where('vocabulary.category', '=', category);
    }
    
    const allQuestions = await query.execute();
    const randomQuestions = shuffleArray(allQuestions).slice(0, 10);
    
    setQuestions(randomQuestions);
    setCurrentIndex(0);
    setScore({ correct: 0, total: 0 });
    
    // Start new session
    const session = await db.insertInto('quiz_sessions')
      .values({
        category: category || null,
        total_questions: randomQuestions.length
      })
      .returningAll()
      .executeTakeFirst();
    
    setSessionId(session?.id || null);
  };

  const submitAnswer = async () => {
    if (!sessionId || !questions[currentIndex]) return;
    
    const question = questions[currentIndex];
    const isCorrect = userAnswer.toLowerCase().trim() === 
                     question.correct_answer.toLowerCase().trim();
    
    // Record attempt
    await db.insertInto('quiz_attempts').values({
      session_id: sessionId,
      question_id: question.id,
      user_answer: userAnswer,
      is_correct: isCorrect
    }).execute();
    
    // Update score
    const newScore = {
      correct: score.correct + (isCorrect ? 1 : 0),
      total: score.total + 1
    };
    setScore(newScore);
    
         // Update vocabulary difficulty based on performance
     if (!isCorrect) {
       await db.updateTable('vocabulary')
         .set({ 
           difficulty_level: Math.max(0, 1), // Mark as needing practice
           review_count: sql`review_count + 1`
         })
         .where('id', '=', question.vocabulary_id)
         .execute();
     }
    
    // Move to next question
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserAnswer('');
    } else {
      // End session
      await db.updateTable('quiz_sessions')
        .set({ 
          completed_at: new Date().toISOString(),
          correct_answers: newScore.correct
        })
        .where('id', '=', sessionId)
        .execute();
      
      alert(`Quiz complete! Score: ${newScore.correct}/${newScore.total}`);
    }
  };

  if (questions.length === 0) {
    return <div>Loading quiz...</div>;
  }

  const currentQuestion = questions[currentIndex];
  
  return (
    <div className="simple-quiz">
      <div className="quiz-progress">
        Question {currentIndex + 1} of {questions.length} | 
        Score: {score.correct}/{score.total}
      </div>
      
      <div className="question">
        <h3>{currentQuestion.question_text}</h3>
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && submitAnswer()}
          placeholder="Type your answer..."
          autoFocus
        />
        <button onClick={submitAnswer}>Submit Answer</button>
      </div>
    </div>
  );
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
```

## File Structure (Keep It Simple)

```
src/
├── components/
│   ├── EnhancedVocabulary.tsx    # NEW: Database-backed vocabulary
│   ├── SimpleQuiz.tsx            # NEW: Quiz system
│   ├── GreekReference.tsx        # KEEP: Static grammar rules
│   ├── PresentTense.tsx          # KEEP: Static verb conjugations
│   └── ... (all existing components)
├── constants/
│   ├── recognition.ts            # KEEP: Static grammar patterns
│   ├── verbs.ts                 # KEEP: Static verb tables
│   ├── articles.ts              # KEEP: Static article rules
│   └── vocabulary.ts            # MIGRATE: Move to database
├── db/
│   ├── index.ts                 # Database connection
│   ├── schema.ts                # Type definitions
│   └── migrations/
│       └── import-vocabulary.ts  # Data import scripts
└── ...
```

## Implementation Timeline

### Hour 1: Database Setup

- ✅ Docker Compose + PostgreSQL (3 min)
- ✅ Install dependencies + Kysely setup (5 min)
- ✅ Create schema and types (15 min)
- ✅ Import vocabulary data (15 min)
- ✅ Generate quiz questions (15 min)
- ✅ Test database operations (7 min)

### Hour 2: Enhanced Components  

- ✅ Enhanced vocabulary search (30 min)
- ✅ Simple quiz component (25 min)
- ✅ Integration testing (5 min)

### Optional Later Enhancements

- Add TanStack Router if needed
- Export/import data features
- Better quiz question types
- Progress analytics dashboard

## Benefits of This Approach

### ✅ **Solves Real Problems**

- Searchable vocabulary during lessons
- Progress tracking for weak areas
- Simple quiz system for practice

### ✅ **Minimal Complexity**

- Single Docker Compose command (production-ready database)
- Keep existing components working
- Add features incrementally
- Future-proof with PostgreSQL scalability

### ✅ **Quick Implementation**

- Working improvement in 1-2 hours
- Use it next week, not next month
- Focus on learning Greek, not building tools

### ✅ **Future-Friendly**

- Can add complexity later if needed
- Database foundation for future features
- TypeScript safety preserved

## Success Metrics

**Instead of building for weeks, you should have:**

- ✅ Searchable vocabulary next week
- ✅ Simple progress tracking  
- ✅ Quiz system for practice
- ✅ More time actually learning Greek

This approach gives you 80% of the benefits with 5% of the complexity. Perfect for actually improving your Greek learning instead of getting lost in tool development.
