import type { DrillEntry } from "@/constants/drills";
import type { DrillLink } from "@/routes/practice/components/group-section";

export const BLOCK_DRILLS: DrillEntry[] = [
	{
		id: "blocks-chunks",
		to: "/practice/blocks/chunks",
		title: "Survival phrases",
		greek: "Γεια σου · Ευχαριστώ · Θα ήθελα",
		minutes: 1,
		category: "blocks",
		caseRole: null,
	},
	{
		id: "blocks-numbers",
		to: "/practice/blocks/numbers",
		title: "Numbers",
		greek: "ένα · δύο · δέκα · είκοσι · τριάντα",
		minutes: 1,
		category: "blocks",
		caseRole: null,
	},
	{
		id: "blocks-days-of-week",
		to: "/practice/blocks/days-of-week",
		title: "Days & time",
		greek: "Δευτέρα · Τρίτη · χτες · αύριο",
		minutes: 1,
		category: "blocks",
		caseRole: null,
	},
	{
		id: "blocks-opposites",
		to: "/practice/blocks/opposites",
		title: "Opposites",
		greek: "μεγάλος ↔ μικρός · μέρα ↔ νύχτα",
		minutes: 2,
		category: "blocks",
		caseRole: null,
	},
];

/**
 * Not a drill: a link to the question-words group, which has its own index and
 * its own six drills. It sits in the same list because that is where a learner
 * looks for it, but it records no attempts and so has no catalogue entry.
 */
export const QUESTION_WORDS_LINK: DrillLink = {
	id: "blocks-question-words",
	to: "/practice/blocks/question-words",
	title: "Question words",
	greek: "τι · ποιον καφέ · πόση ζάχαρη",
	minutes: 10,
};
