# Communication Guide

How to surface features and why they work.

---

## Quick Reference: What's Hidden

| Feature           | On Landing | In-App            | Gap                 |
|-------------------|------------|-------------------|---------------------|
| Timed drills      | Yes        | Yes               | None                |
| SRS               | Yes        | Partial           | Explain "why"       |
| Streaks           | Yes        | Yes               | Missing freeze info |
| **Greeklish**     | No         | Placeholder only  | **Critical**        |
| **Notifications** | No         | Tiny icon         | **High**            |
| **Freezes**       | No         | Shows when earned | **High**            |
| Milestones        | No         | Surprise only     | Keep as surprise    |

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

### 2. Push Notifications

**What:** 8pm reminder if you haven't practiced and have an active streak.

**Where:** `src/components/PushNotificationToggle.tsx`, `wrangler.toml` cron

**Why it works:**
- Fogg Behavior Model: Trigger + Ability + Motivation = Behavior
- Loss aversion: "Don't lose your X-day streak"

**Marketing:**
> "We'll remind you before your streak breaks."

### 3. Streak Freezes

**What:** Miss a day without breaking streak. Earn 1 per 7 consecutive days (max 3).

**Where:** `src/components/FreezeIndicator.tsx`, users table

**Why it works:**
- Reduces anxiety without removing motivation
- Earning (not buying) maintains intrinsic motivation

**Marketing:**
> "Miss a day without losing everything."

### 4. Timed Production Drills

**What:** 3.5-5s per question. Type Greek, no multiple choice.

**Why it works:**
- DeKeyser (2007): Practice under pressure builds automaticity
- Laufer & Goldstein (2004): Production > recognition
- Roediger & Karpicke (2006): Retrieval > re-study

**Marketing (already on landing):**
> "Recognition isn't fluency. Retrieval is."

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

| Context               | Copy                                                                     |
|-----------------------|--------------------------------------------------------------------------|
| Landing feature card  | "3.5 seconds. Your normal keyboard. Pure retrieval."                     |
| Try drill intro       | "Type Greek with your normal keyboard. We understand phonetic spelling." |
| First question helper | "Tip: Type 'thelo' or 'θέλω' — both work"                                |

### Streak Freezes

| Context                 | Copy                                                  |
|-------------------------|-------------------------------------------------------|
| Dashboard (streak 1-6)  | "X days to earn a streak freeze"                      |
| Dashboard (available)   | "X freeze(s) ready — miss a day, keep your streak"    |
| Dashboard (just used)   | "Streak protected! Freeze saved your streak."         |
| First streak (streak=1) | "Day 1! Practice for 7 days to earn a streak freeze." |

### Push Notifications

| Context             | Copy                                              |
|---------------------|---------------------------------------------------|
| Inline ask headline | "Stay on track"                                   |
| Inline ask body     | "Get a reminder at 8pm if you haven't practiced." |
| CTA                 | "Enable Reminders" / "Not now"                    |

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
