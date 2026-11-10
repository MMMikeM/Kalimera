import { Connection, Statement } from "@tursodatabase/serverless";

/**
 * Fly suspends this machine when idle. On resume the process still holds
 * keep-alive sockets the far side has dropped, so the first query fails in
 * transit and an identical retry succeeds. 401 is not a transport failure: a
 * rejected token fails the same way twice.
 *
 * Keyed on the SQL rather than the method: drizzle runs INSERT/UPDATE/DELETE
 * ... RETURNING through the same all()/get() as reads, and a write that failed
 * in transit may still have been applied, so only SELECTs are replayed.
 *
 * An expired session is the exception. Turso ends a session idle for 10 s and
 * refuses the next request on it before running any of it, and the driver drops
 * the session on that error, so a write is replayed on a fresh one too. That
 * happens after every quiet spell, so it isn't logged.
 */

const TRANSPORT_FAILURE =
	/fetch failed|other side closed|socket hang up|premature close|ECONNRESET|ECONNREFUSED|ETIMEDOUT|EPIPE|ENOTFOUND|EAI_AGAIN|UND_ERR|HTTP error! status: (?:400|5\d\d)/i;

// The pipeline endpoint reports it only as a 400 (matched above); the cursor
// one, which runs every statement, passes on the server's message.
const SESSION_EXPIRED = /stream has expired/i;

/** Drizzle wraps driver errors, and undici nests its own, so the reason can be several causes deep. */
const causedBy = (error: unknown, reason: RegExp): boolean => {
	for (let current = error, depth = 0; current instanceof Error && depth < 5; depth++) {
		if (reason.test(current.message)) return true;
		current = current.cause;
	}
	return false;
};

export const isTransportFailure = (error: unknown) => causedBy(error, TRANSPORT_FAILURE);
const isSessionExpired = (error: unknown) => causedBy(error, SESSION_EXPIRED);

const isRead = (sql: string) => /^\s*select\b/i.test(sql);

type Retryable = (error: unknown) => boolean;

export const retryableFor = (sql: string): Retryable =>
	isRead(sql) ? (error) => isTransportFailure(error) || isSessionExpired(error) : isSessionExpired;

export const retryOnce = async <T>(call: () => Promise<T>, retryable: Retryable): Promise<T> => {
	try {
		return await call();
	} catch (error) {
		if (!retryable(error)) throw error;
		if (!isSessionExpired(error)) console.warn("[db] retrying once:", (error as Error).message);
		return await call();
	}
};

// Private on Connection: the session its statements run on, and the lock that queues them
type Internals = {
	session: Parameters<typeof Statement.fromSession>[0];
	execLock: Parameters<typeof Statement.fromSession>[3];
	defaultSafeIntegerMode: boolean;
};

/**
 * Connection.prepare asks the server to describe the statement, a round trip of
 * its own before the one that runs it, for the column metadata behind columns().
 * Drizzle never reads it: rows are named from the columns that come back with
 * them. This is the statement prepare builds, on the same session and lock, so a
 * transaction's statements stay in it.
 */
export class OneTripConnection extends Connection {
	override async prepare(sql: string) {
		const { session, execLock, defaultSafeIntegerMode } = this as unknown as Internals;
		const statement = Statement.fromSession(session, sql, [], execLock);
		if (defaultSafeIntegerMode) statement.safeIntegers(true);
		return statement;
	}
}

/** The shared connection: every statement retried once where replaying it is safe. */
export class RetryingConnection extends OneTripConnection {
	override async prepare(sql: string) {
		const statement = await super.prepare(sql);
		const retryable = retryableFor(sql);
		const all = statement.all.bind(statement);
		const get = statement.get.bind(statement);
		const run = statement.run.bind(statement);
		statement.all = (...args) => retryOnce(() => all(...args), retryable);
		statement.get = (...args) => retryOnce(() => get(...args), retryable);
		statement.run = (...args) => retryOnce(() => run(...args), retryable);
		return statement;
	}

	override all(sql: string, ...params: unknown[]) {
		return retryOnce(() => super.all(sql, ...params), retryableFor(sql));
	}

	override get(sql: string, ...params: unknown[]) {
		return retryOnce(() => super.get(sql, ...params), retryableFor(sql));
	}

	override run(sql: string, ...params: unknown[]) {
		return retryOnce(() => super.run(sql, ...params), retryableFor(sql));
	}

	// A retried statement would land on a fresh session, outside the transaction
	override transaction(): never {
		throw new Error("Use inTransaction: db's statements would run outside the transaction");
	}
}
