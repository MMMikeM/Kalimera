import React from "react";
import { MonoText } from "@/components/MonoText";
import { ContentSection, type ContentColorScheme } from "@/components/ContentSection";
import { cn } from "@/lib/utils";

// Re-export types from data.server - single source of truth
export type { PhraseItem, PhrasesLoaderData } from "./data.server";

const textColors: Record<ContentColorScheme, string> = {
	ocean: "text-ocean-800",
	terracotta: "text-terracotta-800",
	olive: "text-olive-800",
	honey: "text-honey-800",
};

export const PhraseItemDisplay: React.FC<{
	greek: string;
	english: string;
	variant?: "default" | "highlighted";
	colorScheme?: ContentColorScheme;
}> = ({ greek, english, variant = "default", colorScheme = "honey" }) => (
	<div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-center gap-x-4 py-2.5 pl-3">
		<MonoText variant={variant} size="md" className={cn("text-lg font-semibold", textColors[colorScheme])}>
			{greek}
		</MonoText>
		<span className="text-stone-500 text-sm">{english}</span>
	</div>
);

export const PhraseSection: React.FC<{
	title: string;
	colorScheme: ContentColorScheme;
	children: React.ReactNode;
}> = ({ title, colorScheme, children }) => (
	<ContentSection title={title} colorScheme={colorScheme}>
		<div className="divide-y divide-stone-200/60">
			{React.Children.map(children, (child) =>
				React.isValidElement(child)
					? React.cloneElement(child as React.ReactElement<{ colorScheme?: ContentColorScheme }>, { colorScheme })
					: child
			)}
		</div>
	</ContentSection>
);
