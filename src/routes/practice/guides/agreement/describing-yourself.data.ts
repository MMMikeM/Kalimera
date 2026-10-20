import type { SimpleListItem } from "../../components/engines/deck";

/**
 * Words that agree, "Describing yourself with -μένος". The answer keeps its verb: -η and
 * -οι sound the same, so είμαι or είμαστε is what tells a woman from a group.
 */
export const ITEMS: SimpleListItem[] = [
	{ id: "kourasmenos-man", context: "κουρασμένος", label: "I'm tired. (a man speaking)", greek: "Είμαι κουρασμένος." },
	{ id: "kourasmeni-woman", context: "κουρασμένος", label: "I'm tired. (a woman speaking)", greek: "Είμαι κουρασμένη." },
	{ id: "kourasmenoi-mixed", context: "κουρασμένος", label: "We're tired. (a mixed group)", greek: "Είμαστε κουρασμένοι." },
	{ id: "kourasmenes-women", context: "κουρασμένος", label: "We're tired. (a group of women)", greek: "Είμαστε κουρασμένες." },
	{ id: "kourasmeni-question", context: "κουρασμένος", label: "Are you tired? (to a woman)", greek: "Είσαι κουρασμένη;" },
	{ id: "kryomenos-man", context: "κρυωμένος", label: "I've got a cold. (a man speaking)", greek: "Είμαι κρυωμένος." },
	{ id: "kryomeni-woman", context: "κρυωμένος", label: "I've got a cold. (a woman speaking)", greek: "Είμαι κρυωμένη." },
	{ id: "pantremenos-he", context: "παντρεμένος", label: "He's married.", greek: "Είναι παντρεμένος." },
	{ id: "pantremeni-she", context: "παντρεμένος", label: "She's married.", greek: "Είναι παντρεμένη." },
	{ id: "pantremenoi-couple", context: "παντρεμένος", label: "We're married. (a husband and wife)", greek: "Είμαστε παντρεμένοι." },
	{ id: "pantremenos-question", context: "παντρεμένος", label: "Are you married? (to a man)", greek: "Είσαι παντρεμένος;" },
	{ id: "apascholimenos-man", context: "απασχολημένος", label: "I'm busy. (a man speaking)", greek: "Είμαι απασχολημένος." },
	{ id: "apascholimeni-woman", context: "απασχολημένος", label: "I'm busy. (a woman speaking)", greek: "Είμαι απασχολημένη." },
	{ id: "apascholimenes-women", context: "απασχολημένος", label: "We're busy. (a group of women)", greek: "Είμαστε απασχολημένες." },
	{ id: "chorismeni-woman", context: "χωρισμένος", label: "I'm separated. (a woman speaking)", greek: "Είμαι χωρισμένη." },
	{ id: "fovismeni-woman", context: "φοβισμένος", label: "I'm scared. (a woman speaking)", greek: "Είμαι φοβισμένη." },
	{ id: "fovismenoi-mixed", context: "φοβισμένος", label: "We're scared. (a mixed group)", greek: "Είμαστε φοβισμένοι." },
	{ id: "lypimenos-man", context: "λυπημένος", label: "I'm sad. (a man speaking)", greek: "Είμαι λυπημένος." },
	{ id: "lypimenes-women", context: "λυπημένος", label: "We're sad. (a group of women)", greek: "Είμαστε λυπημένες." },
	{ id: "enthousiasmeni-woman", context: "ενθουσιασμένος", label: "I'm excited. (a woman speaking)", greek: "Είμαι ενθουσιασμένη." },
];
