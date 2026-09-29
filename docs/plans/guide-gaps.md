# Guide gaps

An audit of every content source against the eight guides: Reference, Learn and Practice pages, all 52 lessons, the seeded vocabulary and grammar patterns, and the listening transcripts. Each finding was checked against what a guide section actually teaches, not its title. Line references are to the source at the time of the audit (29 September 2026).

Read it in this order: rules the guides state wrongly, then the one missing guide, then new sections, then small extensions.

## Status

- **Done:** every section, §1 to §6.
  - Two rounds, on 29 September 2026.
  - §4 was done in the second round, with new sections wherever an extension outgrew its table.
  - Where the seeded data contradicted this list, the guides follow the data. For example, most -ώ verbs take -ησ-, and only μπορώ, καλώ and παρακαλώ take -εσ-.
- **Data:**
  - The `-άω/-ώ` family is split into `-άω` and `-ώ`; the generator rejects a lemma whose ending contradicts its tag.
  - Production is re-seeded.
  - The misspelt vocabulary rows are deleted.
- **Phone:** every guide table fits a 384px phone.
- **Planned drills:** sections with no real drill carry `plannedDrills` stubs. The guide page shows each stub unlinked, and the stub records the id the real drill will take. Building those drills is the remaining work.

## 1. Rules the guides state wrongly

These mislead now, so they come before any new content.

| Section | What it says | What the content shows |
| --- | --- | --- |
| `verbs/short-form` | After να, πριν and ίσως you use the short form. | να takes the present for something ongoing or habitual: μου αρέσει να τρώω, είναι δύσκολο να βρίσκεις δουλειά, Το χόμπι μου είναι να μαγειρεύω. The guide's own `little-words/likes` example (Δεν του αρέσει να κάνει μπάνιο) breaks the rule. Teach one action (να φάω) against ongoing (να τρώω). |
| `scales/poly-polla` | πολύ never changes. | Before a singular noun it is the adjective πολύς, πολλή, πολύ: πολύ κόσμο, πολλή δουλειά. The rule invites the error in lesson 2026-05-15:74 ("πολύ δουλειά"). |
| `verbs/past-shapes` | -ζω takes -σ-; -άω takes -ησ-; -αίνω takes -ηκ-. | Each has common exceptions: άλλαξα, έπαιξα (-ζω → -ξ-); γέλασα, ξέχασα, πείνασα (-άω → -ασ-); έμαθα, κατάλαβα (-αίνω drops -αιν-). Say "most", and show the exceptions. |
| `verbs/present` | -ω and -άω are the two endings sets; πάω and τρώω are one-offs. | ακούω and λέω are a family (ακούς, ακούει; λες, λέει), not one-offs, and the -ω column gives the wrong \*ακούεις. |

## 2. The missing guide: nouns

**Nouns: one and more than one.** Every source points at it, and nothing teaches it. The guides decline only masculine -ος (`roles/owner`, `roles/target`), and no section says how to make a plural.

- Seeded nouns by family (at least 147; the lessons add about 350 more): masculine -ος 46, feminine -α 28, neuter -ι 23, neuter -ο 19, feminine -η 11, neuter -μα 6, masculine -ας 5, feminine -ση/-ξη/-ψη 4, neuter -ος 2, masculine -ης and -ες 1 each.
- Reference already holds all 15 paradigms (`reference/tabs/nouns.content.llm:58-240`), and two drills no guide links to exercise them: `nominative-nouns`, `nominal-all-nouns`.

Sections:

1. **Endings by family.** Doer, Target and Owner, one and more than one, for -ος, -ας/-ης, -α/-η, -ο/-ι, -μα. ονόματα adds -τ-; the plural Doer equals the Target except in -ος nouns.
2. **Nouns that add a syllable.** καφέδες, γιαγιάδες, μπαμπάδες, παππούδες, ταξιτζήδες; πόλη → πόλεις.
3. **Nouns that never change.** Loanwords, mostly neuter: σινεμά, πάρτι, χόμπι, ραντεβού, σπορ, βίντεο.
4. **Plural-only nouns.** διακοπές, ψώνια, μεσάνυχτα.
5. **The Owner beyond -ος.** της Μαρίας, της πόλης, του παιδιού, του ονόματος. It should move here from `roles/owner`, which keeps the idea but only shows ο γιατρός. Stress moves in some: του οδοντιάτρου.
6. **The Owner with no article, as a label.** βοηθός οδοντιάτρου, τόπος κατοικίας, καταστήματα ρούχων. It appears in five lessons.
7. **Calling someone.** Γιάννη!, πατέρα!, φίλε!, κύριε. CLAUDE.md defines the `!-!` mark, but no guide uses it.

It sits between Roles, which says what the endings mean, and Agreement, which says what copies them.

## 3. New sections in existing guides

| Guide | New section | Evidence | Drills to link |
| --- | --- | --- | --- |
| Roles | **When Greek uses the article and when it drops it.** It adds one for countries, names, abstract nouns, whole categories and days (η Ελλάδα, ο Γιάννης, μου αρέσουν οι γάτες). It drops it for jobs after είμαι (είμαι προγραμματιστής) and in fixed activities (πίνω καφέ, πάω σινεμά, κάνω σπορ). | `reference/components/articles-section.tsx:21-56`; lessons 2024-05-06:28-42, 2024-12-09:158-165, 2026-05-08:141 | — |
| Little words | **The long forms: εγώ, εμένα, αυτός.** Doer pronouns and why they are usually dropped. εμένα and εσένα after a preposition (για μένα, από εμένα, never "για με"). αυτός/αυτή/αυτό as he and as this, and αυτοί for a mixed group. ο ένας τον άλλον. | `reference/components/pronouns-section.tsx:30-66`; lessons 2025-04-10:91-107, 2026-09-29:89-150 | — |
| Little words | **Polite you.** σας and the plural verb: Θέλετε κάτι;, Γεια σας, Καλώς ήρθατε, Καθίστε. Only `verbs/commands` mentions it today. | `learn/conversations/tabs/{food,requests,arriving}.tsx`; `seed-data/vocabulary/conversations.ts:45-58` | `blocks-chunks` |
| Joining | **Who, which, how many: ποιος, πόσος, τι.** ποιος/ποια/ποιο agrees and takes the Target (ποιον καφέ, Ποιους βλέπετε;). πόσος agrees (πόσοι, πόσες, πόσα). Also τι είδους, and πού/πώς ask while που/πως link. | `practice/blocks/question-words/*`; `seed-data/vocabulary/phrases.ts:132-156`; lessons 2024-04-22:34-57, 2026-09-29:75 | `blocks-qw-which-forms`, `blocks-qw-which-phrase`, `blocks-qw-how-many-forms`, `blocks-qw-how-many-phrase`, `blocks-qw-review` (all unlinked today) |
| Joining | **που: that, who, which.** είμαι χαρούμενος που…, ο φίλος που…, and the written το οποίο. | lessons 2024-12-09:173, 2025-01-16:130-135; listening `04-oi-epoches.md:92,105` | — |
| Joining | **Purpose: για να, για να μην.** For something to happen, not a noun (`place/purpose` has για + noun only). | listening `04-oi-epoches.md:72,85,96` | — |
| Scales | **Some, none, every, any.** A grid like `joining/when-why`: κάτι / τίποτα / όλα / ό,τι; κάποιος / κανένας / όλοι / όποιος; κάπου / πουθενά / παντού / οπουδήποτε. Also κάθε, which never changes. `scales/negatives` has the none row only. | `seed-data/vocabulary/pronouns.ts:4-47`; `reference/components/pronouns-section.tsx:373-397`; lessons 2026-07-10:201-207 | — |
| No doer | **It's hard to…: είναι + neuter.** είναι δύσκολο να…, είναι τρελό, ήταν πολύ ωραία. Also έχει (Target) against υπάρχει (Doer) for "there is": έχει Άγγλους στην Πάφο. | lessons 2025-02-17:122, 2026-07-10:95, 2024-12-30:98 | — |
| Verbs | **Verbs in -ώ: μπορώ, μπορείς.** A third ending set: μπορώ, οδηγώ, τηλεφωνώ, προσπαθώ, συμφωνώ, and 13 seeded verbs in all. The linked `verbs-conjugation-endings` drill already tests it. It could be a column in `verbs/present`, but the section would then have five columns. | `seed-data/vocabulary/verb-stems.ts`; lessons 2023-12-31:10 and 10 more | `verbs-conjugation-endings` |

## 4. Extensions to existing sections

Small unless marked.

**Roles**
- `articles`: the movable -ν (την πόρτα, τη μητέρα; δεν πάω, δε θέλω).
- `overview`: after είναι and γίνομαι, both sides take the Doer form.
- `target`: κάθε Τρίτη has no article; months take τον (τον Ιούλιο).

**Verbs**
- `past-shapes` (medium): the consonant families, which the linked aorist and future drills already test.
  - -εύω, -φω, -πω → -ψα: δούλεψα, έγραψα
  - κ/γ/χ, -χνω → -ξα: έψαξα, έτρεξα
  - -ώνω → -ωσα: πλήρωσα
  - -νω → -σα: έφτασα, έκλεισα
  - -ώ → -εσα: μπόρεσα, κάλεσα
  - one-offs: πήγα, έμεινα, έφερα
  - one line on stress moving in the plural: δοκιμάσαμε
- `mai-verbs` (medium): extend the set.
  - more families: -άμαι (θυμάμαι, θυμάσαι, θυμάται, θυμόμαστε), -ιέμαι (γεννιέμαι), -ούμαι (ασχολούμαι)
  - the future: θα θυμηθώ, θα κοιμηθώ
  - the past continuous: σκεφτόμουν
  - the π → φ change: επισκέφτηκα
  - link `verbs-conjugation-endings`
- `present`: the ακούω, λέω, κλαίω family (see §1); πηγαίνω as the other form of πάω.
- `ongoing-past`: the rule, present stem + -α, with -άω verbs using -ούσα; μπορούσα.
- `commands`:
  - how commands are built: short form + -ε
  - irregular commands: πες, δες, βγες, φέρε, πιες, κοίτα
  - ongoing against one-off: τρώγε / φάε
  - let's: ας κάνουμε
  - μη before a consonant
- `short-form`: να μην; όταν and αν take the short form for the future (Όταν έρθεις); a verb of seeing or hearing + να (ακούω τον σκύλο να τραγουδάει).
- `future` or `ladder`: δεν comes before θα.

**Little words**
- `objects` (medium):
  - add μας, σας, τις, τα
  - the pronoun goes after a command: δώσε μου, δες με
  - two pronouns, person first: μου το δίνει
  - the object named twice: Το παιδί τον λένε Λουκά
  - με λένε
  - widen the "don't confuse" box to τους, τις, τα, του, της
- `forms`: after an adjective the short word follows it (το αγαπημένο μου χρώμα), and a word gains a second accent (την εκπαίδευσή μας).
- `likes`: verbs that work the same way: μου φαίνεται, μου λείπεις, δε με νοιάζει (Target form), Άρεσε;, μ' αρέσει.
- `own-alone`: a "don't confuse" note: μόνο (only) against μόνος (alone).

**Agreement**
- `adjectives` (medium):
  - the Target and Owner forms: τον καλό φίλο, της μεγάλης πόλης
  - the -α type after a vowel: ωραία, παλιά, νέα
  - the -ύς / -ιά / -ύ type: βαρύς, μακρύς
  - colours that never change: μπλε, ροζ, γκρι, καφέ
  - an adjective standing alone: θέλω το κόκκινο
  - -μένος describing the speaker: κρυωμένος, παντρεμένη
  - link `adjectives-agreement-owner`
- `gender-families`:
  - gender from the ending: -ος m, -α/-η f, -ο/-ι/-μα n
  - -είο places
  - -ση/-ξη/-ψη and -ότητα are feminine
  - feminine -ος: η Κύπρος
  - pairs: θείος/θεία, γείτονας/γειτόνισσα
  - endings that make small or big: -άκι, -άκος, -άρα
- `numbers`: χιλιάδες, and reading a year aloud.

**Place**
- `se-contractions`: στους; σε stays whole before μια or ένα, or with no article (σε μια λίμνη, σε λίγο).
- `position`: μέσα σε, πάνω σε, κάτω από, γύρω από, ανάμεσα σε; the pairs μέσα/έξω and αριστερά/δεξιά.
- `purpose`: χωρίς, μέχρι, προς, σαν; για for a length of time (για δύο χρόνια); μετά από.

**Scales**
- `frequency`: σχεδόν ποτέ, πότε πότε, καμιά φορά, πολλές φορές, σχεδόν πάντα; ποτέ against πότε.
- `quantity`: λίγο; όλος and κάθε.
- `comparing`: the most (ο πιο όμορφος, οι περισσότεροι); irregulars (καλύτερος); σαν.
- `negatives`: όχι against δεν (όχι πολύ καλά).

**Joining**
- `thinking`: μήπως in a question against ίσως in a statement (never ίσως θα).
- a but/so/also row: αλλά, όμως, λοιπόν, επίσης.

## 5. Drills no guide links to

- For the new sections above: `nominative-nouns`, `nominal-all-nouns`, `adjectives-agreement-owner`, `nominal-phrase-owner`, `blocks-qw-*` (5), `blocks-chunks`.
- `nominal-phrase-doer` and `nominal-all-phrases` fit `roles/overview`; `blocks-days-of-week` fits `roles/target`.
- `blocks-opposites` is vocabulary and needs no guide.

These sections have no drill at all:
- `little-words/likes` and `own-alone`
- `agreement/gender-families`
- every section of Place and Scales
- Joining, apart from `when-why`
- `no-doer/there-is`, `weather` and `wish`

## 6. Errors in the data

| File | Error | Fix |
| --- | --- | --- |
| `lessons/2024-11-28-masculine-os.ts:67-71` | The note says the plural Owner is always stressed on -ών. Its own example, των ανθρώπων, contradicts it. | Match `roles/owner`. |
| `lessons/2025-01-16-future-tense-time-expressions.ts:171-186` | θα + present is called the simple future. | It is the future continuous. |
| `lessons/2025-02-17-life-story-past-tense.ts:157-168` | The past continuous is said to share the present's form. | σπούδαζα is not σπουδάζω. |
| `lessons/2026-05-08-occupations-work.ts:131` | πλήρης απασχόλησης | πλήρους απασχόλησης |
| `lessons/2025-05-01-professions-alone.ts:111` | οδοντίατρου | οδοντιάτρου |
| `lessons/2026-05-08-occupations-work.ts:51,175` | υπεύθυνος given as the feminine | η υπεύθυνη, as 2025-05-01:20 has it |
| `lessons/2026-05-15-hobbies-because.ts:74,108` | πολύ δουλειά | πολλή δουλειά |
| lessons, many | -ώ verbs tagged `conjugationFamily: "-άω/-ώ"` | Separate -ώ from -άω. |
| `seed-data/vocabulary/verb-conjugations.ts:981,1039,1097,1155` | The future of χρειάζομαι, χαίρομαι, σκέφτομαι and υπόσχομαι is the continuous form (θα σκέφτομαι). | θα χρειαστώ, θα χαρώ, θα σκεφτώ, θα υποσχεθώ |

The seed file is a production data fix; re-seeding is additive, so check whether the wrong rows need replacing rather than adding beside.

## 7. Left out on purpose

These follow `content-organisation.md`, which sends them to Learn rather than a guide:
- **Telling the time and dates.**
- **Past-time words and "ago":** χτες, πέρυσι, πριν από μια εβδομάδα, την περασμένη εβδομάδα. Lesson notes file these under Essentials, but Essentials → Time has no slot for them yet, so they currently have no home.
- **Building numbers:** δεκατρία, τριάντα δύο.
- **Single words and idioms:** μια χαρά, τα λέμε, κάνω μπάνιο.
- **The pluperfect:** it appears once, in listening only.
