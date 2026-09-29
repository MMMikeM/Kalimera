import { createFileRoute } from "@tanstack/react-router";

import type { SimpleListItem } from "../../components/engines/deck";
import { Drill } from "../../components/engines/drill";
import { PERSON_DIMENSION_OPTIONS } from "../../components/engines/drill-constants";

// είμαι has no short stem, so the future is θα + the present form.
// Forward: "I will be" → type "tha eimai" (matchPhonetic → θα είμαι)
// Reverse: show "θα είμαστε" → tap the person/number chip for "we"

const FORMS: SimpleListItem[] = [
	{
		id: "tha-eimai",
		greek: "θα είμαι",
		english: "I will be",
		detail: "1st person singular",
		label: "I will be",
		dimension: "sg1",
	},
	{
		id: "tha-eisai",
		greek: "θα είσαι",
		english: "you will be",
		detail: "2nd person singular",
		label: "you will be",
		dimension: "sg2",
	},
	{
		id: "tha-einai-sg",
		greek: "θα είναι",
		english: "he / she / it will be",
		detail: "3rd person singular",
		label: "he / she / it will be",
		dimension: "sg3",
	},
	{
		id: "tha-eimaste",
		greek: "θα είμαστε",
		english: "we will be",
		detail: "1st person plural",
		label: "we will be",
		dimension: "pl1",
	},
	{
		id: "tha-eiste",
		greek: "θα είστε",
		english: "you all will be",
		detail: "2nd person plural",
		label: "you all will be",
		dimension: "pl2",
	},
	{
		id: "tha-einai-pl",
		greek: "θα είναι",
		english: "they will be",
		detail: "3rd person plural",
		label: "they will be",
		dimension: "pl3",
	},
];

export const Route = createFileRoute("/practice/verbs/future/eimai")({
	component: EimaiFutureDrill,
});

function EimaiFutureDrill() {
	return (
		<Drill
			drillId="verbs-eimai-future"
			items={FORMS}
			backTo="/practice/verbs"
			subtitle="6 forms / timed"
			colorTheme="olive"
			forwardDesc="English → Greek future form of είμαι"
			reverseLabel="Greek → person"
			reverseDesc="Future form → select person"
			reverse={{
				kind: "single-select",
				options: PERSON_DIMENSION_OPTIONS,
			}}
		/>
	);
}
