// Runtime type for conversation phrases
// Used in conversations.tsx and seed-data

import type { CefrLevel } from "../db.server/enums";

export interface Phrase {
	text: string;
	english: string;
	cefrLevel?: CefrLevel;
	metadata?: Record<string, unknown>;
}
