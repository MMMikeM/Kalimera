import type { SimpleListItem } from "../components/engines/deck";

// του/της/τους wear the same costume in three different jobs. The neighbouring
// word is the only tell, so every phrase here is built to make that neighbour
// do the deciding — many are minimal pairs (το όνομά του / το όνομα του σκύλου).

export type Role = "possessive" | "article" | "object";

interface ContrastPhrase extends SimpleListItem {
	dimension: Role;
}

export const PHRASES: ContrastPhrase[] = [
	// ── Points back: noun + weak pronoun ────────────────────────────────────────
	{
		id: "o-pateras-tou",
		greek: "ο πατέρας του",
		english: "his father",
		label: "his father",
		dimension: "possessive",
	},
	{
		id: "i-adelfi-tis",
		greek: "η αδελφή της",
		english: "her sister",
		label: "her sister",
		dimension: "possessive",
	},
	{
		id: "to-spiti-tous",
		greek: "το σπίτι τους",
		english: "their house",
		label: "their house",
		dimension: "possessive",
	},
	{
		id: "to-onoma-tou",
		greek: "το όνομά του",
		english: "his name",
		label: "his name",
		dimension: "possessive",
	},
	{
		id: "oi-goneis-mas",
		greek: "οι γονείς μας",
		english: "our parents",
		label: "our parents",
		dimension: "possessive",
	},
	{
		id: "ta-paidia-tous",
		greek: "τα παιδιά τους",
		english: "their children",
		label: "their children",
		dimension: "possessive",
	},
	{
		id: "i-giagia-tis",
		greek: "η γιαγιά της",
		english: "her grandmother",
		label: "her grandmother",
		dimension: "possessive",
	},
	{
		id: "o-skylos-mou",
		greek: "ο σκύλος μου",
		english: "my dog",
		label: "my dog",
		dimension: "possessive",
	},

	// ── Points forward: noun + genitive article + genitive noun ─────────────────
	{
		id: "o-pateras-tou-paidiou",
		greek: "ο πατέρας του παιδιού",
		english: "the child's father",
		label: "the child's father",
		dimension: "article",
	},
	{
		id: "i-adelfi-tis-miteras",
		greek: "η αδελφή της μητέρας",
		english: "the mother's sister",
		label: "the mother's sister",
		dimension: "article",
	},
	{
		id: "to-spiti-ton-paidion",
		greek: "το σπίτι των παιδιών",
		english: "the children's house",
		label: "the children's house",
		dimension: "article",
	},
	{
		id: "to-onoma-tou-skylou",
		greek: "το όνομα του σκύλου",
		english: "the dog's name",
		label: "the dog's name",
		dimension: "article",
	},
	{
		id: "oi-filoi-tou-adelfou",
		greek: "οι φίλοι του αδελφού",
		english: "the brother's friends",
		label: "the brother's friends",
		dimension: "article",
	},
	{
		id: "i-giagia-tou-filou",
		greek: "η γιαγιά του φίλου",
		english: "the friend's grandmother",
		label: "the friend's grandmother",
		dimension: "article",
	},
	{
		id: "ta-vivlia-ton-paidion",
		greek: "τα βιβλία των παιδιών",
		english: "the children's books",
		label: "the children's books",
		dimension: "article",
	},
	{
		id: "i-porta-tou-spitiou",
		greek: "η πόρτα του σπιτιού",
		english: "the door of the house",
		label: "the door of the house",
		dimension: "article",
	},

	// ── Goes with the verb: weak pronoun + verb ─────────────────────────────────
	{
		id: "tou-milao",
		greek: "του μιλάω",
		english: "I talk to him",
		label: "I talk to him",
		dimension: "object",
	},
	{
		id: "tis-dino-to-vivlio",
		greek: "της δίνω το βιβλίο",
		english: "I give her the book",
		label: "I give her the book",
		dimension: "object",
	},
	{
		id: "tou-leo-tin-alitheia",
		greek: "του λέω την αλήθεια",
		english: "I tell him the truth",
		label: "I tell him the truth",
		dimension: "object",
	},
	{
		id: "tis-tilefonao",
		greek: "της τηλεφωνάω",
		english: "I phone her",
		label: "I phone her",
		dimension: "object",
	},
	{
		id: "mas-aresei",
		greek: "μας αρέσει",
		english: "we like it",
		label: "we like it",
		dimension: "object",
	},
	{
		id: "sou-dino-to-kleidi",
		greek: "σου δίνω το κλειδί",
		english: "I give you the key",
		label: "I give you the key",
		dimension: "object",
	},
	{
		id: "sas-deichno-to-spiti",
		greek: "σας δείχνω το σπίτι",
		english: "I show you the house",
		label: "I show you the house",
		dimension: "object",
	},
	{
		id: "tous-milao",
		greek: "τους μιλάω",
		english: "I talk to them",
		label: "I talk to them",
		dimension: "object",
	},
];
