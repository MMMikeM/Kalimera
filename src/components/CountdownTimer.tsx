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

	return (
		<div className={cn("flex flex-col items-center gap-2", className)}>
			<div className="font-mono text-3xl font-bold text-stone-700 tabular-nums">
				{seconds.toFixed(1)}s
			</div>

			<div className="h-2 w-full overflow-hidden rounded-full bg-stone-200">
				<div
					className="h-full rounded-full bg-terracotta-500 transition-all duration-100 ease-linear"
					style={{ width: `${progress}%` }}
				/>
			</div>
		</div>
	);
};

export default CountdownTimer;
