import type { DrillForm } from "../components/engines/deck";

type PlacementCategory = "with-verb" | "after-command";

export interface PlacementItem extends DrillForm {
	context: string;
	detail?: string;
	category: PlacementCategory;
	pairId?: string;
}

/**
 * Weak object pronouns sit immediately before the verb; θα, να and δεν sit outside
 * that pair and move nothing. Commands are the one exception — there the pronoun
 * follows the verb.
 *
 * Every card hands the learner the words in `context`, so the only thing they can get
 * wrong is the order. Statements and commands come in minimal pairs sharing a verb and
 * a pronoun, so the contrast is the lesson.
 *
 * να clauses live in the modal-verbs drill; this one uses θα so the two do not overlap.
 */
export const PLACEMENTS: PlacementItem[] = [
	{
		id: "koitazei-me",
		greek: "Με κοιτάζει",
		context: "κοιτάζει · με",
		label: "He's looking at me",
		category: "with-verb",
	},
	{
		id: "koita-me",
		greek: "Κοίτα με",
		context: "κοίτα · με",
		label: "Look at me!",
		category: "after-command",
		pairId: "koitazei-me",
	},

	{
		id: "akouei-mas",
		greek: "Μας ακούει",
		context: "ακούει · μας",
		label: "He hears us",
		category: "with-verb",
	},
	{
		id: "akouse-mas",
		greek: "Άκουσέ μας",
		context: "άκουσε · μας",
		label: "Listen to us!",
		category: "after-command",
		pairId: "akouei-mas",
	},

	{
		id: "vriskei-ton",
		greek: "Τον βρίσκει",
		context: "βρίσκει · τον",
		label: "She finds him",
		category: "with-verb",
	},
	{
		id: "vres-ton",
		greek: "Βρες τον",
		context: "βρες · τον",
		label: "Find him!",
		category: "after-command",
		pairId: "vriskei-ton",
	},

	{
		id: "perimenei-tin",
		greek: "Την περιμένει",
		context: "περιμένει · την",
		label: "He's waiting for her",
		category: "with-verb",
	},
	{
		id: "perimene-tin",
		greek: "Περίμενέ την",
		context: "περίμενε · την",
		label: "Wait for her!",
		category: "after-command",
		pairId: "perimenei-tin",
	},

	{
		id: "pairnei-to",
		greek: "Το παίρνει",
		context: "παίρνει · το",
		label: "He's taking it",
		category: "with-verb",
	},
	{
		id: "pare-to",
		greek: "Πάρε το",
		context: "πάρε · το",
		label: "Take it!",
		category: "after-command",
		pairId: "pairnei-to",
	},

	{
		id: "fernei-ta",
		greek: "Τα φέρνει",
		context: "φέρνει · τα",
		label: "She's bringing them",
		category: "with-verb",
	},
	{
		id: "fere-ta",
		greek: "Φέρε τα",
		context: "φέρε · τα",
		label: "Bring them!",
		category: "after-command",
		pairId: "fernei-ta",
	},

	{
		id: "tha-koitaxei-me",
		greek: "Θα με κοιτάξει",
		context: "θα · κοιτάξει · με",
		label: "He will look at me",
		detail: "θα changes nothing",
		category: "with-verb",
	},
	{
		id: "tha-vrei-mas",
		greek: "Θα μας βρει",
		context: "θα · βρει · μας",
		label: "He will find us",
		detail: "θα changes nothing",
		category: "with-verb",
	},

	{
		id: "den-akouei-me",
		greek: "Δεν με ακούει",
		context: "δεν · ακούει · με",
		label: "He doesn't hear me",
		detail: "δεν changes nothing",
		category: "with-verb",
	},
	{
		id: "den-pairnei-to",
		greek: "Δεν το παίρνει",
		context: "δεν · παίρνει · το",
		label: "He isn't taking it",
		detail: "δεν changes nothing",
		category: "with-verb",
	},
	{
		id: "den-fernei-ta",
		greek: "Δεν τα φέρνει",
		context: "δεν · φέρνει · τα",
		label: "She isn't bringing them",
		detail: "δεν changes nothing",
		category: "with-verb",
	},
];

export const PLACEMENT_CATEGORIES = [
	{ id: "with-verb", label: "With the verb" },
	{ id: "after-command", label: "After a command" },
];
