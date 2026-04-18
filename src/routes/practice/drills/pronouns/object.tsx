import { type DrillForm } from "../../engines/drill-engine";
import {
	type Gender as ChipGender,
	GENDER_CHIP,
	HERO_TEXT,
	NUMBER_CHIP,
	PERSON_CHIP,
} from "../../engines/chip-specs";
import { DimensionalDrill, type DimensionSpec } from "../../engines/dimensional-drill";
import { ForwardPromptCard } from "../../engines/forward-prompt-card";
import { GENDER_STYLE, PERSON_LABELS } from "../../engines/drill-constants";

type Person = "first" | "second" | "third";
type Gender = "masculine" | "feminine" | "neuter";
type Num = "singular" | "plural";
type DimKey = "person" | "number" | "gender";

interface ObjectPronoun extends DrillForm, Record<DimKey, string> {
	person: Person;
	number: Num;
	gender: Gender | "";
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
	{ id: "1sg", person: "first", number: "singular", gender: "", greek: "με", greeklish: "me", label: "me / 1st singular" },
	{ id: "2sg", person: "second", number: "singular", gender: "", greek: "σε", greeklish: "se", label: "you / 2nd singular" },
	{ id: "3sg-m", person: "third", number: "singular", gender: "masculine", greek: "τον", greeklish: "ton", label: "him / 3rd singular" },
	{ id: "3sg-f", person: "third", number: "singular", gender: "feminine", greek: "την", greeklish: "tin", label: "her / 3rd singular" },
	{ id: "3sg-n", person: "third", number: "singular", gender: "neuter", greek: "το", greeklish: "to", label: "it / 3rd singular" },
	{ id: "1pl", person: "first", number: "plural", gender: "", greek: "μας", greeklish: "mas", label: "us / 1st plural" },
	{ id: "2pl", person: "second", number: "plural", gender: "", greek: "σας", greeklish: "sas", label: "you / 2nd plural" },
	{ id: "3pl-m", person: "third", number: "plural", gender: "masculine", greek: "τους", greeklish: "tous", label: "them (m) / 3rd plural" },
	{ id: "3pl-f", person: "third", number: "plural", gender: "feminine", greek: "τις", greeklish: "tis", label: "them (f) / 3rd plural" },
	{ id: "3pl-n", person: "third", number: "plural", gender: "neuter", greek: "τα", greeklish: "ta", label: "them (n) / 3rd plural" },
];

const PARADIGM_ROWS: { label: string; forms: [string, string] }[] = [
	{ label: "1st", forms: ["με", "μας"] },
	{ label: "2nd", forms: ["σε", "σας"] },
	{ label: "3rd masculine", forms: ["τον", "τους"] },
	{ label: "3rd feminine", forms: ["την", "τις"] },
	{ label: "3rd neuter", forms: ["το", "τα"] },
];

const Paradigm = () => (
	<div className="overflow-x-auto">
		<table className="w-full border-collapse text-sm">
			<thead>
				<tr>
					<th className="py-1 pr-4 text-left text-xs font-normal text-muted-foreground" />
					<th className="px-3 py-1 text-center text-xs font-medium text-muted-foreground">Singular</th>
					<th className="px-3 py-1 text-center text-xs font-medium text-muted-foreground">Plural</th>
				</tr>
			</thead>
			<tbody>
				{PARADIGM_ROWS.map((row) => (
					<tr key={row.label} className="border-t border-stone-100">
						<td className="py-1.5 pr-4 text-xs font-medium text-terracotta-text">{row.label}</td>
						{row.forms.map((form, i) => (
							<td
								key={`${row.label}-${i}`}
								lang="el"
								className="greek-text px-3 py-1.5 text-center text-base text-foreground"
							>
								{form}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	</div>
);

const DIMENSIONS: DimensionSpec<DimKey>[] = [
	{
		key: "person",
		values: ["first", "second", "third"] as const,
		label: (v) => PERSON_LABELS[v as Person],
		selectorStyle: () => ({ bg: "bg-terracotta-100", text: "text-terracotta-text" }),
	},
	{
		key: "number",
		values: ["singular", "plural"] as const,
		selectorStyle: () => ({ bg: "bg-terracotta-100", text: "text-terracotta-text" }),
	},
	{
		key: "gender",
		values: ["masculine", "feminine", "neuter"] as const,
		selectorStyle: (v) => {
			const s = GENDER_STYLE[v as Gender];
			return { bg: s.selectorBg, text: s.selectorText };
		},
		shown: (sel) => sel.person === "third",
		required: (sel) => sel.person === "third",
	},
];

export default function PronounsDrill() {
	return (
		<DimensionalDrill<DimKey>
			drillId="pronouns-object"
			title="Object Pronouns"
			subtitle="10 forms / timed"
			paradigm={<Paradigm />}
			forwardDesc="e.g. me → με"
			reverseDesc="e.g. με → 1st / singular"
			forms={PRONOUNS}
			dimensions={DIMENSIONS}
			barColorBase="bg-terracotta"
			defaultSessionSize={10}
			renderForwardPrompt={(form) => {
				const english = ENGLISH[form.id] ?? "";
				const person = PERSON_CHIP[form.person as Person];
				const number = NUMBER_CHIP[form.number as keyof typeof NUMBER_CHIP];
				const gender = form.gender ? GENDER_CHIP[form.gender as ChipGender] : null;
				const facets = [
					{
						icon: person.icon,
						label: person.longLabel,
						colorText: HERO_TEXT.person[form.person as Person],
					},
					{
						icon: number.icon,
						label: number.longLabel,
						colorText: HERO_TEXT.number[form.number as keyof typeof HERO_TEXT.number],
					},
				];
				if (gender && form.gender) {
					facets.push({
						icon: gender.icon,
						label: gender.longLabel,
						colorText: HERO_TEXT.gender[form.gender as ChipGender],
					});
				}
				return <ForwardPromptCard facets={facets} gloss={`“${english}”`} />;
			}}
		/>
	);
}
