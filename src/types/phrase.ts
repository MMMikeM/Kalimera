// Runtime type for conversation phrases
// Used in conversations.tsx and seed-data

import type { CefrLevel } from "../server/db/enums";
import type { JsonValue } from "../server/db/metadata";

export interface Phrase {
	text: string;
	english: string;
	cefrLevel?: CefrLevel;
	metadata?: Record<string, JsonValue>;
}
