import { useRef, useState } from "react";

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

interface DrillLogData {
	prompt: string;
	correctAnswer: string;
	userAnswer: string;
	weakAreaIdentifier?: string;
	vocabularyId?: number;
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
	defaultSessionSize = 10,
}: {
	items: T[];
	drillId: string;
	speeds?: ReadonlyArray<SpeedOption>;
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

	const currentForm = deck[cardIndex];

	const recordAttempt = (
		isCorrect: boolean,
		timeTaken: number,
		logData: DrillLogData,
		timedOut = false,
	) => {
		if (!currentForm) return;
		const attempt: Attempt<T> = { form: currentForm, isCorrect, timeTaken, timedOut };
		setLastAttempt(attempt);
		setAttempts((prev) => [...prev, attempt]);
		setPhase("feedback");
		logAttemptFn({ ...logData, isCorrect, timeTaken });
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
