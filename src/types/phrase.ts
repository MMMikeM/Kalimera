// Runtime type for conversation phrases
// Used in conversations.tsx and seed-data

export interface Phrase {
	text: string;
	english: string;
	metadata?: Record<string, unknown>;
}
