import { type RefObject, useCallback, useEffect, useRef, useState } from "react";

import type { DrillMode, Phase } from "./deck";
import { useDrillStore } from "./drill-store";

type Update<T> = T | ((prev: T) => T);

/**
 * State owned by the card on screen. Each newly presented card starts from `initial`,
 * keyed on the store's `cardStartedAt` rather than reset from an effect.
 * Pass a stable `initial` (a module constant), since a fresh object resets identity every render.
 */
export const useCardState = <T>(initial: T) => {
	const cardStartedAt = useDrillStore((s) => s.cardStartedAt);
	const [held, setHeld] = useState({ at: cardStartedAt, value: initial });
	const value = held.at === cardStartedAt ? held.value : initial;
	const setValue = useCallback(
		(update: Update<T>) =>
			setHeld((prev) => {
				const current = prev.at === cardStartedAt ? prev.value : initial;
				return {
					at: cardStartedAt,
					value: update instanceof Function ? update(current) : update,
				};
			}),
		[cardStartedAt, initial],
	);
	return [value, setValue] as const;
};

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

const CONTROL_TAGS = new Set(["INPUT", "TEXTAREA", "SELECT", "BUTTON", "A"]);

/** A key pressed in another control (the header search, a focused button) belongs to that control. */
const isForeignControl = (target: EventTarget | null, own?: HTMLElement | null) =>
	target instanceof HTMLElement &&
	target !== own &&
	(target.isContentEditable || CONTROL_TAGS.has(target.tagName));

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
		// The answer input submits through its own form, so only keys from outside any control land here.
		const handler = (e: KeyboardEvent) => {
			if (e.key !== "Enter" || isForeignControl(e.target)) return;
			if (phase === "active" && mode === "forward") onSubmit();
		};
		window.addEventListener("keydown", handler);
		return () => window.removeEventListener("keydown", handler);
	}, [phase, mode, onSubmit]);
};

export const useContinueKeyboard = ({
	enabled,
	inputRef,
	onContinue,
}: {
	enabled: boolean;
	inputRef: RefObject<HTMLInputElement | null>;
	onContinue: () => void;
}) => {
	useEffect(() => {
		if (!enabled) return;
		const handler = (e: KeyboardEvent) => {
			if ((e.key !== "Enter" && e.key !== " ") || isForeignControl(e.target, inputRef.current)) return;
			e.preventDefault();
			onContinue();
		};
		window.addEventListener("keydown", handler);
		return () => window.removeEventListener("keydown", handler);
	}, [enabled, inputRef, onContinue]);
};
