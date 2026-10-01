import { Fragment, type ReactNode } from "react";

import { cn } from "tailwind-variants";

import { ProseWithGreek } from "@/components/ProseWithGreek";

const withEmphasis = (text: string): ReactNode[] =>
	text.split(/(_[^_]+_)/).map((part, i) =>
		part.startsWith("_") && part.endsWith("_") && part.length > 2 ? (
			<em key={i}>
				<ProseWithGreek text={part.slice(1, -1)} />
			</em>
		) : (
			<ProseWithGreek key={i} text={part} />
		),
	);

/**
 * Guide text with a little structure: a blank line starts a new paragraph, lines
 * starting "- " form a bulleted list, and _word_ is emphasised. Greek inside is
 * rendered as Greek.
 */
export const GuideProse = ({ text, className }: { text: string; className?: string }) => (
	<div className={cn("max-w-2xl space-y-3 leading-relaxed text-stone-700", className)}>
		{text.split(/\n\s*\n/).map((block, i) => {
			const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
			if (lines.length > 0 && lines.every((l) => l.startsWith("- "))) {
				return (
					<ul key={i} className="list-disc space-y-1 pl-5 marker:text-stone-400">
						{lines.map((l, j) => (
							<li key={j}>{withEmphasis(l.slice(2))}</li>
						))}
					</ul>
				);
			}
			return (
				<p key={i}>
					{lines.map((l, j) => (
						<Fragment key={j}>
							{j > 0 ? " " : null}
							{withEmphasis(l)}
						</Fragment>
					))}
				</p>
			);
		})}
	</div>
);
