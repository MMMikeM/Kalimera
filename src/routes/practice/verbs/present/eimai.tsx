import { createFileRoute } from "@tanstack/react-router";

import type { SimpleListItem } from "../../components/engines/deck";
import { Drill } from "../../components/engines/drill";
import { PERSON_DIMENSION_OPTIONS } from "../../components/engines/drill-constants";

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
		label: "I am",
		dimension: "sg1",
	},
	{
		id: "eisai",
		greek: "είσαι",
		greeklish: "eisai",
		english: "you are",
		detail: "2nd person singular",
		label: "you are",
		dimension: "sg2",
	},
	{
		id: "einai-sg",
		greek: "είναι",
		greeklish: "einai",
		english: "he / she / it is",
		detail: "3rd person singular",
		label: "he / she / it is",
		dimension: "sg3",
	},
	{
		id: "eimaste",
		greek: "είμαστε",
		greeklish: "eimaste",
		english: "we are",
		detail: "1st person plural",
		label: "we are",
		dimension: "pl1",
	},
	{
		id: "eiste",
		greek: "είστε",
		greeklish: "eiste",
		english: "you all are",
		detail: "2nd person plural",
		label: "you all are",
		dimension: "pl2",
	},
	{
		id: "einai-pl",
		greek: "είναι",
		greeklish: "einai",
		english: "they are",
		detail: "3rd person plural",
		label: "they are",
		dimension: "pl3",
	},
];

export const Route = createFileRoute("/practice/verbs/present/eimai")({
	component: EimaiPresentDrill,
});

function EimaiPresentDrill() {
	return (
		<Drill
			drillId="verbs-eimai-present"
			items={FORMS}
			backTo="/practice/verbs"
			title="είμαι · present"
			subtitle="6 forms / timed"
			colorTheme="olive"
			forwardDesc="English → Greek present form of είμαι"
			reverseLabel="Greek → person"
			reverseDesc="Present form → select person"
			reverse={{
				kind: "single-select",
				options: PERSON_DIMENSION_OPTIONS,
				getCorrectId: (item) => String(item.dimension ?? ""),
			}}
		/>
	);
}
