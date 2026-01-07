# Landing Page Architecture Analysis

## Executive Summary

This document analyses the Greek learning app's engagement architecture, landing page effectiveness, and practice methodology. Key findings:

- **Landing page copy is strong** - authentic builder story, clear value proposition, low-friction CTA
- **Core engagement loops are solid** - streak system, due counts, short sessions all working
- **Highest-impact gap**: streak warning notifications (infrastructure exists, needs implementation)
- **Practice methodology is correct** - production-based, timed, no recognition traps
- **One area to monitor**: ensure SRS review queue maintains time pressure

---

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

## Conversion & Messaging Review

### Landing Page Assessment

The current landing page (`src/components/LandingPage.tsx`) executes the indie product playbook well:

**What's Working**

| Element | Assessment | Why It Works |
|---------|------------|--------------|
| Headline | Excellent | "You know Greek. You just can't say it." names the exact pain. Passes the headline-only test. |
| Subheadline | Strong | "Recognition isn't fluency. Retrieval is." differentiates methodology in one line. |
| Builder story | Excellent | Personal stakes (wife, son, Cyprus) create genuine connection. Not manufactured. |
| DrillDemo | Very good | Shows product in action before asking for anything. Reduces uncertainty. |
| Primary CTA | Perfect | "Try a Drill" - low commitment, action-focused, no account required. |
| Beta badge | Smart | "Free to use. Support if it helps." - honest positioning, no fake scarcity. |
| Time commitment | Good | "2-3 minutes a day" manages expectations and reduces friction. |

**Conversion Formula Check**: Desire (strong - relatable problem, clear solution) - Labour (low - try without signup) - Confusion (minimal - clear what this does) = High conversion potential.

**Minor Opportunities**

1. **Feature descriptions could ladder up to benefits**:
   - Current: "Spaced repetition. Science-backed review scheduling."
   - Better: "Spaced repetition. Remember words permanently, not just for the test."
   - The "what" is there; add the "so what?"

2. **Footer CTA could add fresh angle**:
   - Current: "Ready to start?" (repeats hero)
   - Alternative: "See if your Greek transfers to speech" (reframes the promise)

3. **Consider adding one specificity signal**:
   - "Train 500+ vocabulary items" or "Drills covering pronouns, articles, verbs"
   - Concrete numbers build credibility

**Do NOT Change**

- The builder story is perfect. Do not polish it further - authenticity is the asset.
- The "Free to use. Support if it helps." badge. Honest framing beats aggressive conversion.
- The DrillDemo. Shows value before asking for anything.

### Push Notification Copy Recommendations

The `pushSubscriptions` infrastructure exists. When implementing notifications, copy matters enormously - bad notification copy gets apps deleted.

**Principles**

1. **Specific beats generic** - "5 Greek words ready" not "Time to practice"
2. **Time estimates reduce friction** - "2 minutes" not "daily practice"
3. **Loss framing for streaks, gain framing for regular** - psychology matches context
4. **Never guilt** - "Miss your Greek?" not "You're falling behind"

**Recommended Copy**

| Trigger | Timing | Title | Body |
|---------|--------|-------|------|
| Streak warning | 2-4h before midnight | "Don't lose your X-day streak" | "5 words waiting - takes 2 minutes" |
| Morning prompt | 7-9am (configurable) | "Good morning" | "5 Greek words ready for review" |
| Lapsed (3 days) | After 3 inactive days | "Miss your Greek practice?" | "Just 3 minutes to catch up" |
| Milestone earned | On achievement | "X-day streak!" | "You're building a real habit" |

**Copy Anti-Patterns to Avoid**

- "You haven't practised today!" (guilt)
- "Your streak is at risk!" (anxiety without solution)
- "Come back!" (desperate)
- "Limited time offer" (irrelevant for this app)

### Backlog Messaging Notes

When building these features, keep messaging aligned with the indie ethos:

**Progress/Stats Page**

Lead with investment visualisation, not gamification:
- "You've spent 4 hours with Greek this month" (investment)
- "Your average response time dropped from 3.2s to 1.8s" (the metric that matters)
- Avoid: badges, levels, XP systems - these feel like manufactured engagement

**Milestone Celebrations**

Keep them understated:
- 7 days: "One week. The habit is forming."
- 30 days: "A month of Greek. You're in it now."
- 100 days: "100 days. That's not dabbling - that's dedication."
- Avoid: confetti explosions, cartoon characters, achievement unlocked gaming tropes

**Method/How-It-Works Page**

For analytical visitors who need the "why" before committing:
- Lead with the problem ("Why other apps don't work for speaking")
- Explain production vs recognition in plain language
- Reference research without being academic
- This page helps conversion but won't move engagement metrics

### Authenticity Check

**Passed**:
- No fake urgency or countdown timers
- No "3 spots left" manufactured scarcity
- Builder story is genuine, not polished
- CTA language is exploratory ("Try a Drill") not pushy ("Start Your Free Trial")
- Support framing is humble ("if it helps")
- Time estimates are honest and conservative

**One Watch Point**:
The "Why I Built This" section mentions building for "our son" - this is personal and powerful, but ensure the app doesn't drift toward "family learning app" positioning if that's not the actual product direction. The current positioning (intermediate learners, retrieval practice) is correct.

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
- **"You've practised X minutes this month"** - sunk cost awareness
- **Accuracy trend** - shows improvement (or identifies frustration risk)
- **Response time trend** - THE metric for this app's core promise

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

See "Push Notification Copy Recommendations" section above for specific copy.

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

Push notification 2-4h before midnight for users with active streaks who haven't practised.

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
- Response time trends (the core metric)
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
| Is landing page copy effective?              | Yes - authentic, clear, low-friction                 |

---

## Curriculum Analysis: Practice Effectiveness Review

This section evaluates features against the core goal from `/docs/app-objectives.md`: **building retrieval speed through timed production**.

### Core Question: Does This Build Retrieval Speed?

| Feature | Verdict | Reasoning |
|---------|---------|-----------|
| /practice/speed | YES | Timed production with 3.5-5s limits. No hints, no options. |
| /practice/review | PARTIAL | Production-based but timer presence unclear from docs |
| /try | YES | Timed drill (4s), production-only, English to Greek |
| /learn/* routes | NO (but acceptable) | Reference material, not practice. Correctly positioned as lookup. |
| /reference/* | NO (but acceptable) | Grammar reference. Hidden behind navigation, not surfaced during drills. |

### Question Types Assessment

From `user-flows.llm`, the documented question types are:

| Type | Direction | Production? | Time Pressure? | Status |
|------|-----------|-------------|----------------|--------|
| Object pronouns (me, se, ton...) | English to Greek | YES | YES | GREEN |
| Possessive pronouns (mou, sou...) | English to Greek | YES | YES | GREEN |
| Verb conjugations | Prompt to form | YES | YES | GREEN |
| Article + noun phrases | English to Greek | YES | YES | GREEN |
| Case transformations | Greek to Greek case | YES | YES | GREEN |
| Common sentences | English to Greek | YES | YES | GREEN |

**All documented drill types require production, not recognition.** No multiple choice. No matching exercises. This is correct.

### Red Flags: Recognition-Only Exercises

**None identified.** The current implementation avoids the recognition trap:

- No multiple choice questions
- No Greek-to-English direction (which would test recognition, not production)
- No matching exercises
- No "select the correct answer" patterns

### Yellow Flags: Potential Concerns

#### 1. /practice/review Timer Ambiguity

The SRS review documentation mentions quality ratings based on response time:

- Quality 5: Correct in <2s
- Quality 4: Correct in >=2s
- Quality 2: Incorrect

**Concern:** This measures response time but does not mention a countdown timer visible to the user. If the review queue allows unlimited thinking time, it becomes "careful practice" rather than "pressured retrieval."

**Recommendation:** Verify the review route has a visible countdown. If not, add one. The SRS quality calculation already depends on speed, so the timer should be surfaced to create pressure.

#### 2. /learn/* Routes: Browsing vs Drilling

The `/learn/vocabulary`, `/learn/phrases`, and `/learn/conversations` routes are browse-only. Users can read content but cannot be drilled on it directly from these views.

**Assessment:** This is correctly positioned as reference material, not practice. The `PracticeCTA` component in reference tabs (mentioned in commit history) appropriately nudges users toward drills.

**Not a problem** as long as users don't spend time "studying" these pages instead of drilling. The current design keeps them as lookup tools.

#### 3. Conversations "Read Mode" vs "Practice Mode"

The `/learn/conversations` route mentions a "Read mode / Practice mode toggle."

**Concern:** If Practice mode within conversations is untimed or recognition-based, it undermines the core principle.

**Recommendation:** Verify Practice mode on conversations uses timed production. If it shows Greek and asks for comprehension, that is recognition practice.

### Curriculum Creep Assessment

| Pattern | Status | Evidence |
|---------|--------|----------|
| Elaborate curriculum organisation | AVOIDED | Routes are functional (practice, learn, reference), not skill-tree based |
| Grammar explanations surfaced proactively | AVOIDED | Reference is separate from practice, requires navigation |
| Topic progression gates | AVOIDED | No "unlock level 2" patterns visible |
| Multiple drill types per topic | AVOIDED | Single, consistent drill format |

**The app correctly prioritises volume over curriculum structure.** There is no evidence of skill trees, level unlocks, or progressive disclosure that would gate practice.

### SRS Implementation Review

The documented algorithm:

- Quality 5: Correct <2s - interval increases (easy)
- Quality 4: Correct >=2s - interval increases (good)
- Quality 2: Incorrect - interval decreases (hard)
- Mastery threshold: 21+ day interval

**Assessment:**

| Aspect | Status | Notes |
|--------|--------|-------|
| Speed incorporated in quality | GREEN | Response time affects SRS scheduling |
| Production direction | GREEN | English to Greek, not recognition |
| Mastery definition | GREEN | 21-day interval is reasonable threshold |

**Gap identified:** No Quality 1 (complete failure) or Quality 3 (hard but correct) documented. A binary correct/incorrect with speed modifier is simpler and may be sufficient, but consider whether "barely remembered after 5+ seconds" should be treated differently from "wrong."

### Vocabulary Progression Assessment

| Aspect | Status | Notes |
|--------|--------|-------|
| Initial vocabulary available | PRESENT | DB-seeded vocabulary with tags |
| New vocabulary addition | PRESENT | Post-lesson entry mentioned in objectives |
| Weak area tracking | PRESENT | `weakAreas` table tracks error patterns |
| Difficulty adaptation | GAP | No automatic difficulty adjustment based on accuracy |

**Gap:** The `weakAreas` table exists but is not clearly surfaced in practice flows. If users are consistently failing certain patterns, those should be prioritised in drills.

### What Is Working

1. **Production-only drills** - No multiple choice, no recognition exercises
2. **Time pressure** - 3.5-5s timers create the "slightly uncomfortable" feeling required
3. **English to Greek direction** - Correct for speaking transfer
4. **Response time tracking** - The metric that matters is being captured
5. **No curriculum gates** - Users can drill immediately, no "complete lesson 1 first"
6. **Reference material segregated** - Grammar lookup exists but does not interrupt practice

### Recommendations for Practice Effectiveness

#### HIGH PRIORITY

1. **Verify /practice/review has visible timer** - If users can think indefinitely, add countdown. The SRS quality calculation implies speed matters, so users should feel time pressure.

2. **Surface weak area data** - The `weakAreas` table is captured but not mentioned in dashboard or drill selection. "You're struggling with accusative pronouns" should trigger targeted drills.

#### MEDIUM PRIORITY

1. **Add response time to progress visualisation** - The proposed `/progress` page focuses on streaks and word counts. Response time trending down is THE metric for this user's problem. Make it prominent.

2. **Verify conversations Practice mode** - Confirm it requires timed production, not recognition or comprehension checks.

#### LOW PRIORITY

1. **Consider Quality 1/3 ratings** - Current binary (correct/incorrect with speed modifier) may be sufficient, but "barely recalled after 6+ seconds" could warrant separate treatment from "wrong."

### Summary: Practice Effectiveness

| Assessment Area | Status |
|-----------------|--------|
| Recognition-only exercises | NONE FOUND |
| Untimed practice creeping in | POSSIBLE (review queue, conversations) |
| Curriculum creep | AVOIDED |
| Question types | ALL PRODUCTION-BASED |
| SRS implementation | SOLID (minor gap in quality granularity) |
| Vocabulary progression | FUNCTIONAL (weak area surfacing gap) |

**Overall:** The core drill engine correctly implements timed production practice. The primary risk is that secondary features (SRS review, conversations) may not maintain the same time pressure as the speed drills. Verify and align.
