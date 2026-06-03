import type { DrillBucket } from "@/lib/drill/types";

export type DrillMode = "forward" | "reverse";
export type { DrillBucket };
export type Phase = "config" | "active" | "feedback" | "complete" | "error";

export const SESSION_SIZES = [10, 20, 30] as const;
export type SessionSize = (typeof SESSION_SIZES)[number];

export interface DrillForm {
	id: string;
	greek: string;
	greeklish: string;
	label: string;
	acceptAlso?: string;
	vocabId?: number;
	bucket?: DrillBucket;
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

// Slots per 10-card batch, in draw order. Cascade to next priority when a bucket empties.
const BATCH_SLOTS: DrillBucket[] = [
	"inProgress",
	"tier3",
	"inProgress",
	"tier2",
	"inProgress",
	"tier1",
	"inProgress",
	"new",
	"inProgress",
	"inProgress",
];

/**
 * Assembles a session deck from bucket-tagged items using weighted batch interleaving.
 * Every 10 cards follows the BATCH_SLOTS pattern; exhausted buckets cascade downward.
 * New words are introduced twice (slots ~5 apart) to boost initial retention.
 */
export const buildWeightedDeck = (forms: DrillForm[], size: SessionSize | number): DrillForm[] => {
	if (forms.length === 0) throw new Error("Pool is empty");
	// If pool smaller than session size, pad by cycling through forms
	if (forms.length < size) {
		const padded = [...forms];
		while (padded.length < size) padded.push(...forms.slice(0, size - padded.length));
		forms = padded;
	}

	const shuffle = <T>(arr: T[]): T[] => {
		for (let i = arr.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[arr[i], arr[j]] = [arr[j]!, arr[i]!];
		}
		return arr;
	};

	const buckets: Record<DrillBucket, DrillForm[]> = {
		tier1: [],
		tier2: [],
		tier3: [],
		inProgress: [],
		new: [],
	};
	for (const f of forms) {
		const b = f.bucket ?? "inProgress";
		buckets[b].push(f);
	}
	for (const b of Object.keys(buckets) as DrillBucket[]) shuffle(buckets[b]);

	const deck: DrillForm[] = [];
	const seenNew = new Set<string>();
	const PRIORITY: DrillBucket[] = ["tier1", "tier2", "tier3", "inProgress", "new"];

	const draw = (preferred: DrillBucket): DrillForm | undefined => {
		const order = [preferred, ...PRIORITY.filter((b) => b !== preferred)];
		for (const b of order) {
			const item = buckets[b].shift();
			if (item) return item;
		}
	};

	for (let i = 0; deck.length < size; i++) {
		const slot = BATCH_SLOTS[i % BATCH_SLOTS.length]!;
		const item = draw(slot);
		if (!item) break;
		deck.push(item);

		// Re-introduce new words ~5 slots after first appearance
		if (item.bucket === "new" && !seenNew.has(item.id)) {
			seenNew.add(item.id);
			const reintroAt = deck.length + 4; // 5th slot from here
			if (reintroAt < size) buckets.new.push({ ...item }); // push = end of queue; unshift caused back-to-back repeats
		}
	}

	return deck;
};
