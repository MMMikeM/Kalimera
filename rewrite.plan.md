# Greek Learning App: User-Centric Enhancement

## Overview

**Focus:** Enhance the app around your actual learning workflow: Quick Reference during lessons → Vocabulary study → Targeted practice. Add lightweight database only for dynamic tracking while keeping grammar rules as instant-access components.

## User-Centric Structure

### 1. **Quick Reference** (During Lessons)

*Instant lookup for live conversations - all static, fast-loading components*

- **Articles & Cases** (το vs τον vs του)
- **Pronouns** (σου vs εσύ vs σας) - *separate section for your confusion points*
- **Verb Patterns** (conjugation families)
- **Prepositions** (με τον, στο, από το)

### 2. **Vocabulary** (Searchable/Trackable)

*Organized by real usage, backed by database for progress tracking*

- **By Category** (family, food, directions, time) - *practical groupings*
- **By Difficulty** (new, learning, mastered) - *your progress*  
- **Problem Words** (ones you keep forgetting) - *focused attention*

### 3. **Practice**

*Targeted drilling based on your weak spots*

- **Quick Drills** (case recognition, verb forms)
- **Vocab Quizzes** (Greek→English, English→Greek)
- **Weak Areas** (focused on your mistakes)

## Architecture Philosophy

### What Goes in Database (Dynamic Learning Data)

- **Vocabulary with categories:** Family, food, directions, time (not grammar-based)
- **Problem word tracking:** Words you consistently get wrong
- **Practice results:** Quiz performance, weak area identification
- **Difficulty progression:** Your personal learning states

### What Stays Frontend (Quick Reference)

- **Grammar rules:** Articles, cases, preposition patterns
- **Verb conjugations:** Pattern families for instant lookup  
- **Pronouns:** Dedicated section for σου/εσύ confusion
- **All static content:** Fast loading during conversations

## Technology Stack

*Same minimal approach, better organized*

- **PostgreSQL**: Production-ready database with Docker Compose
- **Kysely**: Type-safe queries
- **Enhanced React components**: Organized around user workflow
- **Fast static lookups**: No database calls for grammar reference

## Database Schema (4 Core + 2 Sidecar Tables, User-Focused)

```sql
-- Central vocabulary table (unified, fast operations)
CREATE TABLE vocabulary (
  id SERIAL PRIMARY KEY,
  greek_text VARCHAR NOT NULL,
  english_translation VARCHAR NOT NULL,
  pronunciation VARCHAR,
  word_type VARCHAR, -- 'noun', 'verb', etc. - Nullable until processed from inbox
  category VARCHAR, -- 'family', 'food', etc. - Nullable until processed
  example_greek TEXT, -- Example sentence in Greek
  example_english TEXT, -- Example sentence in English
  status VARCHAR NOT NULL DEFAULT 'unprocessed', -- 'unprocessed' for inbox, 'processed' for active use
  difficulty_level INTEGER DEFAULT 0, -- 0=new, 1=learning, 2=mastered
  is_problem_word BOOLEAN DEFAULT FALSE, -- Track consistently missed words
  mistake_count INTEGER DEFAULT 0, -- How many times gotten wrong
  review_count INTEGER DEFAULT 0,
  last_reviewed DATE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Grammatical details for nouns (only when needed)
CREATE TABLE noun_details (
  vocab_id INTEGER PRIMARY KEY REFERENCES vocabulary(id) ON DELETE CASCADE,
  gender VARCHAR NOT NULL, -- 'masculine', 'feminine', 'neuter'
  nominative_singular VARCHAR NOT NULL,
  accusative_singular VARCHAR,
  genitive_singular VARCHAR,
  nominative_plural VARCHAR,
  accusative_plural VARCHAR,
  genitive_plural VARCHAR,
  notes TEXT -- for irregular patterns
);

-- Grammatical details for verbs (only when needed)
CREATE TABLE verb_details (
  vocab_id INTEGER PRIMARY KEY REFERENCES vocabulary(id) ON DELETE CASCADE,
  infinitive VARCHAR NOT NULL,
  conjugation_family VARCHAR NOT NULL, -- '-ω', '-ομαι', 'irregular'
  notes TEXT -- for irregular patterns
);

-- Individual verb conjugations (fully relational, no JSON)
CREATE TABLE verb_conjugations (
  id SERIAL PRIMARY KEY,
  verb_details_id INTEGER NOT NULL REFERENCES verb_details(vocab_id) ON DELETE CASCADE,
  tense VARCHAR NOT NULL, -- e.g., 'present', 'future', 'past'
  person VARCHAR NOT NULL, -- e.g., 'ego', 'esy', 'aftos'
  form VARCHAR NOT NULL -- e.g., 'κάνω', 'κάνεις'
);

-- Tracks user's grammatical weak spots based on practice performance.
-- This table is populated by analyzing mistakes from the 'practice_attempts' table.
CREATE TABLE weak_areas (
  id SERIAL PRIMARY KEY,
  area_type VARCHAR NOT NULL, -- e.g., 'case', 'gender', 'verb_family'
  area_identifier VARCHAR NOT NULL, -- e.g., 'accusative_singular', 'feminine', '-ομαι'
  mistake_count INTEGER DEFAULT 1,
  last_mistake_at TIMESTAMP DEFAULT NOW(),
  needs_focus BOOLEAN DEFAULT TRUE -- Flag for inclusion in targeted practice
);

-- Practice sessions (unchanged - works with any word type)
CREATE TABLE practice_sessions (
  id SERIAL PRIMARY KEY,
  session_type VARCHAR, -- 'vocab_quiz', 'case_drill', 'conjugation_drill', 'weak_area_focus'
  category VARCHAR, -- filter by vocab category or grammar topic
  word_type_filter VARCHAR, -- 'noun', 'verb', etc. (optional filter)
  total_questions INTEGER,
  correct_answers INTEGER,
  focus_area VARCHAR, -- 'problem_words', 'new_words', 'case_recognition', 'gender_agreement'
  started_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);

-- Individual practice attempts (unchanged - simple vocabulary reference)
CREATE TABLE practice_attempts (
  id SERIAL PRIMARY KEY,
  session_id INTEGER REFERENCES practice_sessions(id),
  vocabulary_id INTEGER REFERENCES vocabulary(id), -- Always points to main table
  question_text TEXT NOT NULL,
  correct_answer TEXT NOT NULL,
  user_answer TEXT,
  is_correct BOOLEAN,
  time_taken INTEGER, -- seconds
  attempted_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_vocabulary_category ON vocabulary(category);
CREATE INDEX idx_vocabulary_word_type ON vocabulary(word_type);
CREATE INDEX idx_vocabulary_difficulty ON vocabulary(difficulty_level);
CREATE INDEX idx_vocabulary_problems ON vocabulary(is_problem_word) WHERE is_problem_word = TRUE;

-- Search functionality (unified across all word types)
CREATE INDEX idx_vocabulary_search ON vocabulary USING gin(to_tsvector('english', greek_text || ' ' || english_translation));
```

## Enhanced Components (User Workflow-Focused)

### 1. Quick Reference Dashboard

*Fast, static components for during lessons*

```typescript
// src/components/QuickReference.tsx
import { ArticlesAndCases } from './reference/ArticlesAndCases';
import { PronounGuide } from './reference/PronounGuide'; 
import { VerbPatterns } from './reference/VerbPatterns';
import { PrepositionGuide } from './reference/PrepositionGuide';

export function QuickReference() {
  const [activeSection, setActiveSection] = useState('articles');

  return (
    <div className="quick-reference">
      <div className="reference-tabs">
        <button 
          onClick={() => setActiveSection('articles')}
          className={activeSection === 'articles' ? 'active' : ''}
        >
          Articles & Cases
        </button>
        <button 
          onClick={() => setActiveSection('pronouns')}
          className={activeSection === 'pronouns' ? 'active' : ''}
        >
          Pronouns (σου/εσύ)
        </button>
        <button 
          onClick={() => setActiveSection('verbs')}
          className={activeSection === 'verbs' ? 'active' : ''}
        >
          Verb Patterns
        </button>
        <button 
          onClick={() => setActiveSection('prepositions')}
          className={activeSection === 'prepositions' ? 'active' : ''}
        >
          Prepositions
        </button>
      </div>

      <div className="reference-content">
        {activeSection === 'articles' && <ArticlesAndCases />}
        {activeSection === 'pronouns' && <PronounGuide />}
        {activeSection === 'verbs' && <VerbPatterns />}
        {activeSection === 'prepositions' && <PrepositionGuide />}
      </div>
    </div>
  );
}
```

### 2. Category-Based Vocabulary

*Organized by real usage, not grammar*

```typescript
// src/components/CategoryVocabulary.tsx
import { useState, useEffect } from 'react';
import { db } from '../db';
import { Vocabulary } from '../db/schema';

const VOCABULARY_CATEGORIES = [
  'family', 'food', 'directions', 'time', 'emotions', 
  'daily_activities', 'shopping', 'transportation'
];

export function CategoryVocabulary() {
  const [selectedCategory, setSelectedCategory] = useState('family');
  const [vocabulary, setVocabulary] = useState<Vocabulary[]>([]);
  const [showProblemsOnly, setShowProblemsOnly] = useState(false);
  const [difficultyFilter, setDifficultyFilter] = useState('all');

  useEffect(() => {
    loadVocabulary();
  }, [selectedCategory, showProblemsOnly, difficultyFilter]);

  const loadVocabulary = async () => {
    let query = db.selectFrom('vocabulary')
      .selectAll()
      .where('category', '=', selectedCategory);
    
    if (showProblemsOnly) {
      query = query.where('is_problem_word', '=', true);
    }
    
    if (difficultyFilter !== 'all') {
      const level = difficultyFilter === 'new' ? 0 : 
                   difficultyFilter === 'learning' ? 1 : 2;
      query = query.where('difficulty_level', '=', level);
    }
    
    const results = await query
      .orderBy(['difficulty_level', 'mistake_count desc'])
      .execute();
    setVocabulary(results);
  };

  const markProblemWord = async (vocabId: number, isProblem: boolean) => {
    await db.updateTable('vocabulary')
      .set({ 
        is_problem_word: isProblem,
        mistake_count: isProblem ? db.selectFrom('vocabulary').select(sql`mistake_count + 1`.as('count')) : 0
      })
      .where('id', '=', vocabId)
      .execute();
    
    loadVocabulary();
  };

  const updateDifficulty = async (vocabId: number, level: number) => {
    await db.updateTable('vocabulary')
      .set({ 
        difficulty_level: level, 
        last_reviewed: new Date().toISOString().split('T')[0]
      })
      .where('id', '=', vocabId)
      .execute();
    
    loadVocabulary();
  };

  return (
    <div className="category-vocabulary">
      <div className="category-controls">
        <div className="category-tabs">
          {VOCABULARY_CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? 'active' : ''}
            >
              {category.replace('_', ' ')}
            </button>
          ))}
        </div>
        
        <div className="filters">
          <label>
            <input
              type="checkbox"
              checked={showProblemsOnly}
              onChange={(e) => setShowProblemsOnly(e.target.checked)}
            />
            Problem Words Only
          </label>
          
          <select 
            value={difficultyFilter} 
            onChange={(e) => setDifficultyFilter(e.target.value)}
          >
            <option value="all">All Levels</option>
            <option value="new">New</option>
            <option value="learning">Learning</option>
            <option value="mastered">Mastered</option>
          </select>
        </div>
      </div>

      <div className="vocabulary-grid">
        {vocabulary.map((word) => (
          <div 
            key={word.id} 
            className={`vocab-card ${word.is_problem_word ? 'problem-word' : ''}`}
          >
            <div className="word-content">
              <div className="greek-text">{word.greek_text}</div>
              <div className="english-text">{word.english_translation}</div>
              {word.pronunciation && (
                <div className="pronunciation">/{word.pronunciation}/</div>
              )}
              {word.mistake_count > 0 && (
                <div className="mistake-count">Missed {word.mistake_count} times</div>
              )}
            </div>
            
            <div className="word-controls">
              <div className="difficulty-buttons">
                <button 
                  onClick={() => updateDifficulty(word.id, 0)}
                  className={word.difficulty_level === 0 ? 'active' : ''}
                >
                  New
                </button>
                <button 
                  onClick={() => updateDifficulty(word.id, 1)}
                  className={word.difficulty_level === 1 ? 'active' : ''}
                >
                  Learning
                </button>
                <button 
                  onClick={() => updateDifficulty(word.id, 2)}
                  className={word.difficulty_level === 2 ? 'active' : ''}
                >
                  Mastered
                </button>
              </div>
              
              <button 
                onClick={() => markProblemWord(word.id, !word.is_problem_word)}
                className={`problem-toggle ${word.is_problem_word ? 'active' : ''}`}
              >
                {word.is_problem_word ? 'Remove from Problems' : 'Mark as Problem'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 3. Targeted Practice System

*Focused on your weak spots*

```typescript
// src/components/TargetedPractice.tsx
import { useState, useEffect } from 'react';
import { db } from '../db';

type PracticeMode = 'vocab_quiz' | 'weak_areas' | 'case_drill' | 'problem_words';

export function TargetedPractice() {
  const [practiceMode, setPracticeMode] = useState<PracticeMode>('vocab_quiz');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [weakAreas, setWeakAreas] = useState<any[]>([]);

  useEffect(() => {
    loadWeakAreas();
  }, []);

  const loadWeakAreas = async () => {
    const areas = await db.selectFrom('weak_areas')
      .selectAll()
      .where('needs_focus', '=', true)
      .orderBy('mistake_frequency', 'desc')
      .execute();
    setWeakAreas(areas);
  };

  const startPractice = async () => {
    // Create practice session based on mode
    const session = await db.insertInto('practice_sessions')
      .values({
        session_type: practiceMode,
        category: selectedCategory || null,
        focus_area: practiceMode === 'problem_words' ? 'problem_words' : 
                   practiceMode === 'weak_areas' ? 'weak_areas' : null
      })
      .returningAll()
      .executeTakeFirst();
    
    // Navigate to practice component with session ID
    // Implementation depends on your routing setup
  };

  return (
    <div className="targeted-practice">
      <h2>Practice</h2>
      
      <div className="practice-modes">
        <div 
          className={`practice-card ${practiceMode === 'vocab_quiz' ? 'active' : ''}`}
          onClick={() => setPracticeMode('vocab_quiz')}
        >
          <h3>Vocabulary Quiz</h3>
          <p>Greek ↔ English practice by category</p>
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          >
            <option value="">All Categories</option>
            <option value="family">Family</option>
            <option value="food">Food</option>
            <option value="directions">Directions</option>
            <option value="time">Time</option>
          </select>
        </div>

        <div 
          className={`practice-card ${practiceMode === 'problem_words' ? 'active' : ''}`}
          onClick={() => setPracticeMode('problem_words')}
        >
          <h3>Problem Words</h3>
          <p>Focus on words you keep forgetting</p>
          <div className="stats">
            {/* Show count of problem words */}
          </div>
        </div>

        <div 
          className={`practice-card ${practiceMode === 'weak_areas' ? 'active' : ''}`}
          onClick={() => setPracticeMode('weak_areas')}
        >
          <h3>Weak Areas</h3>
          <p>Target your most common mistakes</p>
          <div className="weak-areas-preview">
            {weakAreas.slice(0, 3).map(area => (
              <div key={area.id} className="weak-area-item">
                {area.area_identifier} ({area.mistake_frequency} mistakes)
              </div>
            ))}
          </div>
        </div>

        <div 
          className={`practice-card ${practiceMode === 'case_drill' ? 'active' : ''}`}
          onClick={() => setPracticeMode('case_drill')}
        >
          <h3>Case Recognition</h3>
          <p>Quick drills: το vs τον vs του</p>
        </div>
      </div>

      <button 
        onClick={startPractice}
        className="start-practice-btn"
      >
        Start {practiceMode.replace('_', ' ')} Practice
      </button>
    </div>
  );
}
```

### 4. Word Inbox & Processing (Staged Approach)

*Capture words quickly, process them thoughtfully.*

#### Stage 1: Manual Word Inbox & Processor

A simple UI to quickly add words during a lesson, and a separate, more detailed form to enrich them later.

```typescript
// src/components/WordInbox.tsx
import { useState } from 'react';
import { db } from '../db';

export function WordInbox() {
  const [entry, setEntry] = useState('');

  const handleAddWord = async () => {
    const [greek, english] = entry.split('-').map(s => s.trim());
    if (!greek || !english) {
      // Add user feedback here
      return;
    }
    
    await db.insertInto('vocabulary').values({
      greek_text: greek,
      english_translation: english,
      status: 'unprocessed'
    }).execute();
    
    setEntry('');
    // Add success feedback, maybe refresh a list of unprocessed words
  };

  return (
    <div className="word-inbox">
      <h3>Word Inbox</h3>
      <p>Quickly add a new word or phrase. Format: "greek - english"</p>
      <input
        type="text"
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        placeholder="πρόβλημα - problem"
      />
      <button onClick={handleAddWord}>Add to Inbox</button>
    </div>
  );
}

// src/components/WordProcessor.tsx
// This would be a more complex form component for editing a vocabulary item
// It would load an 'unprocessed' word and require the user to fill in:
// - Word Type (noun, verb, etc.)
// - Category (food, family, etc.)
// - Gender (for nouns)
// - Example Sentences
// Upon saving, it would change the word's status to 'processed'.
```

## Data Migration (Updated for Categories)

```typescript
// src/db/migrations/import-vocabulary.ts
import { db } from '../index';
import { ALL_WORDS } from '../../constants/vocabulary';

// Map existing vocabulary to real usage categories
const CATEGORY_MAPPING = {
  // Map from existing categories to user-friendly ones
  'grammar': 'daily_activities',
  'directional': 'directions', 
  'numbers': 'time',
  'family': 'family',
  'food': 'food',
  'time': 'time',
  'emotions': 'emotions'
};

export async function importVocabularyData() {
  console.log('Importing vocabulary with user-focused categories...');
  
  for (const word of ALL_WORDS) {
    const userCategory = CATEGORY_MAPPING[word.category] || 'daily_activities';
    
    await db.insertInto('vocabulary').values({
      greek_text: word.greek,
      english_translation: word.english,
      pronunciation: word.pronunciation || null,
      category: userCategory,
      status: 'processed', // Mark seeded words as processed
      difficulty_level: 0,
      is_problem_word: false,
      mistake_count: 0,
      review_count: 0
    }).execute();
  }
  
  console.log(`Imported ${ALL_WORDS.length} vocabulary words with user categories`);
}
```

## App Structure (User Workflow-Focused)

```
src/
├── components/
│   ├── QuickReference.tsx           # NEW: Fast grammar lookup
│   ├── reference/
│   │   ├── ArticlesAndCases.tsx     # Static: το vs τον vs του
│   │   ├── PronounGuide.tsx         # Static: σου vs εσύ confusion
│   │   ├── VerbPatterns.tsx         # Static: conjugation families  
│   │   └── PrepositionGuide.tsx     # Static: με τον, στο, από το
│   ├── CategoryVocabulary.tsx       # NEW: By usage category
│   ├── TargetedPractice.tsx         # NEW: Weak area practice
│   ├── ProblemWords.tsx             # NEW: Consistently missed words
│   ├── WordInbox.tsx                # NEW: Quick-add words to an inbox
│   ├── WordProcessor.tsx            # NEW: Manually process words from the inbox
│   └── ... (existing components)
├── constants/
│   ├── recognition.ts               # KEEP: Static grammar patterns
│   ├── verbs.ts                    # KEEP: Static verb tables  
│   ├── articles.ts                 # KEEP: Static article rules
│   └── vocabulary.ts               # MIGRATE: Move to database
└── db/ 
    ├── index.ts                    # Database connection
    ├── schema.ts                   # User-focused types
    └── migrations/
        └── import-vocabulary.ts     # Category-based import
```

## Implementation Steps (Staged Approach)

### Stage 1: Core Learning Loop (Manual MVP)

The goal of this stage is to build a fully functional, self-contained learning tool that you can start using immediately.

- **Database Setup**:
  - [ ] Implement the full schema in `docker-compose.yml` including `vocabulary` (with `status` and `example` fields) and the new `weak_areas` table.
- **Data Migration**:
  - [ ] Update the `import-vocabulary.ts` script to import existing words and correctly set their `status` to `'processed'`.
- **Quick Reference UI**:
  - [ ] Build the static `QuickReference` dashboard with its child components (`ArticlesAndCases`, `PronounGuide`, etc.).
- **Vocabulary Study UI**:
  - [ ] Build the `CategoryVocabulary` component to view, filter, and manage *processed* vocabulary.
- **Word Inbox Workflow**:
  - [ ] Build the `WordInbox` component for quick capture.
  - [ ] Build the `WordProcessor` form for manually enriching and approving words from the inbox.
- **Targeted Practice System**:
  - [ ] Build the `TargetedPractice` component.
  - [ ] Implement a basic analysis function that runs after a practice session, analyzes `practice_attempts`, and populates the `weak_areas` table.

### Stage 2: AI-Assisted Enhancement (The "Magic" Button)

Once the manual system is working, add AI to remove the manual data entry bottleneck.

- **AI Integration**:
  - [ ] Add an "Auto-fill with AI" button to the `WordProcessor` form.
  - [ ] On click, this button calls a serverless function or backend endpoint.
  - [ ] The backend service queries an LLM (like GPT or Gemini) to get the word type, gender, category, and example sentences.
  - [ ] The form is pre-filled with the AI's suggestions, which you can review and approve.

### Stage 3: Fully Autonomous Agent (Future Vision)

This stage fully automates the word processing workflow, achieving your initial vision.

- **Asynchronous Worker**:
  - [ ] Set up a message queue (like RabbitMQ or a simple Postgres table).
  - [ ] Create a separate worker service that listens for new words added to the inbox.
  - [ ] The worker automatically performs the AI enrichment from Stage 2 without manual intervention.
  - [ ] Words are automatically moved from 'unprocessed' to 'processed' and appear in the app.

## Why This Structure Works Better

### ✅ **Matches Your Actual Workflow**

- Quick reference during live conversations
- Category-based vocab study (not grammar-based)
- Targeted practice on real weak spots

### ✅ **Solves Your Real Problems**

- Instant σου/εσύ lookup during lessons
- Food/family vocab organized usefully
- Focus on words you actually forget

### ✅ **Same Technical Benefits**

- Quicker implementation
- Production-ready PostgreSQL
- Future-proof architecture
- More Greek learning, less tool building

This user-centric approach ensures you're building something you'll actually use regularly, organized around your real learning patterns rather than theoretical grammar structures.
