/**
 * Which bucket a verb falls into for learning purposes, judged on the aorist:
 * the present is regular for nearly every Greek verb, so it is the past that
 * decides whether you memorise a verb or just apply a rule.
 */
export type AoristClass =
	| "psi"
	| "ksi"
	| "sigma"
	| "zo"
	| "zo-exception"
	| "contracted"
	| "deponent"
	| "irregular";

const plain = (s: string): string =>
	s
		.normalize("NFD")
		.replace(/[̀-ͯ]/g, "")
		.toLowerCase();

/**
 * Present stem back to its last stable vowel: every trailing consonant can merge
 * into σ (ψάχνω → έψαξα), and the υ of -εύω goes with them (δουλεύω → δούλεψα).
 */
const presentRoot = (present: string): string =>
	plain(present)
		.replace(/(ομαι|αμαι|ω)$/, "")
		.replace(/[^αεηιουω]+$/, "")
		.replace(/(?<=ε)υ$/, "");

/** Aorist minus its ending, with and without a leading augment — έλπισα belongs to ελπίζω, not λπίζω. */
const aoristRoots = (aorist: string): string[] => {
	const body = plain(aorist).replace(/(ψα|ξα|σα|θηκα|τηκα|ηκα|α)$/, "");
	return [body, body.replace(/^[εη]/, "")];
};

/** A rule only applies if the stem survived it — δίνω → έδωσα ends in -σα but is not regular. */
const stemSurvives = (present: string, aorist: string): boolean => {
	const root = presentRoot(present);
	return root.length === 0 || aoristRoots(aorist).some((candidate) => candidate.startsWith(root));
};

export const classifyAorist = (present: string, aorist: string): AoristClass => {
	const p = plain(present);
	const a = plain(aorist);

	if (/(ομαι|αμαι|ιεμαι)$/.test(p)) return /(θηκα|τηκα|ηκα)$/.test(a) ? "deponent" : "irregular";

	if (p.endsWith("ζω")) {
		if (a.endsWith("σα") && stemSurvives(present, aorist)) return "zo";
		if (a.endsWith("ξα") && stemSurvives(present, aorist)) return "zo-exception";
		return "irregular";
	}

	// Contracted first: -άω also matches the vowel-stem test below.
	if (/(αω|ω)$/.test(p) && /(ησα|εσα|ασα)$/.test(a)) return "contracted";

	if (!stemSurvives(present, aorist)) return "irregular";
	if (/(πω|βω|φω|ευω)$/.test(p) && a.endsWith("ψα")) return "psi";
	if (/(κω|γω|χω|χνω)$/.test(p) && a.endsWith("ξα")) return "ksi";
	if (/(νω|ωνω)$/.test(p) && a.endsWith("σα")) return "sigma";
	if (/[αεηιου]ω$/.test(p) && a.endsWith("σα")) return "sigma";

	return "irregular";
};
