import type { SimpleListItem } from "../../components/engines/deck";

/**
 * The cue names the verb. After υπάρχει or υπάρχουν what exists keeps its plain form;
 * after έχει, which stays έχει for more than one, it takes the Target form. Only masculine
 * nouns show the difference in sound, so the pairs use them; the others test the verb.
 */
export const ITEMS: SimpleListItem[] = [
	{ id: "fournos", context: "υπάρχει", label: "There's a bakery near here.", greek: "Υπάρχει ένας φούρνος εδώ κοντά." },
	{
		id: "touristes-yparchei",
		context: "υπάρχει",
		label: "In summer there are lots of tourists.",
		greek: "Το καλοκαίρι υπάρχουν πολλοί τουρίστες.",
	},
	{
		id: "touristes-echei",
		context: "έχει",
		label: "In summer there are lots of tourists.",
		greek: "Το καλοκαίρι έχει πολλούς τουρίστες.",
	},
	{ id: "angloi-yparchei", context: "υπάρχει", label: "There are English people in Paphos.", greek: "Υπάρχουν Άγγλοι στην Πάφο." },
	{ id: "angloi-echei", context: "έχει", label: "There are English people in Paphos.", greek: "Έχει Άγγλους στην Πάφο." },
	{ id: "vivliopoleio", context: "υπάρχει", label: "There's a bookshop.", greek: "Υπάρχει ένα βιβλιοπωλείο." },
	{ id: "vivliothiki", context: "υπάρχει", label: "There's no library.", greek: "Δεν υπάρχει βιβλιοθήκη." },
	{ id: "parka", context: "υπάρχει", label: "There are many parks.", greek: "Υπάρχουν πολλά πάρκα." },
	{
		id: "katastimata",
		context: "υπάρχει",
		label: "There are some shops in the centre.",
		greek: "Υπάρχουν μερικά καταστήματα στο κέντρο.",
	},
	{ id: "fagito", context: "υπάρχει", label: "There's food on the fire.", greek: "Υπάρχει φαγητό πάνω στη φωτιά." },
	{ id: "tha-parka", context: "υπάρχει", label: "There will be many parks.", greek: "Θα υπάρχουν πολλά πάρκα." },
	{
		id: "ellines-yparchei",
		context: "υπάρχει",
		label: "There are lots of Greeks in London.",
		greek: "Υπάρχουν πολλοί Έλληνες στο Λονδίνο.",
	},
	{ id: "ellines-echei", context: "έχει", label: "There are lots of Greeks in London.", greek: "Έχει πολλούς Έλληνες στο Λονδίνο." },
	{
		id: "skyloi-yparchei",
		context: "υπάρχει",
		label: "There are lots of dogs in the park.",
		greek: "Υπάρχουν πολλοί σκύλοι στο πάρκο.",
	},
	{ id: "skyloi-echei", context: "έχει", label: "There are lots of dogs in the park.", greek: "Έχει πολλούς σκύλους στο πάρκο." },
	{ id: "gates", context: "υπάρχει", label: "There are lots of cats on the island.", greek: "Υπάρχουν πολλές γάτες στο νησί." },
	{
		id: "leoforeia",
		context: "έχει",
		label: "Are there buses to the airport?",
		greek: "Έχει λεωφορεία για το αεροδρόμιο;",
	},
	{ id: "taxi", context: "έχει", label: "There aren't any taxis.", greek: "Δεν έχει ταξί." },
	{ id: "farmakeio", context: "υπάρχει", label: "Is there a chemist's near here?", greek: "Υπάρχει φαρμακείο εδώ κοντά;" },
	{ id: "trapeza", context: "υπάρχει", label: "There isn't a bank in the village.", greek: "Δεν υπάρχει τράπεζα στο χωριό." },
];
