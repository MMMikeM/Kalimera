# Landing Page Architecture Analysis

## Current State Summary

| Route                           | Unauthenticated                    | Authenticated        |
|---------------------------------|------------------------------------|----------------------|
| /                               | Landing page (via LandingPage.tsx) | Dashboard (home.tsx) |
| /support                        | About page                         | About page           |
| /reference/*, /learn/*, /search | Public content                     | Public content       |
| /practice/*                     | Redirects to landing               | Practice drills      |
| /try                            | Anonymous drill                    | Anonymous drill      |

---

## Implemented Items (Session 2025-01-07)

The following recommendations have been implemented:

1. **Lapsed user re-engagement** - Dashboard detects users returning after 7+ days with 15+ due items and shows contextual "Welcome back" messaging with freeze-aware copy
2. **"Just 5 items" option** - Large queues (15+) show a quick review option to reduce friction
3. **Try-before-signup flow** - `/try` route allows anonymous 8-question drill with signup prompt after
4. **Tomorrow preview** - Dashboard shows "Tomorrow: X items" with calendar icon
5. **Post-session celebration** - Drill summary shows encouragement messages with icons based on accuracy
6. **/support discoverability** - Header now shows About link (Info icon mobile, text desktop) for authenticated users

---

## Engagement Analysis

### What's Working Well

The user-flows.llm documents a solid engagement foundation:

| Hook | Mechanism | Effectiveness |
|------|-----------|---------------|
| Due count | Urgency | High - creates actionable FOMO |
| Streak display | Loss aversion | High - 7-day grid is proven |
| Short sessions | Low friction | High - 2-3 min completable |
| Auto-advance | Flow state | High - maintains momentum |
| Lapsed recovery | Reduced friction | High - "Just 5" rescues overwhelmed users |
| Post-session celebration | Positive reinforcement | Medium - variable messages by accuracy |

### Critical Gaps Identified

From user-flows.llm gaps section, these are high-priority retention levers:

#### 1. Streak Warning Notifications (HIGH PRIORITY)

**Current state:** None
**Recommendation:** "2 hours left!" notification before midnight

**Why this matters:**

- Streak preservation notifications have the highest open rates
- Loss aversion is strongest when loss is imminent
- Users who lose streaks on "forgot" days (vs "too busy" days) churn hard

**Implementation note:** The `pushSubscriptions` table exists. This is a backend job + notification copy task, not UI work.

#### 2. Milestone Celebrations (MEDIUM PRIORITY)

**Current state:** None
**Recommendation:** Celebration at 7, 30, 100 days

**Why this matters:**

- Milestones create memorable positive moments
- 7-day milestone is critical - proves the habit is forming
- 30-day milestone = "I'm a Greek learner" identity shift
- 100-day milestone = social proof shareability

**Risk:** Over-celebrating feels childish. Keep it tasteful - a single confetti moment and congratulatory text, not cartoon animations.

### Engagement Opportunities in Backlog Items

#### /progress or /stats - Reframe as Investment Visualisation

The current framing focuses on "analytics for engaged users." Reframe:

**Engagement angle:**

- **Words mastered count** - the growing number creates investment
- **Streak calendar view** - visual chain you don't want to break
- **"You've practiced X minutes this month"** - sunk cost awareness
- **Accuracy trend** - shows improvement (or identifies frustration risk)

**Priority bump:** This should be MEDIUM, not LOW. Progress visualisation is a proven retention lever. Users who see their investment growing are less likely to abandon.

#### /method or /how-it-works - Low Engagement Value

This helps conversion (skeptical visitors), not retention. Keep it LOW priority.

#### /changelog - Low Engagement Value

Credibility signal for visitors, not engagement for users. Keep it LOW priority.

### Missing from Backlog (Should Add)

#### Push Notification Strategy

The `pushSubscriptions` table exists but user-flows.llm only mentions push notifications generically. Needs:

1. **Streak warning** (2-4h before midnight)
2. **Morning prompt** ("5 items due - 2 minute session")
3. **Lapsed user re-engagement** (after 3 days: "Miss your Greek practice?")

**Copy principles:**

- Specific item counts ("5 words ready" not "Time to practice")
- Time estimates ("2 minutes" not "daily practice")
- Loss framing for streak warnings, gain framing for regular prompts

#### Difficulty Adaptation

user-flows.llm documents the SRS algorithm but not difficulty monitoring. The 70-80% success rate sweet spot isn't tracked.

**Gap:** If user accuracy drops below 70%, they're likely frustrated. If above 90%, they're likely bored.

**Data available:** `practiceAttempts.isCorrect` + `practiceSessions`

**Potential feature:** Dashboard could show "Struggling? Try easier content" when recent accuracy is low, or "Ready for more? Add new vocabulary" when accuracy is consistently high.

#### Session Length Visibility

user-flows.llm mentions configurable session sizes (10/15/20/30) but the dashboard CTA says "Start Practice" without showing expected duration.

**Quick win:** Add time estimate to CTA button: "Start Practice (3 min)" based on due count * 0.25 min formula already in user-flows.

### Backfire Risk Scan

Current implementation avoids major backfire patterns:

| Pattern | Status | Notes |
|---------|--------|-------|
| Hard streak reset | AVOIDED | Freeze system with earn-back |
| Guilt notifications | AVOIDED | Copy is positive-framed |
| Long mandatory sessions | AVOIDED | "Just 5" option exists |
| Overwhelming queue display | AVOIDED | Lapsed user messaging reduces anxiety |
| Hidden progress | PARTIAL RISK | Mastered/learning counts exist but minimal |

**One concern:** The due count could feel overwhelming at high numbers. Consider capping display at "20+" and showing "Let's tackle a few" rather than "47 items due."

---

## Remaining Backlog (Prioritised)

### HIGH: Streak Warning Notifications

Push notification 2-4h before midnight for users with active streaks who haven't practiced.

**Why:** Highest-converting notification type. The push infrastructure exists.

---

### HIGH: Milestone Celebrations

7-day, 30-day, 100-day streak celebrations with tasteful UI moment.

**Why:** Creates memorable positive moments at habit-formation milestones.

---

### MEDIUM: /progress or /stats - Progress Dashboard

Currently, progress is shown minimally on the Dashboard (mastered/learning counts). A dedicated progress page could show:

- Total words learned over time (graph)
- Streak calendar (full history, not just 7 days)
- Accuracy trends
- Time invested
- "Next milestone: X days"

**Why it helps retention:**

- Visible investment creates switching cost
- Trend visualisation shows improvement
- Calendar view extends the chain-don't-break-it effect

---

### MEDIUM: Push Notification Copy & Timing

Define notification strategy:

| Trigger | Timing | Copy |
|---------|--------|------|
| Streak warning | 2-4h before midnight | "Don't lose your X-day streak! 5 items waiting." |
| Morning prompt | 7-9am | "Good morning! 5 Greek words ready for review." |
| Re-engagement | After 3 inactive days | "Miss your Greek practice? Just 3 minutes to catch up." |

---

### LOW: /method or /how-it-works - Methodology Page

For users who want to understand WHY timed production drills work:

- Recognition vs retrieval research
- Spaced repetition science
- The intermediate plateau (why other apps fail)

Who needs this: Visitors who are skeptical or analytical. Currently, the landing page touches on this briefly, but some people want depth before committing.

---

### LOW: /changelog or /updates - Development Log

Shows the app is actively maintained. Currently mentioned as a credibility signal but doesn't exist.

---

### MONITOR: Difficulty Adaptation

Track accuracy rates. If patterns emerge (users consistently below 70% or above 90%), build adaptive difficulty features.

---

## Summary

| Question                                     | Status                                               |
|----------------------------------------------|------------------------------------------------------|
| Should logged-in users see landing page?     | No - correct behaviour                               |
| Is Dashboard sufficient for returning users? | Yes - lapsed user messaging implemented              |
| What's missing for conversion?               | Done - try-before-signup flow implemented            |
| What's missing for retention?                | Milestone celebrations, progress visualisation       |
| What's missing for engagement?               | Streak warning notifications (highest-impact gap)    |
| What's the backfire risk?                    | Low - current patterns are safe                      |
