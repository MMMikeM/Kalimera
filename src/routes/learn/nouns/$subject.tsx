import { Link, createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";

import { groupNounsBySubject } from "@/lib/noun-browser-groups";
import {
	type BrowsableNoun,
	INITIAL_VISIBLE,
	LEVELS,
	type LevelFilter,
	PER_GROUP_VISIBLE,
	filterNouns,
	isUnlevelled,
} from "@/lib/noun-filters";
import { getNounsWithFormsAndSubjects } from "@/server/db/queries/noun-browser";

import { toNounRows } from "@/lib/noun-rows";

import { NounList, nounPairs, nounSubgroups } from "../components/noun-list";

const subjectLoader = createServerFn()
	.validator((slug: unknown) => String(slug))
	.handler(async ({ data: slug }) => ({
		group: groupNounsBySubject(await getNounsWithFormsAndSubjects()).find((g) => g.slug === slug) ?? null,
	}));

export const Route = createFileRoute("/learn/nouns/$subject")({
	loader: async ({ params }) => {
		const { group } = await subjectLoader({ data: params.subject });
		if (!group) throw new Response("Not Found", { status: 404 });
		return { group };
	},
	component: NounSubjectPage,
});

const LevelToggles = ({
	selected,
	counts,
	onToggle,
}: {
	selected: LevelFilter[];
	counts: Record<string, number>;
	onToggle: (level: LevelFilter) => void;
}) => (
	<div className="flex flex-wrap items-center gap-1.5">
		{LEVELS.filter((l) => (counts[l] ?? 0) > 0).map((level) => {
			const on = selected.includes(level);
			return (
				<button
					key={level}
					type="button"
					aria-pressed={on}
					onClick={() => onToggle(level)}
					className={`rounded-full border px-2.5 py-1 text-xs transition-colors ${
						on
							? "border-stone-700 bg-stone-700 text-white"
							: "border-stone-200 bg-white text-stone-600 hover:bg-stone-50"
					}`}
				>
					{level === "unlevelled" ? "Unlevelled" : level}
					<span className="ml-1 opacity-60">{counts[level]}</span>
				</button>
			);
		})}
		{selected.length > 0 && (
			<button
				type="button"
				onClick={() => selected.forEach(onToggle)}
				className="px-1.5 py-1 text-xs text-stone-500 underline-offset-2 hover:underline"
			>
				Clear
			</button>
		)}
	</div>
);

/** Each list cuts off on its own, so one section expanding leaves the rest calm. */
const NounBlock = ({
	title,
	nouns,
	subjectSlug,
	limit,
}: {
	title?: string;
	nouns: BrowsableNoun[];
	subjectSlug: string;
	limit: number;
}) => {
	const [expanded, setExpanded] = useState(false);
	// Pair first, then slice: cutting the noun list first split couples across
	// the boundary, which is why μαμά showed without μπαμπάς.
	const rows = toNounRows(nouns, nounPairs[subjectSlug] ?? []);
	const visible = expanded ? rows : rows.slice(0, limit);
	const hidden = nouns.length - visible.reduce((n, r) => n + (r.kind === "pair" ? 2 : 1), 0);

	return (
		<section className="space-y-1.5">
			{title && (
				<h2 className="text-xs font-semibold tracking-wide text-stone-500 uppercase">
					{title}
					<span className="ml-1.5 font-normal text-stone-400">{nouns.length}</span>
				</h2>
			)}
			<div className="overflow-hidden rounded-lg border border-stone-200 bg-white">
				<NounList rows={visible} />
				{hidden > 0 && (
					<button
						type="button"
						aria-expanded={expanded}
						onClick={() => setExpanded(!expanded)}
						className="w-full border-t border-stone-200 px-3 py-2 text-sm text-stone-500 transition-colors hover:bg-stone-50"
					>
						{expanded ? "Show fewer" : `Show ${hidden} more`}
					</button>
				)}
			</div>
		</section>
	);
};

function NounSubjectPage() {
	const { group } = Route.useLoaderData();
	const [selected, setSelected] = useState<LevelFilter[]>([]);
	const toggle = (level: LevelFilter) =>
		setSelected((prev) =>
			prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level],
		);

	const counts: Record<string, number> = {};
	for (const noun of group.nouns) {
		const key = isUnlevelled(noun.cefrLevel) ? "unlevelled" : (noun.cefrLevel as string);
		counts[key] = (counts[key] ?? 0) + 1;
	}

	const matching = filterNouns(group.nouns, selected);

	// Sub-groups slice within themselves, so grouping happens before any cut-off:
	// a global slice used to leave "People & pets" showing one word.
	const subgroups = nounSubgroups[group.slug];
	const blocks: Array<{ title: string; nouns: BrowsableNoun[] }> = [];
	if (subgroups) {
		const seen = new Set<number>();
		for (const sub of subgroups) {
			const words = new Set(sub.words.map((w) => w.toLowerCase()));
			const matched = matching.filter((n) => !seen.has(n.id) && words.has(n.lemma.toLowerCase()));
			for (const n of matched) seen.add(n.id);
			if (matched.length > 0) blocks.push({ title: sub.title, nouns: matched });
		}
		// Catch-all so nouns outside the hand-authored sub-groups are never dropped.
		const rest = matching.filter((n) => !seen.has(n.id));
		if (rest.length > 0) blocks.push({ title: "More", nouns: rest });
	}

	return (
		<div className="space-y-5">
			<Link
				to="/learn/nouns"
				className="inline-flex items-center gap-1 text-sm text-stone-600 transition-colors hover:text-stone-800"
			>
				<ChevronLeft size={16} />
				<span>Nouns</span>
			</Link>

			<div>
				<h1 className="font-serif text-3xl text-stone-900">{group.title}</h1>
				<p className="mt-1 text-sm text-stone-600">
					{matching.length === group.nouns.length
						? `${group.nouns.length} words, commonest first.`
						: `${matching.length} of ${group.nouns.length} words, commonest first.`}
				</p>
			</div>

			<LevelToggles selected={selected} counts={counts} onToggle={toggle} />

			{matching.length === 0 ? (
				<p className="rounded-lg border border-stone-200 bg-stone-50 px-3 py-6 text-center text-sm text-stone-500">
					No words in this subject at that level.
				</p>
			) : blocks.length > 0 ? (
				blocks.map((block) => (
					<NounBlock
						key={block.title}
						title={block.title}
						nouns={block.nouns}
						subjectSlug={group.slug}
						limit={PER_GROUP_VISIBLE}
					/>
				))
			) : (
				<NounBlock nouns={matching} subjectSlug={group.slug} limit={INITIAL_VISIBLE} />
			)}
		</div>
	);
}
