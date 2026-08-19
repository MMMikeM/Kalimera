import { createFileRoute } from "@tanstack/react-router";


import type { SimpleListItem } from "../../components/engines/deck";
import { Drill } from "../../components/engines/drill";

import { QuestionWordParadigm } from "./components/paradigm";

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

export const HOW_MANY_FORMS: SimpleListItem[] = [
	// How much (singular)
	item("qw-posos", "πόσος", "how much?", "how much? (he-word — καιρός, κόσμος)", "singular"),
	item("qw-posi", "πόση", "how much?", "how much? (she-word — ζάχαρη, ώρα)", "singular"),
	item("qw-poso-n", "πόσο", "how much?", "how much? (it-word — γάλα, ψωμί)", "singular"),
	item("qw-poso-adv", "πόσο", "how much?", "how much? (cost, degree — on its own)", "singular"),

	// How many (plural)
	item("qw-posoi", "πόσοι", "how many?", "how many? (he-words)", "plural"),
	item("qw-poses", "πόσες", "how many?", "how many? (she-words)", "plural"),
	item("qw-posa", "πόσα", "how many?", "how many? (it-words)", "plural"),
];

const CATEGORIES = [
	{ id: "singular", label: "How much (sg)" },
	{ id: "plural", label: "How many (pl)" },
];

const PARADIGM_COLUMNS = ["How much", "How many"];

const PARADIGM = [
	{ label: "he-word (m)", forms: ["πόσος", "πόσοι"] },
	{ label: "she-word (f)", forms: ["πόση", "πόσες"] },
	{ label: "it-word (n)", forms: ["πόσο", "πόσα"] },
];

const Paradigm = () => (
	<QuestionWordParadigm caption="πόσος agrees" columns={PARADIGM_COLUMNS} rows={PARADIGM}>
		On its own,{" "}
		<span lang="el" className="greek-text text-sm text-foreground">
			πόσο
		</span>{" "}
		asks price or degree —{" "}
		<span lang="el" className="greek-text text-sm text-foreground">
			πόσο κάνει;
		</span>
	</QuestionWordParadigm>
);

export const Route = createFileRoute("/practice/blocks/question-words/how-many-forms")({
	component: HowManyFormsDrill,
});

function HowManyFormsDrill() {
	return (
		<Drill
			drillId="blocks-qw-how-many-forms"
			items={HOW_MANY_FORMS}
			title="How much — forms"
			subtitle={`${HOW_MANY_FORMS.length} forms / timed`}
			colorTheme="terracotta"
			backTo="/practice/blocks/question-words/"
			forwardDesc="English → Greek"
			reverseDesc="Greek → recall meaning (self-assess)"
			categories={CATEGORIES}
			configExtras={<Paradigm />}
		/>
	);
}
