import type { SimpleListItem } from "../../components/engines/deck";

/**
 * A noun's gender, "Pairs of people". The grader forgives a missing η, so every card's
 * feminine ending differs from its masculine one. Words with one form for both, such as
 * ο μπαρίστα and η μπαρίστα, are left out: typing the masculine would pass.
 */
export const ITEMS: SimpleListItem[] = [
	{ id: "theia", context: "ο θείος", label: "aunt", greek: "η θεία" },
	{ id: "daskala", context: "ο δάσκαλος", label: "teacher, a woman", greek: "η δασκάλα" },
	{ id: "geitonissa", context: "ο γείτονας", label: "neighbour, a woman", greek: "η γειτόνισσα" },
	{ id: "vasilissa", context: "ο βασιλιάς", label: "queen", greek: "η βασίλισσα" },
	{ id: "ellinida", context: "ο Έλληνας", label: "a Greek woman", greek: "η Ελληνίδα" },
	{ id: "anglida", context: "ο Άγγλος", label: "an Englishwoman", greek: "η Αγγλίδα" },
	{ id: "gallida", context: "ο Γάλλος", label: "a Frenchwoman", greek: "η Γαλλίδα" },
	{ id: "germanida", context: "ο Γερμανός", label: "a German woman", greek: "η Γερμανίδα" },
	{ id: "italida", context: "ο Ιταλός", label: "an Italian woman", greek: "η Ιταλίδα" },
	{ id: "kypria", context: "ο Κύπριος", label: "a Cypriot woman", greek: "η Κύπρια", acceptAlso: "η Κυπραία" },
	{ id: "afrikani", context: "ο Αφρικανός", label: "an African woman", greek: "η Αφρικανή" },
	{ id: "mathitria", context: "ο μαθητής", label: "pupil, a girl", greek: "η μαθήτρια" },
	{ id: "foititria", context: "ο φοιτητής", label: "university student, a woman", greek: "η φοιτήτρια" },
	{ id: "kathigitria", context: "ο καθηγητής", label: "secondary-school teacher, a woman", greek: "η καθηγήτρια" },
	{ id: "nosilevtria", context: "ο νοσηλευτής", label: "nurse, a woman", greek: "η νοσηλεύτρια" },
	{ id: "programmatistria", context: "ο προγραμματιστής", label: "programmer, a woman", greek: "η προγραμματίστρια" },
	{ id: "nosokoma", context: "ο νοσοκόμος", label: "nurse, a woman (everyday word)", greek: "η νοσοκόμα" },
	{ id: "servitora", context: "ο σερβιτόρος", label: "waitress", greek: "η σερβιτόρα" },
	{ id: "ypefthyni", context: "ο υπεύθυνος", label: "manager, a woman", greek: "η υπεύθυνη" },
	{ id: "fili", context: "ο φίλος", label: "friend, a woman", greek: "η φίλη" },
	{ id: "aderfi", context: "ο αδερφός", label: "sister", greek: "η αδερφή", acceptAlso: "η αδελφή" },
	{ id: "xaderfi", context: "ο ξάδερφος", label: "cousin, a woman", greek: "η ξαδέρφη", acceptAlso: "η ξαδέλφη" },
];
