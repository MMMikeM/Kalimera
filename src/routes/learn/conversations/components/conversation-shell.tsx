import { Lightbulb } from "lucide-react";
import type React from "react";
import { createContext, useContext } from "react";
import { cn } from "tailwind-variants";

import { Card } from "@/components/Card";
import { CollapsibleSection } from "@/components/CollapsibleSection";
import {
	type ConversationMode,
	type DialogueLine,
	DialogueExchange,
} from "@/components/DialogueExchange";
import { MistakeComparison } from "@/components/MistakeComparison";

const ConversationModeCtx = createContext<ConversationMode>("read");

export const ConversationModeProvider = ConversationModeCtx.Provider;

export interface LearningTipsProps {
	patterns?: LearningTip;
	tips?: LearningTip;
	commonMistake?: {
		wrong: string;
		right: string;
		explanation: string;
	};
}

interface LearningTip {
	title: string;
	items: string[];
}

const TipList: React.FC<{ tip: LearningTip }> = ({ tip }) => (
	<div>
		<h4 className="mb-2 font-semibold text-honey-text">{tip.title}</h4>
		<ul className="space-y-1.5 text-stone-700">
			{tip.items.map((item) => (
				<li key={item}>{item}</li>
			))}
		</ul>
	</div>
);

export const LearningTips: React.FC<LearningTipsProps> = ({ patterns, tips, commonMistake }) => (
	<CollapsibleSection
		title="Learning Tips"
		icon={<Lightbulb size={18} />}
		colorScheme="honey"
		defaultOpen
	>
		<div className="grid gap-6 text-sm md:grid-cols-2">
			{patterns && <TipList tip={patterns} />}
			{tips && <TipList tip={tips} />}
		</div>
		{commonMistake && (
			<div className="mt-4 border-t border-honey-200 pt-4">
				<h4 className="mb-2 font-semibold text-honey-text">Common Mistake</h4>
				<MistakeComparison
					mistakes={[
						{
							wrong: commonMistake.wrong,
							correct: commonMistake.right,
							explanation: commonMistake.explanation,
						},
					]}
				/>
			</div>
		)}
	</CollapsibleSection>
);

type Formality = "formal" | "informal" | "mixed";

const formalityLabels: Record<Formality, { text: string; className: string }> = {
	formal: { text: "Formal", className: "bg-stone-100 text-stone-600" },
	informal: { text: "Informal", className: "bg-olive-100 text-olive-700" },
	mixed: { text: "Mixed", className: "bg-ocean-100 text-ocean-700" },
};

export const ScenarioCard: React.FC<{
	title: string;
	description: string;
	formality: Formality;
	dialogue: DialogueLine[];
}> = ({ title, description, formality, dialogue }) => {
	const mode = useContext(ConversationModeCtx);

	return (
		<Card variant="bordered" padding="lg" className="border-stone-200">
			<div className="space-y-4">
				<div>
					<div className="flex items-center gap-2">
						<h4 className="font-semibold text-stone-800">{title}</h4>
						<span
							className={cn(
								"text-xs px-2 py-0.5 rounded-full font-medium",
								formalityLabels[formality].className,
							)}
						>
							{formalityLabels[formality].text}
						</span>
					</div>
					<p className="mt-1 text-sm text-stone-600">{description}</p>
				</div>
				<DialogueExchange lines={dialogue} mode={mode} />
			</div>
		</Card>
	);
};
