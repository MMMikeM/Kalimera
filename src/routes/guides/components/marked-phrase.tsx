import type { ComponentProps, ReactNode } from "react";

import { GrammarMark } from "@/components/GrammarMark";
import { GreekText } from "@/components/GreekText";
import type { GuideMark } from "@/types/guide";

// A mark is one unbreakable box, so punctuation right after it could wrap onto
// the next line alone; it travels with the mark instead.
const TRAILING_PUNCTUATION = /^[.,;:!?·…»)]+/;

/** Greek with a grammar mark under each marked run, in order; the rest stays plain. */
export const MarkedPhrase = ({
	text,
	marks = [],
	size,
	className,
}: {
	text: string;
	marks?: GuideMark[];
	size?: ComponentProps<typeof GreekText>["size"];
	className?: string;
}) => {
	const parts: ReactNode[] = [];
	let cursor = 0;
	for (const m of marks) {
		const start = text.indexOf(m.text, cursor);
		if (start === -1) continue;
		const end = start + m.text.length;
		const trailing = TRAILING_PUNCTUATION.exec(text.slice(end))?.[0] ?? "";
		parts.push(
			text.slice(cursor, start),
			<span key={start} className="whitespace-nowrap">
				<GrammarMark case={m.case} gender={m.gender} plural={m.plural}>
					{m.text}
				</GrammarMark>
				{trailing}
			</span>,
		);
		cursor = end + trailing.length;
	}
	parts.push(text.slice(cursor));
	return (
		<GreekText size={size} tone="inherit" weight="inherit" className={className}>
			{parts}
		</GreekText>
	);
};
