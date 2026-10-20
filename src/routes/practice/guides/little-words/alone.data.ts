import type { SimpleListItem } from "../../components/engines/deck";

/**
 * μόνος μου takes the gender and number of the person. The verb is given, so only the
 * μόνος phrase can go wrong. τους and σας are left out: the grader hears μόνοι τους as
 * μόνη της, and μόνοι σας as μόνη σας, which is also right for one woman addressed politely.
 */
export const ITEMS: SimpleListItem[] = [
	{ id: "work-m", context: "δουλεύω", label: "I work by myself. (a man)", greek: "Δουλεύω μόνος μου." },
	{ id: "she-works", context: "δουλεύει", label: "She works by herself.", greek: "Δουλεύει μόνη της." },
	{
		id: "you-dont-work-f",
		context: "δεν δουλεύεις",
		label: "You don't work by yourself. (to a woman)",
		greek: "Δεν δουλεύεις μόνη σου.",
		acceptAlso: "Δε δουλεύεις μόνη σου.",
	},
	{ id: "am-m", context: "είμαι", label: "I'm by myself. (a man)", greek: "Είμαι μόνος μου." },
	{ id: "am-f", context: "είμαι", label: "I'm by myself. (a woman)", greek: "Είμαι μόνη μου." },
	{ id: "we-mixed", context: "είμαστε", label: "We're by ourselves. (a man and a woman)", greek: "Είμαστε μόνοι μας." },
	{ id: "we-women", context: "είμαστε", label: "We're by ourselves. (all women)", greek: "Είμαστε μόνες μας." },
	{ id: "he-cooks", context: "μαγειρεύει", label: "He cooks by himself.", greek: "Μαγειρεύει μόνος του." },
	{ id: "child-eats", context: "το παιδί τρώει", label: "The child eats by itself.", greek: "Το παιδί τρώει μόνο του." },
	{ id: "did-it-f", context: "το έκανα", label: "I did it myself. (a woman)", greek: "Το έκανα μόνη μου." },
	{
		id: "can-you-m",
		context: "μπορείς να το κάνεις",
		label: "Can you do it by yourself? (to a man)",
		greek: "Μπορείς να το κάνεις μόνος σου;",
	},
	{ id: "she-travels", context: "ταξιδεύει", label: "She travels by herself.", greek: "Ταξιδεύει μόνη της." },
	{ id: "we-cook-women", context: "μαγειρεύουμε", label: "We cook by ourselves. (two women)", greek: "Μαγειρεύουμε μόνες μας." },
	{ id: "he-learns", context: "μαθαίνει ελληνικά", label: "He's learning Greek by himself.", greek: "Μαθαίνει ελληνικά μόνος του." },
	{
		id: "i-learn-f",
		context: "μαθαίνω ελληνικά",
		label: "I'm learning Greek by myself. (a woman)",
		greek: "Μαθαίνω ελληνικά μόνη μου.",
	},
	{ id: "door", context: "η πόρτα ανοίγει", label: "The door opens by itself.", greek: "Η πόρτα ανοίγει μόνη της." },
	{
		id: "computer",
		context: "ο υπολογιστής κλείνει",
		label: "The computer turns off by itself.",
		greek: "Ο υπολογιστής κλείνει μόνος του.",
	},
	{ id: "we-go-men", context: "πηγαίνουμε", label: "We go by ourselves. (two men)", greek: "Πηγαίνουμε μόνοι μας." },
	{ id: "made-it-f", context: "το έφτιαξες", label: "Did you make it yourself? (to a woman)", greek: "Το έφτιαξες μόνη σου;" },
	{ id: "light", context: "το φως σβήνει", label: "The light goes out by itself.", greek: "Το φως σβήνει μόνο του." },
];
