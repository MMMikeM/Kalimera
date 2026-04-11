import { db } from "../index";

export async function fetchVerbsWithVerbDetails() {
	return await db.query.vocabulary.findMany({
		where: { wordType: "verb" },
		with: { verbDetails: true },
	});
}

export type VerbVocabularyWithDetailsRow = Awaited<
	ReturnType<typeof fetchVerbsWithVerbDetails>
>[number];

export async function fetchVerbWithConjugationRelations(vocabId: number) {
	return await db.query.vocabulary.findFirst({
		where: { id: vocabId, wordType: "verb" },
		with: {
			verbDetails: true,
			verbConjugations: true,
			verbImperatives: true,
		},
	});
}

export type VerbConjugationGraphRow = NonNullable<
	Awaited<ReturnType<typeof fetchVerbWithConjugationRelations>>
>;
