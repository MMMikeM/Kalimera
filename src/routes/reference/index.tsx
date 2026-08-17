import { createFileRoute } from "@tanstack/react-router";

import { type Section, SectionCard } from "@/components/SectionCard";

/** A specimen of the section's own content, in place of a generic icon. */
const Specimen = ({ forms }: { forms: string[] }) => (
	<div
		lang="el"
		className="greek-text flex w-24 flex-col gap-0.5 text-right font-mono text-xs leading-tight text-stone-500"
	>
		{forms.map((form) => (
			<span key={form}>{form}</span>
		))}
	</div>
);

const CARD_STYLE = "bg-stone-100 text-stone-700 border-stone-200";

const sections: Section[] = [
	{
		id: "cases",
		label: "Cases",
		greek: "Πτώσεις",
		description: "The framework for understanding Greek grammar",
		icon: <Specimen forms={["ο φίλος", "τον φίλο", "του φίλου"]} />,
		href: "/reference/cases",
		color: CARD_STYLE,
	},
	{
		id: "pronouns",
		label: "Pronouns",
		greek: "Αντωνυμίες",
		description: "Cases in action - the words you'll use most",
		icon: <Specimen forms={["με", "μου", "εμένα"]} />,
		href: "/reference/pronouns",
		color: CARD_STYLE,
	},
	{
		id: "articles",
		label: "Articles",
		greek: "Άρθρα",
		description: "The definite article and agreement rules",
		icon: <Specimen forms={["ο", "η", "το"]} />,
		href: "/reference/articles",
		color: CARD_STYLE,
	},
	{
		id: "nouns",
		label: "Nouns",
		greek: "Ουσιαστικά",
		description: "Noun declensions by gender and case",
		icon: <Specimen forms={["-ος", "-α", "-ο"]} />,
		href: "/reference/nouns",
		color: CARD_STYLE,
	},
	{
		id: "adjectives",
		label: "Adjectives",
		greek: "Επίθετα",
		description: "Agreement patterns that follow the noun",
		icon: <Specimen forms={["καλός", "καλή", "καλό"]} />,
		href: "/reference/adjectives",
		color: CARD_STYLE,
	},
	{
		id: "prepositions",
		label: "Prepositions",
		greek: "Προθέσεις",
		description: "Connecting words and their case requirements",
		icon: <Specimen forms={["στον", "στη", "στο"]} />,
		href: "/reference/prepositions",
		color: CARD_STYLE,
	},
	{
		id: "verbs",
		label: "Verbs",
		greek: "Ρήματα",
		description: "Conjugation patterns and verb families",
		icon: <Specimen forms={["κάνω", "κάνεις", "κάνει"]} />,
		href: "/reference/verbs",
		color: CARD_STYLE,
	},
	{
		id: "patterns",
		label: "Patterns",
		greek: "Δομές",
		description: "Greek-specific constructions like μου αρέσει",
		icon: <Specimen forms={["μου αρέσει", "με λένε"]} />,
		href: "/reference/patterns",
		color: CARD_STYLE,
	},
];

export const Route = createFileRoute("/reference/")({
	component: ReferenceIndex,
});

function ReferenceIndex() {
	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-bold text-stone-800">Reference</h1>
				<p className="mt-1 text-stone-600">Grammar patterns and paradigms</p>
			</div>

			<div className="grid gap-3">
				{sections.map((section) => (
					<SectionCard key={section.id} section={section} />
				))}
			</div>
		</div>
	);
}
