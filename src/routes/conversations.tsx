import { MessageCircle, DoorOpen, Utensils, Users, Link } from "lucide-react";
import type React from "react";
import type { Route } from "./+types/conversations";
import { Card, InfoBox, MonoText } from "../components/ui";
import {
	ARRIVING_PHRASES,
	FOOD_PHRASES,
	SMALLTALK_PHRASES,
	DISCOURSE_MARKERS,
	type Phrase,
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

const SituationCard: React.FC<{
	title: string;
	icon: React.ReactNode;
	youllHear: Phrase[];
	responses: Phrase[];
	colorClass: string;
	bgClass: string;
	textClass: string;
}> = ({ title, icon, youllHear, responses, colorClass, bgClass, textClass }) => (
	<Card variant="bordered" padding="lg" className={`${colorClass} ${bgClass}`}>
		<h3
			className={`text-lg font-bold mb-4 ${textClass} flex items-center gap-2`}
		>
			{icon} {title}
		</h3>

		{/* What you'll hear section */}
		<div className="mb-6">
			<h4 className={`font-semibold ${textClass} mb-3 text-sm`}>
				What you'll hear:
			</h4>
			<div className="space-y-2">
				{youllHear.map((phrase, idx) => (
					<div
						key={idx}
						className={`p-3 ${bgClass.replace("/30", "-100")} rounded-lg`}
					>
						<MonoText variant="highlighted" size="lg" className="block mb-1">
							{phrase.text}
						</MonoText>
						<div className="text-gray-700 text-sm">{phrase.english}</div>
					</div>
				))}
			</div>
		</div>

		{/* Simple responses section */}
		<div>
			<h4 className={`font-semibold ${textClass} mb-3 text-sm`}>
				Simple responses:
			</h4>
			<div className="space-y-2">
				{responses.map((phrase, idx) => (
					<div
						key={idx}
						className={`p-3 ${bgClass.replace("/30", "-50")} rounded-lg`}
					>
						<MonoText variant="highlighted" size="lg" className="block mb-1">
							{phrase.text}
						</MonoText>
						<div className="text-gray-700 text-sm">{phrase.english}</div>
					</div>
				))}
			</div>
		</div>
	</Card>
);

const MarkersCard: React.FC = () => (
	<Card
		variant="bordered"
		padding="lg"
		className="border-purple-200 bg-purple-50/30"
	>
		<h3 className="text-lg font-bold mb-2 text-purple-700 flex items-center gap-2">
			<Link size={20} /> Words You'll Hear Constantly
		</h3>
		<p className="text-sm text-purple-600 mb-4">
			These don't translate directly but appear in every conversation
		</p>

		<div className="space-y-2">
			{DISCOURSE_MARKERS.map((marker, idx) => (
				<div key={idx} className="p-3 bg-purple-100 rounded-lg">
					<MonoText variant="highlighted" size="lg" className="block mb-1">
						{marker.text}
					</MonoText>
					<div className="text-gray-700 text-sm">{marker.english}</div>
				</div>
			))}
		</div>
	</Card>
);

const Conversations: React.FC = () => {
	const arrivingResponses: Phrase[] = [
		{ text: "Γεια σας", english: "Hello (formal)" },
		{ text: "Ευχαριστώ πολύ", english: "Thank you very much" },
		{ text: "Τα λέμε", english: "See you" },
	];

	const foodResponses: Phrase[] = [
		{ text: "Ναι, ευχαριστώ", english: "Yes, thank you" },
		{ text: "Όχι, ευχαριστώ", english: "No, thank you" },
		{ text: "Είναι πολύ νόστιμο", english: "It's very delicious" },
		{ text: "Χόρτασα", english: "I'm full" },
	];

	const smalltalkResponses: Phrase[] = [
		{ text: "Καλά ευχαριστώ", english: "Good, thank you" },
		{ text: "Δεν ξέρω ακόμα", english: "I don't know yet" },
		{ text: "Πολύ καλά", english: "Very good" },
	];

	return (
		<div className="space-y-10">
			{/* Page Header */}
			<Card
				variant="elevated"
				padding="lg"
				className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200"
			>
				<div className="mb-4">
					<h2 className="text-2xl font-bold text-blue-800">Conversations</h2>
					<p className="text-blue-700 mt-2">
						Real situations with family and friends
					</p>
				</div>
				<InfoBox variant="info" title="Learning Strategy">
					Focus on understanding first, then responding. Listen for these
					phrases in real conversations and recognize what's being said to you
					before worrying about perfect replies.
				</InfoBox>
			</Card>

			{/* Situation Cards Grid */}
			<div className="grid lg:grid-cols-2 gap-8">
				{/* Situation 1: Arriving & Leaving */}
				<SituationCard
					title="Arriving & Leaving"
					icon={<DoorOpen size={20} />}
					youllHear={ARRIVING_PHRASES}
					responses={arrivingResponses}
					colorClass="border-green-200"
					bgClass="bg-green-50/30"
					textClass="text-green-700"
				/>

				{/* Situation 2: Food & Hospitality */}
				<SituationCard
					title="Food & Hospitality"
					icon={<Utensils size={20} />}
					youllHear={FOOD_PHRASES}
					responses={foodResponses}
					colorClass="border-orange-200"
					bgClass="bg-orange-50/30"
					textClass="text-orange-700"
				/>

				{/* Situation 3: Small Talk */}
				<SituationCard
					title="Small Talk"
					icon={<MessageCircle size={20} />}
					youllHear={SMALLTALK_PHRASES}
					responses={smalltalkResponses}
					colorClass="border-blue-200"
					bgClass="bg-blue-50/30"
					textClass="text-blue-700"
				/>

				{/* Situation 4: Discourse Markers */}
				<MarkersCard />
			</div>

			{/* Practice Tips */}
			<Card
				variant="elevated"
				padding="lg"
				className="bg-gradient-to-r from-purple-50 to-violet-50 border-2 border-purple-200"
			>
				<h2 className="text-xl font-bold text-center mb-4 text-purple-800 flex items-center justify-center gap-2">
					<Users size={20} /> Practice Strategy
				</h2>
				<div className="grid md:grid-cols-2 gap-6">
					<div>
						<h3 className="text-lg font-bold text-purple-700 mb-3">
							Comprehension First
						</h3>
						<ul className="space-y-2 text-sm text-gray-700">
							<li>
								• <strong>Listen actively</strong> - recognize these phrases when
								you hear them
							</li>
							<li>
								• <strong>One situation at a time</strong> - master arrivals
								before moving on
							</li>
							<li>
								• <strong>Context matters</strong> - notice when people use these
								phrases
							</li>
							<li>
								• <strong>Be patient</strong> - understanding comes before
								speaking
							</li>
						</ul>
					</div>
					<div>
						<h3 className="text-lg font-bold text-purple-700 mb-3">
							Simple Responses
						</h3>
						<ul className="space-y-2 text-sm text-gray-700">
							<li>
								• <strong>Start with basics</strong> - "Ναι/Όχι ευχαριστώ" goes
								a long way
							</li>
							<li>
								• <strong>Practice out loud</strong> - say responses to yourself
							</li>
							<li>
								• <strong>Don't worry about perfection</strong> - communication
								beats grammar
							</li>
							<li>
								• <strong>Build confidence slowly</strong> - master a few
								responses first
							</li>
						</ul>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default function ConversationsRoute(_props: Route.ComponentProps) {
	return <Conversations />;
}
