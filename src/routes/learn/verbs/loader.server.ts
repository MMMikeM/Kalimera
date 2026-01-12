import {
	getVerbsWithPatterns,
	type VerbWithPattern,
} from "@/db.server/queries/vocabulary";

export type { VerbWithPattern };

export interface VerbSubCategory {
	title: string;
	pattern: string;
	verbs: VerbWithPattern[];
}

export interface VerbCategory {
	id: string;
	title: string;
	verbs: VerbWithPattern[];
	subCategories?: VerbSubCategory[];
}

const DEPONENT_PATTERNS = ["-ομαι", "-άμαι"];

function groupVerbsByPattern(verbs: VerbWithPattern[]): VerbCategory[] {
	const groups: Record<string, VerbCategory> = {};
	const deponentVerbs: Record<string, VerbWithPattern[]> = {
		"-ομαι": [],
		"-άμαι": [],
	};

	for (const verb of verbs) {
		const pattern = verb.pattern || "unknown";

		if (DEPONENT_PATTERNS.includes(pattern)) {
			deponentVerbs[pattern]?.push(verb);
		} else {
			if (!groups[pattern]) {
				groups[pattern] = {
					id: `verb-${pattern.toLowerCase().replace(/\s+/g, "-")}`,
					title: pattern,
					verbs: [],
				};
			}
			groups[pattern]?.verbs.push(verb);
		}
	}

	const result = Object.values(groups);

	const omaiVerbs = deponentVerbs["-ομαι"] ?? [];
	const amaiVerbs = deponentVerbs["-άμαι"] ?? [];
	const totalDeponents = omaiVerbs.length + amaiVerbs.length;
	if (totalDeponents > 0) {
		result.push({
			id: "verb-deponent",
			title: "deponent",
			verbs: [...omaiVerbs, ...amaiVerbs],
			subCategories: [
				{
					title: "Type 1: -ομαι",
					pattern: "-ομαι",
					verbs: omaiVerbs,
				},
				{
					title: "Type 2: -άμαι",
					pattern: "-άμαι",
					verbs: amaiVerbs,
				},
			],
		});
	}

	return result;
}

export async function loader() {
	const verbPatterns = await getVerbsWithPatterns();

	return {
		verbs: {
			categories: groupVerbsByPattern(verbPatterns),
		},
	};
}

export type VerbsLoaderData = Awaited<ReturnType<typeof loader>>;
