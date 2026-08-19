import { describe, expect, it, vi } from "vitest";

import { isTransportFailure, withReadRetry } from "./retry";

describe("isTransportFailure", () => {
	it.each([
		"fetch failed",
		"read ECONNRESET",
		"other side closed",
		"HTTP error! status: 503",
		"UND_ERR_SOCKET",
	])("recognises %s", (message) => {
		expect(isTransportFailure(new Error(message))).toBe(true);
	});

	it.each(["no such column: foo", "UNIQUE constraint failed", "HTTP error! status: 401"])(
		"leaves %s alone",
		(message) => {
			expect(isTransportFailure(new Error(message))).toBe(false);
		},
	);

	it("unwraps the cause chain Drizzle wraps around driver errors", () => {
		const wrapped = new Error("Failed query: select 1", { cause: new Error("fetch failed") });
		expect(isTransportFailure(wrapped)).toBe(true);
	});

	it("survives a cause cycle", () => {
		const a = new Error("outer");
		a.cause = a;
		expect(isTransportFailure(a)).toBe(false);
	});
});

const clientWith = (all: () => Promise<unknown>) => ({
	prepare: async (_sql: string) => ({ raw: () => ({ all }), run: all }),
	all,
});

describe("withReadRetry", () => {
	it("retries a read once through prepare().raw().all()", async () => {
		const all = vi
			.fn()
			.mockRejectedValueOnce(new Error("fetch failed"))
			.mockResolvedValue([{ id: 1 }]);
		const client = withReadRetry(clientWith(all));

		const stmt = await client.prepare("select 1");
		expect(await stmt.raw().all()).toEqual([{ id: 1 }]);
		expect(all).toHaveBeenCalledTimes(2);
	});

	it("retries exactly once, then gives up", async () => {
		const all = vi.fn().mockRejectedValue(new Error("fetch failed"));
		const client = withReadRetry(clientWith(all));

		await expect(client.all()).rejects.toThrow("fetch failed");
		expect(all).toHaveBeenCalledTimes(2);
	});

	it("does not retry a SQL error", async () => {
		const all = vi.fn().mockRejectedValue(new Error("no such column: foo"));
		const client = withReadRetry(clientWith(all));

		await expect(client.all()).rejects.toThrow("no such column");
		expect(all).toHaveBeenCalledTimes(1);
	});

	it("does not retry a write, which may already have applied", async () => {
		const run = vi.fn().mockRejectedValue(new Error("fetch failed"));
		const client = withReadRetry(clientWith(run));

		const stmt = await client.prepare("insert into t values (1)");
		await expect(stmt.run()).rejects.toThrow("fetch failed");
		expect(run).toHaveBeenCalledTimes(1);
	});
});
