import { createFileRoute } from "@tanstack/react-router";

import { type CaseRoleName, ROLE_SCHEME, SCHEME } from "@/constants/grammar-palette";

import type { SimpleListItem } from "../../components/engines/deck";
import { Drill } from "../../components/engines/drill";
import { PHRASES as TARGET } from "../accusative/phrase";
import { PHRASES as OWNER } from "../genitive/phrase";
import { PHRASES as DOER } from "../nominative/phrase";

// Cross-case noun-phrase review.
// Concatenates the three case-phase phrase drills, re-tags items by case.
// Forward: English → article + adjective + noun in indicated case.
// Reverse: show phrase → tap which case it's in.

const tagCase = (items: SimpleListItem[], caseTag: string, idPrefix: string): SimpleListItem[] =>
	items.map((p) => ({
		...p,
		id: `${idPrefix}-${p.id}`,
		category: caseTag,
		dimension: caseTag,
	}));

const ITEMS: SimpleListItem[] = [
	...tagCase(DOER, "doer", "doer"),
	...tagCase(TARGET, "target", "target"),
	...tagCase(OWNER, "owner", "owner"),
];

const CATEGORIES: Array<{ id: CaseRoleName; label: string }> = [
	{ id: "doer", label: "Doer" },
	{ id: "target", label: "Target" },
	{ id: "owner", label: "Owner" },
];

const DIMENSION_OPTIONS = CATEGORIES.map(({ id, label }) => {
	const scheme = SCHEME[ROLE_SCHEME[id]];
	return { id, label, selectorBg: scheme.bg, selectorText: scheme.text };
});

export const Route = createFileRoute("/practice/cases/review/phrases")({
	component: AllPhrasesDrill,
});

function AllPhrasesDrill() {
	return (
		<Drill
			drillId="nominal-all-phrases"
			items={ITEMS}
			subtitle={`${ITEMS.length} noun phrases / mixed case / timed`}
			colorTheme="honey"
			forwardDesc="English → article + adjective + noun (any case)"
			reverseLabel="Greek → case"
			reverseDesc="Phrase → select case"
			categories={CATEGORIES}
			reverse={{
				kind: "single-select",
				options: DIMENSION_OPTIONS,
			}}
		/>
	);
}
