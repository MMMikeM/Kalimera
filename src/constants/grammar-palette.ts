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
 * Deferred: a dedicated local-axis palette for non-grammar-claiming
 * multi-value surfaces (verb pattern families, voice, sentence-construction
 * rows). Those consumers currently fall back to `neutral` as a placeholder —
 * see TODO(local-axis) markers. Introduce distinct scheme keys once the
 * signal loss is measured.
 */
export type GrammarScheme =
	| "case-nominative"
	| "case-accusative"
	| "case-genitive"
	| "gender-masculine"
	| "gender-feminine"
	| "gender-neuter"
	| "decision"
	| "neutral";

interface SchemeClasses {
	bg: string;
	bgSoft: string;
	bgMuted: string;
	border: string;
	borderSoft: string;
	badgeBg: string;
	text: string;
}

export const SCHEME: Record<GrammarScheme, SchemeClasses> = {
	"case-nominative": {
		bg: "bg-case-nominative-200",
		bgSoft: "bg-case-nominative-100",
		bgMuted: "bg-white",
		border: "border-case-nominative-400",
		borderSoft: "border-case-nominative-300",
		badgeBg: "bg-case-nominative-400",
		text: "text-case-nominative-text",
	},
	"case-accusative": {
		bg: "bg-case-accusative-200",
		bgSoft: "bg-case-accusative-100",
		bgMuted: "bg-white",
		border: "border-case-accusative-400",
		borderSoft: "border-case-accusative-300",
		badgeBg: "bg-case-accusative-400",
		text: "text-case-accusative-text",
	},
	"case-genitive": {
		bg: "bg-case-genitive-200",
		bgSoft: "bg-case-genitive-100",
		bgMuted: "bg-white",
		border: "border-case-genitive-400",
		borderSoft: "border-case-genitive-300",
		badgeBg: "bg-case-genitive-400",
		text: "text-case-genitive-text",
	},
	"gender-masculine": {
		bg: "bg-gender-masculine-200",
		bgSoft: "bg-gender-masculine-100",
		bgMuted: "bg-white",
		border: "border-gender-masculine-300",
		borderSoft: "border-gender-masculine-200",
		badgeBg: "bg-gender-masculine-300",
		text: "text-gender-masculine-text",
	},
	"gender-feminine": {
		bg: "bg-gender-feminine-200",
		bgSoft: "bg-gender-feminine-100",
		bgMuted: "bg-white",
		border: "border-gender-feminine-300",
		borderSoft: "border-gender-feminine-200",
		badgeBg: "bg-gender-feminine-300",
		text: "text-gender-feminine-text",
	},
	"gender-neuter": {
		bg: "bg-gender-neuter-200",
		bgSoft: "bg-gender-neuter-100",
		bgMuted: "bg-white",
		border: "border-gender-neuter-300",
		borderSoft: "border-gender-neuter-200",
		badgeBg: "bg-gender-neuter-300",
		text: "text-gender-neuter-text",
	},
	decision: {
		bg: "bg-honey-100",
		bgSoft: "bg-honey-50",
		bgMuted: "bg-white",
		border: "border-honey-300",
		borderSoft: "border-honey-200",
		badgeBg: "bg-honey-200",
		text: "text-honey-text",
	},
	neutral: {
		bg: "bg-stone-100",
		bgSoft: "bg-stone-50/60",
		bgMuted: "bg-white",
		border: "border-stone-300",
		borderSoft: "border-stone-200",
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
