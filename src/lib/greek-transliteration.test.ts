import { describe, expect, it } from "vitest";

import { greekToPhonetic, matchPhonetic } from "./greek-transliteration";

describe("greekToPhonetic", () => {
	it("maps η → h", () => {
		expect(greekToPhonetic("η")).toBe("h");
	});

	it("maps ω → w", () => {
		expect(greekToPhonetic("ω")).toBe("w");
	});

	it("maps article η correctly", () => {
		expect(greekToPhonetic("η μέρα")).toBe("h mera");
	});

	it("maps ωραίος correctly", () => {
		expect(greekToPhonetic("ωραίος")).toBe("wreos");
	});

	it("maps πρωί correctly", () => {
		expect(greekToPhonetic("πρωί")).toBe("prwi");
	});

	it("preserves θ as th (not affected by η→h change)", () => {
		expect(greekToPhonetic("θέλω")).toBe("thelw");
	});

	it("maps φίλη with word-final η → h", () => {
		expect(greekToPhonetic("φίλη")).toBe("filh");
	});

	it("maps καλημέρα", () => {
		expect(greekToPhonetic("καλημέρα")).toBe("kalhmera");
	});

	it("handles diphthongs: ει → i", () => {
		expect(greekToPhonetic("ειρήνη")).toBe("irhnh");
	});

	it("handles diphthongs: αι → e", () => {
		expect(greekToPhonetic("και")).toBe("ke");
	});

	it("handles μπ → b word-initially", () => {
		expect(greekToPhonetic("μπαρ")).toBe("bar");
	});

	it("handles ευ → ev/ef depending on following consonant", () => {
		expect(greekToPhonetic("ευχαριστώ")).toBe("evcharistw");
	});

	it("accepts x for χ (Greeklish convention)", () => {
		expect(matchPhonetic("nixta", "νύχτα").isCorrect).toBe(true);
		expect(matchPhonetic("xeri", "χέρι").isCorrect).toBe(true);
		expect(matchPhonetic("efxaristw", "ευχαριστώ").isCorrect).toBe(true);
	});

	it("accepts ef/ev interchangeably for ευ", () => {
		expect(matchPhonetic("efxaristw", "ευχαριστώ").isCorrect).toBe(true);
		expect(matchPhonetic("evcharistw", "ευχαριστώ").isCorrect).toBe(true);
	});

	it("strips article for display", () => {
		expect(greekToPhonetic("ο φίλος")).toBe("o filos");
		expect(greekToPhonetic("η φίλη")).toBe("h filh");
		expect(greekToPhonetic("το σπίτι")).toBe("to spiti");
	});
});

describe("matchPhonetic — new Greeklish spellings", () => {
	it("accepts h for η (article)", () => {
		expect(matchPhonetic("h mera", "η μέρα").isCorrect).toBe(true);
	});

	it("accepts w for ω", () => {
		expect(matchPhonetic("thelw", "θέλω").isCorrect).toBe(true);
	});

	it("accepts prwi for πρωί", () => {
		expect(matchPhonetic("prwi", "πρωί").isCorrect).toBe(true);
	});

	it("accepts filh for φίλη", () => {
		expect(matchPhonetic("filh", "φίλη").isCorrect).toBe(true);
	});

	it("accepts kalhmera for καλημέρα", () => {
		expect(matchPhonetic("kalhmera", "καλημέρα").isCorrect).toBe(true);
	});

	it("accepts wreos for ωραίος", () => {
		expect(matchPhonetic("wreos", "ωραίος").isCorrect).toBe(true);
	});
});

describe("matchPhonetic — old spellings still accepted (backwards compat)", () => {
	it("accepts i for η (article)", () => {
		expect(matchPhonetic("i mera", "η μέρα").isCorrect).toBe(true);
	});

	it("accepts o for ω", () => {
		expect(matchPhonetic("thelo", "θέλω").isCorrect).toBe(true);
	});

	it("accepts proi for πρωί", () => {
		expect(matchPhonetic("proi", "πρωί").isCorrect).toBe(true);
	});

	it("accepts fili for φίλη", () => {
		expect(matchPhonetic("fili", "φίλη").isCorrect).toBe(true);
	});

	it("accepts kalimera for καλημέρα", () => {
		expect(matchPhonetic("kalimera", "καλημέρα").isCorrect).toBe(true);
	});

	it("accepts oraios for ωραίος", () => {
		expect(matchPhonetic("oraios", "ωραίος").isCorrect).toBe(true);
	});
});

describe("matchPhonetic — article optional", () => {
	it("accepts answer without article for noun", () => {
		expect(matchPhonetic("spiti", "το σπίτι").isCorrect).toBe(true);
		expect(matchPhonetic("to spiti", "το σπίτι").isCorrect).toBe(true);
	});

	it("accepts answer without feminine article", () => {
		expect(matchPhonetic("mera", "η μέρα").isCorrect).toBe(true);
		expect(matchPhonetic("h mera", "η μέρα").isCorrect).toBe(true);
	});
});

describe("matchPhonetic — τη article (accusative feminine)", () => {
	it("accepts ti for τη", () => {
		expect(matchPhonetic("ti", "τη").isCorrect).toBe(true);
	});

	it("accepts th for τη", () => {
		expect(matchPhonetic("th", "τη").isCorrect).toBe(true);
	});
});

describe("matchPhonetic — cluster variants", () => {
	it("accepts andras or adras for άντρας", () => {
		expect(matchPhonetic("andras", "άντρας").isCorrect).toBe(true);
		expect(matchPhonetic("adras", "άντρας").isCorrect).toBe(true);
	});

	it("rejects clearly wrong input", () => {
		expect(matchPhonetic("banana", "η μέρα").isCorrect).toBe(false);
		expect(matchPhonetic("spiti", "το σπίτι").isCorrect).toBe(true);
		expect(matchPhonetic("xspiti", "το σπίτι").isCorrect).toBe(false);
	});
});
