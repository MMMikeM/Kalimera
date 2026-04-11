import { Brain } from "lucide-react";
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

const COLOR_STYLES = {
	honey: {
		textColor: "#4a3508",
		countColor: "#d4a853",
		hoverBgColor: "#faf7ec",
	},
	terracotta: {
		textColor: "#5c2d14",
		countColor: "#c4663f",
		hoverBgColor: "#fbf6f1",
	},
	olive: {
		textColor: "#2a3622",
		countColor: "#8a9a78",
		hoverBgColor: "#f8f9f6",
	},
} as const;

export default function MemoryIndex() {
	return (
		<div className="mx-auto max-w-xl">
			<Card variant="bordered" padding="lg">
				<div className="mb-8 flex flex-col">
					<div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-honey-100">
						<Brain size={32} className="text-honey" />
					</div>
					<h2 className="mb-2 font-serif text-xl font-semibold text-navy-text">Memory Drills</h2>
					<p className="text-sm text-muted-foreground">
						Paradigm recall. Timed to surface the forms that need more work.
					</p>
				</div>

				<div className="space-y-3">
					{PARADIGMS.map((p) => {
						const colors = COLOR_STYLES[p.color];
						return (
							<Link
								key={p.id}
								to={p.id}
								className="hover:bg-opacity-50 block rounded-lg border border-border p-4 transition-colors"
								style={{
									backgroundColor: "transparent",
								}}
								onMouseEnter={(e) => {
									(e.currentTarget as HTMLElement).style.backgroundColor = colors.hoverBgColor;
								}}
								onMouseLeave={(e) => {
									(e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
								}}
							>
								<div className="mb-1 flex items-baseline justify-between gap-3">
									<span className="text-sm font-medium" style={{ color: colors.textColor }}>
										{p.title}
									</span>
									<span className="text-xs tabular-nums" style={{ color: colors.countColor }}>
										{p.forms} forms
									</span>
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
