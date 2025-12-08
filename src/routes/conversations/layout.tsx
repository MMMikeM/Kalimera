import type React from "react";
import { useState, useEffect } from "react";
import {
	MessageCircle,
	DoorOpen,
	Utensils,
	ChevronDown,
	Lightbulb,
	Hand,
} from "lucide-react";
import {
	Outlet,
	useLocation,
	Link as RouterLink,
	useOutletContext,
} from "react-router";
import {
	Card,
	MonoText,
	ConversationModeToggle,
	type ConversationMode,
} from "@/components";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { Phrase } from "@/types/phrase";
import {
	ARRIVING_PHRASES,
	FOOD_PHRASES,
	SMALLTALK_PHRASES,
} from "@/scripts/seed-data/vocabulary";

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

export type SituationConfig = {
	id: string;
	title: string;
	icon: React.ReactNode;
	youllHear: Phrase[];
	responses: Phrase[];
	variant: "olive" | "terracotta" | "ocean" | "honey";
};

export const variantStyles = {
	olive: {
		card: "situation-olive",
		text: "situation-olive-text",
		phraseBg: "bg-olive-100",
		responseBg: "bg-olive-50",
	},
	terracotta: {
		card: "situation-terracotta",
		text: "situation-terracotta-text",
		phraseBg: "bg-terracotta-100",
		responseBg: "bg-terracotta-50",
	},
	ocean: {
		card: "situation-ocean",
		text: "situation-ocean-text",
		phraseBg: "bg-ocean-100",
		responseBg: "bg-ocean-50",
	},
	honey: {
		card: "situation-honey",
		text: "situation-honey-text",
		phraseBg: "bg-honey-100",
		responseBg: "bg-honey-50",
	},
};

export const PhraseList: React.FC<{
	phrases: Phrase[];
	bgClass: string;
}> = ({ phrases, bgClass }) => (
	<div className="space-y-2">
		{phrases.map((phrase) => (
			<div key={phrase.text} className={`p-3 ${bgClass} rounded-lg`}>
				<MonoText variant="highlighted" size="lg" className="block mb-1">
					{phrase.text}
				</MonoText>
				<div className="text-stone-600 text-sm">{phrase.english}</div>
			</div>
		))}
	</div>
);

export const SituationContent: React.FC<{
	situation: SituationConfig;
}> = ({ situation }) => {
	const styles = variantStyles[situation.variant];

	return (
		<Card variant="bordered" padding="lg" className={styles.card}>
			<h3
				className={`text-lg font-bold mb-4 ${styles.text} flex items-center gap-2`}
			>
				{situation.icon} {situation.title}
			</h3>

			<div className="mb-6">
				<h4 className={`font-semibold ${styles.text} mb-3 text-sm`}>
					What you'll hear:
				</h4>
				<PhraseList phrases={situation.youllHear} bgClass={styles.phraseBg} />
			</div>

			<div>
				<h4 className={`font-semibold ${styles.text} mb-3 text-sm`}>
					Simple responses:
				</h4>
				<PhraseList phrases={situation.responses} bgClass={styles.responseBg} />
			</div>
		</Card>
	);
};

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

export const SITUATIONS: SituationConfig[] = [
	{
		id: "arriving",
		title: "Arriving & Leaving",
		icon: <DoorOpen size={20} />,
		youllHear: ARRIVING_PHRASES,
		responses: [
			{ text: "Γεια σας", english: "Hello (formal)" },
			{ text: "Ευχαριστώ πολύ", english: "Thank you very much" },
			{ text: "Τα λέμε", english: "See you" },
		],
		variant: "olive",
	},
	{
		id: "food",
		title: "Food & Hospitality",
		icon: <Utensils size={20} />,
		youllHear: FOOD_PHRASES,
		responses: [
			{ text: "Ναι, ευχαριστώ", english: "Yes, thank you" },
			{ text: "Όχι, ευχαριστώ", english: "No, thank you" },
			{ text: "Είναι πολύ νόστιμο", english: "It's very delicious" },
			{ text: "Χόρτασα", english: "I'm full" },
		],
		variant: "terracotta",
	},
	{
		id: "smalltalk",
		title: "Small Talk",
		icon: <MessageCircle size={20} />,
		youllHear: SMALLTALK_PHRASES,
		responses: [
			{ text: "Καλά ευχαριστώ", english: "Good, thank you" },
			{ text: "Δεν ξέρω ακόμα", english: "I don't know yet" },
			{ text: "Πολύ καλά", english: "Very good" },
		],
		variant: "ocean",
	},
	{
		id: "requests",
		title: "Quick Requests",
		icon: <Hand size={20} />,
		youllHear: [
			{ text: "Τι σου φαίνεται;", english: "What do you think?" },
			{ text: "Πώς σε λένε;", english: "What's your name?" },
			{ text: "Μ' ακούς;", english: "Do you hear me?" },
		],
		responses: [
			{ text: "Πες μου", english: "Tell me" },
			{ text: "Δώσε μου", english: "Give me" },
			{ text: "Περίμενέ με", english: "Wait for me" },
			{ text: "Βοήθησέ με", english: "Help me" },
			{ text: "Άκουσέ με", english: "Listen to me" },
			{ text: "Με λένε...", english: "My name is..." },
			{ text: "Μ' αρέσει", english: "I like it" },
			{ text: "Δε μ' αρέσει", english: "I don't like it" },
			{ text: "Μου φαίνεται...", english: "It seems to me..." },
		],
		variant: "honey",
	},
];

const TABS = SITUATIONS.map((s) => ({
	id: s.id,
	title: s.title,
	icon: s.icon,
}));

export default function ConversationsLayout() {
	const location = useLocation();
	const pathSegments = location.pathname.split("/").filter(Boolean);
	const activeTab = pathSegments[1] || "arriving";

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

			<Tabs value={activeTab}>
				<TabsList className="flex-wrap h-auto gap-1">
					{TABS.map((tab) => (
						<TabsTrigger
							key={tab.id}
							value={tab.id}
							asChild
							className="gap-1.5"
						>
							<RouterLink to={`/conversations/${tab.id}`}>
								{tab.icon}
								<span className="hidden sm:inline">{tab.title}</span>
								<span className="sm:hidden">{tab.title.split(" ")[0]}</span>
							</RouterLink>
						</TabsTrigger>
					))}
				</TabsList>
			</Tabs>

			<Outlet context={{ mode }} />
		</div>
	);
}
