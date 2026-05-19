import { describe, expect, it } from "vitest";

import { generateConjugations } from "./generate-conjugations";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const present = (r: ReturnType<typeof generateConjugations>) =>
	r.find((c) => c.tense === "present")!.forms;
const aorist = (r: ReturnType<typeof generateConjugations>) =>
	r.find((c) => c.tense === "aorist")!.forms;
const pc = (r: ReturnType<typeof generateConjugations>) =>
	r.find((c) => c.tense === "past_continuous")!.forms;
const future = (r: ReturnType<typeof generateConjugations>) =>
	r.find((c) => c.tense === "future")!.forms;

// ─── -ω verbs ─────────────────────────────────────────────────────────────────

describe("-ω verbs", () => {
	it("κλείνω — short aorist stem gets ε-augment", () => {
		const r = generateConjugations("κλείνω", "κλεισ", "-ω");
		expect(present(r)).toEqual({ sg1: "κλείνω", sg2: "κλείνεις", sg3: "κλείνει", pl1: "κλείνουμε", pl2: "κλείνετε", pl3: "κλείνουν" });
		expect(aorist(r)).toEqual({ sg1: "έκλεισα", sg2: "έκλεισες", sg3: "έκλεισε", pl1: "κλείσαμε", pl2: "κλείσατε", pl3: "έκλεισαν" });
		expect(pc(r)).toEqual({ sg1: "έκλεινα", sg2: "έκλεινες", sg3: "έκλεινε", pl1: "κλείναμε", pl2: "κλείνατε", pl3: "έκλειναν" });
		expect(future(r)).toEqual({ sg1: "θα κλείσω", sg2: "θα κλείσεις", sg3: "θα κλείσει", pl1: "θα κλείσουμε", pl2: "θα κλείσετε", pl3: "θα κλείσουν" });
	});

	it("τελειώνω — polysyllabic, accent shifts to antepenult in past forms", () => {
		const r = generateConjugations("τελειώνω", "τελειωσ", "-ω");
		expect(present(r)).toEqual({ sg1: "τελειώνω", sg2: "τελειώνεις", sg3: "τελειώνει", pl1: "τελειώνουμε", pl2: "τελειώνετε", pl3: "τελειώνουν" });
		expect(aorist(r)).toEqual({ sg1: "τελείωσα", sg2: "τελείωσες", sg3: "τελείωσε", pl1: "τελειώσαμε", pl2: "τελειώσατε", pl3: "τελείωσαν" });
		expect(pc(r)).toEqual({ sg1: "τελείωνα", sg2: "τελείωνες", sg3: "τελείωνε", pl1: "τελειώναμε", pl2: "τελειώνατε", pl3: "τελείωναν" });
		expect(future(r)).toEqual({ sg1: "θα τελειώσω", sg2: "θα τελειώσεις", sg3: "θα τελειώσει", pl1: "θα τελειώσουμε", pl2: "θα τελειώσετε", pl3: "θα τελειώσουν" });
	});

	it("κόβω — short stem ε-augment in past", () => {
		const r = generateConjugations("κόβω", "κοψ", "-ω");
		expect(present(r)).toEqual({ sg1: "κόβω", sg2: "κόβεις", sg3: "κόβει", pl1: "κόβουμε", pl2: "κόβετε", pl3: "κόβουν" });
		expect(aorist(r)).toEqual({ sg1: "έκοψα", sg2: "έκοψες", sg3: "έκοψε", pl1: "κόψαμε", pl2: "κόψατε", pl3: "έκοψαν" });
		expect(pc(r)).toEqual({ sg1: "έκοβα", sg2: "έκοβες", sg3: "έκοβε", pl1: "κόβαμε", pl2: "κόβατε", pl3: "έκοβαν" });
		expect(future(r)).toEqual({ sg1: "θα κόψω", sg2: "θα κόψεις", sg3: "θα κόψει", pl1: "θα κόψουμε", pl2: "θα κόψετε", pl3: "θα κόψουν" });
	});

	it("αγοράζω — polysyllabic, accent at antepenult in past", () => {
		const r = generateConjugations("αγοράζω", "αγορασ", "-ω");
		expect(present(r).sg1).toBe("αγοράζω");
		expect(aorist(r)).toEqual({ sg1: "αγόρασα", sg2: "αγόρασες", sg3: "αγόρασε", pl1: "αγοράσαμε", pl2: "αγοράσατε", pl3: "αγόρασαν" });
		expect(pc(r).sg1).toBe("αγόραζα");
		expect(pc(r).pl1).toBe("αγοράζαμε");
		expect(future(r).sg1).toBe("θα αγοράσω");
	});
});

// ─── -άω/-ώ verbs ─────────────────────────────────────────────────────────────

describe("-άω/-ώ verbs", () => {
	it("ρωτάω (-άω type)", () => {
		const r = generateConjugations("ρωτάω", "ρωτησ", "-άω/-ώ");
		expect(present(r)).toEqual({ sg1: "ρωτάω", sg2: "ρωτάς", sg3: "ρωτάει", pl1: "ρωτάμε", pl2: "ρωτάτε", pl3: "ρωτάνε" });
		expect(aorist(r)).toEqual({ sg1: "ρώτησα", sg2: "ρώτησες", sg3: "ρώτησε", pl1: "ρωτήσαμε", pl2: "ρωτήσατε", pl3: "ρώτησαν" });
		expect(pc(r)).toEqual({ sg1: "ρωτούσα", sg2: "ρωτούσες", sg3: "ρωτούσε", pl1: "ρωτούσαμε", pl2: "ρωτούσατε", pl3: "ρωτούσαν" });
		expect(future(r)).toEqual({ sg1: "θα ρωτήσω", sg2: "θα ρωτήσεις", sg3: "θα ρωτήσει", pl1: "θα ρωτήσουμε", pl2: "θα ρωτήσετε", pl3: "θα ρωτήσουν" });
	});

	it("γελάω (-άω type)", () => {
		const r = generateConjugations("γελάω", "γελασ", "-άω/-ώ");
		expect(present(r).sg1).toBe("γελάω");
		expect(aorist(r)).toEqual({ sg1: "γέλασα", sg2: "γέλασες", sg3: "γέλασε", pl1: "γελάσαμε", pl2: "γελάσατε", pl3: "γέλασαν" });
		expect(pc(r).sg1).toBe("γελούσα");
		expect(future(r).sg1).toBe("θα γελάσω");
	});

	it("προσπαθώ (-ώ contracted type)", () => {
		const r = generateConjugations("προσπαθώ", "προσπαθησ", "-άω/-ώ");
		expect(present(r)).toEqual({ sg1: "προσπαθώ", sg2: "προσπαθείς", sg3: "προσπαθεί", pl1: "προσπαθούμε", pl2: "προσπαθείτε", pl3: "προσπαθούν" });
		expect(aorist(r)).toEqual({ sg1: "προσπάθησα", sg2: "προσπάθησες", sg3: "προσπάθησε", pl1: "προσπαθήσαμε", pl2: "προσπαθήσατε", pl3: "προσπάθησαν" });
		expect(pc(r).sg1).toBe("προσπαθούσα");
		expect(future(r).sg1).toBe("θα προσπαθήσω");
		expect(future(r).pl1).toBe("θα προσπαθήσουμε");
	});
});

// ─── -άμαι verbs ──────────────────────────────────────────────────────────────

describe("-άμαι verbs", () => {
	it("κοιμάμαι", () => {
		const r = generateConjugations("κοιμάμαι", "κοιμ", "-άμαι");
		expect(present(r)).toEqual({ sg1: "κοιμάμαι", sg2: "κοιμάσαι", sg3: "κοιμάται", pl1: "κοιμόμαστε", pl2: "κοιμάστε", pl3: "κοιμούνται" });
		expect(aorist(r)).toEqual({ sg1: "κοιμήθηκα", sg2: "κοιμήθηκες", sg3: "κοιμήθηκε", pl1: "κοιμηθήκαμε", pl2: "κοιμηθήκατε", pl3: "κοιμήθηκαν" });
		expect(pc(r)).toEqual({ sg1: "κοιμόμουν", sg2: "κοιμόσουν", sg3: "κοιμόταν", pl1: "κοιμόμαστε", pl2: "κοιμόσαστε", pl3: "κοιμόνταν" });
		expect(future(r)).toEqual({ sg1: "θα κοιμηθώ", sg2: "θα κοιμηθείς", sg3: "θα κοιμηθεί", pl1: "θα κοιμηθούμε", pl2: "θα κοιμηθείτε", pl3: "θα κοιμηθούν" });
	});

	it("θυμάμαι", () => {
		const r = generateConjugations("θυμάμαι", "θυμ", "-άμαι");
		expect(present(r).sg1).toBe("θυμάμαι");
		expect(aorist(r).sg1).toBe("θυμήθηκα");
		expect(future(r).sg1).toBe("θα θυμηθώ");
	});
});
