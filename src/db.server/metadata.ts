/**
 * A JSON-serialisable value — provably safe to cross the server/client boundary
 * via createServerFn's ValidateSerializableMapped check.
 */
export type JsonValue =
	| string
	| number
	| boolean
	| null
	| JsonValue[]
	| { [key: string]: JsonValue };

/**
 * Vocabulary metadata is a flexible JSON object.
 * The TAG on the vocabulary item tells you what shape to expect.
 *
 * Known patterns (by tag):
 * - time-of-day → { timeRange: string }
 * - number → { numericValue: number }
 * - any → { grammar?, pattern?, note?, lessonDate?, category? }
 */
export type VocabMetadata = Record<string, JsonValue> | null;

/**
 * Type guard: metadata has timeRange (used for time-of-day tagged items)
 */
export const hasTimeRange = (
	m: VocabMetadata,
): m is { timeRange: string } & Record<string, JsonValue> =>
	m !== null && typeof m === "object" && "timeRange" in m && typeof m.timeRange === "string";

/**
 * Type guard: metadata has numericValue (used for number tagged items)
 */
export const hasNumericValue = (
	m: VocabMetadata,
): m is { numericValue: number } & Record<string, JsonValue> =>
	m !== null && typeof m === "object" && "numericValue" in m && typeof m.numericValue === "number";
