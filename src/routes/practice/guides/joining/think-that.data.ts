import type { SimpleListItem } from "../../components/engines/deck";

/** The ότι cards gap νομίζω or πιστεύω too, so leaving out ότι, as English drops that, fails. */
export const ITEMS: SimpleListItem[] = [
	{ id: "nomizo-kalo", context: "___ είναι καλό.", label: "I think it's good.", greek: "νομίζω ότι", acceptAlso: "νομίζω πως" },
	{ id: "nomizo-vrexei", context: "___ βρέχει.", label: "I think it's raining.", greek: "νομίζω ότι", acceptAlso: "νομίζω πως" },
	{ id: "nomizo-kleisto", context: "___ είναι κλειστό.", label: "I think it's closed.", greek: "νομίζω ότι", acceptAlso: "νομίζω πως" },
	{ id: "nomizo-pafo", context: "___ μένει στην Πάφο.", label: "I think he lives in Paphos.", greek: "νομίζω ότι", acceptAlso: "νομίζω πως" },
	{ id: "pistevo-tha-erthei", context: "___ θα έρθει.", label: "I believe he'll come.", greek: "πιστεύω ότι", acceptAlso: "πιστεύω πως" },
	{ id: "pistevo-akrivo", context: "___ είναι πολύ ακριβό.", label: "I believe it's very expensive.", greek: "πιστεύω ότι", acceptAlso: "πιστεύω πως" },
	{ id: "pistevo-avrio", context: "___ θα πάμε αύριο.", label: "I believe we'll go tomorrow.", greek: "πιστεύω ότι", acceptAlso: "πιστεύω πως" },
	{ id: "etsi-nomizo", context: "Θα έρθει; ___.", label: "Is he coming? I think so.", greek: "έτσι νομίζω" },
	{ id: "isos-avrio", context: "___ αύριο.", label: "Maybe tomorrow.", greek: "ίσως" },
	{ id: "isos-pao", context: "___ πάω.", label: "Maybe I'll go.", greek: "ίσως" },
	{ id: "isos-den-pao", context: "___ δεν πάω.", label: "Maybe I won't go.", greek: "ίσως" },
	{ id: "isos-vrexei", context: "___ βρέξει αύριο.", label: "Maybe it will rain tomorrow.", greek: "ίσως" },
	{ id: "isos-kourasmenos", context: "___ είναι κουρασμένος.", label: "Maybe he's tired.", greek: "ίσως" },
	{ id: "mipos-ora", context: "___ ξέρεις τι ώρα είναι;", label: "Do you happen to know the time?", greek: "μήπως" },
	{ id: "mipos-stylo", context: "___ έχεις ένα στυλό;", label: "Do you have a pen, by any chance?", greek: "μήπως" },
	{ id: "mipos-kourasmenos", context: "___ είσαι κουρασμένος;", label: "Are you tired, by any chance?", greek: "μήπως" },
	{ id: "mipos-kafe", context: "___ θέλεις έναν καφέ;", label: "Would you like a coffee, by any chance?", greek: "μήπως" },
	{ id: "mipos-stasi", context: "___ ξέρετε πού είναι η στάση;", label: "Do you happen to know where the stop is?", greek: "μήπως" },
];
