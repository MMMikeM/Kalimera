import { CASE_ROW_DEFS, GENDER_COLUMN_DEFS, GrammarTable, GreekText } from "kalimera";

const GENDERS = ["masculine", "feminine", "neuter"] as const;
const CASES = ["nom", "acc", "gen"] as const;

const ARTICLES = {
	singular: {
		masculine: { nom: "ο", acc: "τον", gen: "του" },
		feminine: { nom: "η", acc: "τη(ν)", gen: "της" },
		neuter: { nom: "το", acc: "το", gen: "του" },
	},
	plural: {
		masculine: { nom: "οι", acc: "τους", gen: "των" },
		feminine: { nom: "οι", acc: "τις", gen: "των" },
		neuter: { nom: "τα", acc: "τα", gen: "των" },
	},
};

const GENDER_TEXT = {
	masculine: "text-gender-masculine-text",
	feminine: "text-gender-feminine-text",
	neuter: "text-gender-neuter-text",
};

const GENDER_CHIP = {
	masculine: "bg-gender-masculine-300 text-gender-masculine-950",
	feminine: "bg-gender-feminine-300 text-gender-feminine-950",
	neuter: "bg-gender-neuter-300 text-gender-neuter-950",
};

const articleCells = (number: "singular" | "plural") =>
	CASES.map((c) =>
		GENDERS.map((g) => (
			<GreekText key={`${c}-${g}`} size="sm" className={`font-semibold ${GENDER_TEXT[g]}`}>
				{ARTICLES[number][g][c]}
			</GreekText>
		)),
	);

export const CaseByGender = () => (
	<div className="max-w-md p-4">
		<div className="mb-2 text-xs font-medium text-stone-600">Singular</div>
		<GrammarTable columns={GENDER_COLUMN_DEFS} rows={CASE_ROW_DEFS} cells={articleCells("singular")} />
	</div>
);

export const Roomy = () => (
	<div className="max-w-lg p-4">
		<div className="mb-3 text-xs font-semibold tracking-widest text-stone-500 uppercase">Plural</div>
		<GrammarTable
			density="roomy"
			columns={GENDERS.map((g) => ({
				key: g,
				label: (
					<span
						className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${GENDER_CHIP[g]}`}
					>
						{g}
					</span>
				),
			}))}
			rows={CASE_ROW_DEFS}
			cells={CASES.map((c) =>
				GENDERS.map((g) => (
					<GreekText key={`${c}-${g}`} size="lg" className="font-semibold">
						{ARTICLES.plural[g][c]}
					</GreekText>
				)),
			)}
		/>
	</div>
);

export const SingularAndPlural = () => (
	<div className="max-w-md p-4">
		<GrammarTable
			columns={GENDER_COLUMN_DEFS}
			groups={(["singular", "plural"] as const).map((number) => ({
				label: number === "singular" ? "Singular" : "Plural",
				rows: CASE_ROW_DEFS,
				cells: articleCells(number),
			}))}
			rowHeaderLabel="Case"
		/>
	</div>
);

const INDEFINITES: Array<{ key: string; forms: Array<[greek: string, english: string]> }> = [
	{
		key: "thing",
		forms: [
			["κάτι", "something"],
			["τίποτα", "nothing, anything"],
			["όλα", "everything"],
		],
	},
	{
		key: "person",
		forms: [
			["κάποιος", "someone"],
			["κανένας", "no one, anyone"],
			["όλοι", "everyone"],
		],
	},
	{
		key: "place",
		forms: [
			["κάπου", "somewhere"],
			["πουθενά", "nowhere, anywhere"],
			["παντού", "everywhere"],
		],
	},
];

export const PlainRows = () => (
	<div className="max-w-md p-4">
		<GrammarTable
			columns={[
				{ key: "some", label: "some" },
				{ key: "none", label: "no, any" },
				{ key: "every", label: "every" },
			]}
			rows={INDEFINITES.map((row) => ({ key: row.key, label: row.key }))}
			cells={INDEFINITES.map((row) =>
				row.forms.map(([greek, english]) => (
					<span key={greek} className="block">
						<GreekText size="base" weight="medium" className="block">
							{greek}
						</GreekText>
						<span className="text-xs text-stone-500">{english}</span>
					</span>
				)),
			)}
			rowHeaderLabel="Kind"
		/>
	</div>
);

export const Centred = () => (
	<div className="max-w-sm p-4">
		<p className="mb-2 text-xs tracking-widest text-muted-foreground uppercase">πόσος agrees</p>
		<GrammarTable
			align="center"
			rowHeaderLabel="Form"
			columns={[
				{ key: "How much", label: "How much" },
				{ key: "How many", label: "How many" },
			]}
			rows={[
				{ key: "he-word (m)", label: "he-word (m)" },
				{ key: "she-word (f)", label: "she-word (f)" },
				{ key: "it-word (n)", label: "it-word (n)" },
			]}
			cells={[
				[<GreekText key="a">πόσος</GreekText>, <GreekText key="b">πόσοι</GreekText>],
				[<GreekText key="a">πόση</GreekText>, <GreekText key="b">πόσες</GreekText>],
				[<GreekText key="a">πόσο</GreekText>, <GreekText key="b">πόσα</GreekText>],
			]}
		/>
		<p className="mt-2 text-xs text-muted-foreground">
			On its own, <GreekText size="sm">πόσο</GreekText> asks price or degree —{" "}
			<GreekText size="sm">πόσο κάνει;</GreekText>
		</p>
	</div>
);
