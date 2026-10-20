import type { SimpleListItem } from "../../components/engines/deck";

/**
 * Masculine nouns only: theirs are the endings that change, so a plain form after
 * βλέπω, or a Target form after είμαι, fails.
 */
export const ITEMS: SimpleListItem[] = [
	{ id: "vlepo-giatro", context: "Βλέπω ___.", label: "I see the doctor.", greek: "τον γιατρό" },
	{ id: "vlepo-daskalo", context: "Βλέπω ___ κάθε μέρα.", label: "I see the teacher every day. (he)", greek: "τον δάσκαλο" },
	{ id: "vlepeis-odigo", context: "Βλέπεις ___;", label: "Can you see the driver?", greek: "τον οδηγό" },
	{ id: "vlepoume-ilektrologo", context: "Βλέπουμε ___ αύριο.", label: "We're seeing the electrician tomorrow.", greek: "τον ηλεκτρολόγο" },
	{ id: "vlepo-adelfo", context: "Βλέπω ___ μου.", label: "I see my brother.", greek: "τον αδελφό" },
	{ id: "vlepo-kipouro", context: "Βλέπω ___ στον κήπο.", label: "I see the gardener in the garden.", greek: "τον κηπουρό" },
	{ id: "vlepo-foititi", context: "Βλέπω ___ στο πανεπιστήμιο.", label: "I see the student at the university. (he)", greek: "τον φοιτητή" },
	{ id: "vlepo-mixaniko", context: "Δεν βλέπω ___.", label: "I can't see the engineer.", greek: "τον μηχανικό" },
	{ id: "vlepo-patera", context: "Βλέπω ___ μου κάθε Κυριακή.", label: "I see my father every Sunday.", greek: "τον πατέρα" },
	{ id: "eimai-giatros", context: "Είμαι ___.", label: "I'm a doctor.", greek: "γιατρός" },
	{ id: "kam-ilektrologos", context: "Ο Καμ είναι ___.", label: "Kam is an electrician.", greek: "ηλεκτρολόγος" },
	{ id: "nikos-daskalos", context: "Ο Νίκος είναι ___.", label: "Nikos is a teacher.", greek: "δάσκαλος" },
	{ id: "eisai-foititis", context: "Είσαι ___;", label: "Are you a student? (to a man)", greek: "φοιτητής" },
	{ id: "pateras-mixanikos", context: "Ο πατέρας μου είναι ___.", label: "My father is an engineer.", greek: "μηχανικός" },
	{ id: "giannis-odigos", context: "Ο Γιάννης είναι ___.", label: "Yannis is a driver.", greek: "οδηγός" },
	{ id: "eimai-pateras", context: "Είμαι ___.", label: "I'm a father.", greek: "πατέρας" },
	{ id: "gios-ginei-giatros", context: "Ο γιος μου θέλει να γίνει ___.", label: "My son wants to become a doctor.", greek: "γιατρός" },
	{ id: "thelo-gino-daskalos", context: "Θέλω να γίνω ___.", label: "I want to become a teacher.", greek: "δάσκαλος" },
	{ id: "adelfos-ginei-mixanikos", context: "Ο αδελφός μου θέλει να γίνει ___.", label: "My brother wants to become an engineer.", greek: "μηχανικός" },
	{ id: "tha-gineis-pateras", context: "Θα γίνεις ___!", label: "You're going to be a father!", greek: "πατέρας" },
];
