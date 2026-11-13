import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { Fragment, type ReactNode } from "react";
import { cn } from "tailwind-variants";

import { GreekText } from "@/components/GreekText";
import { Pronunciation } from "@/components/Pronunciation";
import type { SearchHit, SearchLink, SearchResult } from "@/lib/search-types";

interface ResultGroup {
	id: "words" | "phrases";
	label: string;
	hits: SearchHit[];
}

/** Words always come before phrases; a group with no hits is left out. */
export const toGroups = (result: SearchResult): ResultGroup[] =>
	(
		[
			{ id: "words", label: "Words", hits: result.words },
			{ id: "phrases", label: "Phrases", hits: result.phrases },
		] satisfies ResultGroup[]
	).filter((group) => group.hits.length > 0);

/** A TanStack link for a row that has a page, otherwise undefined so the row stays plain. */
export const linkRender = (link: SearchLink | undefined) =>
	link ? <Link {...link} /> : undefined;

export const rowClassName =
	"flex min-h-11 w-full items-center gap-2 rounded-lg px-3 py-2 text-left outline-none data-[highlighted]:bg-stone-100 focus-visible:bg-stone-100";

const Dot = () => (
	<span aria-hidden="true" className="px-1.5 text-stone-400">
		·
	</span>
);

const Quiet = ({ children }: { children: ReactNode }) => (
	<span className="block truncate text-xs text-muted-foreground">{children}</span>
);

interface HitContentProps {
	hit: SearchHit;
	/** The one row the eye lands on: the first of the first group. */
	focal?: boolean;
}

/** One bounded line: Greek, how to say it, what it means. Extra facts sit quietly beneath. */
export const HitContent = ({ hit, focal = false }: HitContentProps) => {
	const { entry, matchedForm } = hit;
	const parts = (["past", "future"] as const).flatMap((tense) => {
		const form = entry.principalParts?.[tense];
		return form ? [{ tense, form }] : [];
	});

	return (
		<>
			<span className="min-w-0 flex-1">
				<span className="flex min-w-0 flex-wrap items-baseline gap-x-2">
					<GreekText
						size={focal ? "xl" : "base"}
						tone={focal ? "accent" : "default"}
						weight="medium"
						className="max-w-full truncate"
					>
						{entry.greek}
					</GreekText>
					<Pronunciation greek={entry.greek} size="xs" className="max-w-full truncate" />
					<span
						className={cn(
							"min-w-[4ch] truncate text-stone-700",
							entry.kind === "phrase" ? "max-w-full basis-full" : "flex-1",
							focal ? "text-base" : "text-sm",
						)}
					>
						{entry.english}
					</span>
				</span>
				{matchedForm && (
					<Quiet>
						<GreekText size="inherit" tone="inherit">
							{matchedForm.greek}
						</GreekText>{" "}
						— {matchedForm.note}
						<Dot />
						from <GreekText size="inherit" tone="inherit">{entry.greek}</GreekText>
					</Quiet>
				)}
				{parts.length > 0 && (
					<Quiet>
						{parts.map(({ tense, form }, index) => (
							<Fragment key={tense}>
								{index > 0 && <Dot />}
								{tense}{" "}
								<GreekText size="inherit" tone="inherit">
									{form}
								</GreekText>
							</Fragment>
						))}
					</Quiet>
				)}
			</span>
			{entry.link && (
				<ChevronRight size={14} aria-hidden="true" className="shrink-0 text-stone-400" />
			)}
		</>
	);
};

/** A result row outside the autocomplete, as on the /search page. */
export const HitRow = ({ hit, focal }: HitContentProps) => {
	const content = <HitContent hit={hit} focal={focal} />;
	const { link } = hit.entry;
	return link ? (
		<Link {...link} className={cn(rowClassName, "hover:bg-stone-100")}>
			{content}
		</Link>
	) : (
		<div className={rowClassName}>{content}</div>
	);
};

export const CorrectedNote = ({ corrected, className }: { corrected: string; className?: string }) => (
	<p className={cn("text-muted-foreground", className)}>
		Showing results for <span className="font-medium text-stone-800">{corrected}</span>
	</p>
);

export const NoResults = ({ query, className }: { query: string; className?: string }) => (
	<p className={cn("text-muted-foreground", className)}>
		Nothing for “{query}”. Try the Greek, or fewer letters.
	</p>
);
