import { create } from "zustand";

import { SPEEDMAP, type SpeedId } from "../drill-speeds";
import {
	buildWeightedDeck,
	type Attempt,
	type DrillForm,
	type DrillMode,
	type Phase,
	type SessionSize,
} from "./deck";

export interface SessionStats<F extends DrillForm> {
	total: number;
	correct: number;
	attempts: Attempt<F>[];
}

interface LogPayload {
	prompt: string;
	correctAnswer: string;
	userAnswer: string;
}

export interface DrillSessionCallbacks {
	startSession: (params: { userId: number }) => Promise<number | null>;
	recordAttempt: (params: {
		userId: number;
		sessionId?: number;
		drillId: string;
		prompt: string;
		correctAnswer: string;
		userAnswer: string;
		isCorrect: boolean;
		timeTaken: number;
		vocabId?: number;
	}) => void;
	completeSession: (params: {
		sessionId: number;
		totalQuestions: number;
		correctAnswers: number;
	}) => void;
}

export interface DrillStoreConfig {
	drillId: string;
	items: DrillForm[];
	userId: number;
	sessionSize?: SessionSize;
	onComplete?: (stats: SessionStats<DrillForm>) => void;
	sessionCallbacks?: DrillSessionCallbacks;
}

// ─── Pure state ───────────────────────────────────────────────────────────────

interface DrillState {
	drillId: string;
	items: DrillForm[];
	userId: number;
	onComplete?: (stats: SessionStats<DrillForm>) => void;
	sessionCallbacks?: DrillSessionCallbacks;

	phase: Phase;
	mode: DrillMode;
	sessionSize: 10 | 20 | 30 | number;
	activeCategory: string | null;
	activeSpeedId: SpeedId;

	deck: DrillForm[];
	cardIndex: number;
	input: string;
	attempts: Attempt<DrillForm>[];
	lastAttempt: Attempt<DrillForm> | null;

	sessionId: number | null;
	isReDrill: boolean;

	// Remediation tracking
	firstPresented: Record<string, boolean>; // wordId → presented at least once this session
	remediationCounts: Record<string, number>; // wordId → times re-inserted
}

export const useDrillStore = create<DrillState>()(() => ({
	drillId: "",
	items: [],
	userId: 0,
	onComplete: undefined,
	sessionCallbacks: undefined,

	phase: "config",
	mode: "forward",
	sessionSize: 10,
	activeCategory: null,
	activeSpeedId: "medium",

	deck: [],
	cardIndex: 0,
	input: "",
	attempts: [],
	lastAttempt: null,
	sessionId: null,
	isReDrill: false,
	firstPresented: {},
	remediationCounts: {},
}));

// ─── Actions ──────────────────────────────────────────────────────────────────

type DrillActions = {
	initialize: (config: DrillStoreConfig) => void;
	getCurrentForm: () => DrillForm | undefined;
	getEffectiveTimeLimit: () => number;
	setMode: (mode: DrillMode) => void;
	setSessionSize: (sessionSize: SessionSize | number) => void;
	setActiveCategory: (activeCategory: string | null) => void;
	setActiveSpeedId: (activeSpeedId: SpeedId) => void;
	setInput: (input: string) => void;
	startDrill: () => void;
	recordAttempt: (
		isCorrect: boolean,
		timeTaken: number,
		log: LogPayload,
		timedOut?: boolean,
	) => void;
	advance: () => void;
	resetToConfig: () => void;
	retryMistakes: (mistakes: Attempt<DrillForm>[]) => void;
};

const s = () => useDrillStore.getState();
const set = useDrillStore.setState;

export const drillActions: DrillActions = {
	initialize: ({ sessionSize = 10, ...config }) => {
		set({
			...useDrillStore.getInitialState(),
			...config,
			sessionSize,
		});
	},
	getCurrentForm: () => {
		const { deck, cardIndex } = s();
		return deck[cardIndex];
	},
	getEffectiveTimeLimit: () => {
		const { activeSpeedId } = s();
		return SPEEDMAP[activeSpeedId].timeLimit;
	},
	setMode: (mode) => set({ mode }),
	setSessionSize: (sessionSize) => set({ sessionSize }),
	setActiveCategory: (activeCategory) => set({ activeCategory }),
	setActiveSpeedId: (activeSpeedId) => set({ activeSpeedId }),
	setInput: (input) => set({ input }),
	startDrill: () => {
		const { items, activeCategory, sessionSize, userId, sessionCallbacks } = s();
		const source = activeCategory
			? items.filter((i) => (i as DrillForm & { category?: string }).category === activeCategory)
			: items;
		set({
			deck: buildWeightedDeck(source, sessionSize),
			cardIndex: 0,
			input: "",
			attempts: [],
			lastAttempt: null,
			phase: "active",
			sessionId: null,
			isReDrill: false,
			firstPresented: {},
			remediationCounts: {},
		});
		if (userId && sessionCallbacks) {
			sessionCallbacks
				.startSession({ userId })
				.then((id) => {
					if (id) set({ sessionId: id });
				})
				.catch(() => {});
		}
	},
	recordAttempt: (isCorrect, timeTaken, log, timedOut = false) => {
		const {
			deck,
			cardIndex,
			sessionSize,
			userId,
			drillId,
			sessionId,
			isReDrill,
			sessionCallbacks,
			remediationCounts,
			firstPresented,
		} = s();
		const currentForm = deck[cardIndex];
		if (!currentForm) return;
		const attempt: Attempt<DrillForm> = {
			form: currentForm,
			isCorrect,
			timeTaken,
			timedOut,
			userInput: log.userAnswer,
		};

		// Remediation: on wrong answer, re-insert within session (max 3 times per word).
		// Skip if no room to space it at least 2 positions ahead — avoids back-to-back repeats near end.
		const remCount = remediationCounts[currentForm.id] ?? 0;
		const alreadySeen = firstPresented[currentForm.id] ?? false;

		if (!isCorrect && remCount < 3 && cardIndex + 2 <= sessionSize - 1) {
			const insertAt = Math.min(cardIndex + 5, sessionSize - 1);
			const newDeck = [...deck];
			newDeck.splice(insertAt, 0, currentForm);
			set((prev) => ({
				deck: newDeck,
				firstPresented: { ...prev.firstPresented, [currentForm.id]: true },
				remediationCounts: { ...prev.remediationCounts, [currentForm.id]: remCount + 1 },
				lastAttempt: attempt,
				attempts: [...prev.attempts, attempt],
				phase: "feedback",
			}));
		} else {
			// On first correct answer, drop any future duplicates of this card (e.g. new-word
			// re-introductions from buildWeightedDeck). If you got it right, you don't need
			// to see it again this session.
			const prunedDeck =
				isCorrect && !alreadySeen
					? deck.filter((card, idx) => idx <= cardIndex || card.id !== currentForm.id)
					: deck;
			set((prev) => ({
				deck: prunedDeck,
				firstPresented: { ...prev.firstPresented, [currentForm.id]: true },
				lastAttempt: attempt,
				attempts: [...prev.attempts, attempt],
				phase: "feedback",
			}));
		}
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
				vocabId: currentForm.vocabId,
			});
		}
	},

	advance: () => {
		const {
			cardIndex,
			deck,
			sessionId,
			userId,
			isReDrill,
			onComplete,
			sessionCallbacks,
			attempts,
		} = s();
		const next = cardIndex + 1;
		if (next >= deck.length) {
			set({ phase: "complete" });
			if (!isReDrill && sessionId && userId && sessionCallbacks) {
				sessionCallbacks.completeSession({
					sessionId,
					totalQuestions: attempts.length,
					correctAnswers: attempts.filter((a) => a.isCorrect).length,
				});
			}
			onComplete?.({
				total: attempts.length,
				correct: attempts.filter((a) => a.isCorrect).length,
				attempts,
			});
			return;
		}
		set({ cardIndex: next, input: "", phase: "active" });
	},

	resetToConfig: () =>
		set({
			phase: "config",
			deck: [],
			cardIndex: 0,
			input: "",
			attempts: [],
			lastAttempt: null,
			sessionId: null,
			isReDrill: false,
			firstPresented: {},
			remediationCounts: {},
		}),

	retryMistakes: (mistakes) =>
		set({
			deck: mistakes.map((m) => m.form),
			sessionSize: mistakes.length,
			cardIndex: 0,
			input: "",
			attempts: [],
			lastAttempt: null,
			phase: "active",
			isReDrill: true,
			sessionId: null,
		}),
};
