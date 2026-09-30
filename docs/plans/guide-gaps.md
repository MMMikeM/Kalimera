# Guide gaps

What is left from the 29 September 2026 audit of every content source against the guides. The audit's findings, from wrong rules to data errors, are all fixed; `git log -- docs/plans/guide-gaps.md` has the full list.

## Planned drills

Sections with no real drill carry `plannedDrills` stubs. The guide page shows each stub unlinked, and the stub records the id the real drill will take. Building those drills is the remaining work: `grep -n plannedDrills src/routes/guides/*.data.ts` lists them.

## Left out on purpose

These follow `content-organisation.md`, which sends them to Learn rather than a guide:
- **Telling the time and dates.**
- **Past-time words and "ago":** χτες, πέρυσι, πριν από μια εβδομάδα, την περασμένη εβδομάδα. Lesson notes file these under Essentials, but Essentials → Time has no slot for them yet, so they currently have no home.
- **Building numbers:** δεκατρία, τριάντα δύο.
- **Single words and idioms:** μια χαρά, τα λέμε, κάνω μπάνιο.
- **The pluperfect:** it appears once, in listening only.
