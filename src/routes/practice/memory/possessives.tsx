import { GENDER_STYLE, PERSON_LABELS } from "./drill-constants";
import { PersonNumberGenderDrill } from "./components/PersonNumberGenderDrill";

type Person = "first" | "second" | "third";
type Gender = "masculine" | "feminine" | "neuter";
type Num = "singular" | "plural";

interface Possessive {
	id: string;
	greek: string;
	greeklish: string;
	label: string;
	person: Person;
	number: Num;
	gender?: Gender;
}

const ENGLISH: Record<string, string> = {
	"1sg": "my",
	"2sg": "your",
	"3sg-m": "his",
	"3sg-f": "her",
	"3sg-n": "its",
	"1pl": "our",
	"2pl": "your",
	"3pl": "their",
};

const POSSESSIVES: Possessive[] = [
	{
		id: "1sg",
		person: "first",
		number: "singular",
		greek: "μου",
		greeklish: "mou",
		label: "my / 1st singular",
	},
	{
		id: "2sg",
		person: "second",
		number: "singular",
		greek: "σου",
		greeklish: "sou",
		label: "your / 2nd singular",
	},
	{
		id: "3sg-m",
		person: "third",
		number: "singular",
		gender: "masculine",
		greek: "του",
		greeklish: "tou",
		label: "his / 3rd singular",
	},
	{
		id: "3sg-f",
		person: "third",
		number: "singular",
		gender: "feminine",
		greek: "της",
		greeklish: "tis",
		label: "her / 3rd singular",
	},
	{
		id: "3sg-n",
		person: "third",
		number: "singular",
		gender: "neuter",
		greek: "του",
		greeklish: "tou",
		label: "its / 3rd singular",
	},
	{
		id: "1pl",
		person: "first",
		number: "plural",
		greek: "μας",
		greeklish: "mas",
		label: "our / 1st plural",
	},
	{
		id: "2pl",
		person: "second",
		number: "plural",
		greek: "σας",
		greeklish: "sas",
		label: "your / 2nd plural",
	},
	{
		id: "3pl",
		person: "third",
		number: "plural",
		greek: "τους",
		greeklish: "tous",
		label: "their / 3rd plural",
	},
];

const PARADIGM_ROWS: { label: string; forms: [string, string] }[] = [
	{ label: "1st", forms: ["μου", "μας"] },
	{ label: "2nd", forms: ["σου", "σας"] },
	{ label: "3rd m", forms: ["του", "τους"] },
	{ label: "3rd f", forms: ["της", "τους"] },
	{ label: "3rd n", forms: ["του", "τους"] },
];

export default function PossessivesDrill() {
	return (
		<PersonNumberGenderDrill
			forms={POSSESSIVES}
			englishMap={ENGLISH}
			paradigmRows={PARADIGM_ROWS}
			paradigmRowLabelColor="text-olive-text"
			genderStyle={GENDER_STYLE}
			personLabels={PERSON_LABELS}
			colorTheme="olive"
			barColorBase="bg-olive"
			selectorBg="bg-olive-100"
			selectorText="text-olive-text"
			showGenderRow={(selPerson, selNumber) => selPerson === "third" && selNumber === "singular"}
			needsGender={(selPerson, selNumber) => selPerson === "third" && selNumber === "singular"}
			configTitle="Possessive Pronouns"
			configSubtitle="8 forms / timed"
			configForwardDesc="English meaning → Greek form"
			configReverseDesc="Greek form → person / number / gender"
		/>
	);
}
