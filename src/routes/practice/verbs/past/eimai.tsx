import { createFileRoute } from "@tanstack/react-router";

import type { SimpleListItem } from "../../components/engines/deck";
import { Drill } from "../../components/engines/drill";
import { PERSON_DIMENSION_OPTIONS } from "../../components/engines/drill-constants";

// είμαι has no aorist — ήμουν covers all past meaning.
// Forward: "I was" → type "imoun" (matchPhonetic → ήμουν)
// Reverse: show "ήμασταν" → tap the person/number chip for "we"

const FORMS: SimpleListItem[] = [
	{
		id: "imoun",
		greek: "ήμουν",
		english: "I was",
		detail: "1st person singular",
		label: "I was",
		dimension: "sg1",
	},
	{
		id: "isoun",
		greek: "ήσουν",
		english: "you were",
		detail: "2nd person singular",
		label: "you were",
		dimension: "sg2",
	},
	{
		id: "itan-sg",
		greek: "ήταν",
		english: "he / she / it was",
		detail: "3rd person singular",
		label: "he / she / it was",
		dimension: "sg3",
	},
	{
		id: "imastan",
		greek: "ήμασταν",
		english: "we were",
		detail: "1st person plural",
		label: "we were",
		dimension: "pl1",
	},
	{
		id: "isastan",
		greek: "ήσασταν",
		english: "you all were",
		detail: "2nd person plural",
		label: "you all were",
		dimension: "pl2",
	},
	{
		id: "itan-pl",
		greek: "ήταν",
		english: "they were",
		detail: "3rd person plural",
		label: "they were",
		dimension: "pl3",
	},
];

export const Route = createFileRoute("/practice/verbs/past/eimai")({
	component: EimaiPastDrill,
});

function EimaiPastDrill() {
	return (
		<Drill
			drillId="verbs-eimai-past"
			items={FORMS}
			backTo="/practice/verbs"
			subtitle="6 forms / timed"
			colorTheme="olive"
			forwardDesc="English → Greek past form of είμαι"
			reverseLabel="Greek → person"
			reverseDesc="Past form → select person"
			reverse={{
				kind: "single-select",
				options: PERSON_DIMENSION_OPTIONS,
			}}
		/>
	);
}
