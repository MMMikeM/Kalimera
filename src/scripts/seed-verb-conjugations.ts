import { sql } from "drizzle-orm";

import type {
	GrammaticalNumber,
	ImperativeAspect,
	PersonNumber,
	VerbTense,
} from "../server/db/enums";
import { verbConjugations, verbDetails, verbImperatives } from "../server/db/schema";
import type { Db, NewVerbConjugation, NewVerbImperative } from "../server/db/types";
import { generateConjugations } from "./generate-conjugations";
import { FULL_VERB_CONJUGATIONS } from "./seed-data/vocabulary/verb-conjugations";
import { VERB_STEMS } from "./seed-data/vocabulary/verb-stems";

const BATCH_SIZE = 100;

export async function seedVerbConjugations(db: Db) {
	console.log("Seeding verb conjugations (idempotent mode)...\n");

	let updatedVerbDetails = 0;
	let upsertedConjugations = 0;
	let upsertedImperatives = 0;
	let skippedVerbs = 0;

	// ── Batch-fetch all vocab IDs for FULL_VERB_CONJUGATIONS ───────────────────
	const fullVerbLemmas = FULL_VERB_CONJUGATIONS.map((v) => v.lemma);
	const fullVocabEntries = await db.query.vocabulary.findMany({
		where: { greekText: { in: fullVerbLemmas }, wordType: "verb" },
		columns: { id: true, greekText: true },
	});
	const fullVocabByLemma = new Map(fullVocabEntries.map((v) => [v.greekText, v.id]));

	const allFullVerbDetailRows: {
		vocabId: number;
		conjugationFamily: string;
		presentStem: string | null;
		aoristStem: string | null;
		futureStem: string | null;
		isSuppletive: boolean;
	}[] = [];
	const allFullConjugationRows: NewVerbConjugation[] = [];
	const allFullImperativeRows: NewVerbImperative[] = [];

	for (const verb of FULL_VERB_CONJUGATIONS) {
		const vocabId = fullVocabByLemma.get(verb.lemma);
		if (!vocabId) {
			console.warn(`  Warning: Verb "${verb.lemma}" not found in vocabulary table. Skipping.`);
			skippedVerbs++;
			continue;
		}

		console.log(`Queuing: ${verb.lemma} (id: ${vocabId})`);

		allFullVerbDetailRows.push({
			vocabId,
			conjugationFamily: verb.conjugationFamily,
			presentStem: verb.stems?.present ?? null,
			aoristStem: verb.stems?.aorist ?? null,
			futureStem: verb.stems?.future ?? null,
			isSuppletive: verb.isSuppletive ?? false,
		});

		if (verb.conjugations) {
			const persons: PersonNumber[] = ["sg1", "sg2", "sg3", "pl1", "pl2", "pl3"];
			for (const conj of verb.conjugations) {
				for (const person of persons) {
					const form = conj.forms[person];
					if (form) {
						allFullConjugationRows.push({
							vocabId,
							tense: conj.tense as VerbTense,
							person,
							form,
							stem: conj.stems?.[person] ?? null,
						});
					}
				}
			}
		}

		if (verb.imperatives) {
			if (verb.imperatives.imperfective) {
				allFullImperativeRows.push({
					vocabId,
					aspect: "imperfective" as ImperativeAspect,
					number: "singular" as GrammaticalNumber,
					form: verb.imperatives.imperfective.singular,
				});
				allFullImperativeRows.push({
					vocabId,
					aspect: "imperfective" as ImperativeAspect,
					number: "plural" as GrammaticalNumber,
					form: verb.imperatives.imperfective.plural,
				});
			}
			if (verb.imperatives.perfective) {
				allFullImperativeRows.push({
					vocabId,
					aspect: "perfective" as ImperativeAspect,
					number: "singular" as GrammaticalNumber,
					form: verb.imperatives.perfective.singular,
				});
				allFullImperativeRows.push({
					vocabId,
					aspect: "perfective" as ImperativeAspect,
					number: "plural" as GrammaticalNumber,
					form: verb.imperatives.perfective.plural,
				});
			}
		}
	}

	if (allFullVerbDetailRows.length > 0) {
		await db
			.insert(verbDetails)
			.values(allFullVerbDetailRows)
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
		updatedVerbDetails += allFullVerbDetailRows.length;
	}

	if (allFullConjugationRows.length > 0) {
		for (let i = 0; i < allFullConjugationRows.length; i += BATCH_SIZE) {
			const batch = allFullConjugationRows.slice(i, i + BATCH_SIZE);
			await db
				.insert(verbConjugations)
				.values(batch)
				.onConflictDoUpdate({
					target: [verbConjugations.vocabId, verbConjugations.tense, verbConjugations.person],
					set: { form: sql`excluded.form`, stem: sql`excluded.stem` },
				});
		}
		upsertedConjugations += allFullConjugationRows.length;
	}

	if (allFullImperativeRows.length > 0) {
		await db
			.insert(verbImperatives)
			.values(allFullImperativeRows)
			.onConflictDoUpdate({
				target: [verbImperatives.vocabId, verbImperatives.aspect, verbImperatives.number],
				set: { form: sql`excluded.form` },
			});
		upsertedImperatives += allFullImperativeRows.length;
	}

	// ── Generated conjugations from VERB_STEMS ──────────────────────────────────
	const stemLemmas = VERB_STEMS.map((s) => s.lemma);
	const vocabEntries = await db.query.vocabulary.findMany({
		where: { greekText: { in: stemLemmas }, wordType: "verb" },
		columns: { id: true, greekText: true },
	});
	const vocabByLemma = new Map(vocabEntries.map((v) => [v.greekText, v.id]));

	const allVerbDetailRows: { vocabId: number; conjugationFamily: string }[] = [];
	const allConjugationRows: NewVerbConjugation[] = [];

	for (const stem of VERB_STEMS) {
		const vocabId = vocabByLemma.get(stem.lemma);
		if (!vocabId) {
			console.warn(`  Warning: "${stem.lemma}" not found in vocabulary table. Skipping.`);
			skippedVerbs++;
			continue;
		}

		allVerbDetailRows.push({ vocabId, conjugationFamily: stem.family });

		const conjugations = generateConjugations(stem.lemma, stem.aoristStem, stem.family);
		const persons: PersonNumber[] = ["sg1", "sg2", "sg3", "pl1", "pl2", "pl3"];
		for (const tenseEntry of conjugations) {
			for (const person of persons) {
				const form = tenseEntry.forms[person];
				if (form) {
					allConjugationRows.push({
						vocabId,
						tense: tenseEntry.tense as VerbTense,
						person,
						form,
						stem: null,
					});
				}
			}
		}
	}

	if (allVerbDetailRows.length > 0) {
		await db
			.insert(verbDetails)
			.values(allVerbDetailRows)
			.onConflictDoNothing({ target: verbDetails.vocabId });
		updatedVerbDetails += allVerbDetailRows.length;
	}

	if (allConjugationRows.length > 0) {
		await db
			.insert(verbConjugations)
			.values(allConjugationRows)
			.onConflictDoUpdate({
				target: [verbConjugations.vocabId, verbConjugations.tense, verbConjugations.person],
				set: { form: sql`excluded.form`, stem: sql`excluded.stem` },
			});
		upsertedConjugations += allConjugationRows.length;
	}
	console.log(`Generated ${allConjugationRows.length} forms for ${allVerbDetailRows.length} verbs from VERB_STEMS.`);

	console.log("\n--- Summary ---");
	console.log(`Verb details updated: ${updatedVerbDetails}`);
	console.log(`Conjugation forms upserted: ${upsertedConjugations}`);
	console.log(`Imperative forms upserted: ${upsertedImperatives}`);
	if (skippedVerbs > 0) {
		console.log(`Verbs skipped (not in vocabulary): ${skippedVerbs}`);
	}
	console.log("\nVerb-conjugations seed complete.");
}

// Standalone runner — only exits if invoked directly via `tsx`.
if (import.meta.url === `file://${process.argv[1]}`) {
	import("../server/db").then(({ db }) =>
		seedVerbConjugations(db)
			.then(() => process.exit(0))
			.catch((err) => {
				console.error("Seeding failed:", err);
				process.exit(1);
			}),
	);
}
