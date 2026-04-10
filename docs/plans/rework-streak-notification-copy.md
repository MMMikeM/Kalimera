# Rework Practice Notifications

Replace loss-framed push notification with actionable, behaviour-adaptive reminders.

## Current state

- Cron trigger at 8pm UTC (wrangler.toml: 0 20 \* \*)
- Sends to users with active streaks who haven't practised today
- Copy: "Don't lose your X-day streak!"
- No taper -- sends indefinitely at the same frequency
- Binary: either you get nagged or you don't

## Design intent

### Notification as activation, not reminder

The notification itself should lower the barrier to starting. Instead of "you
should practise" (controlling) or "your queue has X items" (informational but
passive), make it an actionable decision point.

Push notifications support a maximum of two action buttons. The two that
matter most:

- **"2 min"** -- deep links to a pre-scoped 2-minute session
- **"Later"** -- reschedules the notification to +2 hours, no penalty

Tapping the notification body itself (the default action on both platforms)
opens the app normally for users who want a longer session.

"Later" is critical. "Got 2 minutes?" when you're driving or putting the
baby down means the yes option is actually "no", and dismissing starts to
feel like failing a micro-test. "Later" means "wrong moment, not wrong
intent" and doesn't count toward taper logic. Only hard dismisses (swipe
away without tapping anything) count.

### Copy that varies by type, not phrasing

Three variations of "2 or 5?" habituate in under a week. The novelty that
resists habituation comes from varying the _type_ of information, hitting
different INCUP factors:

| Type                | Example                                      | INCUP factor       |
| ------------------- | -------------------------------------------- | ------------------ |
| Bounded commitment  | "Quick 2-minute review?"                     | Urgency            |
| Content preview     | "3 aorist forms due for review."             | Interest/curiosity |
| Competence callback | "You nailed passive voice last time. More?"  | Confidence         |
| Queue size          | "12 items in your review queue."             | Urgency (light)    |
| Domain bridge       | "Greek news uses the tense you're learning." | Passion/interest   |

Rotate across types, not within them. Each type activates a different
motivation pathway.

### Notification timing

8pm UTC is arbitrary. The anchor habit principle says the notification should
fire relative to the user's existing routine, not at a fixed clock time.

- **Onboarding question:** "When do you usually want to practise? Morning /
  Afternoon / Evening" -- sets the initial window.
- **Adaptive timing:** Track when the user actually practises. Shift the
  notification window to ~15 minutes before their most common start time.
  If they consistently practise at 7:30am, an 8pm notification is useless.
- **Time blindness consideration:** The notification needs to arrive when the
  anchor event is fresh, not hours later. "After morning coffee" means 8am,
  not 8pm.

### Behaviour-driven taper

Don't taper on an arbitrary calendar schedule. Taper based on whether the
notification is actually needed:

| User behaviour (recent pattern)                   | What it means                         | Action                                                               |
| ------------------------------------------------- | ------------------------------------- | -------------------------------------------------------------------- |
| Practised _before_ notification time on most days | Habit is forming independently        | Offer: "You've been practising on your own -- want fewer reminders?" |
| Practised _after_ notification on most days       | Notification is working as activation | Keep sending -- it's useful scaffolding                              |
| Ignored notification on most days                 | Notification has become noise         | Change time or content, don't escalate                               |
| Lapsed (3+ days no practice)                      | Initiation problem has reasserted     | Warm prompt with tiny action (see lapse handling below)              |

Tracking needed:

- Time of daily practice relative to notification window
- Whether practice occurred on notification days vs non-notification days
- Days since last practice
- "Later" taps vs hard dismisses (different signals)

### The "I rely on these" option

The taper offer subtly frames ongoing notifications as something you should
be graduating from. For ADHD brains, this is wrong -- external prompts are
ongoing scaffolding, not a crutch to outgrow.

In notification preferences, provide a clear toggle: **"I rely on these, keep
them coming."** This suppresses the taper offer entirely. The framing is "this
is how I use the tool", not "you haven't outgrown this yet."

Setting this proactively should feel like a power-user configuration, not a
concession.

### After a lapse

- **1-3 missed days:** Nothing special. Next notification fires as normal.
- **3-7 missed days:** Single warm prompt with tiny action: "Your Greek is
  here when you're ready. Quick 2 min?"
- **7 days:** One prompt showing what they'd built before the break. "You
  covered X forms before your break. Quick refresh?"
- **14 days:** One more prompt -- same warmth, last chance to catch the right
  moment. "Still interested? Your vocabulary is here when you are."
- **After 14 days:** Genuine silence. Two chances at the right moment is
  enough. More becomes a re-engagement campaign.
- Never escalate tone. Never send "We miss you!" sequences.

Two attempts (day 7 and day 14) instead of one gives a better chance of
catching the right moment, especially for ADHD where one prompt at the wrong
time disappears into the notification graveyard.

### What happens after tapping "2 min"

The user crossed the activation threshold -- the hard part. The app should
make it effortless to continue if they have momentum.

- Deep link opens the app directly into a pre-scoped drill (no dashboard,
  no navigation, no loading screen with choices).
- At the end of the 2-minute session: **"Keep going?"** with one tap.
  Not a full completion card. Not navigation back to the dashboard. Just
  a quiet continuation option.
- If they tap "Keep going", extend by another 2-3 minutes seamlessly. The
  session boundary should be invisible.
- If they don't tap within 5 seconds, show the brief session summary
  and the fork.
- For ADHD: the transition cost of stopping-then-restarting is where you
  lose people. If they're in, keep the path open.

---

## Implementation notes

### Files likely involved

- Push notification cron handler (copy, taper logic, timing)
- Notification action handling (deep link with session size param)
- User table or preferences (notification timing, taper state, "rely on
  these" flag)
- Practice session loader (accept pre-scoped session size from notification
  deep link)
- Drill completion UI (lightweight "Keep going?" continuation mode)
- Onboarding flow (preferred practice time question)

### Data to track

- `notificationPreferredTime` -- user's chosen or adaptive notification time
- `notificationMode` -- "adaptive" (default) or "always" (suppresses taper)
- `practiceTimeHistory` -- timestamps of practice starts (for adaptive timing)
- `notificationResponseHistory` -- "tapped_2min" / "tapped_5min" / "later" /
  "dismissed" (for taper logic)

## Motivation framework

- "Don't lose your streak!" is the exact anti-pattern: loss framing creates
  anxiety, not motivation
- "Got 2 minutes or 5?" is the tiny-default-action pattern applied to the
  notification itself -- two yes options, plus "Later" for wrong-moment
- Varying copy by INCUP type resists habituation longer than rephrasing
- Behaviour-driven taper respects that some users need scaffolding
  indefinitely (ADHD adaptation)
- The "I rely on these" toggle reframes ongoing notifications as a tool
  choice, not a failure to graduate
- Post-tap continuation ("Keep going?") exploits the hardest-won moment --
  having already started -- instead of wasting it on a completion screen
