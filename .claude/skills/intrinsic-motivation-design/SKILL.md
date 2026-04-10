---
name: intrinsic-motivation-design
description: >
  Design feedback, completion moments, reward systems, and engagement mechanics that
  build intrinsic motivation instead of creating dependence on extrinsic rewards. Use
  whenever the user is designing how an app responds to task completion, building habit
  loops, creating progress indicators, designing streaks or achievement systems, deciding
  what happens after a user finishes something, or questioning whether their current
  gamification approach is effective long-term. Also triggers on: "how do I keep users
  coming back", "this feels too Duolingo", "celebration screen", "reward system",
  "badges feel hollow", "streak anxiety", "motivation mechanics", "habit formation",
  "engagement without manipulation", "completion feedback", "progress design", or any
  discussion of how to make an app's feedback support genuine learning/growth rather than
  compulsive usage. If the user is designing any system that touches motivation, rewards,
  feedback, progress, or habit formation in a consumer product, use this skill.
---

# Intrinsic Motivation Design

Design products where users keep coming back because the activity itself is
rewarding, not because the app has trained them to chase points.

## How to use this skill

1. Read this file first. It gives you the framework for evaluating any motivation
   mechanic: why things work, why things fail, and how to tell the difference.
2. Then read the stage file that matches where the user is in their journey:
   - `stages/1-initiation.md` — Getting someone started. First days and weeks.
     External scaffolding is appropriate here. The goal is crossing the activation
     threshold and anchoring the behaviour.
   - `stages/2-habit-formation.md` — Building the habit. Weeks 3-10. The behaviour
     is transitioning from deliberate choice to automatic routine. External support
     should be tapering. The app's job shifts from prompting to reflecting.
   - `stages/3-sustaining.md` — Long-term engagement. Week 10+. The habit exists.
     The app is a tool, not a coach. Motivation is self-generated or it isn't
     happening. Design for depth, mastery, and autonomy.

If the design problem spans multiple stages (e.g. "what should the whole
onboarding-to-expert experience look like"), read all three stage files.

3. If the user or the target audience includes ADHD, executive function differences,
   or memory consolidation concerns, also read `stages/0-neurodivergent-adaptations.md`.
   This modifies the advice in every stage file. Several patterns flagged as anti-patterns
   in this skill are necessary scaffolding for brains with low baseline dopamine. The
   core framework still applies but the thresholds, timelines, and some specific
   recommendations change significantly. **When in doubt, read this file.** Designing
   for neurodivergent users and then simplifying for neurotypical ones produces better
   design than the reverse.

---

## The core framework: why things work or fail

Every motivation mechanic can be evaluated on two axes. Understand these and you
can assess any pattern, including ones not covered in this skill.

### Axis 1: Informational vs Controlling

Any feedback event has two aspects (Cognitive Evaluation Theory):

- **Informational:** gives the user competence-relevant data. "You conjugated 14
  forms in 4 minutes." The user processes this and draws their own conclusion.
- **Controlling:** pressures the user toward a specific behaviour. "Complete 3 more
  to keep your streak!" The app is directing, not reflecting.

When the informational aspect dominates → intrinsic motivation is maintained or
enhanced. The user feels competent and autonomous.

When the controlling aspect dominates → intrinsic motivation erodes. The user feels
managed. Even "positive" controlling feedback ("Great job!") undermines motivation
because it positions the app as judge.

**The test:** Who is the subject of the sentence? If the app is evaluating the user
("You're amazing!"), it's controlling. If the app is describing what happened ("You
practised 14 forms"), it's informational. If the app is telling the user what to do
next ("Keep going!"), it's controlling. If the app is offering options ("Review
these / Try something new / Stop here"), it's informational.

### Axis 2: Internal vs External locus

Where does the motivation originate?

- **Internal locus:** The user does the thing because they find it inherently
  interesting, valuable, or satisfying. They'd do it without the app's feedback.
- **External locus:** The user does the thing because the app rewards, praises,
  tracks, or punishes. Remove the app mechanic and the behaviour stops.

The problem with external locus isn't that it doesn't work short-term. It does.
Streaks work. Points work. Leaderboards work. The problem is:

1. **Habituation.** Dopamine neurons encode prediction errors, not rewards. Once a
   reward is fully predicted (badge every 10 sessions, celebration after every
   drill), it produces zero neurochemical signal. You need escalating rewards to
   maintain the same effect. This is the treadmill.

2. **Undermining.** fMRI evidence (Murayama 2010) shows that after tangible rewards
   are introduced and then withdrawn, brain activation for the task drops _below
   the original baseline_. The brain literally treats the activity as less rewarding
   than before you added the reward. This isn't just psychological; it's measurable
   neural change.

3. **Displacement.** The user starts optimising for the reward instead of the goal.
   Duolingo users speed-running easy lessons to protect streaks. Fitness app users
   shaking their phone to fake steps. The reward mechanic displaces the behaviour
   it was meant to support.

**The test:** If you removed this mechanic entirely, would the user still do the
thing? If yes, the mechanic is scaffolding (potentially useful, especially early).
If no, the mechanic has become a crutch (the user is dependent on it, and you've
created external-locus motivation that will habituate over time).

---

## The three psychological needs

Self-Determination Theory identifies three needs that, when satisfied, produce
self-sustaining motivation. These aren't preferences; they're requirements. Designing
against any of them creates friction that no amount of gamification can overcome.

**Autonomy** — "I chose this. I'm directing my own path."
Satisfied by: meaningful choice, user-set targets, opt-out from any mechanic, no
forced interruptions. Frustrated by: modals, mandatory celebrations, app-chosen
goals, rigid curricula with no branching, loss-framed streaks.

**Competence** — "I'm getting better at something real."
Satisfied by: visible growth through the work itself, calibrated difficulty, honest
feedback, self-comparison over time. Frustrated by: false praise, uncalibrated
difficulty, hidden errors, metrics disconnected from actual ability.

**Relatedness** — "This connects me to something beyond myself."
Satisfied by: connection to the domain (real-world application), contribution
(teaching others, sharing insights), shared purpose. Frustrated by: competitive
leaderboards, social comparison, isolation.

**How to use this:** Before implementing any feedback mechanic, check it against
all three needs. A mechanic that supports competence but undermines autonomy (e.g.
a mandatory celebration modal that shows your score) is net negative. A mechanic
that supports relatedness but undermines competence (e.g. a leaderboard that makes
beginners feel inadequate) is net negative. The best mechanics serve at least one
need and violate none.

---

## Quick pattern evaluation

Use this when reviewing a specific design decision. Ask in order:

1. **Does this moment need to exist?** If the user is in flow and the next task is
   ready, the best feedback might be none. Flow produces its own dopamine. Don't
   interrupt it to deliver a weaker synthetic version.

2. **Is it informational or controlling?** (Axis 1 above)

3. **Does it move the locus inward or outward?** (Axis 2 above)

4. **Which SDT needs does it serve? Which does it violate?**

5. **What stage is the user in?** The same mechanic can be appropriate in Stage 1
   (initiation) and harmful in Stage 3 (sustaining). Read the relevant stage file
   for stage-specific guidance.

---

## Universal anti-patterns

These are bad regardless of stage. The rationale for each is grounded in the axes
above.

| Pattern                                     | Why it fails                                                                                                                             | What to do instead                                                                                 |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Confetti / particle celebrations            | Controlling (app as judge), external locus, habituates within days, interrupts flow                                                      | Inline acknowledgement: describe what happened, don't evaluate it                                  |
| Modal "well done" dialogs                   | Blocks autonomy (forced interaction), controlling, positions app as authority                                                            | Non-blocking inline card. User can scroll past it.                                                 |
| "Don't lose your streak!"                   | Loss framing is controlling. Creates anxiety, not motivation. Lally's research: missing a day doesn't impact habit formation.            | Show consistency data passively. Never loss-frame. Reward recovery after lapse.                    |
| XP / points for completion                  | Expected tangible reward → undermining effect. User optimises for points, not learning.                                                  | Show competence growth: speed improvement, difficulty progression, real-world capability           |
| Person-praise ("You're amazing!")           | Creates fixed mindset (Dweck). User avoids difficulty to protect the label. Controlling: app is judging identity, not describing action. | Describe what happened. Or process-praise: "You tried three approaches before finding it."         |
| Same celebration for easy and hard tasks    | Disconnects feedback from reality. User detects the dishonesty. Undermines competence signals.                                           | Calibrate response to actual difficulty. Hard sessions get struggle-reframe, not identical praise. |
| Speed-based praise ("Fastest session yet!") | Signals fast = good. Discourages the struggle that produces durable learning (Bjork's desirable difficulties).                           | Acknowledge effort and strategy. Reframe time-on-task as investment, not inefficiency.             |

---

## Universal good patterns

These work across stages (though their weight and frequency should change by stage —
see the stage files for calibration).

| Pattern                   | Why it works                                                                                                                          | Implementation                                                                                |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Acknowledge, don't praise | Informational, not controlling. User retains agency to evaluate their own performance.                                                | "You practised 14 aorist forms." Not "Great job on those aorist forms!"                       |
| Surface the delta         | Self-comparison is the strongest competence signal. Undeniable, self-generated, no external judge needed.                             | "This took 4 min today. Last week: 12." Only show when data exists and tells a real story.    |
| The fork                  | Autonomy at the decision point. User directs their own path.                                                                          | 2-3 genuinely different next steps as low-key text links. Not one dominant "Continue" button. |
| Struggle reframe          | Reframes difficulty as productive. Grounded in desirable-difficulty research: harder retrieval = more durable encoding.               | "These took the most effort. That's where lasting learning happens."                          |
| Domain bridge             | Creates relatedness to the living domain. Genuine surprise activates prediction-error dopamine through real discovery.                | "The aorist is the default narrative tense. Every news article uses what you just practised." |
| Reward recovery           | Milkman megastudy (N=61,293): microrewards for returning after a lapse outperformed all other interventions.                          | After a missed day: welcome back warmly, no guilt, optionally highlight what's waiting.       |
| Tiny default action       | Fogg: make the minimum viable engagement so small it's hard not to do. Crosses the activation threshold without requiring motivation. | "Review 1 card" as the minimum session. Expand naturally once the user is engaged.            |
