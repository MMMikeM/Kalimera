import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";

import { PageHeading } from "@/components/PageHeading";
import { SEARCH_HINT, SEARCH_PLACEHOLDER } from "@/components/SearchPanel";
import { useVocabularySearch } from "@/lib/use-vocabulary-search";
import { CorrectedNote, HitRow, NoResults, toGroups } from "@/components/SearchResults";
import { SearchInput } from "@/components/SearchInput";
import { ButtonLink } from "@/components/ui/button";

const PAGE_SIZE = 10;
const NAVIGATE_DEBOUNCE_MS = 200;
/** A disabled link has no `:disabled` state, so the button's own disabled styles never apply. */
const pagerDisabled = "aria-disabled:pointer-events-none aria-disabled:opacity-50";

export const Route = createFileRoute("/search")({
	validateSearch: z.object({
		q: z.string().catch("").default(""),
		page: z.number().int().min(1).catch(1).default(1),
	}),
	component: SearchRoute,
});

function SearchRoute() {
	const { q, page } = Route.useSearch();
	const navigate = useNavigate({ from: Route.fullPath });
	const [draft, setDraft] = useState(q);
	const [typing, setTyping] = useState(false);
	const navigateTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
	// The header dropdown can change q while this page stays mounted. Typing here
	// owns the draft, because a navigation that lands late would otherwise overwrite it.
	const [seenQ, setSeenQ] = useState(q);
	if (q !== seenQ) {
		setSeenQ(q);
		if (!typing) setDraft(q);
	}
	useEffect(() => () => clearTimeout(navigateTimer.current), []);
	const { result, loading } = useVocabularySearch(q, { enabled: true });
	const searching = q.trim().length > 0;

	const rows = toGroups(result).flatMap((group) => group.hits.map((hit) => ({ group, hit })));
	const pageCount = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
	const current = Math.min(page, pageCount);
	const visible = rows.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

	const setQuery = (nextQ: string, { immediately = false } = {}) => {
		setDraft(nextQ);
		clearTimeout(navigateTimer.current);
		const go = () => navigate({ search: { q: nextQ, page: 1 }, replace: true });
		if (immediately) go();
		else navigateTimer.current = setTimeout(go, NAVIGATE_DEBOUNCE_MS);
	};

	return (
		<div className="mx-auto max-w-2xl space-y-6">
			<PageHeading title="Search" />

			<SearchInput
				placeholder={SEARCH_PLACEHOLDER}
				aria-label="Search"
				value={draft}
				onChange={(e) => setQuery(e.target.value)}
				onClear={() => setQuery("", { immediately: true })}
				onFocus={() => setTyping(true)}
				onBlur={() => setTyping(false)}
				icon={<Search />}
				autoFocus
			/>

			{!searching && <p className="text-sm text-muted-foreground">{SEARCH_HINT}</p>}

			{searching && result.corrected && (
				<CorrectedNote corrected={result.corrected} className="text-sm" />
			)}

			{loading && <p className="py-6 text-sm text-muted-foreground">Loading…</p>}

			{searching && !loading && rows.length === 0 && <NoResults query={q.trim()} className="py-6" />}

			{visible.length > 0 && (
				<div aria-live="polite">
					<p className="sr-only">
						{rows.length} results, page {current} of {pageCount}
					</p>
					{visible.map(({ group, hit }, index) => (
						<section key={hit.entry.id} className="pt-2">
							{group !== visible[index - 1]?.group && (
								<h2 className="px-3 pb-0.5 text-xs font-medium text-muted-foreground">
									{group.label}
								</h2>
							)}
							<HitRow hit={hit} focal={current === 1 && index === 0} />
						</section>
					))}
				</div>
			)}

			{pageCount > 1 && (
				<nav aria-label="Pages" className="flex items-center justify-between">
					<ButtonLink
						to="/search"
						search={{ q, page: current - 1 }}
						replace
						variant="ghost"
						size="sm"
						disabled={current <= 1}
						className={pagerDisabled}
					>
						Previous
					</ButtonLink>
					<span className="text-sm text-muted-foreground">
						{current} of {pageCount}
					</span>
					<ButtonLink
						to="/search"
						search={{ q, page: current + 1 }}
						replace
						variant="ghost"
						size="sm"
						disabled={current >= pageCount}
						className={pagerDisabled}
					>
						Next
					</ButtonLink>
				</nav>
			)}
		</div>
	);
}
