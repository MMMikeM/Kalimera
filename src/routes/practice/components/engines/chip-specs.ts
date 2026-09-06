import {
	Circle,
	CircleDot,
	Dot,
	Link2,
	type LucideIcon,
	Mars,
	MoreHorizontal,
	Target,
	User,
	UserCheck,
	Users,
	Venus,
} from "lucide-react";

import { SCHEME } from "@/constants/grammar-palette";

export type Case = "nominative" | "accusative" | "genitive";
export type Gender = "masculine" | "feminine" | "neuter";
type Num = "singular" | "plural";
type Person = "first" | "second" | "third";

/**
 * Case and gender colours come from the reserved role tokens, never from a
 * colour picked here. This file used to carry its own mapping — case to
 * ocean/terracotta/olive and gender to navy/sunset/slate — which put the same
 * navy on "masculine" in a drill and on "active verb" in the reference.
 *
 * Number and person are not global grammar axes and make no claim, so they
 * stay neutral.
 */
const caseScheme = (c: Case) => SCHEME[`case-${c}`];
const genderScheme = (g: Gender) => SCHEME[`gender-${g}`];

interface ChipSpec {
	icon: LucideIcon;
	label: string;
	longLabel: string;
	colorText: string;
}

export const CASE_CHIP: Record<Case, ChipSpec> = {
	nominative: {
		icon: CircleDot,
		label: "NOM",
		longLabel: "nominative",
		colorText: caseScheme("nominative").text,
	},
	accusative: {
		icon: Target,
		label: "ACC",
		longLabel: "accusative",
		colorText: caseScheme("accusative").text,
	},
	genitive: {
		icon: Link2,
		label: "GEN",
		longLabel: "genitive",
		colorText: caseScheme("genitive").text,
	},
};

export const GENDER_CHIP: Record<Gender, ChipSpec> = {
	masculine: {
		icon: Mars,
		label: "M",
		longLabel: "masculine",
		colorText: genderScheme("masculine").text,
	},
	feminine: {
		icon: Venus,
		label: "F",
		longLabel: "feminine",
		colorText: genderScheme("feminine").text,
	},
	neuter: {
		icon: Circle,
		label: "N",
		longLabel: "neuter",
		colorText: genderScheme("neuter").text,
	},
};

export const NUMBER_CHIP: Record<Num, ChipSpec> = {
	singular: {
		icon: Dot,
		label: "SG",
		longLabel: "singular",
		colorText: "text-muted-foreground",
	},
	plural: {
		icon: MoreHorizontal,
		label: "PL",
		longLabel: "plural",
		colorText: "text-muted-foreground",
	},
};

export const PERSON_CHIP: Record<Person, ChipSpec> = {
	first: {
		icon: User,
		label: "1ST",
		longLabel: "first person",
		colorText: "text-terracotta-text",
	},
	second: {
		icon: UserCheck,
		label: "2ND",
		longLabel: "second person",
		colorText: "text-terracotta-text",
	},
	third: {
		icon: Users,
		label: "3RD",
		longLabel: "third person",
		colorText: "text-terracotta-text",
	},
};

/** Saturated variants for large serif prompts — see `heroText` in the palette. */
export const HERO_TEXT: {
	gender: Record<Gender, string>;
	case: Record<Case, string>;
	number: Record<Num, string>;
	person: Record<Person, string>;
} = {
	gender: {
		masculine: genderScheme("masculine").heroText,
		feminine: genderScheme("feminine").heroText,
		neuter: genderScheme("neuter").heroText,
	},
	case: {
		nominative: caseScheme("nominative").heroText,
		accusative: caseScheme("accusative").heroText,
		genitive: caseScheme("genitive").heroText,
	},
	number: {
		singular: "text-stone-500",
		plural: "text-stone-500",
	},
	person: {
		first: "text-terracotta-700",
		second: "text-terracotta-700",
		third: "text-terracotta-700",
	},
};

export const CASE_BAR: Record<Case, { bar: string; bg: string }> = {
	nominative: { bar: caseScheme("nominative").bar, bg: caseScheme("nominative").bg },
	accusative: { bar: caseScheme("accusative").bar, bg: caseScheme("accusative").bg },
	genitive: { bar: caseScheme("genitive").bar, bg: caseScheme("genitive").bg },
};
