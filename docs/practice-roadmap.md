# Practice System Roadmap

## The Problem

You have explicit knowledge that hasn't become procedural skill. You know the rules; you can't apply them at speed.

| Stage | Description | Status |
|-------|-------------|--------|
| Declarative | "I know accusative changes ο→τον" | ✓ Done |
| Procedural | Apply without conscious thought | ✗ Stuck |
| Automatic | Produce at conversational speed | ✗ Blocked |

**The transition from declarative → procedural requires retrieval under pressure.** Not recognition. Not careful, untimed exercises. Fast, forced production where you have to pull forms from memory without support.

---

## Current State (What Exists)

### Infrastructure ✓
- `practice_attempts.timeTaken` - captures milliseconds
- `vocabulary_skills.skillType` - supports "recognition" | "production"
- `weak_areas` table - tracks problem patterns
- SM-2 SRS algorithm with 2-second "fast" threshold
- Multi-user support

### The Gap
- All drills are **recognition** (multiple choice, unlimited time)
- Timer captured but **never shown** to user
- "Production" skillType **never used**
- No speed metrics dashboard

---

## V1: Phonetic Production Drills (Current Focus)

### Core Concept

**Latin input removes the Greek keyboard barrier.** Type "thelo kafe" not "θέλω καφέ". Tests retrieval speed, not typing speed.

### Direction: English → Greek Only

| Direction | Skill | Value | V1 Scope |
|-----------|-------|-------|----------|
| English → Greek (typed) | Production | **High** — your bottleneck | ✓ Build this |
| Greek → English (typed) | Comprehension | Medium | Later |
| Greek → English (multiple choice) | Recognition | Low — too easy | Already exists |

### Core Loop

1. See English prompt ("I want coffee")
2. Timer starts (visible countdown, 5s default)
3. Type phonetic Latin ("thelo kafe")
4. Submit or timeout → show correct Greek prominently
5. SRS updates with "production" skillType

### Transliteration System

**Greek → Latin (for comparison):**

| Greek | Latin | Notes |
|-------|-------|-------|
| α | a | |
| β | v | Modern Greek |
| γ | g/y | y before ι/ε |
| δ | d | |
| ε | e | |
| ζ | z | |
| η | i | Same as ι |
| θ | th | |
| ι | i | |
| κ | k | |
| λ | l | |
| μ | m | |
| ν | n | |
| ξ | x/ks | |
| ο | o | |
| π | p | |
| ρ | r | |
| σ/ς | s | |
| τ | t | |
| υ | i | Same as ι |
| φ | f | |
| χ | ch/h | |
| ψ | ps | |
| ω | o | Same as ο |

**Digraphs:**

| Greek | Latin | Example |
|-------|-------|---------|
| ει, οι, υι | i | είμαι → ime |
| ου | ou | ούζο → ouzo |
| αι | e | και → ke |
| αυ | av/af | αυτός → aftos |
| ευ | ev/ef | ευχαριστώ → efcharisto |
| γγ | ng | άγγελος → angelos |
| γκ | g/ng | γκαράζ → garaz |
| μπ | b/mb | μπύρα → bira |
| ντ | d/nd | ντομάτα → domata |

### Spelling Exposure (Passive)

Don't add a separate spelling drill. Instead:
- After each answer, **show the Greek prominently for 1-2 seconds**
- Passive spelling exposure without extra interaction
- Comprehensible input (reading/listening) handles spelling learning

---

## V2: Speed Metrics Dashboard

### Purpose

Your subjective sense of progress is unreliable. Objective metrics showing response time dropping from 4s → 2s → 1s provide motivation and direction.

### Features

- Response time over last 30 days (line chart)
- Accuracy vs speed tradeoff
- Per-topic automaticity scores
- "Mastered" (consistently fast + accurate) vs "working on" vs "struggling"

### Data Source

Already captured in `practice_attempts.timeTaken`. Just need queries + visualization.

---

## V3: Grammar Production Drills

### Challenge

Grammar drills need flexible pattern matching:
- Case transformation: "ο φίλος → accusative" → "τον φίλο"
- Conjugation: "θέλω → they" → "θέλουν"
- Article selection: "coffee (masc) + accusative" → "τον καφέ"

### Approach

Same phonetic input system, but needs:
- Pattern-based grading (not exact match)
- Multiple acceptable answers
- Partial credit for close answers

---

## V4: Lesson Integration

### Pre-Lesson Prep Mode

The night before / morning of lesson:
- Review vocabulary from previous lesson (production)
- Rapid-fire conjugation of verbs you've been working on
- Focus on items you got wrong or slow in previous sessions

### Post-Lesson Review Mode

Within 24 hours of lesson:
- Quick vocabulary entry for new words
- Production practice on new structures
- Auto-generate drills from new entries

### Implementation

- Tag content by "lesson date"
- Filter vocabulary by recency
- Auto-generated 10-15 minute prep sessions

---

## V5: Speaking Features

### Features

- **Record button** on any drill
- **Playback** of user recordings (self-assessment)
- **Shadowing mode** - play Greek audio, speak along
- **Describe the image** - random image + 60-second recording timer

### Challenges

- Microphone APIs are browser-dependent
- Recording storage (Cloudflare R2?)
- No speech-to-text for grading (manual self-assessment)

---

## V6: Input Tracking

### Purpose

What gets measured gets done. Seeing "12 hours of input this month" vs "2 hours" creates accountability.

### Features

- Simple log: date, source, duration, comprehension estimate
- Cumulative totals
- Curated list of level-appropriate resources

### Note

Low complexity, low priority. The app doesn't need to BE the input source—just track that you're doing it.

---

## Two-Stage Skill Model

| Stage | What's Tested | Input | Priority |
|-------|---------------|-------|----------|
| `phonetic_production` | Sound retrieval | Latin typing | **V1** |
| `spelling_recognition` | Orthography | Multiple choice | V2 (optional) |
| `full_production` | Complete production | Greek keyboard | Later |

Each tracked separately in SRS. You might nail phonetics but struggle with spelling—system knows to drill that.

---

## Success Metrics (90 Days)

| Metric | Target |
|--------|--------|
| Avg response time (simple sentences) | < 3 seconds |
| Avg response time (complex structures) | < 6 seconds |
| Production accuracy (timed) | > 80% |
| Daily active usage | 30+ min/day |

---

## Design Principles

### Build for Speed, Not Completeness

The best version of this app makes you uncomfortable—timers that feel too short, no hints, immediate feedback on mistakes. It should feel like training, not studying.

### Measure What Matters

Response time is the metric. Accuracy matters, but speed matters more for your specific problem. You're accurate when you have time; you need to be accurate when you don't.

### Less Is More

Every feature that isn't timed production practice is a distraction. Build the drill engine first. Make it relentless. Use it for 90 days. Then decide what else you need.
