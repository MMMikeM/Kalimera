import { Link } from "react-router";

const PARADIGMS = [
	{
		id: "articles",
		title: "Definite Articles",
		forms: 18,
		preview: "ο, η, το, τον, την, του, της…",
		color: "honey" as const,
	},
	{
		id: "pronouns",
		title: "Object Pronouns",
		forms: 10,
		preview: "με, σε, τον, την, μας, σας…",
		color: "terracotta" as const,
	},
	{
		id: "possessives",
		title: "Possessive Pronouns",
		forms: 8,
		preview: "μου, σου, του, της, μας…",
		color: "olive" as const,
	},
	{
		id: "contractions",
		title: "Contractions (σε)",
		forms: 6,
		preview: "στον, στην, στο, στους…",
		color: "terracotta" as const,
	},
];

const COLOR_CLASSES = {
	honey: { border: "border-honey/30", text: "text-honey-text", count: "text-honey" },
	terracotta: { border: "border-terracotta/30", text: "text-terracotta-text", count: "text-terracotta" },
	olive: { border: "border-olive/30", text: "text-olive-text", count: "text-olive" },
} as const;

export default function MemoryIndex() {
	return (
		<div className="px-6 py-8 max-w-md">
			<h2 className="font-serif text-2xl text-navy-text mb-1">Memory Drills</h2>
			<p className="text-sm text-muted-foreground mb-8">
				Timed recall for forms that need to become automatic.
			</p>

			<div className="space-y-3">
				{PARADIGMS.map((p) => {
					const c = COLOR_CLASSES[p.color];
					return (
						<Link
							key={p.id}
							to={p.id}
							className={`block px-4 py-3 rounded-lg border ${c.border} hover:bg-cream-dark transition-colors`}
						>
							<div className="flex items-baseline justify-between gap-3">
								<span className={`text-sm font-medium ${c.text}`}>
									{p.title}
								</span>
								<span className={`text-xs tabular-nums ${c.count}`}>
									{p.forms} forms
								</span>
							</div>
							<p
								lang="el"
								className="greek-text text-sm text-muted-foreground mt-1"
							>
								{p.preview}
							</p>
						</Link>
					);
				})}
			</div>
		</div>
	);
}
