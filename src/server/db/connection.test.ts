import { Session } from "@tursodatabase/serverless";
import { afterEach, describe, expect, it, vi } from "vite-plus/test";

import {
	OneTripConnection,
	RetryingConnection,
	isTransportFailure,
	retryOnce,
	retryableFor,
} from "./connection";

afterEach(() => vi.restoreAllMocks());

describe("isTransportFailure", () => {
	it.each([
		"fetch failed",
		"read ECONNRESET",
		"other side closed",
		"HTTP error! status: 503",
		"HTTP error! status: 400",
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

describe("retryableFor", () => {
	const lostInTransit = new Error("fetch failed");
	const expired = new Error("stream has expired");

	it("replays a SELECT after a transport failure or an expired session", () => {
		expect(retryableFor("select 1")(lostInTransit)).toBe(true);
		expect(retryableFor("  SELECT 1")(expired)).toBe(true);
	});

	it("never replays a write lost in transit, RETURNING included, which may already have applied", () => {
		expect(retryableFor("insert into t values (1) returning id")(lostInTransit)).toBe(false);
		expect(retryableFor("update t set a = 1")(lostInTransit)).toBe(false);
	});

	it("replays a write the server refused for an expired session, which never ran", () => {
		expect(retryableFor("insert into t values (1)")(expired)).toBe(true);
	});
});

describe("retryOnce", () => {
	it("retries exactly once, then gives up", async () => {
		const call = vi.fn().mockRejectedValue(new Error("fetch failed"));
		await expect(retryOnce(call, retryableFor("select 1"))).rejects.toThrow("fetch failed");
		expect(call).toHaveBeenCalledTimes(2);
	});

	it("does not retry a SQL error", async () => {
		const call = vi.fn().mockRejectedValue(new Error("no such column: foo"));
		await expect(retryOnce(call, retryableFor("select foo"))).rejects.toThrow("no such column");
		expect(call).toHaveBeenCalledTimes(1);
	});
});

const config = { url: "http://localhost:1" };
const result = { columns: ["id"], rows: [[1]], rowsAffected: 1, lastInsertRowid: 1 };

describe("OneTripConnection", () => {
	it("prepares without asking the server to describe the statement", async () => {
		const describe = vi.spyOn(Session.prototype, "describe");
		const execute = vi.spyOn(Session.prototype, "execute").mockResolvedValue(result as never);

		const statement = await new OneTripConnection(config).prepare("select id from t");
		expect(await statement.raw(true).all()).toEqual([[1]]);
		expect(describe).not.toHaveBeenCalled();
		expect(execute).toHaveBeenCalledTimes(1);
	});
});

describe("RetryingConnection", () => {
	it("replays a SELECT through prepare().raw().all(), the way drizzle runs it", async () => {
		const execute = vi
			.spyOn(Session.prototype, "execute")
			.mockRejectedValueOnce(new Error("fetch failed"))
			.mockResolvedValue(result as never);

		const statement = await new RetryingConnection(config).prepare("select id from t");
		expect(await statement.raw(true).all()).toEqual([[1]]);
		expect(execute).toHaveBeenCalledTimes(2);
	});

	it("sends an INSERT ... RETURNING lost in transit only once", async () => {
		const execute = vi
			.spyOn(Session.prototype, "execute")
			.mockRejectedValue(new Error("fetch failed"));

		const statement = await new RetryingConnection(config).prepare(
			"insert into t values (1) returning id",
		);
		await expect(statement.raw(true).all()).rejects.toThrow("fetch failed");
		expect(execute).toHaveBeenCalledTimes(1);
	});
});
