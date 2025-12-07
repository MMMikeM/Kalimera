# Curriculum Analysis: Practice Drills

A pedagogical review of the practice drill screens from a learner's perspective.

## Executive Summary

The practice drills suffer from **cognitive monotony**: all three grammar drill types (pronouns, articles, verbs) present identically as multiple-choice questions with four options. While the underlying content is well-designed (Greek-first, contextual sentences, good explanations), the uniform presentation fails to engage different cognitive processes for fundamentally different linguistic concepts.

This matters because:

- **Pronouns** require understanding grammatical role (who receives action vs. who possesses)
- **Articles** require pattern matching across three dimensions (case x gender x number)
- **Verbs** require recognizing endings that encode the subject

When all three look the same, learners cannot build distinct mental frameworks for each system. The brain treats them as "more of the same" rather than "different tools for different jobs."

---

## Individual Drill Analysis

### 1. Pronoun Drill

**Screenshots:** `index.png`, `pronouns.png`

#### What the Learner Should Get From This

- Recognize object pronouns (me, se, ton, etc.) when they appear before verbs
- Recognize possessive pronouns (mou, sou, tou, etc.) when they appear after nouns
- Understand that position in the sentence determines pronoun type

#### What Works Well

- **Greek-first presentation**: The prompt shows Greek text prominently ("___ akouow")
- **Contextual sentences**: "I hear her" teaches usage, not just definition
- **Good distractors**: Options are same-type pronouns (To, Ton, Tin, Tous for object pronouns)
- **Explanations include word order**: Code shows "Object pronouns go before the verb"
- **Multiple question types**: Both "fill the blank" and "what does X mean?"
- **55 questions** covers both object and possessive pronouns thoroughly

#### Learner Pain Points

1. **No visual distinction between object and possessive pronouns**
   - The learner sees the same four-option layout whether practicing "me/se/ton" or "mou/sou/tou"
   - These are fundamentally different: object pronouns answer "WHO receives action?" while possessives answer "WHOSE is it?"
   - The drill could separate these visually or present them differently

2. **Position not emphasized visually**
   - Object pronouns: `[pronoun] + verb` (Me blepeis?)
   - Possessive pronouns: `noun + [pronoun]` (to spiti mou)
   - The blank appears at the right position, but the pattern is not highlighted

3. **55 questions is overwhelming**
   - Progress shows "1/55" which is daunting
   - No clear progression from easier to harder
   - Learner has no sense of "when am I done with object pronouns?" vs. "when do possessives start?"

4. **Options lack English glosses in the screenshot**
   - Options show: To, Ton, Tin, Tous (Greek only)
   - A learner who does not yet know these forms cannot learn from wrong answers
   - The code generates explanations, but pre-answer scaffolding is missing

5. **Missing prerequisite check**
   - Does the learner know what "object" and "possessive" mean grammatically?
   - No scaffolding for learners who do not have this metalinguistic vocabulary

#### Sequencing Issues

- Object pronouns (accusative case) should be introduced before possessive pronouns (genitive case)
- The drill mixes them together from the start
- A learner struggling with "me" vs "se" does not need "mou" vs "sou" distractions yet

#### Recommendations

1. **Split into two visually distinct drill modes:**
   - "Object Pronoun Drill" - shows `[___] VERB` pattern prominently
   - "Possessive Pronoun Drill" - shows `NOUN [___]` pattern prominently

2. **Add a paradigm reference card**
   - Show the 1st/2nd/3rd person pattern on screen during practice
   - Learner can see "me/se/ton" vs "mas/sas/tous" relationship

3. **Progressive unlock:**
   - Master singular before seeing plural options
   - Master 1st/2nd person before adding 3rd person gender variants

4. **Visual position highlighting:**
   - For object pronouns, color the verb position differently: `[___] perimenw`
   - For possessives, color the noun: `to spiti [___]`

5. **Add English glosses to options:**
   - Show: `Ton (him)`, `Tin (her)`, `To (it)`, `Tous (them m.)`
   - Wrong answers become learning opportunities

---

### 2. Article Drill

**Screenshot:** `articles.png`

#### What the Learner Should Get From This

- Select the correct article based on:
  - Gender (masculine/feminine/neuter)
  - Number (singular/plural)
  - Case (nominative/accusative/genitive)
- Recognize that articles change based on the noun's role in the sentence

#### What Works Well

- **Contextual sentences**: "Blepo ___ filous" (I see the friends) shows real usage
- **English translation provided**: Learner knows what meaning to express
- **Good question variety**: Covers all three cases with all three genders (27 questions)
- **Case descriptions in explanations**: "accusative (direct object - receives the action)"

#### Learner Pain Points

1. **Three-dimensional problem presented one-dimensionally**
   - Articles require tracking: case + gender + number
   - The drill asks one question at a time with no framework
   - Learner cannot see the pattern: "Oh, accusative masculine plural is always 'tous'"

2. **No visual case marker**
   - The sentence "Blepo ___ filous" does not indicate WHY accusative is needed
   - The verb "blepo" (I see) triggers accusative, but this is not highlighted
   - Learner is guessing without understanding the grammar trigger

3. **Options do not reveal the system**
   - Options: "ton / twn / tous / oi"
   - These span different cases and numbers randomly
   - A wrong answer does not help learner understand WHY it is wrong in this context

4. **Missing the "why" of case selection**
   - Current explanation: "tous is the masculine plural accusative article"
   - Better explanation: "blepo takes a direct object (accusative), filous is masculine plural, so use tous"

5. **No paradigm visibility**
   - The article system forms a logical grid
   - Learner should see the full paradigm to understand where each form fits

#### Sequencing Issues

- Nominative (subject) should be introduced first - it is the dictionary form
- Accusative (object) next - most common after verbs
- Genitive (possession) last - requires understanding "of" relationships
- Current drill mixes all three from question 1

#### Recommendations

1. **Case-focused drill modes:**
   - "Nominative Articles" - just subjects, master o/i/to/ta/oi/ta
   - "Accusative Articles" - just objects after verbs
   - "Genitive Articles" - just possession
   - Then "Mixed Cases" after individual mastery

2. **Show the paradigm table during practice:**
   ```
              Singular    Plural
   Masc Nom   o           oi
   Masc Acc   ton         tous    <- highlight current
   Fem Nom    i           oi
   Fem Acc    tin         tis
   Neut       to          ta
   ```

3. **Add case triggers to questions:**
   - "Blepo [DIRECT OBJECT] ___ filous" - label why accusative is needed
   - "To spiti [POSSESSION] ___ patera" - label why genitive is needed

4. **Color-code cases consistently:**
   - Nominative = blue (subject color)
   - Accusative = green (object color)
   - Genitive = orange (possession color)
   - Build visual association across the app

---

### 3. Verb Drill

**Screenshot:** `verbs.png`

#### What the Learner Should Get From This

- Recognize verb endings that indicate who is performing the action
- Connect subject pronouns (ego, esi, aftos) with verb forms (echo, echeis, echei)
- Understand that Greek verbs encode the subject in the ending

#### What Works Well

- **Greek verb shown prominently**: "mporoun" is the focus
- **Clear question type**: "Who is doing the action? (can)"
- **Three question types in code:**
  - What does this form mean?
  - Who is doing the action?
  - Complete the sentence with correct form
- **Limited verb set**: Focus on four essential verbs (echo, thelo, boro, eimai)
- **Good explanations**: "The ending tells us who is doing the action"

#### Learner Pain Points

1. **Options are in English, breaking Greek-first principle**
   - Options: "he/she/it (3rd singular)", "I (1st singular)", "they (3rd plural)", "you (2nd singular)"
   - This teaches recognition but not production
   - Learner cannot produce "mporoun" from "they can" - only the reverse

2. **72 questions is far too many**
   - 4 verbs x 6 persons x 3 question types = 72
   - This is cognitively exhausting
   - No sense of which verb or pattern learner is mastering

3. **No conjugation table visible**
   - The power of Greek verbs is the predictable ending pattern:
     ```
     -w    -oume
     -eis  -ete
     -ei   -oun
     ```
   - Learner sees forms one at a time without seeing the pattern

4. **Missing the production direction**
   - All questions are Greek to English (recognition)
   - Need English to Greek (production) for speaking ability
   - Both directions use different cognitive processes

5. **No verb-to-verb comparison**
   - "echo" and "thelo" follow the same pattern
   - The drill does not highlight that learning one helps with the other

6. **Irregular verb mixed in from start**
   - "eimai" (to be) is irregular
   - Should come after regular pattern is mastered

#### Sequencing Issues

- Regular -w verbs (echo, thelo, boro) should be grouped first
- Once the pattern is learned, show how it applies to new verbs
- Irregular "eimai" should come last, explicitly marked as exception

#### Recommendations

1. **Show the conjugation paradigm:**
   - Display the 6-form table while practicing
   - Highlight which cell the current question targets
   - Build visual memory of the pattern

2. **Separate recognition from production:**
   - "Recognition Drill": Greek form to English meaning (current)
   - "Production Drill": Given subject + infinitive, select correct Greek form
   - Different cognitive skills, different UI

3. **Verb-at-a-time mastery:**
   - Master all 6 forms of "echo" before mixing verbs
   - Then "thelo" (same pattern)
   - Then show they follow the same pattern
   - Then irregular "eimai" with explicit warning

4. **Highlight endings:**
   - Show "mpor-OUN" with the ending emphasized
   - Connect "-oun" to "they" visually

5. **Reduce question count drastically:**
   - 10-15 questions per session maximum
   - More frequent, shorter sessions beat long slogs

---

### 4. Vocabulary Drill

**Screenshot:** `vocabulary.png`

#### Current State

The screenshot shows "Select a user" - vocabulary practice requires user selection to track personalized learning.

#### Learner Pain Points

1. **Blocked by user selection**
   - A new learner cannot try vocabulary practice immediately
   - Creates friction at the moment of curiosity
   - No preview of what this practice type offers

2. **No indication of what will be practiced**
   - What categories? What themes? What frequency level?
   - Learner has no sense of value before committing

3. **Likely same format as other drills**
   - When populated, probably same fill-in-blank format
   - Vocabulary could benefit from different approaches:
     - Image association
     - Audio recognition
     - Category grouping
     - Sentence context completion

#### Recommendations

1. **Allow anonymous vocabulary practice with a limited set**
   - 20 high-frequency words without login
   - Full vocabulary unlocks with account

2. **Show what the learner will practice:**
   - "Learn the 100 most common Greek words"
   - "Practice by category: Food, Travel, Greetings"
   - "Track your progress with spaced repetition"

3. **Diversify question formats:**
   - Greek to English translation
   - English to Greek production
   - Listen and identify (with audio)
   - Complete the sentence
   - Match word to image

---

### 5. Review Drill

**Screenshot:** `review.png`

#### Current State

Also requires user selection - this surfaces spaced repetition items from previous practice.

#### What This Should Be (Pedagogically)

- **Spaced repetition**: Items the learner got wrong come back sooner
- **Interleaving**: Mix of pronouns, articles, and verbs in one session
- **Personalized**: Based on individual error patterns

#### Learner Pain Points

1. **Same gating problem as Vocabulary**
   - User selection before seeing any content
   - No preview of what or how much needs review

2. **No indication of review queue**
   - How many items are due?
   - From which categories?
   - What is expected time commitment?

3. **Missed motivation opportunity**
   - Review is where engagement typically drops
   - Could show: "5 pronouns due, 3 verbs struggling"
   - Creates accountability and clear goals

#### Recommendations

1. **Show review summary before starting:**
   - "12 items due for review"
   - "Estimated time: 5 minutes"
   - "Focus areas: accusative articles, 3rd person verbs"

2. **Visual distinction from fresh practice:**
   - Review should feel like "reinforcement" not "new learning"
   - Different color scheme or badge system
   - Show "You learned this 3 days ago"

3. **Celebrate streaks and mastery:**
   - "5-day review streak!"
   - "Mastered: 1st/2nd person pronouns"
   - Progress visualization

---

## Cross-Cutting Issues

### The "Same-y" Problem

All drills use identical UI:

- Card with title and progress bar
- Greek text in center with subtitle
- Four radio button options
- "Check Answer" button
- Feedback panel after answer

This visual monotony creates several learning problems:

1. **No categorical memory formation**
   - The brain stores information better when it has distinct "containers"
   - Pronouns, articles, and verbs should feel like different activities
   - Currently they feel like "more multiple choice"

2. **Reduced engagement over time**
   - Novel interfaces maintain attention
   - Identical interfaces become "same old, same old"
   - Motivation drops

3. **No skill differentiation**
   - Some learners are strong on verbs, weak on articles
   - The identical UI does not help them see this clearly

4. **Lost metacognitive cues**
   - Learner cannot glance at screen and know "this is verb practice"
   - No visual reminder of what strategy to apply

### Missing Pedagogical Features

1. **No difficulty progression**
   - All questions appear equally weighted
   - No "easy mode" for beginners, "hard mode" for advanced
   - No adaptive difficulty based on performance

2. **No error pattern analysis**
   - If a learner consistently confuses "ton" and "tin", the app should notice
   - Currently no adaptation to individual errors
   - Missed opportunity for targeted remediation

3. **No hint system**
   - Sometimes a learner is close but needs a nudge
   - "The noun is masculine..." could help without giving the answer
   - Hints reduce frustration while maintaining learning

4. **No "explain first" option**
   - Some learners want to study before being tested
   - Currently throws learner into questions immediately
   - Could offer "Learn" mode before "Practice" mode

5. **No audio**
   - Greek pronunciation is essential
   - Hearing "ton" vs "tin" helps distinguish them
   - Missing sensory channel for learning

6. **No production practice**
   - All drills are recognition (select correct answer)
   - No typing Greek, no speaking Greek
   - Production requires different cognitive engagement

### Feedback Quality

The DrillCard shows feedback after answering, which is good. Based on the code:

**Correct answer feedback:**
- Green checkmark
- "Correct!"
- Explanation of why the answer is correct

**Incorrect answer feedback:**
- Red X
- "Not quite"
- Explanation showing correct answer

**What could be better:**
- Show related forms (the paradigm context)
- For wrong answers, explain WHY each wrong option was wrong
- Option to "try similar" before moving on
- Audio pronunciation of the correct answer

---

## Recommendations by Priority

### High Impact, Lower Effort

1. **Add paradigm reference cards to each drill**
   - Pronoun practice: show pronoun table with current position highlighted
   - Article practice: show article grid with current cell highlighted
   - Verb practice: show conjugation table with current form highlighted
   - Learner sees patterns while practicing

2. **Reduce question counts per session**
   - 10-15 questions maximum
   - Show "Session 1 of 4" rather than "1/55"
   - Multiple sessions beat one long session

3. **Add case/type labels to questions**
   - "Object pronoun: ___ blepeis?"
   - "Accusative article: Blepo ___ filous"
   - Helps learner know what framework to apply

4. **Add English glosses to Greek options**
   - `Ton (him)` instead of just `Ton`
   - Wrong answers become learning opportunities

### High Impact, Higher Effort

5. **Visually differentiate drill types**
   - Pronouns: Show sentence structure `[___] VERB` or `NOUN [___]` prominently
   - Articles: Show paradigm grid with current position highlighted
   - Verbs: Show conjugation table with current form highlighted
   - Each drill should look distinctly different at a glance

6. **Add production direction for verbs**
   - "How do you say 'they can' in Greek?" with Greek options
   - Builds ability to speak, not just recognize

7. **Implement progressive unlock**
   - Master singular before plural
   - Master nominative before accusative before genitive
   - Master regular verbs before irregular
   - Clear progression path

8. **Split pronoun drill by type**
   - Separate "Object Pronouns" from "Possessive Pronouns"
   - Each has different grammatical function and position
   - Master one before mixing

### Long-term Improvements

9. **Spaced repetition system**
   - Track individual items
   - Schedule reviews based on forgetting curve
   - Show "due for review" counts
   - Prioritize struggling items

10. **Error pattern detection**
    - Notice systematic confusions (ton/tin, me/se)
    - Provide targeted practice for weak areas
    - Surface patterns: "You often confuse masculine/feminine"

11. **Audio integration**
    - Play Greek pronunciation on question display
    - Option to hear options before selecting
    - Build listening comprehension

12. **Adaptive difficulty**
    - Start with core items, add complexity as mastered
    - If struggling, simplify options
    - If excelling, increase challenge

---

## Visual Differentiation Examples

### Current State (All Drills Look Like This)

```
[Title] Practice                    [N / Total]
[Subtitle description]

        ________________________
       |                        |
       |    Greek Prompt        |
       |    English subtext     |
       |________________________|

       ( ) Option 1
       ( ) Option 2
       ( ) Option 3
       ( ) Option 4

                        [Check Answer]
```

### Proposed: Pronoun Drill

```
Object Pronouns: Fill the Gap          [3 / 12]
Position: [PRONOUN] + VERB

        PARADIGM (current = 2nd sg)
        ┌─────────┬───────────┬───────────┐
        │         │ Singular  │ Plural    │
        ├─────────┼───────────┼───────────┤
        │ 1st     │ me (me)   │ mas (us)  │
        │ 2nd     │ [?]       │ sas (you) │ <- YOU ARE HERE
        │ 3rd m   │ ton (him) │ tous      │
        └─────────┴───────────┴───────────┘

        "___ perimenw" (I'm waiting for you)

        ( ) Tin (her)
        ( ) Me (me)
        ( ) Tous (them m.)
        ( ) Se (you)        <- Need 2nd person singular

                                [Check Answer]
```

### Proposed: Article Drill

```
Accusative Articles                    [5 / 9]
"Blepo" takes DIRECT OBJECT (accusative)

        filous = friends (masculine plural)

        ARTICLE GRID (current = m. pl. acc.)
                    Singular        Plural
        Masc Nom    o               oi
        Masc Acc    ton             [?]     <- YOU NEED THIS
        Fem         i / tin         oi / tis
        Neut        to              ta

        "Blepo ___ filous" (I see the friends)

        ( ) ton = m. sg. acc.
        ( ) twn = genitive plural
        ( ) tous = m. pl. acc.    <- Matches filous
        ( ) oi = m. pl. nom.

                                [Check Answer]
```

### Proposed: Verb Drill

```
Verb Conjugation: mporo (can)          [4 / 6]
Identify the subject from the ending

        CONJUGATION TABLE
        ┌──────────┬──────────────┬──────────────┐
        │          │ Singular     │ Plural       │
        ├──────────┼──────────────┼──────────────┤
        │ 1st      │ mpor-w       │ mpor-oume    │
        │ 2nd      │ mpor-eis     │ mpor-eite    │
        │ 3rd      │ mpor-ei      │ mpor-OUN [?] │ <- CURRENT
        └──────────┴──────────────┴──────────────┘

        "mporoun" - Who is doing the action?

        ( ) I (1st sg) - would be mporw
        ( ) you (2nd sg) - would be mporeis
        ( ) he/she (3rd sg) - would be mporei
        ( ) they (3rd pl)     <- -oun ending = they

                                [Check Answer]
```

---

## Summary

The core problem is not content quality - the Greek sentences, explanations, and wrong-option selection are all solid. The problem is **presentation uniformity** that fails to match the **conceptual diversity** of what is being taught.

**Pronouns** are about grammatical role (object vs. possessive) and sentence position.
**Articles** are about matching three dimensions (case x gender x number).
**Verbs** are about ending patterns that encode the subject.

Each of these is a different cognitive task requiring a different mental framework. The UI should help learners build these distinct frameworks by presenting each drill type in a way that highlights its unique structure.

The path forward:

1. Keep the good content
2. Add visual scaffolding (paradigm tables, position markers, English glosses)
3. Differentiate drill UIs to match their conceptual differences
4. Reduce session length, increase session frequency
5. Build toward spaced repetition and personalized review

Key metrics to track after changes:

- Time spent per practice session
- Completion rate (do learners finish sessions?)
- Accuracy by practice type
- Return rate (do learners come back?)
- Progression through material (are they getting further?)
- Error patterns (what confusions persist?)
