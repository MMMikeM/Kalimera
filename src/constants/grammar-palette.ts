import type { Gender, NominalCase } from "@/server/db/enums";

import type { CaseName } from "./recognition";

/**
 * Semantic scheme keys for the reference card system.
 *
 * Keys name what the card IS — not what colour it uses. Rule: grammar-role
 * keys (case-*, gender-*) may only wrap Greek content whose grammatical
 * value matches. Misapplying a role key is a bug, not a style choice.
 *
 * Grammar roles resolve to reserved role tokens (`bg-case-nominative-*`,
 * `bg-gender-masculine-*`, …) defined in src/index.css. Functional keys
 * resolve to base-palette tokens.
 *
 * Local-axis keys (verb-*) encode page-local structural axes that do not
 * claim grammatical role. They use base-palette colours chosen not to
 * collide with global grammar tokens on the same page.
 */
export type GrammarScheme =
	| "case-nominative"
	| "case-accusative"
	| "case-genitive"
	| "gender-masculine"
	| "gender-feminine"
	| "gender-neuter"
	| "verb-active"
	| "verb-contracted"
	| "verb-deponent"
	| "decision"
	| "neutral";

interface SchemeClasses {
	bg: string;
	border: string;
	badgeBg: string;
	text: string;
	/** Saturated fill for progress bars and solid chips. */
	bar: string;
	/** Higher-chroma text for large serif display; the `-text` tokens read dull at 44px. */
	heroText: string;
}

export const SCHEME: Record<GrammarScheme, SchemeClasses> = {
	"case-nominative": {
		bg: "bg-case-nominative-100",
		border: "border-case-nominative-300",
		badgeBg: "bg-case-nominative-400",
		text: "text-case-nominative-text",
		bar: "bg-case-nominative-700",
		heroText: "text-case-nominative-700",
	},
	"case-accusative": {
		bg: "bg-case-accusative-100",
		border: "border-case-accusative-300",
		badgeBg: "bg-case-accusative-400",
		text: "text-case-accusative-text",
		bar: "bg-case-accusative-700",
		heroText: "text-case-accusative-700",
	},
	"case-genitive": {
		bg: "bg-case-genitive-100",
		border: "border-case-genitive-300",
		badgeBg: "bg-case-genitive-400",
		text: "text-case-genitive-text",
		bar: "bg-case-genitive-700",
		heroText: "text-case-genitive-700",
	},
	"gender-masculine": {
		bg: "bg-gender-masculine-100",
		border: "border-gender-masculine-200",
		badgeBg: "bg-gender-masculine-300",
		text: "text-gender-masculine-text",
		bar: "bg-gender-masculine-700",
		heroText: "text-gender-masculine-700",
	},
	"gender-feminine": {
		bg: "bg-gender-feminine-100",
		border: "border-gender-feminine-200",
		badgeBg: "bg-gender-feminine-300",
		text: "text-gender-feminine-text",
		bar: "bg-gender-feminine-700",
		heroText: "text-gender-feminine-700",
	},
	"gender-neuter": {
		bg: "bg-gender-neuter-100",
		border: "border-gender-neuter-200",
		badgeBg: "bg-gender-neuter-300",
		text: "text-gender-neuter-text",
		bar: "bg-gender-neuter-700",
		heroText: "text-gender-neuter-700",
	},
	"verb-active": {
		bg: "bg-navy-100",
		border: "border-navy-300",
		badgeBg: "bg-navy-300",
		text: "text-navy-text",
		bar: "bg-navy",
		heroText: "text-navy-700",
	},
	"verb-contracted": {
		bg: "bg-slate-100",
		border: "border-slate-300",
		badgeBg: "bg-slate-300",
		text: "text-slate-text",
		bar: "bg-slate",
		heroText: "text-slate-600",
	},
	"verb-deponent": {
		bg: "bg-sunset-100",
		border: "border-sunset-300",
		badgeBg: "bg-sunset-300",
		text: "text-sunset-text",
		bar: "bg-sunset",
		heroText: "text-sunset-700",
	},
	decision: {
		bg: "bg-honey-50",
		border: "border-honey-200",
		badgeBg: "bg-honey-200",
		text: "text-honey-text",
		bar: "bg-honey",
		heroText: "text-honey-700",
	},
	neutral: {
		bg: "bg-stone-50/60",
		border: "border-stone-200",
		badgeBg: "bg-stone-200",
		text: "text-stone-700",
		bar: "bg-stone-400",
		heroText: "text-stone-500",
	},
};

export const CASE_SCHEME: Record<CaseName, GrammarScheme> = {
	Nominative: "case-nominative",
	Accusative: "case-accusative",
	Genitive: "case-genitive",
};

export const GENDER_SCHEME: Record<Gender, GrammarScheme> = {
	masculine: "gender-masculine",
	feminine: "gender-feminine",
	neuter: "gender-neuter",
};

/**
 * The learner-facing name for each role case — the UI says Doer, the routes say
 * nominative. Defined here because naming a role is the same act as choosing its
 * token; `constants/drills` widens it with `mixed` and `null`.
 */
export const ROLE_SCHEME = {
	doer: "case-nominative",
	target: "case-accusative",
	owner: "case-genitive",
} as const satisfies Record<string, GrammarScheme>;

export type CaseRoleName = keyof typeof ROLE_SCHEME;

/**
 * The reference surface names cases in prose ("Nominative"); the drills and the
 * DB use the enum ("nominative"). This is the one bridge between the two, so no
 * call site has to rebuild it by string surgery.
 */
export const CASE_KEY: Record<CaseName, NominalCase> = {
	Nominative: "nominative",
	Accusative: "accusative",
	Genitive: "genitive",
};

/** The scheme for a case, keyed as the DB enum and the drill tree spell it. */
export const caseScheme = (c: NominalCase) => SCHEME[`case-${c}`];

/** The scheme for a gender. */
export const genderScheme = (g: Gender) => SCHEME[GENDER_SCHEME[g]];

// Step variants the base SCHEME does not carry, kept here so this file stays the
// only one naming a role token. Tailwind only sees literal class names, so these
// cannot be built from SCHEME.bg at the call site.

/** A paradigm panel tints a whole gender block: heavier border, washed fill. */
export const GENDER_PANEL: Record<Gender, { border: string; bg: string }> = {
	masculine: { border: "border-gender-masculine-300", bg: "bg-gender-masculine-100/40" },
	feminine: { border: "border-gender-feminine-300", bg: "bg-gender-feminine-100/40" },
	neuter: { border: "border-gender-neuter-300", bg: "bg-gender-neuter-100/40" },
};

/** The noun browser stacks rows, so it needs a heavier rule than `SCHEME.border`. */
export const GENDER_ROW_BORDER: Record<Gender, string> = {
	masculine: "border-gender-masculine-500",
	feminine: "border-gender-feminine-500",
	neuter: "border-gender-neuter-500",
};
