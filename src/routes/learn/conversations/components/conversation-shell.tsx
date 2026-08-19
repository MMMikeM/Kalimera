import { Lightbulb } from "lucide-react";
import type React from "react";
import { createContext, useContext } from "react";

import { Card } from "@/components/Card";
import { CollapsibleSection } from "@/components/CollapsibleSection";
import {
	type ConversationMode,
	type DialogueLine,
	DialogueScenario,
	type Formality,
} from "@/components/DialogueExchange";
import { MistakeComparison } from "@/components/MistakeComparison";

type ConversationContext = {
	mode: ConversationMode;
	setMode: (mode: ConversationMode) => void;
};

const ConversationCtx = createContext<ConversationContext>({
	mode: "read",
	setMode: () => {},
});

export const useConversationContext = () => useContext(ConversationCtx);

export const ConversationProvider = ConversationCtx.Provider;

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
					title=""
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

export const ScenarioCard: React.FC<{
	title: string;
	description: string;
	formality: Formality;
	dialogue: DialogueLine[];
	mode?: ConversationMode;
}> = ({ title, description, formality, dialogue, mode }) => {
	const { mode: contextMode } = useConversationContext();

	return (
		<Card variant="bordered" padding="lg" className="border-stone-200">
			<DialogueScenario
				title={title}
				description={description}
				formality={formality}
				dialogue={dialogue}
				mode={mode ?? contextMode}
			/>
		</Card>
	);
};
