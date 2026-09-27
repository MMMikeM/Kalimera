# Add Domain Bridges to Content

Connect grammar and vocabulary to real-world Greek usage.

## Current state

- The cases page has one: "The endings, not the order, say who did what" (`src/routes/reference/components/cases-section.tsx`)
- Other reference and learn content teaches forms and patterns without connecting them to what the user can now do

## Target state

- **Sparse, genuine domain bridges** in reference and learn content. Once per topic section, not per item.
- Connect practice to the living language:
  - Verbs/aorist: "This is the default narrative tense -- every news headline uses it."
  - Conversations/food: "These phrases are sufficient for ordering at a taverna."
  - Pronouns: "You'll hear these in every single Greek conversation."
- **Infrequent enough to be genuinely interesting.** One per topic page. Not in drills: nothing in the drill flow could carry them without becoming noise.
- **Specific to what was actually learned**, not generic ("Learning Greek is great for your brain!").

## Files likely involved

- `src/routes/reference/tabs/*.content.llm` -- add domain bridge notes to content specs
- `src/routes/learn/conversations/content.llm` -- add capability markers
- Reference tab components -- render bridge text where appropriate

## Motivation framework

- Creates relatedness (SDT) -- connection to the living domain
- Genuine surprise activates prediction-error dopamine through real discovery
- At Stage 1, use sparingly -- the user doesn't have enough knowledge for most bridges to land yet
