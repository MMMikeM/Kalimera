import { describe, expect, it } from "vitest";

import { greekToPhonetic, matchPhonetic } from "./greek-transliteration";

describe("greekToPhonetic", () => {
	it("maps η → h", () => {
		expect(greekToPhonetic("η")).toBe("h");
	});

	it("maps γυ → yi (γυναίκα)", () => {
		expect(greekToPhonetic("γυναίκα")).toBe("yinaika");
	});

	it("maps η γυναίκα → h yinaika", () => {
		expect(greekToPhonetic("η γυναίκα")).toBe("h yinaika");
	});

	it("maps αι → ai", () => {
		expect(greekToPhonetic("αι")).toBe("ai");
	});

	it("maps ω → w", () => {
		expect(greekToPhonetic("ω")).toBe("w");
	});

	it("maps article η correctly", () => {
		expect(greekToPhonetic("η μέρα")).toBe("h mera");
	});

	it("maps ωραίος correctly", () => {
		expect(greekToPhonetic("ωραίος")).toBe("wraios");
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

	it("handles diphthongs: αι → ai", () => {
		expect(greekToPhonetic("και")).toBe("kai");
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
		expect(matchPhonetic("efxaristo", "ευχαριστώ").isCorrect).toBe(true);
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

describe("matchPhonetic — γυναίκα variants", () => {
	it("accepts h yinaika for η γυναίκα", () => {
		expect(matchPhonetic("h yinaika", "η γυναίκα").isCorrect).toBe(true);
	});

	it("accepts i yinaika for η γυναίκα (η as i)", () => {
		expect(matchPhonetic("i yinaika", "η γυναίκα").isCorrect).toBe(true);
	});

	it("accepts yinaika without article", () => {
		expect(matchPhonetic("yinaika", "η γυναίκα").isCorrect).toBe(true);
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

describe("matchPhonetic — ω+η ambiguity (zoi vs zwh)", () => {
	it("accepts h zoi for η ζωή (ω→o, η→i)", () => {
		expect(matchPhonetic("h zoi", "η ζωή").isCorrect).toBe(true);
	});

	it("accepts zoi for ζωή without article", () => {
		expect(matchPhonetic("zoi", "ζωή").isCorrect).toBe(true);
	});

	it("accepts h zwh for η ζωή (canonical form)", () => {
		expect(matchPhonetic("h zwh", "η ζωή").isCorrect).toBe(true);
	});
});

describe("matchPhonetic — cluster variants", () => {
	// medial ντ → nd required; word-initial ντ → d (no nasal)
	it("accepts andras for άντρας", () => {
		expect(matchPhonetic("andras", "άντρας").isCorrect).toBe(true);
	});

	it("rejects adras for άντρας (medial ντ requires nd)", () => {
		expect(matchPhonetic("adras", "άντρας").isCorrect).toBe(false);
	});

	it("accepts pende for πέντε", () => {
		expect(matchPhonetic("pende", "πέντε").isCorrect).toBe(true);
	});

	it("rejects pede for πέντε (medial ντ requires nd)", () => {
		expect(matchPhonetic("pede", "πέντε").isCorrect).toBe(false);
	});

	// letter-faithful spellings: ντ→nt, μπ→mp, γκ→nk accepted alongside voiced nd/mb/ng
	it("accepts ogdonta for ογδόντα (letter-faithful ντ→nt)", () => {
		expect(matchPhonetic("ogdonta", "ογδόντα").isCorrect).toBe(true);
	});

	it("accepts ogdonda for ογδόντα (voiced ντ→nd)", () => {
		expect(matchPhonetic("ogdonda", "ογδόντα").isCorrect).toBe(true);
	});

	it("accepts pente for πέντε (letter-faithful ντ→nt)", () => {
		expect(matchPhonetic("pente", "πέντε").isCorrect).toBe(true);
	});

	it("accepts saranta for σαράντα (letter-faithful ντ→nt)", () => {
		expect(matchPhonetic("saranta", "σαράντα").isCorrect).toBe(true);
	});

	it("accepts antras for άντρας (letter-faithful ντ→nt)", () => {
		expect(matchPhonetic("antras", "άντρας").isCorrect).toBe(true);
	});

	it("accepts lampada for λαμπάδα (letter-faithful μπ→mp)", () => {
		expect(matchPhonetic("lampada", "λαμπάδα").isCorrect).toBe(true);
	});

	it("accepts ankinara for αγκινάρα (letter-faithful γκ→nk)", () => {
		expect(matchPhonetic("ankinara", "αγκινάρα").isCorrect).toBe(true);
	});

	it("accepts anginara for αγκινάρα (voiced γκ→ng)", () => {
		expect(matchPhonetic("anginara", "αγκινάρα").isCorrect).toBe(true);
	});

	// medial μπ → mb required; word-initial μπ → b
	it("accepts lambada for λαμπάδα", () => {
		expect(matchPhonetic("lambada", "λαμπάδα").isCorrect).toBe(true);
	});

	it("rejects labada for λαμπάδα (medial μπ requires mb)", () => {
		expect(matchPhonetic("labada", "λαμπάδα").isCorrect).toBe(false);
	});

	// medial γγ/γκ → ng required
	it("accepts angelos for Άγγελος", () => {
		expect(matchPhonetic("angelos", "Άγγελος").isCorrect).toBe(true);
	});

	it("rejects agelos for Άγγελος (γγ requires ng)", () => {
		expect(matchPhonetic("agelos", "Άγγελος").isCorrect).toBe(false);
	});

	it("should", () => {
		expect(matchPhonetic("h thoulia", "η δουλειά").isCorrect).toBe(true);
	});

	it("rejects clearly wrong input", () => {
		expect(matchPhonetic("banana", "η μέρα").isCorrect).toBe(false);
		expect(matchPhonetic("spiti", "το σπίτι").isCorrect).toBe(true);
		expect(matchPhonetic("xspiti", "το σπίτι").isCorrect).toBe(false);
	});

	// ξ = "ks"; users may type "x" instead
	it("accepts exi for έξι", () => {
		expect(matchPhonetic("exi", "έξι").isCorrect).toBe(true);
	});

	it("accepts eksi for έξι", () => {
		expect(matchPhonetic("eksi", "έξι").isCorrect).toBe(true);
	});

	// υ sounds like "i"; users may type "u" instead
	it("accepts duo for δύο", () => {
		expect(matchPhonetic("duo", "δύο").isCorrect).toBe(true);
	});

	it("accepts dio for δύο", () => {
		expect(matchPhonetic("dio", "δύο").isCorrect).toBe(true);
	});
});
