import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { DrillForm, SessionSize } from "./deck";
import { drillActions, useDrillStore } from "./drill-store";

const form = (id: string): DrillForm => ({
	id,
	greek: `greek-${id}`,
	label: `label-${id}`,
	bucket: "inProgress",
});

const makeCallbacks = () => ({
	startSession: vi.fn().mockResolvedValue(42),
	recordAttempt: vi.fn(),
	completeSession: vi.fn(),
});

function setup(sessionSize = 10, extraForms = 0) {
	const items = Array.from({ length: sessionSize + extraForms }, (_, i) => form(`w${i}`));
	const callbacks = makeCallbacks();
	drillActions.initialize({
		drillId: "test-drill",
		items,
		userId: 1,
		sessionSize: sessionSize as 10 | 20 | 30,
		sessionCallbacks: callbacks,
	});
	drillActions.startDrill();
	return callbacks;
}

async function flushMicrotasks() {
	await new Promise((r) => setTimeout(r, 0));
}

const log = (i: number) => ({ prompt: `q${i}`, correctAnswer: "greek", userAnswer: "" });

// ─── Session cap ──────────────────────────────────────────────────────────────

describe("session cap", () => {
	beforeEach(() => {
		drillActions.initialize({
			drillId: "",
			items: [],
			userId: 0,
		});
	});

	it("completes after sessionSize attempts even when wrong answers grow the deck via remediation", async () => {
		setup(10);
		await flushMicrotasks();

		// Answer all wrong — remediation splices each card back into the deck,
		// growing it past 10. Without the cap the session would run > 10 questions.
		for (let i = 0; i < 10; i++) {
			drillActions.recordAttempt(false, log(i));
			drillActions.advance();
		}

		const state = useDrillStore.getState();
		expect(state.phase).toBe("complete");
		expect(state.attempts).toHaveLength(10);
		// Deck should have grown beyond 10 due to remediation — proving the cap fired
		expect(state.deck.length).toBeGreaterThan(10);
	});

	it("calls completeSession with accurate correct/total counts", async () => {
		const callbacks = setup(10);
		await flushMicrotasks();

		for (let i = 0; i < 10; i++) {
			const isCorrect = i % 2 === 0; // 5 correct, 5 wrong
			drillActions.recordAttempt(isCorrect, {
				prompt: `q${i}`,
				correctAnswer: "greek",
				userAnswer: isCorrect ? "greek" : "",
			});
			drillActions.advance();
		}

		expect(useDrillStore.getState().phase).toBe("complete");
		expect(callbacks.completeSession).toHaveBeenCalledOnce();
		expect(callbacks.completeSession).toHaveBeenCalledWith({
			sessionId: 42,
			totalQuestions: 10,
			correctAnswers: 5,
		});
	});

	it("still completes normally when all answers are correct (no remediation)", async () => {
		setup(10);
		await flushMicrotasks();

		for (let i = 0; i < 10; i++) {
			drillActions.recordAttempt(true, log(i));
			drillActions.advance();
		}

		expect(useDrillStore.getState().phase).toBe("complete");
		expect(useDrillStore.getState().attempts).toHaveLength(10);
	});
});

// ─── Default mode ─────────────────────────────────────────────────────────────

describe("defaultMode", () => {
	it("starts in forward mode when no defaultMode is given", () => {
		drillActions.initialize({ drillId: "d", items: [form("w0")], userId: 0 });
		expect(useDrillStore.getState().mode).toBe("forward");
	});

	it("starts in the configured defaultMode", () => {
		drillActions.initialize({
			drillId: "d",
			items: [form("w0")],
			userId: 0,
			defaultMode: "reverse",
		});
		expect(useDrillStore.getState().mode).toBe("reverse");
	});
});

// ─── Phrase-scaled time limit ─────────────────────────────────────────────────

describe("getEffectiveTimeLimit", () => {
	const phraseForm: DrillForm = {
		id: "phrase",
		greek: "ο πατέρας του παιδιού",
		label: "the child's father",
		bucket: "inProgress",
	};

	const initWith = (defaultMode?: "forward" | "reverse") => {
		drillActions.initialize({
			drillId: "d",
			items: [phraseForm],
			userId: 0,
			sessionSize: 10,
			defaultMode,
		});
		drillActions.startDrill();
	};

	it("scales the forward-mode limit with the word count of the current card", () => {
		initWith();
		// medium base 6000ms, 4 words → 6000 × (1 + 0.35 × 3) = 12300
		expect(drillActions.getEffectiveTimeLimit()).toBe(12300);
	});

	it("leaves single-word forward cards at the base limit", () => {
		drillActions.initialize({
			drillId: "d",
			items: [form("w0")],
			userId: 0,
			sessionSize: 10,
		});
		drillActions.startDrill();
		expect(drillActions.getEffectiveTimeLimit()).toBe(6000);
	});

	it("does not scale in reverse mode", () => {
		initWith("reverse");
		expect(drillActions.getEffectiveTimeLimit()).toBe(6000);
	});
});

// ─── Card timing ──────────────────────────────────────────────────────────────

describe("card timing", () => {
	const now = vi.spyOn(performance, "now");
	afterEach(() => now.mockReset());

	const lastTime = () => useDrillStore.getState().attempts.at(-1)?.timeTaken;

	it("times each answer from when its card became active", () => {
		now.mockReturnValue(1000);
		setup(10);
		now.mockReturnValue(3500);
		drillActions.recordAttempt(true, log(0));
		expect(lastTime()).toBe(2500);

		now.mockReturnValue(4000);
		drillActions.advance();
		now.mockReturnValue(4700);
		drillActions.recordAttempt(false, log(1));
		expect(lastTime()).toBe(700);
	});

	it("records a timeout as the full time limit", () => {
		now.mockReturnValue(0);
		setup(10);
		now.mockReturnValue(99_999);
		drillActions.recordAttempt(false, log(0), true);
		expect(lastTime()).toBe(drillActions.getEffectiveTimeLimit());
	});

	it("restarts the clock for a retry of mistakes", () => {
		now.mockReturnValue(0);
		setup(10);
		drillActions.recordAttempt(false, log(0));
		const mistakes = useDrillStore.getState().attempts;
		now.mockReturnValue(10_000);
		drillActions.retryMistakes(mistakes);
		now.mockReturnValue(10_300);
		drillActions.recordAttempt(true, log(0));
		expect(lastTime()).toBe(300);
	});
});

// ─── Remediation and pruning ──────────────────────────────────────────────────

describe("remediation", () => {
	/** A known deck, bypassing the shuffle in buildWeightedDeck. */
	const startWithDeck = (
		ids: string[],
		uniquePoolSize = new Set(ids).size,
		sessionSize: SessionSize = 10,
	) => {
		drillActions.initialize({ drillId: "d", items: ids.map(form), userId: 0, sessionSize });
		drillActions.startDrill();
		useDrillStore.setState({ deck: ids.map(form), cardIndex: 0, uniquePoolSize });
	};
	const deckIds = () => useDrillStore.getState().deck.map((f) => f.id);
	const currentId = () => {
		const { deck, cardIndex } = useDrillStore.getState();
		return deck[cardIndex]?.id;
	};
	const answer = (isCorrect: boolean) => {
		drillActions.recordAttempt(isCorrect, log(0));
		drillActions.advance();
	};

	it("re-inserts a missed card five places ahead", () => {
		startWithDeck(["a", "b", "c", "d", "e", "f", "g", "h"]);
		answer(false);
		expect(deckIds()).toEqual(["a", "b", "c", "d", "e", "a", "f", "g", "h"]);
		expect(useDrillStore.getState().remediationCounts).toEqual({ a: 1 });
	});

	it("re-inserts at the end when fewer than five cards remain", () => {
		startWithDeck(["a", "b", "c", "d"]);
		answer(false);
		expect(deckIds()).toEqual(["a", "b", "c", "d", "a"]);
	});

	it("skips remediation when there is no room to space the repeat", () => {
		startWithDeck(["a", "b"]);
		answer(false);
		expect(deckIds()).toEqual(["a", "b"]);
		expect(useDrillStore.getState().remediationCounts).toEqual({});
	});

	it("re-inserts a word at most three times", () => {
		const ids = Array.from({ length: 30 }, (_, i) => (i % 2 === 0 ? "a" : `w${i}`));
		startWithDeck(ids, 16, 30);
		for (let miss = 0; miss < 4; miss++) {
			while (currentId() !== "a") answer(true);
			answer(false);
		}
		expect(useDrillStore.getState().remediationCounts.a).toBe(3);
	});

	it("drops later re-intros of a word answered right first time when the pool is large", () => {
		startWithDeck(["a", "b", "a", "c"], 10, 10);
		answer(true);
		expect(deckIds()).toEqual(["a", "b", "c"]);
	});

	it("keeps re-intros when the pool is smaller than the session", () => {
		startWithDeck(["a", "b", "a", "c"], 3, 10);
		answer(true);
		expect(deckIds()).toEqual(["a", "b", "a", "c"]);
	});

	it("keeps re-intros of a word that has already been seen", () => {
		startWithDeck(["a", "b", "c", "d", "e", "f", "g", "h"], 10, 10);
		answer(false);
		while (currentId() !== "a") answer(true);
		useDrillStore.setState({ deck: [...useDrillStore.getState().deck, form("a")] });
		answer(true);
		expect(deckIds().filter((id) => id === "a")).toHaveLength(3);
	});
});
