import type { SimpleListItem } from "../../components/engines/deck";

/**
 * The answer is the whole if-part or then-part, not αν alone, so the cards don't
 * share one answer. The gap keeps the comma in the Greek out of what is typed.
 */
export const ITEMS: SimpleListItem[] = [
	{ id: "an-vrexei", context: "___, δεν βγαίνω.", label: "If it rains, I don't go out.", greek: "αν βρέχει" },
	{ id: "an-theleis", context: "___, έλα μαζί μας.", label: "If you like, come with us.", greek: "αν θέλεις", acceptAlso: "αν θες" },
	{ id: "an-oxi", context: "___, τότε δεν ξέρω.", label: "If not, then I don't know.", greek: "αν όχι" },
	{ id: "an-peinas", context: "___, πάμε για φαγητό.", label: "If you're hungry, let's go and eat.", greek: "αν πεινάς" },
	{ id: "an-kanei-krio", context: "___, πάρε ένα μπουφάν.", label: "If it's cold, take a jacket.", greek: "αν κάνει κρύο" },
	{ id: "an-exei-ilio", context: "___, πάμε στη θάλασσα.", label: "If it's sunny, let's go to the sea.", greek: "αν έχει ήλιο" },
	{ id: "an-xereis", context: "___, πες μου.", label: "If you know, tell me.", greek: "αν ξέρεις" },
	{ id: "an-boreis", context: "___, έλα αύριο.", label: "If you can, come tomorrow.", greek: "αν μπορείς" },
	{ id: "an-dipsas", context: "___, πιες νερό.", label: "If you're thirsty, drink some water.", greek: "αν διψάς" },
	{ id: "an-vrexei-avrio", context: "___, δεν θα βγω.", label: "If it rains tomorrow, I won't go out.", greek: "αν βρέξει αύριο" },
	{ id: "an-ertheis", context: "___, θα πάμε για καφέ.", label: "If you come, we'll go for a coffee.", greek: "αν έρθεις" },
	{ id: "an-einai-akrivo", context: "___, δεν το παίρνω.", label: "If it's expensive, I won't take it.", greek: "αν είναι ακριβό" },
	{ id: "tote-den-vgaino", context: "Αν βρέχει, ___.", label: "If it rains, then I don't go out.", greek: "τότε δεν βγαίνω", acceptAlso: "τότε δε βγαίνω" },
	{ id: "tote-tha-pame", context: "Αν δεν έρθει, ___.", label: "If he doesn't come, then we'll go.", greek: "τότε θα πάμε" },
	{ id: "tote-menoume", context: "Αν κάνει κρύο, ___ σπίτι.", label: "If it's cold, then we'll stay at home.", greek: "τότε θα μείνουμε" },
	{ id: "tote-pame", context: "Αν είσαι έτοιμος, ___.", label: "If you're ready, then let's go.", greek: "τότε πάμε" },
];
