import { Link } from "react-router";

import { Card } from "@/components/Card";

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
	honey: {
		border: "hover:border-honey",
		hover: "hover:bg-honey-50",
		text: "text-honey-text",
		count: "text-honey",
	},
	terracotta: {
		border: "hover:border-terracotta",
		hover: "hover:bg-terracotta-50",
		text: "text-terracotta-text",
		count: "text-terracotta",
	},
	olive: {
		border: "hover:border-olive",
		hover: "hover:bg-olive-50",
		text: "text-olive-text",
		count: "text-olive",
	},
} as const;

export default function MemoryIndex() {
	return (
		<div className="mx-auto max-w-xl">
			<Card variant="bordered" padding="lg">
				<div className="mb-8">
					<h2 className="mb-2 text-2xl font-bold text-foreground">Memory Drills</h2>
					<p className="text-muted-foreground">
						Paradigm recall. Timed to surface the forms that need more work.
					</p>
				</div>

				<div className="space-y-3">
					{PARADIGMS.map((p) => {
						const c = COLOR_CLASSES[p.color];
						return (
							<Link
								key={p.id}
								to={p.id}
								className={`block rounded-lg border border-border p-4 transition-colors ${c.border} ${c.hover}`}
							>
								<div className="mb-1 flex items-baseline justify-between gap-3">
									<span className={`text-sm font-medium ${c.text}`}>{p.title}</span>
									<span className={`text-xs tabular-nums ${c.count}`}>{p.forms} forms</span>
								</div>
								<p lang="el" className="greek-text text-sm text-muted-foreground">
									{p.preview}
								</p>
							</Link>
						);
					})}
				</div>
			</Card>
		</div>
	);
}
