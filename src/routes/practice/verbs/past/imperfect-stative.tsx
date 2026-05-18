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
		greeklish: "imoun",
		english: "I was",
		detail: "1st person singular",
		label: "ήμουν",
		category: "eimai",
		dimension: "sg1",
	},
	{
		id: "eimai-isoun",
		greek: "ήσουν",
		greeklish: "isoun",
		english: "you were",
		detail: "2nd person singular",
		label: "ήσουν",
		category: "eimai",
		dimension: "sg2",
	},
	{
		id: "eimai-itan-sg",
		greek: "ήταν",
		greeklish: "itan",
		english: "he / she / it was",
		detail: "3rd person singular",
		label: "ήταν (sg)",
		category: "eimai",
		dimension: "sg3",
	},
	{
		id: "eimai-imastan",
		greek: "ήμασταν",
		greeklish: "imastan",
		english: "we were",
		detail: "1st person plural",
		label: "ήμασταν",
		category: "eimai",
		dimension: "pl1",
	},
	{
		id: "eimai-isastan",
		greek: "ήσασταν",
		greeklish: "isastan",
		english: "you all were",
		detail: "2nd person plural",
		label: "ήσασταν",
		category: "eimai",
		dimension: "pl2",
	},
	{
		id: "eimai-itan-pl",
		greek: "ήταν",
		greeklish: "itan",
		english: "they were",
		detail: "3rd person plural",
		label: "ήταν (pl)",
		category: "eimai",
		dimension: "pl3",
	},

	// έχω — past_continuous = είχα (same as aorist; έχω is stative)
	{
		id: "echo-eicha",
		greek: "είχα",
		greeklish: "eicha",
		english: "I had",
		detail: "1st person singular",
		label: "είχα",
		category: "echo",
		dimension: "sg1",
	},
	{
		id: "echo-eiches",
		greek: "είχες",
		greeklish: "eiches",
		english: "you had",
		detail: "2nd person singular",
		label: "είχες",
		category: "echo",
		dimension: "sg2",
	},
	{
		id: "echo-eiche",
		greek: "είχε",
		greeklish: "eiche",
		english: "he / she / it had",
		detail: "3rd person singular",
		label: "είχε",
		category: "echo",
		dimension: "sg3",
	},
	{
		id: "echo-eichame",
		greek: "είχαμε",
		greeklish: "eichame",
		english: "we had",
		detail: "1st person plural",
		label: "είχαμε",
		category: "echo",
		dimension: "pl1",
	},
	{
		id: "echo-eichate",
		greek: "είχατε",
		greeklish: "eichate",
		english: "you all had",
		detail: "2nd person plural",
		label: "είχατε",
		category: "echo",
		dimension: "pl2",
	},
	{
		id: "echo-eichan",
		greek: "είχαν",
		greeklish: "eichan",
		english: "they had",
		detail: "3rd person plural",
		label: "είχαν",
		category: "echo",
		dimension: "pl3",
	},

	// θέλω
	{
		id: "thelo-ithela",
		greek: "ήθελα",
		greeklish: "ithela",
		english: "I wanted",
		detail: "1st person singular",
		label: "ήθελα",
		category: "thelo",
		dimension: "sg1",
	},
	{
		id: "thelo-itheles",
		greek: "ήθελες",
		greeklish: "itheles",
		english: "you wanted",
		detail: "2nd person singular",
		label: "ήθελες",
		category: "thelo",
		dimension: "sg2",
	},
	{
		id: "thelo-ithele",
		greek: "ήθελε",
		greeklish: "ithele",
		english: "he / she / it wanted",
		detail: "3rd person singular",
		label: "ήθελε",
		category: "thelo",
		dimension: "sg3",
	},
	{
		id: "thelo-thelame",
		greek: "θέλαμε",
		greeklish: "thelame",
		english: "we wanted",
		detail: "1st person plural",
		label: "θέλαμε",
		category: "thelo",
		dimension: "pl1",
	},
	{
		id: "thelo-thelate",
		greek: "θέλατε",
		greeklish: "thelate",
		english: "you all wanted",
		detail: "2nd person plural",
		label: "θέλατε",
		category: "thelo",
		dimension: "pl2",
	},
	{
		id: "thelo-ithelan",
		greek: "ήθελαν",
		greeklish: "ithelan",
		english: "they wanted",
		detail: "3rd person plural",
		label: "ήθελαν",
		category: "thelo",
		dimension: "pl3",
	},

	// ξέρω
	{
		id: "ksero-ixera",
		greek: "ήξερα",
		greeklish: "ixera",
		english: "I knew",
		detail: "1st person singular",
		label: "ήξερα",
		category: "ksero",
		dimension: "sg1",
	},
	{
		id: "ksero-ixeres",
		greek: "ήξερες",
		greeklish: "ixeres",
		english: "you knew",
		detail: "2nd person singular",
		label: "ήξερες",
		category: "ksero",
		dimension: "sg2",
	},
	{
		id: "ksero-ixere",
		greek: "ήξερε",
		greeklish: "ixere",
		english: "he / she / it knew",
		detail: "3rd person singular",
		label: "ήξερε",
		category: "ksero",
		dimension: "sg3",
	},
	{
		id: "ksero-xerame",
		greek: "ξέραμε",
		greeklish: "xerame",
		english: "we knew",
		detail: "1st person plural",
		label: "ξέραμε",
		category: "ksero",
		dimension: "pl1",
	},
	{
		id: "ksero-xerate",
		greek: "ξέρατε",
		greeklish: "xerate",
		english: "you all knew",
		detail: "2nd person plural",
		label: "ξέρατε",
		category: "ksero",
		dimension: "pl2",
	},
	{
		id: "ksero-ixeran",
		greek: "ήξεραν",
		greeklish: "ixeran",
		english: "they knew",
		detail: "3rd person plural",
		label: "ήξεραν",
		category: "ksero",
		dimension: "pl3",
	},

	// μπορώ
	{
		id: "boro-borousa",
		greek: "μπορούσα",
		greeklish: "borousa",
		english: "I could",
		detail: "1st person singular",
		label: "μπορούσα",
		category: "boro",
		dimension: "sg1",
	},
	{
		id: "boro-borouses",
		greek: "μπορούσες",
		greeklish: "borouses",
		english: "you could",
		detail: "2nd person singular",
		label: "μπορούσες",
		category: "boro",
		dimension: "sg2",
	},
	{
		id: "boro-borouse",
		greek: "μπορούσε",
		greeklish: "borouse",
		english: "he / she / it could",
		detail: "3rd person singular",
		label: "μπορούσε",
		category: "boro",
		dimension: "sg3",
	},
	{
		id: "boro-borousame",
		greek: "μπορούσαμε",
		greeklish: "borousame",
		english: "we could",
		detail: "1st person plural",
		label: "μπορούσαμε",
		category: "boro",
		dimension: "pl1",
	},
	{
		id: "boro-borousate",
		greek: "μπορούσατε",
		greeklish: "borousate",
		english: "you all could",
		detail: "2nd person plural",
		label: "μπορούσατε",
		category: "boro",
		dimension: "pl2",
	},
	{
		id: "boro-borousan",
		greek: "μπορούσαν",
		greeklish: "borousan",
		english: "they could",
		detail: "3rd person plural",
		label: "μπορούσαν",
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
