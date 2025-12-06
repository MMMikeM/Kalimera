# Review Page Design

Review a page's design and educational effectiveness using both the curriculum-analyst and ui-designer agents.

## Usage

```
/review-page <url-path>
```

Examples:
- `/review-page /quick-reference`
- `/review-page /vocabulary?tab=phrases`
- `/review-page /conversations`

## Process

1. **Take Screenshot** - Navigate to the page and capture a full-page screenshot using Playwright
2. **Launch Agents in Parallel**:
   - **curriculum-analyst**: Evaluates educational value, content organization, learning path clarity
   - **ui-designer**: Evaluates visual hierarchy, color usage, typography, Greek-first principle
3. **Summarize Findings** - Present combined recommendations organized by priority

## Agent Instructions

Both agents should read:
- The screenshot captured
- The relevant source file(s) for the route
- `/docs/design-guidelines.md` for design principles
- `/src/index.css` for available colors and utilities

Focus areas:
- Does the page follow "Greek first, English as context"?
- Are we using the full color palette effectively (including santorini, navy, slate)?
- Is there visual redundancy or clutter?
- Does the layout reveal linguistic structure?
- Are there opportunities to improve learning outcomes?

## Input

$ARGUMENTS - The URL path to review (e.g., `/quick-reference` or `/vocabulary?tab=phrases`)
