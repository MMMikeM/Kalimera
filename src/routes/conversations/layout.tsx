import type React from "react";
import {
	MessageCircle,
	DoorOpen,
	Utensils,
	ChevronDown,
	Lightbulb,
	Hand,
} from "lucide-react";
import { Outlet, useLocation, Link as RouterLink } from "react-router";
import { Card, MonoText } from "@/components";
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
		{phrases.map((phrase, idx) => (
			<div key={idx} className={`p-3 ${bgClass} rounded-lg`}>
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

export const LearningTips: React.FC = () => (
	<Collapsible>
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
					<div>
						<h4 className="info-box-tip-title mb-2">Comprehension First</h4>
						<ul className="space-y-1.5 text-stone-700">
							<li>
								Listen actively - recognize these phrases when you hear them
							</li>
							<li>One situation at a time - master this before moving on</li>
							<li>Context matters - notice when people use these phrases</li>
						</ul>
					</div>
					<div>
						<h4 className="info-box-tip-title mb-2">Simple Responses</h4>
						<ul className="space-y-1.5 text-stone-700">
							<li>Start with "Ναι/Όχι ευχαριστώ" - it goes a long way</li>
							<li>Practice out loud - say responses to yourself</li>
							<li>Communication beats grammar - don't worry about perfection</li>
						</ul>
					</div>
				</div>
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

const TABS = SITUATIONS.map((s) => ({ id: s.id, title: s.title, icon: s.icon }));

export default function ConversationsLayout() {
	const location = useLocation();
	const pathSegments = location.pathname.split("/").filter(Boolean);
	const activeTab = pathSegments[1] || "arriving";

	return (
		<div className="space-y-6">
			<div className="mb-2">
				<h2 className="text-2xl font-bold text-stone-800">Conversations</h2>
				<p className="text-stone-600 mt-1">
					Real situations with family and friends
				</p>
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

			<Outlet />
		</div>
	);
}
