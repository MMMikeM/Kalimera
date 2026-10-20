import type { SimpleListItem } from "../../components/engines/deck";

/**
 * πολύ and πολλή sound the same, and the grader also hears πολλή and πολλοί as one
 * answer, so the learner picks the spelling. ο πολύς χυμός is left out: the
 * masculine singular is rare.
 */
export const OPTIONS = ["πολύ", "πολλή", "πολλοί", "πολλούς", "πολλές", "πολλά"];

export const ITEMS: SimpleListItem[] = [
	{ id: "athina-oraia", reverseGreek: "Η Αθήνα είναι ___ ωραία.", label: "Athens is very nice.", greek: "Η Αθήνα είναι πολύ ωραία.", dimension: "πολύ" },
	{ id: "poly-kalo", reverseGreek: "Το φαγητό είναι ___ καλό.", label: "The food is very good.", greek: "Το φαγητό είναι πολύ καλό.", dimension: "πολύ" },
	{ id: "poly-kourasmenos", reverseGreek: "Είμαι ___ κουρασμένος.", label: "I'm very tired.", greek: "Είμαι πολύ κουρασμένος.", dimension: "πολύ" },
	{ id: "douleuo-poly", reverseGreek: "Δουλεύω ___.", label: "I work a lot.", greek: "Δουλεύω πολύ.", dimension: "πολύ" },
	{ id: "aresei-taxidevo", reverseGreek: "Μ' αρέσει ___ να ταξιδεύω.", label: "I really like travelling.", greek: "Μ' αρέσει πολύ να ταξιδεύω.", dimension: "πολύ" },
	{ id: "poly-nero", reverseGreek: "Πίνω ___ νερό το καλοκαίρι.", label: "I drink a lot of water in the summer.", greek: "Πίνω πολύ νερό το καλοκαίρι.", dimension: "πολύ" },
	{ id: "poly-gala", reverseGreek: "Ο Λουκάς πίνει ___ γάλα.", label: "Loukas drinks a lot of milk.", greek: "Ο Λουκάς πίνει πολύ γάλα.", dimension: "πολύ" },
	{ id: "poly-kosmo", reverseGreek: "Σήμερα έχει ___ κόσμο στην παραλία.", label: "There are a lot of people on the beach today.", greek: "Σήμερα έχει πολύ κόσμο στην παραλία.", dimension: "πολύ" },
	{ id: "poly-kafe", reverseGreek: "Πίνουν πάντα ___ καφέ.", label: "They always drink a lot of coffee.", greek: "Πίνουν πάντα πολύ καφέ.", dimension: "πολύ" },
	{ id: "polli-douleia", reverseGreek: "Έχω ___ δουλειά.", label: "I have a lot of work.", greek: "Έχω πολλή δουλειά.", dimension: "πολλή" },
	{ id: "polli-zesti", reverseGreek: "Σήμερα κάνει ___ ζέστη.", label: "It's very hot today.", greek: "Σήμερα κάνει πολλή ζέστη.", dimension: "πολλή" },
	{ id: "polli-kinisi", reverseGreek: "Η Αθήνα έχει ___ κίνηση.", label: "Athens has a lot of traffic.", greek: "Η Αθήνα έχει πολλή κίνηση.", dimension: "πολλή" },
	{ id: "polloi-anthropoi", reverseGreek: "___ άνθρωποι δουλεύουν πολύ.", label: "Many people work a lot.", greek: "Πολλοί άνθρωποι δουλεύουν πολύ.", dimension: "πολλοί" },
	{ id: "polloi-touristes", reverseGreek: "___ τουρίστες έρχονται στην Ελλάδα.", label: "Many tourists come to Greece.", greek: "Πολλοί τουρίστες έρχονται στην Ελλάδα.", dimension: "πολλοί" },
	{ id: "polloi-filoi", reverseGreek: "___ φίλοι μου μένουν στην Αθήνα.", label: "Many of my friends live in Athens.", greek: "Πολλοί φίλοι μου μένουν στην Αθήνα.", dimension: "πολλοί" },
	{ id: "pollous-filous", reverseGreek: "Έχουν ___ φίλους στη Γερμανία.", label: "They have a lot of friends in Germany.", greek: "Έχουν πολλούς φίλους στη Γερμανία.", dimension: "πολλούς" },
	{ id: "pollous-anthropous", reverseGreek: "Ξέρω ___ ανθρώπους εδώ.", label: "I know many people here.", greek: "Ξέρω πολλούς ανθρώπους εδώ.", dimension: "πολλούς" },
	{ id: "polles-meres", reverseGreek: "Αυτή την εβδομάδα είχαμε ___ ζεστές μέρες.", label: "This week we had a lot of hot days.", greek: "Αυτή την εβδομάδα είχαμε πολλές ζεστές μέρες.", dimension: "πολλές" },
	{ id: "polles-erotiseis", reverseGreek: "Έχω ___ ερωτήσεις.", label: "I have a lot of questions.", greek: "Έχω πολλές ερωτήσεις.", dimension: "πολλές" },
	{ id: "polla-dentra", reverseGreek: "Υπάρχουν ___ δέντρα στο πάρκο.", label: "There are many trees in the park.", greek: "Υπάρχουν πολλά δέντρα στο πάρκο.", dimension: "πολλά" },
	{ id: "polla-vivlia", reverseGreek: "Η Μαρία έχει ___ βιβλία.", label: "Maria has a lot of books.", greek: "Η Μαρία έχει πολλά βιβλία.", dimension: "πολλά" },
	{ id: "polla-estiatoria", reverseGreek: "Στο κέντρο υπάρχουν ___ εστιατόρια.", label: "There are many restaurants in the centre.", greek: "Στο κέντρο υπάρχουν πολλά εστιατόρια.", dimension: "πολλά" },
];
