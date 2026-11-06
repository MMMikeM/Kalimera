import { createFileRoute } from "@tanstack/react-router";

import { GreekGloss } from "@/components/GreekGloss";

import type { Attempt } from "../../components/engines/deck";
import { Drill } from "../../components/engines/drill";
import type { AnswerSize } from "../../components/engines/shells";
import {
	CATEGORIES,
	ENDINGS,
	type EndingItem,
	formShown,
	fullForm,
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

/** The whole verb, with the stem quieter so the ending the card asked for stands out. */
const WholeVerb = ({ attempt, size }: { attempt: Attempt<EndingItem>; size: AnswerSize }) => {
	const form = formShown(attempt.form, attempt.userInput);
	return (
		<GreekGloss greek={fullForm(form)} size={size}>
			<span className="text-muted-foreground">{form.stem}</span>
			{form.ending}
		</GreekGloss>
	);
};

const MissedPerson = ({ attempt }: { attempt: Attempt<EndingItem> }) => {
	const other = typedInstead(attempt.form, attempt.userInput);
	if (!other) return null;
	return <p className="mt-2 text-sm text-muted-foreground">That's the “{other.label}” form.</p>;
};

function ConjugationEndingsDrill() {
	return (
		<Drill
			drillId="verbs-conjugation-endings"
			items={ENDINGS}
			backTo="/practice/verbs"
			subtitle="42 forms / timed"
			colorTheme="olive"
			forwardDesc="Pronoun + paradigm → ending"
			reverseDesc="Ending → pronoun (self-assess)"
			categories={CATEGORIES}
			renderAnswer={(attempt, size) => <WholeVerb attempt={attempt} size={size} />}
			explainMiss={(attempt) => <MissedPerson attempt={attempt} />}
		/>
	);
}
