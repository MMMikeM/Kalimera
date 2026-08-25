import { beforeEach, describe, expect, it, vi } from "vitest";

import type { DrillForm } from "./deck";
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
			drillActions.recordAttempt(false, 1000, log(i));
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
			drillActions.recordAttempt(isCorrect, 1000, {
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
			drillActions.recordAttempt(true, 500, log(i));
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
