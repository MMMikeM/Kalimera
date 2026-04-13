# Greek Morphology for Production & Data Modelling

This reference covers how Greek morphology works, focused on what matters for building a production drill app. It's not a complete grammar. It's what you need to know to model data correctly and make good schema decisions.

## Noun morphology

### How nouns work
Every Greek noun has a fixed gender (masculine, feminine, neuter) and declines across 4 cases × 2 numbers = 8 possible forms. In practice, many of these forms are identical to each other.

### Declension patterns

Nouns are classified by gender + nominative singular ending. This determines how they decline:

**Masculine**
- **-ος** (ο φίλος): Most common. Acc: -ο, Gen: -ου, Pl: -οι/-ους
- **-ας** (ο πατέρας): Acc: -α, Gen: -α, Pl: -ες
- **-ής** (ο μαθητής): Acc: -ή, Gen: -ή, Pl: -ές
- **-ές** (ο καφές): Acc: -έ, Gen: -έ, Pl: -έδες (imparisyllable)
- **-ούς** (ο παππούς): Acc: -ού, Gen: -ού, Pl: -ούδες (imparisyllable)

**Feminine**
- **-α** (η θάλασσα): Acc: -α, Gen: -ας, Pl: -ες
- **-η** (η ζωή): Acc: -ή, Gen: -ής, Pl: -ές
- **-η archaic** (η πόλη): Acc: -η, Gen: -ης, Pl: -εις (different plural!)
- **-ά** (η γιαγιά): Acc: -ά, Gen: -άς, Pl: -άδες (imparisyllable)

**Neuter**
- **-ο** (το βιβλίο): Acc: -ο, Gen: -ου, Pl: -α
- **-ι** (το παιδί): Acc: -ι, Gen: -ιού, Pl: -ιά
- **-μα** (το όνομα): Acc: -μα, Gen: -ματος, Pl: -ματα (imparisyllable)
- **-ος** (το κράτος): Acc: -ος, Gen: -ους, Pl: -η

### Modelling implications
- **Store the declension pattern**: it's inferrable from gender + ending ~90% of the time, but the exceptions matter and the pattern serves as a breadcrumb for manual enrichment.
- **Nominative + accusative are the priority forms to store**: they cover 80%+ of production scenarios.
- **Neuter nouns have identical nom/acc**: don't waste drill time on neuter accusative; it's free.
- **Genitive singular is worth storing for possession drills**: "του φίλου", "της θάλασσας".
- **Plurals can wait**: singular forms serve most production needs.
- **Articles change by case**: storing the article alongside the form is valuable because the article IS the case signal in conversation.

### Stress shifts
Some declension patterns shift stress in certain forms. Examples:
- ο άνθρωπος → του ανθρώπου (stress moves to second syllable in genitive)
- η θάλασσα → των θαλασσών (stress moves to last syllable in genitive plural)

This is why you can't just derive forms by swapping endings. The full form (with correct stress) needs to be stored or computed with stress rules.

## Verb morphology

### How verbs work
Greek verbs conjugate for person (1st/2nd/3rd) × number (singular/plural) × tense/aspect. The present tense is predictable from the conjugation family. The aorist (simple past) is often unpredictable and must be stored.

### Conjugation families (present tense)

| Family | Ending pattern | Example |
|--------|---------------|---------|
| Group 1 (-ω) | -ω, -εις, -ει, -ουμε, -ετε, -ουν(ε) | γράφω |
| Group 2a (-άω) | -άω/-ώ, -άς, -ά(ει), -άμε/-ούμε, -άτε, -άν(ε)/-ούν | μιλάω |
| Group 2b (-ώ) | -ώ, -είς, -εί, -ούμε, -είτε, -ούν(ε) | μπορώ |
| Deponent | -μαι, -σαι, -ται, -μαστε, -στε, -νται | έρχομαι |

### Aorist stems

The aorist stem is the single most important piece of verb data to store. It's unpredictable for many common verbs.

**Regular patterns** (from present stem):
- -ω → -σα (γράφ-ω → έγραψ-α, but note the ψ from φ+σ)
- -ζω → -σα (αγοράζ-ω → αγόρα-σα)
- -νω → various (μένω → έμεινα, πίνω → ήπια)

**The stem-final consonant determines the aorist pattern:**
- Labials (π, β, φ) + σ → ψ: γράφω → έγραψα
- Velars (κ, γ, χ) + σ → ξ: ανοίγω → άνοιξα
- Dentals (τ, δ, θ) + σ → σ: πείθω → έπεισα
- Nasals/liquids: various: μένω → έμεινα, δέρνω → έδειρα

**Suppletive verbs** (completely different stems):
- τρώω → έφαγα (eat)
- πίνω → ήπια (drink)
- βλέπω → είδα (see)
- λέω → είπα (say)
- βρίσκω → βρήκα (find)
- παίρνω → πήρα (take)
- έρχομαι → ήρθα (come)
- φεύγω → έφυγα (leave)

### Modelling implications
- **Store aorist stem explicitly**: it's the most valuable piece of verb data after the lemma and conjugation family.
- **Present tense is computable**: from conjugation family + lemma, you can generate all 6 present forms. Store them for query convenience, but they're derivable.
- **Aorist is NOT computable**: for suppletive and irregular verbs, the aorist must be stored. Even for regular verbs, the stem-final consonant interaction is error-prone to compute.
- **Future = θα + subjunctive stem**: the subjunctive stem is usually the aorist stem without the augment. If you store aorist, you can derive future.
- **Imperative = separate forms**: store the 2-4 imperative forms (perfective sg/pl, imperfective sg/pl) as they have their own irregular patterns.
- **Don't model aspect as a separate axis**: aspect (perfective/imperfective) is baked into the tense choice. Aorist is inherently perfective; present/imperfect is inherently imperfective. Don't add an "aspect" column.

## Adjective morphology

### How adjectives work
Adjectives agree with nouns in gender, case, and number. Theoretically 3 × 4 × 2 = 24 forms per adjective. In practice, many forms collapse.

### Patterns

| Pattern | Masc | Fem | Neut | Example |
|---------|------|-----|------|---------|
| -ος/-η/-ο | -ος | -η | -ο | καλός/καλή/καλό |
| -ος/-ια/-ο | -ος | -ια | -ο | ωραίος/ωραία/ωραίο |
| -ης/-ης/-ες | -ης | -ης | -ες | διεθνής/διεθνής/διεθνές |
| -ύς/-ιά/-ύ | -ύς | -ιά | -ύ | βαθύς/βαθιά/βαθύ |
| indeclinable | same | same | same | μπλε, καφέ, ροζ |

### The -ος/-η/-ο vs -ος/-ια/-ο distinction
If the letter before -ος is a vowel, the feminine is -ια (ωραίος → ωραία).
If the letter before -ος is a consonant, the feminine is -η (καλός → καλή).
This rule is ~95% reliable.

### Modelling implications
- **Store the pattern**: it's the key to generating all forms.
- **Nominative tri-forms (m/f/n) are the priority**: these are what the learner sees first and what covers basic agreement.
- **Accusative is often identical to nominative**: for neuter always; for feminine usually; for masculine, -ος becomes -ο. Low marginal effort.
- **Full paradigm storage is overkill**: generate from pattern when needed for drills. Store only the forms you're actively drilling.
- **Indeclinables are a closed set**: maybe 10-15 adjectives total. Hardcode the list.

## Pronoun morphology

### What matters for production
Pronouns have strong (emphatic) and weak (clitic) forms. Weak forms are dramatically more frequent.

**Weak object pronouns (accusative)**
| Person | Singular | Plural |
|--------|----------|--------|
| 1st | με | μας |
| 2nd | σε | σας |
| 3rd m | τον | τους |
| 3rd f | την | τις |
| 3rd n | το | τα |

**Weak pronouns (genitive = indirect object)**
| Person | Singular | Plural |
|--------|----------|--------|
| 1st | μου | μας |
| 2nd | σου | σας |
| 3rd | του/της | τους |

### Placement rule
Weak pronouns go BEFORE the verb: Τον βλέπω (I see him), Μου αρέσει (I like it / it pleases me).

Exception: after imperatives and gerunds: Δώσε μου! (Give me!), Κοιτάζοντάς τον (Looking at him).

### Modelling implications
- **Pronouns are a closed set**: store all forms explicitly. No inference needed.
- **Placement rules belong in drill logic, not the schema**: the schema stores the forms; the drill engine handles placement.
- **Genitive clitics double as possessives**: μου = "me" (indirect object) AND "my" (possessive). Don't model these as separate entries.

## Article morphology

### The definite article is a case marker
In spoken Greek, the article is often the only audible signal of what case a noun is in. This is why storing articles alongside noun forms is valuable for drills.

| | Masc | Fem | Neut |
|---|------|-----|------|
| Nom sg | ο | η | το |
| Gen sg | του | της | του |
| Acc sg | τον | την | το |
| Nom pl | οι | οι | τα |
| Gen pl | των | των | των |
| Acc pl | τους | τις | τα |

### The -ν rule
Accusative τον and την keep the ν when the next word starts with a vowel or κ, π, τ, ξ, ψ, γκ, μπ, ντ. Otherwise they can drop it (τον/το, την/τη). In practice: always include the ν in stored forms; it's never wrong, and the dropped version is informal.

### Modelling implications
- **Store the article with the nominal form**: "τον φίλο" not just "φίλο".
- **Articles are computable**: from gender + case + number, the article is deterministic. Store it for convenience, but it's derivable.
- **The indefinite article (ένας/μία/ένα) is lower priority**: it's less frequent in production and only has singular forms.
