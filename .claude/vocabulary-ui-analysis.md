# Vocabulary Page UI/UX Analysis

A comprehensive design review of the Vocabulary page across all four tabs, evaluated against the design guidelines in `docs/design-guidelines.md` and the UI designer agent principles.

---

## Executive Summary

The Vocabulary page is **well-structured and visually cohesive**, with good use of the Mediterranean color palette and consistent component patterns. However, there are opportunities to improve:

1. **Greek text prominence** - Some sections don't emphasize Greek enough
2. **Pattern revelation** - Verb groupings could better show conjugation patterns
3. **Component reuse** - Several patterns could leverage Quick Reference components
4. **Density balance** - Some sections are dense while others are sparse
5. **Semantic color consistency** - Color usage is sometimes arbitrary rather than meaningful

**Priority Issues:**
- HIGH: Verbs tab lacks paradigm structure
- MEDIUM: Inconsistent MonoText variant usage
- MEDIUM: Missing KeyInsight components for important patterns
- LOW: Color scheme assignments could be more semantic

---

## Tab 1: Nouns

### Strengths

1. **Clear categorical organization** - Family & People, Shopping, Household, etc.
2. **Color-coded sections** - Each category has a distinct visual identity
3. **Greek-first layout** - Greek text appears before English translation
4. **Article inclusion** - Shows gender through articles (η/ο/το)

### Issues

#### Issue 1: Article Redundancy and Greek Prominence (Medium)

**Location:** `VocabItem` component (lines 199-208)

The articles (η, ο, το) are valuable for learning gender, but they're displayed inline without visual distinction. The Greek text uses `MonoText` with `variant="highlighted"` only for some items.

**Current:**
```
η αδελφή sister
ο άντρας man/husband
```

**Recommendation:** Create visual grouping by gender using subtle left borders (following the gender color pattern from design guidelines):

```tsx
// Group nouns by gender for visual pattern learning
<div className="gender-feminine border-l-4 pl-3">
  <MonoText variant="greek" size="lg">αδελφή</MonoText>
  <span className="text-stone-500 text-sm ml-2">η</span>
  <span className="text-stone-600 ml-3">sister</span>
</div>
```

This reveals the gender pattern visually while keeping Greek prominent.

#### Issue 2: Inconsistent `highlighted` Variant Usage (Low)

**Location:** Lines 247-248 vs 254-255

Only "Family & People" uses `variant="highlighted"` while other sections use default. This creates visual inconsistency.

**Recommendation:** Apply `variant="highlighted"` consistently to the primary Greek word across all noun sections, or use `variant="greek"` (which has proper 1.1x scaling) everywhere.

#### Issue 3: Missing Structure for Related Terms (Low)

The "Family & People" section could show relationships (e.g., η μητέρα/ο πατέρας as a pair, η αδελφή/ο αδελφός as a pair).

**Recommendation:** Consider a paradigm-style layout for paired terms:

```
Feminine          Masculine
η μητέρα (mother) ο πατέρας (father)
η αδελφή (sister) ο αδελφός (brother)
η φίλη (friend-f) ο φίλος (friend-m)
```

---

## Tab 2: Verbs

### Strengths

1. **Pattern-based grouping** - Verbs organized by conjugation family (-ω, -άω/-ώ, etc.)
2. **Helpful alert** - "Learn one pattern and you can conjugate all verbs in that group"
3. **Verb count display** - Shows quantity per pattern

### Issues

#### Issue 1: Missing Paradigm Tables for Patterns (HIGH)

**Location:** `VerbsTab` component (lines 289-345)

This is the most significant opportunity for improvement. The design guidelines state: "Show Structure, Not Flat Lists." Currently, verbs are displayed as flat grids within each conjugation group, missing the opportunity to show the actual conjugation patterns.

**Current layout:**
```
-ω (49 verbs)
┌────────────────────┐ ┌────────────────────┐
│ κάνω  I do/make   │ │ έχω   I have       │
└────────────────────┘ └────────────────────┘
```

**Recommended structure:**

For each verb pattern, show a sample conjugation paradigm:

```tsx
// Pattern exemplar with paradigm table
<Card variant="bordered" padding="lg" className={`${c.bg} ${c.border}`}>
  <h3 className={`text-lg font-bold ${c.text}`}>Type A: -ω verbs</h3>
  <p className="text-sm text-stone-600">49 verbs following this pattern</p>

  <KeyInsight title="Pattern: κάνω (to do/make)">
    <ParadigmTable
      columns={[
        { header: "Singular", key: "singular" },
        { header: "Plural", key: "plural" }
      ]}
      rows={[
        { label: "1st", singular: "κάνω", plural: "κάνουμε" },
        { label: "2nd", singular: "κάνεις", plural: "κάνετε" },
        { label: "3rd", singular: "κάνει", plural: "κάνουν" }
      ]}
    />
  </KeyInsight>

  <CollapsibleSection title="All -ω verbs" colorScheme="aegean" defaultOpen={false}>
    {/* Grid of verbs */}
  </CollapsibleSection>
</Card>
```

#### Issue 2: Color Assignment is Arbitrary (Medium)

**Location:** `getPatternColor` function (lines 280-286)

The color mapping seems arbitrary rather than semantic:
- Type A/regular: aegean
- Type B/contract: terracotta
- Irregular: honey

**Recommendation:** Document the rationale or apply a more meaningful mapping. Per the design guidelines, verb colors should be:
- Active (-ω): Aegean (standard, calm)
- Contracted (-άω): Terracotta (variation)
- Deponent (-μαι): Olive (passive-looking)

#### Issue 3: Transport Actions Section Feels Disconnected (Low)

**Location:** Lines 337-343

"Transport Actions" appears at the bottom as a separate section, but these are verbs and should integrate with the conjugation-based structure above.

**Recommendation:** Either:
1. Integrate transport verbs into their respective pattern groups, OR
2. Remove this section from Verbs tab (nouns already has Transportation)

---

## Tab 3: Phrases

### Strengths

1. **Three-color organization** - Terracotta (expressions), Aegean (patterns), Olive (conversational)
2. **Paradigm cards for grammatical patterns** - Likes construction, Name construction
3. **Pattern alerts** - Shows structural patterns like "[Person] αρέσει (one thing)"
4. **Comprehensive coverage** - From connectors to situational phrases

### Issues

#### Issue 1: Telling Time Section Lacks Visual Hierarchy (Medium)

**Location:** `TimeTellingSection` component (lines 348-414)

The time-telling section is comprehensive but feels dense. The category labels ("Basic Time Structure", "Minutes & Fractions", etc.) could use better visual separation.

**Current:** Flat grid within a card

**Recommendation:** Use `CollapsibleSection` components for sub-categories:

```tsx
<Card variant="bordered" padding="lg" className="bg-aegean/5 border-aegean/30">
  <SectionHeading title="Telling Time" subtitle="Τι ώρα είναι;" level="h3" />

  <KeyInsight title="Pattern: Είναι + time / Η ώρα είναι + time">
    When telling time, Greek uses "it is" (είναι) with the time expression.
  </KeyInsight>

  <CollapsibleSection title="Basic Structure" colorScheme="aegean" defaultOpen>
    {/* Basic time items */}
  </CollapsibleSection>

  <CollapsibleSection title="Minutes & Fractions" colorScheme="aegean">
    {/* Minutes items */}
  </CollapsibleSection>
</Card>
```

#### Issue 2: Likes Construction Could Show Pattern More Clearly (Medium)

**Location:** Lines 502-512

The Likes construction is well-documented with the pattern note, but the two-column layout (One thing vs Many things) could be enhanced with a QuickTest component to help learners practice the decision.

**Recommendation:** Add a QuickTest after the paradigm:

```tsx
<QuickTest
  title="αρέσει or αρέσουν?"
  colorScheme="aegean"
  options={[
    {
      answer: "αρέσει",
      condition: "One thing is liked",
      examples: [{ greek: "μου αρέσει ο καφές", english: "I like coffee" }]
    },
    {
      answer: "αρέσουν",
      condition: "Multiple things are liked",
      examples: [{ greek: "μου αρέσουν οι γάτες", english: "I like cats" }]
    }
  ]}
/>
```

#### Issue 3: Section Icons Could Be More Semantic (Low)

Several sections use `<MessageSquare />` as a generic icon. Consider more specific icons:
- Question Words: `<HelpCircle />`
- Opinions: `<Brain />` or `<Scale />`
- Common Responses: `<MessageCircle />`

---

## Tab 4: Reference

### Strengths

1. **Times of Day visual treatment** - Excellent card-based display with time ranges
2. **Numbers paradigm structure** - Clear Units/Teens/Tens grouping
3. **Accent warning** - "ποτέ = never, πότε = when" is valuable
4. **Direction adverbs organization** - Good for practical use

### Issues

#### Issue 1: Times of Day Cards Could Show Progression (Low)

**Location:** Lines 604-620

The current horizontal layout shows all 5 time periods equally, but there's a natural progression (morning -> midday -> afternoon -> evening -> night) that could be emphasized.

**Current:** Cards appear in seemingly random order (night, afternoon, evening, midday, morning based on screenshot)

**Recommendation:** Order cards chronologically:
```
morning (5:00-12:00) -> midday (12:00-15:00) -> afternoon (15:00-19:00) -> evening (19:00-24:00) -> night (24:00-5:00)
```

And consider a timeline-style visual:

```tsx
<div className="flex items-center justify-between">
  {orderedTimes.map((time, i) => (
    <div key={time.id} className="flex flex-col items-center">
      <TimeCard time={time} />
      {i < orderedTimes.length - 1 && (
        <div className="w-8 h-0.5 bg-honey/30 mt-2" />
      )}
    </div>
  ))}
</div>
```

#### Issue 2: Numbers Section Missing Ordinal Numbers (Medium)

The Numbers section covers cardinal numbers (1, 2, 3...) but doesn't include ordinals (1st, 2nd, 3rd...) which are essential for dates and rankings.

**Recommendation:** Add an ordinals sub-section if data is available:
```
πρώτος/η/ο (first), δεύτερος (second), τρίτος (third)...
```

#### Issue 3: Colors Section Is Basic (Low)

**Location:** Lines 681-685

Colors are displayed as a simple grid without any visual enhancement (like showing the actual color as a swatch).

**Recommendation:** Add color swatches:

```tsx
const colorSwatches: Record<string, string> = {
  "άσπρο": "bg-white border",
  "μαύρο": "bg-gray-900",
  "κόκκινο": "bg-red-500",
  // etc.
};

<div className="flex items-center gap-3">
  <div className={`w-6 h-6 rounded ${colorSwatches[item.greek] || ""}`} />
  <MonoText variant="greek">{item.greek}</MonoText>
  <span className="text-stone-600 text-sm">{item.english}</span>
</div>
```

#### Issue 4: Position Adverbs Missing Spatial Grouping (Medium)

**Location:** Lines 709-726

Position adverbs have natural opposites (left/right, up/down, in/out) that could be grouped for pattern learning.

**Current:** Flat grid

**Recommended:** Paired layout:

```
Opposites:
αριστερά (left)     ↔  δεξιά (right)
πάνω (up/over)      ↔  κάτω (down/under)
μέσα (inside)       ↔  έξω (outside)
μπροστά (in front)  ↔  πίσω (behind)

Locations:
εδώ (here)          ↔  εκεί (there)
κοντά (close/near)  ↔  μακριά (far)
```

---

## Cross-Cutting Issues

### Issue A: VocabSection Component Could Use CategoryCard

**Location:** Lines 211-240

The `VocabSection` component duplicates logic that exists in `CategoryCard`. Consider refactoring:

**Current:**
```tsx
const VocabSection: React.FC<{...}> = ({ title, icon, colorScheme, children }) => {
  // Custom color mapping logic
  // Custom layout
}
```

**Recommended:**
```tsx
import { CategoryCard } from "@/components";

const VocabSection = ({ title, icon, colorScheme, children, columns = 3 }) => (
  <CategoryCard
    title={title}
    colorScheme={colorScheme}
    icon={icon}
    priority="secondary"
  >
    <div className={`grid md:grid-cols-${columns} gap-3`}>
      {children}
    </div>
  </CategoryCard>
);
```

### Issue B: Missing SectionHeading Usage

**Location:** Page title (lines 740-743)

The page title uses raw h2/p tags instead of `SectionHeading`:

**Current:**
```tsx
<h2 className="text-2xl font-bold text-stone-800">Vocabulary</h2>
<p className="text-stone-600 mt-1">Essential Greek vocabulary...</p>
```

**Recommended:**
```tsx
<SectionHeading
  title="Vocabulary"
  subtitle="Essential Greek vocabulary organized by type"
  level="h2"
/>
```

### Issue C: MonoText Variant Inconsistency

The page uses multiple patterns for displaying Greek text:

1. `<MonoText variant="highlighted" size="lg">{verb.greek}</MonoText>` (Verbs)
2. `<MonoText variant="highlighted">{item.greek}</MonoText>` (Phrases)
3. `<MonoText>{number.greek}</MonoText>` (Numbers - no variant!)
4. `<MonoText variant="highlighted" size="lg" className="block mb-1">{time.greek}</MonoText>` (Times)

**Recommendation:** Standardize on:
- `variant="greek"` for inline Greek text (applies proper 1.1x scaling)
- `variant="highlighted"` only for interactive or emphasized items
- Always specify `size="md"` or `size="lg"` explicitly

---

## Accessibility Audit

### Passing

1. **Color not sole indicator** - All sections use icons and text labels alongside colors
2. **AAA-compliant text colors** - Uses `-text` variants correctly (e.g., `text-aegean-text`)
3. **Keyboard navigation** - Tabs are accessible via TabsList component
4. **Focus states** - Inherited from ShadCN components

### Concerns

1. **Alert roles** - Verify Alert components have appropriate ARIA roles
2. **Tab panel labeling** - Ensure TabContent is properly associated with TabTrigger
3. **Grid navigation** - Dense grids may benefit from roving tabindex for keyboard users

---

## Mobile Responsiveness

### Observed Behavior

From the screenshots, the layout adapts well:
- Tab triggers wrap appropriately
- Grids collapse from 3-column to 2-column to single column
- Cards maintain readability

### Recommendations

1. **Tab short labels** - Consider adding `shortLabel` like Quick Reference does (lines 77-78 of quick-reference/index.tsx)
2. **Touch targets** - Ensure vocabulary items have adequate spacing for touch
3. **Horizontal scrolling** - For paradigm tables on mobile, consider horizontal scroll containers

---

## Summary of Recommendations by Priority

### High Priority

1. **Add paradigm tables to Verbs tab** showing sample conjugations for each pattern
2. **Use CollapsibleSection** for long verb lists (default closed)

### Medium Priority

3. **Standardize MonoText variant usage** across all tabs
4. **Refactor VocabSection to use CategoryCard** for consistency
5. **Add QuickTest components** for pattern practice (Likes construction, time telling)
6. **Group position adverbs by opposites** to reveal patterns
7. **Order Times of Day chronologically**

### Low Priority

8. **Add color swatches** to Colors section
9. **Use SectionHeading component** for page title
10. **Add ordinal numbers** to Numbers section
11. **Update section icons** to be more semantically meaningful
12. **Consider gender grouping** for nouns with visual left borders

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/routes/vocabulary.tsx` | Primary refactoring - all recommendations |
| `src/components/VocabSection.tsx` | Extract and refactor (optional) |

## Components to Reuse

From Quick Reference:
- `SectionHeading` - Page title, section headers
- `KeyInsight` - Pattern explanations for verbs, likes construction
- `CollapsibleSection` - Long verb lists, time-telling categories
- `QuickTest` - Decision practice for likes (αρέσει/αρέσουν)
- `CategoryCard` - Refactor VocabSection

From existing components:
- `ParadigmTable` - Verb conjugation samples (if exists, otherwise create)

---

## Code Snippets for Key Recommendations

### Verb Paradigm Display

```tsx
const VerbPatternCard: React.FC<{
  pattern: string;
  verbs: Array<{ id: number; greek: string; english: string }>;
  exemplar?: { infinitive: string; conjugations: Record<string, string> };
}> = ({ pattern, verbs, exemplar }) => {
  const colorScheme = getPatternColor(pattern);

  return (
    <CategoryCard
      title={pattern}
      subtitle={`${verbs.length} verbs`}
      colorScheme={colorScheme}
      priority="secondary"
    >
      {exemplar && (
        <KeyInsight title={`Pattern: ${exemplar.infinitive}`}>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <h5 className="font-medium text-sm mb-1">Singular</h5>
              <div className="space-y-1">
                <div><MonoText variant="greek">{exemplar.conjugations["1s"]}</MonoText> I</div>
                <div><MonoText variant="greek">{exemplar.conjugations["2s"]}</MonoText> you</div>
                <div><MonoText variant="greek">{exemplar.conjugations["3s"]}</MonoText> he/she</div>
              </div>
            </div>
            <div>
              <h5 className="font-medium text-sm mb-1">Plural</h5>
              <div className="space-y-1">
                <div><MonoText variant="greek">{exemplar.conjugations["1p"]}</MonoText> we</div>
                <div><MonoText variant="greek">{exemplar.conjugations["2p"]}</MonoText> you</div>
                <div><MonoText variant="greek">{exemplar.conjugations["3p"]}</MonoText> they</div>
              </div>
            </div>
          </div>
        </KeyInsight>
      )}

      <CollapsibleSection
        title={`All ${pattern} verbs`}
        colorScheme={colorScheme}
        defaultOpen={verbs.length < 10}
      >
        <div className="grid md:grid-cols-2 gap-3 mt-3">
          {verbs.map((verb) => (
            <VocabItem key={verb.id} greek={verb.greek} english={verb.english} />
          ))}
        </div>
      </CollapsibleSection>
    </CategoryCard>
  );
};
```

### Standardized VocabItem

```tsx
const VocabItem: React.FC<{
  greek: string;
  english: string;
  size?: "sm" | "md" | "lg";
}> = ({ greek, english, size = "md" }) => (
  <div className="flex items-baseline gap-2">
    <MonoText variant="greek" size={size}>{greek}</MonoText>
    <span className="text-stone-600 text-sm">{english}</span>
  </div>
);
```

---

*Analysis completed: December 7, 2025*
