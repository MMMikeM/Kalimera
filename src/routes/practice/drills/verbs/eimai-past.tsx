import { SPEEDS } from "../../drill-speeds";
import { SimpleListDrill, type SimpleListItem } from "../../engines/simple-list-drill";

// είμαι past (imperfect — irregular). No aorist form exists for είμαι.
// Forward: "I was" → type "imoun" (matchPhonetic → ήμουν)
// Reverse: show "ήμασταν" → tap the person/number chip for "we"

const FORMS: SimpleListItem[] = [
	{
		id: "imoun",
		greek: "ήμουν",
		greeklish: "imoun",
		english: "I was",
		detail: "1st person singular",
		label: "ήμουν",
		dimension: "sg1",
	},
	{
		id: "isoun",
		greek: "ήσουν",
		greeklish: "isoun",
		english: "you were",
		detail: "2nd person singular",
		label: "ήσουν",
		dimension: "sg2",
	},
	{
		id: "itan-sg",
		greek: "ήταν",
		greeklish: "itan",
		english: "he / she / it was",
		detail: "3rd person singular",
		label: "ήταν (sg)",
		dimension: "sg3",
	},
	{
		id: "imastan",
		greek: "ήμασταν",
		greeklish: "imastan",
		english: "we were",
		detail: "1st person plural",
		label: "ήμασταν",
		dimension: "pl1",
	},
	{
		id: "isastan",
		greek: "ήσασταν",
		greeklish: "isastan",
		english: "you all were",
		detail: "2nd person plural",
		label: "ήσασταν",
		dimension: "pl2",
	},
	{
		id: "itan-pl",
		greek: "ήταν",
		greeklish: "itan",
		english: "they were",
		detail: "3rd person plural",
		label: "ήταν (pl)",
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

export default function EimaiPastDrill() {
	return (
		<SimpleListDrill
			drillId="verbs-eimai-past"
			items={FORMS}
			title="είμαι · past"
			subtitle="6 forms / timed"
			colorTheme="olive"
			forwardDesc="English → Greek past form of είμαι"
			reverseLabel="Greek → person"
			reverseDesc="Past form → select person"
			reverseDimension={{
				options: DIMENSION_OPTIONS,
				getCorrectId: (item) => item.dimension ?? "",
			}}
			speeds={SPEEDS}
		/>
	);
}
