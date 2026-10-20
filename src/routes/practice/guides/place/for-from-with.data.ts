import type { SimpleListItem } from "../../components/engines/deck";

/** A Greek sentence with a gap and its English; the answer is για, από or με alone. */
export const ITEMS: SimpleListItem[] = [
	{ id: "psonia", context: "Πάω ___ ψώνια.", label: "I'm going shopping.", greek: "για" },
	{ id: "ypno", context: "Πάω ___ ύπνο.", label: "I'm off to bed.", greek: "για" },
	{ id: "kafe", context: "Πάμε ___ καφέ;", label: "Shall we go for a coffee?", greek: "για" },
	{ id: "fagito", context: "___ φαγητό πάμε στα εστιατόρια.", label: "For food we go to restaurants.", greek: "για" },
	{ id: "ygeia", context: "___ την υγεία μας πάμε στα νοσοκομεία.", label: "For our health we go to hospitals.", greek: "για" },
	{ id: "efcharisto", context: "Ευχαριστώ ___ τον καφέ.", label: "Thanks for the coffee.", greek: "για" },
	{ id: "doro", context: "Αυτό το δώρο είναι ___ σένα.", label: "This present is for you.", greek: "για" },
	{ id: "dyo-chronia", context: "Έμεινα στο Λονδίνο ___ δύο χρόνια.", label: "I stayed in London for two years.", greek: "για" },
	{ id: "evdomada", context: "Θα μείνουμε στην Πάφο ___ μια εβδομάδα.", label: "We'll stay in Paphos for a week.", greek: "για" },
	{ id: "notia-afriki", context: "Είμαι ___ τη Νότια Αφρική.", label: "I'm from South Africa.", greek: "από" },
	{ id: "spiti", context: "Δουλεύω ___ το σπίτι.", label: "I work from home.", greek: "από" },
	{ id: "anglia", context: "Η Μαρία είναι ___ την Αγγλία.", label: "Maria is from England.", greek: "από" },
	{ id: "treno", context: "Το τρένο έρχεται ___ την Αθήνα.", label: "The train is coming from Athens.", greek: "από" },
	{ id: "douleia", context: "Γύρισα ___ τη δουλειά.", label: "I got back from work.", greek: "από" },
	{ id: "aftokinito", context: "Πάω στη δουλειά ___ το αυτοκίνητο.", label: "I go to work by car.", greek: "με" },
	{ id: "leoforeio", context: "Πάμε ___ το λεωφορείο.", label: "We're going by bus.", greek: "με" },
	{ id: "filoi", context: "Βγαίνω ___ τους φίλους μου.", label: "I go out with my friends.", greek: "με" },
	{ id: "maria", context: "Πάω για καφέ ___ τη Μαρία.", label: "I'm going for a coffee with Maria.", greek: "με" },
	{ id: "gala", context: "Πίνω τον καφέ μου ___ γάλα.", label: "I take my coffee with milk.", greek: "με" },
	{ id: "molyvi", context: "Γράφω ___ μολύβι.", label: "I write with a pencil.", greek: "με" },
	{ id: "nosokomos", context: "Ο νοσοκόμος δουλεύει ___ τον γιατρό.", label: "The nurse works with the doctor.", greek: "με" },
];
