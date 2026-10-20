import type { SimpleListItem } from "../../components/engines/deck";

/**
 * The groups in A noun's gender, "Guessing gender from the word". The answer is the
 * article alone, since the grader forgives a missing article: with the article in
 * the answer, typing the bare noun would pass.
 */
export const ITEMS: SimpleListItem[] = [
	{ id: "thesi", context: "θέση", label: "place, seat", greek: "η" },
	{ id: "apodeixi", context: "απόδειξη", label: "receipt", greek: "η" },
	{ id: "apopsi", context: "άποψη", label: "opinion", greek: "η" },
	{ id: "lexi", context: "λέξη", label: "word", greek: "η" },
	{ id: "stasi", context: "στάση", label: "stop", greek: "η" },
	{ id: "dieuthynsi", context: "διεύθυνση", label: "address", greek: "η" },
	{ id: "kratisi", context: "κράτηση", label: "booking", greek: "η" },
	{ id: "taftotita", context: "ταυτότητα", label: "identity card", greek: "η" },
	{ id: "poiotita", context: "ποιότητα", label: "quality", greek: "η" },
	{ id: "farmakeio", context: "φαρμακείο", label: "chemist's", greek: "το" },
	{ id: "anthopoleio", context: "ανθοπωλείο", label: "florist's", greek: "το" },
	{ id: "vivliopoleio", context: "βιβλιοπωλείο", label: "bookshop", greek: "το" },
	{ id: "pantopoleio", context: "παντοπωλείο", label: "grocer's", greek: "το" },
	{ id: "tachydromeio", context: "ταχυδρομείο", label: "post office", greek: "το" },
	{ id: "grafeio", context: "γραφείο", label: "office, desk", greek: "το" },
	{ id: "leoforeio", context: "λεωφορείο", label: "bus", greek: "το" },
	{ id: "ellada", context: "Ελλάδα", label: "Greece", greek: "η" },
	{ id: "kypros", context: "Κύπρος", label: "Cyprus (a country, despite -ος)", greek: "η" },
	{ id: "anglia", context: "Αγγλία", label: "England", greek: "η" },
	{ id: "germania", context: "Γερμανία", label: "Germany", greek: "η" },
	{ id: "italia", context: "Ιταλία", label: "Italy", greek: "η" },
	{ id: "kanadas", context: "Καναδάς", label: "Canada (the odd one out)", greek: "ο" },
	{ id: "ellinika", context: "ελληνικά", label: "Greek, the language", greek: "τα" },
	{ id: "anglika", context: "αγγλικά", label: "English, the language", greek: "τα" },
	{ id: "germanika", context: "γερμανικά", label: "German, the language", greek: "τα" },
	{ id: "proino", context: "πρωινό", label: "breakfast", greek: "το" },
	{ id: "mesimeriano", context: "μεσημεριανό", label: "lunch", greek: "το" },
	{ id: "vradino", context: "βραδινό", label: "dinner", greek: "το" },
];
