const PERSON_ENDINGS = [
	"ομαι", "εσαι", "εται", "ομαστε", "όμαστε", "εστε", "ονται",
	"αμαι", "ασαι", "αται", "ουνται",
	"ουμε", "ετε", "ουν", "εις", "ει", "ω",
	"αμε", "ατε", "αν", "ες", "ε", "α",
	"άμε", "άτε", "άνε", "άς", "άει", "άω",
	"ήκαμε", "ήκατε", "ηκαν", "ηκες", "ηκε", "ηκα",
] as const;

const plain = (s: string): string =>
	s
		.normalize("NFD")
		.replace(/[̀-ͯ]/g, "")
		.toLowerCase();

/** Whatever is left once a person ending comes off — the part that should hold still. */
const stemOf = (form: string): string => {
	const bare = plain(form).replace(/^θα\s+/, "");
	for (const ending of PERSON_ENDINGS) {
		const e = plain(ending);
		if (bare.length > e.length && bare.endsWith(e)) return bare.slice(0, -e.length);
	}
	return bare;
};

const PERSON_ORDER = ["sg1", "sg2", "sg3", "pl1", "pl2", "pl3"];

/**
 * Which cells in a tense actually surprise you: the ones whose stem walked away
 * from the first-person stem (κάναμε drops the augment of έκανα, πας is not πάεις).
 * Everything else you could have written yourself, so it should not compete for attention.
 */
export const deviatingPersons = (forms: Record<string, string>): string[] => {
	const anchor = forms.sg1;
	if (!anchor) return [];
	const anchorStem = stemOf(anchor);
	return Object.entries(forms)
		.filter(([person, form]) => person !== "sg1" && stemOf(form) !== anchorStem)
		.map(([person]) => person)
		.sort((a, b) => PERSON_ORDER.indexOf(a) - PERSON_ORDER.indexOf(b));
};
