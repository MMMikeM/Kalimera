import { createFileRoute, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { Clock, Hand, Heart, Link2, MessageCircle, Sparkles } from "lucide-react";
import { z } from "zod";

import { BackLink } from "@/components/BackLink";
import { NavTabs } from "@/components/NavTabs";
import { getVocabBySlug } from "@/server/db/queries/vocabulary";

import { groupVocabByTag } from "../../components/vocab-by-tag";
import { type PhraseTabConfig, PhraseTabContent } from "./components/shared";

const VALID_TABS = ["survival", "responses", "requests", "opinions", "connectors", "time"] as const;
type PhraseTabId = (typeof VALID_TABS)[number];

const PHRASE_TABS: Record<PhraseTabId, PhraseTabConfig> = {
	survival: {
		label: "Survival",
		Icon: Sparkles,
		navColor: "terracotta",
		hero: {
			title: "Start with the basics",
			greekPhrase: "Γεια σας!",
			colorScheme: "honey",
			body: `These phrases will get you through most situations. Practice them until they're automatic — when someone says "Γεια σας", your response should be instant.`,
		},
		sections: [
			{ tag: "essential", title: "Essential Greetings", colorScheme: "honey", alwaysShow: true },
			{ tag: "survival", title: "Survival Phrases", colorScheme: "terracotta" },
		],
	},
	responses: {
		label: "Responses",
		Icon: MessageCircle,
		navColor: "ocean",
		hero: {
			title: "Keep the conversation flowing",
			greekPhrase: "Ναι, βέβαια!",
			colorScheme: "terracotta",
			body: "Quick responses that show you're following along. These short phrases buy you time while you process and keep the conversation natural.",
		},
		sections: [
			{ tag: "responses", title: "Common Responses", colorScheme: "terracotta", alwaysShow: true },
			{ tag: "social-phrase", title: "Social Phrases", colorScheme: "olive" },
		],
	},
	requests: {
		label: "Requests",
		Icon: Hand,
		navColor: "olive",
		hero: {
			title: "Ask politely, get results",
			greekPhrase: "Παρακαλώ...",
			colorScheme: "olive",
			body: `Adding "παρακαλώ" (please) to any request makes it more polite. Greeks appreciate the effort — politeness goes a long way!`,
		},
		sections: [
			{ tag: "request", title: "Polite Requests", colorScheme: "terracotta" },
			{ tag: "command", title: "Commands", colorScheme: "olive" },
		],
	},
	opinions: {
		label: "Opinions",
		Icon: Heart,
		navColor: "terracotta",
		hero: {
			title: "Sharing opinions",
			greekPhrase: "Νομίζω ότι...",
			colorScheme: "terracotta",
			body: `Move past "yes" and "no" into real conversation. These phrases let you agree, disagree, and share what you actually think.`,
		},
		sections: [
			{ tag: "opinions", title: "Opinions & Feelings", colorScheme: "olive", alwaysShow: true },
		],
	},
	connectors: {
		label: "Connectors",
		Icon: Link2,
		navColor: "honey",
		hero: {
			title: "The glue of natural speech",
			greekPhrase: "Λοιπόν...",
			colorScheme: "ocean",
			body: "Greeks use connectors constantly — mastering them will make your Greek sound much more fluent. These small words hold conversations together.",
		},
		sections: [
			{ tag: "discourse-markers", title: "Discourse Markers", colorScheme: "olive" },
			{ tag: "discourse-filler", title: "Fillers & Connectors", colorScheme: "ocean" },
		],
	},
	time: {
		label: "Time",
		Icon: Clock,
		navColor: "ocean",
		hero: {
			title: "Telling time",
			greekPhrase: "Τι ώρα είναι;",
			colorScheme: "ocean",
			body: "How to ask and tell time in Greek — essential patterns for scheduling and understanding when things happen.",
		},
		sections: [{ tag: "time-telling", layout: "time" }],
	},
};

const NAV_TABS = VALID_TABS.map((id) => {
	const { label, Icon, navColor } = PHRASE_TABS[id];
	return { id, label, icon: <Icon size={16} />, color: navColor };
});

const loadPhrases = createServerFn()
	.validator(z.enum(VALID_TABS))
	.handler(async ({ data: tab }) => {
		const phrases = groupVocabByTag(await getVocabBySlug("phrases", ["phrase"]));
		return Object.fromEntries(
			PHRASE_TABS[tab].sections.map(({ tag }) => [tag, phrases[tag] ?? []]),
		);
	});

export const Route = createFileRoute("/learn/phrases/$tab")({
	beforeLoad: ({ params }) => {
		const tab = VALID_TABS.find((t) => t === params.tab);
		if (!tab) throw redirect({ to: "/learn/phrases/$tab", params: { tab: "survival" } });
		return { tab };
	},
	loader: async ({ context: { tab } }) => ({ tab, phrases: await loadPhrases({ data: tab }) }),
	component: PhrasesPage,
});

function PhrasesPage() {
	const { tab, phrases } = Route.useLoaderData();

	return (
		<div className="space-y-4">
			<BackLink to="/learn">Learn</BackLink>

			<NavTabs tabs={NAV_TABS} activeTab={tab} buildUrl={(tabId) => `/learn/phrases/${tabId}`} />
			<PhraseTabContent config={PHRASE_TABS[tab]} phrases={phrases} />
		</div>
	);
}
