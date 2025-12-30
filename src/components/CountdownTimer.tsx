import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface CountdownTimerProps {
	durationMs: number;
	onTimeout: () => void;
	isRunning: boolean;
	onTick?: (remainingMs: number) => void;
	className?: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
	durationMs,
	onTimeout,
	isRunning,
	onTick,
	className,
}) => {
	const [remainingMs, setRemainingMs] = useState(durationMs);
	const startTimeRef = useRef<number | null>(null);
	const frameRef = useRef<number | null>(null);

	// Reset when duration changes or when timer starts fresh
	useEffect(() => {
		if (!isRunning) {
			setRemainingMs(durationMs);
			startTimeRef.current = null;
		}
	}, [durationMs, isRunning]);

	useEffect(() => {
		if (!isRunning) {
			if (frameRef.current) {
				cancelAnimationFrame(frameRef.current);
				frameRef.current = null;
			}
			return;
		}

		startTimeRef.current = Date.now();

		const tick = () => {
			if (!startTimeRef.current) return;

			const elapsed = Date.now() - startTimeRef.current;
			const remaining = Math.max(0, durationMs - elapsed);

			setRemainingMs(remaining);
			onTick?.(remaining);

			if (remaining <= 0) {
				onTimeout();
				return;
			}

			frameRef.current = requestAnimationFrame(tick);
		};

		frameRef.current = requestAnimationFrame(tick);

		return () => {
			if (frameRef.current) {
				cancelAnimationFrame(frameRef.current);
			}
		};
	}, [isRunning, durationMs, onTimeout, onTick]);

	const seconds = remainingMs / 1000;
	const progress = (remainingMs / durationMs) * 100;

	// Color based on remaining time
	const getColorClass = () => {
		if (progress > 50) return "text-green-600";
		if (progress > 25) return "text-yellow-600";
		return "text-red-600";
	};

	const getProgressColorClass = () => {
		if (progress > 50) return "bg-green-500";
		if (progress > 25) return "bg-yellow-500";
		return "bg-red-500";
	};

	return (
		<div className={cn("flex flex-col items-center gap-2", className)}>
			{/* Time display */}
			<div
				className={cn(
					"text-3xl font-mono font-bold tabular-nums",
					getColorClass(),
				)}
			>
				{seconds.toFixed(1)}s
			</div>

			{/* Progress bar */}
			<div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
				<div
					className={cn(
						"h-full transition-all duration-100 ease-linear rounded-full",
						getProgressColorClass(),
					)}
					style={{ width: `${progress}%` }}
				/>
			</div>
		</div>
	);
};

export default CountdownTimer;
