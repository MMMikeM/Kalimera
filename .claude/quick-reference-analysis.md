# Quick Reference Page Analysis

Collected feedback from curriculum-analyst and ui-designer agents.

## Tab 1: Cases & Pronouns

### HIGH Priority

| Issue | Agent | Recommendation |
|-------|-------|----------------|
| **New colors unused** | UI | `navy`, `santorini`, `slate` not used anywhere - apply navy to headings, santorini for interactive elements |
| **Decision guide buried** | Curriculum | Best content ("Which me/you do I use?") requires scrolling - consider moving up |
| **No case-pronoun connection** | Curriculum | Learners don't see that Object Pronouns = Accusative, Possessive = Genitive |
| **Four equal-weight pronoun cards** | Curriculum | Object/Possessive are high-frequency; Subject/Emphatic are "nice to know" - visual weight should differ |
| **Quick Test pattern underused** | Curriculum | The decision tree is excellent pedagogy - replicate for Cases and other sections |

### MEDIUM Priority

| Issue | Agent | Recommendation |
|-------|-------|----------------|
| **Cases section too abstract** | Curriculum | Three Questions is good but spot-check patterns are hidden by default |
| **Missing 3rd-n in possessive table** | Curriculum | Neuter uses same forms as masculine - add note or row |
| **Greek text not 1.1x in highlighted variant** | UI | `MonoText variant="highlighted"` doesn't apply `greek-text` class |
| **Table headers need styling** | UI | Use `text-navy-text` for "Singular/Plural" headers |
| **Vocative case missing** | Curriculum | Fourth case not mentioned in Three Questions |

### LOW Priority

| Issue | Agent | Recommendation |
|-------|-------|----------------|
| **Common mistakes not displayed** | Curriculum | `COMMON_MISTAKES` data exists but isn't rendered |
| **`PRONOUN_PHRASES` not used** | Curriculum | High-frequency phrases like "πες μου" aren't shown |
| **Collapsible needs focus state** | UI | Add `focus-visible:ring-2` for accessibility |

### Key Files
- `/src/routes/quick-reference/cases-section.tsx`
- `/src/routes/quick-reference/pronouns-section.tsx`
- `/src/constants/recognition.ts`
- `/src/constants/pronouns.ts`

---

## Tab 2: Nouns & Articles

### HIGH Priority

| Issue | Agent | Recommendation |
|-------|-------|----------------|
| **Nested tabs confusing** | UI | Gender sub-tabs not obviously clickable - color-code them or flatten structure |
| **Paradigm density overwhelming** | Curriculum | 4 paradigms x 8 rows = 32 rows visible at once. Show 1 at a time with navigation |
| **Red/green accessibility** | UI | Common Mistakes relies on color alone - add text labels ("Wrong:", "Correct:") |
| **Table columns redundant** | Curriculum | "Article" column redundant since "Example" already shows it |
| **The -ν Rule too detailed** | Curriculum | Lead with "when uncertain, use -v form" then expand for details |

### MEDIUM Priority

| Issue | Agent | Recommendation |
|-------|-------|----------------|
| **Common Mistakes should be collapsible** | Curriculum | Default closed - it's remedial content |
| **Greek not first in table columns** | UI | Reorder: Example before Article/Ending |
| **Article lookup hidden** | UI | Consider expanded by default - it's the most useful content |
| **Missing cross-gender comparison** | Curriculum | Show what's SAME across genders (e.g., genitive plural = των) |
| **Vocative changes easy to miss** | UI | Only shown for masculine, buried at bottom |

### LOW Priority

| Issue | Agent | Recommendation |
|-------|-------|----------------|
| **Data duplication** | Curriculum | `nouns.ts` duplicates `agreement.ts` - consolidate |
| **Vocative rows add noise** | Curriculum | Make collapsible - beginners rarely need it |
| **Gender hints card dense** | UI | Use multi-line layout for better scanning |
| **Tight paradigm spacing** | UI | Increase gap from 4 to 6 |

### Key Files
- `/src/routes/quick-reference/agreement-section.tsx`
- `/src/constants/agreement.ts`
- `/src/constants/nouns.ts`
- `/src/constants/articles.ts`

---

## Tab 3: Prepositions

### HIGH Priority

| Issue | Agent | Recommendation |
|-------|-------|----------------|
| **Key insight too abstract** | Curriculum | "All prepositions take accusative" doesn't explain the practical consequence. Expand with example: "Use τον/την/το after prepositions, not ο/η/το" |
| **σε Contraction lacks WHY** | Curriculum | Shows formula but not why it matters. Add: "These contractions are mandatory in speech" |
| **Color legend buried** | Both | Olive=σε/blue=από explanation appears AFTER content. Move before compound pairs |
| **Greek text not using `greek-text` class** | UI | MonoText used but without `variant="greek"` - Greek renders same size as English |
| **New palette colors unused** | UI | Only olive/aegean used. Apply navy to section headings, santorini for interactive elements |

### MEDIUM Priority

| Issue | Agent | Recommendation |
|-------|-------|----------------|
| **Compound pair data bug** | Curriculum | `COMPOUND_PREPOSITION_PAIRS` Position category: both sides use `από` (μπροστά από / πίσω από). Should be σε vs από contrast |
| **MonoText variant mismatch** | UI | Left uses `variant="success"` (green), right uses `variant="primary"` (terracotta). Should match stated olive/blue colors |
| **No quick test pattern** | Curriculum | Cases tab has "Quick Spot-Check" - Prepositions lacks self-testing. Add fill-in-the-blank exercises |
| **Common Patterns lacks context** | Curriculum | "για μένα = for me" doesn't show when you'd say this. Add situational hints |
| **"σε Contraction" card styling** | UI | Consider using `situation-olive` helper class for consistency |

### LOW Priority

| Issue | Agent | Recommendation |
|-------|-------|----------------|
| **Missing prepositions** | Curriculum | `ως` (as/until formal) and `κατά` (against/during) not included |
| **Plural contractions missing** | Curriculum | Only singular στο/στη/στον shown. Add στα/στις/στους |
| **Icons use raw `text-olive`** | UI | Fails WCAG AA. Change to `text-olive-text` |
| **Time expressions no stress marks** | Curriculum | Consider adding pronunciation hints |

### Key Files
- `/src/routes/quick-reference/prepositions-section.tsx`
- `/src/constants/articles.ts` (contains preposition data)

---

## Tab 4: Verbs

### HIGH Priority

| Issue | Agent | Recommendation |
|-------|-------|----------------|
| **Irregular verbs buried at bottom** | Curriculum | είμαι (to be) is most common verb but appears last. Move irregulars up or add "Essential First: είμαι" callout at top |
| **No mention of negation** | Curriculum | Examples show "Δεν μιλάμε" but negation never explained. Add: "Negation: Add δεν before the verb" |
| **Missing tenses** | Curriculum | Only present tense shown. Data for past/future exists unused. Add note or collapsed section |
| **Greek text not using MonoText consistently** | UI | "Which Pattern?" flow diagram uses raw `<span className="font-mono">` instead of MonoText component |
| **"Learn First" badge contrast** | UI | `bg-aegean text-white` may not achieve AAA contrast. Use `bg-aegean-light text-aegean-text` |
| **New palette colors unused** | UI | navy, santorini, slate not utilized anywhere |

### MEDIUM Priority

| Issue | Agent | Recommendation |
|-------|-------|----------------|
| **Deponent mixes two sub-patterns** | Curriculum | έρχομαι uses -ομαι endings, θυμάμαι uses -άμαι. These are different conjugation classes shown as one |
| **"Same pattern" includes irregular** | Curriculum | μπορώ listed as "same pattern" as active but has stress shift - remove or note exception |
| **ParadigmTable person hints low contrast** | UI | `text-stone-300` for I/we, you/you hints is nearly invisible. Use `text-stone-500` |
| **"In context:" examples lack visual separation** | UI | Uses `bg-white` inside cards with white tables. Use `bg-stone-50` for differentiation |
| **Ending badges too small** | UI | `-εις`, `-άς` badges use `text-xs` - too small for Greek. Increase to `text-sm` |

### LOW Priority

| Issue | Agent | Recommendation |
|-------|-------|----------------|
| **Contracted pattern shows only -άω variant** | Curriculum | The -ώ contraction (μιλώ vs μιλάω) mentioned in header but not in table |
| **No audio/pronunciation guidance** | Curriculum | Verb endings create stress patterns easier to hear than read |
| **"Memorize through exposure" unclear** | Curriculum | Change to: "You'll learn these naturally through frequent exposure in conversations" |
| **Pattern card icons lack semantic meaning** | UI | Zap/Sparkles/RefreshCw are decorative. Consider semantically meaningful icons |

### Key Files
- `/src/routes/quick-reference/verbs-section.tsx`
- `/src/constants/verbs.ts`
- `/src/components/ParadigmTable.tsx`

---

## Cross-Cutting Themes

### Color Palette Usage
- New colors (`navy`, `santorini`, `slate`) are defined but unused across all tabs
- Apply consistently:
  - `navy-text` for section headings
  - `santorini` for interactive elements (collapsibles, links)
  - `slate-text` for secondary descriptions (instead of `text-stone-600`)

### Quick Test Pattern
- The decision tree in "Which me/you do I use?" is excellent pedagogy
- Should be replicated across all tabs for key decision points

### Greek Text Scaling
- `MonoText variant="highlighted"` doesn't apply `greek-text` class (1.1x scale)
- Need to fix in component or apply class explicitly
