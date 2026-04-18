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

interface Possessive extends DrillForm, Record<DimKey, string> {
	person: Person;
	number: Num;
	gender: Gender | "";
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
	{ id: "1sg", person: "first", number: "singular", gender: "", greek: "μου", greeklish: "mou", label: "my / 1st singular" },
	{ id: "2sg", person: "second", number: "singular", gender: "", greek: "σου", greeklish: "sou", label: "your / 2nd singular" },
	{ id: "3sg-m", person: "third", number: "singular", gender: "masculine", greek: "του", greeklish: "tou", label: "his / 3rd singular" },
	{ id: "3sg-f", person: "third", number: "singular", gender: "feminine", greek: "της", greeklish: "tis", label: "her / 3rd singular" },
	{ id: "3sg-n", person: "third", number: "singular", gender: "neuter", greek: "του", greeklish: "tou", label: "its / 3rd singular" },
	{ id: "1pl", person: "first", number: "plural", gender: "", greek: "μας", greeklish: "mas", label: "our / 1st plural" },
	{ id: "2pl", person: "second", number: "plural", gender: "", greek: "σας", greeklish: "sas", label: "your / 2nd plural" },
	{ id: "3pl", person: "third", number: "plural", gender: "", greek: "τους", greeklish: "tous", label: "their / 3rd plural" },
];

const PARADIGM_ROWS: { label: string; forms: [string, string] }[] = [
	{ label: "1st", forms: ["μου", "μας"] },
	{ label: "2nd", forms: ["σου", "σας"] },
	{ label: "3rd masculine", forms: ["του", "τους"] },
	{ label: "3rd feminine", forms: ["της", "τους"] },
	{ label: "3rd neuter", forms: ["του", "τους"] },
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
						<td className="py-1.5 pr-4 text-xs font-medium text-olive-text">{row.label}</td>
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
		selectorStyle: () => ({ bg: "bg-olive-100", text: "text-olive-text" }),
	},
	{
		key: "number",
		values: ["singular", "plural"] as const,
		selectorStyle: () => ({ bg: "bg-olive-100", text: "text-olive-text" }),
	},
	{
		key: "gender",
		values: ["masculine", "feminine", "neuter"] as const,
		selectorStyle: (v) => {
			const s = GENDER_STYLE[v as Gender];
			return { bg: s.selectorBg, text: s.selectorText };
		},
		shown: (sel) => sel.person === "third" && sel.number === "singular",
		required: (sel) => sel.person === "third" && sel.number === "singular",
	},
];

export default function PossessivesDrill() {
	return (
		<DimensionalDrill<DimKey>
			drillId="pronouns-possessives"
			title="Possessive Pronouns"
			subtitle="8 forms / timed"
			paradigm={<Paradigm />}
			forwardDesc="e.g. my → μου"
			reverseDesc="e.g. μου → 1st / singular"
			forms={POSSESSIVES}
			dimensions={DIMENSIONS}
			barColorBase="bg-olive"
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
						colorText: "text-olive-700",
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
