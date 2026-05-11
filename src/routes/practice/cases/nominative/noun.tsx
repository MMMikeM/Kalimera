import { createFileRoute } from "@tanstack/react-router";

import { getNounDrillItemsFn } from "@/server/fns";

import { Drill } from "../../components/engines/drill";
import { GENDER_STYLE } from "../../components/engines/drill-constants";

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
	staleTime: 0,
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
		<Drill
			backTo={"/practice/cases/"}
			drillId="articles-noun-genders"
			items={items}
			title="Noun Genders"
			subtitle={`${items.length} nouns / timed`}
			colorTheme="honey"
			forwardDesc="English → article + noun (e.g. το σπίτι)"
			reverseLabel="Greek → Gender"
			reverseDesc="Greek noun → select gender"
			categories={CATEGORIES}
			reverse={{
				kind: "single-select",
				options: DIMENSION_OPTIONS,
				getCorrectId: (item) => String(item.dimension ?? ""),
			}}
		/>
	);
}
