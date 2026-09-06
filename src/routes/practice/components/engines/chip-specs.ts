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

import { caseScheme, genderScheme } from "@/constants/grammar-palette";
import type { Gender, NominalCase as Case } from "@/server/db/enums";

export type { Gender, NominalCase as Case } from "@/server/db/enums";

type Num = "singular" | "plural";
type Person = "first" | "second" | "third";

/**
 * The icon and the spoken name for one value of a grammar axis. Colour is
 * deliberately absent: it comes from the palette at the point of use, so a chip
 * and the Greek beside it cannot drift apart.
 */
interface ChipSpec {
	icon: LucideIcon;
	longLabel: string;
}

export const CASE_CHIP: Record<Case, ChipSpec> = {
	nominative: { icon: CircleDot, longLabel: "nominative" },
	accusative: { icon: Target, longLabel: "accusative" },
	genitive: { icon: Link2, longLabel: "genitive" },
};

export const GENDER_CHIP: Record<Gender, ChipSpec> = {
	masculine: { icon: Mars, longLabel: "masculine" },
	feminine: { icon: Venus, longLabel: "feminine" },
	neuter: { icon: Circle, longLabel: "neuter" },
};

export const NUMBER_CHIP: Record<Num, ChipSpec> = {
	singular: { icon: Dot, longLabel: "singular" },
	plural: { icon: MoreHorizontal, longLabel: "plural" },
};

export const PERSON_CHIP: Record<Person, ChipSpec> = {
	first: { icon: User, longLabel: "first person" },
	second: { icon: UserCheck, longLabel: "second person" },
	third: { icon: Users, longLabel: "third person" },
};

/** Number and person are not global grammar axes, so they claim no role colour. */
const NUMBER_HERO = "text-stone-500";
const PERSON_HERO = "text-terracotta-700";

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
	number: { singular: NUMBER_HERO, plural: NUMBER_HERO },
	person: { first: PERSON_HERO, second: PERSON_HERO, third: PERSON_HERO },
};
