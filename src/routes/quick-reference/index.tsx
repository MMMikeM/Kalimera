import { BookOpen, GitBranch, MessageSquare, Users } from "lucide-react";
import type React from "react";
import { useSearchParams } from "react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { CasesSection } from "./cases-section";
import { PronounsSection } from "./pronouns-section";
import { AgreementSection, MovableNuSection } from "./agreement-section";
import { PrepositionsSection } from "./prepositions-section";
import { VerbsSection } from "./verbs-section";

type TabConfig = {
	id: string;
	label: string;
	shortLabel: string;
	icon: React.ReactNode;
	content: React.ReactNode;
};

const TABS: TabConfig[] = [
	{
		id: "cases-pronouns",
		label: "Cases & Pronouns",
		shortLabel: "Pronouns",
		icon: <Users size={16} />,
		content: (
			<div className="space-y-8">
				<CasesSection />
				<PronounsSection />
			</div>
		),
	},
	{
		id: "nouns-articles",
		label: "Nouns & Articles",
		shortLabel: "Nouns",
		icon: <BookOpen size={16} />,
		content: (
			<div className="space-y-12">
				<AgreementSection />
				<MovableNuSection />
			</div>
		),
	},
	{
		id: "prepositions",
		label: "Prepositions",
		shortLabel: "Preps",
		icon: <GitBranch size={16} />,
		content: <PrepositionsSection />,
	},
	{
		id: "verbs",
		label: "Verbs",
		shortLabel: "Verbs",
		icon: <MessageSquare size={16} />,
		content: <VerbsSection />,
	},
];

const QuickReference: React.FC = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const activeTab = searchParams.get("tab") || TABS[0].id;

	return (
		<div className="space-y-6">
			<div className="mb-2">
				<h1 className="text-2xl font-bold text-stone-800">Quick Reference</h1>
				<p className="text-stone-600 mt-1">Grammar lookup - find what you need fast</p>
			</div>

			<Tabs value={activeTab} onValueChange={(value) => setSearchParams({ tab: value })}>
				<TabsList className="flex-wrap h-auto gap-1">
					{TABS.map((tab) => (
						<TabsTrigger key={tab.id} value={tab.id} className="gap-1.5">
							{tab.icon}
							<span className="hidden sm:inline">{tab.label}</span>
							<span className="sm:hidden">{tab.shortLabel}</span>
						</TabsTrigger>
					))}
				</TabsList>

				{TABS.map((tab) => (
					<TabsContent key={tab.id} value={tab.id}>
						{tab.content}
					</TabsContent>
				))}
			</Tabs>
		</div>
	);
};

export function meta() {
	return [
		{ title: "Quick Reference - Greek Grammar Lookup" },
		{ name: "description", content: "Grammar lookup - find what you need fast" },
	];
}

export default function QuickReferenceRoute() {
	return <QuickReference />;
}
