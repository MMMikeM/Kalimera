import { createStore } from "zustand/vanilla";

import { MEDIUM_SPEED_MS, SPEEDS } from "../drill-speeds";
import {
	buildDeck,
	type Attempt,
	type DrillForm,
	type DrillMode,
	type Phase,
	type SessionSize,
} from "./deck";

export interface SpeedOption {
	id: string;
	label: string;
	timeLimit: number;
}

export interface SessionStats<F extends DrillForm> {
	total: number;
	correct: number;
	attempts: Attempt<F>[];
}

interface LogPayload {
	prompt: string;
	correctAnswer: string;
	userAnswer: string;
	weakAreaIdentifier?: string;
	weakAreaType?: string;
	skillType?: string;
	vocabularyId?: number;
}

// Session lifecycle callbacks — injected by DrillProvider from srs-loader
// Keeps server fn imports out of this file (prevents node:async_hooks leaking to client)
export interface DrillSessionCallbacks {
	startSession: (params: {
		userId: number;
		sessionType: string;
		category?: string;
		wordTypeFilter?: string;
	}) => Promise<number | null>; // returns sessionId
	recordAttempt: (params: {
		userId: number;
		sessionId?: number;
		drillId: string;
		prompt: string;
		correctAnswer: string;
		userAnswer: string;
		isCorrect: boolean;
		timeTaken: number;
		skillType: "recognition" | "production";
		vocabularyId?: number;
		weakAreaType?: "case" | "gender" | "verb_family";
		weakAreaIdentifier?: string;
	}) => void;
	completeSession: (params: {
		sessionId: number;
		totalQuestions: number;
		correctAnswers: number;
	}) => void;
}

export interface DrillState {
	// immutable config
	drillId: string;
	allItems: DrillForm[];
	speeds: readonly SpeedOption[];
	sessionType: string;
	dbCategory?: string;
	wordTypeFilter?: string;
	userId: number;
	onComplete?: (stats: SessionStats<DrillForm>) => void;
	sessionCallbacks?: DrillSessionCallbacks;

	// ui
	phase: Phase;
	mode: DrillMode;
	sessionSize: SessionSize;
	activeCategory: string | null;
	activeSpeedId: string;

	// deck
	deck: DrillForm[];
	cardIndex: number;
	input: string;
	attempts: Attempt<DrillForm>[];
	lastAttempt: Attempt<DrillForm> | null;

	// db session
	sessionId: number | null;
	isReDrill: boolean;

	// actions
	setMode: (m: DrillMode) => void;
	setSessionSize: (n: SessionSize) => void;
	setActiveCategory: (id: string | null) => void;
	setActiveSpeedId: (id: string) => void;
	setInput: (s: string) => void;
	startDrill: () => void;
	recordAttempt: (isCorrect: boolean, timeTaken: number, log: LogPayload, timedOut?: boolean) => void;
	advance: () => void;
	resetToConfig: () => void;
	retryMistakes: (mistakes: Attempt<DrillForm>[]) => void;

	// derived (read via getState, not subscribed)
	getCurrentForm: () => DrillForm | undefined;
	getEffectiveTimeLimit: () => number;
}

export interface DrillStoreConfig {
	drillId: string;
	items: DrillForm[];
	speeds?: readonly SpeedOption[];
	sessionType?: string;
	dbCategory?: string;
	wordTypeFilter?: string;
	userId: number;
	defaultSessionSize?: SessionSize;
	onComplete?: (stats: SessionStats<DrillForm>) => void;
	sessionCallbacks?: DrillSessionCallbacks;
}

export const createDrillStore = ({
	drillId,
	items,
	speeds = SPEEDS,
	sessionType = "case_drill",
	dbCategory,
	wordTypeFilter,
	userId,
	defaultSessionSize = 10,
	onComplete,
	sessionCallbacks,
}: DrillStoreConfig) =>
	createStore<DrillState>()((set, get) => ({
		drillId,
		allItems: items,
		speeds,
		sessionType,
		dbCategory,
		wordTypeFilter,
		userId,
		onComplete,
		sessionCallbacks,

		phase: "config",
		mode: "forward",
		sessionSize: defaultSessionSize,
		activeCategory: null,
		activeSpeedId: speeds[1]?.id ?? speeds[0]?.id ?? "",

		deck: [],
		cardIndex: 0,
		input: "",
		attempts: [],
		lastAttempt: null,
		sessionId: null,
		isReDrill: false,

		getCurrentForm: () => {
			const { deck, cardIndex } = get();
			return deck[cardIndex];
		},

		getEffectiveTimeLimit: () => {
			const { speeds, activeSpeedId } = get();
			return speeds.find((s) => s.id === activeSpeedId)?.timeLimit ?? MEDIUM_SPEED_MS;
		},

		setMode: (mode) => set({ mode }),
		setSessionSize: (sessionSize) => set({ sessionSize }),
		setActiveCategory: (activeCategory) => set({ activeCategory }),
		setActiveSpeedId: (activeSpeedId) => set({ activeSpeedId }),
		setInput: (input) => set({ input }),

		startDrill: () => {
			const { allItems, activeCategory, sessionSize, sessionType, dbCategory, wordTypeFilter, userId, sessionCallbacks } = get();
			const source = activeCategory
				? allItems.filter(
						(i) => (i as DrillForm & { category?: string }).category === activeCategory,
					)
				: allItems;
			const deck = buildDeck(source, sessionSize);
			set({
				deck,
				cardIndex: 0,
				input: "",
				attempts: [],
				lastAttempt: null,
				phase: "active",
				sessionId: null,
				isReDrill: false,
			});

			if (userId && sessionCallbacks) {
				sessionCallbacks
					.startSession({ userId, sessionType, category: dbCategory, wordTypeFilter })
					.then((id) => { if (id) set({ sessionId: id }); })
					.catch(() => {});
			}
		},

		recordAttempt: (isCorrect, timeTaken, log, timedOut = false) => {
			const { getCurrentForm, userId, drillId, sessionId, isReDrill, sessionCallbacks } = get();
			const currentForm = getCurrentForm();
			if (!currentForm) return;

			const attempt: Attempt<DrillForm> = {
				form: currentForm,
				isCorrect,
				timeTaken,
				timedOut,
				userInput: log.userAnswer,
			};
			set((s) => ({
				lastAttempt: attempt,
				attempts: [...s.attempts, attempt],
				phase: "feedback",
				input: "",
			}));

			if (userId && !isReDrill && sessionCallbacks) {
				sessionCallbacks.recordAttempt({
					userId,
					sessionId: sessionId ?? undefined,
					drillId,
					prompt: log.prompt,
					correctAnswer: log.correctAnswer,
					userAnswer: log.userAnswer,
					isCorrect,
					timeTaken: Math.round(timeTaken),
					skillType: (log.skillType ?? "production") as "recognition" | "production",
					vocabularyId: log.vocabularyId,
					weakAreaType: log.weakAreaType as "case" | "gender" | "verb_family" | undefined,
					weakAreaIdentifier: log.weakAreaIdentifier,
				});
			}
		},

		advance: () => {
			const { cardIndex, sessionSize, sessionId, userId, isReDrill, onComplete, sessionCallbacks } = get();
			const next = cardIndex + 1;
			if (next >= sessionSize) {
				set({ phase: "complete" });
				const atts = get().attempts;
				if (!isReDrill && sessionId && userId && sessionCallbacks) {
					sessionCallbacks.completeSession({
						sessionId,
						totalQuestions: atts.length,
						correctAnswers: atts.filter((a) => a.isCorrect).length,
					});
				}
				onComplete?.({
					total: atts.length,
					correct: atts.filter((a) => a.isCorrect).length,
					attempts: atts,
				});
				return;
			}
			set({ cardIndex: next, input: "", phase: "active" });
		},

		resetToConfig: () => {
			set({
				phase: "config",
				deck: [],
				cardIndex: 0,
				input: "",
				attempts: [],
				lastAttempt: null,
				sessionId: null,
				isReDrill: false,
			});
		},

		retryMistakes: (mistakes) => {
			set({
				deck: mistakes.map((m) => m.form),
				cardIndex: 0,
				input: "",
				attempts: [],
				lastAttempt: null,
				phase: "active",
				isReDrill: true,
				sessionId: null,
			});
		},
	}));

export type DrillStore = ReturnType<typeof createDrillStore>;
