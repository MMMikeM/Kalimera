# GrammarTable Primitive Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace five independently-coded grammar tables with a single `GrammarTable` primitive, using the nouns-section visual language (coloured left-border row headers, gender-coloured column headers) as the standard.

**Architecture:** New `GrammarTable` component (tv() slots, data-driven) in `src/components/`. Four existing table components become thin typed wrappers; the fifth (local `ParadigmTable` in nouns-section) is renamed and rebuilt inline. The primitive owns layout and header styling; wrappers own data shaping and cell content.

**Tech Stack:** React, tailwind-variants (`tv()`), `cn()` from `~/lib/utils`, `SCHEME`/`GrammarScheme` from `@/constants/grammar-palette`.

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| **Create** | `src/components/GrammarTable.tsx` | Primitive: tv() slots, RowDef/ColumnDef types, shared constants |
| **Modify** | `src/routes/reference/components/CaseTable.tsx` | Thin wrapper: case×gender data → GrammarTable |
| **Modify** | `src/routes/reference/components/pronoun-paradigm-table.tsx` | Thin wrapper: pronoun data → GrammarTable (drop `colorClass` prop) |
| **Modify** | `src/routes/reference/components/pronouns-section.tsx` | Remove `colorClass` prop from call site |
| **Modify** | `src/routes/reference/components/nouns-section.tsx` | Rename local `ParadigmTable` → `NounEndingsTable`, rebuild on GrammarTable |
| **Modify** | `src/components/ParadigmTable.tsx` | Rebuild on GrammarTable, extract `VerbCell`, drop `compact`/`showHeaders` |
| **Modify** | `src/routes/reference/components/verbs-section.tsx` | Remove `showHeaders={true}` from call site |

---

## Task 1: Create GrammarTable primitive

**Files:**
- Create: `src/components/GrammarTable.tsx`

- [ ] **Step 1: Create the file**

```tsx
import type React from "react";
import { tv } from "tailwind-variants";

import { cn } from "@/lib/utils";
import { SCHEME, type GrammarScheme } from "@/constants/grammar-palette";

export interface ColumnDef {
	key: string;
	label: string;
	scheme?: GrammarScheme;
}

export interface RowDef {
	key: string;
	label: string;
	sublabel?: string;
	scheme?: GrammarScheme;
}

interface GrammarTableProps {
	columns: ColumnDef[];
	rows: RowDef[];
	cells: React.ReactNode[][];
	className?: string;
}

const grammarTable = tv({
	slots: {
		root: "w-full text-sm border-collapse",
		headerRow: "border-b border-stone-200",
		colHeader: "px-2 py-2 text-left text-xs font-medium text-stone-500",
		bodyRow: "border-b border-stone-100",
		rowHeader: "w-20 border-l-2 py-2 pl-2 pr-2 text-xs font-semibold",
		rowLabel: "block leading-tight",
		rowSublabel: "block text-[10px] font-normal opacity-70",
		cell: "px-2 py-2",
	},
});

export const CASE_ROW_DEFS: RowDef[] = [
	{ key: "nom", label: "Doer", sublabel: "Nominative", scheme: "case-nominative" },
	{ key: "acc", label: "Target", sublabel: "Accusative", scheme: "case-accusative" },
	{ key: "gen", label: "Owner", sublabel: "Genitive", scheme: "case-genitive" },
];

export const GENDER_COLUMN_DEFS: ColumnDef[] = [
	{ key: "masculine", label: "M", scheme: "gender-masculine" },
	{ key: "feminine", label: "F", scheme: "gender-feminine" },
	{ key: "neuter", label: "N", scheme: "gender-neuter" },
];

export const GrammarTable: React.FC<GrammarTableProps> = ({ columns, rows, cells, className }) => {
	const { root, headerRow, colHeader, bodyRow, rowHeader, rowLabel, rowSublabel, cell } =
		grammarTable();

	return (
		<table className={root({ class: className })}>
			<thead>
				<tr className={headerRow()}>
					<th className={colHeader({ class: "w-20" })} />
					{columns.map((col) => {
						const style = col.scheme ? SCHEME[col.scheme] : null;
						return (
							<th key={col.key} className={colHeader({ class: style?.text })}>
								{col.label}
							</th>
						);
					})}
				</tr>
			</thead>
			<tbody>
				{rows.map((row, ri) => {
					const style = row.scheme ? SCHEME[row.scheme] : null;
					const isLast = ri === rows.length - 1;
					return (
						<tr key={row.key} className={isLast ? "" : bodyRow()}>
							<td
								className={rowHeader({
									class: style
										? cn(style.bgSoft, style.border, style.text)
										: "border-transparent text-stone-500 font-normal",
								})}
							>
								<span className={rowLabel()}>{row.label}</span>
								{row.sublabel && <span className={rowSublabel()}>{row.sublabel}</span>}
							</td>
							{(cells[ri] ?? []).map((cellContent, ci) => (
								<td key={columns[ci]?.key ?? ci} className={cell()}>
									{cellContent}
								</td>
							))}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};
```

- [ ] **Step 2: Typecheck**

```bash
pnpm typecheck
```

Expected: passes (no consumers yet).

- [ ] **Step 3: Commit**

```bash
git add src/components/GrammarTable.tsx
git commit -m "feat(components): add GrammarTable primitive with tv() slots"
```

---

## Task 2: Rebuild CaseTable on GrammarTable

**Files:**
- Modify: `src/routes/reference/components/CaseTable.tsx`

External API unchanged (`CaseTable`, `CaseTableGrid`, `GenderData` type). Consumers (`adjectives-section.tsx`, `articles-section.tsx`) require no changes.

- [ ] **Step 1: Replace the file contents**

```tsx
import type React from "react";

import { GENDER_COLUMN_DEFS, CASE_ROW_DEFS, GrammarTable } from "@/components/GrammarTable";
import { MonoText } from "@/components/MonoText";
import { GENDER_SCHEME, SCHEME } from "@/constants/grammar-palette";
import type { Gender } from "@/db.server/enums";

export interface GenderData {
	masculine: { nom: string; acc: string; gen: string };
	feminine: { nom: string; acc: string; gen: string };
	neuter: { nom: string; acc: string; gen: string };
}

const GENDERS: Gender[] = ["masculine", "feminine", "neuter"];
const CASES = ["nom", "acc", "gen"] as const;

export const CaseTable: React.FC<{ label: string; data: GenderData }> = ({ label, data }) => {
	const cells = CASES.map((c) =>
		GENDERS.map((g) => (
			<MonoText size="sm" className={`font-semibold ${SCHEME[GENDER_SCHEME[g]].text}`}>
				{data[g][c]}
			</MonoText>
		)),
	);

	return (
		<div>
			<div className="mb-2 text-xs font-medium text-stone-600">{label}</div>
			<GrammarTable columns={GENDER_COLUMN_DEFS} rows={CASE_ROW_DEFS} cells={cells} />
		</div>
	);
};

export const CaseTableGrid: React.FC<{ data: { singular: GenderData; plural: GenderData } }> = ({
	data,
}) => (
	<div className="grid gap-4 md:grid-cols-2">
		<CaseTable label="Singular" data={data.singular} />
		<CaseTable label="Plural" data={data.plural} />
	</div>
);
```

- [ ] **Step 2: Typecheck**

```bash
pnpm typecheck
```

Expected: passes.

- [ ] **Step 3: Commit**

```bash
git add src/routes/reference/components/CaseTable.tsx
git commit -m "refactor(reference): rebuild CaseTable on GrammarTable primitive"
```

---

## Task 3: Rebuild PronounParadigmTable on GrammarTable

**Files:**
- Modify: `src/routes/reference/components/pronoun-paradigm-table.tsx`
- Modify: `src/routes/reference/components/pronouns-section.tsx` (remove `colorClass` prop)

`colorClass` prop is dropped. The header border colour it controlled is now irrelevant — GrammarTable's header is `border-b border-stone-200` for all unstyled rows.

- [ ] **Step 1: Replace pronoun-paradigm-table.tsx**

```tsx
import { GrammarTable, type ColumnDef, type RowDef } from "@/components/GrammarTable";
import { MonoText } from "@/components/MonoText";
import type { PronounForm, PronounParadigm } from "@/constants/pronouns";

const PRONOUN_COLUMNS: ColumnDef[] = [
	{ key: "singular", label: "Singular" },
	{ key: "plural", label: "Plural" },
];

const PronounCell = ({ form }: { form: PronounForm }) => (
	<div className="flex flex-col">
		<MonoText variant="highlighted" size="lg">
			{form.greek}
		</MonoText>
		<div className="flex items-baseline gap-1 text-xs text-stone-500">
			{form.alt && <span>({form.alt})</span>}
			<span>{form.english}</span>
		</div>
	</div>
);

interface PronounParadigmTableProps {
	data: PronounParadigm[];
	note?: string;
}

export const PronounParadigmTable = ({ data, note }: PronounParadigmTableProps) => {
	const rows: RowDef[] = data.map((row) => ({
		key: row.person,
		label: row.person,
	}));

	const cells = data.map((row) => [
		<PronounCell form={row.singular} />,
		<PronounCell form={row.plural} />,
	]);

	return (
		<div>
			<GrammarTable columns={PRONOUN_COLUMNS} rows={rows} cells={cells} />
			{note && <p className="mt-2 px-2 text-xs text-stone-500 italic">{note}</p>}
		</div>
	);
};
```

- [ ] **Step 2: Update pronouns-section.tsx — remove `colorClass` prop**

Find line 57 in `src/routes/reference/components/pronouns-section.tsx`:

```tsx
// Before
<PronounParadigmTable data={paradigm} colorClass={style.borderSoft} note={note} />

// After
<PronounParadigmTable data={paradigm} note={note} />
```

- [ ] **Step 3: Typecheck**

```bash
pnpm typecheck
```

Expected: passes.

- [ ] **Step 4: Commit**

```bash
git add src/routes/reference/components/pronoun-paradigm-table.tsx \
        src/routes/reference/components/pronouns-section.tsx
git commit -m "refactor(reference): rebuild PronounParadigmTable on GrammarTable, drop colorClass prop"
```

---

## Task 4: Rebuild NounEndingsTable in nouns-section

**Files:**
- Modify: `src/routes/reference/components/nouns-section.tsx`

The local `const ParadigmTable` (which shadows the global one) is renamed `NounEndingsTable` and rebuilt on `GrammarTable`. `CASE_META` stays — it's still used by `CaseGuide` and `DecisionGuide`. Only the table component changes.

- [ ] **Step 1: Add imports at top of nouns-section.tsx**

Add to the existing imports:

```tsx
import { CASE_ROW_DEFS, GrammarTable, type ColumnDef } from "@/components/GrammarTable";
import { GENDER_SCHEME } from "@/constants/grammar-palette";
```

- [ ] **Step 2: Replace the local ParadigmTable component**

Find the `const ParadigmTable = (...)` declaration (around line 189) and replace it entirely:

```tsx
const NounEndingsTable = ({
	paradigms,
	mode = "endings",
}: {
	paradigms: AgreementParadigm[];
	mode?: "endings" | "full";
}) => {
	const columns: ColumnDef[] = paradigms.map((p) => ({
		key: p.id,
		label: p.pattern,
		scheme: GENDER_SCHEME[p.gender],
	}));

	const cells = CASE_ROW_DEFS.map((_row, ri) => {
		const caseType = (["Nom", "Acc", "Gen"] as const)[ri]!;
		return paradigms.map((p) => {
			const value = mode === "endings" ? getEnding(p, caseType) : getFull(p, caseType);
			return (
				<MonoText size="sm" variant={p.gender}>
					{value}
				</MonoText>
			);
		});
	});

	return (
		<div className="-mx-4 overflow-x-auto px-4">
			<GrammarTable columns={columns} rows={CASE_ROW_DEFS} cells={cells} />
		</div>
	);
};
```

- [ ] **Step 3: Rename usages — replace `<ParadigmTable` with `<NounEndingsTable`**

Two call sites in the same file:

Around line 264:
```tsx
// Before
<ParadigmTable paradigms={paradigms} mode={mode} />
// After
<NounEndingsTable paradigms={paradigms} mode={mode} />
```

Around line 295:
```tsx
// Before
<ParadigmTable paradigms={paradigms} mode="endings" />
// After
<NounEndingsTable paradigms={paradigms} mode="endings" />
```

- [ ] **Step 4: Typecheck**

```bash
pnpm typecheck
```

Expected: passes.

- [ ] **Step 5: Commit**

```bash
git add src/routes/reference/components/nouns-section.tsx
git commit -m "refactor(reference): rename local ParadigmTable to NounEndingsTable, rebuild on GrammarTable"
```

---

## Task 5: Rebuild ParadigmTable (verbs) on GrammarTable

**Files:**
- Modify: `src/components/ParadigmTable.tsx`
- Modify: `src/routes/reference/components/verbs-section.tsx` (remove `showHeaders={true}`)

Removed props: `compact` (never used), `showHeaders` (always true — defaults to showing headers).
Kept props: `stem`, `meaning`, `infinitive`, `forms`, `fadeStem`, `formClassName`, `endingClassName`, `className`.
`VerbForm` and `ParadigmForms` types are preserved and still exported (used by `TenseNavigator.tsx`).

- [ ] **Step 1: Replace ParadigmTable.tsx**

```tsx
import type React from "react";

import { GrammarTable, type ColumnDef, type RowDef } from "@/components/GrammarTable";

export interface VerbForm {
	stem: string;
	ending: string;
}

export type ParadigmForms = {
	sg1: VerbForm | string;
	sg2: VerbForm | string;
	sg3: VerbForm | string;
	pl1: VerbForm | string;
	pl2: VerbForm | string;
	pl3: VerbForm | string;
};

interface ParadigmTableProps {
	stem?: string;
	meaning: string;
	infinitive?: string;
	forms: ParadigmForms;
	className?: string;
	formClassName?: string;
	endingClassName?: string;
	fadeStem?: boolean;
}

const PERSON_ROWS: RowDef[] = [
	{ key: "1st", label: "1st", sublabel: "I/we" },
	{ key: "2nd", label: "2nd", sublabel: "you/you" },
	{ key: "3rd", label: "3rd", sublabel: "s/he/they" },
];

const VERB_COLUMNS: ColumnDef[] = [
	{ key: "singular", label: "Singular" },
	{ key: "plural", label: "Plural" },
];

const VerbCell: React.FC<{
	form: VerbForm | string;
	fadeStem: boolean;
	formClassName: string;
	endingClassName: string;
}> = ({ form, fadeStem, formClassName, endingClassName }) => (
	<span className="font-mono text-sm sm:text-base">
		{typeof form === "string" ? (
			<span className={formClassName}>{form}</span>
		) : (
			<>
				<span className={fadeStem ? "text-stone-600" : "text-stone-700"}>{form.stem}</span>
				<span className={endingClassName}>{form.ending}</span>
			</>
		)}
	</span>
);

export const ParadigmTable: React.FC<ParadigmTableProps> = ({
	stem,
	meaning,
	infinitive,
	forms,
	className,
	formClassName = "text-stone-800 font-semibold",
	endingClassName = "text-terracotta font-bold",
	fadeStem = true,
}) => {
	const cells = [
		[forms.sg1, forms.pl1],
		[forms.sg2, forms.pl2],
		[forms.sg3, forms.pl3],
	].map((row) =>
		row.map((form) => (
			<VerbCell
				form={form}
				fadeStem={fadeStem}
				formClassName={formClassName}
				endingClassName={endingClassName}
			/>
		)),
	);

	return (
		<div className={className}>
			<div className="mb-2 px-1">
				<span className="font-mono text-lg font-semibold text-stone-800 sm:text-xl">
					{infinitive || (stem ? `${stem}-` : "")}
				</span>
				<span className="ml-2 text-sm text-stone-600 sm:text-base">({meaning})</span>
			</div>
			<GrammarTable columns={VERB_COLUMNS} rows={PERSON_ROWS} cells={cells} />
		</div>
	);
};
```

- [ ] **Step 2: Remove `showHeaders={true}` from verbs-section.tsx**

Find `src/routes/reference/components/verbs-section.tsx` around line 166 (inside `PatternSection`):

```tsx
// Before
<ParadigmTable
    stem={pattern.canonical.stem}
    meaning={pattern.canonical.meaning}
    infinitive={pattern.canonical.infinitive}
    forms={pattern.canonical.forms}
    endingClassName={`${style.text} font-bold`}
    showHeaders={true}
    fadeStem={true}
/>

// After
<ParadigmTable
    stem={pattern.canonical.stem}
    meaning={pattern.canonical.meaning}
    infinitive={pattern.canonical.infinitive}
    forms={pattern.canonical.forms}
    endingClassName={`${style.text} font-bold`}
    fadeStem={true}
/>
```

- [ ] **Step 3: Typecheck**

```bash
pnpm typecheck
```

Expected: passes (no remaining `showHeaders` or `compact` prop usages).

- [ ] **Step 4: Commit**

```bash
git add src/components/ParadigmTable.tsx \
        src/routes/reference/components/verbs-section.tsx
git commit -m "refactor(components): rebuild ParadigmTable on GrammarTable, extract VerbCell, drop compact/showHeaders"
```

---

## Task 6: Visual verification

- [ ] **Step 1: Start dev server**

```bash
make dev
```

- [ ] **Step 2: Check each table visually**

Open browser and verify all five table types render correctly:

| Route | What to check |
|-------|--------------|
| `/reference/articles` | CaseTableGrid — NOM/ACC/GEN rows with coloured left borders, M/F/N columns |
| `/reference/adjectives` | CaseTableGrid (same component, different data) |
| `/reference/pronouns` | PronounParadigmTable — person rows, highlighted Greek cells |
| `/reference/nouns` | NounEndingsTable — Doer/Target/Owner rows, pattern columns coloured by gender |
| `/reference/verbs` | ParadigmTable — 1st/2nd/3rd rows, stem+ending split cells |

- [ ] **Step 3: Final typecheck**

```bash
pnpm typecheck
```

Expected: passes clean.

- [ ] **Step 4: Final commit (if any fixups needed)**

```bash
git add -p
git commit -m "fix(reference): visual fixups after GrammarTable migration"
```
