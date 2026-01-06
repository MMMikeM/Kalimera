import { sql } from "drizzle-orm";
import { db } from "../db";
import { verbConjugations, verbDetails, verbImperatives, } from "../db/schema";
import type { PersonNumber, VerbTense, ImperativeAspect, GrammaticalNumber } from "../db/enums";
import type { NewVerbConjugation, NewVerbImperative } from "../db/types";
import { FULL_VERB_CONJUGATIONS } from "./seed-data/vocabulary/verb-conjugations";

const BATCH_SIZE = 100;

async function seedVerbConjugations() {
	console.log("Seeding verb conjugations (idempotent mode)...\n");

	let updatedVerbDetails = 0;
	let upsertedConjugations = 0;
	let upsertedImperatives = 0;
	let skippedVerbs = 0;

	for (const verb of FULL_VERB_CONJUGATIONS) {
		const vocabEntry = await db.query.vocabulary.findFirst({
			where: { greekText: verb.lemma, wordType: "verb" },
		});

		if (!vocabEntry) {
			console.warn(`  Warning: Verb "${verb.lemma}" not found in vocabulary table. Skipping.`);
			skippedVerbs++;
			continue;
		}

		console.log(`Processing: ${verb.lemma} (id: ${vocabEntry.id})`);

		await db
			.insert(verbDetails)
			.values({
				vocabId: vocabEntry.id,
				conjugationFamily: verb.conjugationFamily,
				presentStem: verb.stems?.present ?? null,
				aoristStem: verb.stems?.aorist ?? null,
				futureStem: verb.stems?.future ?? null,
				isSuppletive: verb.isSuppletive ?? false,
			})
			.onConflictDoUpdate({
				target: verbDetails.vocabId,
				set: {
					conjugationFamily: sql`excluded.conjugation_family`,
					presentStem: sql`excluded.present_stem`,
					aoristStem: sql`excluded.aorist_stem`,
					futureStem: sql`excluded.future_stem`,
					isSuppletive: sql`excluded.is_suppletive`,
				},
			});
		updatedVerbDetails++;

		if (verb.conjugations) {
			const conjugationRows: NewVerbConjugation[] = [];

			for (const conj of verb.conjugations) {
				const persons: PersonNumber[] = ["sg1", "sg2", "sg3", "pl1", "pl2", "pl3"];
				for (const person of persons) {
					const form = conj.forms[person];
					if (form) {
						conjugationRows.push({
							vocabId: vocabEntry.id,
							tense: conj.tense as VerbTense,
							person,
							form,
							stem: conj.stems?.[person] ?? null,
						});
					}
				}
			}

			for (let i = 0; i < conjugationRows.length; i += BATCH_SIZE) {
				const batch = conjugationRows.slice(i, i + BATCH_SIZE);
				await db
					.insert(verbConjugations)
					.values(batch)
					.onConflictDoUpdate({
						target: [verbConjugations.vocabId, verbConjugations.tense, verbConjugations.person],
						set: {
							form: sql`excluded.form`,
							stem: sql`excluded.stem`,
						},
					});
			}
			upsertedConjugations += conjugationRows.length;
		}

		if (verb.imperatives) {
			const imperativeRows: NewVerbImperative[] = [];

			if (verb.imperatives.imperfective) {
				imperativeRows.push({
					vocabId: vocabEntry.id,
					aspect: "imperfective" as ImperativeAspect,
					number: "singular" as GrammaticalNumber,
					form: verb.imperatives.imperfective.singular,
				});
				imperativeRows.push({
					vocabId: vocabEntry.id,
					aspect: "imperfective" as ImperativeAspect,
					number: "plural" as GrammaticalNumber,
					form: verb.imperatives.imperfective.plural,
				});
			}

			if (verb.imperatives.perfective) {
				imperativeRows.push({
					vocabId: vocabEntry.id,
					aspect: "perfective" as ImperativeAspect,
					number: "singular" as GrammaticalNumber,
					form: verb.imperatives.perfective.singular,
				});
				imperativeRows.push({
					vocabId: vocabEntry.id,
					aspect: "perfective" as ImperativeAspect,
					number: "plural" as GrammaticalNumber,
					form: verb.imperatives.perfective.plural,
				});
			}

			if (imperativeRows.length > 0) {
				await db
					.insert(verbImperatives)
					.values(imperativeRows)
					.onConflictDoUpdate({
						target: [verbImperatives.vocabId, verbImperatives.aspect, verbImperatives.number],
						set: {
							form: sql`excluded.form`,
						},
					});
				upsertedImperatives += imperativeRows.length;
			}
		}
	}

	console.log("\n--- Summary ---");
	console.log(`Verb details updated: ${updatedVerbDetails}`);
	console.log(`Conjugation forms upserted: ${upsertedConjugations}`);
	console.log(`Imperative forms upserted: ${upsertedImperatives}`);
	if (skippedVerbs > 0) {
		console.log(`Verbs skipped (not in vocabulary): ${skippedVerbs}`);
	}
	console.log("\nSeeding complete.");

	process.exit(0);
}

seedVerbConjugations().catch((err) => {
	console.error("Seeding failed:", err);
	process.exit(1);
});
