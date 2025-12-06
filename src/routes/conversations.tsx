import {
	MessageCircle,
	DoorOpen,
	Utensils,
	Link,
	ChevronDown,
	Lightbulb,
	Hand,
} from "lucide-react";
import type React from "react";
import { useSearchParams } from "react-router";
import type { Route } from "./+types/conversations";
import { Card, MonoText } from "../components";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/ui/tabs";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { Phrase } from "../types/phrase";
import {
	ARRIVING_PHRASES,
	DISCOURSE_MARKERS,
	FOOD_PHRASES,
	SMALLTALK_PHRASES,
} from "../scripts/seed-data/vocabulary";

export function meta() {
	return [
		{ title: "Conversations - Greek Learning" },
		{
			name: "description",
			content: "Real situations with family and friends",
		},
	];
}

type SituationConfig = {
	id: string;
	title: string;
	icon: React.ReactNode;
	youllHear: Phrase[];
	responses: Phrase[];
	variant: "olive" | "terracotta" | "aegean" | "honey";
};

const variantStyles = {
	olive: {
		card: "situation-olive",
		text: "situation-olive-text",
		phraseBg: "bg-olive/10",
		responseBg: "bg-olive/5",
	},
	terracotta: {
		card: "situation-terracotta",
		text: "situation-terracotta-text",
		phraseBg: "bg-terracotta/10",
		responseBg: "bg-terracotta/5",
	},
	aegean: {
		card: "situation-aegean",
		text: "situation-aegean-text",
		phraseBg: "bg-aegean/10",
		responseBg: "bg-aegean/5",
	},
	honey: {
		card: "situation-honey",
		text: "situation-honey-text",
		phraseBg: "bg-honey/10",
		responseBg: "bg-honey/5",
	},
};

const PhraseList: React.FC<{
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

const SituationContent: React.FC<{
	situation: SituationConfig;
}> = ({ situation }) => {
	const styles = variantStyles[situation.variant];

	return (
		<Card
			variant="bordered"
			padding="lg"
			className={styles.card}
		>
			<h3 className={`text-lg font-bold mb-4 ${styles.text} flex items-center gap-2`}>
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

const DiscourseMarkersContent: React.FC = () => (
	<Card variant="bordered" padding="lg" className="situation-aegean">
		<h3 className="text-lg font-bold mb-2 situation-aegean-text flex items-center gap-2">
			<Link size={20} /> Words You'll Hear Constantly
		</h3>
		<p className="text-sm text-aegean-text mb-4">
			These don't translate directly but appear in every conversation
		</p>
		<PhraseList phrases={DISCOURSE_MARKERS} bgClass="bg-aegean/10" />
	</Card>
);

const LearningTips: React.FC = () => (
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
						<h4 className="info-box-tip-title mb-2">
							Comprehension First
						</h4>
						<ul className="space-y-1.5 text-stone-700">
							<li>Listen actively - recognize these phrases when you hear them</li>
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

const SITUATIONS: SituationConfig[] = [
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
		variant: "aegean",
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

const Conversations: React.FC = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const activeTab = searchParams.get("tab") || "arriving";

	const handleTabChange = (value: string) => {
		setSearchParams({ tab: value });
	};

	return (
		<div className="space-y-6">
			<div className="mb-2">
				<h2 className="text-2xl font-bold text-stone-800">Conversations</h2>
				<p className="text-stone-600 mt-1">
					Real situations with family and friends
				</p>
			</div>

			<Tabs value={activeTab} onValueChange={handleTabChange}>
				<TabsList className="flex-wrap h-auto gap-1">
					{SITUATIONS.map((situation) => (
						<TabsTrigger
							key={situation.id}
							value={situation.id}
							className="gap-1.5"
						>
							{situation.icon}
							<span className="hidden sm:inline">{situation.title}</span>
							<span className="sm:hidden">{situation.title.split(" ")[0]}</span>
						</TabsTrigger>
					))}
					<TabsTrigger value="discourse" className="gap-1.5">
						<Link size={16} />
						<span className="hidden sm:inline">Discourse Markers</span>
						<span className="sm:hidden">Markers</span>
					</TabsTrigger>
				</TabsList>

				{SITUATIONS.map((situation) => (
					<TabsContent key={situation.id} value={situation.id}>
						<div className="space-y-4">
							<SituationContent situation={situation} />
							<LearningTips />
						</div>
					</TabsContent>
				))}

				<TabsContent value="discourse">
					<div className="space-y-4">
						<DiscourseMarkersContent />
						<LearningTips />
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default function ConversationsRoute(_props: Route.ComponentProps) {
	return <Conversations />;
}
