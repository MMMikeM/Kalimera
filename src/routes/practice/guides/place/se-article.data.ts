import type { SimpleListItem } from "../../components/engines/deck";

/**
 * σε and a noun in its plain form; the answer joins σε to the Target article, or
 * leaves it whole before μια, ένα or no article. Where τη or την could both be
 * written, `acceptAlso` takes the other.
 */
export const ITEMS: SimpleListItem[] = [
	{ id: "spiti", context: "σε + το σπίτι", label: "at home", greek: "στο σπίτι" },
	{ id: "grafeio", context: "σε + το γραφείο", label: "at the office", greek: "στο γραφείο" },
	{ id: "scholeio", context: "σε + το σχολείο", label: "at school", greek: "στο σχολείο" },
	{ id: "nosokomeio", context: "σε + το νοσοκομείο", label: "to the hospital", greek: "στο νοσοκομείο" },
	{ id: "parko", context: "σε + το πάρκο", label: "in the park", greek: "στο πάρκο" },
	{ id: "noumero", context: "σε + το νούμερο ένα", label: "at number one", greek: "στο νούμερο ένα" },
	{ id: "douleia", context: "σε + η δουλειά", label: "at work", greek: "στη δουλειά", acceptAlso: "στην δουλειά" },
	{ id: "thalassa", context: "σε + η θάλασσα", label: "to the sea", greek: "στη θάλασσα", acceptAlso: "στην θάλασσα" },
	{ id: "lemesos", context: "σε + η Λεμεσός", label: "in Limassol", greek: "στη Λεμεσό", acceptAlso: "στην Λεμεσό" },
	{ id: "pafos", context: "σε + η Πάφος", label: "in Paphos", greek: "στην Πάφο" },
	{ id: "athina", context: "σε + η Αθήνα", label: "in Athens", greek: "στην Αθήνα" },
	{ id: "trapeza", context: "σε + η τράπεζα", label: "to the bank", greek: "στην τράπεζα" },
	{ id: "plateia", context: "σε + η πλατεία", label: "in the square", greek: "στην πλατεία" },
	{ id: "proti-fotografia", context: "σε + η πρώτη φωτογραφία", label: "in the first photo", greek: "στην πρώτη φωτογραφία" },
	{ id: "stathmos", context: "σε + ο σταθμός", label: "to the station", greek: "στον σταθμό" },
	{ id: "giatros", context: "σε + ο γιατρός", label: "to the doctor", greek: "στον γιατρό" },
	{ id: "kreopolis", context: "σε + ο κρεοπώλης", label: "to the butcher", greek: "στον κρεοπώλη" },
	{ id: "estiatoria", context: "σε + τα εστιατόρια", label: "to the restaurants", greek: "στα εστιατόρια" },
	{ id: "magazia", context: "σε + τα μαγαζιά", label: "to the shops", greek: "στα μαγαζιά" },
	{ id: "kafeteries", context: "σε + οι καφετέριες", label: "to the cafés", greek: "στις καφετέριες" },
	{ id: "dromoi", context: "σε + οι δρόμοι", label: "in the streets", greek: "στους δρόμους" },
	{ id: "mia-poli", context: "σε + μια μικρή πόλη", label: "in a small town", greek: "σε μια μικρή πόλη" },
	{ id: "ena-chorio", context: "σε + ένα χωριό", label: "in a village", greek: "σε ένα χωριό" },
	{ id: "trapeza-bare", context: "σε + τράπεζα", label: "in a bank (where I work)", greek: "σε τράπεζα" },
];
