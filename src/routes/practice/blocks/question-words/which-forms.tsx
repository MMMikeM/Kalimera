import { createFileRoute } from "@tanstack/react-router";


import type { SimpleListItem } from "../../components/engines/deck";
import { Drill } from "../../components/engines/drill";

import { QuestionWordParadigm } from "./components/paradigm";
import { GreekText } from "@/components/GreekText";

const item = (
	id: string,
	greek: string,
	english: string,
	label: string,
	category: string,
): SimpleListItem => ({
	id,
	greek,
	english,
	label,
	category,
});

export const WHICH_FORMS: SimpleListItem[] = [
	// Doer
	item("qw-poios", "ποιος", "who / which?", "which? (about a he-word)", "doer"),
	item("qw-poia", "ποια", "who / which?", "which? (about a she-word)", "doer"),
	item("qw-poio", "ποιο", "which?", "which? (about an it-word)", "doer"),

	// Target
	item("qw-poion", "ποιον", "whom / which?", "which? (he-word as the target)", "target"),

	// Owner
	item("qw-poianou", "ποιανού", "whose?", "whose? (he- or it-word)", "owner"),
	item("qw-poianis", "ποιανής", "whose?", "whose? (she-word)", "owner"),
	item("qw-poianon", "ποιανών", "whose?", "whose? (more than one)", "owner"),
	item("qw-poianou-einai", "ποιανού είναι", "whose is it?", "whose is it?", "owner"),

	// Plural
	item("qw-poioi", "ποιοι", "which ones?", "which ones? (he-words)", "plural"),
	item("qw-poies", "ποιες", "which ones?", "which ones? (she-words)", "plural"),
	item("qw-poia-pl", "ποια", "which ones?", "which ones? (it-words)", "plural"),
];

const CATEGORIES = [
	{ id: "doer", label: "Doer" },
	{ id: "target", label: "Target" },
	{ id: "owner", label: "Owner" },
	{ id: "plural", label: "Plural" },
];

const PARADIGM_COLUMNS = ["Doer", "Target", "Owner", "Plural"];

const PARADIGM = [
	{ label: "he-word (m)", forms: ["ποιος", "ποιον", "ποιανού", "ποιοι"] },
	{ label: "she-word (f)", forms: ["ποια", "ποια", "ποιανής", "ποιες"] },
	{ label: "it-word (n)", forms: ["ποιο", "ποιο", "ποιανού", "ποια"] },
];

const Paradigm = () => (
	<QuestionWordParadigm caption="ποιος agrees" columns={PARADIGM_COLUMNS} rows={PARADIGM}>
		Owner plural, every gender:{" "}
		<GreekText size="sm">
			ποιανών
		</GreekText>{" "}
		· colloquial stand-in for ποιανού:{" "}
		<GreekText size="sm">
			τίνος
		</GreekText>
	</QuestionWordParadigm>
);

export const Route = createFileRoute("/practice/blocks/question-words/which-forms")({
	component: WhichFormsDrill,
});

function WhichFormsDrill() {
	return (
		<Drill
			drillId="blocks-qw-which-forms"
			items={WHICH_FORMS}
			title="Which — forms"
			subtitle={`${WHICH_FORMS.length} forms / timed`}
			colorTheme="terracotta"
			backTo="/practice/blocks/question-words/"
			forwardDesc="English → Greek"
			reverseDesc="Greek → recall meaning (self-assess)"
			categories={CATEGORIES}
			configExtras={<Paradigm />}
		/>
	);
}
