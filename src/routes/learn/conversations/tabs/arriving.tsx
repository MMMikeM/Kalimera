import { DoorOpen } from "lucide-react";
import { ConversationHero } from "@/components/ConversationHero";
import type { DialogueLine } from "@/components/DialogueExchange";
import { ScenarioCard, LearningTips, useConversationContext } from "../layout";

const CASUAL_GREETING: DialogueLine[] = [
	{ speaker: "friend", greek: "Γεια σου!", english: "Hi!" },
	{ speaker: "you", greek: "Γεια!", english: "Hi!" },
	{ speaker: "friend", greek: "Τι κάνεις;", english: "How are you?" },
	{ speaker: "you", greek: "Καλά, εσύ;", english: "Good, you?" },
	{
		speaker: "friend",
		greek: "Μια χαρά",
		english: "Great",
		note: "Literally 'a joy'",
	},
];

const ARRIVAL_DIALOGUE: DialogueLine[] = [
	{ speaker: "host", greek: "Καλώς ήρθατε!", english: "Welcome!" },
	{
		speaker: "you",
		greek: "Γεια σας, ευχαριστούμε",
		english: "Hello, thank you",
	},
	{ speaker: "host", greek: "Πέρνα μέσα, πέρνα", english: "Come in, come in" },
	{ speaker: "you", greek: "Ευχαριστώ πολύ", english: "Thank you very much" },
	{ speaker: "host", greek: "Κάτσε, κάτσε", english: "Sit down, sit down" },
];

const LEAVING_DIALOGUE: DialogueLine[] = [
	{
		speaker: "you",
		greek: "Πρέπει να φύγουμε",
		english: "We have to go",
		note: "Announcing you're leaving",
	},
	{ speaker: "host", greek: "Τόσο νωρίς;", english: "So early?" },
	{ speaker: "you", greek: "Δυστυχώς, ναι", english: "Unfortunately, yes" },
	{ speaker: "host", greek: "Να προσέχεις", english: "Take care" },
	{ speaker: "you", greek: "Τα λέμε", english: "See you" },
	{ speaker: "host", greek: "Καλό δρόμο!", english: "Have a good trip!" },
	{
		speaker: "you",
		greek: "Ευχαριστούμε για όλα",
		english: "Thank you for everything",
	},
];

export function ArrivingTab() {
	const { mode } = useConversationContext();

	return (
		<div className="space-y-4">
			<ConversationHero
				icon={<DoorOpen size={24} />}
				title="Arriving & Leaving"
				greekPhrase="Καλώς ήρθατε!"
				description="The warmth of Greek hospitality starts at the door. Expect enthusiastic welcomes and reluctant goodbyes."
				colorScheme="olive"
			/>

			<ScenarioCard
				title="Casual greeting (friends)"
				description="Informal greeting between friends"
				formality="informal"
				dialogue={CASUAL_GREETING}
				mode={mode}
			/>

			<ScenarioCard
				title="Arriving at a Greek home"
				description="The host will enthusiastically welcome you"
				formality="formal"
				dialogue={ARRIVAL_DIALOGUE}
				mode={mode}
			/>

			<ScenarioCard
				title="Saying goodbye"
				description="Greeks often insist you stay longer!"
				formality="formal"
				dialogue={LEAVING_DIALOGUE}
				mode={mode}
			/>

			<LearningTips
				patterns={{
					title: "Patterns to Notice",
					items: [
						"Informal imperatives doubled for emphasis: κάτσε, κάτσε / πέρνα, πέρνα",
						"Plural 'we' for politeness: ευχαριστούμε instead of ευχαριστώ",
						"Να + verb for wishes: Να προσέχεις (Take care)",
					],
				}}
				tips={{
					title: "Cultural Tips",
					items: [
						"Greeks repeat imperatives for warmth, not impatience",
						"Expect reluctance to let you leave - decline 2-3 times before insisting",
					],
				}}
				commonMistake={{
					wrong: "Αντίο",
					right: "Γεια σου / Τα λέμε",
					explanation:
						"Αντίο sounds final - save for permanent goodbyes",
				}}
			/>
		</div>
	);
}
