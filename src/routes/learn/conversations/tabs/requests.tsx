import { Hand } from "lucide-react";
import { ConversationHero } from "@/components/ConversationHero";
import type { DialogueLine } from "@/components/DialogueExchange";
import { ScenarioCard, LearningTips, useConversationContext } from "../layout";

const INTRODUCTIONS: DialogueLine[] = [
	{ speaker: "stranger", greek: "Πώς σε λένε;", english: "What's your name?" },
	{
		speaker: "you",
		greek: "Με λένε...",
		english: "My name is...",
		note: "Add your name",
	},
	{ speaker: "stranger", greek: "Χαίρω πολύ", english: "Nice to meet you" },
	{ speaker: "you", greek: "Κι εγώ", english: "Me too" },
];

const ASKING_FOR_HELP: DialogueLine[] = [
	{
		speaker: "you",
		greek: "Συγγνώμη, μπορείτε να με βοηθήσετε;",
		english: "Excuse me, can you help me?",
	},
	{ speaker: "stranger", greek: "Βέβαια", english: "Of course" },
	{
		speaker: "you",
		greek: "Πού είναι η στάση;",
		english: "Where is the stop?",
	},
	{ speaker: "stranger", greek: "Εκεί, δεξιά", english: "There, on the right" },
	{ speaker: "you", greek: "Ευχαριστώ πολύ", english: "Thank you very much" },
];

const COMPREHENSION_HELP: DialogueLine[] = [
	{
		speaker: "stranger",
		greek: "Θέλετε να σας δείξω τον δρόμο;",
		english: "Do you want me to show you the way?",
	},
	{ speaker: "you", greek: "Πιο αργά, παρακαλώ", english: "Slower, please" },
	{
		speaker: "stranger",
		greek: "Θέλετε... να σας... δείξω...",
		english: "Do you want... me to show you...",
	},
	{
		speaker: "you",
		greek: "Συγγνώμη, δεν κατάλαβα",
		english: "Sorry, I didn't understand",
	},
	{
		speaker: "stranger",
		greek: "Να έρθω μαζί σας;",
		english: "Should I come with you?",
		note: "Simplified offer",
	},
	{
		speaker: "you",
		greek: "Ναι, ευχαριστώ πολύ!",
		english: "Yes, thank you very much!",
	},
];

const ASKING_OPINION: DialogueLine[] = [
	{
		speaker: "friend",
		greek: "Τι σου φαίνεται;",
		english: "What do you think?",
	},
	{
		speaker: "you",
		greek: "Μου φαίνεται καλό",
		english: "It seems good to me",
	},
	{ speaker: "friend", greek: "Σίγουρα;", english: "Are you sure?" },
	{ speaker: "you", greek: "Ναι, μ' αρέσει", english: "Yes, I like it" },
];

const MAKING_REQUESTS: DialogueLine[] = [
	{ speaker: "you", greek: "Περίμενέ με λίγο", english: "Wait for me a bit" },
	{ speaker: "friend", greek: "Εντάξει", english: "Okay" },
	{ speaker: "you", greek: "Άκουσέ με", english: "Listen to me" },
	{
		speaker: "friend",
		greek: "Λέγε",
		english: "Go ahead",
		note: "Literally 'say'",
	},
	{ speaker: "you", greek: "Δώσε μου το νερό", english: "Give me the water" },
	{ speaker: "friend", greek: "Ορίστε", english: "Here you go" },
];

export function RequestsTab() {
	const { mode } = useConversationContext();

	return (
		<div className="space-y-4">
			<ConversationHero
				icon={<Hand size={24} />}
				title="Quick Requests"
				greekPhrase="Βοήθησέ με!"
				description="Practical phrases for everyday needs. Asking for help, making introductions, and simple requests."
				colorScheme="honey"
			/>

			<ScenarioCard
				title="Introducing yourself"
				description="When meeting someone new"
				formality="formal"
				dialogue={INTRODUCTIONS}
				mode={mode}
			/>

			<ScenarioCard
				title="Asking for help"
				description="Getting directions or assistance"
				formality="formal"
				dialogue={ASKING_FOR_HELP}
				mode={mode}
			/>

			<ScenarioCard
				title="When you need help understanding"
				description="Essential survival phrases for beginners"
				formality="formal"
				dialogue={COMPREHENSION_HELP}
				mode={mode}
			/>

			<ScenarioCard
				title="Asking for opinions"
				description="Getting someone's thoughts"
				formality="informal"
				dialogue={ASKING_OPINION}
				mode={mode}
			/>

			<ScenarioCard
				title="Making simple requests"
				description="Common imperative phrases"
				formality="informal"
				dialogue={MAKING_REQUESTS}
				mode={mode}
			/>

			<LearningTips
				patterns={{
					title: "Patterns to Notice",
					items: [
						"Με λένε + name: 'They call me...' (standard intro)",
						"Imperatives with με: Βοήθησέ με, Άκουσέ με, Περίμενέ με",
						"Μου φαίνεται + adjective: 'It seems to me...'",
					],
				}}
				tips={{
					title: "Cultural Tips",
					items: [
						"Συγγνώμη works for both 'excuse me' and 'sorry'",
						"Ορίστε is the standard 'here you go' when handing something",
					],
				}}
				commonMistake={{
					wrong: "Πώς είσαι;",
					right: "Πώς σε λένε;",
					explanation:
						"Πώς είσαι means 'How are you?' - different question!",
				}}
			/>
		</div>
	);
}
