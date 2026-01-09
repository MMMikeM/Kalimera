import type React from "react";
import { MessageCircle, DoorOpen, Utensils, ChevronDown, ChevronLeft, Lightbulb, Hand } from "lucide-react";
import { Link, Outlet, useLocation, useOutletContext } from "react-router";
import { MonoText } from "@/components/MonoText";
import { NavTabs } from "@/components/NavTabs";
import type { ConversationMode } from "@/components/DialogueExchange";
import type { NavTab } from "@/components/NavTabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
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
		<CollapsibleTrigger className="flex items-center gap-2 w-full p-3 rounded-lg bg-stone-50 hover:bg-stone-100 transition-colors text-left group">
			<Lightbulb size={18} className="text-honey" />
			<span className="font-medium text-stone-700">Learning Tips</span>
			<ChevronDown
				size={16}
				className="ml-auto text-stone-600 transition-transform group-data-[state=open]:rotate-180"
			/>
		</CollapsibleTrigger>
		<CollapsibleContent>
			<div className="mt-4 p-4 rounded-lg border bg-honey-100 border-honey-300">
				<div className="grid md:grid-cols-2 gap-6 text-sm">
					{patterns && (
						<div>
							<h4 className="text-honey-text font-semibold mb-2">{patterns.title}</h4>
							<ul className="space-y-1.5 text-stone-700">
								{patterns.items.map((item) => (
									<li key={item}>{item}</li>
								))}
							</ul>
						</div>
					)}
					{tips && (
						<div>
							<h4 className="text-honey-text font-semibold mb-2">{tips.title}</h4>
							<ul className="space-y-1.5 text-stone-700">
								{tips.items.map((item) => (
									<li key={item}>{item}</li>
								))}
							</ul>
						</div>
					)}
				</div>
				{commonMistake && (
					<div className="mt-4 pt-4 border-t border-amber-200">
						<h4 className="text-honey-text font-semibold mb-2">Common Mistake</h4>
						<div className="flex items-start gap-4 text-sm">
							<div className="flex-1">
								<span className="text-red-600 font-medium">✗</span>{" "}
								<MonoText variant="greek" size="md">
									{commonMistake.wrong}
								</MonoText>
							</div>
							<div className="flex-1">
								<span className="text-green-600 font-medium">✓</span>{" "}
								<MonoText variant="greek" size="md">
									{commonMistake.right}
								</MonoText>
							</div>
						</div>
						<p className="text-stone-600 mt-2 text-xs">
							{commonMistake.explanation}
						</p>
					</div>
				)}
			</div>
		</CollapsibleContent>
	</Collapsible>
);

const CONVERSATION_TABS: NavTab[] = [
	{ id: "arriving", label: "Arriving", shortLabel: "Arrive", icon: <DoorOpen size={16} />, color: "ocean" },
	{ id: "food", label: "Food", shortLabel: "Food", icon: <Utensils size={16} />, color: "olive" },
	{ id: "smalltalk", label: "Talk", shortLabel: "Talk", icon: <MessageCircle size={16} />, color: "honey" },
	{ id: "requests", label: "Requests", shortLabel: "Ask", icon: <Hand size={16} />, color: "terracotta" },
];

export default function ConversationsLayout() {
	const location = useLocation();
	const pathSegments = location.pathname.split("/").filter(Boolean);
	const activeTab = pathSegments[2] || "arriving";

	const [mode, setMode] = usePersistedState<ConversationMode>("conversation-mode", "read");

	return (
		<div className="space-y-4">
			<Link
				to="/learn"
				className="flex items-center gap-1 text-stone-600 hover:text-stone-800 transition-colors"
			>
				<ChevronLeft size={20} />
				<span className="font-medium">Convos</span>
			</Link>

			<NavTabs
				tabs={CONVERSATION_TABS}
				activeTab={activeTab}
				buildUrl={(tabId) => `/learn/conversations/${tabId}`}
			/>

			<Outlet context={{ mode, setMode }} />
		</div>
	);
}
