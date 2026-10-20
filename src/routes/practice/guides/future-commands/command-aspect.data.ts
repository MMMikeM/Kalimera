import type { SimpleListItem } from "../../components/engines/deck";

/**
 * An English command does not show whether it is one action or a habit, so a card
 * that has no every day or always in it says which in brackets, as the section's
 * examples do.
 */
export const ITEMS: SimpleListItem[] = [
	{ id: "fae-fagito", label: "Eat your food. (one action)", greek: "Φάε το φαγητό σου." },
	{ id: "troge-frouta", label: "Eat fruit every day.", greek: "Τρώγε φρούτα κάθε μέρα." },
	{ id: "pies-nero", label: "Have a little water. (one action)", greek: "Πιες λίγο νερό." },
	{ id: "pine-nero", label: "Drink plenty of water. (as a habit)", greek: "Πίνε πολύ νερό." },
	{ id: "pes-egine", label: "Tell me what happened. (one action)", greek: "Πες μου τι έγινε." },
	{ id: "lege", label: "Go on, keep talking!", greek: "Λέγε!" },
	{ id: "des-poios", label: "See who it is. (one action)", greek: "Δες ποιος είναι." },
	{ id: "vlepe-tainies", label: "Watch Greek films. (as a habit)", greek: "Βλέπε ελληνικές ταινίες." },
	{ id: "vges-exo", label: "Go outside. (one action)", greek: "Βγες έξω." },
	{ id: "vgaine-sychna", label: "Go out more often.", greek: "Βγαίνε πιο συχνά." },
	{ id: "dose-alati", label: "Give me the salt. (one action)", greek: "Δώσε μου το αλάτι." },
	{ id: "dine-gata", label: "Give the cat food every day.", greek: "Δίνε φαγητό στη γάτα κάθε μέρα.", acceptAlso: "Δίνε στη γάτα φαγητό κάθε μέρα." },
	{ id: "fere-nero", label: "Bring me a glass of water. (one action)", greek: "Φέρε μου ένα ποτήρι νερό." },
	{ id: "ferne-psomi", label: "Bring bread every morning.", greek: "Φέρνε ψωμί κάθε πρωί.", acceptAlso: "Φέρνε κάθε πρωί ψωμί." },
	{ id: "grapse-onoma", label: "Write your name. (one action)", greek: "Γράψε το όνομά σου." },
	{ id: "grafe-mou", label: "Write to me. (keep in touch)", greek: "Γράφε μου!" },
	{ id: "diavase-afto", label: "Read this. (one action)", greek: "Διάβασε αυτό." },
	{ id: "diavaze-kathe-mera", label: "Read every day.", greek: "Διάβαζε κάθε μέρα." },
	{ id: "pare-kommati", label: "Take a piece. (one action)", greek: "Πάρε ένα κομμάτι." },
	{ id: "pairne-farmaka", label: "Take your medicine every morning.", greek: "Παίρνε τα φάρμακά σου κάθε πρωί." },
];
