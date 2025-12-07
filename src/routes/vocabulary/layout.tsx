import { Outlet, useLocation, Link } from "react-router";
import { and, eq, inArray } from "drizzle-orm";
import { vocabulary, vocabularyTags, tags, verbDetails } from "../../db/schema";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SectionHeading } from "@/components";
import { Package, Languages, BookOpen } from "lucide-react";
import type { Route } from "./+types/layout";

const VOCABULARY_TAGS = [
	"people",
	"time-of-day",
	"time-expression",
	"time-telling",
	"position",
	"expression",
	"discourse-filler",
	"social-phrase",
	"command",
	"question",
	"likes-singular",
	"likes-plural",
	"name-construction",
	"discourse-markers",
	"responses",
	"opinions",
	"conversation-arriving",
	"conversation-food",
	"conversation-smalltalk",
	"shopping",
	"household",
	"color",
	"number",
	"transport-vehicle",
	"transport-action",
	"frequency",
	"summer",
	"essential",
	"days-of-week",
	"months",
] as const;

type TagSlug = (typeof VOCABULARY_TAGS)[number];

interface VocabItem {
	id: number;
	greek: string;
	english: string;
	wordType: string | null;
	metadata: unknown;
	tagSlug: string;
}

const groupByTag = (items: VocabItem[]): Record<TagSlug, VocabItem[]> => {
	const result = {} as Record<TagSlug, VocabItem[]>;
	for (const tag of VOCABULARY_TAGS) {
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

export interface VerbWithPattern {
	id: number;
	greek: string;
	english: string;
	pattern: string | null;
}

export interface VerbSubCategory {
	title: string;
	pattern: string;
	verbs: VerbWithPattern[];
}

export interface VerbCategory {
	id: string;
	title: string;
	verbs: VerbWithPattern[];
	subCategories?: VerbSubCategory[];
}

const DEPONENT_PATTERNS = ["-ομαι", "-άμαι"];

const groupVerbsByPattern = (verbs: VerbWithPattern[]): VerbCategory[] => {
	const groups: Record<string, VerbCategory> = {};
	const deponentVerbs: Record<string, VerbWithPattern[]> = {
		"-ομαι": [],
		"-άμαι": [],
	};

	for (const verb of verbs) {
		const pattern = verb.pattern || "unknown";

		if (DEPONENT_PATTERNS.includes(pattern)) {
			deponentVerbs[pattern].push(verb);
		} else {
			if (!groups[pattern]) {
				groups[pattern] = {
					id: `verb-${pattern.toLowerCase().replace(/\s+/g, "-")}`,
					title: pattern,
					verbs: [],
				};
			}
			groups[pattern].verbs.push(verb);
		}
	}

	const result = Object.values(groups);

	const totalDeponents = deponentVerbs["-ομαι"].length + deponentVerbs["-άμαι"].length;
	if (totalDeponents > 0) {
		result.push({
			id: "verb-deponent",
			title: "deponent",
			verbs: [...deponentVerbs["-ομαι"], ...deponentVerbs["-άμαι"]],
			subCategories: [
				{
					title: "Type 1: -ομαι",
					pattern: "-ομαι",
					verbs: deponentVerbs["-ομαι"],
				},
				{
					title: "Type 2: -άμαι",
					pattern: "-άμαι",
					verbs: deponentVerbs["-άμαι"],
				},
			],
		});
	}

	return result;
};

export async function loader({ context }: Route.LoaderArgs) {
	const db = context?.db ?? (await import("../../db")).db;

	const [allVocab, verbs] = await Promise.all([
		db
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
					inArray(tags.slug, [...VOCABULARY_TAGS])
				)
			)
			.orderBy(vocabulary.greekText),

		db
			.select({
				id: vocabulary.id,
				greek: vocabulary.greekText,
				english: vocabulary.englishTranslation,
				pattern: verbDetails.conjugationFamily,
			})
			.from(vocabulary)
			.leftJoin(verbDetails, eq(verbDetails.vocabId, vocabulary.id))
			.where(and(eq(vocabulary.wordType, "verb"), eq(vocabulary.status, "processed"))),
	]);

	const byTag = groupByTag(allVocab);

	return {
		nouns: {
			people: byTag.people,
			shopping: byTag.shopping,
			household: byTag.household,
			vehicles: byTag["transport-vehicle"],
			summer: byTag.summer,
		},
		verbs: {
			categories: groupVerbsByPattern(verbs),
			transportActions: byTag["transport-action"],
		},
		phrases: {
			essential: byTag.essential,
			daysOfWeek: byTag["days-of-week"],
			months: byTag.months,
			discourseFillers: byTag["discourse-filler"],
			socialPhrases: byTag["social-phrase"],
			commands: byTag.command,
			questionWords: byTag.question,
			likesConstruction: {
				singular: byTag["likes-singular"],
				plural: byTag["likes-plural"],
			},
			nameConstruction: byTag["name-construction"],
			timeTelling: byTag["time-telling"],
			discourseMarkers: byTag["discourse-markers"],
			responses: byTag.responses,
			opinions: byTag.opinions,
			arriving: byTag["conversation-arriving"],
			food: byTag["conversation-food"],
			smalltalk: byTag["conversation-smalltalk"],
		},
		reference: {
			timesOfDay: byTag["time-of-day"].map((t) => ({
				...t,
				timeRange: (t.metadata as Record<string, unknown> | null)?.timeRange as
					| string
					| undefined,
			})),
			numbers: byTag.number
				.map((n) => ({
					...n,
					numericValue: (n.metadata as Record<string, unknown> | null)?.numericValue as number | undefined,
				}))
				.sort((a, b) => (a.numericValue ?? 0) - (b.numericValue ?? 0)),
			colors: byTag.color,
			frequencyAdverbs: byTag.frequency,
			positionAdverbs: byTag.position,
		},
	};
}

export function meta() {
	return [
		{ title: "Vocabulary - Greek Word Reference" },
		{
			name: "description",
			content: "Essential Greek vocabulary organized by type",
		},
	];
}

export type VocabularyLoaderData = Awaited<ReturnType<typeof loader>>;

const TABS = [
	{ id: "nouns", label: "Nouns", icon: Package },
	{ id: "verbs", label: "Verbs", icon: Languages },
	{ id: "reference", label: "Reference", icon: BookOpen },
] as const;

export default function VocabularyLayout({ loaderData }: Route.ComponentProps) {
	const location = useLocation();
	const pathSegments = location.pathname.split("/").filter(Boolean);
	const activeTab = pathSegments[1] || "nouns";

	return (
		<div className="space-y-6">
			<SectionHeading
				title="Vocabulary"
				subtitle="Essential Greek vocabulary organized by type"
				level="h2"
			/>

			<Tabs value={activeTab}>
				<TabsList className="flex-wrap h-auto gap-1">
					{TABS.map((tab) => (
						<TabsTrigger key={tab.id} value={tab.id} asChild className="gap-1.5">
							<Link to={`/vocabulary/${tab.id}`}>
								<tab.icon size={16} />
								<span>{tab.label}</span>
							</Link>
						</TabsTrigger>
					))}
				</TabsList>
			</Tabs>

			<Outlet context={loaderData} />
		</div>
	);
}
