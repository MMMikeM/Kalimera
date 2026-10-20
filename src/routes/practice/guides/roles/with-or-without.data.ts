import type { SimpleListItem } from "../../components/engines/deck";

/**
 * Typing cannot test this, since the grader passes an answer without its article.
 * The pick is only whether one belongs; the feedback sentence shows which.
 */
const WITH = "with article";
const WITHOUT = "no article";

export const OPTIONS = [WITH, WITHOUT];

export const ITEMS: SimpleListItem[] = [
	{ id: "ellada-nisia", reverseGreek: "___ Ελλάδα έχει πολλά νησιά.", label: "Greece has a lot of islands.", greek: "Η Ελλάδα έχει πολλά νησιά.", dimension: WITH },
	{ id: "kypros-nisi", reverseGreek: "___ Κύπρος είναι νησί.", label: "Cyprus is an island.", greek: "Η Κύπρος είναι νησί.", dimension: WITH },
	{ id: "giannis-programmatistis", reverseGreek: "___ Γιάννης είναι προγραμματιστής.", label: "Yannis is a programmer.", greek: "Ο Γιάννης είναι προγραμματιστής.", dimension: WITH },
	{ id: "maria-lemeso", reverseGreek: "___ Μαρία μένει στη Λεμεσό.", label: "Maria lives in Limassol.", greek: "Η Μαρία μένει στη Λεμεσό.", dimension: WITH },
	{ id: "xereis-gianni", reverseGreek: "Ξέρεις ___ Γιάννη;", label: "Do you know Yannis?", greek: "Ξέρεις τον Γιάννη;", dimension: WITH },
	{ id: "agapi-tyfli", reverseGreek: "___ αγάπη είναι τυφλή.", label: "Love is blind.", greek: "Η αγάπη είναι τυφλή.", dimension: WITH },
	{ id: "ygeia", reverseGreek: "___ υγεία είναι σημαντική.", label: "Health is important.", greek: "Η υγεία είναι σημαντική.", dimension: WITH },
	{ id: "agapao-mousiki", reverseGreek: "Αγαπάω ___ μουσική.", label: "I love music.", greek: "Αγαπάω τη μουσική.", dimension: WITH },
	{ id: "gates-koimountai", reverseGreek: "___ γάτες κοιμούνται πολύ.", label: "Cats sleep a lot.", greek: "Οι γάτες κοιμούνται πολύ.", dimension: WITH },
	{ id: "aresei-kafes", reverseGreek: "Μου αρέσει ___ καφές.", label: "I like coffee.", greek: "Μου αρέσει ο καφές.", dimension: WITH },
	{ id: "aresoun-skyloi", reverseGreek: "Μου αρέσουν ___ σκύλοι.", label: "I like dogs.", greek: "Μου αρέσουν οι σκύλοι.", dimension: WITH },
	{ id: "savvato-thalassa", reverseGreek: "___ Σάββατο πάμε στη θάλασσα.", label: "On Saturday we're going to the sea.", greek: "Το Σάββατο πάμε στη θάλασσα.", dimension: WITH },
	{ id: "deftera-douleuo", reverseGreek: "___ Δευτέρα δουλεύω.", label: "On Monday I'm working.", greek: "Τη Δευτέρα δουλεύω.", dimension: WITH },
	{ id: "eimai-programmatistis", reverseGreek: "Είμαι ___ προγραμματιστής.", label: "I'm a programmer.", greek: "Είμαι προγραμματιστής.", dimension: WITHOUT },
	{ id: "nikos-giatros", reverseGreek: "Ο Νίκος είναι ___ γιατρός.", label: "Nikos is a doctor.", greek: "Ο Νίκος είναι γιατρός.", dimension: WITHOUT },
	{ id: "kam-ilektrologos", reverseGreek: "Ο Καμ είναι ___ ηλεκτρολόγος.", label: "Kam is an electrician.", greek: "Ο Καμ είναι ηλεκτρολόγος.", dimension: WITHOUT },
	{ id: "gino-giatros", reverseGreek: "Θέλω να γίνω ___ γιατρός.", label: "I want to become a doctor.", greek: "Θέλω να γίνω γιατρός.", dimension: WITHOUT },
	{ id: "eimaste-filoi", reverseGreek: "Είμαστε ___ φίλοι.", label: "We're friends.", greek: "Είμαστε φίλοι.", dimension: WITHOUT },
	{ id: "pino-kafe", reverseGreek: "Πίνω ___ καφέ κάθε πρωί.", label: "I drink coffee every morning.", greek: "Πίνω καφέ κάθε πρωί.", dimension: WITHOUT },
	{ id: "pineis-tsai", reverseGreek: "Πίνεις ___ τσάι;", label: "Do you drink tea?", greek: "Πίνεις τσάι;", dimension: WITHOUT },
	{ id: "kano-spor", reverseGreek: "Κάνω ___ σπορ.", label: "I do sport.", greek: "Κάνω σπορ.", dimension: WITHOUT },
	{ id: "paizo-podosfairo", reverseGreek: "Παίζω ___ ποδόσφαιρο.", label: "I play football.", greek: "Παίζω ποδόσφαιρο.", dimension: WITHOUT },
	{ id: "milao-ellinika", reverseGreek: "Μιλάω ___ ελληνικά.", label: "I speak Greek.", greek: "Μιλάω ελληνικά.", dimension: WITHOUT },
	{ id: "kathe-savvato", reverseGreek: "Κάθε ___ Σάββατο πίνουμε καφέ.", label: "Every Saturday we have coffee.", greek: "Κάθε Σάββατο πίνουμε καφέ.", dimension: WITHOUT },
	{ id: "kathe-deftera", reverseGreek: "Δουλεύω κάθε ___ Δευτέρα.", label: "I work every Monday.", greek: "Δουλεύω κάθε Δευτέρα.", dimension: WITHOUT },
];
