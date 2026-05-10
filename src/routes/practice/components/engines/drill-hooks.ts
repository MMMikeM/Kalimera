import { useEffect, useRef, useState } from "react";

import type { DrillMode, Phase } from "./deck";

export const useCountdown = (durationMs: number, isRunning: boolean, onTimeout: () => void) => {
	const [progress, setProgress] = useState(1);
	const rafRef = useRef<number | null>(null);
	const startRef = useRef<number>(0);
	const onTimeoutRef = useRef(onTimeout);
	useEffect(() => {
		onTimeoutRef.current = onTimeout;
	}, [onTimeout]);

	useEffect(() => {
		if (!isRunning) {
			if (rafRef.current) {
				cancelAnimationFrame(rafRef.current);
				rafRef.current = null;
			}
			return;
		}
		setProgress(1);
		startRef.current = performance.now();
		const tick = (now: number) => {
			const rem = Math.max(0, 1 - (now - startRef.current) / durationMs);
			setProgress(rem);
			if (rem > 0) {
				rafRef.current = requestAnimationFrame(tick);
			} else {
				onTimeoutRef.current();
			}
		};
		rafRef.current = requestAnimationFrame(tick);
		return () => {
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
		};
	}, [isRunning, durationMs]);

	return { progress };
};

export const useForwardKeyboard = ({
	phase,
	mode,
	onSubmit,
}: {
	phase: Phase;
	mode: DrillMode;
	onSubmit: () => void;
}) => {
	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			if (e.key === "Enter" && phase === "active" && mode === "forward") onSubmit();
		};
		window.addEventListener("keydown", handler);
		return () => window.removeEventListener("keydown", handler);
	}, [phase, mode, onSubmit]);
};
