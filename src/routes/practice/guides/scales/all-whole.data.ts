import type { SimpleListItem } from "../../components/engines/deck";

/**
 * όλος comes before the article, so the grader cannot forgive a missing one. Time
 * phrases (all day, all week) take the Target form, as όλη τη μέρα does in the section;
 * other masculine and feminine cards are sentences, so the form is not a guess.
 */
export const ITEMS: SimpleListItem[] = [
	{ id: "oli-ti-mera", context: "η μέρα", label: "all day", greek: "όλη τη μέρα", acceptAlso: "όλη την μέρα" },
	{ id: "oli-ti-nychta", context: "η νύχτα", label: "all night", greek: "όλη τη νύχτα", acceptAlso: "όλη την νύχτα" },
	{ id: "oli-tin-evdomada", context: "η εβδομάδα", label: "all week", greek: "όλη την εβδομάδα" },
	{ id: "olo-to-proi", context: "το πρωί", label: "all morning", greek: "όλο το πρωί" },
	{ id: "olo-to-kalokairi", context: "το καλοκαίρι", label: "all summer", greek: "όλο το καλοκαίρι" },
	{ id: "olo-to-spiti", context: "το σπίτι", label: "the whole house", greek: "όλο το σπίτι" },
	{ id: "oli-i-oikogeneia", context: "η οικογένεια", label: "The whole family is here.", greek: "Όλη η οικογένεια είναι εδώ." },
	{ id: "oli-i-poli", context: "η πόλη", label: "The whole city is asleep.", greek: "Όλη η πόλη κοιμάται." },
	{ id: "olos-o-kosmos", context: "ο κόσμος", label: "The whole world knows it.", greek: "Όλος ο κόσμος το ξέρει." },
	{ id: "olo-ton-kosmo", context: "ο κόσμος", label: "from all over the world", greek: "από όλο τον κόσμο" },
	{ id: "oloi-oi-touristes", context: "ο τουρίστας", label: "All the tourists go to the beach.", greek: "Όλοι οι τουρίστες πάνε στην παραλία." },
	{ id: "oloi-oi-mathites", context: "ο μαθητής", label: "All the pupils are here.", greek: "Όλοι οι μαθητές είναι εδώ." },
	{ id: "oles-oi-gynaikes", context: "η γυναίκα", label: "All the women are working.", greek: "Όλες οι γυναίκες δουλεύουν." },
	{ id: "oles-oi-paralies", context: "η παραλία", label: "All the beaches are beautiful.", greek: "Όλες οι παραλίες είναι όμορφες." },
	{ id: "ola-ta-paidia", context: "το παιδί", label: "all the children", greek: "όλα τα παιδιά" },
	{ id: "ola-ta-vivlia", context: "το βιβλίο", label: "all the books", greek: "όλα τα βιβλία" },
	{ id: "ola-ta-lefta", context: "τα λεφτά", label: "all the money", greek: "όλα τα λεφτά" },
	{ id: "oloi-oi-filoi-mou", context: "ο φίλος", label: "All my friends live here.", greek: "Όλοι οι φίλοι μου μένουν εδώ." },
	{ id: "olo-to-vivlio", context: "το βιβλίο", label: "I read the whole book.", greek: "Διάβασα όλο το βιβλίο." },
	{ id: "kathe-mera", context: "η μέρα", label: "every day", greek: "κάθε μέρα" },
	{ id: "kathe-proi", context: "το πρωί", label: "every morning", greek: "κάθε πρωί" },
];
