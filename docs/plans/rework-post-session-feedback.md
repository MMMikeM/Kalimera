# Rework Post-Session Feedback

Replace person-praise celebration messages with informational acknowledgement.

## Current state

- Tiered encouragement messages based on accuracy ("You're on fire!", "Great session!", "You showed up -- that's what matters!")
- Trophy/Flame/Sparkles icons scaled by accuracy
- Same celebration tone regardless of session difficulty
- "Consistency beats intensity" closing message

## Target state

- **Acknowledge, don't praise.** Describe what happened: items practised, time spent, which items took effort.
- **Struggle reframe.** When a session was hard: "These 3 forms took the most effort. That's where durable learning happens."
- **The fork.** 2-3 genuinely different next steps as low-key links (e.g. "Review the hesitations / Try a different category / Done for today"), not one dominant "Practice Again" CTA.
- **No person-praise.** Remove "You're on fire!", "Great job!", "You showed up". The user decides how they feel.
- **Calibrate to difficulty.** A hard session at 70% that pushed boundaries gets the struggle reframe. An easy session at 100% gets a brief summary and the fork. Don't treat them the same.

## Files likely involved

- `src/routes/practice/` -- drill summary components
- Drill summary / completion UI component

## Motivation framework

- Axis 1: Shift from controlling (app evaluates) to informational (app describes)
- Axis 2: Move locus inward -- the satisfaction comes from the practice, not the app's reaction
- SDT: Supports competence (honest feedback) and autonomy (the fork)
