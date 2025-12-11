# Greek Learning: App Design Principles

**Context:** Weekly Preply lesson (conversation practice covered). Building a web app to make between-lesson study effective. One year in, 100+ words, effortful sentence construction.

**The problem:** The gap between lessons isn't building automaticity. Whatever you're currently doing between sessions isn't transferring to fluent production.

---

## The Diagnosis

You have explicit knowledge that hasn't become procedural skill. You know the rules; you can't apply them at speed.

| Stage | Description | Status |
|-------|-------------|--------|
| Declarative | "I know accusative changes ο→τον" | ✓ Done |
| Procedural | Apply without conscious thought | ✗ Stuck |
| Automatic | Produce at conversational speed | ✗ Blocked |

**The transition from declarative → procedural requires retrieval under pressure.** Not recognition. Not careful, untimed exercises. Fast, forced production where you have to pull forms from memory without support.

---

## What the App Should Do

### Primary Goal: Build Retrieval Speed

The app's job is to make you faster at producing correct Greek, not to teach you more Greek. You know enough. You need to access it faster.

**Design principle:** Every interaction should require production or retrieval under time pressure.

---

### Feature 1: Timed Production Drills

**Not this:** "Select the correct article: __ καφές" with four options and unlimited time.

**This:** "Translate: 'I want the coffee'" with a 5-second timer. Type or speak your answer. No options. No hints.

**Why:** Recognition (selecting from options) uses different neural pathways than production (generating from nothing). Only production practice transfers to speaking.

**Implementation:**
- Show English prompt
- Start countdown (3-7 seconds depending on complexity)
- User types/speaks Greek
- Show correct answer after time expires or submission
- Track speed AND accuracy over time

**Drill types:**
| Type | Prompt | Response |
|------|--------|----------|
| Translation sprint | "I see the child" | Βλέπω το παιδί |
| Conjugation | "θέλω → they" | θέλουν |
| Case transformation | "ο φίλος → accusative" | τον φίλο |
| Article selection | "coffee (masc) + accusative" | τον καφέ |
| Pronoun insertion | "I see ___" (him) | τον |

**Key metrics:**
- Response time (ms)
- Accuracy rate
- Improvement trend over sessions

---

### Feature 2: Lesson Preparation Mode

**Purpose:** Prime the pump before each Preply session.

**The night before / morning of lesson:**
- Review vocabulary from previous lesson (production, not recognition)
- Rapid-fire conjugation of verbs you've been working on
- Generate sentences using structures your tutor introduced

**Why this matters:** Walking into the lesson with forms already "warmed up" means more of the session is spent at the edge of your ability, not reviewing basics.

**Implementation:**
- Tag content by "lesson date" or "lesson topic"
- Create auto-generated prep session: 10-15 minutes of targeted production drills
- Focus on items you got wrong or slow in previous sessions

---

### Feature 3: Lesson Review Mode

**Purpose:** Consolidate what happened in the lesson before it fades.

**Within 24 hours of lesson:**
- Add new vocabulary encountered (quick entry, not elaborate)
- Production practice on new structures introduced
- Record yourself saying sentences you struggled with

**Why:** The forgetting curve is steepest in the first 24 hours. Immediate review with production locks in more than delayed recognition review.

**Implementation:**
- Post-lesson prompt: "Add words/phrases from today's lesson"
- Auto-generate production drills from new entries
- Spaced repetition kicks in from this point

---

### Feature 4: Speaking Practice (Even Solo)

**The gap:** Your tutor session is 1 hour/week. That's not enough speaking time.

**What the app can do:**
- **Shadowing mode:** Play Greek audio, user speaks along simultaneously
- **Record & compare:** Show a sentence, user records themselves, playback both
- **Describe the image:** Random image + 60-second recording timer, no preparation
- **Answer the question:** Audio question in Greek, user responds aloud, records

**Why:** Speaking engages motor memory and forces real-time retrieval. Even without a conversation partner, speaking aloud is dramatically more effective than silent review.

**Implementation:**
- Microphone integration for recording
- Playback of user recordings (self-assessment)
- Optional: speech-to-text to check accuracy (but not required—the act of speaking matters more than perfect assessment)

---

### Feature 5: Comprehensible Input Tracking

**The principle:** Acquisition happens through massive input. The app can encourage and track this.

**What to track:**
- Minutes of Greek content consumed (podcasts, videos, reading)
- Simple log: date, source, duration, comprehension estimate (70%? 90%?)

**Why track:** What gets measured gets done. Seeing "12 hours of input this month" vs "2 hours" creates accountability.

**Bonus features:**
- Curated list of level-appropriate resources (Easy Greek, graded readers, etc.)
- "Add to vocabulary" quick capture while consuming content

**Not the app's job:** The app doesn't need to BE the input source. It just needs to nudge you toward input and track that you're doing it.

---

### Feature 6: Speed Metrics Dashboard

**What to show:**
- Average response time on production drills (trending down = progress)
- Accuracy at different time pressures
- "Automaticity score" per grammar topic (how fast can you produce it?)

**Why:** Your subjective sense of progress is unreliable. After a year, you feel stuck. Objective metrics showing response time dropping from 4s → 2s → 1s provide motivation and direction.

**Visualisation:**
- Response time over last 30 days (line chart)
- Accuracy vs speed tradeoff (scatter plot)
- "Mastered" items (consistently fast + accurate) vs "working on" vs "struggling"

---

## What the App Should NOT Do

### ❌ More Grammar Explanations

You don't need another way to read about the accusative case. You understand it. The app should assume knowledge and drill production.

**If you must have reference material:** Hide it behind a "?" icon. Never surface it proactively. The default path should be production, not study.

### ❌ Recognition-Only Flashcards

Traditional flashcards (Greek → English, or multiple choice) build recognition, not production. They feel productive because you get them "right," but they don't transfer to speaking.

**If you keep flashcards:** Make them bidirectional and prioritise English → Greek (production direction). Add time pressure. Remove multiple choice.

### ❌ Untimed, Careful Exercises

Slow, careful practice builds accuracy at the expense of automaticity. You need the opposite.

**Every drill should have time pressure.** If it doesn't feel slightly rushed, it's not building speed.

### ❌ Elaborate Curriculum Organisation

You've spent time building curriculum structures, learning progressions, skill trees. This is procrastination disguised as productivity.

**The curriculum is simple:** Practice producing Greek faster. That's it. Topic selection matters far less than volume and speed of practice.

### ❌ Perfect UI Before Function

Ship ugly. A working timed drill with a text input is more valuable than a beautiful interface that isn't built yet.

---

## The Revised Daily Practice (App-Supported)

| Time | Activity | App Feature |
|------|----------|-------------|
| 5 min | SRS review (production direction, timed) | Timed Production Drills |
| 15-20 min | Comprehensible input (podcast, video, reading) | Input Tracking (log it) |
| 10 min | Forced production drills (translation, conjugation) | Timed Production Drills |
| 5 min | Speaking practice (shadowing or describe image) | Speaking Practice |

**Total: 35-40 minutes/day**

**Plus:** Lesson prep (night before) and lesson review (within 24 hours).

---

## MVP Feature Priority

Build in this order:

### V1: Timed Production Drills (Week 1-2)
- English → Greek translation with countdown timer
- Text input (no multiple choice)
- Show correct answer after
- Track response time + accuracy
- Basic SRS scheduling

**This alone will change your practice quality more than any other feature.**

### V2: Lesson Integration (Week 3-4)
- Quick vocabulary entry (post-lesson)
- Tag by lesson date
- Auto-generate drills from recent additions
- Prep mode for upcoming lessons

### V3: Speaking Features (Week 5-6)
- Record button on any drill
- Playback user recordings
- Shadowing mode with audio playback
- Describe-the-image prompts

### V4: Metrics Dashboard (Week 7-8)
- Response time trends
- Accuracy trends
- Per-topic automaticity scores
- Input hours logged

### V5: Input Tracking (Whenever)
- Simple logging (date, source, minutes)
- Cumulative totals
- Optional quick-capture vocabulary from input

---

## Measuring Success

### App-Level Metrics

| Metric | Target (90 days) |
|--------|------------------|
| Avg response time (simple sentences) | < 3 seconds |
| Avg response time (complex structures) | < 6 seconds |
| Production accuracy (timed) | > 80% |
| Daily active usage | 30+ min/day |
| Input hours logged | 30+ hours |

### Learning-Level Outcomes

| Outcome | Target (90 days) |
|---------|------------------|
| Active vocabulary (can produce) | 300+ words |
| Tutor feedback | "You're responding faster" |
| Subjective fluency | Noticeably less mental effort |

---

## The Mindset for App Design

### Build for Speed, Not Completeness

The best version of this app is one that makes you uncomfortable—timers that feel too short, no hints, immediate feedback on mistakes. It should feel like training, not studying.

### Measure What Matters

Response time is the metric. Accuracy matters, but speed matters more for your specific problem. You're accurate when you have time; you need to be accurate when you don't.

### Less Is More

Every feature that isn't timed production practice is a distraction. Resist the urge to add curriculum views, grammar browsers, fancy visualisations. Build the drill engine first. Make it relentless. Use it for 90 days. Then decide what else you need.

---

## Summary

Your weekly tutor handles conversation. The app's job is to make you **faster** at retrieval between sessions so that lesson time is spent at your growing edge, not warming up basics.

**Core loop:**
1. See prompt (English or partial Greek)
2. Timer starts
3. Produce Greek (type or speak)
4. See correct answer
5. Repeat hundreds of times per week

That's the app. Everything else is optional.