import { GENDER_STYLE, PERSON_LABELS } from "./drill-constants";
import { PersonNumberGenderDrill } from "./components/PersonNumberGenderDrill";

type Person = "first" | "second" | "third";
type Gender = "masculine" | "feminine" | "neuter";
type Num = "singular" | "plural";

interface ObjectPronoun {
	id: string;
	greek: string;
	greeklish: string;
	label: string;
	person: Person;
	number: Num;
	gender?: Gender;
}

const ENGLISH: Record<string, string> = {
	"1sg": "me",
	"2sg": "you",
	"3sg-m": "him",
	"3sg-f": "her",
	"3sg-n": "it",
	"1pl": "us",
	"2pl": "you",
	"3pl-m": "them",
	"3pl-f": "them",
	"3pl-n": "them",
};

const PRONOUNS: ObjectPronoun[] = [
	{
		id: "1sg",
		person: "first",
		number: "singular",
		greek: "με",
		greeklish: "me",
		label: "me / 1st singular",
	},
	{
		id: "2sg",
		person: "second",
		number: "singular",
		greek: "σε",
		greeklish: "se",
		label: "you / 2nd singular",
	},
	{
		id: "3sg-m",
		person: "third",
		number: "singular",
		gender: "masculine",
		greek: "τον",
		greeklish: "ton",
		label: "him / 3rd singular",
	},
	{
		id: "3sg-f",
		person: "third",
		number: "singular",
		gender: "feminine",
		greek: "την",
		greeklish: "tin",
		label: "her / 3rd singular",
	},
	{
		id: "3sg-n",
		person: "third",
		number: "singular",
		gender: "neuter",
		greek: "το",
		greeklish: "to",
		label: "it / 3rd singular",
	},
	{
		id: "1pl",
		person: "first",
		number: "plural",
		greek: "μας",
		greeklish: "mas",
		label: "us / 1st plural",
	},
	{
		id: "2pl",
		person: "second",
		number: "plural",
		greek: "σας",
		greeklish: "sas",
		label: "you / 2nd plural",
	},
	{
		id: "3pl-m",
		person: "third",
		number: "plural",
		gender: "masculine",
		greek: "τους",
		greeklish: "tous",
		label: "them (m) / 3rd plural",
	},
	{
		id: "3pl-f",
		person: "third",
		number: "plural",
		gender: "feminine",
		greek: "τις",
		greeklish: "tis",
		label: "them (f) / 3rd plural",
	},
	{
		id: "3pl-n",
		person: "third",
		number: "plural",
		gender: "neuter",
		greek: "τα",
		greeklish: "ta",
		label: "them (n) / 3rd plural",
	},
];

const PARADIGM_ROWS: { label: string; forms: [string, string] }[] = [
	{ label: "1st", forms: ["με", "μας"] },
	{ label: "2nd", forms: ["σε", "σας"] },
	{ label: "3rd m", forms: ["τον", "τους"] },
	{ label: "3rd f", forms: ["την", "τις"] },
	{ label: "3rd n", forms: ["το", "τα"] },
];

export default function PronounsDrill() {
	return (
		<PersonNumberGenderDrill
			forms={PRONOUNS}
			englishMap={ENGLISH}
			paradigmRows={PARADIGM_ROWS}
			paradigmRowLabelColor="text-terracotta-text"
			genderStyle={GENDER_STYLE}
			personLabels={PERSON_LABELS}
			colorTheme="terracotta"
			barColorBase="bg-terracotta"
			selectorBg="bg-terracotta-100"
			selectorText="text-terracotta-text"
			showGenderRow={(selPerson, _selNumber) => selPerson === "third"}
			needsGender={(selPerson, _selNumber) => selPerson === "third"}
			configTitle="Object Pronouns"
			configSubtitle="10 forms / timed"
			configForwardDesc="English meaning → Greek form"
			configReverseDesc="Greek form → person / number / gender"
		/>
	);
}
