# UI polish backlog

Open items left from the August route-audit plans and the September design review, checked against the code on 27 Sep 2026. Everything that has since been fixed is gone from this list; git history has the old plans.

## Colour and contrast

- `text-stone-400` carries informative text in 25 files (about 2.4:1 on cream, under AA). The worst cluster is `reference/components/prepositions-section.tsx` (eight uses) and `learn/phrases/components/time-telling-section.tsx`.
- `reference/components/verbs-section.tsx:793`: an arrow in `text-honey-300`.
- `learn/phrases/components/shared.tsx:40`: maps colour schemes to `text-*-800` steps instead of the `-text` tokens.
- `routes/components/RustyDrillsCta.tsx:33` and `routes/components/WeekStreak.tsx:29-35`: white text on mid-tone fills (`bg-honey-400`, `bg-olive-400`, `bg-terracotta`). Check each against AA.
- `practice/pronouns/possessives.tsx:148`: passes `text-olive-700`, a base accent as text, for the person facet.
- `practice/review.tsx:63`: "Μπράβο!" in `text-olive`, which is both a base accent on text and the kind of praise PRODUCT.md avoids. `rustBarColor` (`:24`) is a colour ternary that could be a lookup.

## Consistency

- `MobileNav` renders on `/login` and `/register` (`__root.tsx:134`); the header doesn't.
- `WeekStreak` builds its class string with `+=`, and today's cell pulses (`animate-pulse`). The visual-memory-design profile argues against a looping pulse.
- `SectionHeading` (navy, bold) is still used in five places beside `BandHeading` and `PageHeading`. Retire it or say when each applies.
- Page titles are still hand-rolled on `/progress`, sign-in and register, and the noun subject pages; `PageHeading` covers the rest.
- `TeachingCard` eyebrows ("Vocabulary", "Endings" and similar) are the last small-caps labels above headings. Keep the ones that carry a sequence ("Rule 1", "Rule 2").
- `learn/essentials/$subtab.tsx:35`: a `colors` key where everything else says `colours`.

## Drills

- `practice/cases/nominative/noun.tsx`: `matchPhonetic` accepts the noun without its article, so the gender drill passes "spiti". The matcher needs an article-required mode; the Greek stays as it is.
- `practice/verbs/future/formation.tsx:330`: the subtitle says "40 rules"; derive the count from the items.
- Most verb drills have no `content.llm`.

## Waiting on a product decision

- Streak copy with exclamation marks and loss framing: "Day 1! Practice for 7 days to earn a streak freeze." (`routes/index.tsx:89`) and "Streak protected! Freeze saved your streak." (`components/FreezeIndicator.tsx:107`). PRODUCT.md allows in-app streaks but bans exclamation marks in feedback.
- The dashboard week grid is mocked from the streak length (TODO in `src/server/fns/dashboard.ts`).
- The push-notification tables are still defined in `src/server/db/schema-auth.ts`. Dropping them means a `pnpm db:push` against production.
- `/support`: the Ko-fi link is a placeholder (`https://ko-fi.com/`), and the page still uses icon-in-circle cards. The landing page doesn't link to it until it's real.

## Data and tooling

- Lesson tags stop at 2024-12-02 (`LESSON_TAGS` in `src/scripts/seed-data/tags.ts`), and `seed-pipeline.ts` silently skips a tag it can't find, so later lessons seed without their `lesson-*` tag. Nothing reads those tags yet.
- `components.json` points `aliases.utils` at `@/lib/utils`, which doesn't exist. Components added with the shadcn CLI need their `cn` import pointed at `tailwind-variants`.
- `learn/essentials` numbers content keeps an unbuilt idea using "Έχω τριάντα χρόνια"; the usual form is "είμαι … χρονών". A curriculum call before anyone builds it.
