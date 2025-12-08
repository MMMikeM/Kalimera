import type { Route } from "./+types/$tab";
import { AgreementSection, MovableNuSection } from "./agreement-section";
import { CasesSection } from "./cases-section";
import { PronounsSection } from "./pronouns-section";
import { PrepositionsSection } from "./prepositions-section";
import { VerbsSection } from "./verbs-section";

const VALID_TABS = [
	"cases-pronouns",
	"nouns-articles",
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

function CasesPronounsTab() {
	return (
		<div className="space-y-8">
			<CasesSection />
			<PronounsSection />
		</div>
	);
}

function NounsArticlesTab() {
	return (
		<div className="space-y-12">
			<AgreementSection />
			<MovableNuSection />
		</div>
	);
}

export default function TabRoute({ loaderData }: Route.ComponentProps) {
	const { tab } = loaderData;

	switch (tab) {
		case "cases-pronouns":
			return <CasesPronounsTab />;
		case "nouns-articles":
			return <NounsArticlesTab />;
		case "prepositions":
			return <PrepositionsSection />;
		case "verbs":
			return <VerbsSection />;
		default:
			return null;
	}
}
