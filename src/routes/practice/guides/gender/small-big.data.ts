import type { SimpleListItem } from "../../components/engines/deck";

/**
 * A noun's gender, "Endings that make small or big". The label is the new word's meaning,
 * which settles whether it is small or big. The ending alone fixes the gender, so the
 * grader forgiving a missing article costs nothing.
 */
export const ITEMS: SimpleListItem[] = [
	{ id: "elefantaki", context: "ο ελέφαντας", label: "a little elephant", greek: "το ελεφαντάκι" },
	{ id: "dromaki", context: "ο δρόμος", label: "a little street, a lane", greek: "το δρομάκι" },
	{ id: "skylaki", context: "ο σκύλος", label: "a little dog", greek: "το σκυλάκι", acceptAlso: "ο σκυλάκος" },
	{ id: "gataki", context: "η γάτα", label: "a kitten", greek: "το γατάκι" },
	{ id: "balaki", context: "η μπάλα", label: "a little ball", greek: "το μπαλάκι" },
	{ id: "tsantaki", context: "η τσάντα", label: "a little bag", greek: "το τσαντάκι" },
	{ id: "krevataki", context: "το κρεβάτι", label: "a cot", greek: "το κρεβατάκι" },
	{ id: "spitaki", context: "το σπίτι", label: "a little house", greek: "το σπιτάκι" },
	{ id: "paidaki", context: "το παιδί", label: "a little child", greek: "το παιδάκι" },
	{ id: "potiraki", context: "το ποτήρι", label: "a little glass", greek: "το ποτηράκι" },
	{ id: "nisaki", context: "το νησί", label: "a little island", greek: "το νησάκι" },
	{ id: "poulaki", context: "το πουλί", label: "a little bird", greek: "το πουλάκι" },
	{ id: "psaraki", context: "το ψάρι", label: "a little fish", greek: "το ψαράκι" },
	{ id: "moraki", context: "το μωρό", label: "a tiny baby", greek: "το μωράκι" },
	{ id: "ypnakos", context: "ο ύπνος", label: "a nap", greek: "ο υπνάκος" },
	{ id: "fonara", context: "η φωνή", label: "a big, loud voice", greek: "η φωνάρα" },
	{ id: "mytara", context: "η μύτη", label: "a big nose", greek: "η μυτάρα" },
	{ id: "koilara", context: "η κοιλιά", label: "a big belly", greek: "η κοιλάρα" },
	{ id: "tainiara", context: "η ταινία", label: "a brilliant film (slang)", greek: "η ταινιάρα" },
];
