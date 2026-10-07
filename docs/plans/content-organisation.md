# Organising the Grammar Content: Eight Guides

Turn the grammar reference and three years of lesson notes into eight guides, each
organised around what you are trying to do in Greek rather than the part of speech
involved.

This proposal comes from reading all 51 lesson files and all 119 `grammarNotes` in
`src/scripts/seed-data/vocabulary/lessons/`. The findings come first, because the
structure is derived from them.

---

## What the lesson notes show

### 1. The notes keep returning to the same dozen topics

| Topic                                    | Notes | Lessons                                   |
| ---------------------------------------- | ----- | ----------------------------------------- |
| Past of `-μαι` verbs (`-θηκα` / `-τηκα`) | 6     | 2023-12, 2025-02 ×3, 2025-03, 2025-04     |
| Irregular past, as a list to memorise    | 6     | 2025-01 ×3, 2025-02 ×2, 2025-03           |
| `μου αρέσει` / `αρέσουν`                 | 4     | 2024-07, 2025-01, 2026-05, 2026-07        |
| Comparatives (`πιο … από`, `-τερος`)     | 4     | 2023-12, 2024-04, 2024-12 ×2              |
| `-άω` present conjugation                | 4     | 2024-04, 2024-06 ×2, 2025-03              |
| `υπάρχει` / `υπάρχουν`                   | 3     | 2026-05, 2026-07 ×2                       |
| `πολύ` vs `πολλά`                        | 3     | 2024-06 ×2, 2026-05                       |
| `σε` + article contractions              | 3     | 2024-12, 2025-04, 2026-06                 |
| Frequency scale                          | 2     | 2024-04, 2026-05                          |
| `πρέπει` / `έπρεπε να`                   | 2     | 2025-03, 2026-05                          |
| `γιατί` / `επειδή`                       | 2     | 2026-05, 2026-07                          |

A repeat is a signal: these are the topics that keep coming back. Today each repeat
becomes one more note beside the last one. In a guide, each becomes **one section**
that collects every lesson's examples.

### 2. The newer notes explain the same things better

- **Future.** In 2025-01 the note is "θα + present = simple future. The verb does
  not change". Its examples are glossed "I will be relaxing", which is the ongoing
  future. By 2026-07 the note is the *now / done / not yet* ladder
  (βλέπω · είδα · θα δω): the θα form shares its shape with the past.
- **Past.** In 2025 the irregular pasts are lists to memorise. In 2026-08 they
  become *shape families* (βάζω → θα βάλω → έβαλα; δίνω → θα δώσω → έδωσα),
  plus a rule for where the έ- comes from.

The structure should **use the newest explanation and file the older notes under
it as examples**, not show both side by side.

### 3. Some notes are wrong

- 2024-11-28 says the genitive plural "always has accent on -ών". Its own examples
  include των ανθρώπων and των δρόμων, which are not stressed on -ών.
- The 2025-01 future note (above) calls the ongoing future the simple future.

This rules out building guides automatically by stacking notes. **Guides are
written by hand; notes are what they're written from.**

### 4. A fifth of the notes cover three topics that no current page owns

Roughly 26 of the 119 notes are about **linking ideas** (πότε/όταν, γιατί/επειδή/γι' αυτό,
αν…τότε, νομίζω ότι, ή…ή), **scales** (ποτέ→πάντα, κανένα→καθόλου→μερικά→πολλά,
πολύ/πολλά, double negatives, πιο…από) and **sentences with no doer** (υπάρχει,
βρέχει, κάνει κρύο, πρέπει). The Reference tabs are organised by part of speech,
and `docs/learning-progression.md` has no step for any of these. This is why
Reference feels overloaded: lesson material arrives and has no home.

### 5. Some notes are about a single word, not grammar

For example: `κλείνω` has several meanings, the opposite-verb pairs, the fixed
chunks with βγάζω/παίρνω, πορτοκαλί vs πορτοκάλι, and the hobby phrasing with να
vs a noun. These belong on that word's own entry in Learn, not in a guide.

---

## The structure

### Eight guides replace the Reference tabs

The current Reference tabs are cases, articles, nouns, pronouns, adjectives,
prepositions, verbs and patterns. They regroup into **eight guides, each named
after what you are doing**:

| #   | Guide                                   | Greek               | Absorbs                                 |
| --- | --------------------------------------- | ------------------- | --------------------------------------- |
| 1   | Who does what                           | Ποιος κάνει τι      | cases, articles, nouns                  |
| 2   | Verbs: now · done · not yet             | Ρήματα              | verbs (all bands)                       |
| 3   | The little words: μου, σου, του         | Μου, σου, του       | pronouns                                |
| 4   | Words that agree                        | Συμφωνία            | adjectives, gender                      |
| 5   | Place: σε, από, για                     | Πού                 | prepositions                            |
| 6   | Scales: how often, how many, how much   | Πόσο                | *new: from lessons*                     |
| 7   | Joining ideas: when, why, if            | Σύνδεση             | *new: from lessons*                     |
| 8   | Sentences without a doer                | Χωρίς υποκείμενο    | patterns                                |

Eight entries is few enough to remember. **This is a restructure of Reference, not a
fourth area.** The full paradigm tables stay, as each guide's last section, so there
is one place per topic instead of two.

The first five follow the phase order of `docs/learning-progression.md` (cases →
είμαι → pronouns → adjectives → prepositions). Guides 6–8 are where that
progression has nothing, which is also where most of the recent lessons have gone.

### Every guide has the same shape

1. **The idea in one sentence, plus one overview table.** The overview table
   doubles as the guide's contents.
2. **Sections, easiest first.** Each section has:
   - the rule, using the newest explanation;
   - one table;
   - examples from lessons, each marked with its lesson date;
   - an optional *don't confuse* box linking to the other word's section;
   - a **drill link**, or an explicit "no drill yet".
3. **Full tables:** the complete paradigms that Reference holds today.
4. **Seen in lessons:** the dates that fed this guide, derived from the notes,
   never written by hand.

Every section ending in a drill is a rule of the structure, not decoration: it
keeps reading pointed at practice.

---

## Worked example: Guide 2, *Verbs: now · done · not yet*

This follows your outline: είμαι → present → past → future → other verbs →
conjugations → irregulars. It is a single guide, and its sections run in that order.
The source lessons are listed per section.

| §   | Section                                    | Sources                                            | Drill                                   |
| --- | ------------------------------------------ | -------------------------------------------------- | --------------------------------------- |
| 2.1 | Every verb has three forms                 | 2026-07-28                                         | Tense ladder                            |
| 2.2 | είμαι: είμαι · ήμουν · θα είμαι            | 2024-12-09, 2026-07-17, 2026-07-28                 | είμαι · present / past / future         |
| 2.3 | Verbs that keep their shape (έχω, ξέρω…)   | 2026-07-28                                         | Stative verbs · past                    |
| 2.4 | Present endings: -ω, -άω, irregulars       | 2024-04-29, 2024-05-06, 2024-06-05 ×4, 2024-06-17, 2025-03-17 | Conjugation endings, Irregular · present |
| 2.5 | The past, by shape family                  | 2025-01-16, 2025-01-27 ×4, 2025-02-03 ×2, 2025-02-17, 2025-03-12, 2025-03-27, 2026-07-28, 2026-08-14 ×4 | Aorist stems, Aorist formation |
| 2.6 | The future uses the past's shape           | 2026-07-28, 2026-08-14 (supersedes 2025-01-16)     | Future formation                        |
| 2.7 | The same short form after να, πριν, ίσως   | 2024-12-16, 2026-05-15, 2026-06-05                 | Modal verbs (check its scope)           |
| 2.8 | `-μαι` verbs, present and past             | 2024-06-26 ×2, 2024-07-29, 2023-12-09, 2025-02-03, 2025-02-10, 2025-02-17, 2025-03-17, 2025-04-17 ×2 | *no drill title covers this* |
| 2.9 | The other past: σπούδαζα vs σπούδασα       | 2025-02-17                                         | Which tense?                            |
| 2.10 | Commands: έλα, κάτσε, μη + present        | 2024-07-29, plus a 2024-06-17 phrase               | Imperatives                             |
| —   | Full tables                                | today's `/reference/verbs/:band`                   |                                         |

§2.5 goes from simplest to hardest: the endings, learnt once on πήρα; the
regular families (-ζω → -σα; -άω → -ησα); the -αίνω family (βγήκα, θα βγω); the
βάλ- family; the δώσ-/πάρ- family; where the έ- comes from; and last, the
one-offs you just memorise (είδα, ήπια, έφαγα, πήγα, ήρθα).

§2.7 is a real connection the notes make one at a time without linking:
θα βοηθήσω, να βοηθήσω, πριν πάω and ίσως πάω all use the same short form. It's
one form, not four rules.

---

## Where the πότε / όταν / τότε table goes

Guide 7, *Joining ideas*, §7.1. It becomes one row of a larger table. The
lesson notes already contain two of the rows:

| Ask       | Link                    | Point back       | Source                               |
| --------- | ----------------------- | ---------------- | ------------------------------------ |
| πότε;     | όταν *when*             | τότε *then*      | 2024-07-08, 2026-07-28               |
| γιατί;    | επειδή *because*        | γι' αυτό *that's why* | 2026-05-15, 2026-07-10, 2024-12-30 |
| πού;      | όπου *where*            | εκεί *there*     | *my addition*                        |
| πώς;      | όπως *as*               | έτσι *like this* | *my addition* (έτσι from 2026-07-28) |

Its *don't confuse* box handles όταν vs ήταν and links to §2.2, where ήταν lives.

The rest of Guide 7:

- §7.2 αν … τότε (2026-07-28)
- §7.3 νομίζω / πιστεύω ότι, ίσως (2026-07-28)
- §7.4 ή … ή, and ή vs η (2026-06-26)
- §7.5 πριν + the short form, linking to §2.7

The Question words drills cover the *Ask* column. No drill title covers the other two columns.

---

## The other guides, briefly

**1. Who does what.**
- Doer / Target / Owner.
- ο/η/το and ένας/μία/ένα (2023-11-08, 2025-04-10).
- The Target form for objects, names and time phrases: τη Δευτέρα (2024-12-02 ×2, 2024-12-30).
- -ος nouns across cases and the genitive, with the -ών claim corrected (2024-11-28 ×3).
- χρονών (2024-12-02).
- Drills: all the Doer / Target / Owner drills.

**3. The little words.**
- One set of forms (μου, σου, του…) doing three jobs: my (το σπίτι μου), to me (μου μιλάς, δώσ' μου) and the liker in αρέσει.
- §3.2 merges the four αρέσει notes, using 2026-07-10, which adds αρέσεις.
- τον/την/το as objects (2025-03-12, 2025-04-10).
- δικός μου and μόνος μου (2026-07-10, 2025-05-01).
- Drills: the pronoun drills. No drill title covers αρέσει.

**4. Words that agree.**
- -ος/-η/-ο, -ης/-ες and plurals (2024-12-09 ×2, 2024-12-16, 2024-12-30).
- Numbers that agree, and ordinals (2024-11-11, 2025-01-06).
- Gender by word family: countries are η, languages are τα ελληνικά, demonyms, professions, seasons, -πωλείο, -ινό meals (six lessons).
- Drills: the adjective drills. No drill title covers gender by word family.

**5. Place.**
- σε + article, στην vs στη (2025-04-10, 2024-12-30).
- Position words + σε or + από (2024-07-15 ×2).
- για + purpose with πάμε σε (2026-06-26).
- δίνω σε (2024-06-17).
- No drill title names prepositions.

**6. Scales.**
- Frequency (2024-04-29, 2026-05-29).
- The quantity ladder with υπάρχει (2026-07-10, 2026-07-17, 2024-08-05).
- πολύ vs πολλά (three notes).
- Double negatives: πουθενά, καθόλου, ποτέ δεν (2025-03-27, 2025-02-03).
- πιο … από and -τερος (four notes).
- The How much drills cover πόσος. Nothing covers the rest.

**8. Sentences without a doer.**
- υπάρχει / θα υπάρχει.
- κάνει κρύο; βρέχει vs έχει βροχή (2024-03-25, 2026-07-10).
- πρέπει / έπρεπε να.
- θα ήθελα να (2026-05-08).
- αρέσει links to §3.2.
- This is today's Patterns tab, with a clearer name.

**Not guides:**
- Telling time, "ago" and "last week" go to Learn → Essentials → Time, which already exists.
- Single-word notes (finding 5) go to that word's entry in Learn.

---

## What happens to the rest of the app

| Area                    | Change                                                                    |
| ----------------------- | ------------------------------------------------------------------------- |
| Reference               | Becomes the eight guides; its paradigm tables move to each guide's *Full tables* |
| Reference "Common mistakes" collapsibles | Become *don't confuse* boxes in the relevant section     |
| Learn                   | Unchanged: words, phrases, conversations, essentials                      |
| Practice                | Unchanged. Guides link into it; gaps in coverage become visible           |
| Lesson files            | Stay the source of vocabulary; their notes feed guides                    |
| A lesson log            | Optional, later: a thin dated list linking each lesson to the sections it fed |

---

## Keeping it cohesive as lessons keep coming

The structure breaks down if new notes have nowhere to go. So:

1. **Type the notes properly.** All 119 already share
   `{ pattern, examples, explanation }`. Give `grammarNotes` that type (it is
   `Record<PropertyKey, unknown>[]` today) and add `section`: either a guide-section
   id such as `"past/past-shapes"`, or `"word"` for single-word notes.
2. **Each guide owns its section list** in its own `*.data.ts`, following the
   colocation rule in CLAUDE.md. "Seen in lessons" is derived by scanning the
   notes, never kept as a separate list.
3. **Add a guard test**, modelled on `drill-catalogue.test.ts`. It fails when a
   note has no `section` or names a section that does not exist. Nothing can
   arrive without a home.
4. **Update the `lesson` skill** to ask which section each new note belongs to.
   Usually a new note adds an example to an existing section. When it doesn't
   fit anywhere, it needs a new section in a guide, decided deliberately, not
   appended by default.

---

## First slice

Build it in this order:

1. **Guide 2, §2.1–2.3 and §2.6.** These are the ladder, είμαι, keep-shape verbs
   and the future. Every section already has a drill, so this tests the
   section → drill loop.
2. **Guide 7, §7.1.** The linking-words table, which is where this discussion
   started.

Then check the one question that matters: when you need something mid-thought,
do you find it faster than you do now? If so, assign all 119 notes to sections
(the guard test turns that into a checklist) and move on to the other guides.
