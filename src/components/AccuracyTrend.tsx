import { format, parseISO } from "date-fns";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

export interface AccuracyTrendProps {
	data: Array<{
		date: string;
		accuracy: number;
	}>;
	className?: string;
}

const CHART_HEIGHT = 180;
const CHART_PADDING = { top: 20, right: 20, bottom: 40, left: 45 };

const formatDate = (dateStr: string) => format(parseISO(dateStr), "d MMM");

const formatPercent = (value: number) => `${Math.round(value * 100)}%`;

const computeRollingAverage = (
	data: Array<{ date: string; accuracy: number }>,
	windowSize: number,
) => {
	const sorted = [...data].sort((a, b) => a.date.localeCompare(b.date));
	return sorted.map((item, idx) => {
		const windowStart = Math.max(0, idx - windowSize + 1);
		const window = sorted.slice(windowStart, idx + 1);
		const avg = window.reduce((sum, d) => sum + d.accuracy, 0) / window.length;
		return { date: item.date, accuracy: avg, rawAccuracy: item.accuracy };
	});
};

export const AccuracyTrend = ({ data, className }: AccuracyTrendProps) => {
	const [hoveredPoint, setHoveredPoint] = useState<{
		date: string;
		accuracy: number;
		rawAccuracy: number;
		x: number;
		y: number;
	} | null>(null);

	const {
		points,
		pathD,
		areaD,
		xTicks,
		chartWidth,
		chartHeight,
		xScale,
		yScale,
	} = useMemo(() => {
		if (data.length === 0) {
			return {
				points: [],
				pathD: "",
				areaD: "",
				xTicks: [],
				chartWidth: 100,
				chartHeight: CHART_HEIGHT - CHART_PADDING.top - CHART_PADDING.bottom,
				xScale: () => 0,
				yScale: () => 0,
			};
		}

		const rollingData = computeRollingAverage(data, 7);
		const cWidth = 100;
		const cHeight = CHART_HEIGHT - CHART_PADDING.top - CHART_PADDING.bottom;

		const xScaleFn = (date: string) => {
			const idx = rollingData.findIndex((d) => d.date === date);
			if (rollingData.length <= 1) return cWidth / 2;
			return (idx / (rollingData.length - 1)) * cWidth;
		};

		const yScaleFn = (accuracy: number) => {
			return cHeight - accuracy * cHeight;
		};

		const pts = rollingData.map((d) => ({
			x: xScaleFn(d.date),
			y: yScaleFn(d.accuracy),
			date: d.date,
			accuracy: d.accuracy,
			rawAccuracy: d.rawAccuracy,
		}));

		const linePath = pts
			.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
			.join(" ");

		const lastPt = pts[pts.length - 1];
		const firstPt = pts[0];
		const areaPath =
			pts.length > 0 && lastPt && firstPt
				? `${linePath} L ${lastPt.x} ${cHeight} L ${firstPt.x} ${cHeight} Z`
				: "";

		const dates = rollingData.map((d) => d.date);
		const tickDates =
			dates.length <= 7
				? dates
				: dates.filter((_, i) => {
						const step = Math.ceil(dates.length / 6);
						return i % step === 0 || i === dates.length - 1;
					});

		return {
			points: pts,
			pathD: linePath,
			areaD: areaPath,
			xTicks: tickDates,
			chartWidth: cWidth,
			chartHeight: cHeight,
			xScale: xScaleFn,
			yScale: yScaleFn,
		};
	}, [data]);

	const yTicks = [0, 0.25, 0.5, 0.75, 1];

	if (data.length === 0) {
		return (
			<div
				className={cn(
					"flex items-center justify-center h-[180px] text-stone-400 text-sm",
					className,
				)}
			>
				No accuracy data yet
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
				aria-label="Accuracy trend chart showing 7-day rolling average"
			>
				<defs>
					<linearGradient id="accuracy-gradient" x1="0" y1="0" x2="0" y2="1">
						<stop
							offset="0%"
							stopColor="var(--color-olive-400)"
							stopOpacity="0.3"
						/>
						<stop
							offset="100%"
							stopColor="var(--color-olive-400)"
							stopOpacity="0.05"
						/>
					</linearGradient>
				</defs>

				<g transform={`translate(${CHART_PADDING.left}, ${CHART_PADDING.top})`}>
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
								{formatPercent(tick)}
							</text>
						</g>
					))}

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

					<path d={areaD} fill="url(#accuracy-gradient)" />

					<path
						d={pathD}
						fill="none"
						stroke="var(--color-olive-400)"
						strokeWidth={2}
						strokeLinecap="round"
						strokeLinejoin="round"
					/>

					{points.map((point) => (
						// biome-ignore lint/a11y/noStaticElementInteractions: SVG data points require mouse events for tooltips
						<g
							key={point.date}
							aria-label={`${formatDate(point.date)}: ${formatPercent(point.accuracy)} accuracy`}
							onMouseEnter={() => setHoveredPoint(point)}
							onMouseLeave={() => setHoveredPoint(null)}
							className="cursor-pointer"
						>
							<circle
								cx={point.x}
								cy={point.y}
								r={hoveredPoint?.date === point.date ? 5 : 3}
								fill="var(--color-olive-400)"
								className="transition-all"
							/>
						</g>
					))}
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
					<div className="text-olive-text">
						<span className="font-semibold">
							{formatPercent(hoveredPoint.accuracy)}
						</span>
						<span className="text-stone-400 ml-1">(7-day avg)</span>
					</div>
					<div className="text-stone-500 text-[10px]">
						Daily: {formatPercent(hoveredPoint.rawAccuracy)}
					</div>
				</div>
			)}

			<div className="flex items-center justify-center gap-4 mt-3 text-xs">
				<div className="flex items-center gap-1.5">
					<span className="size-2.5 rounded-full bg-olive-400" />
					<span className="text-stone-600">7-day rolling average</span>
				</div>
			</div>
		</div>
	);
};
