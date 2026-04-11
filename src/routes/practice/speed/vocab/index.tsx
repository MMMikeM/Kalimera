import { BookOpen } from "lucide-react";
import { Link } from "react-router";

import { Card } from "@/components/Card";
import { type QuestionCategory } from "@/lib/drill/generate-questions";

const VOCAB_CATEGORIES: {
	id: QuestionCategory;
	label: string;
	preview: string;
}[] = [
	{
		id: "pronouns",
		label: "Pronouns",
		preview: "αὐτὸς, ἐμὸς, ὡς",
	},
	{
		id: "articles",
		label: "Articles",
		preview: "ὁ, ἡ, τό — nominative, accusative, genitive",
	},
	{
		id: "verbs",
		label: "Verbs",
		preview: "λύω, εἴμι, ἵστημι — principal parts and conjugation",
	},
	{
		id: "nouns",
		label: "Nouns",
		preview: "λόγος, δῶρον, γυνή — declension patterns",
	},
];

export default function VocabIndex() {
	return (
		<div className="mx-auto max-w-xl">
			<Card variant="bordered" padding="lg">
				<div className="mb-8 text-center">
					<div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-honey-100">
						<BookOpen size={32} className="text-honey" />
					</div>
					<h2 className="mb-2 text-2xl font-bold text-foreground">Vocabulary Drills</h2>
					<p className="text-muted-foreground">
						Select a category to drill on.
					</p>
				</div>

				<div className="space-y-3">
					{VOCAB_CATEGORIES.map((category) => (
						<Link
							key={category.id}
							to={category.id}
							className="block rounded-lg border border-border p-4 transition-colors hover:border-honey hover:bg-honey-50"
						>
							<div className="mb-1 font-semibold text-foreground">
								{category.label}
							</div>
							<div className="text-sm font-mono text-muted-foreground">
								{category.preview}
							</div>
						</Link>
					))}
				</div>
			</Card>
		</div>
	);
}
