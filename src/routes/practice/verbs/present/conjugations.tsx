import { createFileRoute } from "@tanstack/react-router";

import { GrammarTable } from "@/components/GrammarTable";
import { GreekGloss } from "@/components/GreekGloss";
import { GreekText } from "@/components/GreekText";
import type { VerbForm } from "@/constants/verbs";

import type { Attempt } from "../../components/engines/deck";
import { Drill } from "../../components/engines/drill";
import { useDrillStore } from "../../components/engines/drill-store";
import type { AnswerSize } from "../../components/engines/shells";
import {
	CATEGORIES,
	ENDINGS,
	type EndingItem,
	formShown,
	fullForm,
	paradigmRows,
	typedInstead,
} from "./conjugations.data";

// Context line carries tense + family; the label is just the pronoun.
// Splits the three dimensions into a scannable visual hierarchy:
//   [title]
//   present · -ω verb          ← context (small)
//   we                          ← pronoun (big)
// The Latin gloss is derived at render by <Pronunciation>, never stored.

export const Route = createFileRoute("/practice/verbs/present/conjugations")({
	component: ConjugationEndingsDrill,
});

const StemAndEnding = ({ form }: { form: VerbForm }) => (
	<>
		<span className="text-muted-foreground">{form.stem}</span>
		{form.ending}
	</>
);

/** The whole verb, with the stem quieter so the ending the card asked for stands out. */
const WholeVerb = ({ attempt, size }: { attempt: Attempt<EndingItem>; size: AnswerSize }) => {
	const form = formShown(attempt.form, attempt.userInput);
	return (
		<GreekGloss greek={fullForm(form)} size={size}>
			<StemAndEnding form={form} />
		</GreekGloss>
	);
};

const MissedPerson = ({ attempt }: { attempt: Attempt<EndingItem> }) => {
	const other = typedInstead(attempt.form, attempt.userInput);
	if (!other) return null;
	return <p className="mt-2 text-sm text-muted-foreground">That's the “{other.label}” form.</p>;
};

/** The chosen verb's six forms, shown before the session so the first card asks for nothing unseen. */
const ChosenParadigm = () => {
	const category = useDrillStore((s) => s.activeCategory);
	const verb = CATEGORIES.find((c) => c.id === category);
	if (!verb) {
		return <p className="mb-6 text-sm text-muted-foreground">All verbs, mixed.</p>;
	}
	const rows = paradigmRows(verb.id);
	const alternatives = rows.filter((row) => row.alternative);
	return (
		<div className="mb-8">
			<GrammarTable
				rowHeaderLabel="Person"
				columns={[{ key: "form", label: verb.label }]}
				rows={rows.map((row) => ({ key: row.id, label: row.pronoun }))}
				cells={rows.map((row) => [
					<GreekText key={row.id}>
						<StemAndEnding form={row.word} />
					</GreekText>,
				])}
			/>
			{alternatives.length > 0 && (
				<p className="mt-2 text-xs text-muted-foreground">
					Also said:{" "}
					{alternatives.map((row, i) => (
						<span key={row.id}>
							{i > 0 && ", "}
							<GreekText>{fullForm(row.alternative!)}</GreekText> ({row.pronoun})
						</span>
					))}
				</p>
			)}
		</div>
	);
};

function ConjugationEndingsDrill() {
	return (
		<Drill
			drillId="verbs-conjugation-endings"
			items={ENDINGS}
			backTo="/practice/verbs"
			subtitle="One verb at a time / timed"
			colorTheme="olive"
			forwardDesc="Pronoun + paradigm → ending"
			reverseDesc="Ending → pronoun (self-assess)"
			categories={CATEGORIES}
			defaultCategory={CATEGORIES[0]!.id}
			configExtras={<ChosenParadigm />}
			renderAnswer={(attempt, size) => <WholeVerb attempt={attempt} size={size} />}
			explainMiss={(attempt) => <MissedPerson attempt={attempt} />}
		/>
	);
}
