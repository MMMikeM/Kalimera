# Communication Guide

How to surface features and why they work.

---

## Quick Reference: What's Hidden

| Feature       | On Landing    | In-App                   | Gap                       |
| ------------- | ------------- | ------------------------ | ------------------------- |
| Timed drills  | Yes           | Yes                      | None                      |
| SRS           | Yes           | Partial                  | Explain "why"             |
| Streaks       | No, by design | Yes                      | None: they stay in-app    |
| Greeklish     | Yes           | Placeholder only         | Explain in-app            |
| Notifications | No            | Not built                | Not built                 |
| Freezes       | No, by design | Always shown on dashboard | None                     |
| Milestones    | No            | Not built                | Keep as surprise if built |

---

## Feature Details

### 1. Greeklish/Phonetic Input

**What:** Type "thelo kafe" and it matches "θέλω καφέ". No Greek keyboard needed.

**Where:** `src/lib/greek-transliteration.ts`

**Why it works:**

- Chikamatsu (1996): Romanisation serves as bridge during early learning
- Tests phonological knowledge (what speaking requires)
- Input is Greeklish, output always shows Greek script

**Marketing:**

> "Type with your normal keyboard. We understand Greek sounds."

### 2. Push Notifications (not built)

**What:** Nothing ships. The push plumbing was removed; only the `pushSubscriptions` and `notificationLogs` tables remain in the schema, and there is no scheduler.

**If built:** a reminder for users who haven't practised today, worded as information ("Your review queue has X items"), never as loss ("Don't lose your streak").

**Why it would work:**

- Fogg Behavior Model: Trigger + Ability + Motivation = Behavior

**Marketing:** None.

### 3. Streak Freezes

**What:** Miss a day without breaking streak. Earn 1 per 7 consecutive days (max 3).

**Where:** `src/components/FreezeIndicator.tsx`, users table

**Why it works:**

- Reduces anxiety without removing motivation
- Earning (not buying) maintains intrinsic motivation

**Marketing:** None. Freezes, like streaks, stay inside the app and are never sold on the landing page or in marketing copy.

### 4. Timed Production Drills

**What:** 4, 6 or 8 seconds per question (Fast, Medium, Relaxed), stretched for multi-word phrases. Type Greek, no multiple choice.

**Why it works:**

- DeKeyser (2007): Practice under pressure builds automaticity
- Laufer & Goldstein (2004): Production > recognition
- Roediger & Karpicke (2006): Retrieval > re-study

**Marketing (on landing):**

> "The drills here make you produce it: a few seconds on the clock, your normal keyboard, nothing to pick from."

### 5. Spaced Repetition

**What:** SM-2 algorithm. Items you get right shown less frequently.

**Why it works:**

- Ebbinghaus forgetting curve
- Review at optimal intervals maximises retention per time

**Marketing:**

> "Review at the right time, not all the time."

---

## Copy Reference

### Greeklish Input

| Context                           | Copy                                                                                                                                  |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Landing "Timed drills"            | "Three speeds, from four to eight seconds a prompt. You type the answer in Greeklish, and the usual spellings all count: thelo and thelw are both θέλω." |
| Landing demo caption              | "Type what you'd say in Greeklish. It's marked as Greek."                                                                             |
| Try drill intro                   | "Type the Greek in Greeklish, Latin letters on your normal keyboard: thelo counts as θέλω."                                            |
| Drill input placeholder           | "greeklish..."                                                                                                                        |
| First question helper (not built) | "Tip: Type 'thelo' or 'θέλω' — both work"                                                                                             |

### Streak Freezes

| Context                 | Copy                                                  |
| ----------------------- | ----------------------------------------------------- |
| Dashboard (no freeze)   | "X days to earn a streak freeze"                      |
| Dashboard (available)   | "X freeze(s) ready: miss a day, keep your streak"     |
| Dashboard (just used)   | "Streak protected! Freeze saved your streak."         |
| First streak (streak=1) | "Day 1! Practice for 7 days to earn a streak freeze." |

---

## Research Citations

Key references supporting the pedagogical approach:

- **DeKeyser (1997, 2007)**: Skill Acquisition Theory - declarative to procedural transition
- **Laufer & Goldstein (2004)**: Production requires stronger memory traces than recognition
- **Roediger & Karpicke (2006)**: Testing effect - retrieval strengthens memory
- **Swain (1985, 1995)**: Output Hypothesis - production forces syntactic processing
- **Suzuki, Nakata & DeKeyser (2019)**: Time pressure as desirable difficulty
- **Chikamatsu (1996)**: Romanisation as learning scaffold

---

## Principle

**Surface features at the moment they become relevant, not before.**

Cold visitors don't care about streak freezes. Day-1 users don't need notifications. Meet users where they are.
