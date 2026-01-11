import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { beforeAll, describe, expect, it } from "vitest";
import type { NewVerbDetails, NewVocabulary } from "../db.server/schema";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, "../../src/data");

describe("Data Seeding Pipeline", () => {
	beforeAll(() => {
		// Run the generation script before tests
		try {
			// Assuming 'tsx' is available in the environment where tests are run,
			// as it is used in package.json scripts.
			execSync("tsx src/scripts/generate-seed-data.ts", { stdio: "inherit" });
		} catch (e) {
			console.error("Failed to run generation script", e);
			// We don't exit here to allow the file existence tests to fail,
			// which gives a clearer error message.
		}
	});

	it("should generate the seed data files", () => {
		expect(fs.existsSync(path.join(dataDir, "vocabulary.json"))).toBe(true);
		expect(fs.existsSync(path.join(dataDir, "verbDetails.json"))).toBe(true);
		expect(fs.existsSync(path.join(dataDir, "verbConjugations.json"))).toBe(
			true,
		);
	});

	it("should have valid vocabulary data", () => {
		const vocabulary: NewVocabulary[] = JSON.parse(
			fs.readFileSync(path.join(dataDir, "vocabulary.json"), "utf-8"),
		);
		expect(vocabulary.length).toBeGreaterThan(0);
		const firstWord = vocabulary[0];
		expect(firstWord).toHaveProperty("greek_text");
		expect(firstWord).toHaveProperty("english_translation");
	});

	it("should have valid verb details data", () => {
		const verbDetails: NewVerbDetails[] = JSON.parse(
			fs.readFileSync(path.join(dataDir, "verbDetails.json"), "utf-8"),
		);
		expect(verbDetails.length).toBeGreaterThan(0);
		const firstDetail = verbDetails[0];
		expect(firstDetail).toHaveProperty("vocab_id");
		expect(firstDetail).toHaveProperty("infinitive");
		expect(firstDetail).toHaveProperty("conjugation_family");
	});

	it("should have valid verb conjugation data", () => {
		interface VerbConjugationData {
			verb_details_id: number;
			tense: string;
			person: string;
			form: string;
		}
		const verbConjugations: VerbConjugationData[] = JSON.parse(
			fs.readFileSync(path.join(dataDir, "verbConjugations.json"), "utf-8"),
		);
		expect(verbConjugations.length).toBeGreaterThan(0);
		const firstConj = verbConjugations[0];
		expect(firstConj).toHaveProperty("verb_details_id");
		expect(firstConj).toHaveProperty("tense");
		expect(firstConj).toHaveProperty("person");
		expect(firstConj).toHaveProperty("form");
	});
});
