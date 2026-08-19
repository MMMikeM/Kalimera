/**
 * A long-lived Node process pools keep-alive sockets. When the far side or a NAT
 * drops one while the server sits idle, the next query fails on a dead socket and
 * an identical retry succeeds — the failure never reached the database.
 *
 * Only reads are retried. A write that failed in transit may still have been
 * applied, so replaying it risks doubling it.
 */

const TRANSPORT_FAILURE =
	/fetch failed|other side closed|socket hang up|premature close|ECONNRESET|ECONNREFUSED|ETIMEDOUT|EPIPE|ENOTFOUND|EAI_AGAIN|UND_ERR|HTTP error! status: 5\d\d/i;

/** Drizzle wraps driver errors, and undici nests its own — the reason can be several causes deep. */
export const isTransportFailure = (error: unknown): boolean => {
	for (let current = error, depth = 0; current instanceof Error && depth < 5; depth++) {
		if (TRANSPORT_FAILURE.test(current.message)) return true;
		current = current.cause;
	}
	return false;
};

/** Reads, plus `prepare` — it issues a read-only `describe` round trip of its own. */
const RETRYABLE = new Set(["all", "get", "values", "prepare"]);
/** These hand back a statement that still needs guarding for the chained call. */
const RETURNS_CHAINABLE = new Set(["prepare", "raw"]);

const wrapResult = (result: unknown): unknown =>
	result && typeof result === "object" ? withReadRetry(result as object) : result;

/** Guards a Turso client and every statement it returns, so chained calls stay covered. */
export const withReadRetry = <T extends object>(target: T): T =>
	new Proxy(target, {
		get(object, property, receiver) {
			const value = Reflect.get(object, property, receiver);
			if (typeof value !== "function") return value;

			const retryable = RETRYABLE.has(property as string);
			const chainable = RETURNS_CHAINABLE.has(property as string);
			if (!retryable && !chainable) return value.bind(object);

			return (...args: unknown[]) => {
				const call = () => value.apply(object, args);

				if (!retryable) {
					const result = call();
					return result instanceof Promise ? result.then(wrapResult) : wrapResult(result);
				}

				const attempt = async () => {
					try {
						return await call();
					} catch (error) {
						if (!isTransportFailure(error)) throw error;
						console.warn("[db] transport failure, retrying once:", (error as Error).message);
						return await call();
					}
				};

				return chainable ? attempt().then(wrapResult) : attempt();
			};
		},
	});
