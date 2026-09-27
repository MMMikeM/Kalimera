# User Context

## Current State

- **Study duration:** 1+ year of Greek
- **Vocabulary:** 100+ words known
- **Grammar:** Has met the rules (cases, conjugations, agreement) but does not reliably command the metalanguage: "nominative", "accusative", "genitive", "subject", "direct object", "case" are not safely internalised
- **Weekly tutor:** Conversation practice with Konstantina via Preply
- **Input method:** Types in greeklish, expects conversion to Greek script

## The Problem

Knowledge hasn't become automatic. Sentence construction is effortful.

The user can:

- Recognise Greek when reading/hearing it
- Apply familiar patterns when given time to think
- Follow an explanation framed in plain-English handles ("the doer", "the target", "the owner")

The user struggles to:

- Produce Greek at conversational speed
- Apply grammar automatically without conscious thought
- Retrieve vocabulary instantly when speaking

## The Diagnosis

| Stage       | Description                     | User's Status |
| ----------- | ------------------------------- | ------------- |
| Declarative | "I know the rule"               | ~ Shaky       |
| Procedural  | Apply without conscious thought | ✗ Stuck here  |
| Automatic   | Produce at conversational speed | ✗ Blocked     |

**This is a procedural gap, sitting on a shaky conceptual base.**

The user has seen ο become τον many times and can often produce it given time. But they cannot be relied on to map "accusative" to "the thing the action touches", or "nominative" to "subject", so a prompt or error message phrased in those terms may not land. When speaking, they can't apply the pattern fast enough.

The app therefore leads with plain-English functional handles (Doer, Target, Owner) and attaches the Greek grammar terms as labels bound to those handles, never as prior knowledge (PRODUCT.md, Users; `greek-curriculum-expert`).

## What the App Must Do

**Primary goal:** Make retrieval faster, not teach more Greek.

The user doesn't need:

- More vocabulary
- Longer grammar explanations in metalanguage
- Recognition practice
- Careful, untimed exercises

The user needs:

- Hundreds of forced-production reps per week
- Time pressure that prevents conscious rule application
- Speed metrics showing improvement over time

## The Core Loop

1. See prompt (English or partial Greek)
2. Timer starts (3-7 seconds)
3. User produces Greek (type or speak)
4. Show correct answer
5. Track speed AND accuracy
6. Repeat hundreds of times per week

Everything else is optional.

## Tutor Session Integration

The weekly tutor session provides conversation practice. The app complements this by:

- Drilling specific forms between sessions
- Building automaticity that transfers to conversation
- Preparing vocabulary/structures for upcoming topics

The app does NOT replace the tutor for:

- Pronunciation feedback
- Natural conversation flow
- Cultural context
- Personalised correction

## Two-Stage Input Model

To handle greeklish input:

1. **Stage 1: Phonetic production** (shipped) - User types greeklish, system accepts if phonetically correct. This is `matchPhonetic` in `src/lib/greek-transliteration.ts`, used by the drill engine: it accepts the usual variant spellings (`thelo` and `thelw` both match θέλω), ignores terminal punctuation, and accepts a noun typed without its article
2. **Stage 2: Spelling correction** (planned, not built) - If phonetics correct but spelling wrong, prompt for correct Greek spelling

This separates the retrieval skill (can you produce the word?) from the orthographic skill (can you spell it?).
