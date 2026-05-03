import { SPEEDS } from "../../drill-speeds";
import { SimpleListDrill, type SimpleListItem } from "../../engines/simple-list-drill";

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
	forms: Record<Person, { greek: string; greeklish: string }>;
}

const VERBS: VerbDef[] = [
	{
		id: "echo",
		lemma: "έχω",
		categoryLabel: "έχω · have",
		gloss: "have",
		forms: {
			sg1: { greek: "έχω", greeklish: "echo" },
			sg2: { greek: "έχεις", greeklish: "echeis" },
			sg3: { greek: "έχει", greeklish: "echei" },
			pl1: { greek: "έχουμε", greeklish: "echoume" },
			pl2: { greek: "έχετε", greeklish: "echete" },
			pl3: { greek: "έχουν", greeklish: "echoun" },
		},
	},
	{
		id: "pao",
		lemma: "πάω",
		categoryLabel: "πάω · go",
		gloss: "go",
		forms: {
			sg1: { greek: "πάω", greeklish: "pao" },
			sg2: { greek: "πας", greeklish: "pas" },
			sg3: { greek: "πάει", greeklish: "paei" },
			pl1: { greek: "πάμε", greeklish: "pame" },
			pl2: { greek: "πάτε", greeklish: "pate" },
			pl3: { greek: "πάνε", greeklish: "pane" },
		},
	},
	{
		id: "leo",
		lemma: "λέω",
		categoryLabel: "λέω · say",
		gloss: "say",
		forms: {
			sg1: { greek: "λέω", greeklish: "leo" },
			sg2: { greek: "λες", greeklish: "les" },
			sg3: { greek: "λέει", greeklish: "leei" },
			pl1: { greek: "λέμε", greeklish: "leme" },
			pl2: { greek: "λέτε", greeklish: "lete" },
			pl3: { greek: "λένε", greeklish: "lene" },
		},
	},
	{
		id: "troo",
		lemma: "τρώω",
		categoryLabel: "τρώω · eat",
		gloss: "eat",
		forms: {
			sg1: { greek: "τρώω", greeklish: "troo" },
			sg2: { greek: "τρως", greeklish: "tros" },
			sg3: { greek: "τρώει", greeklish: "troei" },
			pl1: { greek: "τρώμε", greeklish: "trome" },
			pl2: { greek: "τρώτε", greeklish: "trote" },
			pl3: { greek: "τρώνε", greeklish: "trone" },
		},
	},
	{
		id: "akouo",
		lemma: "ακούω",
		categoryLabel: "ακούω · hear",
		gloss: "hear",
		forms: {
			sg1: { greek: "ακούω", greeklish: "akouo" },
			sg2: { greek: "ακούς", greeklish: "akous" },
			sg3: { greek: "ακούει", greeklish: "akouei" },
			pl1: { greek: "ακούμε", greeklish: "akoume" },
			pl2: { greek: "ακούτε", greeklish: "akoute" },
			pl3: { greek: "ακούν", greeklish: "akoun" },
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
			greeklish: f.greeklish,
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

const DIMENSION_OPTIONS = [
	{ id: "sg1", label: "I", selectorBg: "bg-stone-100", selectorText: "text-stone-800" },
	{ id: "sg2", label: "you", selectorBg: "bg-stone-100", selectorText: "text-stone-800" },
	{ id: "sg3", label: "he / she", selectorBg: "bg-stone-100", selectorText: "text-stone-800" },
	{ id: "pl1", label: "we", selectorBg: "bg-stone-100", selectorText: "text-stone-800" },
	{ id: "pl2", label: "you all", selectorBg: "bg-stone-100", selectorText: "text-stone-800" },
	{ id: "pl3", label: "they", selectorBg: "bg-stone-100", selectorText: "text-stone-800" },
];

export default function PresentIrregularDrill() {
	return (
		<SimpleListDrill
			drillId="verbs-present-irregular"
			items={FORMS}
			title="Irregular verbs · present"
			subtitle="30 forms / timed"
			colorTheme="olive"
			forwardDesc="English → Greek present form"
			reverseLabel="Greek → person"
			reverseDesc="Present form → select person"
			categories={CATEGORIES}
			reverseDimension={{
				options: DIMENSION_OPTIONS,
				getCorrectId: (item) => item.dimension ?? "",
			}}
			speeds={SPEEDS}
		/>
	);
}
