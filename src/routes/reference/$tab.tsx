import type { Route } from "./+types/$tab";
import { Users, BookOpen, MapPin, Zap, Sparkles } from "lucide-react";
import { TabHero } from "@/components";
import { AgreementSection, MovableNuSection } from "./agreement-section";
import { CasesSection } from "./cases-section";
import { PronounsSection } from "./pronouns-section";
import { AdjectivesSection } from "./adjectives-section";
import { PrepositionsSection } from "./prepositions-section";
import { VerbsSection } from "./verbs-section";

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

function CasesPronounsTab() {
	return (
		<div className="space-y-8">
			<TabHero
				title="The foundation of Greek grammar"
				greekPhrase="Ποιος; Τι; Ποιου; — Who? What? Whose?"
				colorScheme="ocean"
				icon={<Users size={18} />}
			>
				Cases show a word's role in a sentence. Pronouns are where you'll use
				them most — master these and cases click into place.
			</TabHero>
			<CasesSection />
			<PronounsSection />
		</div>
	);
}

function NounsArticlesTab() {
	return (
		<div className="space-y-12">
			<TabHero
				title="Articles and nouns work together"
				greekPhrase="ο, η, το → τον, την, το"
				colorScheme="olive"
				icon={<BookOpen size={18} />}
			>
				Greek articles change to match their noun's gender, case, and number.
				Once you see the pattern, it becomes predictable.
			</TabHero>
			<AgreementSection />
			<MovableNuSection />
		</div>
	);
}

function AdjectivesTab() {
	return (
		<div className="space-y-8">
			<TabHero
				title="Words that describe"
				greekPhrase="ο καλός, η καλή, το καλό"
				colorScheme="honey"
				icon={<Sparkles size={18} />}
			>
				Adjectives agree with their noun in gender, case, and number. Once you
				know noun patterns, adjectives follow the same rules.
			</TabHero>
			<AdjectivesSection />
		</div>
	);
}

function PrepositionsTab() {
	return (
		<div className="space-y-8">
			<TabHero
				title="Connect words and ideas"
				greekPhrase="σε, από, για, με"
				colorScheme="terracotta"
				icon={<MapPin size={18} />}
			>
				Prepositions show relationships — location, direction, purpose. The big
				four (σε, από, για, με) cover most situations.
			</TabHero>
			<PrepositionsSection />
		</div>
	);
}

function VerbsTab() {
	return (
		<div className="space-y-8">
			<TabHero
				title="Action words that tell the whole story"
				greekPhrase="κάνω, κάνεις, κάνει..."
				colorScheme="ocean"
				icon={<Zap size={18} />}
			>
				Greek verb endings show who's doing the action — you often don't need
				separate pronouns. Learn three patterns and conjugate thousands of
				verbs.
			</TabHero>
			<VerbsSection />
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
