import type { ComponentProps, ReactNode } from "react";

import { GreekText } from "@/components/GreekText";

type GreekTextProps = ComponentProps<typeof GreekText>;

interface MarkedGreekProps {
	greek: string;
	/** The words the tone applies to, in reading order; the rest of the phrase stays neutral. */
	marked: string | string[];
	tone: GreekTextProps["tone"];
	size?: GreekTextProps["size"];
	className?: string;
}

export const MarkedGreek = ({ greek, marked, tone, size, className }: MarkedGreekProps) => {
	const parts: ReactNode[] = [];
	let cursor = 0;
	for (const span of typeof marked === "string" ? [marked] : marked) {
		const start = greek.indexOf(span, cursor);
		if (start === -1) continue;
		parts.push(
			greek.slice(cursor, start),
			<GreekText key={start} tone={tone} size={size}>
				{span}
			</GreekText>,
		);
		cursor = start + span.length;
	}
	parts.push(greek.slice(cursor));
	return (
		<GreekText size={size} className={className}>
			{parts}
		</GreekText>
	);
};
