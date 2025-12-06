import type { NumberSeed } from "../../../types/seed";

export const NUMBERS: NumberSeed[] = [
	// Units (1-9)
	{ lemma: "ένα", value: 1 },
	{ lemma: "δύο", value: 2 },
	{ lemma: "τρία", value: 3 },
	{ lemma: "τέσσερα", value: 4 },
	{ lemma: "πέντε", value: 5 },
	{ lemma: "έξι", value: 6 },
	{ lemma: "επτά", value: 7 },
	{ lemma: "οκτώ", value: 8 },
	{ lemma: "εννέα", value: 9 },
	// Teens (10-19) - specific forms
	{ lemma: "δέκα", value: 10 },
	{ lemma: "έντεκα", value: 11 },
	{ lemma: "δώδεκα", value: 12 },
	{ lemma: "δεκατρία", value: 13 },
	{ lemma: "δεκατέσσερα", value: 14 },
	{ lemma: "δεκαπέντε", value: 15 },
	{ lemma: "δεκαέξι", value: 16 },
	{ lemma: "δεκαεπτά", value: 17 },
	{ lemma: "δεκαοκτώ", value: 18 },
	{ lemma: "δεκαεννέα", value: 19 },
	// Tens (20-90) - combine with units for 21-29, 31-39, etc.
	{ lemma: "είκοσι", value: 20 },
	{ lemma: "τριάντα", value: 30 },
	{ lemma: "σαράντα", value: 40 },
	{ lemma: "πενήντα", value: 50 },
	{ lemma: "εξήντα", value: 60 },
	{ lemma: "εβδομήντα", value: 70 },
	{ lemma: "ογδόντα", value: 80 },
	{ lemma: "ενενήντα", value: 90 },
	// Hundred
	{ lemma: "εκατό", value: 100 },
];
