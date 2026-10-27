---
version: 1
slug: "src-routes-lessons-route-tsx"
primary_target: "src/routes/lessons/route.tsx"
related_targets: ["src/routes/lessons/index.tsx","src/routes/lessons/$date.tsx"]
---

# Lessons

Scope: /lessons (ledger with the latest lesson open) and /lessons/$date (one lesson's sheet). Visitor mode: Read. Signed-in only: the lessons are the learner's own tutoring history.

Audience and job: Mike, before a tutoring session, re-reads the last lesson (homework, what was taught, the words) so he walks in prepared; at other times he goes back through one older lesson properly and drills it. Source is the lesson data only (meta, grammar notes, words, phrases), never the transcripts.

Constraints: inherit the app's world (PRODUCT.md; no DESIGN.md yet). Greek through GreekText and GrammarMark; no gamification, no progress theatre.

## Direction contract

THESIS: A teacher's lesson ledger beside the open notebook. Every lesson is one dated ruled row; the open lesson's sheet sits beside it, latest open by default. It refuses the course-dashboard card grid and the LMS module list with progress bars.

OWN-WORLD: The app's cream ground and stone ink, serif headings, hairline-ruled rows like the guide tables. The ledger's selected row takes a pale terracotta fill and a terracotta date (adapted from a leading-edge rule: the craft floor caps coloured side rules at 1px, too faint to mark the open row); links to guide sections use ocean text. Nouns carry their gender mark; the homework block is the one tinted panel on the sheet.

STORY: Mike opens Lessons and the latest lesson is already open: homework first, then what was taught (each note links to its guide section), then the words and phrases, then the drills for those sections. Any older lesson is one row away.

FIRST VIEWPORT: Desktop: a compact page title; left third the ledger (date, topic, a count line), the latest selected; right two thirds the sheet: date and topic as its heading, the homework panel, then the first grammar notes. Phone: the latest lesson's sheet leads, and the ledger follows below it.

FORM: Ledger and sheet, position 3 on the ranked list, seed key 884d3e68.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
