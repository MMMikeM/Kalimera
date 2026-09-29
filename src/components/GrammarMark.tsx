import { type ComponentProps, useId } from "react";
import { cn } from "tailwind-variants";

import { GreekText } from "@/components/GreekText";
import { GENDER_MARK } from "@/constants/grammar-palette";
import type { Gender, GrammaticalCase } from "@/server/db/enums";

import { END_FOR_CASE, type EndShape, MARK, endShapes, markLines } from "./grammar-mark-geometry";

const LEARNER_LABEL: Record<GrammaticalCase, string> = {
	nominative: "Doer",
	accusative: "Target",
	genitive: "Owner",
	vocative: "Calling",
};

interface GrammarMarkProps {
	/** The end shape: Doer `<->`, Target `>-<`, Owner `o-o`, calling someone `!-!`. */
	case: GrammaticalCase;
	/** The mark's colour. Omit it and the mark is neutral, claiming no gender. */
	gender?: Gender;
	/** Two lines instead of one. */
	plural?: boolean;
	outlined?: boolean;
	/** Defaults to the size of the surrounding text, so a mark inside a sentence matches it. */
	size?: ComponentProps<typeof GreekText>["size"];
	className?: string;
	/** The whole phrase the case applies to, article included: "τις γυναίκες". */
	children: string;
}

type Paint = { fill: string; stroke?: string; strokeWidth?: number; strokeLinejoin?: "round" };

const Shape = ({ shape, paint }: { shape: EndShape; paint: Paint }) => {
	switch (shape.kind) {
		case "polygon":
			return <polygon points={shape.points.map((p) => p.join(",")).join(" ")} {...paint} />;
		case "circle":
			return <circle cx={shape.cx} cy={shape.cy} r={shape.r} {...paint} />;
		case "rect":
			return <rect x={shape.x} y={shape.y} width={shape.width} height={shape.height} rx={shape.rx} {...paint} />;
	}
};

/** The left end as drawn, and the right end as its mirror image anchored at the right edge. */
const BothEnds = ({ shapes, paint }: { shapes: EndShape[]; paint: Paint }) => (
	<>
		{shapes.map((s, i) => (
			<Shape key={i} shape={s} paint={paint} />
		))}
		<svg x="100%" overflow="visible">
			<g transform="scale(-1 1)">
				{shapes.map((s, i) => (
					<Shape key={i} shape={s} paint={paint} />
				))}
			</g>
		</svg>
	</>
);

/**
 * A Greek phrase with a mark beneath it that shows its case, its number and,
 * optionally, its gender, without spending colour on case.
 *
 * The phrase never wraps: it is one inline block, so a line break moves the
 * whole phrase and its mark together. The mark stretches with the phrase using
 * percentage coordinates inside the SVG, so nothing is measured in JavaScript
 * and the server-rendered page already draws it at the right width.
 */
export const GrammarMark = ({
	case: grammaticalCase,
	gender,
	plural = false,
	outlined = false,
	size = "inherit",
	className,
	children,
}: GrammarMarkProps) => {
	const maskId = `mark-${useId().replace(/[^\w-]/g, "")}`;
	const end = END_FOR_CASE[grammaticalCase];
	const shapes = endShapes(end, outlined);
	const lines = markLines(end, plural);
	const shapePaint: Paint = outlined
		? { fill: "none", stroke: "currentColor", strokeWidth: MARK.outline, strokeLinejoin: "round" }
		: { fill: "currentColor" };
	// An outlined shape is hollow; the mask keeps the lines out of its interior
	// while still letting them reach the stroke.
	const maskPaint: Paint = { ...shapePaint, fill: "black", stroke: "white" };
	const description = [LEARNER_LABEL[grammaticalCase], gender, plural ? "more than one" : undefined]
		.filter(Boolean)
		.join(", ");

	return (
		<span
			data-grammar-mark=""
			data-case={grammaticalCase}
			data-plural={plural || undefined}
			className={cn("relative inline-block min-w-7.5 pb-4 text-center whitespace-nowrap", className)}
		>
			<GreekText size={size} tone="inherit">
				{children}
			</GreekText>
			{/* Inset 2px from each end of the phrase, so two marked phrases a space apart
			    keep a visible gap between their marks. */}
			<span
				aria-hidden="true"
				className={cn("absolute inset-x-0.5 bottom-1 h-2.25", gender ? GENDER_MARK[gender] : "text-stone-600")}
			>
				<svg overflow="visible" className="block h-full w-full">
				{outlined ? (
					<mask id={maskId} maskUnits="userSpaceOnUse" x="-2" y="-2" width="120%" height="16">
						<rect x="-2" y="-2" width="120%" height="16" fill="white" />
						<BothEnds shapes={shapes} paint={maskPaint} />
					</mask>
				) : null}
				<g mask={outlined ? `url(#${maskId})` : undefined}>
					{lines.map((line) => (
						// Shifted left by the inset so that x2="100%" lands the same inset from the right edge
						<g key={line.y} transform={`translate(${-line.inset} 0)`}>
							<line
								x1={2 * line.inset}
								x2="100%"
								y1={line.y}
								y2={line.y}
								stroke="currentColor"
								strokeWidth={line.thickness}
							/>
						</g>
					))}
				</g>
				<BothEnds shapes={shapes} paint={shapePaint} />
				</svg>
			</span>
			<span lang="en" className="sr-only">
				{description}
			</span>
		</span>
	);
};
