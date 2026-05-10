import { shuffle } from "@/lib/shuffle";

export type DrillMode = "forward" | "reverse";
export type Phase = "config" | "active" | "feedback" | "complete";

export const SESSION_SIZES = [10, 20, 30] as const;
export type SessionSize = (typeof SESSION_SIZES)[number];

export interface DrillForm {
	id: string;
	greek: string;
	greeklish: string;
	label: string;
	acceptAlso?: string;
	vocabularyId?: number;
	weakAreaIdentifier?: string;
}

export interface Attempt<T extends DrillForm> {
	form: T;
	isCorrect: boolean;
	timeTaken: number;
	timedOut: boolean;
	userInput?: string;
}

// Extended DrillForm used by most practice routes
export interface SimpleListItem extends DrillForm {
	english: string;
	category?: string;
	reverseGreek?: string;
	dimension?: string;
	context?: string;
	detail?: string;
}

export const buildDeck = <T>(forms: T[], size: SessionSize): T[] => {
	const first = shuffle([...forms]);
	if (size <= forms.length) return first.slice(0, size);
	const second = shuffle([...forms]).slice(0, size - forms.length);
	return [...first, ...second];
};
