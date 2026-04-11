import { sql } from "drizzle-orm";
import { db } from "../db.server";
import {
	declensionPatterns,
	genders,
	grammaticalCases,
	grammaticalNumbers,
	type DeclensionPattern,
	type Gender,
	type GrammaticalCase,
	type GrammaticalNumber,
} from "../db.server/enums";
import { nominalForms, nounDetails, verbDetails, vocabulary } from "../db.server/schema";
import type { NewNounDetails, NewNominalForm, NewVocabulary, NewVocabularyTag } from "../db.server/types";
import type {
	AdjectiveNominalFormsSeed,
	AdjectiveSeed,
	NounNominalFormsSeed,
	NounSeed,
} from "../types/seed";

export const BATCH_SIZE = 100;

export type VerbDetailRecord = {
	vocabId: number;
	conjugationFamily: string;
};

export type NounDetailRecord = NewNounDetails;

export type VocabWithTags = {
	vocab: NewVocabulary;
	tags: string[];
	nounDetail?: Omit<NounDetailRecord, "vocabId">;
	verbDetail?: { conjugationFamily: string };
	nounNominalForms?: NounNominalFormsSeed;
	adjectiveNominalForms?: AdjectiveNominalFormsSeed;
};

/** Shared mutable state while seeding one database pass. */
export type SeedAccumulators = {
	tagMap: Map<string, number>;
	vocabTagLinks: NewVocabularyTag[];
	tagDisplayOrderById: Map<number, number>;
	allNounDetails: NounDetailRecord[];
	allNominalForms: NewNominalForm[];
};

export const isDeclensionPattern = (value: unknown): value is DeclensionPattern =>
	typeof value === "string" && (declensionPatterns as readonly string[]).includes(value);

const isGrammaticalCase = (value: string): value is GrammaticalCase =>
	(grammaticalCases as readonly string[]).includes(value);

const parseCaseNumberKey = (
	key: string,
): { grammaticalCase: GrammaticalCase; number: GrammaticalNumber } | null => {
	for (const num of grammaticalNumbers) {
		const suffix = `_${num}`;
		if (!key.endsWith(suffix)) continue;
		const casePart = key.slice(0, -suffix.length);
		if (isGrammaticalCase(casePart)) {
			return { grammaticalCase: casePart, number: num };
		}
	}
	return null;
};

const parseAdjectiveNominalFormKey = (
	key: string,
): { grammaticalCase: GrammaticalCase; number: GrammaticalNumber; gender: Gender } | null => {
	for (const gender of genders) {
		const suffix = `_${gender}`;
		if (!key.endsWith(suffix)) continue;
		const withoutGender = key.slice(0, -suffix.length);
		const cn = parseCaseNumberKey(withoutGender);
		if (cn) return { ...cn, gender };
	}
	return null;
};

export const nounDetailFromSeed = (noun: NounSeed): Omit<NounDetailRecord, "vocabId"> => ({
	gender: noun.gender,
	declensionPattern:
		noun.declensionPattern != null && isDeclensionPattern(noun.declensionPattern)
			? noun.declensionPattern
			: null,
});

export const pickNounNominalForms = (
	noun: NounSeed,
): Pick<VocabWithTags, "nounNominalForms"> | Record<string, never> =>
	noun.nominalForms != null ? { nounNominalForms: noun.nominalForms } : {};

export const pickAdjectiveNominalForms = (
	adj: AdjectiveSeed,
): Pick<VocabWithTags, "adjectiveNominalForms"> | Record<string, never> =>
	adj.nominalForms != null ? { adjectiveNominalForms: adj.nominalForms } : {};

const rowsFromNounNominalForms = (
	vocabId: number,
	forms: NounNominalFormsSeed | undefined,
): NewNominalForm[] => {
	if (!forms) return [];
	const out: NewNominalForm[] = [];
	for (const [key, cell] of Object.entries(forms)) {
		const parsed = parseCaseNumberKey(key);
		if (!parsed || !cell) continue;
		out.push({
			vocabId,
			grammaticalCase: parsed.grammaticalCase,
			number: parsed.number,
			form: cell.form,
			article: cell.article ?? null,
			gender: null,
			genderKey: "",
		});
	}
	return out;
};

const rowsFromAdjectiveNominalForms = (
	vocabId: number,
	forms: AdjectiveNominalFormsSeed | undefined,
): NewNominalForm[] => {
	if (!forms) return [];
	const out: NewNominalForm[] = [];
	for (const [key, cell] of Object.entries(forms)) {
		const parsed = parseAdjectiveNominalFormKey(key);
		if (!parsed || !cell) continue;
		out.push({
			vocabId,
			grammaticalCase: parsed.grammaticalCase,
			number: parsed.number,
			form: cell.form,
			article: cell.article ?? null,
			gender: parsed.gender,
			genderKey: parsed.gender,
		});
	}
	return out;
};

export async function batchInsertVocab(items: NewVocabulary[]): Promise<Map<string, number>> {
	const resultMap = new Map<string, number>();
	if (items.length === 0) return resultMap;

	let insertedCount = 0;

	for (let i = 0; i < items.length; i += BATCH_SIZE) {
		const batch = items.slice(i, i + BATCH_SIZE);

		const inserted = await db
			.insert(vocabulary)
			.values(batch)
			.onConflictDoNothing({ target: vocabulary.greekText })
			.returning({ id: vocabulary.id, greekText: vocabulary.greekText });

		for (const row of inserted) {
			resultMap.set(row.greekText, row.id);
		}
		insertedCount += inserted.length;
	}

	const missingTexts = items.map((item) => item.greekText).filter((text) => !resultMap.has(text));

	if (missingTexts.length > 0) {
		for (let i = 0; i < missingTexts.length; i += BATCH_SIZE) {
			const batch = missingTexts.slice(i, i + BATCH_SIZE);
			const existing = await db.query.vocabulary.findMany({
				where: { greekText: { in: batch } },
				columns: { id: true, greekText: true },
			});

			for (const row of existing) {
				resultMap.set(row.greekText, row.id);
			}
		}
	}

	const skippedCount = items.length - insertedCount;
	console.log(`  → ${insertedCount} inserted, ${skippedCount} skipped`);

	return resultMap;
}

export async function batchInsertVerbDetails(details: VerbDetailRecord[]) {
	if (details.length === 0) return;

	for (let i = 0; i < details.length; i += BATCH_SIZE) {
		const batch = details.slice(i, i + BATCH_SIZE);
		await db.insert(verbDetails).values(batch).onConflictDoNothing({ target: verbDetails.vocabId });
	}
}

export async function batchInsertNounDetails(details: NounDetailRecord[]) {
	if (details.length === 0) return;

	for (let i = 0; i < details.length; i += BATCH_SIZE) {
		const batch = details.slice(i, i + BATCH_SIZE);
		await db.insert(nounDetails).values(batch).onConflictDoUpdate({
			target: nounDetails.vocabId,
			set: {
				gender: sql`excluded.gender`,
				declensionPattern: sql`excluded.declension_pattern`,
			},
		});
	}
}

export async function batchUpsertNominalForms(rows: NewNominalForm[]) {
	if (rows.length === 0) return;

	for (let i = 0; i < rows.length; i += BATCH_SIZE) {
		const batch = rows.slice(i, i + BATCH_SIZE);
		await db
			.insert(nominalForms)
			.values(batch)
			.onConflictDoUpdate({
				target: [
					nominalForms.vocabId,
					nominalForms.grammaticalCase,
					nominalForms.number,
					nominalForms.genderKey,
				],
				set: {
					form: sql`excluded.form`,
					article: sql`excluded.article`,
					gender: sql`excluded.gender`,
				},
			});
	}
}

async function processCategory(
	categoryName: string,
	items: VocabWithTags[],
	ctx: SeedAccumulators,
): Promise<VerbDetailRecord[]> {
	console.log(`Seeding ${categoryName}...`);

	const vocabItems = items.map((item) => item.vocab);
	const idMap = await batchInsertVocab(vocabItems);

	const verbDetailsToInsert: VerbDetailRecord[] = [];

	for (const item of items) {
		const vocabId = idMap.get(item.vocab.greekText);
		if (!vocabId) {
			console.warn(`  Warning: Could not find ID for ${item.vocab.greekText}`);
			continue;
		}

		for (const tagSlug of item.tags) {
			const tagId = ctx.tagMap.get(tagSlug);
			if (tagId) {
				const nextDisplayOrder = ctx.tagDisplayOrderById.get(tagId) ?? 0;
				ctx.vocabTagLinks.push({ vocabularyId: vocabId, tagId, displayOrder: nextDisplayOrder });
				ctx.tagDisplayOrderById.set(tagId, nextDisplayOrder + 1);
			}
		}

		if (item.verbDetail) {
			verbDetailsToInsert.push({
				vocabId,
				conjugationFamily: item.verbDetail.conjugationFamily,
			});
		}

		if (item.nounDetail) {
			ctx.allNounDetails.push({
				vocabId,
				gender: item.nounDetail.gender,
				declensionPattern: item.nounDetail.declensionPattern ?? null,
			});
		}

		if (item.nounNominalForms) {
			ctx.allNominalForms.push(...rowsFromNounNominalForms(vocabId, item.nounNominalForms));
		}
		if (item.adjectiveNominalForms) {
			ctx.allNominalForms.push(
				...rowsFromAdjectiveNominalForms(vocabId, item.adjectiveNominalForms),
			);
		}
	}

	return verbDetailsToInsert;
}

export function runSeedCategory(
	categoryName: string,
	items: VocabWithTags[],
	ctx: SeedAccumulators,
): Promise<VerbDetailRecord[]> {
	return processCategory(categoryName, items, ctx);
}
