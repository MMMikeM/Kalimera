import { Autocomplete } from "@base-ui/react/autocomplete";
import { Link } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "tailwind-variants";

import {
	CorrectedNote,
	HitContent,
	linkRender,
	NoResults,
	rowClassName,
	toGroups,
} from "@/components/SearchResults";
import type { SearchHit, SearchResult } from "@/lib/search-types";
import { useVocabularySearch } from "@/lib/use-vocabulary-search";

export const SEARCH_PLACEHOLDER = "Search Greek, greeklish or English";
export const SEARCH_HINT = "Type Greek or greeklish: fernw, πας, the key";

const ROWS_PER_GROUP = 3;
const RECENT_KEY = "kalimera:recent-searches";
const RECENT_LIMIT = 5;

const readRecent = (): string[] => {
	try {
		const parsed: unknown = JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]");
		return Array.isArray(parsed)
			? parsed.filter((term): term is string => typeof term === "string").slice(0, RECENT_LIMIT)
			: [];
	} catch {
		return [];
	}
};

const useRecentSearches = () => {
	// Recents only render inside an opened popup, never in server HTML, so reading on first render cannot mismatch.
	const [terms, setTerms] = useState<string[]>(() => (typeof window === "undefined" ? [] : readRecent()));

	const remember = (term: string) => {
		const trimmed = term.trim();
		if (!trimmed) return;
		const next = [trimmed, ...readRecent().filter((t) => t !== trimmed)].slice(0, RECENT_LIMIT);
		setTerms(next);
		try {
			localStorage.setItem(RECENT_KEY, JSON.stringify(next));
		} catch {
			// Private mode or a full quota: recents are a convenience, so skip them.
		}
	};

	return { terms, remember };
};

type PanelItem = SearchHit | string;

interface PanelGroup {
	id: string;
	label: string;
	items: PanelItem[];
	/** Hits beyond the shown rows; 0 hides "More". */
	remaining: number;
}

const buildGroups = (searching: boolean, result: SearchResult, recent: string[]): PanelGroup[] => {
	if (!searching) {
		return recent.length > 0
			? [{ id: "recent", label: "Recent", items: recent, remaining: 0 }]
			: [];
	}
	return toGroups(result).map((group) => ({
		id: group.id,
		label: group.label,
		items: group.hits.slice(0, ROWS_PER_GROUP),
		remaining: Math.max(0, group.hits.length - ROWS_PER_GROUP),
	}));
};

interface SearchPanelProps {
	/** `dropdown` floats under the input; `inline` lays the results out beneath it, for a popover that already floats. */
	variant: "dropdown" | "inline";
	focusOnMount?: boolean;
	/** Called after a result row is opened. */
	onActivate?: () => void;
	className?: string;
}

export const SearchPanel = ({ variant, focusOnMount, onActivate, className }: SearchPanelProps) => {
	const inline = variant === "inline";
	const [query, setQuery] = useState("");
	const [open, setOpen] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const { terms, remember } = useRecentSearches();
	const { result, loading } = useVocabularySearch(query, { enabled: inline || open });
	const trimmed = query.trim();
	const searching = trimmed.length > 0;
	const groups = buildGroups(searching, result, terms);
	const found = result.words.length + result.phrases.length;

	useEffect(() => {
		if (!focusOnMount) return;
		const timer = setTimeout(() => inputRef.current?.focus(), 50);
		return () => clearTimeout(timer);
	}, [focusOnMount]);

	const activate = () => {
		remember(query);
		setOpen(false);
		inputRef.current?.blur();
		onActivate?.();
	};

	const body = (
		<div className="flex min-h-0 flex-col">
			<Autocomplete.Status className="sr-only">
				{searching ? `${found} results` : ""}
			</Autocomplete.Status>
			{result.corrected && searching && (
				<CorrectedNote corrected={result.corrected} className="px-4 pt-3 text-xs" />
			)}
			<Autocomplete.List className="p-1.5 outline-none">
				{(group: PanelGroup) => (
					<Autocomplete.Group key={group.id} items={group.items} className="py-1">
						<Autocomplete.GroupLabel className="px-3 pt-1 pb-0.5 text-xs font-medium text-muted-foreground">
							{group.label}
						</Autocomplete.GroupLabel>
						<Autocomplete.Collection>
							{(item: PanelItem) =>
								typeof item === "string" ? (
									<Autocomplete.Item
										key={item}
										value={item}
										className={cn(rowClassName, "text-sm text-stone-700")}
										onClick={() => setQuery(item)}
									>
										{item}
									</Autocomplete.Item>
								) : (
									<Autocomplete.Item
										key={item.entry.id}
										value={item}
										className={rowClassName}
										render={linkRender(item.entry.link)}
										onClick={item.entry.link ? activate : () => remember(query)}
									>
										<HitContent hit={item} focal={item === groups[0]?.items[0]} />
									</Autocomplete.Item>
								)
							}
						</Autocomplete.Collection>
						{group.remaining > 0 && (
							<Link
								to="/search"
								search={{ q: trimmed }}
								onClick={activate}
								className="block rounded-lg px-3 py-2 text-xs font-medium text-muted-foreground underline underline-offset-2 hover:text-stone-900"
							>
								More ({group.remaining})
							</Link>
						)}
					</Autocomplete.Group>
				)}
			</Autocomplete.List>
			{loading && (
				<p className="px-4 py-6 text-center text-sm text-muted-foreground">Loading…</p>
			)}
			{searching && !loading && found === 0 && (
				<NoResults query={trimmed} className="px-4 py-6 text-center text-sm" />
			)}
			{!searching && <p className="px-4 pt-2 pb-3 text-xs text-muted-foreground">{SEARCH_HINT}</p>}
		</div>
	);

	return (
		<Autocomplete.Root
			items={groups}
			mode="none"
			value={query}
			onValueChange={(value, details) => {
				if (details.reason !== "item-press") setQuery(value);
			}}
			open={inline ? true : open}
			inline={inline}
			openOnInputClick
			onOpenChange={(next, details) => {
				// Rows that open a page close the panel through `activate`; the rest must leave it open.
				if (!next && details.reason === "item-press") return;
				setOpen(next);
			}}
			itemToStringValue={(item: PanelItem) => (typeof item === "string" ? item : item.entry.greek)}
		>
			<div className={cn("relative", className)}>
				<Search
					size={inline ? 16 : 18}
					aria-hidden="true"
					className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-stone-500"
				/>
				<Autocomplete.Input
					ref={inputRef}
					placeholder={SEARCH_PLACEHOLDER}
					aria-label="Search"
					onFocus={() => setOpen(true)}
					className={cn(
						"w-full border bg-card py-2 pr-9 pl-10 text-sm text-stone-900 placeholder:text-stone-600 focus:border-terracotta focus:ring-2 focus:ring-terracotta-300 focus:outline-none",
						inline ? "rounded-lg border-stone-300" : "rounded-full border-transparent bg-stone-100",
					)}
				/>
				{query && (
					<button
						type="button"
						aria-label="Clear search"
						onClick={() => {
							setQuery("");
							inputRef.current?.focus();
						}}
						className="absolute top-1/2 right-3 -translate-y-1/2 text-stone-600 hover:text-stone-900"
					>
						<X size={14} aria-hidden="true" />
					</button>
				)}
			</div>
			{inline ? (
				<div className="mt-2 max-h-page overflow-y-auto">{body}</div>
			) : (
				<Autocomplete.Portal>
					<Autocomplete.Positioner sideOffset={8} align="start" className="z-50">
						<Autocomplete.Popup className="max-h-page w-[max(var(--anchor-width),28rem)] max-w-[calc(100vw-2rem)] overflow-y-auto rounded-xl border border-stone-200 bg-popover text-popover-foreground shadow-lg outline-none">
							{body}
						</Autocomplete.Popup>
					</Autocomplete.Positioner>
				</Autocomplete.Portal>
			)}
		</Autocomplete.Root>
	);
};
