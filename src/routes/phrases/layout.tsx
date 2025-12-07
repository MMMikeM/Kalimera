import { Outlet, useLocation, Link } from "react-router";
import { and, eq, inArray } from "drizzle-orm";
import { vocabulary, vocabularyTags, tags } from "../../db/schema";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SectionHeading } from "@/components";
import {
	Sparkles,
	MessageCircle,
	Hand,
	Heart,
	Link2,
	Clock,
	Blocks,
} from "lucide-react";
import type { Route } from "./+types/layout";
import type { PhraseItem, PhrasesLoaderData } from "./shared";

const PHRASE_TAGS = [
	"essential",
	"survival",
	"responses",
	"social-phrase",
	"request",
	"command",
	"opinions",
	"discourse-markers",
	"discourse-filler",
	"days-of-week",
	"months",
	"time-telling",
	"likes-singular",
	"likes-plural",
	"name-construction",
	"question",
] as const;

type TagSlug = (typeof PHRASE_TAGS)[number];

const groupByTag = (items: PhraseItem[]): Record<TagSlug, PhraseItem[]> => {
	const result = {} as Record<TagSlug, PhraseItem[]>;
	for (const tag of PHRASE_TAGS) {
		result[tag] = [];
	}
	for (const item of items) {
		const tag = item.tagSlug as TagSlug;
		if (result[tag]) {
			result[tag].push(item);
		}
	}
	return result;
};

export async function loader({ context }: Route.LoaderArgs) {
	const db = context?.db ?? (await import("../../db")).db;

	const allPhrases = await db
		.select({
			id: vocabulary.id,
			greek: vocabulary.greekText,
			english: vocabulary.englishTranslation,
			wordType: vocabulary.wordType,
			metadata: vocabulary.metadata,
			tagSlug: tags.slug,
		})
		.from(vocabulary)
		.innerJoin(vocabularyTags, eq(vocabularyTags.vocabularyId, vocabulary.id))
		.innerJoin(tags, eq(tags.id, vocabularyTags.tagId))
		.where(
			and(
				eq(vocabulary.status, "processed"),
				inArray(tags.slug, [...PHRASE_TAGS])
			)
		)
		.orderBy(vocabulary.greekText);

	const byTag = groupByTag(allPhrases);

	return {
		survival: {
			essential: byTag.essential,
			survival: byTag.survival,
		},
		responses: {
			responses: byTag.responses,
			socialPhrases: byTag["social-phrase"],
		},
		requests: {
			requests: byTag.request,
			commands: byTag.command,
		},
		opinions: {
			opinions: byTag.opinions,
		},
		connectors: {
			discourseMarkers: byTag["discourse-markers"],
			discourseFillers: byTag["discourse-filler"],
		},
		time: {
			daysOfWeek: byTag["days-of-week"],
			months: byTag.months,
			timeTelling: byTag["time-telling"],
		},
		constructions: {
			likesConstruction: {
				singular: byTag["likes-singular"],
				plural: byTag["likes-plural"],
			},
			nameConstruction: byTag["name-construction"],
			questionWords: byTag.question,
		},
	} satisfies PhrasesLoaderData;
}

export function meta() {
	return [
		{ title: "Phrases - Greek Learning" },
		{
			name: "description",
			content: "Essential expressions for natural Greek conversation",
		},
	];
}

export type LoaderData = Awaited<ReturnType<typeof loader>>;

const TABS = [
	{ id: "survival", label: "Survival", shortLabel: "Survival", icon: Sparkles },
	{ id: "responses", label: "Responses", shortLabel: "Respond", icon: MessageCircle },
	{ id: "requests", label: "Requests", shortLabel: "Ask", icon: Hand },
	{ id: "opinions", label: "Opinions", shortLabel: "Express", icon: Heart },
	{ id: "connectors", label: "Connectors", shortLabel: "Connect", icon: Link2 },
	{ id: "time", label: "Time", shortLabel: "Time", icon: Clock },
	{ id: "constructions", label: "Patterns", shortLabel: "Patterns", icon: Blocks },
] as const;

export default function PhrasesLayout({ loaderData }: Route.ComponentProps) {
	const location = useLocation();
	const pathSegments = location.pathname.split("/").filter(Boolean);
	const activeTab = pathSegments[1] || "survival";

	return (
		<div className="space-y-6">
			<SectionHeading
				title="Phrases"
				subtitle="Essential expressions for natural Greek conversation"
				level="h2"
			/>

			<Tabs value={activeTab}>
				<TabsList className="flex-wrap h-auto gap-1">
					{TABS.map((tab) => (
						<TabsTrigger key={tab.id} value={tab.id} asChild className="gap-1.5">
							<Link to={`/phrases/${tab.id}`}>
								<tab.icon size={16} />
								<span className="hidden sm:inline">{tab.label}</span>
								<span className="sm:hidden">{tab.shortLabel}</span>
							</Link>
						</TabsTrigger>
					))}
				</TabsList>
			</Tabs>

			<Outlet context={loaderData} />
		</div>
	);
}
