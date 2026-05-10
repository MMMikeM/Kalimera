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

export type Case = "nominative" | "accusative" | "genitive";
export type Gender = "masculine" | "feminine" | "neuter";
type Num = "singular" | "plural";
type Person = "first" | "second" | "third";

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
		colorText: "text-ocean-text",
	},
	accusative: {
		icon: Target,
		label: "ACC",
		longLabel: "accusative",
		colorText: "text-terracotta-text",
	},
	genitive: {
		icon: Link2,
		label: "GEN",
		longLabel: "genitive",
		colorText: "text-olive-text",
	},
};

export const GENDER_CHIP: Record<Gender, ChipSpec> = {
	masculine: {
		icon: Mars,
		label: "M",
		longLabel: "masculine",
		colorText: "text-navy-text",
	},
	feminine: {
		icon: Venus,
		label: "F",
		longLabel: "feminine",
		colorText: "text-sunset-text",
	},
	neuter: {
		icon: Circle,
		label: "N",
		longLabel: "neuter",
		colorText: "text-slate-text",
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

/** Saturated colour variants for large serif prompts — the -text tokens read
 *  dull at 44px. These keep the palette but push chroma up for hero display. */
export const HERO_TEXT: {
	gender: Record<Gender, string>;
	case: Record<Case, string>;
	number: Record<Num, string>;
	person: Record<Person, string>;
} = {
	gender: {
		masculine: "text-navy-700",
		feminine: "text-sunset-700",
		neuter: "text-slate-600",
	},
	case: {
		nominative: "text-ocean-700",
		accusative: "text-terracotta-700",
		genitive: "text-olive-700",
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
	nominative: { bar: "bg-ocean", bg: "bg-ocean-100" },
	accusative: { bar: "bg-terracotta", bg: "bg-terracotta-100" },
	genitive: { bar: "bg-olive", bg: "bg-olive-100" },
};
