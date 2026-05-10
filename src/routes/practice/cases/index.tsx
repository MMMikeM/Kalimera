import { createFileRoute } from "@tanstack/react-router";

import { DrillButton } from "../components/DrillButton";
import { GroupSection } from "../components/group-section";
import type { Drill } from "../components/group-section";
import { PhaseSection } from "../components/PhaseSection";

const doerDrills: Drill[] = [
	{
		id: "articles-article-doer",
		to: "/practice/cases/nominative/article",
		title: "Article (Doer)",
		greek: "ο · η · το · οι · τα",
		minutes: 1,
	},
	{
		id: "articles-noun-genders",
		to: "/practice/cases/nominative/noun",
		title: "Noun (Doer)",
		greek: "ο φίλος · η θάλασσα · το σπίτι",
		minutes: 1,
	},
	{
		id: "adjectives-agreement",
		to: "/practice/cases/nominative/adjective",
		title: "Adjective (Doer)",
		greek: "καλός · καλή · καλό",
		minutes: 2,
	},
	{
		id: "nominal-phrase-doer",
		to: "/practice/cases/nominative/phrase",
		title: "Doer phrase",
		greek: "ο καλός φίλος · η μεγάλη πόλη · το νέο σπίτι",
		minutes: 2,
	},
];

const targetDrills: Drill[] = [
	{
		id: "articles-article-target",
		to: "/practice/cases/accusative/article",
		title: "Article (Target)",
		greek: "τον · τη · το · τους · τις · τα",
		minutes: 1,
	},
	{
		id: "nominal-noun-target",
		to: "/practice/cases/accusative/noun",
		title: "Noun (Target)",
		greek: "τον φίλο · τη μέρα · το σπίτι",
		minutes: 1,
	},
	{
		id: "adjectives-agreement-target",
		to: "/practice/cases/accusative/adjective",
		title: "Adjective (Target)",
		greek: "καλό · καλή · καλό",
		minutes: 2,
	},
	{
		id: "nominal-phrase-target",
		to: "/practice/cases/accusative/phrase",
		title: "Target phrase",
		greek: "τον καλό φίλο · τη μεγάλη πόλη · το νέο σπίτι",
		minutes: 2,
	},
];

const ownerDrills: Drill[] = [
	{
		id: "articles-article-owner",
		to: "/practice/cases/genitive/article",
		title: "Article (Owner)",
		greek: "του · της · του · των",
		minutes: 1,
	},
	{
		id: "nominal-noun-owner",
		to: "/practice/cases/genitive/noun",
		title: "Noun (Owner)",
		greek: "του φίλου · της μέρας · του σπιτιού",
		minutes: 1,
	},
	{
		id: "adjectives-agreement-owner",
		to: "/practice/cases/genitive/adjective",
		title: "Adjective (Owner)",
		greek: "καλού · καλής · καλού",
		minutes: 2,
	},
	{
		id: "nominal-phrase-owner",
		to: "/practice/cases/genitive/phrase",
		title: "Owner phrase",
		greek: "του καλού φίλου · της μεγάλης πόλης · του νέου σπιτιού",
		minutes: 2,
	},
];

const reviewDrills: Drill[] = [
	{
		id: "articles-paradigm",
		to: "/practice/cases/review/articles",
		title: "All articles",
		greek: "ο, η, το, τον, την, του, της…",
		minutes: 1,
	},
	{
		id: "nominal-all-nouns",
		to: "/practice/cases/review/nouns",
		title: "All nouns",
		greek: "φίλος · φίλο · φίλου · φίλοι · …",
		minutes: 2,
	},
	{
		id: "nominal-all-adjectives",
		to: "/practice/cases/review/adjectives",
		title: "All adjectives",
		greek: "καλός · καλή · καλό · καλού · καλής · …",
		minutes: 2,
	},
	{
		id: "nominal-all-phrases",
		to: "/practice/cases/review/phrases",
		title: "All phrases",
		greek: "ο καλός φίλος · τη μεγάλη πόλη · του νέου σπιτιού",
		minutes: 2,
	},
];

export const Route = createFileRoute("/practice/cases/")({
	component: CasesPage,
});

function CasesPage() {
	return (
		<div className="mx-auto max-w-2xl">
			<GroupSection title="The case system" returnTo={Route.fullPath}>
				<PhaseSection phase="Doer">
					{doerDrills.map((d) => (
						<DrillButton {...d} from={Route.fullPath} key={d.id} />
					))}
				</PhaseSection>
				<PhaseSection phase="Target">
					{targetDrills.map((d) => (
						<DrillButton {...d} from={Route.fullPath} key={d.id} />
					))}
				</PhaseSection>
				<PhaseSection phase="Owner">
					{ownerDrills.map((d) => (
						<DrillButton {...d} from={Route.fullPath} key={d.id} />
					))}
				</PhaseSection>
				<PhaseSection phase="Review">
					{reviewDrills.map((d) => (
						<DrillButton {...d} from={Route.fullPath} key={d.id} />
					))}
				</PhaseSection>
			</GroupSection>
		</div>
	);
}
