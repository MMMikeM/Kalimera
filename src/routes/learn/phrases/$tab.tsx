import { createFileRoute, redirect } from "@tanstack/react-router";
import { Link, useLocation } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { ChevronLeft, Clock, Hand, Heart, Link2, MessageCircle, Sparkles } from "lucide-react";
import type React from "react";

import type { NavTab } from "@/components/NavTabs";
import { NavTabs } from "@/components/NavTabs";
import { getVocabBySlug } from "@/db.server/queries/vocabulary";
import type { Vocabulary } from "@/db.server/types";
import { validateTab } from "@/lib/validate-tab";

import { ConnectorsTab } from "./tabs/connectors-tab";
import { OpinionsTab } from "./tabs/opinions-tab";
import { RequestsTab } from "./tabs/requests-tab";
import { ResponsesTab } from "./tabs/responses-tab";
import { SurvivalTab } from "./tabs/survival-tab";
import { TimeTab } from "./tabs/time-tab";

export type PhraseItem = Vocabulary;

const VALID_TABS = ["survival", "responses", "requests", "opinions", "connectors", "time"] as const;

export const Route = createFileRoute("/learn/phrases/$tab")({
	beforeLoad: (x) => {
		if (!VALID_TABS.some((tab) => tab === x.params.tab)) {
			throw redirect({ to: "/learn/phrases/$tab", params: { tab: "survival" } });
		}
	},
	loader: async ({ params }) => {
		const tab = validateTab(params.tab as string, VALID_TABS);
		const data = (await loader()) as PhrasesLoaderData;
		return { tab, data };
	},
	component: () => (
		<PhrasesLayout>
			<TabRoute />
		</PhrasesLayout>
	),
});

function TabRoute() {
	const { tab, data } = Route.useLoaderData();

	switch (tab) {
		case "survival":
			return <SurvivalTab data={data} />;
		case "responses":
			return <ResponsesTab data={data} />;
		case "requests":
			return <RequestsTab data={data} />;
		case "opinions":
			return <OpinionsTab data={data} />;
		case "connectors":
			return <ConnectorsTab data={data} />;
		case "time":
			return <TimeTab data={data} />;
		default:
			return null;
	}
}

const PHRASES_TABS: NavTab[] = [
	{
		id: "survival",
		label: "Survival",
		icon: <Sparkles size={16} />,
		color: "terracotta",
	},
	{
		id: "responses",
		label: "Responses",
		icon: <MessageCircle size={16} />,
		color: "ocean",
	},
	{
		id: "requests",
		label: "Requests",
		icon: <Hand size={16} />,
		color: "olive",
	},
	{
		id: "opinions",
		label: "Opinions",
		icon: <Heart size={16} />,
		color: "terracotta",
	},
	{
		id: "connectors",
		label: "Connectors",
		icon: <Link2 size={16} />,
		color: "honey",
	},
	{ id: "time", label: "Time", icon: <Clock size={16} />, color: "ocean" },
];

function PhrasesLayout({ children }: { children: React.ReactNode }) {
	const location = useLocation();
	const pathSegments = location.pathname.split("/").filter(Boolean);
	const activeTab = pathSegments[2] || "survival";

	return (
		<div className="space-y-4">
			<div className="flex items-center">
				<Link
					to="/learn"
					className="flex items-center gap-1 text-stone-600 transition-colors hover:text-stone-800"
				>
					<ChevronLeft size={20} />
					<span className="font-medium">Phrases</span>
				</Link>
			</div>

			<NavTabs
				tabs={PHRASES_TABS}
				activeTab={activeTab}
				buildUrl={(tabId) => `/learn/phrases/${tabId}`}
			/>
			{children}
		</div>
	);
}

export const loader = createServerFn().handler(async () => {
	const [phraseTags, referenceTags, verbTags] = await Promise.all([
		getVocabBySlug("phrases", ["phrase"]),
		getVocabBySlug("reference", ["noun", "adverb", "adjective"]),
		getVocabBySlug("verbs", ["verb"]),
	]);

	const toSlugMap = (tags: typeof phraseTags) =>
		Object.fromEntries(
			tags.map((t) => [
				t.slug,
				t.vocabularyTags.map((vt) => vt.vocabulary).filter((v) => v !== null),
			]),
		);

	const phrases = toSlugMap(phraseTags);
	const reference = toSlugMap(referenceTags);
	const verbs = toSlugMap(verbTags);

	return {
		survival: {
			essential: phrases.essential ?? [],
			survival: phrases.survival ?? [],
		},
		responses: {
			responses: phrases.responses ?? [],
			socialPhrases: phrases["social-phrase"] ?? [],
		},
		requests: {
			requests: phrases.request ?? [],
			commands: phrases.command ?? [],
		},
		opinions: {
			opinions: phrases.opinions ?? [],
		},
		connectors: {
			discourseMarkers: phrases["discourse-markers"] ?? [],
			discourseFillers: phrases["discourse-filler"] ?? [],
		},
		time: {
			daysOfWeek: reference["days-of-week"] ?? [],
			months: reference.months ?? [],
			timeTelling: phrases["time-telling"] ?? [],
		},
		patterns: {
			likesConstruction: {
				singular: verbs["likes-singular"] ?? [],
				plural: verbs["likes-plural"] ?? [],
			},
			nameConstruction: phrases["name-construction"] ?? [],
		},
	};
});

/** Inferred type for phrases loader data */
export type PhrasesLoaderData = Awaited<ReturnType<typeof loader>>;
