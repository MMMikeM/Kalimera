import { createFileRoute } from "@tanstack/react-router";

import { SPEEDS } from "../../components/drill-speeds";
import { PERSON_DIMENSION_OPTIONS } from "../../components/engines/drill-constants";
import { SimpleListDrill, type SimpleListItem } from "../../components/engines/simple-list-drill";

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

export const Route = createFileRoute("/practice/verbs/past/eimai-past")({
	component: EimaiPastDrill,
});

function EimaiPastDrill() {
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
				options: PERSON_DIMENSION_OPTIONS,
				getCorrectId: (item) => item.dimension ?? "",
			}}
			speeds={SPEEDS}
		/>
	);
}
