import { userIdContext } from "@/lib/auth-context";

import { SPEEDS } from "../../drill-speeds";
import { GENDER_STYLE } from "../../engines/drill-constants";
import { SimpleListDrill } from "../../engines/simple-list-drill";
import type { Route } from "./+types/noun-genders";
import { getNounDrillItems } from "./data.server";

// Forward: "house" → type "to spiti"  (article + noun)
// Reverse: show "σπίτι" (reverseGreek strips article) → select M / F / N

export const loader = async ({ context }: Route.LoaderArgs) => {
	const userId = context.get(userIdContext);
	return {
		items: await getNounDrillItems(userId, "nominative", "articles-noun-genders", {
			stripArticleForReverse: true,
		}),
	};
};

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

export default function NounGendersDrill({ loaderData }: Route.ComponentProps) {
	return (
		<SimpleListDrill
			drillId="articles-noun-genders"
			items={loaderData.items}
			title="Noun Genders"
			subtitle={`${loaderData.items.length} nouns / timed`}
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
