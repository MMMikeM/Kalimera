import {
	ChevronDown,
	ChevronLeft,
	DoorOpen,
	Hand,
	Lightbulb,
	MessageCircle,
	Utensils,
} from "lucide-react";
import type React from "react";
import { Link, Outlet, useLocation, useOutletContext } from "react-router";
import { Card } from "@/components/Card";
import { ConversationModeToggle } from "@/components/ConversationModeToggle";
import {
	type ConversationMode,
	type DialogueLine,
	DialogueScenario,
	type Formality,
} from "@/components/DialogueExchange";
import { MonoText } from "@/components/MonoText";
import type { NavTab } from "@/components/NavTabs";
import { NavTabs } from "@/components/NavTabs";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { usePersistedState } from "@/lib/hooks/use-persisted-state";

type ConversationContext = {
	mode: ConversationMode;
	setMode: (mode: ConversationMode) => void;
};

export const useConversationContext = () =>
	useOutletContext<ConversationContext>();

export function meta() {
	return [
		{ title: "Conversations - Greek Learning" },
		{
			name: "description",
			content: "Real situations with family and friends",
		},
	];
}

export interface LearningTip {
	title: string;
	items: string[];
}

export interface LearningTipsProps {
	patterns?: LearningTip;
	tips?: LearningTip;
	commonMistake?: {
		wrong: string;
		right: string;
		explanation: string;
	};
}

export const LearningTips: React.FC<LearningTipsProps> = ({
	patterns,
	tips,
	commonMistake,
}) => (
	<Collapsible defaultOpen>
		<CollapsibleTrigger className="group flex w-full items-center gap-2 rounded-lg bg-stone-50 p-3 text-left transition-colors hover:bg-stone-100">
			<Lightbulb size={18} className="text-honey" />
			<span className="font-medium text-stone-700">Learning Tips</span>
			<ChevronDown
				size={16}
				className="ml-auto text-stone-600 transition-transform group-data-[state=open]:rotate-180"
			/>
		</CollapsibleTrigger>
		<CollapsibleContent>
			<div className="mt-4 rounded-lg border border-honey-300 bg-honey-100 p-4">
				<div className="grid gap-6 text-sm md:grid-cols-2">
					{patterns && (
						<div>
							<h4 className="mb-2 font-semibold text-honey-text">
								{patterns.title}
							</h4>
							<ul className="space-y-1.5 text-stone-700">
								{patterns.items.map((item) => (
									<li key={item}>{item}</li>
								))}
							</ul>
						</div>
					)}
					{tips && (
						<div>
							<h4 className="mb-2 font-semibold text-honey-text">
								{tips.title}
							</h4>
							<ul className="space-y-1.5 text-stone-700">
								{tips.items.map((item) => (
									<li key={item}>{item}</li>
								))}
							</ul>
						</div>
					)}
				</div>
				{commonMistake && (
					<div className="mt-4 border-t border-amber-200 pt-4">
						<h4 className="mb-2 font-semibold text-honey-text">
							Common Mistake
						</h4>
						<div className="flex items-start gap-4 text-sm">
							<div className="flex-1">
								<span className="font-medium text-red-600">✗</span>{" "}
								<MonoText variant="greek" size="md">
									{commonMistake.wrong}
								</MonoText>
							</div>
							<div className="flex-1">
								<span className="font-medium text-green-600">✓</span>{" "}
								<MonoText variant="greek" size="md">
									{commonMistake.right}
								</MonoText>
							</div>
						</div>
						<p className="mt-2 text-xs text-stone-600">
							{commonMistake.explanation}
						</p>
					</div>
				)}
			</div>
		</CollapsibleContent>
	</Collapsible>
);

export const ScenarioCard: React.FC<{
	title: string;
	description: string;
	formality: Formality;
	dialogue: DialogueLine[];
	mode: ConversationMode;
}> = ({ title, description, formality, dialogue, mode }) => (
	<Card variant="bordered" padding="lg" className="border-stone-200">
		<DialogueScenario
			title={title}
			description={description}
			formality={formality}
			dialogue={dialogue}
			mode={mode}
		/>
	</Card>
);

const CONVERSATION_TABS: NavTab[] = [
	{
		id: "arriving",
		label: "Arriving",
		icon: <DoorOpen size={16} />,
		color: "ocean",
	},
	{ id: "food", label: "Food", icon: <Utensils size={16} />, color: "olive" },
	{
		id: "smalltalk",
		label: "Talk",
		icon: <MessageCircle size={16} />,
		color: "honey",
	},
	{
		id: "requests",
		label: "Requests",
		icon: <Hand size={16} />,
		color: "terracotta",
	},
];

export default function ConversationsLayout() {
	const location = useLocation();
	const pathSegments = location.pathname.split("/").filter(Boolean);
	const activeTab = pathSegments[2] || "arriving";

	const [rawMode, setMode] = usePersistedState<string>(
		"conversation-mode",
		"read",
	);
	const mode: ConversationMode = rawMode === "roleplay" ? "roleplay" : "read";

	return (
		<div className="space-y-4">
			<Link
				to="/learn"
				className="flex items-center gap-1 text-stone-600 transition-colors hover:text-stone-800"
			>
				<ChevronLeft size={20} />
				<span className="font-medium">Convos</span>
			</Link>

			<NavTabs
				tabs={CONVERSATION_TABS}
				activeTab={activeTab}
				buildUrl={(tabId) => `/learn/conversations/${tabId}`}
			/>

			<ConversationModeToggle mode={mode} onModeChange={setMode} />

			<Outlet context={{ mode, setMode }} />
		</div>
	);
}
