import { type DrillForm } from "../../engines/drill-engine";
import {
	CASE_CHIP,
	type Gender as ChipGender,
	GENDER_CHIP,
	HERO_TEXT,
	NUMBER_CHIP,
} from "../../engines/chip-specs";
import { DimensionalDrill, type DimensionSpec } from "../../engines/dimensional-drill";
import { ForwardPromptCard } from "../../engines/forward-prompt-card";
import { GENDER_STYLE } from "../../engines/drill-constants";

type Gender = "masculine" | "feminine" | "neuter";
type Num = "singular" | "plural";
type DimKey = "gender" | "number";

interface Contraction extends DrillForm, Record<DimKey, string> {
	gender: Gender;
	number: Num;
}

const CONTRACTIONS: Contraction[] = [
	{ id: "m-sg", gender: "masculine", number: "singular", greek: "στον", greeklish: "ston", label: "masculine / singular" },
	{ id: "f-sg", gender: "feminine", number: "singular", greek: "στην", greeklish: "stin", label: "feminine / singular" },
	{ id: "n-sg", gender: "neuter", number: "singular", greek: "στο", greeklish: "sto", label: "neuter / singular" },
	{ id: "m-pl", gender: "masculine", number: "plural", greek: "στους", greeklish: "stous", label: "masculine / plural" },
	{ id: "f-pl", gender: "feminine", number: "plural", greek: "στις", greeklish: "stis", label: "feminine / plural" },
	{ id: "n-pl", gender: "neuter", number: "plural", greek: "στα", greeklish: "sta", label: "neuter / plural" },
];

const PARADIGM_ROWS: { label: string; forms: [string, string] }[] = [
	{ label: "Masculine", forms: ["στον", "στους"] },
	{ label: "Feminine", forms: ["στην", "στις"] },
	{ label: "Neuter", forms: ["στο", "στα"] },
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
		key: "gender",
		values: ["masculine", "feminine", "neuter"] as const,
		selectorStyle: (v) => {
			const s = GENDER_STYLE[v as Gender];
			return { bg: s.selectorBg, text: s.selectorText };
		},
	},
	{
		key: "number",
		values: ["singular", "plural"] as const,
		selectorStyle: () => ({ bg: "bg-terracotta-100", text: "text-terracotta-text" }),
	},
];

export default function ContractionsDrill() {
	return (
		<DimensionalDrill<DimKey>
			drillId="articles-contractions"
			title="Contractions (σε)"
			subtitle="6 forms / timed"
			paradigm={<Paradigm />}
			note={
				<>
					<span lang="el" className="greek-text">σε</span> + definite article (always accusative)
				</>
			}
			forwardDesc="e.g. feminine / singular → στην"
			reverseDesc="e.g. στην → feminine / singular"
			forms={CONTRACTIONS}
			dimensions={DIMENSIONS}
			barColorBase="bg-terracotta"
			defaultSessionSize={10}
			renderForwardPrompt={(form) => {
				const gender = GENDER_CHIP[form.gender as ChipGender];
				const number = NUMBER_CHIP[form.number as keyof typeof NUMBER_CHIP];
				const caseSpec = CASE_CHIP.accusative;
				return (
					<ForwardPromptCard
						caption="to the / at the"
						facets={[
							{
								icon: gender.icon,
								label: gender.longLabel,
								colorText: HERO_TEXT.gender[form.gender as ChipGender],
							},
							{
								icon: number.icon,
								label: number.longLabel,
								colorText: HERO_TEXT.number[form.number as keyof typeof HERO_TEXT.number],
							},
							{
								icon: caseSpec.icon,
								label: caseSpec.longLabel,
								colorText: HERO_TEXT.case.accusative,
								muted: true,
							},
						]}
					/>
				);
			}}
		/>
	);
}
