import { useCallback, useRef, useState } from "react";

import { MEDIUM_SPEED_MS } from "../drill-speeds";
import { useLogDrillAttempt } from "../hooks";
import {
	type Attempt,
	type DrillForm,
	type DrillMode,
	type Phase,
	type SessionSize,
	buildDeck,
	useAutoAdvance,
	useFocusOnActive,
} from "./drill-engine";

export interface DrillLogData {
	prompt: string;
	correctAnswer: string;
	userAnswer: string;
	weakAreaIdentifier?: string;
}

export interface SpeedOption {
	id: string;
	label: string;
	timeLimit: number;
}

export const useDrillEngine = <T extends DrillForm>({
	items,
	drillId,
	speeds,
	categories,
	defaultSessionSize = 10,
}: {
	items: T[];
	drillId: string;
	speeds?: ReadonlyArray<SpeedOption>;
	categories?: Array<{ id: string; label: string }>;
	defaultSessionSize?: SessionSize;
}) => {
	const logAttemptFn = useLogDrillAttempt(drillId);

	const [phase, setPhase] = useState<Phase>("config");
	const [mode, setMode] = useState<DrillMode>("forward");
	const [sessionSize, setSessionSize] = useState<SessionSize>(defaultSessionSize);
	const [activeCategory, setActiveCategory] = useState<string | null>(null);
	const [activeSpeedId, setActiveSpeedId] = useState<string | null>(
		speeds ? (speeds[1]?.id ?? speeds[0]?.id ?? null) : null,
	);

	const activeSpeed = speeds?.find((s) => s.id === activeSpeedId);
	const effectiveTimeLimit = activeSpeed?.timeLimit ?? MEDIUM_SPEED_MS;

	const [deck, setDeck] = useState<T[]>([]);
	const [cardIndex, setCardIndex] = useState(0);
	const [input, setInput] = useState("");
	const inputRef = useRef<HTMLInputElement | null>(null);
	const inputValueRef = useRef<string>("");
	const [attempts, setAttempts] = useState<Attempt<T>[]>([]);
	const [lastAttempt, setLastAttempt] = useState<Attempt<T> | null>(null);

	// Engines register their per-card reset here
	const resetSelectorsRef = useRef<(() => void) | null>(null);
	const resetSelectors = useCallback(() => {
		resetSelectorsRef.current?.();
	}, []);

	const currentForm = deck[cardIndex];

	const recordAttempt = useCallback(
		(isCorrect: boolean, timeTaken: number, logData: DrillLogData, timedOut = false) => {
			if (!currentForm) return;
			const attempt: Attempt<T> = { form: currentForm, isCorrect, timeTaken, timedOut };
			setLastAttempt(attempt);
			setAttempts((prev) => [...prev, attempt]);
			setPhase("feedback");
			logAttemptFn({ ...logData, isCorrect, timeTaken });
		},
		[currentForm, logAttemptFn],
	);

	const startDrill = useCallback(() => {
		const source = activeCategory
			? items.filter((i) => (i as T & { category?: string }).category === activeCategory)
			: items;
		setDeck(buildDeck(source, sessionSize));
		setCardIndex(0);
		setInput("");
		inputValueRef.current = "";
		setAttempts([]);
		setLastAttempt(null);
		resetSelectors();
		setPhase("active");
	}, [items, activeCategory, sessionSize, resetSelectors]);

	useAutoAdvance({
		phase,
		lastAttempt,
		cardIndex,
		sessionSize,
		mode,
		setPhase,
		setCardIndex,
		setInput,
		inputValueRef,
		resetSelectors,
		inputRef,
	});

	useFocusOnActive({ phase, mode, inputRef });

	return {
		phase,
		setPhase,
		mode,
		setMode,
		sessionSize,
		setSessionSize,
		activeCategory,
		setActiveCategory,
		activeSpeedId,
		setActiveSpeedId,
		effectiveTimeLimit,
		cardIndex,
		currentForm,
		attempts,
		lastAttempt,
		input,
		setInput,
		inputRef,
		inputValueRef,
		resetSelectorsRef,
		startDrill,
		recordAttempt,
	};
};
