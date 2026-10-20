import type { SimpleListItem } from "../../components/engines/deck";

/**
 * Whole sentences, so that the article in "the most" sits mid-sentence: the grader
 * forgives only a leading article. Where the section gives a one-word form in
 * -τερος, `acceptAlso` takes it.
 */
export const ITEMS: SimpleListItem[] = [
	{ id: "psilos-petro", context: "ψηλός", label: "He is taller than Petros.", greek: "Είναι πιο ψηλός από τον Πέτρο.", acceptAlso: "Είναι ψηλότερος από τον Πέτρο." },
	{ id: "kouzina-megali", context: "μεγάλος", label: "The kitchen is bigger than the bathroom.", greek: "Η κουζίνα είναι πιο μεγάλη από το μπάνιο.", acceptAlso: "Η κουζίνα είναι μεγαλύτερη από το μπάνιο." },
	{ id: "chorio-isycho", context: "ήσυχος", label: "The village is quieter than the city.", greek: "Το χωριό είναι πιο ήσυχο από την πόλη." },
	{ id: "maria-isychi", context: "ήσυχος", label: "Maria is quieter than Eleni.", greek: "Η Μαρία είναι πιο ήσυχη από την Ελένη." },
	{ id: "spiti-palio", context: "παλιός", label: "Our house is older than the school.", greek: "Το σπίτι μας είναι πιο παλιό από το σχολείο.", acceptAlso: "Το σπίτι μας είναι παλιότερο από το σχολείο." },
	{ id: "athina-akrivi", context: "ακριβός", label: "Athens is more expensive than Thessaloniki.", greek: "Η Αθήνα είναι πιο ακριβή από τη Θεσσαλονίκη.", acceptAlso: "Η Αθήνα είναι πιο ακριβή από την Θεσσαλονίκη." },
	{ id: "ellinika-dyskola", context: "δύσκολος", label: "Greek is more difficult than English.", greek: "Τα ελληνικά είναι πιο δύσκολα από τα αγγλικά." },
	{ id: "ispanika-efkola", context: "εύκολος", label: "Spanish is easier than Greek.", greek: "Τα ισπανικά είναι πιο εύκολα από τα ελληνικά." },
	{ id: "aderfos-mikros", context: "μικρός", label: "My brother is younger than my sister.", greek: "Ο αδερφός μου είναι πιο μικρός από την αδερφή μου.", acceptAlso: "Ο αδερφός μου είναι μικρότερος από την αδερφή μου." },
	{ id: "thalassa-zesti", context: "ζεστός", label: "The sea is warmer than the pool.", greek: "Η θάλασσα είναι πιο ζεστή από την πισίνα." },
	{ id: "treno-grigoro", context: "γρήγορος", label: "The train is faster than the bus.", greek: "Το τρένο είναι πιο γρήγορο από το λεωφορείο." },
	{ id: "fagito-nostimo", context: "νόστιμος", label: "My mum's food is tastier.", greek: "Το φαγητό της μαμάς μου είναι πιο νόστιμο." },
	{ id: "kafes-kalyteros", context: "καλός", label: "The coffee here is better.", greek: "Ο καφές εδώ είναι καλύτερος.", acceptAlso: "Ο καφές εδώ είναι πιο καλός." },
	{ id: "kairos-cheiroteros", context: "κακός", label: "The weather today is worse.", greek: "Ο καιρός σήμερα είναι χειρότερος.", acceptAlso: "Ο καιρός σήμερα είναι πιο κακός." },
	{ id: "kalokairi-omorfi", context: "όμορφος", label: "Summer is the most beautiful season.", greek: "Το καλοκαίρι είναι η πιο όμορφη εποχή." },
	{ id: "einai-kalyteros", context: "καλός", label: "He is the best.", greek: "Είναι ο καλύτερος.", acceptAlso: "Είναι ο πιο καλός." },
	{ id: "athina-megali-poli", context: "μεγάλος", label: "Athens is the biggest city.", greek: "Η Αθήνα είναι η πιο μεγάλη πόλη.", acceptAlso: "Η Αθήνα είναι η μεγαλύτερη πόλη." },
	{ id: "giorgos-psilos", context: "ψηλός", label: "Giorgos is the tallest.", greek: "Ο Γιώργος είναι ο πιο ψηλός.", acceptAlso: "Ο Γιώργος είναι ο ψηλότερος." },
	{ id: "isychos-dromos", context: "ήσυχος", label: "This is the quietest street.", greek: "Αυτός είναι ο πιο ήσυχος δρόμος." },
	{ id: "cheiroteri-mera", context: "κακός", label: "This is the worst day.", greek: "Αυτή είναι η χειρότερη μέρα.", acceptAlso: "Αυτή είναι η πιο κακή μέρα." },
];
