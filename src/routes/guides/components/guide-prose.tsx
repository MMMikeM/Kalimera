import type { ReactNode } from "react";
import { cn } from "tailwind-variants";

import { ProseWithGreek } from "@/components/ProseWithGreek";
import type { GuideText } from "@/types/guide";

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

/** Guide text as paragraphs and bulleted lists; see `GuideText`. */
export const GuideProse = ({ text, className }: { text: GuideText; className?: string }) => (
	<div className={cn("max-w-2xl space-y-3 leading-relaxed text-stone-700", className)}>
		{(typeof text === "string" ? [text] : text).map((block, i) =>
			typeof block === "string" ? (
				<p key={i}>{withEmphasis(block)}</p>
			) : (
				<ul key={i} className="list-disc space-y-1 pl-5 marker:text-stone-400">
					{block.map((item, j) => (
						<li key={j}>{withEmphasis(item)}</li>
					))}
				</ul>
			),
		)}
	</div>
);
