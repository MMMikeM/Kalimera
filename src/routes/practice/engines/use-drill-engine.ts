import { useEffect, useRef, useState } from "react";

import { MEDIUM_SPEED_MS } from "../drill-speeds";
import { type LogAttemptInput, useLogDrillAttempt } from "../hooks";
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

interface DrillLogData {
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

export interface SessionStats<T extends DrillForm> {
	total: number;
	correct: number;
	attempts: Attempt<T>[];
}

export const useDrillEngine = <T extends DrillForm>({
	items,
	drillId,
	speeds,
	defaultSessionSize = 10,
	autoStart = false,
	logAttemptFn: logAttemptFnOverride,
	onComplete,
}: {
	items: T[];
	drillId: string;
	speeds?: ReadonlyArray<SpeedOption>;
	defaultSessionSize?: SessionSize;
	/** Skip the config phase, build the deck, and jump straight to "active" on mount. */
	autoStart?: boolean;
	/** Override the default per-attempt logger (e.g. route through useDrillSession). */
	logAttemptFn?: (input: LogAttemptInput) => void;
	/** Called once when the drill enters the "complete" phase. */
	onComplete?: (stats: SessionStats<T>) => void;
}) => {
	const defaultLogAttemptFn = useLogDrillAttempt(drillId);
	const logAttemptFn = logAttemptFnOverride ?? defaultLogAttemptFn;

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

	const currentForm = deck[cardIndex];

	const recordAttempt = (
		isCorrect: boolean,
		timeTaken: number,
		logData: DrillLogData,
		timedOut = false,
	) => {
		if (!currentForm) return;
		const attempt: Attempt<T> = { form: currentForm, isCorrect, timeTaken, timedOut, userInput: logData.userAnswer };
		setLastAttempt(attempt);
		setAttempts((prev) => [...prev, attempt]);
		setPhase("feedback");
		logAttemptFn({
			...logData,
			isCorrect,
			timeTaken,
			vocabularyId: currentForm.vocabularyId,
		});
	};

	const startDrill = () => {
		const source = activeCategory
			? items.filter((i) => (i as T & { category?: string }).category === activeCategory)
			: items;
		setDeck(buildDeck(source, sessionSize));
		setCardIndex(0);
		setInput("");
		inputValueRef.current = "";
		setAttempts([]);
		setLastAttempt(null);
		setPhase("active");
	};

	const startedRef = useRef(false);
	useEffect(() => {
		if (autoStart && !startedRef.current && items.length > 0) {
			startedRef.current = true;
			startDrill();
		}
	});

	useEffect(() => {
		if (phase !== "complete" || !onComplete) return;
		const correct = attempts.filter((a) => a.isCorrect).length;
		onComplete({ total: attempts.length, correct, attempts });
		// Run once per transition to "complete".
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [phase]);

	const advance = useAutoAdvance({
		phase,
		lastAttempt,
		cardIndex,
		sessionSize,
		mode,
		setPhase,
		setCardIndex,
		setInput,
		inputValueRef,
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
		startDrill,
		recordAttempt,
		advance,
	};
};
