import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { VERB_CATEGORIES, VERB_CONJUGATIONS } from "../constants/verbs";
import { ALL_WORDS } from "../constants/vocabulary";
import { db } from "../db";
import type {
	NewVerbConjugation,
	NewVerbDetails,
	NewVocabulary,
} from "../db/schema";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const transformAllWords = (): {
	vocabulary: NewVocabulary[];
	verbDetails: NewVerbDetails[];
	verbConjugations: NewVerbConjugation[];
} => {
	const vocabulary: NewVocabulary[] = [];
	const verbDetails: NewVerbDetails[] = [];
	const verbConjugations: NewVerbConjugation[] = [];
	let vocabIdCounter = 1;
	let verbDetailsIdCounter = 1;

	ALL_WORDS.forEach((word) => {
		const vocabEntry: NewVocabulary = {
			greek_text: word.greek,
			english_translation: word.english,
			word_type:
				word.type === "verb"
					? "verb"
					: word.type === "article"
						? "phrase"
						: word.type,
			status: "processed",
		};
		vocabulary.push(vocabEntry);
		const currentVocabId = vocabIdCounter++;

		if (word.type === "verb") {
			const verbCat = VERB_CATEGORIES.flatMap((c) => c.verbs).find(
				(v) => v.greek === word.greek,
			);
			const newVerbDetail: NewVerbDetails = {
				vocab_id: currentVocabId,
				infinitive: word.greek,
				conjugation_family: verbCat?.pattern || "unknown",
			};
			verbDetails.push(newVerbDetail);
			const currentVerbDetailsId = verbDetailsIdCounter++;

			const conjugations =
				VERB_CONJUGATIONS[
					word.id.replace("v-", "") as keyof typeof VERB_CONJUGATIONS
				];
			if (conjugations) {
				conjugations.forEach((c) => {
					verbConjugations.push({
						verb_details_id: currentVerbDetailsId,
						tense: "present",
						person: c.person,
						form: c.form,
					});
				});
			}
		}
	});

	return { vocabulary, verbDetails, verbConjugations };
};

async function seed() {
	console.log("Seeding database from pre-generated data...");

	const dataDir = path.join(__dirname, "../data");

	const vocabulary: NewVocabulary[] = JSON.parse(
		fs.readFileSync(path.join(dataDir, "vocabulary.json"), "utf-8"),
	);
	const verbDetails: NewVerbDetails[] = JSON.parse(
		fs.readFileSync(path.join(dataDir, "verbDetails.json"), "utf-8"),
	);
	const verbConjugations: NewVerbConjugation[] = JSON.parse(
		fs.readFileSync(path.join(dataDir, "verbConjugations.json"), "utf-8"),
	);

	await db.transaction().execute(async (trx) => {
		await trx.deleteFrom("verb_conjugations").execute();
		await trx.deleteFrom("verb_details").execute();
		await trx.deleteFrom("vocabulary").execute();
		console.log("Cleared existing data.");

		const insertedVocab = await trx
			.insertInto("vocabulary")
			.values(vocabulary)
			.returningAll()
			.execute();
		console.log(`Seeded ${insertedVocab.length} vocabulary words.`);

		const vocabMap = new Map(insertedVocab.map((v) => [v.greek_text, v.id]));
		const verbDetailsWithRealIds = verbDetails.map((vd) => ({
			...vd,
			vocab_id: vocabMap.get(vd.infinitive)!,
		}));

		const insertedVerbDetails = await trx
			.insertInto("verb_details")
			.values(verbDetailsWithRealIds)
			.returningAll()
			.execute();
		console.log(`Seeded ${insertedVerbDetails.length} verb details.`);

		const verbDetailsMap = new Map(
			insertedVerbDetails.map((vd) => [vd.vocab_id, vd.id]),
		);

		const finalConjugations = verbConjugations
			.map((vc) => ({
				...vc,
				verb_details_id: verbDetailsMap.get(vc.verb_details_id)!,
			}))
			.filter((vc) => vc.verb_details_id);

		if (finalConjugations.length > 0) {
			await trx
				.insertInto("verb_conjugations")
				.values(finalConjugations)
				.execute();
			console.log(`Seeded ${finalConjugations.length} verb conjugations.`);
		}
	});

	console.log("Seeding complete.");
	process.exit(0);
}

seed().catch((err) => {
	console.error("Seeding failed:", err);
	process.exit(1);
});
