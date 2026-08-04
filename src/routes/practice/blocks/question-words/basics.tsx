import { createFileRoute } from "@tanstack/react-router";

import { greekToPhonetic } from "@/lib/greek-transliteration";

import type { SimpleListItem } from "../../components/engines/deck";
import { Drill } from "../../components/engines/drill";

const item = (id: string, greek: string, english: string, label: string): SimpleListItem => ({
	id,
	greek,
	greeklish: greekToPhonetic(greek),
	english,
	label,
});

// Accents distinguish questions from clitics: πού/πώς ask, που/πως connect.
export const BASICS: SimpleListItem[] = [
	item("qw-ti", "τι", "what?", "what?"),
	item("qw-pou", "πού", "where?", "where?"),
	item("qw-pote", "πότε", "when?", "when?"),
	item("qw-pos", "πώς", "how?", "how?"),
	item("qw-giati", "γιατί", "why?", "why?"),
];

export const Route = createFileRoute("/practice/blocks/question-words/basics")({
	component: BasicsDrill,
});

function BasicsDrill() {
	return (
		<Drill
			drillId="blocks-qw-basics"
			items={BASICS}
			title="The five invariables"
			subtitle="5 words that never change / timed"
			colorTheme="terracotta"
			backTo="/practice/blocks/question-words/"
			forwardDesc="English → Greek"
			reverseDesc="Greek → recall meaning (self-assess)"
		/>
	);
}
