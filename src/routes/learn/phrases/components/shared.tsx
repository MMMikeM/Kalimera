import type { LucideIcon } from "lucide-react";

import {
	type ContentColorScheme,
	ContentSection,
	TwoColumnList,
} from "@/components/ContentSection";
import { GreekText } from "@/components/GreekText";
import type { NavTab } from "@/components/NavTabs";
import { TabHero } from "@/components/TabHero";
import type { Vocabulary } from "@/server/db/types";

import { TimeTellingSection } from "./time-telling-section";

export type PhraseItem = Vocabulary;

type PhraseSectionConfig =
	| {
			tag: string;
			title: string;
			colorScheme: ContentColorScheme;
			alwaysShow?: boolean;
			layout?: "list";
	  }
	| { tag: string; layout: "time" };

export interface PhraseTabConfig {
	label: string;
	Icon: LucideIcon;
	navColor: NonNullable<NavTab["color"]>;
	hero: {
		title: string;
		greekPhrase: string;
		colorScheme: "ocean" | "terracotta" | "olive" | "honey";
		body: string;
	};
	sections: PhraseSectionConfig[];
}

const textColors: Record<ContentColorScheme, string> = {
	ocean: "text-ocean-800",
	terracotta: "text-terracotta-800",
	sunset: "text-sunset-800",
	olive: "text-olive-800",
	honey: "text-honey-800",
	navy: "text-navy-800",
	slate: "text-slate-800",
	stone: "text-stone-800",
};

const PhraseList = ({
	title,
	colorScheme,
	phrases,
	alwaysShow = false,
}: {
	title: string;
	colorScheme: ContentColorScheme;
	phrases: PhraseItem[];
	alwaysShow?: boolean;
}) => {
	if (!alwaysShow && phrases.length === 0) return null;
	return (
		<ContentSection title={title} colorScheme={colorScheme}>
			<TwoColumnList
				items={phrases.map((p) => ({
					id: p.id,
					primary: p.greekText,
					secondary: p.englishTranslation,
				}))}
				renderPrimary={(item) => (
					<GreekText tone="inherit" className={`text-lg font-semibold ${textColors[colorScheme]}`}>
						{item.primary}
					</GreekText>
				)}
			/>
		</ContentSection>
	);
};

export const PhraseTabContent = ({
	config,
	phrases,
}: {
	config: PhraseTabConfig;
	phrases: Record<string, PhraseItem[]>;
}) => (
	<div className="space-y-6">
		<TabHero
			title={config.hero.title}
			greekPhrase={config.hero.greekPhrase}
			colorScheme={config.hero.colorScheme}
			icon={<config.Icon size={18} />}
		>
			{config.hero.body}
		</TabHero>

		{config.sections.map((section) =>
			section.layout === "time" ? (
				<TimeTellingSection key={section.tag} items={phrases[section.tag] ?? []} />
			) : (
				<PhraseList
					key={section.tag}
					title={section.title}
					colorScheme={section.colorScheme}
					phrases={phrases[section.tag] ?? []}
					alwaysShow={section.alwaysShow}
				/>
			),
		)}
	</div>
);
