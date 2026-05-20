import { createFileRoute } from "@tanstack/react-router";

import { getNounDrillItemsFn } from "@/server/fns/noun";

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

const DIMENSION_OPTIONS = [
	{ id: "masculine", label: "Masculine (ο)", ...GENDER_STYLE.masculine },
	{ id: "feminine", label: "Feminine (η)", ...GENDER_STYLE.feminine },
	{ id: "neuter", label: "Neuter (το)", ...GENDER_STYLE.neuter },
];

function NounGendersDrill() {
	const { items } = Route.useLoaderData();
	console.log({ items });
	return (
		<Drill
			backTo={"/practice/cases/"}
			drillId="nominative-nouns"
			items={items}
			title="Nominative Nouns"
			subtitle={`Basic noun vocabulary practice`}
			colorTheme="honey"
			forwardDesc="English → article + noun (e.g. το σπίτι)"
			reverseLabel="Greek → Gender"
			reverseDesc="Greek noun → select gender"
			reverse={{
				kind: "single-select",
				options: DIMENSION_OPTIONS,
				getCorrectId: (item) => String(item.dimension ?? ""),
			}}
		/>
	);
}
