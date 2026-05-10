import { createFileRoute } from "@tanstack/react-router";

import { SPEEDS } from "../../components/drill-speeds";
import { GENDER_STYLE } from "../../components/engines/drill-constants";
import { SimpleListDrill } from "../../components/engines/simple-list-drill";
import { getNounDrillItemsFn } from "../loader";

// Forward: "house" → type "to spiti"  (article + noun)
// Reverse: show "σπίτι" (reverseGreek strips article) → select M / F / N

export const Route = createFileRoute("/practice/cases/nominative/noun")({
	loader: async () => ({
		items: await getNounDrillItemsFn({
			data: {
				grammaticalCase: "nominative",
				drillId: "articles-noun-genders",
				stripArticleForReverse: true,
			},
		}),
	}),
	component: NounGendersDrill,
});

const CATEGORIES = [
	{ id: "masculine", label: "Masculine (ο)" },
	{ id: "feminine", label: "Feminine (η)" },
	{ id: "neuter", label: "Neuter (το)" },
];

const DIMENSION_OPTIONS = [
	{ id: "masculine", label: "Masculine (ο)", ...GENDER_STYLE.masculine },
	{ id: "feminine", label: "Feminine (η)", ...GENDER_STYLE.feminine },
	{ id: "neuter", label: "Neuter (το)", ...GENDER_STYLE.neuter },
];

function NounGendersDrill() {
	const { items } = Route.useLoaderData();
	return (
		<SimpleListDrill
			drillId="articles-noun-genders"
			items={items}
			title="Noun Genders"
			subtitle={`${items.length} nouns / timed`}
			colorTheme="honey"
			speeds={SPEEDS}
			forwardDesc="English → article + noun (e.g. το σπίτι)"
			reverseLabel="Greek → Gender"
			reverseDesc="Greek noun → select gender"
			categories={CATEGORIES}
			reverseDimension={{
				options: DIMENSION_OPTIONS,
				getCorrectId: (item) => item.dimension ?? "",
			}}
		/>
	);
}
