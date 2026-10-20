import type { SimpleListItem } from "../../components/engines/deck";

/**
 * Two short words before the verb: the person, then the thing. As in pronouns/placement,
 * the cue hands over every word, with the thing listed before the person, so order is
 * the only thing to get wrong.
 *
 * No answer starts with του or της, which the grader would forgive as an article, and no
 * card has τους for to them, which it hears as της. Commands are left out: δώσε μου το and
 * δώσ' το μου are both said.
 */
export const ITEMS: SimpleListItem[] = [
	{ id: "dinei-proi", context: "δίνει κάθε πρωί · το · μου", label: "He gives it to me every morning.", greek: "Μου το δίνει κάθε πρωί." },
	{ id: "ferno-avrio", context: "φέρνω αύριο · τα · σου", label: "I'll bring them to you tomorrow.", greek: "Σου τα φέρνω αύριο." },
	{
		id: "dosoume",
		context: "μπορούμε να δώσουμε · το · του",
		label: "Can we give it to him?",
		greek: "Μπορούμε να του το δώσουμε;",
	},
	{ id: "steilo", context: "θα στείλω · το · σου", label: "I'll send it to you.", greek: "Θα σου το στείλω." },
	{ id: "deixo-polite", context: "θα δείξω · το · σας", label: "I'll show it to you. (polite)", greek: "Θα σας το δείξω." },
	{
		id: "exigiseis",
		context: "μπορείς να εξηγήσεις · το · μου",
		label: "Can you explain it to me?",
		greek: "Μπορείς να μου το εξηγήσεις;",
	},
	{ id: "agoraso", context: "θα αγοράσω · τα · της", label: "I'll buy them for her.", greek: "Θα της τα αγοράσω." },
	{ id: "ferni-mera", context: "φέρνει κάθε μέρα · τα · μας", label: "He brings them to us every day.", greek: "Μας τα φέρνει κάθε μέρα." },
	{ id: "den-leo", context: "δεν λέω · το · του", label: "I'm not telling it to him.", greek: "Δεν του το λέω." },
	{ id: "dino-tora", context: "δίνω τώρα · το · σου", label: "I'm giving it to you now.", greek: "Σου το δίνω τώρα." },
	{ id: "theleis-deixo", context: "θέλεις να δείξω · το · σου", label: "Do you want me to show it to you?", greek: "Θέλεις να σου το δείξω;" },
	{ id: "dineis-ti", context: "δίνεις · τη · μου", label: "Can you pass it to me?", greek: "Μου τη δίνεις;" },
	{ id: "ferno-amesos", context: "φέρνω αμέσως · τον · σου", label: "I'll bring it to you right away.", greek: "Σου τον φέρνω αμέσως." },
	{ id: "doseis-tis", context: "θα δώσεις · τις · μου", label: "Will you give them to me?", greek: "Θα μου τις δώσεις;" },
	{ id: "pote-fereis", context: "πότε θα φέρεις · το · μας", label: "When will you bring it to us?", greek: "Πότε θα μας το φέρεις;" },
	{ id: "edose-chthes", context: "έδωσε χθες · το · μου", label: "He gave it to me yesterday.", greek: "Μου το έδωσε χθες." },
	{
		id: "den-dinoun",
		context: "δεν δίνουν · τα · μας",
		label: "They don't give them to us.",
		greek: "Δεν μας τα δίνουν.",
		acceptAlso: "Δε μας τα δίνουν.",
	},
	{ id: "diavaso", context: "θα διαβάσω · το · σου", label: "I'll read it to you.", greek: "Θα σου το διαβάσω." },
	{ id: "den-esteile", context: "δεν έστειλε · το · της", label: "He didn't send it to her.", greek: "Δεν της το έστειλε." },
];
