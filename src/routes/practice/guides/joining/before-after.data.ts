import type { SimpleListItem } from "../../components/engines/deck";

/**
 * Before a noun πριν only usually adds από, so plain πριν passes there too, and
 * μετά από passes beside the μετά the guide teaches.
 */
export const ITEMS: SimpleListItem[] = [
	{ id: "prin-fao", context: "Πλένω τα χέρια μου ___ φάω.", label: "I wash my hands before I eat.", greek: "πριν" },
	{ id: "prin-ypno", context: "Διαβάζω ___ πάω για ύπνο.", label: "I read before I go to bed.", greek: "πριν" },
	{ id: "prin-vgo", context: "Πίνω καφέ ___ βγω.", label: "I have a coffee before I go out.", greek: "πριν" },
	{ id: "prin-ertheis", context: "Πάρε με τηλέφωνο ___ έρθεις.", label: "Ring me before you come.", greek: "πριν" },
	{ id: "prin-fame", context: "Θα πάμε για ψώνια ___ φάμε.", label: "We'll go shopping before we eat.", greek: "πριν" },
	{ id: "prin-sxoleio", context: "Τρώμε πρωινό ___ το σχολείο.", label: "We have breakfast before school.", greek: "πριν από", acceptAlso: "πριν" },
	{ id: "prin-douleia", context: "Πίνω καφέ ___ τη δουλειά.", label: "I have a coffee before work.", greek: "πριν από", acceptAlso: "πριν" },
	{ id: "prin-okto", context: "Έλα ___ τις οκτώ.", label: "Come before eight.", greek: "πριν από", acceptAlso: "πριν" },
	{ id: "prin-dyo-xronia", context: "Ήρθα στην Κύπρο ___ δύο χρόνια.", label: "I came to Cyprus two years ago.", greek: "πριν από", acceptAlso: "πριν" },
	{ id: "prin-mia-evdomada", context: "Τον είδα ___ μια εβδομάδα.", label: "I saw him a week ago.", greek: "πριν από", acceptAlso: "πριν" },
	{ id: "meta-sxoleio-parko", context: "___ το σχολείο πάμε στο πάρκο.", label: "After school we go to the park.", greek: "μετά", acceptAlso: "μετά από" },
	{ id: "meta-sxoleio-ekanes", context: "Τι έκανες ___ το σχολείο;", label: "What did you do after school?", greek: "μετά", acceptAlso: "μετά από" },
	{ id: "meta-douleia", context: "Πάμε για καφέ ___ τη δουλειά;", label: "Shall we go for a coffee after work?", greek: "μετά", acceptAlso: "μετά από" },
	{ id: "meta-fagito", context: "___ το φαγητό πίνουμε καφέ.", label: "After the meal we have coffee.", greek: "μετά", acceptAlso: "μετά από" },
	{ id: "meta-diakopes", context: "Τα λέμε ___ τις διακοπές.", label: "See you after the holidays.", greek: "μετά", acceptAlso: "μετά από" },
	{ id: "afou-fao-ypno", context: "___ φάω, θα πάω για ύπνο.", label: "After I eat, I'll go to bed.", greek: "αφού" },
	{ id: "afou-teleioso", context: "___ τελειώσω, θα σε πάρω τηλέφωνο.", label: "After I finish, I'll ring you.", greek: "αφού" },
	{ id: "afou-fao-vgo", context: "Θα βγω ___ φάω.", label: "I'll go out after I eat.", greek: "αφού" },
	{ id: "afou-pio", context: "___ πιω καφέ, θα ξεκινήσω.", label: "After I've had a coffee, I'll start.", greek: "αφού" },
];
