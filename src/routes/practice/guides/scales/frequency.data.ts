import type { SimpleListItem } from "../../components/engines/deck";

/** The answer is the rung alone; the sentence around the gap shows where it sits, before the verb. */
export const ITEMS: SimpleListItem[] = [
	{ id: "pote-kafe", context: "___ δεν πίνω καφέ.", label: "I never drink coffee.", greek: "ποτέ" },
	{ id: "pote-tileorasi", context: "___ δεν βλέπω τηλεόραση.", label: "I never watch TV.", greek: "ποτέ" },
	{ id: "schedon-pote-kreas", context: "___ δεν τρώω κρέας.", label: "I almost never eat meat.", greek: "σχεδόν ποτέ" },
	{ id: "schedon-pote-taxi", context: "___ δεν παίρνω ταξί.", label: "I almost never take a taxi.", greek: "σχεδόν ποτέ" },
	{ id: "spania-sinema", context: "___ πάω σινεμά.", label: "I rarely go to the cinema.", greek: "σπάνια" },
	{ id: "spania-mageirevo", context: "___ μαγειρεύω.", label: "I rarely cook.", greek: "σπάνια" },
	{ id: "pote-pote-exo", context: "___ τρώμε έξω.", label: "Now and then we eat out.", greek: "πότε πότε" },
	{ id: "pote-pote-spiti", context: "___ φεύγω από το σπίτι.", label: "Every now and then I leave the house.", greek: "πότε πότε" },
	{ id: "merikes-ypnako", context: "___ παίρνω έναν υπνάκο.", label: "Sometimes I take a nap.", greek: "μερικές φορές", acceptAlso: "καμιά φορά" },
	{ id: "merikes-thalassa", context: "___ πάμε στη θάλασσα.", label: "Sometimes we go to the beach.", greek: "μερικές φορές", acceptAlso: "καμιά φορά" },
	{ id: "sychna-tsai", context: "___ πίνω τσάι.", label: "I often drink tea.", greek: "συχνά" },
	{ id: "sychna-vrechei", context: "Τον χειμώνα ___ βρέχει.", label: "In winter it often rains.", greek: "συχνά" },
	{ id: "polles-thalassa", context: "Φέτος πήγαμε ___ στη θάλασσα.", label: "This year we went to the beach many times.", greek: "πολλές φορές" },
	{ id: "polles-tilefonisa", context: "Του τηλεφώνησα ___.", label: "I phoned him many times.", greek: "πολλές φορές" },
	{ id: "synithos-lidl", context: "Το πρωί ___ πάω στο Lidl για ψώνια.", label: "In the morning I usually go shopping at Lidl.", greek: "συνήθως" },
	{ id: "synithos-mesanychta", context: "___ κοιμάμαι τα μεσάνυχτα.", label: "I usually go to sleep at midnight.", greek: "συνήθως" },
	{ id: "schedon-panta-xypnao", context: "___ ξυπνάω στις οκτώ.", label: "I almost always wake up at eight.", greek: "σχεδόν πάντα" },
	{ id: "schedon-panta-leoforeio", context: "___ παίρνω το λεωφορείο.", label: "I almost always take the bus.", greek: "σχεδόν πάντα" },
	{ id: "panta-kafe", context: "___ πίνω καφέ το πρωί.", label: "I always drink coffee in the morning.", greek: "πάντα" },
	{ id: "panta-maria", context: "Η Μαρία ___ χαμογελάει.", label: "Maria always smiles.", greek: "πάντα" },
];
