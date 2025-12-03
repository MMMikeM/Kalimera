import {
	MessageCircle,
	DoorOpen,
	Utensils,
	Link,
	ChevronDown,
	Lightbulb,
} from "lucide-react";
import type React from "react";
import { useSearchParams } from "react-router";
import type { Route } from "./+types/conversations";
import { Card, MonoText } from "../components/ui";
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
		{ title: "Conversations - Greek Conjugation Reference" },
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
	colorClass: string;
	bgClass: string;
	textClass: string;
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
				<div className="text-gray-700 text-sm">{phrase.english}</div>
			</div>
		))}
	</div>
);

const SituationContent: React.FC<{
	situation: SituationConfig;
}> = ({ situation }) => (
	<Card
		variant="bordered"
		padding="lg"
		className={`${situation.colorClass} ${situation.bgClass}`}
	>
		<h3
			className={`text-lg font-bold mb-4 ${situation.textClass} flex items-center gap-2`}
		>
			{situation.icon} {situation.title}
		</h3>

		<div className="mb-6">
			<h4 className={`font-semibold ${situation.textClass} mb-3 text-sm`}>
				What you'll hear:
			</h4>
			<PhraseList
				phrases={situation.youllHear}
				bgClass={situation.bgClass.replace("/30", "-100")}
			/>
		</div>

		<div>
			<h4 className={`font-semibold ${situation.textClass} mb-3 text-sm`}>
				Simple responses:
			</h4>
			<PhraseList
				phrases={situation.responses}
				bgClass={situation.bgClass.replace("/30", "-50")}
			/>
		</div>
	</Card>
);

const DiscourseMarkersContent: React.FC = () => (
	<Card variant="bordered" padding="lg" className="border-purple-200 bg-purple-50/30">
		<h3 className="text-lg font-bold mb-2 text-purple-700 flex items-center gap-2">
			<Link size={20} /> Words You'll Hear Constantly
		</h3>
		<p className="text-sm text-purple-600 mb-4">
			These don't translate directly but appear in every conversation
		</p>
		<PhraseList phrases={DISCOURSE_MARKERS} bgClass="bg-purple-100" />
	</Card>
);

const LearningTips: React.FC = () => (
	<Collapsible>
		<CollapsibleTrigger className="flex items-center gap-2 w-full p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-left group">
			<Lightbulb size={18} className="text-amber-600" />
			<span className="font-medium text-gray-700">Learning Tips</span>
			<ChevronDown
				size={16}
				className="ml-auto text-gray-500 transition-transform group-data-[state=open]:rotate-180"
			/>
		</CollapsibleTrigger>
		<CollapsibleContent>
			<div className="mt-4 p-4 rounded-lg bg-amber-50/50 border border-amber-200">
				<div className="grid md:grid-cols-2 gap-6 text-sm">
					<div>
						<h4 className="font-semibold text-amber-800 mb-2">
							Comprehension First
						</h4>
						<ul className="space-y-1.5 text-gray-700">
							<li>• Listen actively - recognize these phrases when you hear them</li>
							<li>• One situation at a time - master this before moving on</li>
							<li>• Context matters - notice when people use these phrases</li>
						</ul>
					</div>
					<div>
						<h4 className="font-semibold text-amber-800 mb-2">Simple Responses</h4>
						<ul className="space-y-1.5 text-gray-700">
							<li>• Start with "Ναι/Όχι ευχαριστώ" - it goes a long way</li>
							<li>• Practice out loud - say responses to yourself</li>
							<li>• Communication beats grammar - don't worry about perfection</li>
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
		colorClass: "border-green-200",
		bgClass: "bg-green-50/30",
		textClass: "text-green-700",
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
		colorClass: "border-orange-200",
		bgClass: "bg-orange-50/30",
		textClass: "text-orange-700",
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
		colorClass: "border-blue-200",
		bgClass: "bg-blue-50/30",
		textClass: "text-blue-700",
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
			{/* Minimal Header */}
			<div className="mb-2">
				<h2 className="text-2xl font-bold text-gray-800">Conversations</h2>
				<p className="text-gray-600 mt-1">
					Real situations with family and friends
				</p>
			</div>

			{/* Tabs */}
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

				{/* Tab Content */}
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
