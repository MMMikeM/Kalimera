import { type ContentColorScheme, ContentSection } from "@/components/ContentSection";
import { cn } from "@/lib/utils";

import type { PhraseItem, PhrasesLoaderData } from "../$tab";
import { GreekText } from "@/components/GreekText";

export type { PhraseItem, PhrasesLoaderData };

const textColors: Record<ContentColorScheme, string> = {
	ocean: "text-ocean-800",
	terracotta: "text-terracotta-800",
	sunset: "text-sunset-800",
	olive: "text-olive-800",
	honey: "text-honey-800",
	navy: "text-navy-800",
	slate: "text-slate-800",
	masculine: "text-navy-800",
	feminine: "text-sunset-800",
	neuter: "text-slate-700",
	stone: "text-stone-800",
};

const PhraseItemDisplay: React.FC<{
	greek: string;
	english: string;
	variant?: "default" | "highlighted";
	colorScheme?: ContentColorScheme;
}> = ({ greek, english, variant = "default", colorScheme = "honey" }) => (
	<div className="grid grid-cols-2 items-center gap-x-4 py-2.5 pl-3">
		<GreekText
			tone="inherit"
			className={cn(
				"text-lg font-semibold",
				variant === "highlighted" && "rounded border border-stone-200 bg-white px-2 py-1",
				textColors[colorScheme],
			)}
		>
			{greek}
		</GreekText>
		<span className="text-sm text-stone-500">{english}</span>
	</div>
);

const PhraseSection: React.FC<{
	title: string;
	colorScheme: ContentColorScheme;
	children: React.ReactNode;
}> = ({ title, colorScheme, children }) => (
	<ContentSection title={title} colorScheme={colorScheme}>
		<div className="divide-y divide-stone-200/60">{children}</div>
	</ContentSection>
);

export function PhraseList({
	title,
	colorScheme,
	phrases,
	alwaysShow = false,
}: {
	title: string;
	colorScheme: ContentColorScheme;
	phrases: PhraseItem[];
	alwaysShow?: boolean;
}) {
	if (!alwaysShow && phrases.length === 0) return null;
	return (
		<PhraseSection title={title} colorScheme={colorScheme}>
			{phrases.map((phrase) => (
				<PhraseItemDisplay
					key={phrase.id}
					greek={phrase.greekText}
					english={phrase.englishTranslation}
					colorScheme={colorScheme}
				/>
			))}
		</PhraseSection>
	);
}
