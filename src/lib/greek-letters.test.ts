import { describe, expect, it } from "vite-plus/test";

import { stripTonos, withTonos } from "./greek-letters";

describe("stripTonos", () => {
	it("removes the tonos from every accented vowel, either case", () => {
		expect(stripTonos("άέήίόύώ")).toBe("αεηιουω");
		expect(stripTonos("ΆΈΉΊΌΎΏ")).toBe("ΑΕΗΙΟΥΩ");
		expect(stripTonos("ρωτάω")).toBe("ρωταω");
	});

	it("keeps a plain diaeresis", () => {
		expect(stripTonos("τρόλεϊ")).toBe("τρολεϊ");
		expect(stripTonos("προϋπόθεση")).toBe("προϋποθεση");
	});

	it("reduces dialytika with tonos to the dialytika alone", () => {
		expect(stripTonos("ταΐζω")).toBe("ταϊζω");
		expect(stripTonos("ΐ")).toBe("ϊ");
		expect(stripTonos("ΰ")).toBe("ϋ");
	});

	it("returns precomposed letters, so indices still line up with the input", () => {
		for (const word of ["ταΐζω", "προϋπόθεση", "Άνθρωπος", "ρωτάω"]) {
			expect(stripTonos(word)).toHaveLength(word.length);
		}
		expect(stripTonos("ταΐζω")).toBe(stripTonos("ταΐζω").normalize("NFC"));
	});

	it("handles decomposed input the same as precomposed", () => {
		expect(stripTonos("ταΐζω".normalize("NFD"))).toBe("ταϊζω");
	});

	it("drops the diaeresis too when asked for a bare comparison key", () => {
		const bare = { keepDiaeresis: false };
		expect(stripTonos("ταΐζω", bare)).toBe("ταιζω");
		expect(stripTonos("τάισα", bare)).toBe("ταισα");
		expect(stripTonos("τρόλεϊ", bare)).toBe("τρολει");
		expect(stripTonos("Άνθρωπος", bare)).toBe("Ανθρωπος");
	});

	it("leaves unaccented text and non-Greek alone", () => {
		expect(stripTonos("καλημερα")).toBe("καλημερα");
		expect(stripTonos("hello")).toBe("hello");
		expect(stripTonos("")).toBe("");
	});
});

describe("withTonos", () => {
	it("accents each lowercase vowel", () => {
		expect([..."αεηιουω"].map(withTonos).join("")).toBe("άέήίόύώ");
	});

	it("is undefined for consonants and already-accented vowels", () => {
		expect(withTonos("κ")).toBeUndefined();
		expect(withTonos("ά")).toBeUndefined();
	});
});
