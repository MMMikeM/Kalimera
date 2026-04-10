# Anti-Patterns

Common traps that feel productive but don't build retrieval speed.

## 1. Curriculum Creep

**What it looks like:**

- Skill trees with unlockable levels
- Learning paths with prerequisites
- Progress percentages across grammar topics
- "Master nominative before attempting accusative"
- Elaborate topic organisation

**Why it fails:**
The user already knows the grammar. Organising it elaborately doesn't make retrieval faster. It just feels productive to the developer.

**The trap:** Building curriculum structures is procrastination disguised as productivity. The user doesn't need a map of Greek grammar. They need to produce Greek faster.

**What to do instead:**
Simple topic selection. Drill whatever's slow. Topic coverage matters far less than volume and speed.

---

## 2. Recognition Disguised as Production

**What it looks like:**

- "Select the correct translation" (multiple choice)
- "Match the Greek to the English" (matching)
- "Is this sentence correct?" (judgment)
- "Which article fits?" (selection)
- Greek → English flashcards

**Why it fails:**
Recognition uses different neural pathways than production. Getting faster at recognising τον doesn't make you faster at producing τον.

**The trap:** Recognition exercises feel productive because users get them "right." High accuracy creates an illusion of progress. But the skill doesn't transfer to speaking.

**What to do instead:**
Blank input only. User types the answer from memory. No options, no selections, no judgments.

---

## 3. Comfortable Practice

**What it looks like:**

- Generous time limits (15+ seconds)
- No timer at all
- "Take your time"
- Relaxed, stress-free environment
- Self-paced progression

**Why it fails:**
Without time pressure, users fall back on conscious rule application. They think through the grammar deliberately. This reinforces the slow, declarative pathway instead of building procedural speed.

**The trap:** Comfortable practice feels like learning. Users prefer it. But comfort prevents proceduralization.

**What to do instead:**
Timer should feel slightly rushed. If it's comfortable, it's too long. Target 3-7 seconds depending on complexity. The discomfort is the learning signal.

---

## 4. Hint Dependency

**What it looks like:**

- First letter hints
- Word banks to select from
- Grammar tables visible during practice
- "Peek" buttons
- Declining difficulty after errors

**Why it fails:**
Hints short-circuit retrieval. When you see "τ\_\_", you're recognising, not retrieving. The hint does the hard part for you.

**The trap:** Hints feel helpful. They reduce frustration. But they prevent the retrieval practice that builds automaticity.

**What to do instead:**
No hints during production. Show the correct answer after the attempt, not during. Errors are expected and useful.

---

## 5. Overemphasis on Accuracy

**What it looks like:**

- Requiring 100% accuracy before advancing
- Penalising errors heavily
- "Get it right before moving on"
- No speed tracking, only accuracy
- Treating errors as failure

**Why it fails:**
The user is already accurate when given time. Their problem is speed, not accuracy. Optimising for accuracy alone doesn't address the actual gap.

**The trap:** Accuracy is easy to measure and feels important. But for this user, accuracy without speed is meaningless.

**What to do instead:**
Track speed as the primary metric. Accept ~20-40% error rate on new material. Mastery = fast AND accurate, not just accurate.

---

## 6. Perfect Before Shipping

**What it looks like:**

- Waiting for beautiful UI before launching
- "Just need to add X feature first"
- Extensive polish before user testing
- Comprehensive content before any practice
- Long development cycles

**Why it fails:**
A working timed drill with ugly UI is more valuable than a beautiful app that doesn't exist yet. The user needs to drill now, not in three months.

**The trap:** Perfectionism masquerades as quality. It delays the thing that actually helps.

**What to do instead:**
Ship ugly. A text input, a timer, and a prompt is enough to start. Iterate based on actual use.

---

## 7. Feature Creep

**What it looks like:**

- Gamification (points, badges, streaks)
- Social features (leaderboards, friends)
- Elaborate statistics dashboards
- Multiple practice modes
- Customisation options

**Why it fails:**
Every feature that isn't "timed production drill" dilutes focus. Users fiddle with settings instead of drilling. Developers build features instead of drilling content.

**The trap:** Features feel like progress. More features = better app, right? But for this specific problem, features are distractions.

**What to do instead:**
The core loop is: prompt → timer → input → feedback → repeat. Build that. Make it fast. Fill it with content. Everything else is optional.

---

## 8. Study Mode vs. Practice Mode

**What it looks like:**

- "Learn" tab with grammar explanations
- Reference materials prominently featured
- "Study first, then practice"
- Grammar lessons before drills
- Encouraging users to "review" before drilling

**Why it fails:**
The user already knows the grammar. More study reinforces declarative knowledge, not procedural speed. Study mode is a comfortable avoidance of the hard work of drilling.

**The trap:** Study feels productive. It's easier than failing under time pressure. Users gravitate toward it.

**What to do instead:**
Reference material can exist but should be de-emphasised. The default action should be drilling, not studying. Make drilling the path of least resistance.

---

## 9. Wrong Direction Emphasis

**What it looks like:**

- Greek → English as primary direction
- "What does this mean?" exercises
- Comprehension-focused practice
- Reading practice prioritised over production

**Why it fails:**
Speaking requires English thought → Greek production. Drilling the opposite direction (Greek → English) builds comprehension speed, not production speed.

**The trap:** Greek → English is easier. Users succeed more often. It feels like progress. But it doesn't transfer to speaking.

**What to do instead:**
English → Greek as the primary (or only) direction. If Greek → English exists, it should be secondary and clearly labelled as comprehension practice.

---

## Summary Table

| Anti-Pattern         | Feels Like            | Actually Does            |
| -------------------- | --------------------- | ------------------------ |
| Curriculum Creep     | Organised learning    | Procrastination          |
| Recognition Practice | Getting answers right | Wrong neural pathway     |
| Comfortable Practice | Stress-free learning  | Blocks proceduralization |
| Hint Dependency      | Helpful scaffolding   | Short-circuits retrieval |
| Accuracy Focus       | Quality control       | Ignores the real problem |
| Perfectionism        | High standards        | Delays what works        |
| Feature Creep        | Better product        | Distraction              |
| Study Mode           | Solid foundation      | Avoidance                |
| Wrong Direction      | Productive practice   | Wrong skill              |
