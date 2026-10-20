import type { SimpleListItem } from "../../components/engines/deck";

/**
 * A borrowed noun and an English phrase; the answer keeps the noun as it is. The
 * grader forgives a leading article, so each answer puts the changed article
 * after another word (η μουσική του πάρτι) or shows the number another way
 * (δύο πάρτι, τα παλιά σινεμά).
 */
export const ITEMS: SimpleListItem[] = [
	{ id: "parti-mousiki", context: "το πάρτι", label: "the party's music", greek: "η μουσική του πάρτι" },
	{ id: "parti-ola", context: "το πάρτι", label: "all the parties", greek: "όλα τα πάρτι" },
	{ id: "rantevou-ora", context: "το ραντεβού", label: "the time of the appointment", greek: "η ώρα του ραντεβού" },
	{ id: "rantevou-ola", context: "το ραντεβού", label: "all my appointments", greek: "όλα τα ραντεβού μου" },
	{ id: "chobi-polla", context: "το χόμπι", label: "a lot of hobbies", greek: "πολλά χόμπι" },
	{ id: "chobi-agapimena", context: "το χόμπι", label: "my favourite hobbies", greek: "τα αγαπημένα μου χόμπι" },
	{ id: "spor-ola", context: "το σπορ", label: "all sports", greek: "όλα τα σπορ" },
	{ id: "vinteo-ola", context: "το βίντεο", label: "all the videos", greek: "όλα τα βίντεο" },
	{ id: "vinteo-ichos", context: "το βίντεο", label: "the sound of the video", greek: "ο ήχος του βίντεο" },
	{ id: "taxi-dyo", context: "το ταξί", label: "two taxis", greek: "δύο ταξί" },
	{ id: "taxi-timi", context: "το ταξί", label: "the price of the taxi", greek: "η τιμή του ταξί" },
	{ id: "sinema-eisodos", context: "το σινεμά", label: "the entrance of the cinema", greek: "η είσοδος του σινεμά" },
	{ id: "sinema-palia", context: "το σινεμά", label: "the old cinemas", greek: "τα παλιά σινεμά" },
	{ id: "metro-stathmos", context: "το μετρό", label: "the metro station", greek: "ο σταθμός του μετρό" },
	{ id: "sandouits-dyo", context: "το σάντουιτς", label: "two sandwiches", greek: "δύο σάντουιτς" },
	{ id: "menou-dyo", context: "το μενού", label: "two menus", greek: "δύο μενού" },
	{ id: "asanser-porta", context: "το ασανσέρ", label: "the lift door", greek: "η πόρτα του ασανσέρ" },
	{ id: "mini-market-polla", context: "το μίνι μάρκετ", label: "a lot of mini markets", greek: "πολλά μίνι μάρκετ" },
	{ id: "super-market-dyo", context: "το σούπερ μάρκετ", label: "two supermarkets", greek: "δύο σούπερ μάρκετ" },
];
