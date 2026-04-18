import { type DrillForm } from "../../engines/drill-engine";
import {
	CASE_BAR,
	CASE_CHIP,
	type Case,
	type Gender as ChipGender,
	GENDER_CHIP,
	HERO_TEXT,
	NUMBER_CHIP,
} from "../../engines/chip-specs";
import { DimensionalDrill, type DimensionSpec } from "../../engines/dimensional-drill";
import { ForwardPromptCard } from "../../engines/forward-prompt-card";
import { GENDER_STYLE } from "../../engines/drill-constants";

type ArticleCase = "nominative" | "accusative" | "genitive";
type Gender = "masculine" | "feminine" | "neuter";
type Num = "singular" | "plural";

type DimKey = "case" | "gender" | "number";

interface Article extends DrillForm, Record<DimKey, string> {
	case: ArticleCase;
	gender: Gender;
	number: Num;
}

const ARTICLES: Article[] = [
	{ id: "nom-m-sg", case: "nominative", gender: "masculine", number: "singular", greek: "ο", greeklish: "o", label: "masculine / singular / nominative" },
	{ id: "nom-f-sg", case: "nominative", gender: "feminine", number: "singular", greek: "η", greeklish: "i", label: "feminine / singular / nominative" },
	{ id: "nom-n-sg", case: "nominative", gender: "neuter", number: "singular", greek: "το", greeklish: "to", label: "neuter / singular / nominative" },
	{ id: "acc-m-sg", case: "accusative", gender: "masculine", number: "singular", greek: "τον", greeklish: "ton", label: "masculine / singular / accusative" },
	{ id: "acc-f-sg", case: "accusative", gender: "feminine", number: "singular", greek: "την", greeklish: "tin", label: "feminine / singular / accusative" },
	{ id: "acc-n-sg", case: "accusative", gender: "neuter", number: "singular", greek: "το", greeklish: "to", label: "neuter / singular / accusative" },
	{ id: "gen-m-sg", case: "genitive", gender: "masculine", number: "singular", greek: "του", greeklish: "tou", label: "masculine / singular / genitive" },
	{ id: "gen-f-sg", case: "genitive", gender: "feminine", number: "singular", greek: "της", greeklish: "tis", label: "feminine / singular / genitive" },
	{ id: "gen-n-sg", case: "genitive", gender: "neuter", number: "singular", greek: "του", greeklish: "tou", label: "neuter / singular / genitive" },
	{ id: "nom-m-pl", case: "nominative", gender: "masculine", number: "plural", greek: "οι", greeklish: "i", label: "masculine / plural / nominative" },
	{ id: "nom-f-pl", case: "nominative", gender: "feminine", number: "plural", greek: "οι", greeklish: "i", label: "feminine / plural / nominative" },
	{ id: "nom-n-pl", case: "nominative", gender: "neuter", number: "plural", greek: "τα", greeklish: "ta", label: "neuter / plural / nominative" },
	{ id: "acc-m-pl", case: "accusative", gender: "masculine", number: "plural", greek: "τους", greeklish: "tous", label: "masculine / plural / accusative" },
	{ id: "acc-f-pl", case: "accusative", gender: "feminine", number: "plural", greek: "τις", greeklish: "tis", label: "feminine / plural / accusative" },
	{ id: "acc-n-pl", case: "accusative", gender: "neuter", number: "plural", greek: "τα", greeklish: "ta", label: "neuter / plural / accusative" },
	{ id: "gen-m-pl", case: "genitive", gender: "masculine", number: "plural", greek: "των", greeklish: "ton", label: "masculine / plural / genitive" },
	{ id: "gen-f-pl", case: "genitive", gender: "feminine", number: "plural", greek: "των", greeklish: "ton", label: "feminine / plural / genitive" },
	{ id: "gen-n-pl", case: "genitive", gender: "neuter", number: "plural", greek: "των", greeklish: "ton", label: "neuter / plural / genitive" },
];

const caseText = (c: ArticleCase) => CASE_CHIP[c].colorText;
const caseBar = (c: ArticleCase) => CASE_BAR[c].bar;
const caseBg = (c: ArticleCase) => CASE_BAR[c].bg;

const PARADIGM_ROWS: {
	label: string;
	caseKey: ArticleCase;
	forms: [string, string, string];
}[] = [
	{ label: "Nom sg", caseKey: "nominative", forms: ["ο", "η", "το"] },
	{ label: "Acc sg", caseKey: "accusative", forms: ["τον", "την", "το"] },
	{ label: "Gen sg", caseKey: "genitive", forms: ["του", "της", "του"] },
	{ label: "Nom pl", caseKey: "nominative", forms: ["οι", "οι", "τα"] },
	{ label: "Acc pl", caseKey: "accusative", forms: ["τους", "τις", "τα"] },
	{ label: "Gen pl", caseKey: "genitive", forms: ["των", "των", "των"] },
];

const Paradigm = () => (
	<div className="overflow-x-auto">
		<table className="w-full border-collapse text-sm">
			<thead>
				<tr>
					<th className="py-1 pr-4 text-left text-xs font-normal text-muted-foreground" />
					<th className="px-3 py-1 text-center text-xs font-medium text-navy-text">Masculine</th>
					<th className="px-3 py-1 text-center text-xs font-medium text-sunset-text">Feminine</th>
					<th className="px-3 py-1 text-center text-xs font-medium text-slate-text">Neuter</th>
				</tr>
			</thead>
			<tbody>
				{PARADIGM_ROWS.map((row) => (
					<tr key={row.label} className="border-t border-stone-100">
						<td className={`py-1.5 pr-4 text-xs font-medium ${caseText(row.caseKey)}`}>
							{row.label}
						</td>
						{(["masculine", "feminine", "neuter"] as const).map((g, i) => (
							<td
								key={g}
								lang="el"
								className="greek-text px-3 py-1.5 text-center text-base text-foreground"
							>
								{row.forms[i]}
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
	{
		key: "case",
		values: ["nominative", "accusative", "genitive"] as const,
		selectorStyle: (v) => ({ bg: caseBg(v as ArticleCase), text: caseText(v as ArticleCase) }),
	},
];

export default function ArticlesDrill() {
	return (
		<DimensionalDrill<DimKey>
			drillId="articles-paradigm"
			title="Definite Articles"
			subtitle="18 forms / timed"
			paradigm={<Paradigm />}
			forwardDesc="e.g. masculine / singular / accusative → τον"
			reverseDesc="e.g. τον → masculine / singular / accusative"
			forms={ARTICLES}
			dimensions={DIMENSIONS}
			barColorBase={(form) => caseBar(form.case as ArticleCase)}
			renderForwardPrompt={(form) => {
				const gender = GENDER_CHIP[form.gender as ChipGender];
				const number = NUMBER_CHIP[form.number as keyof typeof NUMBER_CHIP];
				const caseSpec = CASE_CHIP[form.case as Case];
				return (
					<ForwardPromptCard
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
								colorText: HERO_TEXT.case[form.case as Case],
							},
						]}
					/>
				);
			}}
		/>
	);
}
