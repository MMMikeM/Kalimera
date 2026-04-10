# Neurodivergent Adaptations: ADHD + Memory Considerations

Read this file alongside whichever stage file is relevant. It modifies the advice
in each stage for brains with low baseline dopamine (ADHD), executive function
differences, and memory consolidation concerns (temporal lobe epilepsy).

The core framework (informational vs controlling, internal vs external locus, three
SDT needs) still applies. But the thresholds and timelines change, and some patterns
flagged as "anti-patterns" in the main skill are actually necessary scaffolding.

---

## The fundamental difference

Neurotypical advice: "Remove external rewards → intrinsic motivation will emerge."

**This assumes adequate baseline dopamine.** For ADHD brains, the dopamine system
doesn't produce the same reinforcement signal from task completion. The feeling of
"that was satisfying, I want to do it again" is muted or absent for tasks that
aren't inherently interesting. You can't remove external scaffolding and expect
intrinsic motivation to fill the gap when the underlying neurochemistry doesn't
generate that signal reliably.

The adapted principle: **External scaffolding isn't a crutch to be withdrawn on a
schedule. It's a prosthetic that compensates for a genuine neurological difference.
The question isn't "when do I remove it?" but "what form should it take so it
supports the goal without displacing it?"**

This doesn't mean anything goes. The distinction between _helpful scaffolding_ and
_counterproductive gamification_ still matters. But the line is in a different place.

---

## The ADHD motivation system: Interest, Novelty, Challenge, Urgency, Passion (INCUP)

ADHD brains don't allocate attention by importance. They allocate by:

- **Interest:** Does this genuinely engage me right now?
- **Novelty:** Is this new or different from last time?
- **Challenge:** Is this at the right difficulty to produce flow?
- **Urgency:** Is there a deadline creating pressure?
- **Passion:** Does this connect to something I deeply care about?

If none of these are present, the task is functionally invisible regardless of how
important it is. Designing for ADHD means ensuring at least one INCUP factor is
active at any given moment.

**What this means for the app:**

- **Interest:** The core activity needs to be inherently engaging. If it isn't,
  no amount of gamification will compensate long-term. This is actually the same as
  the neurotypical advice, but with higher stakes: for ADHD, "somewhat interesting"
  isn't enough. It needs to actively capture attention.
- **Novelty:** Variation matters more than consistency. The same drill format every
  day will habituate faster. Rotate presentation, vary difficulty, introduce
  surprises. This directly conflicts with the neurotypical advice of "keep it
  consistent for habit formation." For ADHD, some variation within a consistent
  _anchor_ is the right balance.
- **Challenge:** Flow states are particularly powerful for ADHD because flow produces
  the dopamine spike that's missing at baseline. Calibrating difficulty to maintain
  flow is higher priority than for neurotypical users.
- **Urgency:** Timers and time-boxed sessions can help with initiation. A visible
  countdown ("5 minute drill") creates enough urgency to cross the activation
  threshold. This isn't about anxiety — it's about creating a salient enough signal
  to engage the dopamine system.
- **Passion:** Connection to the _reason_ for learning. "I'm learning Greek because
  [specific personal reason]" needs to be accessible, not buried. The domain bridge
  pattern is more important here, and should appear more frequently than for
  neurotypical users.

---

## How each stage changes

### Stage 1 (Initiation) adaptations

**The initiation problem is the whole problem.**
For neurotypical users, "make the first action tiny" is about crossing Fogg's Action
Line. For ADHD, it's about generating enough dopamine to break through task paralysis.
The action needs to be tiny AND immediately engaging. A tiny boring action won't
cross the threshold no matter how small it is.

**Adapt the tiny action:**

- Make it not just small but _interesting from the first second_. Open the app →
  you're immediately doing something that engages (not reading instructions, not
  setting up preferences, not watching an intro).
- A visible timer ("3 minute drill") creates urgency that helps initiation.
  Neurotypical advice says timers are controlling; for ADHD, they're enabling.
- The first few seconds of the session matter disproportionately. If the user feels
  engagement in the first 5 seconds, the ADHD hyperfocus system may activate and
  carry them through a full session. If the first 5 seconds are boring, they've
  already task-switched.

**Adapt anchor habits:**

- Neurotypical advice: "Same time, same place, same cue." This is harder with time
  blindness and inconsistent daily routines.
- Instead: anchor to _events_, not times. "After I take my medication" or "after
  breakfast" rather than "at 8:15 AM." Events are more reliably noticed than clock
  times.
- External prompts (notifications) may be needed for longer than the neurotypical
  3-week taper. This is OK. The prompt isn't a crutch if the underlying neurology
  genuinely doesn't produce reliable internal cues.

**Adapt first-session design:**

- The neurotypical advice says don't front-load the reward system explanation. This
  still applies.
- But: some immediate feedback on completion IS appropriate, because ADHD brains
  may not generate the natural satisfaction signal. Not "Great job!" but a quick,
  concrete output: "You learned these 5 forms: [list]." Something tangible that
  the user produced. The tangibility itself provides a dopamine micro-signal that
  the neurotypical brain generates automatically.

### Stage 2 (Habit Formation) adaptations

**The timeline is different.**
Lally's 66-day median assumes neurotypical habit-formation neurology. With ADHD,
the transition from dorsomedial to dorsolateral striatum may take longer or may
never fully complete for some activities. The "taper external scaffolding by week
10" advice may not apply. Be prepared for external support to remain necessary
indefinitely, and design it to be sustainable rather than planning its removal.

**Adapt the delta display:**

- Deltas are more important here, not less, because the natural satisfaction signal
  is weaker. Showing concrete evidence of improvement provides the competence
  signal externally that the neurotypical brain generates internally.
- Show deltas MORE frequently than for neurotypical users (potentially every session
  where the data is meaningful).
- Make them visually salient — they need to compete for attention with whatever the
  ADHD brain is already thinking about.

**Adapt desirable difficulty:**

- The flow zone is narrower for ADHD. Too easy → boredom → task-switch. Too hard →
  frustration → task-switch. The window of "challenging enough to engage but not so
  hard it overwhelms" is smaller.
- Adaptive difficulty algorithms are more important here than for neurotypical users.
  The difficulty needs to track the user's current state, not just their historical
  average.
- Consider session-level adaptation: start slightly easier to build momentum (get
  the dopamine flowing), then ramp difficulty mid-session once engagement is
  established.

**Adapt missed-day handling:**

- The neurotypical advice (do nothing, let them come back naturally) may not work
  because the initiation problem reasserts itself after any gap. Without the
  momentum of a current streak, crossing the activation threshold is back to
  square one.
- A gentle prompt after a missed day is more appropriate than the neurotypical "say
  nothing." But keep it informational, not guilt-inducing: "Your review queue has
  12 items — want a quick 3-minute session?" This creates urgency (small, bounded
  task) without loss framing.
- Consider: after a gap, reduce the default session size. "Just 3 items" is easier
  to initiate than "your usual 15." Once the user starts, they'll often continue.
  The hard part is starting.

**Adapt the fork:**

- The neurotypical fork offers 2-3 equal options. For ADHD, decision fatigue is a
  real concern. Too many options at low dopamine → decision paralysis → close the app.
- Consider a default recommendation with an easy override: "Next: review your
  hesitations [Change]." This preserves autonomy (they can change it) while reducing
  the executive-function cost of choosing.

### Stage 3 (Sustaining) adaptations

**"Get out of the way" needs modification.**
The neurotypical Stage 3 advice is "minimise the app's presence, the user is
self-directing." For ADHD, the user may need the app's structure indefinitely,
not because the habit hasn't formed, but because executive function support is an
ongoing need, not a temporary scaffold.

**Adapt novelty:**

- Novelty seeking means the same content format becomes invisible faster. The app
  needs to rotate presentation, introduce new challenge modes, and vary the
  experience more than for neurotypical users.
- This is where the Candy Crush insight actually applies: variable reward schedules
  aren't inherently bad for ADHD brains — they provide the unpredictability that
  keeps the dopamine system engaged. The key is that the variability should be in
  the _content and presentation_, not in artificial reward mechanics. Surprise the
  user with an unexpected connection between concepts they've learned, not with a
  random bonus badge.

**Adapt mastery display:**

- Long-term progress views are valuable but need to be visually engaging to compete
  for attention. A wall of text saying "you've improved" won't register. A clear
  visual showing the trajectory will.
- Consider making the progress view interactive rather than passive. Let the user
  explore their data rather than reading a summary.

---

## Memory consolidation (TLE-specific)

Temporal lobe epilepsy can affect the hippocampus, which is directly involved in
memory consolidation. This has specific implications for a learning tool:

**Shorter, more frequent sessions may outperform longer ones.**
If consolidation is less efficient, the encoding-consolidation-retrieval cycle
benefits from more repetitions at shorter intervals. The spaced repetition schedule
may need to be more aggressive (shorter initial intervals, more review cycles) than
for someone with typical hippocampal function.

**Sleep and session timing matter more.**
Memory consolidation is heavily sleep-dependent. If seizure activity or medication
affects sleep quality, this compounds the consolidation challenge. The app can't
control this, but it can avoid scheduling review of difficult material at times
when the user reports being fatigued.

**Review > new material ratio.**
For typical learners, a session might be 70% new material, 30% review. With
consolidation concerns, inverting this (30% new, 70% review) may produce better
long-term retention. The app should support this ratio being user-configurable.

**The delta display is particularly important.**
If consolidation is slower, the user may feel like they're not retaining things even
when they are. Showing concrete evidence that retained knowledge IS growing — even
if more slowly — counters the discouragement of feeling like learning isn't sticking.

---

## Patterns re-evaluated for ADHD

These patterns are flagged as anti-patterns in the main skill. For ADHD, they need
a more nuanced assessment:

| Pattern                                | Neurotypical verdict                   | ADHD-adapted verdict                                                                                                                                                                                               |
| -------------------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Visible timers/countdowns              | Potentially controlling                | Helpful for initiation. Creates urgency to cross activation threshold. Use for session start, not as pressure during sessions.                                                                                     |
| Streak tracking                        | External locus, habituates             | Mixed. Can help with consistency IF not loss-framed. A simple calendar showing practice days (no "streak count", no "don't break it!") may support the executive-function gap without creating anxiety.            |
| Immediate completion feedback          | Habituates, displaces intrinsic reward | More necessary than for neurotypical users. The intrinsic reward signal is weaker. Brief, concrete, informational feedback provides the dopamine micro-signal that the task itself may not generate.               |
| Notifications beyond week 3            | Becomes controlling                    | May be needed indefinitely. Make them configurable, respectful, and informational. Never guilt-based.                                                                                                              |
| Session-start "warm-up"                | Unnecessary friction                   | Helpful. A 30-second easy warm-up gets dopamine flowing before harder material. Like a physical warm-up before exercise.                                                                                           |
| Default recommendation instead of fork | Undermines autonomy                    | Reduces decision fatigue. Preserves autonomy through easy override. Net positive when executive function is limited.                                                                                               |
| Sensory feedback (sounds, animations)  | Potentially distracting                | Can aid engagement if subtle and tied to meaningful moments. A brief sound on correct answers provides immediate sensory feedback that the dopamine system registers. Keep it non-intrusive and user-controllable. |
| Variable presentation                  | Undermines consistency                 | Essential. Novelty-seeking means the same format habituates fast. Rotate drill types, vary visual presentation, introduce surprise elements in the content (not in artificial rewards).                            |

---

## The core principle, adapted

The neurotypical skill says: "The best learning tool is one users outgrow."

For ADHD, the adaptation is: **"The best learning tool is one that provides reliable,
non-patronising scaffolding for as long as the user needs it, without making the
scaffolding feel like the point."**

The scaffolding (timers, prompts, immediate feedback, default recommendations,
structured sessions) isn't a failure to build intrinsic motivation. It's a
recognition that intrinsic motivation operates through a dopamine system that works
differently, and that system benefits from ongoing external support. The art is
making that support feel like a natural part of the tool — not like the app is
managing you, but like the app is a well-designed instrument that fits your hand.
