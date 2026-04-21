import type { Gender } from "@/db.server/enums";

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
}

export const SCHEME: Record<GrammarScheme, SchemeClasses> = {
	"case-nominative": {
		bg: "bg-case-nominative-100",
		border: "border-case-nominative-300",
		badgeBg: "bg-case-nominative-400",
		text: "text-case-nominative-text",
	},
	"case-accusative": {
		bg: "bg-case-accusative-100",
		border: "border-case-accusative-300",
		badgeBg: "bg-case-accusative-400",
		text: "text-case-accusative-text",
	},
	"case-genitive": {
		bg: "bg-case-genitive-100",
		border: "border-case-genitive-300",
		badgeBg: "bg-case-genitive-400",
		text: "text-case-genitive-text",
	},
	"gender-masculine": {
		bg: "bg-gender-masculine-100",
		border: "border-gender-masculine-200",
		badgeBg: "bg-gender-masculine-300",
		text: "text-gender-masculine-text",
	},
	"gender-feminine": {
		bg: "bg-gender-feminine-100",
		border: "border-gender-feminine-200",
		badgeBg: "bg-gender-feminine-300",
		text: "text-gender-feminine-text",
	},
	"gender-neuter": {
		bg: "bg-gender-neuter-100",
		border: "border-gender-neuter-200",
		badgeBg: "bg-gender-neuter-300",
		text: "text-gender-neuter-text",
	},
	"verb-active": {
		bg: "bg-navy-100",
		border: "border-navy-300",
		badgeBg: "bg-navy-300",
		text: "text-navy-text",
	},
	"verb-contracted": {
		bg: "bg-slate-100",
		border: "border-slate-300",
		badgeBg: "bg-slate-300",
		text: "text-slate-text",
	},
	"verb-deponent": {
		bg: "bg-sunset-100",
		border: "border-sunset-300",
		badgeBg: "bg-sunset-300",
		text: "text-sunset-text",
	},
	decision: {
		bg: "bg-honey-50",
		border: "border-honey-200",
		badgeBg: "bg-honey-200",
		text: "text-honey-text",
	},
	neutral: {
		bg: "bg-stone-50/60",
		border: "border-stone-200",
		badgeBg: "bg-stone-200",
		text: "text-stone-700",
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
