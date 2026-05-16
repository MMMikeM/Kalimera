import { create } from "zustand";

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

export interface DrillSessionCallbacks {
	startSession: (params: {
		userId: number;
		sessionType: string;
		category?: string;
		wordTypeFilter?: string;
	}) => Promise<number | null>;
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

// ─── Pure state ───────────────────────────────────────────────────────────────

interface DrillState {
	drillId: string;
	allItems: DrillForm[];
	speeds: readonly SpeedOption[];
	sessionType: string;
	dbCategory?: string;
	wordTypeFilter?: string;
	userId: number;
	onComplete?: (stats: SessionStats<DrillForm>) => void;
	sessionCallbacks?: DrillSessionCallbacks;

	phase: Phase;
	mode: DrillMode;
	sessionSize: SessionSize;
	activeCategory: string | null;
	activeSpeedId: string;

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

const drillStore = create<DrillState>()(() => ({
	drillId: "",
	allItems: [],
	speeds: SPEEDS,
	sessionType: "case_drill",
	dbCategory: undefined,
	wordTypeFilter: undefined,
	userId: 0,
	onComplete: undefined,
	sessionCallbacks: undefined,

	phase: "config",
	mode: "forward",
	sessionSize: 10,
	activeCategory: null,
	activeSpeedId: SPEEDS[1]?.id ?? SPEEDS[0]?.id ?? "",

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

export const useDrillStore = drillStore;

// ─── Actions ──────────────────────────────────────────────────────────────────

type DrillActions = {
	initialize: (config: DrillStoreConfig) => void;
	getCurrentForm: () => DrillForm | undefined;
	getEffectiveTimeLimit: () => number;
	setMode: (mode: DrillMode) => void;
	setSessionSize: (sessionSize: SessionSize) => void;
	setActiveCategory: (activeCategory: string | null) => void;
	setActiveSpeedId: (activeSpeedId: string) => void;
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

const s = () => drillStore.getState();
const set = drillStore.setState;

export const drillActions: DrillActions = {
	initialize: (config) => {
		const speeds = config.speeds ?? SPEEDS;
		set({
			drillId: config.drillId,
			allItems: config.items,
			speeds,
			sessionType: config.sessionType ?? "case_drill",
			dbCategory: config.dbCategory,
			wordTypeFilter: config.wordTypeFilter,
			userId: config.userId,
			onComplete: config.onComplete,
			sessionCallbacks: config.sessionCallbacks,
			sessionSize: config.defaultSessionSize ?? 10,
			phase: "config",
			mode: "forward",
			activeCategory: null,
			activeSpeedId: speeds[1]?.id ?? speeds[0]?.id ?? "",
			deck: [],
			cardIndex: 0,
			input: "",
			attempts: [],
			lastAttempt: null,
			sessionId: null,
			isReDrill: false,
			firstPresented: {},
			remediationCounts: {},
		});
	},
	getCurrentForm: () => {
		const { deck, cardIndex } = s();
		return deck[cardIndex];
	},
	getEffectiveTimeLimit: () => {
		const { speeds, activeSpeedId } = s();
		return speeds.find((sp) => sp.id === activeSpeedId)?.timeLimit ?? MEDIUM_SPEED_MS;
	},
	setMode: (mode) => set({ mode }),
	setSessionSize: (sessionSize) => set({ sessionSize }),
	setActiveCategory: (activeCategory) => set({ activeCategory }),
	setActiveSpeedId: (activeSpeedId) => set({ activeSpeedId }),
	setInput: (input) => set({ input }),
	startDrill: () => {
		const {
			allItems,
			activeCategory,
			sessionSize,
			sessionType,
			dbCategory,
			wordTypeFilter,
			userId,
			sessionCallbacks,
		} = s();
		const source = activeCategory
			? allItems.filter((i) => (i as DrillForm & { category?: string }).category === activeCategory)
			: allItems;
		set({
			deck: buildDeck(source, sessionSize),
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
				.startSession({ userId, sessionType, category: dbCategory, wordTypeFilter })
				.then((id) => {
					if (id) set({ sessionId: id });
				})
				.catch(() => {});
		}
	},
	recordAttempt: (isCorrect, timeTaken, log, timedOut = false) => {
		const { deck, cardIndex, sessionSize, userId, drillId, sessionId, isReDrill, sessionCallbacks, firstPresented, remediationCounts } = s();
		const currentForm = deck[cardIndex];
		if (!currentForm) return;
		const attempt: Attempt<DrillForm> = {
			form: currentForm,
			isCorrect,
			timeTaken,
			timedOut,
			userInput: log.userAnswer,
		};

		// Remediation: on wrong answer, re-insert within session (max 3 times per word)
		const isFirstTry = !firstPresented[currentForm.id];
		const remCount = remediationCounts[currentForm.id] ?? 0;
		if (!isCorrect && remCount < 3) {
			const insertAt = Math.min(cardIndex + 5, sessionSize - 1);
			const newDeck = [...deck];
			newDeck.splice(insertAt, 0, currentForm);
			drillStore.setState((prev) => ({
				deck: newDeck,
				firstPresented: { ...prev.firstPresented, [currentForm.id]: true },
				remediationCounts: { ...prev.remediationCounts, [currentForm.id]: remCount + 1 },
				lastAttempt: attempt,
				attempts: [...prev.attempts, attempt],
				phase: "feedback",
			}));
		} else {
			drillStore.setState((prev) => ({
				firstPresented: { ...prev.firstPresented, [currentForm.id]: true },
				lastAttempt: attempt,
				attempts: [...prev.attempts, attempt],
				phase: "feedback",
			}));
		}
		void isFirstTry; // tracked in firstPresented above
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
		const {
			cardIndex,
			sessionSize,
			sessionId,
			userId,
			isReDrill,
			onComplete,
			sessionCallbacks,
			attempts,
		} = s();
		const next = cardIndex + 1;
		if (next >= sessionSize) {
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
			cardIndex: 0,
			input: "",
			attempts: [],
			lastAttempt: null,
			phase: "active",
			isReDrill: true,
			sessionId: null,
		}),
};
