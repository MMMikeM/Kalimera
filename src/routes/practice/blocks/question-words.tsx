import { createFileRoute } from "@tanstack/react-router";

import { greekToPhonetic } from "@/lib/greek-transliteration";

import type { SimpleListItem } from "../components/engines/deck";
import { Drill } from "../components/engines/drill";

const item = (
	id: string,
	greek: string,
	english: string,
	label: string,
	category: string,
): SimpleListItem => ({
	id,
	greek,
	greeklish: greekToPhonetic(greek),
	english,
	label,
	category,
});

const QUESTION_WORDS: SimpleListItem[] = [
	// Invariable — daily, no morphology
	item("qw-ti", "τι", "what?", "what?", "basics"),
	item("qw-pou", "πού", "where?", "where?", "basics"),
	item("qw-pote", "πότε", "when?", "when?", "basics"),
	item("qw-pos", "πώς", "how?", "how?", "basics"),
	item("qw-giati", "γιατί", "why?", "why?", "basics"),

	// ποιος — agrees with the noun's gender (the part that trips people up)
	item("qw-poios", "ποιος", "who / which?", "which? (about a he-word)", "which"),
	item("qw-poia", "ποια", "who / which?", "which? (about a she-word)", "which"),
	item("qw-poio", "ποιο", "which?", "which? (about an it-word)", "which"),
	item("qw-poion", "ποιον", "whom / which?", "which? (he-word, after a verb)", "which"),
	item("qw-poioi", "ποιοι", "which ones?", "which ones? (he-words)", "which"),
	item("qw-poies", "ποιες", "which ones?", "which ones? (she-words)", "which"),
	item("qw-poia-pl", "ποια", "which ones?", "which ones? (it-words)", "which"),
	item("qw-poianou", "ποιανού", "whose?", "whose?", "which"),

	// πόσος — how much / how many, also agrees with gender
	item("qw-poso", "πόσο", "how much?", "how much?", "how-many"),
	item("qw-posos", "πόσος", "how much? (he-word)", "how much? (he-word, e.g. coffee)", "how-many"),
	item("qw-posi", "πόση", "how much? (she-word)", "how much? (she-word, e.g. sugar)", "how-many"),
	item("qw-posoi", "πόσοι", "how many? (he-words)", "how many? (he-words)", "how-many"),
	item("qw-poses", "πόσες", "how many? (she-words)", "how many? (she-words)", "how-many"),
	item("qw-posa", "πόσα", "how many? (it-words)", "how many? (it-words)", "how-many"),
];

const CATEGORIES = [
	{ id: "basics", label: "Basics" },
	{ id: "which", label: "Which? (ποιος)" },
	{ id: "how-many", label: "How many? (πόσος)" },
];

const PARADIGM: { label: string; forms: [string, string, string] }[] = [
	{ label: "he-word (m)", forms: ["ποιος", "ποιον", "ποιοι"] },
	{ label: "she-word (f)", forms: ["ποια", "ποια", "ποιες"] },
	{ label: "it-word (n)", forms: ["ποιο", "ποιο", "ποια"] },
];

const Paradigm = () => (
	<div className="mb-6 overflow-x-auto">
		<p className="mb-2 text-xs tracking-widest text-muted-foreground uppercase">ποιος agrees</p>
		<table className="w-full border-collapse text-sm">
			<thead>
				<tr>
					<th className="py-1 pr-4 text-left text-xs font-normal text-muted-foreground" />
					<th className="px-3 py-1 text-center text-xs font-medium text-muted-foreground">Doer</th>
					<th className="px-3 py-1 text-center text-xs font-medium text-muted-foreground">
						Target
					</th>
					<th className="px-3 py-1 text-center text-xs font-medium text-muted-foreground">
						Plural
					</th>
				</tr>
			</thead>
			<tbody>
				{PARADIGM.map((row) => (
					<tr key={row.label} className="border-t border-stone-100">
						<td className="py-1.5 pr-4 text-xs font-medium text-terracotta-text">{row.label}</td>
						{row.forms.map((form, i) => (
							<td
								key={`${row.label}-${i}`}
								lang="el"
								className="greek-text px-3 py-1.5 text-center text-base text-foreground"
							>
								{form}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	</div>
);

export const Route = createFileRoute("/practice/blocks/question-words")({
	component: QuestionWordsDrill,
});

function QuestionWordsDrill() {
	return (
		<Drill
			drillId="blocks-question-words"
			items={QUESTION_WORDS}
			title="Question words"
			subtitle={`${QUESTION_WORDS.length} forms / timed`}
			colorTheme="terracotta"
			backTo="/practice/blocks"
			forwardDesc="English → Greek"
			reverseDesc="Greek → recall meaning (self-assess)"
			categories={CATEGORIES}
			configExtras={<Paradigm />}
		/>
	);
}
