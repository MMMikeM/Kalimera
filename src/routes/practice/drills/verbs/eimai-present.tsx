import { SPEEDS } from "../../drill-speeds";
import { SimpleListDrill, type SimpleListItem } from "../../engines/simple-list-drill";

// είμαι present (irregular). Doesn't follow -ω paradigm.
// Forward: "I am" → type "eimai" (matchPhonetic → είμαι)
// Reverse: show "είμαστε" → tap the person/number chip for "we"

const FORMS: SimpleListItem[] = [
	{
		id: "eimai",
		greek: "είμαι",
		greeklish: "eimai",
		english: "I am",
		detail: "1st person singular",
		label: "είμαι",
		dimension: "sg1",
	},
	{
		id: "eisai",
		greek: "είσαι",
		greeklish: "eisai",
		english: "you are",
		detail: "2nd person singular",
		label: "είσαι",
		dimension: "sg2",
	},
	{
		id: "einai-sg",
		greek: "είναι",
		greeklish: "einai",
		english: "he / she / it is",
		detail: "3rd person singular",
		label: "είναι (sg)",
		dimension: "sg3",
	},
	{
		id: "eimaste",
		greek: "είμαστε",
		greeklish: "eimaste",
		english: "we are",
		detail: "1st person plural",
		label: "είμαστε",
		dimension: "pl1",
	},
	{
		id: "eiste",
		greek: "είστε",
		greeklish: "eiste",
		english: "you all are",
		detail: "2nd person plural",
		label: "είστε",
		dimension: "pl2",
	},
	{
		id: "einai-pl",
		greek: "είναι",
		greeklish: "einai",
		english: "they are",
		detail: "3rd person plural",
		label: "είναι (pl)",
		dimension: "pl3",
	},
];

const DIMENSION_OPTIONS = [
	{ id: "sg1", label: "I", selectorBg: "bg-stone-100", selectorText: "text-stone-800" },
	{ id: "sg2", label: "you", selectorBg: "bg-stone-100", selectorText: "text-stone-800" },
	{ id: "sg3", label: "he / she", selectorBg: "bg-stone-100", selectorText: "text-stone-800" },
	{ id: "pl1", label: "we", selectorBg: "bg-stone-100", selectorText: "text-stone-800" },
	{ id: "pl2", label: "you all", selectorBg: "bg-stone-100", selectorText: "text-stone-800" },
	{ id: "pl3", label: "they", selectorBg: "bg-stone-100", selectorText: "text-stone-800" },
];

export default function EimaiPresentDrill() {
	return (
		<SimpleListDrill
			drillId="verbs-eimai-present"
			items={FORMS}
			title="είμαι · present"
			subtitle="6 forms / timed"
			colorTheme="olive"
			forwardDesc="English → Greek present form of είμαι"
			reverseLabel="Greek → person"
			reverseDesc="Present form → select person"
			reverseDimension={{
				options: DIMENSION_OPTIONS,
				getCorrectId: (item) => item.dimension ?? "",
			}}
			speeds={SPEEDS}
		/>
	);
}
