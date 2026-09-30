import type { ReactNode } from "react";

import { GreekText } from "@/components/GreekText";

// A run of Greek words, with the spaces and punctuation between them, so that
// "θα βάλω → έβαλα" stays one run instead of three.
const GREEK_RUN =
	/[\u0370-\u03ff\u1f00-\u1fff]+(?:[\s'’.,;·…-]*[\u0370-\u03ff\u1f00-\u1fff]+)*/gu;

/** English prose with Greek words inside it, each Greek run rendered through GreekText. */
export const ProseWithGreek = ({ text }: { text: string }) => {
	const parts: ReactNode[] = [];
	let cursor = 0;
	for (const match of text.matchAll(GREEK_RUN)) {
		const start = match.index;
		parts.push(text.slice(cursor, start), <GreekText key={start} size="inherit" tone="inherit" weight="inherit">
				{match[0]}
			</GreekText>);
		cursor = start + match[0].length;
	}
	parts.push(text.slice(cursor));
	return <>{parts}</>;
};
