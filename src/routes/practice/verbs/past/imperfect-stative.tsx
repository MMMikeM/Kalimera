import { createFileRoute } from "@tanstack/react-router";

import type { SimpleListItem } from "../../components/engines/deck";
import { Drill } from "../../components/engines/drill";
import { PERSON_DIMENSION_OPTIONS } from "../../components/engines/drill-constants";

// Past forms of the 5 stative verbs. These verbs have no aorist — they use
// the same form (past_continuous / imperfect) for all past meaning.
// Forward: "I was" → type "ήμουν"
// Reverse: show "μπορούσαμε" → tap the person/number chip for "we"

const FORMS: SimpleListItem[] = [
	// είμαι
	{
		id: "eimai-imoun",
		greek: "ήμουν",
		detail: "1st person singular",
		label: "I was",
		category: "eimai",
		dimension: "sg1",
	},
	{
		id: "eimai-isoun",
		greek: "ήσουν",
		detail: "2nd person singular",
		label: "you were",
		category: "eimai",
		dimension: "sg2",
	},
	{
		id: "eimai-itan-sg",
		greek: "ήταν",
		detail: "3rd person singular",
		label: "he / she / it was",
		category: "eimai",
		dimension: "sg3",
	},
	{
		id: "eimai-imastan",
		greek: "ήμασταν",
		detail: "1st person plural",
		label: "we were",
		category: "eimai",
		dimension: "pl1",
	},
	{
		id: "eimai-isastan",
		greek: "ήσασταν",
		detail: "2nd person plural",
		label: "you all were",
		category: "eimai",
		dimension: "pl2",
	},
	{
		id: "eimai-itan-pl",
		greek: "ήταν",
		detail: "3rd person plural",
		label: "they were",
		category: "eimai",
		dimension: "pl3",
	},

	// έχω — past_continuous = είχα (same as aorist; έχω is stative)
	{
		id: "echo-eicha",
		greek: "είχα",
		detail: "1st person singular",
		label: "I had",
		category: "echo",
		dimension: "sg1",
	},
	{
		id: "echo-eiches",
		greek: "είχες",
		detail: "2nd person singular",
		label: "you had",
		category: "echo",
		dimension: "sg2",
	},
	{
		id: "echo-eiche",
		greek: "είχε",
		detail: "3rd person singular",
		label: "he / she / it had",
		category: "echo",
		dimension: "sg3",
	},
	{
		id: "echo-eichame",
		greek: "είχαμε",
		detail: "1st person plural",
		label: "we had",
		category: "echo",
		dimension: "pl1",
	},
	{
		id: "echo-eichate",
		greek: "είχατε",
		detail: "2nd person plural",
		label: "you all had",
		category: "echo",
		dimension: "pl2",
	},
	{
		id: "echo-eichan",
		greek: "είχαν",
		detail: "3rd person plural",
		label: "they had",
		category: "echo",
		dimension: "pl3",
	},

	// θέλω
	{
		id: "thelo-ithela",
		greek: "ήθελα",
		detail: "1st person singular",
		label: "I wanted",
		category: "thelo",
		dimension: "sg1",
	},
	{
		id: "thelo-itheles",
		greek: "ήθελες",
		detail: "2nd person singular",
		label: "you wanted",
		category: "thelo",
		dimension: "sg2",
	},
	{
		id: "thelo-ithele",
		greek: "ήθελε",
		detail: "3rd person singular",
		label: "he / she / it wanted",
		category: "thelo",
		dimension: "sg3",
	},
	{
		id: "thelo-thelame",
		greek: "θέλαμε",
		detail: "1st person plural",
		label: "we wanted",
		category: "thelo",
		dimension: "pl1",
	},
	{
		id: "thelo-thelate",
		greek: "θέλατε",
		detail: "2nd person plural",
		label: "you all wanted",
		category: "thelo",
		dimension: "pl2",
	},
	{
		id: "thelo-ithelan",
		greek: "ήθελαν",
		detail: "3rd person plural",
		label: "they wanted",
		category: "thelo",
		dimension: "pl3",
	},

	// ξέρω
	{
		id: "ksero-ixera",
		greek: "ήξερα",
		detail: "1st person singular",
		label: "I knew",
		category: "ksero",
		dimension: "sg1",
	},
	{
		id: "ksero-ixeres",
		greek: "ήξερες",
		detail: "2nd person singular",
		label: "you knew",
		category: "ksero",
		dimension: "sg2",
	},
	{
		id: "ksero-ixere",
		greek: "ήξερε",
		detail: "3rd person singular",
		label: "he / she / it knew",
		category: "ksero",
		dimension: "sg3",
	},
	{
		id: "ksero-xerame",
		greek: "ξέραμε",
		detail: "1st person plural",
		label: "we knew",
		category: "ksero",
		dimension: "pl1",
	},
	{
		id: "ksero-xerate",
		greek: "ξέρατε",
		detail: "2nd person plural",
		label: "you all knew",
		category: "ksero",
		dimension: "pl2",
	},
	{
		id: "ksero-ixeran",
		greek: "ήξεραν",
		detail: "3rd person plural",
		label: "they knew",
		category: "ksero",
		dimension: "pl3",
	},

	// μπορώ
	{
		id: "boro-borousa",
		greek: "μπορούσα",
		detail: "1st person singular",
		label: "I could",
		category: "boro",
		dimension: "sg1",
	},
	{
		id: "boro-borouses",
		greek: "μπορούσες",
		detail: "2nd person singular",
		label: "you could",
		category: "boro",
		dimension: "sg2",
	},
	{
		id: "boro-borouse",
		greek: "μπορούσε",
		detail: "3rd person singular",
		label: "he / she / it could",
		category: "boro",
		dimension: "sg3",
	},
	{
		id: "boro-borousame",
		greek: "μπορούσαμε",
		detail: "1st person plural",
		label: "we could",
		category: "boro",
		dimension: "pl1",
	},
	{
		id: "boro-borousate",
		greek: "μπορούσατε",
		detail: "2nd person plural",
		label: "you all could",
		category: "boro",
		dimension: "pl2",
	},
	{
		id: "boro-borousan",
		greek: "μπορούσαν",
		detail: "3rd person plural",
		label: "they could",
		category: "boro",
		dimension: "pl3",
	},
];

const CATEGORIES = [
	{ id: "eimai", label: "είμαι" },
	{ id: "echo", label: "έχω" },
	{ id: "thelo", label: "θέλω" },
	{ id: "ksero", label: "ξέρω" },
	{ id: "boro", label: "μπορώ" },
];

export const Route = createFileRoute("/practice/verbs/past/imperfect-stative")({
	component: ImperfectStativeDrill,
});

function ImperfectStativeDrill() {
	return (
		<Drill
			drillId="verbs-imperfect-stative"
			items={FORMS}
			categories={CATEGORIES}
			backTo="/practice/verbs"
			title="Stative verbs · past"
			subtitle="was · had · wanted · knew · could"
			colorTheme="terracotta"
			forwardDesc="English → Greek past form"
			reverseLabel="Greek → person"
			reverseDesc="Past form → select person"
			reverse={{
				kind: "single-select",
				options: PERSON_DIMENSION_OPTIONS,
				getCorrectId: (item) => String(item.dimension ?? ""),
			}}
		/>
	);
}
