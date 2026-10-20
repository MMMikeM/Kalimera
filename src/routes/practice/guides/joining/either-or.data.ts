import type { SimpleListItem } from "../../components/engines/deck";

/** ή (or) and η (the) sound the same, so only a pick can test the accent. */
export const OPTIONS = ["ή", "η"];

export const ITEMS: SimpleListItem[] = [
	{ id: "kafe-tsai", reverseGreek: "Καφέ ___ τσάι;", label: "Coffee or tea?", greek: "Καφέ ή τσάι;", dimension: "ή" },
	{ id: "simera-avrio", reverseGreek: "___ σήμερα ή αύριο.", label: "Either today or tomorrow.", greek: "Ή σήμερα ή αύριο.", dimension: "ή" },
	{ id: "pantremenos", reverseGreek: "Είσαι παντρεμένος ___ ελεύθερος;", label: "Are you married or single?", greek: "Είσαι παντρεμένος ή ελεύθερος;", dimension: "ή" },
	{ id: "nero-xymo", reverseGreek: "Θέλεις νερό ___ χυμό;", label: "Do you want water or juice?", greek: "Θέλεις νερό ή χυμό;", dimension: "ή" },
	{ id: "nai-oxi", reverseGreek: "Ναι ___ όχι;", label: "Yes or no?", greek: "Ναι ή όχι;", dimension: "ή" },
	{ id: "tora-pote", reverseGreek: "Ή τώρα ___ ποτέ.", label: "Now or never.", greek: "Ή τώρα ή ποτέ.", dimension: "ή" },
	{ id: "treis-tesseris", reverseGreek: "Έρχομαι τρεις ___ τέσσερις φορές τον μήνα.", label: "I come three or four times a month.", greek: "Έρχομαι τρεις ή τέσσερις φορές τον μήνα.", dimension: "ή" },
	{ id: "nosokomeia", reverseGreek: "Για την υγεία μας πάμε στα νοσοκομεία ___ στα φαρμακεία.", label: "For our health we go to hospitals or chemists.", greek: "Για την υγεία μας πάμε στα νοσοκομεία ή στα φαρμακεία.", dimension: "ή" },
	{ id: "sxoleia", reverseGreek: "Για την εκπαίδευσή μας πάμε ___ στα σχολεία ή στα πανεπιστήμια.", label: "For our education we go either to schools or to universities.", greek: "Για την εκπαίδευσή μας πάμε ή στα σχολεία ή στα πανεπιστήμια.", dimension: "ή" },
	{ id: "maria-eleni", reverseGreek: "Θα έρθει η Μαρία ___ η Ελένη;", label: "Will Maria or Eleni come?", greek: "Θα έρθει η Μαρία ή η Ελένη;", dimension: "ή" },
	{ id: "podia-leoforeio", reverseGreek: "Πάμε με τα πόδια ___ με το λεωφορείο;", label: "Shall we walk or take the bus?", greek: "Πάμε με τα πόδια ή με το λεωφορείο;", dimension: "ή" },
	{ id: "thalassa-vouno", reverseGreek: "___ θάλασσα ή το βουνό;", label: "The sea or the mountains?", greek: "Η θάλασσα ή το βουνό;", dimension: "η" },
	{ id: "megali-mikri", reverseGreek: "Ποια θέλεις, ___ μεγάλη ή η μικρή;", label: "Which one do you want, the big one or the small one?", greek: "Ποια θέλεις, η μεγάλη ή η μικρή;", dimension: "η" },
	{ id: "pou-stasi", reverseGreek: "Πού είναι ___ στάση;", label: "Where is the stop?", greek: "Πού είναι η στάση;", dimension: "η" },
	{ id: "irthe-eleni", reverseGreek: "Ήρθε ___ Ελένη;", label: "Has Eleni arrived?", greek: "Ήρθε η Ελένη;", dimension: "η" },
	{ id: "trapeza", reverseGreek: "Τι ώρα ανοίγει ___ τράπεζα;", label: "What time does the bank open?", greek: "Τι ώρα ανοίγει η τράπεζα;", dimension: "η" },
	{ id: "tainia", reverseGreek: "Τι ώρα αρχίζει ___ ταινία;", label: "What time does the film start?", greek: "Τι ώρα αρχίζει η ταινία;", dimension: "η" },
	{ id: "mama-tsai", reverseGreek: "___ μαμά μου θέλει τσάι, όχι καφέ.", label: "My mum wants tea, not coffee.", greek: "Η μαμά μου θέλει τσάι, όχι καφέ.", dimension: "η" },
];
