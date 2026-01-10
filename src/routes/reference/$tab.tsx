import type { Route } from "./+types/$tab";
import { CasesPronounsTab } from "./tabs/cases-pronouns";
import { NounsArticlesTab } from "./tabs/nouns-articles";
import { AdjectivesTab } from "./tabs/adjectives";
import { PrepositionsTab } from "./tabs/prepositions";
import { VerbsTab } from "./tabs/verbs";

const VALID_TABS = [
	"cases-pronouns",
	"nouns-articles",
	"adjectives",
	"prepositions",
	"verbs",
] as const;
type TabId = (typeof VALID_TABS)[number];

export function loader({ params }: Route.LoaderArgs) {
	const tab = params.tab as string;
	if (!VALID_TABS.includes(tab as TabId)) {
		throw new Response("Not Found", { status: 404 });
	}
	return { tab: tab as TabId };
}

export default function TabRoute({ loaderData }: Route.ComponentProps) {
	const { tab } = loaderData;

	switch (tab) {
		case "cases-pronouns":
			return <CasesPronounsTab />;
		case "nouns-articles":
			return <NounsArticlesTab />;
		case "adjectives":
			return <AdjectivesTab />;
		case "prepositions":
			return <PrepositionsTab />;
		case "verbs":
			return <VerbsTab />;
		default:
			return null;
	}
}
