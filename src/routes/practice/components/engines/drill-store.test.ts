import { beforeEach, describe, expect, it, vi } from "vitest";

import type { DrillForm } from "./deck";
import { drillActions, useDrillStore } from "./drill-store";

const form = (id: string): DrillForm => ({
	id,
	greek: `greek-${id}`,
	greeklish: id,
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
