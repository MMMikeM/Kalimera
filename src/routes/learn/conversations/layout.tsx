import type React from "react";
import { useState, useEffect } from "react";
import { MessageCircle, DoorOpen, Utensils, ChevronDown, Lightbulb, Hand } from "lucide-react";
import { Outlet, useLocation, useOutletContext } from "react-router";
import { MonoText } from "@/components/MonoText";
import { ConversationModeToggle } from "@/components/ConversationModeToggle";
import { NavTabs } from "@/components/NavTabs";
import type { ConversationMode } from "@/components/DialogueExchange";
import type { NavTab } from "@/components/NavTabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

type ConversationContext = {
	mode: ConversationMode;
};

export const useConversationContext = () =>
	useOutletContext<ConversationContext>();

const STORAGE_KEY = "conversation-mode";

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
			<Lightbulb size={18} className="info-box-tip-icon" />
			<span className="font-medium text-stone-700">Learning Tips</span>
			<ChevronDown
				size={16}
				className="ml-auto text-stone-600 transition-transform group-data-[state=open]:rotate-180"
			/>
		</CollapsibleTrigger>
		<CollapsibleContent>
			<div className="mt-4 info-box-tip">
				<div className="grid md:grid-cols-2 gap-6 text-sm">
					{patterns && (
						<div>
							<h4 className="info-box-tip-title mb-2">{patterns.title}</h4>
							<ul className="space-y-1.5 text-stone-700">
								{patterns.items.map((item) => (
									<li key={item}>{item}</li>
								))}
							</ul>
						</div>
					)}
					{tips && (
						<div>
							<h4 className="info-box-tip-title mb-2">{tips.title}</h4>
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
						<h4 className="info-box-tip-title mb-2">Common Mistake</h4>
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
	{ id: "arriving", label: "Arriving & Leaving", shortLabel: "Arriving", icon: <DoorOpen size={16} />, color: "ocean" },
	{ id: "food", label: "Food & Hospitality", shortLabel: "Food", icon: <Utensils size={16} />, color: "olive" },
	{ id: "smalltalk", label: "Small Talk", shortLabel: "Small Talk", icon: <MessageCircle size={16} />, color: "honey" },
	{ id: "requests", label: "Quick Requests", shortLabel: "Requests", icon: <Hand size={16} />, color: "terracotta" },
];

export default function ConversationsLayout() {
	const location = useLocation();
	const pathSegments = location.pathname.split("/").filter(Boolean);
	const activeTab = pathSegments[2] || "arriving";

	const [mode, setMode] = useState<ConversationMode>(() => {
		if (typeof window === "undefined") return "read";
		const stored = localStorage.getItem(STORAGE_KEY);
		return (stored as ConversationMode) || "read";
	});

	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, mode);
	}, [mode]);

	return (
		<div className="space-y-6">
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
				<div>
					<h2 className="text-2xl font-bold text-stone-800">Conversations</h2>
					<p className="text-stone-600 mt-1">
						Real situations with family and friends
					</p>
				</div>
				<ConversationModeToggle mode={mode} onModeChange={setMode} />
			</div>

			<NavTabs
				tabs={CONVERSATION_TABS}
				activeTab={activeTab}
				buildUrl={(tabId) => `/learn/conversations/${tabId}`}
			/>

			<Outlet context={{ mode }} />
		</div>
	);
}
