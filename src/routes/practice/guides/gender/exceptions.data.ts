import type { SimpleListItem } from "../../components/engines/deck";

/**
 * The ending sections of A noun's gender, with their exceptions mixed among regular
 * nouns. As in from-ending, the answer is the article alone.
 */
export const ITEMS: SimpleListItem[] = [
	{ id: "filos", context: "φίλος", label: "friend", greek: "ο" },
	{ id: "dromos", context: "δρόμος", label: "street, road", greek: "ο" },
	{ id: "pateras", context: "πατέρας", label: "father", greek: "ο" },
	{ id: "minas", context: "μήνας", label: "month", greek: "ο" },
	{ id: "mathitis", context: "μαθητής", label: "pupil", greek: "ο" },
	{ id: "kafes", context: "καφές", label: "coffee", greek: "ο" },
	{ id: "mitera", context: "μητέρα", label: "mother", greek: "η" },
	{ id: "thalassa", context: "θάλασσα", label: "sea", greek: "η" },
	{ id: "poli", context: "πόλη", label: "city, town", greek: "η" },
	{ id: "vivlio", context: "βιβλίο", label: "book", greek: "το" },
	{ id: "paidi", context: "παιδί", label: "child", greek: "το" },
	{ id: "onoma", context: "όνομα", label: "name", greek: "το" },
	{ id: "kypros", context: "Κύπρος", label: "Cyprus", greek: "η" },
	{ id: "aigyptos", context: "Αίγυπτος", label: "Egypt", greek: "η" },
	{ id: "rodos", context: "Ρόδος", label: "Rhodes", greek: "η" },
	{ id: "kleio", context: "Κλειώ", label: "Kleio, a name", greek: "η" },
	{ id: "froso", context: "Φρόσω", label: "Froso, a name", greek: "η" },
	{ id: "kreas", context: "κρέας", label: "meat", greek: "το" },
	{ id: "lathos", context: "λάθος", label: "mistake", greek: "το" },
	{ id: "meros", context: "μέρος", label: "place, part", greek: "το" },
	{ id: "dasos", context: "δάσος", label: "forest", greek: "το" },
	{ id: "gala", context: "γάλα", label: "milk", greek: "το" },
	{ id: "kafe", context: "καφέ", label: "café", greek: "το" },
];
