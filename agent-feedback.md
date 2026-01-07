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

## Remaining Backlog (Lower Priority)

### /progress or /stats - Progress Dashboard

Currently, progress is shown minimally on the Dashboard (mastered/learning counts). A dedicated progress page could show:

- Total words learned over time (graph)
- Accuracy trends
- Weak areas
- Time invested

Why it helps retention:

- Seeing progress is motivating
- Provides deeper analytics for engaged users

---

### /method or /how-it-works - Methodology Page

For users who want to understand WHY timed production drills work:

- Recognition vs retrieval research
- Spaced repetition science
- The intermediate plateau (why other apps fail)

Who needs this: Visitors who are skeptical or analytical. Currently, the landing page touches on this briefly, but some people want depth before committing.

---

### /changelog or /updates - Development Log

Shows the app is actively maintained. Currently mentioned as a credibility signal but doesn't exist.

---

## Summary

| Question                                     | Status                                               |
|----------------------------------------------|------------------------------------------------------|
| Should logged-in users see landing page?     | No - correct behaviour                               |
| Is Dashboard sufficient for returning users? | Yes - lapsed user messaging implemented              |
| What's missing for conversion?               | Done - try-before-signup flow implemented            |
| What's missing for retention?                | Progress visualisation (backlog)                     |
| What's missing for engagement?               | Done - re-engagement flow implemented                |
