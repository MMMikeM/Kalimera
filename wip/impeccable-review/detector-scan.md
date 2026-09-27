# Deterministic anti-pattern scan

This replaces Impeccable's detector (Assessment B of `/impeccable critique`) for this run. The real detector ships as a native binary that could not be run in the cloud session, so a separate read-only agent grepped the in-scope files against the rules below. It had not seen the design review, which keeps the two assessments independent.

**Scope:** `src/routes/index.tsx`, `try.tsx`, `practice/components/engines/{shells.tsx,drill.tsx,drill-hooks.ts}`, `reference/tabs/cases.tsx`, `reference/components/cases-section.tsx`, `components/ReferenceHero.tsx`, `learn/essentials/index.tsx`, `__root.tsx`, plus each file's imports one level deep. No files were changed.

When the local detector is available, re-run the real thing and compare. See `impeccable-upgrade.md`; the v4 command is `impeccable detect <path>`.

## Counts (real hits)

| Rule                                        | Hits                 |
| ------------------------------------------- | -------------------- |
| R1 side-stripe borders                      | 0                    |
| R2 gradient text                            | 0                    |
| R3 decorative glassmorphism                 | 2 (+1 borderline)    |
| R4 em dashes in copy                        | 7                    |
| R5 raw / non-token colours                  | 1 (+9 minor)         |
| R6 opacity on `-text` tokens                | 0 direct, 1 indirect |
| R7 low-contrast informative text            | 9                    |
| R8 tiny text on controls                    | 4 (+2 minor)         |
| R9 touch targets under 44px                 | 8                    |
| R10 `font-mono` in learner-facing text      | 5                    |
| R11 identical card grids                    | 2                    |
| R12 case colour on a whole phrase           | 7 phrases            |
| R13 global keydown with no target check     | 2                    |
| R14 debug / internal strings shown to users | 6                    |
| R15 emoji or exclamation marks in UI copy   | 8                    |

## R3 Glassmorphism

- `src/components/ui/button.tsx:10`: `secondary` variant `bg-card/80 … backdrop-blur-sm`. Decorative.
- `button.tsx:13`: `ghost` variant `backdrop-blur-sm`. Decorative.
- Borderline: `MobileNav.tsx:17`, `bg-cream/95 … backdrop-blur-sm`. A fixed bar over scrolling content, so it is partly functional.
- Related, outside the rule: SaaS-style gradients at `LapsedUserCta.tsx:44` (`bg-linear-to-br from-ocean-50 to-ocean-100`) and `RustyDrillsCta.tsx:28` (honey).

## R4 Em dashes in learner-facing copy

- `learn/essentials/index.tsx:81`: "position words — the building blocks"
- `reference/tabs/cases.tsx:11`: "in a sentence — who's doing it"
- `reference/components/cases-section.tsx:20`: "the dog bit the man — the -ς"
- `cases-section.tsx:58`: "identify rather than act — η Χρυσάνθη"
- `src/constants/recognition.ts:27`: "who's doing the action — or what's being named after είναι". This appears on the Doer card.
- `src/components/FreezeIndicator.tsx:77`: "ready — miss a day"
- `practice/components/engines/shells.tsx:448`: "These caught you — that's where lasting learning happens."
- Not hits: `shells.tsx:461`, where a lone "—" marks an empty answer, and code comments.

## R5 Raw colours

- `shells.tsx:267`: `bg-amber-100 … text-amber-600`, Tailwind default palette rather than a project token.
- Minor: `text-white` where the palette uses `text-cream`, at:
  - `__root.tsx:148`
  - `button.tsx:8` and `:30`
  - `FirstTimeUserCta.tsx:14`
  - `LapsedUserCta.tsx:51`
  - `RustyDrillsCta.tsx:33`
  - `WeekStreak.tsx:29` and `:33`
  - `DrillDemo.tsx:121`
- Not a hit: `__root.tsx:32` `#4A7C8F`, the `theme-color` meta tag, which needs a literal value.

## R6 Opacity on `-text` tokens

- Indirect: `shells.tsx:32`. `SelectorButton` has `disabled:opacity-40` and takes a `selectedText` `-text` token. The reverse drills keep the chosen button selected and disabled during feedback (`reverse/multi-select.tsx:115-120`, `reverse/single-select.tsx:266-269`), so a `-text` token renders at 40% opacity.

## R7 Low-contrast informative text (stone-300 / stone-400 on cream)

- `try.tsx:52`: keyboard instructions
- `DrillDemo.tsx:145`: "Type with English letters"
- `Header.tsx:82`: "Loading..."
- `WeekStreak.tsx:43`: day labels
- `shells.tsx:89`: "← back" link
- `shells.tsx:252`: drill exit "←" (stone-300)
- `shells.tsx:255`: question counter
- `shells.tsx:311`: placeholder "greeklish..." (stone-300)
- `shells.tsx:313`: "enter to check"

## R8 Tiny text on controls

- `shells.tsx:89` (back), `:98` (reference link), `:252` (exit arrow), `:488` (back), all `text-xs`.
- Minor: `shells.tsx:153` and `:165` (`text-xs` descriptions inside the mode buttons); `MobileNav.tsx:31` (`text-xs` labels, though the targets themselves are big enough).

## R9 Touch targets under 44px

- `text-xs` with no padding: `shells.tsx:87-92`, `:95-101`, `:252` (a lone "←" with no `aria-label`), `:488`.
- `text-sm` with no padding: `try.tsx:108-113` ("Sign in"), `try.tsx:119-125`, `learn/essentials/index.tsx:67-73` (back to "Learn").
- `MobileHeader.tsx:102-107`: "Sign In" with `py-1.5`, about 32px tall.

## R10 `font-mono` in learner-facing text

- `DrillDemo.tsx:79`: the demo input, which also renders καλημέρα.
- `DrillDemo.tsx:140` and `:142`: the second is raw Greek outside `<GreekText>`, so it has no `lang="el"`.
- `shells.tsx:460`: "you typed" answer.
- `shells.tsx:263` and `:267`: the bucket and remediation debug chips (see R14).

## R11 Identical card grids

- `LandingPage.tsx:94-107`: FEATURES mapped into three cards, each an icon circle, heading and description.
- `learn/essentials/index.tsx:85-111`: TOOLKIT_SECTIONS mapped into cards, each an icon tile, heading and description.
- Borderline, not counted:
  - `cases-section.tsx:75-94`: no icon, and each card carries different content.
  - `cases-section.tsx:203-223`: three NextStepCards, not built with `.map()`.

## R12 Case colour applied to a whole phrase

**`cases-section.tsx:87`**: `role.example` coloured with the case's `style.text`.

- "ο καφές είναι ζεστός" (Doer): είναι carries no case.
- "θέλω τον καφέ" (Target): θέλω is not accusative.
- "η μυρωδιά του καφέ" (Owner): η μυρωδιά is nominative. Only του καφέ is genitive.

**`cases-section.tsx:176-182`**: trigger examples coloured with the case's `style.text`.

- "πηγαίνω στο σπίτι" (Target): πηγαίνω is not accusative.
- "με τον φίλο", "από το σπίτι" (Target): με and από are prepositions with no case.
- "το σπίτι μου" (Owner): το σπίτι is not genitive. Only μου is.
- "η αδερφή της" (Owner): η αδερφή is nominative. Only της is genitive.
- Correct as coloured: τη Δευτέρα, το πρωί, της Μαρίας, του Νίκου.

**Related:** `drill.tsx:71-77` (`themeFor`) applies case-role tokens to the drill progress bar and the Speed / Filter selector buttons (`shells.tsx:114-131`, `:199-207`). Those buttons are chrome with no Greek in them.

## R13 Global keydown handlers (verified in a browser)

- `drill.tsx:175-185`: during feedback, Enter or Space calls `advance()` and `preventDefault()` with no `e.target` check. Typing a space in the header search advances the drill and swallows the keystroke.
- `drill-hooks.ts:76-82` (`useForwardKeyboard`): Enter submits the answer with no target check, so Enter in the search box submits a blank drill answer. It also runs alongside the form's own `onSubmit` (`shells.tsx:292-296`). That duplicate is harmless because of the phase check at `drill.tsx:190`.

## R14 Debug or internal strings shown to users

- `__root.tsx:61`: `notFoundComponent: () => <p>notfound</p>`
- `__root.tsx:134` and `:143-145`: raw `error.message` in a `<pre>`. For Drizzle this is the SQL (see the comment at `:135`).
- `__root.tsx:136` and `:142`: raw `error.cause.message`.
- `shells.tsx:263-265`: `currentForm.bucket` chip.
- `shells.tsx:266-270`: "remediation ×{remCount}".
- Potential: `drill.tsx:324` falls back to the raw `drillId` as the visible title (rendered at `:259-261`).

## R15 Emoji or exclamation marks in functional UI copy

- `try.tsx:69`, `:72`, `:76`: 🎉 💪 🌱, rendered at `text-5xl` (`:86`).
- `try.tsx:69`, `:73`, `:77`: "Excellent!", "Good effort!", "Great start!". "Great start!" is shown for scores under 50%.
- `index.tsx:89`: "Day 1! Practice for 7 days…"
- `FreezeIndicator.tsx:107`: "Streak protected!"
- `LapsedUserCta.tsx:22` and `:35`: "Welcome back!"
- Probably fine, as authentic Greek punctuation: `AllCaughtUpCta.tsx:12` "Μπράβο!" and `FirstTimeUserCta.tsx:9` "Καλώς ήρθες!".

## Outside the rules

- `try.tsx:53-56` tells users "Space to start each question", but the drill auto-focuses the input and has no Space-to-start step.
