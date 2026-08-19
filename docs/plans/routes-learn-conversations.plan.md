# Plan: `src/routes/learn/conversations` Alignment & Polish

Audit feedback and implementation plan for `src/routes/learn/conversations/` (`index.tsx`, `$tab.tsx`, `content.llm`, `tabs/*`, `components/*`).

---

## 1. LLM Context Files

### Issues
- **`src/routes/learn/conversations/content.llm`:**
  - Lines 15 & 328 claim dialogues are hardcoded in `$tab.tsx` rather than modularised in `tabs/arriving.tsx`, `tabs/food.tsx`, `tabs/requests.tsx`, `tabs/smalltalk.tsx`.
  - Lines 21–23 document modes as `"Study mode"` and `"Speak mode"`, whereas the implementation uses `"read"` and `"roleplay"`.
  - Line 28 omits the `"shopkeeper"` speaker role.
  - Context documentation omits the component layer in `conversation-shell.tsx`.

### Actions
- [x] Update `content.llm` to reflect the `tabs/*.tsx` file structure and TanStack Start route params (`$tab`). Added a File Structure block; corrected the Data Source claim and the "Adding New Tabs" steps 2–4. Step 1 (`VALID_TABS` in `$tab.tsx`) was already correct and kept.
- [x] Update mode documentation to `read` and `roleplay`. Documented as value + UI label pairs (`read` = "Study", `roleplay` = "Speak") — the toggle really does render "Study"/"Speak", so a straight rename would have made the doc wrong.
- [x] Add `"shopkeeper"` to the documented speaker roles. Added to both the `DialogueLine` interface block and the Speaker Role Conventions table, with a pointer to `SpeakerRole` in `src/components/SpeakerBadge.tsx`.
- [x] Document `ConversationProvider`, `ScenarioCard`, and `LearningTips`. New "Component Layer" section.

---

## 2. Design Guidelines & Contrast

### Issues
- **Palette Token Violations:**
  - `components/conversation-shell.tsx:79`: Uses non-standard `border-amber-200` (should use `border-honey-200` or `border-honey-300`).
  - `components/conversation-shell.tsx:83, 89`: Uses raw Tailwind `text-red-600` and `text-green-600` instead of semantic feedback tokens `text-incorrect` and `text-correct`.
- **Reinvented UI Components:**
  - `components/conversation-shell.tsx:44-101`: Builds a custom collapsible container and mistake comparison instead of reusing `<CollapsibleSection>` and `<MistakeComparison>`.
- **Monospace vs Sans for Greek Dialogue:**
  - `components/conversation-shell.tsx:84, 90`: Uses `<MonoText>` for full conversational mistake strings. Should use `font-sans` with `.greek-text`.
- **Tab Color Discrepancy in `$tab.tsx:21-41`:**
  - `CONVERSATION_TABS` color tokens mismatch tab heroes:
    - `arriving`: tab sets `ocean`, hero uses `olive`.
    - `food`: tab sets `olive`, hero uses `terracotta`.
    - `smalltalk`: tab sets `honey`, hero uses `ocean`.
    - `requests`: tab sets `terracotta`, hero uses `honey`.

### Actions
- [x] Replace `border-amber-200` with `border-honey-200`. Done as part of the `LearningTips` refactor — the divider above the mistake block is now `border-honey-200`.
- [x] Replace `text-red-600` / `text-green-600` with `text-incorrect` / `text-correct`. Resolved by the `MistakeComparison` adoption — that shared component already ships `text-incorrect` / `text-correct`; the hand-rolled ✗/✓ spans are gone.
- [x] Refactor `LearningTips` to compose `<CollapsibleSection>` and `<MistakeComparison>`. `LearningTips` is now `<CollapsibleSection title="Learning Tips" colorScheme="honey" defaultOpen>`; the `commonMistake` prop shape (`wrong`/`right`) is mapped to `MistakeComparison`'s `wrong`/`correct` internally so the four tabs are untouched. `MistakeComparison` is given `title=""` and the local `<h4>` heading is kept, so "Common Mistake" stays a peer of the "Patterns"/"Cultural Tips" headings instead of being promoted to its `h3 text-lg font-bold`. Note: the inner panel is now `CollapsibleSection`'s cream content surface rather than the honey-100 panel — an intended visual change.
- [x] Align `CONVERSATION_TABS` colors in `$tab.tsx` to match the tab hero color themes. arriving→olive, food→terracotta, smalltalk→ocean, requests→honey.

**Note on the mono-vs-sans issue (§2 issue list):** no action checkbox exists for it, and it conflicts with the prescribed `MistakeComparison` adoption — that shared, read-only component uses `MonoText` internally. The premise is also overstated: the strings are short phrases (`Αντίο`, `Χόρτασα`, `Πώς σε λένε;`), not full conversational sentences. Resolved in favour of the `MistakeComparison` action; no change invented.

---

## 3. Tailwind & Component Architecture

### Issues
- **Context Prop Drilling:**
  - `ScenarioCard` requires `mode: ConversationMode` as a prop, causing all 4 tabs to pass `mode={mode}` 18 times despite `useConversationContext` being available.

### Actions
- [x] Update `ScenarioCard` to read `mode` from `useConversationContext()` internally when not explicitly provided as an override prop. `mode` is now optional (`mode ?? contextMode`); all 18 `mode={mode}` props and the four now-redundant `useConversationContext()` calls/imports removed from the tabs.
- [x] Refactor `ConversationModeToggle` and `ScenarioCard` states using `tv()`. **`ScenarioCard`: not applicable (already correct)** — it renders a single static `<Card variant="bordered" padding="lg" className="border-stone-200">` with no variant states; `tv()` would be pure indirection. **`ConversationModeToggle`: out of scope** — it lives in `src/components/` (shared, read-only for this plan); the exact `tv()` diff is reported to the orchestrator instead.
