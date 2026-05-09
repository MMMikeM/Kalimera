import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

const SECTIONS = [
	{ href: "/practice/cases", label: "The case system", thesis: "Articles, nouns, adjectives — Doer / Target / Owner." },
	{ href: "/practice/pronouns", label: "Pronouns", thesis: "Object forms, possessives, where they sit." },
	{ href: "/practice/verbs", label: "Verbs", thesis: "Present, past, future, να, commands." },
	{ href: "/practice/blocks", label: "Building blocks", thesis: "Survival phrases, numbers, days." },
];

export default function PracticeIndex() {
	return (
		<div className="mx-auto max-w-2xl">
			<ul className="divide-y divide-border">
				{SECTIONS.map((s) => (
					<li key={s.href}>
						<Link
							to={s.href}
							className="flex items-baseline justify-between gap-4 py-5 transition-colors hover:bg-muted/50"
						>
							<div className="min-w-0 flex-1">
								<h3 className="mb-1 font-serif text-xl font-semibold text-navy-text">{s.label}</h3>
								<p className="text-sm text-muted-foreground">{s.thesis}</p>
							</div>
							<ArrowRight size={16} className="shrink-0 text-muted-foreground" />
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
