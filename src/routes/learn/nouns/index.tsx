import { Link, createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { ChevronLeft, ChevronRight, Package } from "lucide-react";

import { Card } from "@/components/Card";
import { GreekText } from "@/components/GreekText";
import { TabHero } from "@/components/TabHero";
import { groupNounsBySubject } from "@/lib/noun-browser-groups";
import { getNounsWithFormsAndSubjects } from "@/server/db/queries/noun-browser";

/** Counts and a few sample words per subject; the words themselves live one route down. */
const subjectsLoader = createServerFn().handler(async () => ({
	subjects: groupNounsBySubject(await getNounsWithFormsAndSubjects()).map((group) => ({
		slug: group.slug,
		title: group.title,
		total: group.nouns.length,
		// Already ordered by CEFR then frequency, so these are the commonest.
		sample: group.nouns.slice(0, 3).map((n) => n.lemma),
	})),
}));

export const Route = createFileRoute("/learn/nouns/")({
	loader: () => subjectsLoader(),
	component: NounSubjectsPage,
});

function NounSubjectsPage() {
	const { subjects } = Route.useLoaderData();
	const total = subjects.reduce((sum, s) => sum + s.total, 0);

	return (
		<div className="space-y-6">
			<Link
				to="/learn"
				className="inline-flex items-center gap-1 text-sm text-stone-600 transition-colors hover:text-stone-800"
			>
				<ChevronLeft size={16} />
				<span>Learn</span>
			</Link>

			<TabHero
				title="Everyday nouns"
				greekPhrase="ο / η / το"
				colorScheme="ocean"
				icon={<Package size={24} />}
			>
				{total} words, grouped by subject. Pick a subject, then tap any word to see how it changes.
			</TabHero>

			<div className="grid gap-3 sm:grid-cols-2">
				{subjects.map((subject) => (
					<Link key={subject.slug} to="/learn/nouns/$subject" params={{ subject: subject.slug }}>
						<Card
							variant="bordered"
							padding="sm"
							className="h-full transition-colors hover:border-stone-400"
						>
							<div className="flex items-start justify-between gap-3">
								<div className="min-w-0">
									<h3 className="font-medium text-stone-800">{subject.title}</h3>
									<GreekText size="sm" tone="muted" className="mt-0.5 block truncate">
										{subject.sample.join(", ")}
									</GreekText>
								</div>
								<span className="flex shrink-0 items-center gap-1 text-sm text-stone-500">
									{subject.total}
									<ChevronRight size={16} className="text-stone-400" />
								</span>
							</div>
						</Card>
					</Link>
				))}
			</div>
		</div>
	);
}
