import { MessageCircle } from "lucide-react";
import { ConversationHero } from "@/components/ConversationHero";
import type { DialogueLine } from "@/components/DialogueExchange";
import { LearningTips, ScenarioCard, useConversationContext } from "../layout";

const ORIGIN_CHAT: DialogueLine[] = [
	{
		speaker: "friend",
		greek: "Από πού είσαι;",
		english: "Where are you from?",
	},
	{
		speaker: "you",
		greek: "Είμαι από...",
		english: "I'm from...",
		note: "Add your country",
	},
	{
		speaker: "friend",
		greek: "Α, ωραία! Πόσο καιρό είσαι εδώ;",
		english: "Oh, nice! How long have you been here?",
	},
	{ speaker: "you", greek: "Δύο εβδομάδες", english: "Two weeks" },
	{
		speaker: "friend",
		greek: "Σου αρέσει η Ελλάδα;",
		english: "Do you like Greece?",
	},
	{ speaker: "you", greek: "Πάρα πολύ!", english: "Very much!" },
];

const WEATHER_CHAT: DialogueLine[] = [
	{
		speaker: "friend",
		greek: "Κάνει πολύ ζέστη σήμερα!",
		english: "It's very hot today!",
	},
	{
		speaker: "you",
		greek: "Ναι, δεν αντέχω",
		english: "Yes, I can't stand it",
	},
	{ speaker: "friend", greek: "Θέλεις νερό;", english: "Do you want water?" },
	{ speaker: "you", greek: "Ναι, ευχαριστώ", english: "Yes, thank you" },
];

const WEEKEND_PLANS: DialogueLine[] = [
	{
		speaker: "friend",
		greek: "Τι θα κάνεις το Σαββατοκύριακο;",
		english: "What are you doing this weekend?",
	},
	{ speaker: "you", greek: "Δεν ξέρω ακόμα", english: "I don't know yet" },
	{
		speaker: "friend",
		greek: "Θέλεις να πάμε για καφέ;",
		english: "Do you want to go for coffee?",
	},
	{ speaker: "you", greek: "Ναι, καλή ιδέα!", english: "Yes, good idea!" },
	{ speaker: "friend", greek: "Το Σάββατο;", english: "Saturday?" },
	{ speaker: "you", greek: "Εντάξει", english: "Okay" },
];

const WORK_CHAT: DialogueLine[] = [
	{
		speaker: "friend",
		greek: "Τι κάνεις στη δουλειά;",
		english: "How's work?",
	},
	{
		speaker: "you",
		greek: "Καλά, πολύ δουλειά όμως",
		english: "Good, but a lot of work",
	},
	{ speaker: "friend", greek: "Κουράστηκες;", english: "Are you tired?" },
	{ speaker: "you", greek: "Λίγο", english: "A little" },
];

const FAMILY_CHAT: DialogueLine[] = [
	{
		speaker: "friend",
		greek: "Πώς είναι τα παιδιά;",
		english: "How are the kids?",
	},
	{
		speaker: "you",
		greek: "Πολύ καλά, ευχαριστώ",
		english: "Very good, thank you",
	},
	{
		speaker: "friend",
		greek: "Πάνε σχολείο;",
		english: "Do they go to school?",
	},
	{
		speaker: "you",
		greek: "Ναι, τους αρέσει πολύ",
		english: "Yes, they like it a lot",
	},
];

export function SmalltalkTab() {
	const { mode } = useConversationContext();

	return (
		<div className="space-y-4">
			<ConversationHero
				icon={<MessageCircle size={24} />}
				title="Small Talk"
				greekPhrase="Τι κάνεις;"
				description="Casual conversation with friends and acquaintances. Weather, work, family - the universal topics that connect us."
				colorScheme="ocean"
			/>

			<ScenarioCard
				title="Where are you from?"
				description="The most common question tourists face"
				formality="informal"
				dialogue={ORIGIN_CHAT}
				mode={mode}
			/>

			<ScenarioCard
				title="Talking about the weather"
				description="A universal conversation starter"
				formality="informal"
				dialogue={WEATHER_CHAT}
				mode={mode}
			/>

			<ScenarioCard
				title="Weekend plans"
				description="Making plans with friends"
				formality="informal"
				dialogue={WEEKEND_PLANS}
				mode={mode}
			/>

			<ScenarioCard
				title="Asking about work"
				description="Common friendly question"
				formality="informal"
				dialogue={WORK_CHAT}
				mode={mode}
			/>

			<ScenarioCard
				title="Asking about family"
				description="Greeks love to ask about family"
				formality="informal"
				dialogue={FAMILY_CHAT}
				mode={mode}
			/>

			<LearningTips
				patterns={{
					title: "Patterns to Notice",
					items: [
						"Δεν αντέχω - versatile phrase for 'I can't stand/handle'",
						"Μια χαρά - literally 'a joy', means 'great/fine'",
						"Εντάξει - multipurpose 'okay/agreed/fine'",
					],
				}}
				tips={{
					title: "Cultural Tips",
					items: [
						"Weather complaints are bonding moments in summer heat",
						"Family questions are expected and not intrusive in Greek culture",
					],
				}}
			/>
		</div>
	);
}
