import type { PatternId } from "@/lib/units";

export interface Pattern {
	/** A plain-English handle, never a grammar term. */
	name: string;
	/** The rule in one line, shown above the pattern's table. */
	rule: string;
	/** Words that break the rule, each with the reason. Marked in the table. */
	breaks: Record<string, string>;
	guide: { slug: string; section: string };
}

export const PATTERNS: Record<PatternId, Pattern> = {
	"persons-singular": {
		name: "I, you, he/she",
		rule: "Most verbs swap their last sound: -ω for I, -εις for you, -ει for he or she.",
		breaks: {
			πάω: "πας, πάει: it drops the ε, like τρώω and λέω.",
			έρχομαι: "Verbs ending in -μαι have their own set: -μαι, -σαι, -ται.",
			μπορώ: "The stress sits on the ending: -ώ, -είς, -εί.",
		},
		guide: { slug: "verbs", section: "present" },
	},
	"target-form": {
		name: "What the action touches",
		rule: "After a verb, ο becomes τον and the noun drops its -ς. η becomes την or τη. το stays το.",
		breaks: {},
		guide: { slug: "roles", section: "target" },
	},
	"saying-no": {
		name: "Saying no",
		rule: "Put δεν in front of the verb. Nothing else changes.",
		breaks: {},
		guide: { slug: "scales", section: "not-words" },
	},
};
