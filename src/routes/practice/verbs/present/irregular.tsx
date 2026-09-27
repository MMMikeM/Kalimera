import { createFileRoute } from "@tanstack/react-router";

import type { SimpleListItem } from "../../components/engines/deck";
import { Drill } from "../../components/engines/drill";
import { PERSON_DIMENSION_OPTIONS } from "../../components/engines/drill-constants";

// Irregular present-tense verbs (excluding είμαι, which has its own drill).
// These verbs break the regular -ω/-εις/-ει paradigm in stem or endings.
// Forward: "I have" → type "echo" (matchPhonetic → έχω)
// Reverse: show "πάμε" → tap the person/number chip for "we"

const PRONOUNS = {
	sg1: { english: "I", detail: "1st person singular" },
	sg2: { english: "you", detail: "2nd person singular" },
	sg3: { english: "he / she / it", detail: "3rd person singular" },
	pl1: { english: "we", detail: "1st person plural" },
	pl2: { english: "you all", detail: "2nd person plural" },
	pl3: { english: "they", detail: "3rd person plural" },
};

type Person = keyof typeof PRONOUNS;

interface VerbDef {
	id: string;
	lemma: string;
	categoryLabel: string;
	gloss: string; // verb meaning, e.g. "have"
	forms: Record<Person, { greek: string }>;
}

const VERBS: VerbDef[] = [
	{
		id: "echo",
		lemma: "έχω",
		categoryLabel: "έχω · have",
		gloss: "have",
		forms: {
			sg1: { greek: "έχω" },
			sg2: { greek: "έχεις" },
			sg3: { greek: "έχει" },
			pl1: { greek: "έχουμε" },
			pl2: { greek: "έχετε" },
			pl3: { greek: "έχουν" },
		},
	},
	{
		id: "pao",
		lemma: "πάω",
		categoryLabel: "πάω · go",
		gloss: "go",
		forms: {
			sg1: { greek: "πάω" },
			sg2: { greek: "πας" },
			sg3: { greek: "πάει" },
			pl1: { greek: "πάμε" },
			pl2: { greek: "πάτε" },
			pl3: { greek: "πάνε" },
		},
	},
	{
		id: "leo",
		lemma: "λέω",
		categoryLabel: "λέω · say",
		gloss: "say",
		forms: {
			sg1: { greek: "λέω" },
			sg2: { greek: "λες" },
			sg3: { greek: "λέει" },
			pl1: { greek: "λέμε" },
			pl2: { greek: "λέτε" },
			pl3: { greek: "λένε" },
		},
	},
	{
		id: "troo",
		lemma: "τρώω",
		categoryLabel: "τρώω · eat",
		gloss: "eat",
		forms: {
			sg1: { greek: "τρώω" },
			sg2: { greek: "τρως" },
			sg3: { greek: "τρώει" },
			pl1: { greek: "τρώμε" },
			pl2: { greek: "τρώτε" },
			pl3: { greek: "τρώνε" },
		},
	},
	{
		id: "akouo",
		lemma: "ακούω",
		categoryLabel: "ακούω · hear",
		gloss: "hear",
		forms: {
			sg1: { greek: "ακούω" },
			sg2: { greek: "ακούς" },
			sg3: { greek: "ακούει" },
			pl1: { greek: "ακούμε" },
			pl2: { greek: "ακούτε" },
			pl3: { greek: "ακούν" },
		},
	},
];

const PERSONS: Person[] = ["sg1", "sg2", "sg3", "pl1", "pl2", "pl3"];

const FORMS: SimpleListItem[] = VERBS.flatMap((v) =>
	PERSONS.map((p) => {
		const f = v.forms[p];
		const pron = PRONOUNS[p];
		return {
			id: `${v.id}-${p}`,
			greek: f.greek,
			english: `${pron.english} ${v.gloss}${p === "sg3" ? "s" : ""}`,
			detail: pron.detail,
			context: v.lemma,
			label: f.greek,
			category: v.id,
			dimension: p,
		};
	}),
);

const CATEGORIES = VERBS.map((v) => ({ id: v.id, label: v.categoryLabel }));

export const Route = createFileRoute("/practice/verbs/present/irregular")({
	component: PresentIrregularDrill,
});

function PresentIrregularDrill() {
	return (
		<Drill
			drillId="verbs-present-irregular"
			items={FORMS}
			backTo="/practice/verbs"
			subtitle="30 forms / timed"
			colorTheme="olive"
			forwardDesc="English → Greek present form"
			reverseLabel="Greek → person"
			reverseDesc="Present form → select person"
			categories={CATEGORIES}
			reverse={{
				kind: "single-select",
				options: PERSON_DIMENSION_OPTIONS,
			}}
		/>
	);
}
