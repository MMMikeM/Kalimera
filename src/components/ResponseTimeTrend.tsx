import { useState, useMemo } from "react";
import { format, parseISO } from "date-fns";
import { cn } from "@/lib/utils";

export interface ResponseTimeTrendProps {
	data: Array<{
		date: string;
		avgTimeMs: number;
		wordType: "noun" | "verb" | "phrase";
	}>;
	className?: string;
}

const WORD_TYPE_COLORS = {
	noun: { stroke: "var(--color-terracotta)", label: "Nouns" },
	verb: { stroke: "var(--color-ocean)", label: "Verbs" },
	phrase: { stroke: "var(--color-olive)", label: "Phrases" },
} as const;

const FLUENCY_THRESHOLD_MS = 2000;
const CHART_HEIGHT = 200;
const CHART_PADDING = { top: 20, right: 20, bottom: 40, left: 45 };

const formatDate = (dateStr: string) => format(parseISO(dateStr), "d MMM");

const formatTime = (ms: number) => `${(ms / 1000).toFixed(1)}s`;

export const ResponseTimeTrend = ({
	data,
	className,
}: ResponseTimeTrendProps) => {
	const [hoveredPoint, setHoveredPoint] = useState<{
		date: string;
		wordType: "noun" | "verb" | "phrase";
		avgTimeMs: number;
		x: number;
		y: number;
	} | null>(null);

	const { dates, maxTime, lines, xScale, yScale, chartWidth, chartHeight } =
		useMemo(() => {
			const uniqueDates = [...new Set(data.map((d) => d.date))].sort();
			const maxTimeValue = Math.max(
				...data.map((d) => d.avgTimeMs),
				FLUENCY_THRESHOLD_MS + 500,
			);

			const cWidth = 100;
			const cHeight = CHART_HEIGHT - CHART_PADDING.top - CHART_PADDING.bottom;

			const xScaleFn = (date: string) => {
				const idx = uniqueDates.indexOf(date);
				if (uniqueDates.length <= 1) return cWidth / 2;
				return (idx / (uniqueDates.length - 1)) * cWidth;
			};

			const yScaleFn = (ms: number) => {
				return cHeight - (ms / maxTimeValue) * cHeight;
			};

			const linesByType = (["noun", "verb", "phrase"] as const).map(
				(wordType) => {
					const typeData = data
						.filter((d) => d.wordType === wordType)
						.sort((a, b) => a.date.localeCompare(b.date));

					if (typeData.length === 0) return null;

					const points = typeData.map((d) => ({
						x: xScaleFn(d.date),
						y: yScaleFn(d.avgTimeMs),
						date: d.date,
						avgTimeMs: d.avgTimeMs,
						wordType,
					}));

					const pathD = points
						.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
						.join(" ");

					return { wordType, points, pathD };
				},
			);

			return {
				dates: uniqueDates,
				maxTime: maxTimeValue,
				lines: linesByType.filter(Boolean),
				xScale: xScaleFn,
				yScale: yScaleFn,
				chartWidth: cWidth,
				chartHeight: cHeight,
			};
		}, [data]);

	const fluencyY = yScale(FLUENCY_THRESHOLD_MS);

	const yTicks = useMemo(() => {
		const tickCount = 5;
		const ticks: number[] = [];
		for (let i = 0; i <= tickCount; i++) {
			ticks.push((maxTime / tickCount) * i);
		}
		return ticks;
	}, [maxTime]);

	const xTicks = useMemo(() => {
		if (dates.length <= 7) return dates;
		const step = Math.ceil(dates.length / 6);
		return dates.filter((_, i) => i % step === 0 || i === dates.length - 1);
	}, [dates]);

	if (data.length === 0) {
		return (
			<div
				className={cn(
					"flex items-center justify-center h-[200px] text-stone-400 text-sm",
					className,
				)}
			>
				No response time data yet
			</div>
		);
	}

	return (
		<div className={cn("relative", className)}>
			<svg
				viewBox={`0 0 ${chartWidth + CHART_PADDING.left + CHART_PADDING.right} ${CHART_HEIGHT}`}
				className="w-full h-auto"
				preserveAspectRatio="xMidYMid meet"
				role="img"
				aria-label="Response time trend chart by word type"
			>
				<g
					transform={`translate(${CHART_PADDING.left}, ${CHART_PADDING.top})`}
				>
					{yTicks.map((tick) => (
						<g key={tick} transform={`translate(0, ${yScale(tick)})`}>
							<line
								x1={0}
								x2={chartWidth}
								stroke="var(--color-stone-200)"
								strokeDasharray="2,2"
							/>
							<text
								x={-8}
								y={4}
								textAnchor="end"
								className="text-[8px] fill-stone-400"
							>
								{formatTime(tick)}
							</text>
						</g>
					))}

					<g transform={`translate(0, ${fluencyY})`}>
						<line
							x1={0}
							x2={chartWidth}
							stroke="var(--color-honey)"
							strokeWidth={1.5}
							strokeDasharray="4,3"
						/>
						<text
							x={chartWidth + 4}
							y={4}
							className="text-[7px] fill-honey-text font-medium"
						>
							2s
						</text>
					</g>

					{xTicks.map((date) => (
						<g
							key={date}
							transform={`translate(${xScale(date)}, ${chartHeight})`}
						>
							<text
								y={16}
								textAnchor="middle"
								className="text-[7px] fill-stone-400"
							>
								{formatDate(date)}
							</text>
						</g>
					))}

					{lines.map(
						(line) =>
							line && (
								<path
									key={line.wordType}
									d={line.pathD}
									fill="none"
									stroke={WORD_TYPE_COLORS[line.wordType].stroke}
									strokeWidth={2}
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							),
					)}

					{lines.map(
						(line) =>
							line?.points.map((point) => (
								// biome-ignore lint/a11y/noStaticElementInteractions: SVG data points require mouse events for tooltips
								<g
									key={`${point.wordType}-${point.date}`}
									aria-label={`${WORD_TYPE_COLORS[point.wordType].label} on ${formatDate(point.date)}: ${formatTime(point.avgTimeMs)}`}
									onMouseEnter={() => setHoveredPoint(point)}
									onMouseLeave={() => setHoveredPoint(null)}
									className="cursor-pointer"
								>
									<circle
										cx={point.x}
										cy={point.y}
										r={hoveredPoint?.date === point.date && hoveredPoint?.wordType === point.wordType ? 5 : 3}
										fill={WORD_TYPE_COLORS[point.wordType].stroke}
										className="transition-all"
									/>
								</g>
							)),
					)}
				</g>
			</svg>

			{hoveredPoint && (
				<div
					className="absolute bg-white border border-stone-200 rounded-lg shadow-lg px-3 py-2 text-xs pointer-events-none z-10"
					style={{
						left: `${((hoveredPoint.x + CHART_PADDING.left) / (chartWidth + CHART_PADDING.left + CHART_PADDING.right)) * 100}%`,
						top: `${((hoveredPoint.y + CHART_PADDING.top) / CHART_HEIGHT) * 100}%`,
						transform: "translate(-50%, -120%)",
					}}
				>
					<div className="font-medium text-stone-700">
						{formatDate(hoveredPoint.date)}
					</div>
					<div
						className="font-semibold"
						style={{ color: WORD_TYPE_COLORS[hoveredPoint.wordType].stroke }}
					>
						{WORD_TYPE_COLORS[hoveredPoint.wordType].label}:{" "}
						{formatTime(hoveredPoint.avgTimeMs)}
					</div>
				</div>
			)}

			<div className="flex items-center justify-center gap-4 mt-3 text-xs">
				{(["noun", "verb", "phrase"] as const).map((type) => {
					const hasData = data.some((d) => d.wordType === type);
					if (!hasData) return null;
					return (
						<div key={type} className="flex items-center gap-1.5">
							<span
								className="size-2.5 rounded-full"
								style={{ backgroundColor: WORD_TYPE_COLORS[type].stroke }}
							/>
							<span className="text-stone-600">
								{WORD_TYPE_COLORS[type].label}
							</span>
						</div>
					);
				})}
				<div className="flex items-center gap-1.5">
					<span className="w-4 h-0.5 bg-honey" style={{ background: "repeating-linear-gradient(90deg, var(--color-honey) 0, var(--color-honey) 3px, transparent 3px, transparent 6px)" }} />
					<span className="text-stone-600">Fluency target</span>
				</div>
			</div>
		</div>
	);
};
