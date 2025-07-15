# Database Seeding Strategy

## Current Data Inventory

### Structured Data (Frontend Constants)
- **Vocabulary**: ~470 words in `vocabulary.ts` (ALL_WORDS array)
- **Verb Conjugations**: 20+ verbs with full conjugations in `verbs.ts`
- **Article Forms**: Complete definite article system in `articles.ts`
- **Grammar Rules**: Case recognition patterns in `recognition.ts`
- **Categories**: Times of day, frequency adverbs, summer vocab, etc.

### Unstructured Data (Markdown Notes)
- **8 July.md**: Recent vocabulary and grammar patterns
- **Directional words**: Greek/English/transliterated forms
- **Grammar patterns**: Like/dislike constructions, time expressions

## 1. Database Migration Scripts

### Initial Categories Seeding
```typescript
// src/db/migrations/002_seed_categories.ts
import { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  // Insert lesson categories
  await db.insertInto('lesson_categories').values([
    { name: 'Core Grammar', description: 'Essential grammar rules and patterns', order_index: 1 },
    { name: 'Vocabulary', description: 'Word lists and translations', order_index: 2 },
    { name: 'Verb Conjugations', description: 'Verb forms and patterns', order_index: 3 },
    { name: 'Articles & Cases', description: 'Article forms and case usage', order_index: 4 },
    { name: 'Daily Expressions', description: 'Common phrases and patterns', order_index: 5 },
    { name: 'Recent Notes', description: 'Latest learning notes', order_index: 6 }
  ]).execute();
}
```

## 2. Vocabulary Migration

### Transform ALL_WORDS Array
```typescript
// src/db/seeders/vocabulary-seeder.ts
import { ALL_WORDS } from '../../constants/vocabulary';
import { NewVocabulary } from '../schema';
import db from '../index';

export async function seedVocabulary() {
  const vocabularyEntries: NewVocabulary[] = ALL_WORDS.map(word => ({
    greek_text: word.greek,
    english_translation: word.english,
    category: word.type, // verb, noun, adjective, etc.
    tags: word.family ? [word.family] : null, // -ω, -ομαι, irregular
    // Extract pronunciation if available
    pronunciation: extractPronunciation(word.greek),
  }));

  console.log(`Seeding ${vocabularyEntries.length} vocabulary entries...`);
  
  await db.transaction().execute(async (trx) => {
    for (const entry of vocabularyEntries) {
      await trx
        .insertInto('vocabulary')
        .values(entry)
        .execute();
    }
  });
}

function extractPronunciation(greek: string): string | null {
  // Extract transliterated forms from notes like "exo - outside"
  const pronunciationMap = new Map([
    ['έξω', 'exo'],
    ['μέσα', 'mesa'],
    ['μέση', 'mesi'],
    ['κάτω', 'kato'],
    ['πάνω', 'pano'],
    ['μπροστά', 'brosta'],
    ['πίσω', 'piso'],
    ['δίπλα', 'dipla'],
    // Add more from your July notes
  ]);
  
  return pronunciationMap.get(greek) || null;
}
```

## 3. Verb Conjugations Migration

### Transform Verb Data to Grammar Rules
```typescript
// src/db/seeders/verb-seeder.ts
import { VERB_CONJUGATIONS, VERB_CATEGORIES } from '../../constants/verbs';
import { NewGrammarRule, NewGrammarExample } from '../schema';

export async function seedVerbConjugations() {
  const verbCategoryId = await getOrCreateCategory('Verb Conjugations');
  
  // Create grammar rules for each verb
  for (const [verbKey, conjugations] of Object.entries(VERB_CONJUGATIONS)) {
    const verbInfo = findVerbInfo(verbKey);
    
    const grammarRule: NewGrammarRule = {
      title: `${verbInfo.greek} - ${verbInfo.english}`,
      description: `Conjugation pattern for ${verbInfo.pattern}`,
      pattern: verbInfo.pattern,
      category: 'verb-conjugation',
      difficulty_level: getVerbDifficulty(verbInfo.pattern),
      lesson_id: null
    };

    const ruleId = await db
      .insertInto('grammar_rules')
      .values(grammarRule)
      .returning('id')
      .executeTakeFirstOrThrow();

    // Insert conjugation examples
    const examples: NewGrammarExample[] = conjugations.map((conj, index) => ({
      grammar_rule_id: ruleId.id,
      greek_example: `${conj.person} ${conj.form}`,
      english_translation: `${conj.person.replace(/ός|ή|ύ|είς|οί/, '')} ${conj.english}`,
      notes: `Ending: ${conj.highlighted}`,
      order_index: index
    }));

    await db
      .insertInto('grammar_examples')
      .values(examples)
      .execute();
  }
}

function getVerbDifficulty(pattern: string): number {
  const difficultyMap = {
    'Type A': 1,
    'Type B': 2,
    'Irregular': 3
  };
  return difficultyMap[pattern] || 2;
}
```

## 4. Articles & Cases Migration

### Transform Article Forms and Examples
```typescript
// src/db/seeders/articles-seeder.ts
import { DEFINITE_ARTICLES, CASE_EXAMPLES } from '../../constants/articles';

export async function seedArticlesAndCases() {
  // Create article reference as grammar rule
  const articleRule: NewGrammarRule = {
    title: 'Definite Articles System',
    description: 'Complete overview of ο, η, το forms across cases',
    pattern: 'ο/η/το → case forms',
    category: 'articles',
    difficulty_level: 1
  };

  const ruleId = await insertGrammarRuleWithExamples(articleRule, [
    // Singular forms
    { greek_example: 'ο άντρας (Nom)', english_translation: 'the man (subject)', notes: 'masculine nominative' },
    { greek_example: 'τον άντρα (Acc)', english_translation: 'the man (object)', notes: 'masculine accusative' },
    { greek_example: 'του άντρα (Gen)', english_translation: "the man's", notes: 'masculine genitive' },
    // Continue for feminine and neuter...
  ]);

  // Seed case usage examples
  for (const [caseName, examples] of Object.entries(CASE_EXAMPLES)) {
    const caseRule: NewGrammarRule = {
      title: `${caseName.charAt(0).toUpperCase() + caseName.slice(1)} Case Usage`,
      description: `When and how to use ${caseName} case`,
      category: 'cases',
      difficulty_level: 2
    };

    const caseExamples = examples.map(ex => ({
      greek_example: ex.greek,
      english_translation: ex.english,
      notes: ex.explanation
    }));

    await insertGrammarRuleWithExamples(caseRule, caseExamples);
  }
}
```

## 5. Markdown Notes Migration

### Parse and Structure Unstructured Notes
```typescript
// src/db/seeders/notes-seeder.ts
import fs from 'fs';
import path from 'path';

export async function seedMarkdownNotes() {
  const notesPath = path.join(process.cwd(), '8 July.md');
  const content = fs.readFileSync(notesPath, 'utf-8');
  
  // Create lesson for July 8 notes
  const july8Lesson = await createLessonWithSections({
    lesson: {
      category_id: await getCategoryId('Recent Notes'),
      title: 'Daily Vocabulary & Grammar Patterns',
      description: 'Learning directional words and like/dislike expressions',
      lesson_date: '2024-07-08',
      focus_area: 'vocabulary_grammar',
      notes: 'Practice with pronouns and directional concepts'
    },
    sections: parseJuly8Content(content)
  });

  // Extract and seed new vocabulary
  await seedDirectionalVocabulary();
  await seedNewVocabularyFromNotes();
  await seedGrammarPatternsFromNotes();
}

function parseJuly8Content(content: string): Omit<NewLessonSection, 'lesson_id'>[] {
  return [
    {
      section_type: 'vocabulary',
      title: 'New Vocabulary',
      content: `στο γραφείο (to the office)
στη δουλειά (to work)
το κύμα / τα κύματα (wave/s)
δυνατός δυνατή δυνατό δυνατά (strong/loud)`,
      order_index: 0
    },
    {
      section_type: 'vocabulary', 
      title: 'Directional Words',
      content: `έξω (exo) - outside
μέσα (mesa) - inside
μέση (mesi) - middle
κάτω (kato) - under
πάνω (pano) - over
μπροστά (brosta) - in front
πίσω (piso) - behind
δίπλα (dipla) - next to
ανάμεσα (anamessa) - between
απέναντι (apenanti) - across / opposite
δεξιά (deksi) - right
αριστερά (aristera) - left
κοντά (konta) - close
μακριά (makria) - far`,
      order_index: 1
    },
    {
      section_type: 'grammar',
      title: 'Like/Dislike Pattern',
      content: `ΔΕΝ + μου + ΑΡΕΣΕΙ/ΑΡΕΣΟΥΝ (if I like more than 1 thing)

Pronouns: μου, σου, του, της, μας, σας, τους

Use for sentences about other people's likes/dislikes`,
      order_index: 2
    },
    {
      section_type: 'examples',
      title: 'Time Expressions',
      content: `όταν ήμουν παιδί (when I was a kid)
όταν μιλάω με την πεθερά μου νευριάζω (when I speak with my mother in law I get nervous)
όταν (when)
Πότε; (When? - question)
ποτέ (never)`,
      order_index: 3
    },
    {
      section_type: 'notes',
      title: 'Additional Notes',
      content: `ενθουσιασμένος/η/ο (enthusiastic)
καλή όρεξη (kali orexi) - bon appétit
υπάρχει (iparxei) - there is
καμιά (kamia) - any
κανένα (kanena) - none

Numbers mentioned: 11, 12, 14, 17, 3`,
      order_index: 4
    }
  ];
}

async function seedDirectionalVocabulary() {
  const directionalWords: NewVocabulary[] = [
    { greek_text: 'έξω', english_translation: 'outside', pronunciation: 'exo', category: 'directional' },
    { greek_text: 'μέσα', english_translation: 'inside', pronunciation: 'mesa', category: 'directional' },
    { greek_text: 'μέση', english_translation: 'middle', pronunciation: 'mesi', category: 'directional' },
    { greek_text: 'κάτω', english_translation: 'under', pronunciation: 'kato', category: 'directional' },
    { greek_text: 'πάνω', english_translation: 'over', pronunciation: 'pano', category: 'directional' },
    { greek_text: 'μπροστά', english_translation: 'in front', pronunciation: 'brosta', category: 'directional' },
    { greek_text: 'πίσω', english_translation: 'behind', pronunciation: 'piso', category: 'directional' },
    { greek_text: 'δίπλα', english_translation: 'next to', pronunciation: 'dipla', category: 'directional' },
    { greek_text: 'ανάμεσα', english_translation: 'between', pronunciation: 'anamessa', category: 'directional' },
    { greek_text: 'απέναντι', english_translation: 'across / opposite', pronunciation: 'apenanti', category: 'directional' },
    { greek_text: 'δεξιά', english_translation: 'right', pronunciation: 'deksi', category: 'directional' },
    { greek_text: 'αριστερά', english_translation: 'left', pronunciation: 'aristera', category: 'directional' },
    { greek_text: 'κοντά', english_translation: 'close', pronunciation: 'konta', category: 'directional' },
    { greek_text: 'μακριά', english_translation: 'far', pronunciation: 'makria', category: 'directional' }
  ];

  await db.insertInto('vocabulary').values(directionalWords).execute();
}
```

## 6. Quiz Generation from Existing Data

### Auto-Generate Quiz Questions
```typescript
// src/db/seeders/quiz-seeder.ts
export async function generateQuizQuestions() {
  // Generate vocabulary quizzes
  const vocabularyQuestions = await generateVocabularyQuiz();
  const articleQuestions = await generateArticleQuiz();
  const verbQuestions = await generateVerbQuiz();
  
  // Insert all questions with their options
  for (const questionData of [...vocabularyQuestions, ...articleQuestions, ...verbQuestions]) {
    await createQuizQuestionWithOptions(questionData.question, questionData.options);
  }
}

async function generateVocabularyQuiz() {
  const directionalWords = await db
    .selectFrom('vocabulary')
    .selectAll()
    .where('category', '=', 'directional')
    .execute();

  return directionalWords.map(word => ({
    question: {
      question_type: 'multiple_choice',
      question_text: `What does "${word.greek_text}" mean in English?`,
      correct_answer: word.english_translation,
      explanation: `${word.greek_text} (${word.pronunciation}) means ${word.english_translation}`,
      difficulty: 2,
      tags: ['directional', 'vocabulary']
    } as NewQuizQuestion,
    options: generateMultipleChoiceOptions(word.english_translation, 'directional')
  }));
}

function generateMultipleChoiceOptions(correct: string, category: string): Omit<NewQuizOption, 'question_id'>[] {
  const distractors = getDistractorsForCategory(category, correct);
  const allOptions = [correct, ...distractors].slice(0, 4);
  
  return shuffleArray(allOptions).map((option, index) => ({
    option_text: option,
    is_correct: option === correct,
    order_index: index
  }));
}
```

## 7. Migration Script Runner

### Complete Migration Command
```typescript
// src/db/migrate-and-seed.ts
import { runMigrations } from './migrations';
import { seedVocabulary } from './seeders/vocabulary-seeder';
import { seedVerbConjugations } from './seeders/verb-seeder';
import { seedArticlesAndCases } from './seeders/articles-seeder';
import { seedMarkdownNotes } from './seeders/notes-seeder';
import { generateQuizQuestions } from './seeders/quiz-seeder';

export async function migrateAndSeed() {
  console.log('🗄️  Running database migrations...');
  await runMigrations();
  
  console.log('📚 Seeding vocabulary...');
  await seedVocabulary();
  
  console.log('🔤 Seeding verb conjugations...');
  await seedVerbConjugations();
  
  console.log('📝 Seeding articles and cases...');
  await seedArticlesAndCases();
  
  console.log('📋 Seeding markdown notes...');
  await seedMarkdownNotes();
  
  console.log('❓ Generating quiz questions...');
  await generateQuizQuestions();
  
  console.log('✅ Database migration and seeding complete!');
  console.log(`
  📊 Summary:
  - ${await getVocabularyCount()} vocabulary entries
  - ${await getGrammarRulesCount()} grammar rules
  - ${await getLessonsCount()} lessons
  - ${await getQuizQuestionsCount()} quiz questions
  `);
}

// Run with: npm run migrate-seed
if (require.main === module) {
  migrateAndSeed().catch(console.error);
}
```

## 8. NPM Scripts

### Package.json Scripts
```json
{
  "scripts": {
    "db:migrate": "tsx src/db/migrations/run.ts",
    "db:seed": "tsx src/db/seeders/run-all.ts",
    "db:migrate-seed": "tsx src/db/migrate-and-seed.ts",
    "db:reset": "npm run db:drop && npm run db:migrate-seed",
    "db:backup": "pg_dump greek_learning > backup-$(date +%Y%m%d).sql"
  }
}
```

## Migration Strategy Summary

### 🎯 **What Gets Migrated:**
1. **470+ vocabulary words** → `vocabulary` table with categories
2. **20+ verb conjugations** → `grammar_rules` + `grammar_examples` tables  
3. **Article forms** → structured grammar rules with examples
4. **Case usage patterns** → grammar rules with real examples
5. **July 8 notes** → lesson with sections + new vocabulary entries
6. **Auto-generated quizzes** → questions with multiple choice options

### 🚀 **Benefits:**
- **Preserves all existing data** in structured, searchable format
- **Maintains relationships** between vocabulary, grammar, and examples  
- **Auto-generates content** like quiz questions from existing data
- **Type-safe operations** throughout the migration process
- **Incremental seeding** - can run individual seeders

### 💾 **Run Migration:**
```bash
npm run db:migrate-seed
```

This will transform all your current frontend data into the new relational PostgreSQL structure while preserving the rich content you've already created! 🎉 