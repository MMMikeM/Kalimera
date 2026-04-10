# Rework Milestone Celebrations

Replace confetti + modal celebrations with quiet inline acknowledgement.

## Current state

- MilestoneCelebration component shows confetti animation + modal at 7, 30, 100, 365 day streaks
- Persisted to milestonesAchieved table via /api/milestones
- Only shows once per milestone per user
- Modal blocks interaction until dismissed

## Target state

- **Quiet inline text** on the dashboard at natural breakpoints. "You've been practising for a week." Full stop.
- **No confetti, no modal, no forced interaction.** The user sees it as part of the normal dashboard flow.
- **Keep persistence.** The milestonesAchieved table is useful for analytics -- keep tracking when milestones are reached, just change the presentation.
- **Non-blocking.** The acknowledgement sits in the dashboard content. The user scrolls past it or doesn't.

## Files likely involved

- MilestoneCelebration component (remove or gut)
- Dashboard / home route (add inline milestone text)
- /api/milestones endpoint (keep, just stop triggering modal)

## Motivation framework

- Confetti + modal is a universal anti-pattern: controlling, habituates within days, interrupts flow
- Inline text is informational: the app noticed, the user decides how to feel
