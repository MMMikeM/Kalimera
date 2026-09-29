import type { ComponentProps, ReactNode } from "react";

import { GrammarMark } from "@/components/GrammarMark";
import { GreekText } from "@/components/GreekText";
import type { GuideMark } from "@/types/guide";

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
		parts.push(
			text.slice(cursor, start),
			<GrammarMark key={start} case={m.case} gender={m.gender} plural={m.plural}>
				{m.text}
			</GrammarMark>,
		);
		cursor = start + m.text.length;
	}
	parts.push(text.slice(cursor));
	return (
		<GreekText size={size} tone="inherit" weight="inherit" className={className}>
			{parts}
		</GreekText>
	);
};
