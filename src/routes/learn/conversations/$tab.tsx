import type React from "react";
import type { Route } from "./+types/$tab";
import { DoorOpen, Utensils, MessageCircle, Hand } from "lucide-react";
import { Card } from "@/components/Card";
import { DialogueScenario } from "@/components/DialogueExchange";
import { ConversationHero } from "@/components/ConversationHero";
import { ConversationModeToggle } from "@/components/ConversationModeToggle";
import type { DialogueLine, Formality, ConversationMode } from "@/components/DialogueExchange";
import { LearningTips, useConversationContext } from "./layout";

const VALID_TABS = ["arriving", "food", "smalltalk", "requests"] as const;
type TabId = (typeof VALID_TABS)[number];

export function loader({ params }: Route.LoaderArgs) {
	const tab = params.tab as string;

	if (!VALID_TABS.includes(tab as TabId)) {
		throw new Response("Not Found", { status: 404 });
	}

	return { tab: tab as TabId };
}

// Wrapper for individual scenario cards
const ScenarioCard: React.FC<{
	title: string;
	description: string;
	formality: Formality;
	dialogue: DialogueLine[];
	mode: ConversationMode;
}> = ({ title, description, formality, dialogue, mode }) => (
	<Card variant="bordered" padding="lg" className="border-stone-200">
		<DialogueScenario
			title={title}
			description={description}
			formality={formality}
			dialogue={dialogue}
			mode={mode}
		/>
	</Card>
);

// ═══════════════════════════════════════════════════════════════════════════════
// ARRIVING TAB
// ═══════════════════════════════════════════════════════════════════════════════
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

const ArrivingTab: React.FC = () => {
	const { mode, setMode } = useConversationContext();

	return (
		<div className="space-y-4">
			<ConversationHero
				icon={<DoorOpen size={24} />}
				title="Arriving & Leaving"
				greekPhrase="Καλώς ήρθατε!"
				description="The warmth of Greek hospitality starts at the door. Expect enthusiastic welcomes and reluctant goodbyes."
				colorScheme="olive"
			/>
			<ConversationModeToggle mode={mode} onModeChange={setMode} />

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
};

// ═══════════════════════════════════════════════════════════════════════════════
// FOOD TAB
// ═══════════════════════════════════════════════════════════════════════════════
const OFFERING_FOOD: DialogueLine[] = [
	{ speaker: "host", greek: "Θέλεις κάτι;", english: "Do you want something?" },
	{ speaker: "you", greek: "Τι έχεις;", english: "What do you have?" },
	{
		speaker: "host",
		greek: "Καφέ, τσάι, νερό...",
		english: "Coffee, tea, water...",
	},
	{
		speaker: "you",
		greek: "Ένα καφέ, ευχαριστώ",
		english: "A coffee, thank you",
	},
	{
		speaker: "host",
		greek: "Γλυκό, μέτριο, σκέτο;",
		english: "Sweet, medium, no sugar?",
		note: "Greek coffee options",
	},
	{ speaker: "you", greek: "Μέτριο, παρακαλώ", english: "Medium, please" },
];

const DURING_MEAL: DialogueLine[] = [
	{ speaker: "host", greek: "Φάε, φάε!", english: "Eat, eat!" },
	{
		speaker: "you",
		greek: "Είναι πολύ νόστιμο",
		english: "It's very delicious",
	},
	{ speaker: "host", greek: "Πάρε λίγο ακόμα", english: "Take some more" },
	{ speaker: "you", greek: "Χόρτασα", english: "I'm full" },
	{ speaker: "host", greek: "Σίγουρα;", english: "Are you sure?" },
	{
		speaker: "you",
		greek: "Ναι, ευχαριστώ πολύ",
		english: "Yes, thank you very much",
	},
];

const COMPLIMENTING_FOOD: DialogueLine[] = [
	{ speaker: "host", greek: "Άρεσε;", english: "Did you like it?" },
	{
		speaker: "you",
		greek: "Πολύ! Τι είναι αυτό;",
		english: "A lot! What is this?",
	},
	{ speaker: "host", greek: "Μουσακάς", english: "Moussaka" },
	{ speaker: "you", greek: "Είναι τέλειο", english: "It's perfect" },
	{
		speaker: "host",
		greek: "Θα σου δώσω τη συνταγή",
		english: "I'll give you the recipe",
	},
];

const CAFE_ORDER: DialogueLine[] = [
	{ speaker: "waiter", greek: "Τι θα πάρετε;", english: "What will you have?" },
	{
		speaker: "you",
		greek: "Έναν καφέ φραπέ, παρακαλώ",
		english: "A frappe, please",
	},
	{ speaker: "waiter", greek: "Με γάλα;", english: "With milk?" },
	{ speaker: "you", greek: "Ναι, με γάλα", english: "Yes, with milk" },
	{ speaker: "waiter", greek: "Τίποτα άλλο;", english: "Anything else?" },
	{ speaker: "you", greek: "Όχι, ευχαριστώ", english: "No, thank you" },
	{ speaker: "waiter", greek: "Αμέσως", english: "Right away" },
];

const FoodTab: React.FC = () => {
	const { mode, setMode } = useConversationContext();

	return (
		<div className="space-y-4">
			<ConversationHero
				icon={<Utensils size={24} />}
				title="Food & Hospitality"
				greekPhrase="Φάε, φάε!"
				description="Greek hospitality means constantly offering food and drink. Learn to accept graciously and politely decline when full."
				colorScheme="terracotta"
			/>
			<ConversationModeToggle mode={mode} onModeChange={setMode} />

			<ScenarioCard
				title="Being offered refreshments"
				description="Greeks will always offer you something to drink"
				formality="mixed"
				dialogue={OFFERING_FOOD}
				mode={mode}
			/>

			<ScenarioCard
				title="During a meal"
				description="Expect to be encouraged to eat more!"
				formality="informal"
				dialogue={DURING_MEAL}
				mode={mode}
			/>

			<ScenarioCard
				title="Complimenting the food"
				description="Show appreciation for home cooking"
				formality="informal"
				dialogue={COMPLIMENTING_FOOD}
				mode={mode}
			/>

			<ScenarioCard
				title="At a cafe"
				description="Ordering at a Greek kafeneio"
				formality="formal"
				dialogue={CAFE_ORDER}
				mode={mode}
			/>

			<LearningTips
				patterns={{
					title: "Patterns to Notice",
					items: [
						"Coffee options: γλυκό (sweet), μέτριο (medium), σκέτο (plain)",
						"Imperative repetition: Φάε, φάε! Πάρε, πάρε!",
						"Χόρτασα literally means 'I'm satisfied' - stronger than 'full'",
					],
				}}
				tips={{
					title: "Cultural Tips",
					items: [
						"Always accept at least a small amount - refusing is impolite",
						"Complimenting food is expected and appreciated",
					],
				}}
				commonMistake={{
					wrong: "Είμαι γεμάτος",
					right: "Χόρτασα",
					explanation:
						"Είμαι γεμάτος sounds odd in Greek - use χόρτασα for 'I'm full'",
				}}
			/>
		</div>
	);
};

// ═══════════════════════════════════════════════════════════════════════════════
// SMALLTALK TAB
// ═══════════════════════════════════════════════════════════════════════════════
const ORIGIN_CHAT: DialogueLine[] = [
	{ speaker: "friend", greek: "Από πού είσαι;", english: "Where are you from?" },
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

const SmalltalkTab: React.FC = () => {
	const { mode, setMode } = useConversationContext();

	return (
		<div className="space-y-4">
			<ConversationHero
				icon={<MessageCircle size={24} />}
				title="Small Talk"
				greekPhrase="Τι κάνεις;"
				description="Casual conversation with friends and acquaintances. Weather, work, family - the universal topics that connect us."
				colorScheme="ocean"
			/>
			<ConversationModeToggle mode={mode} onModeChange={setMode} />

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
};

// ═══════════════════════════════════════════════════════════════════════════════
// REQUESTS TAB
// ═══════════════════════════════════════════════════════════════════════════════
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

const RequestsTab: React.FC = () => {
	const { mode, setMode } = useConversationContext();

	return (
		<div className="space-y-4">
			<ConversationHero
				icon={<Hand size={24} />}
				title="Quick Requests"
				greekPhrase="Βοήθησέ με!"
				description="Practical phrases for everyday needs. Asking for help, making introductions, and simple requests."
				colorScheme="honey"
			/>
			<ConversationModeToggle mode={mode} onModeChange={setMode} />

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
};

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
export default function TabRoute({ loaderData }: Route.ComponentProps) {
	const { tab } = loaderData;

	switch (tab) {
		case "arriving":
			return <ArrivingTab />;
		case "food":
			return <FoodTab />;
		case "smalltalk":
			return <SmalltalkTab />;
		case "requests":
			return <RequestsTab />;
		default:
			return null;
	}
}
