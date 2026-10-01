import {
	GreekText,
	ParadigmTable,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "kalimera";

const form = (stem: string, ending: string) => ({ stem, ending });

const TENSES = [
	{
		value: "present",
		greek: "Ενεστώτας",
		english: "Present",
		forms: {
			sg1: form("γράφ", "ω"),
			sg2: form("γράφ", "εις"),
			sg3: form("γράφ", "ει"),
			pl1: form("γράφ", "ουμε"),
			pl2: form("γράφ", "ετε"),
			pl3: form("γράφ", "ουν"),
		},
	},
	{
		value: "aorist",
		greek: "Αόριστος",
		english: "Aorist",
		forms: {
			sg1: form("έγραψ", "α"),
			sg2: form("έγραψ", "ες"),
			sg3: form("έγραψ", "ε"),
			pl1: form("γράψ", "αμε"),
			pl2: form("γράψ", "ατε"),
			pl3: form("έγραψ", "αν"),
		},
	},
	{
		value: "future",
		greek: "Μέλλοντας",
		english: "Future",
		forms: {
			sg1: form("θα γράψ", "ω"),
			sg2: form("θα γράψ", "εις"),
			sg3: form("θα γράψ", "ει"),
			pl1: form("θα γράψ", "ουμε"),
			pl2: form("θα γράψ", "ετε"),
			pl3: form("θα γράψ", "ουν"),
		},
	},
];

export const TenseNavigator = () => (
	<div className="p-4" style={{ maxWidth: "32rem" }}>
		<Tabs defaultValue="present" className="w-full">
			<TabsList className="h-auto w-full flex-wrap gap-1 bg-stone-100 p-1">
				{TENSES.map((tense) => (
					<TabsTrigger key={tense.value} value={tense.value} className="flex-1 px-3 py-2 text-sm">
						<span className="flex flex-col items-center gap-0.5">
							<span className="text-xs">{tense.greek}</span>
							<span className="text-xs text-stone-600">{tense.english}</span>
						</span>
					</TabsTrigger>
				))}
			</TabsList>
			{TENSES.map((tense) => (
				<TabsContent key={tense.value} value={tense.value} className="mt-2">
					<ParadigmTable meaning="to write" infinitive="γράφω" forms={tense.forms} />
				</TabsContent>
			))}
		</Tabs>
	</div>
);

export const Simple = () => (
	<div className="max-w-md p-4">
		<Tabs defaultValue="target">
			<TabsList>
				<TabsTrigger value="doer">Doer</TabsTrigger>
				<TabsTrigger value="target">Target</TabsTrigger>
				<TabsTrigger value="owner">Owner</TabsTrigger>
			</TabsList>
			<TabsContent value="doer" className="text-stone-700">
				Who is doing the action.
			</TabsContent>
			<TabsContent value="target" className="text-stone-700">
				What the action lands on: <GreekText size="inherit" tone="inherit">βλέπω τον φίλο</GreekText>, I see the friend.
			</TabsContent>
			<TabsContent value="owner" className="text-stone-700">
				Whose it is.
			</TabsContent>
		</Tabs>
	</div>
);

export const WithDisabledTab = () => (
	<div className="max-w-md p-4">
		<Tabs defaultValue="phrases">
			<TabsList>
				<TabsTrigger value="phrases">Phrases</TabsTrigger>
				<TabsTrigger value="conversations">Conversations</TabsTrigger>
				<TabsTrigger value="idioms" disabled>
					Idioms
				</TabsTrigger>
			</TabsList>
			<TabsContent value="phrases" className="text-stone-700">
				Set phrases for the café, the shop and the kiosk.
			</TabsContent>
			<TabsContent value="conversations" className="text-stone-700">
				Short exchanges to read aloud.
			</TabsContent>
		</Tabs>
	</div>
);

export const FitsItsTabs = () => (
	<div className="max-w-sm p-4">
		<Tabs defaultValue="singular">
			<TabsList>
				<TabsTrigger value="singular">One</TabsTrigger>
				<TabsTrigger value="plural">More than one</TabsTrigger>
			</TabsList>
		</Tabs>
	</div>
);

export const FullWidth = () => (
	<div className="max-w-sm p-4">
		<Tabs defaultValue="phrases">
			<TabsList className="w-full">
				<TabsTrigger value="phrases">Phrases</TabsTrigger>
				<TabsTrigger value="conversations">Conversations</TabsTrigger>
				<TabsTrigger value="essentials">Essentials</TabsTrigger>
			</TabsList>
		</Tabs>
	</div>
);

export const Wrapping = () => (
	<div className="max-w-sm p-4">
		<Tabs defaultValue="numbers">
			<TabsList className="h-auto w-full flex-wrap gap-1">
				<TabsTrigger value="greetings">Greetings</TabsTrigger>
				<TabsTrigger value="numbers">Numbers</TabsTrigger>
				<TabsTrigger value="days">Days</TabsTrigger>
				<TabsTrigger value="months">Months</TabsTrigger>
				<TabsTrigger value="colours">Colours</TabsTrigger>
				<TabsTrigger value="time">Telling the time</TabsTrigger>
			</TabsList>
		</Tabs>
	</div>
);

export const ActiveAndInactive = () => (
	<div className="max-w-sm p-4">
		<Tabs defaultValue="target">
			<TabsList>
				<TabsTrigger value="doer">Doer</TabsTrigger>
				<TabsTrigger value="target">Target</TabsTrigger>
				<TabsTrigger value="owner">Owner</TabsTrigger>
			</TabsList>
		</Tabs>
	</div>
);

export const Disabled = () => (
	<div className="max-w-sm p-4">
		<Tabs defaultValue="phrases">
			<TabsList>
				<TabsTrigger value="phrases">Phrases</TabsTrigger>
				<TabsTrigger value="conversations">Conversations</TabsTrigger>
				<TabsTrigger value="idioms" disabled>
					Idioms
				</TabsTrigger>
			</TabsList>
		</Tabs>
	</div>
);

const TENSE_LABELS = [
	{ value: "present", greek: "Ενεστώτας", english: "Present" },
	{ value: "aorist", greek: "Αόριστος", english: "Past" },
	{ value: "future", greek: "Μέλλοντας", english: "Future" },
];

export const GreekAndEnglish = () => (
	<div className="max-w-sm p-4">
		<Tabs defaultValue="aorist">
			<TabsList className="h-auto w-full">
				{TENSE_LABELS.map((tense) => (
					<TabsTrigger key={tense.value} value={tense.value} className="py-1.5">
						<span className="flex flex-col items-center gap-0.5">
							<GreekText size="sm">{tense.greek}</GreekText>
							<span className="text-xs text-stone-600">{tense.english}</span>
						</span>
					</TabsTrigger>
				))}
			</TabsList>
		</Tabs>
	</div>
);

export const ProsePanel = () => (
	<div className="max-w-sm p-4">
		<Tabs defaultValue="target">
			<TabsList>
				<TabsTrigger value="doer">Doer</TabsTrigger>
				<TabsTrigger value="target">Target</TabsTrigger>
				<TabsTrigger value="owner">Owner</TabsTrigger>
			</TabsList>
			<TabsContent value="doer" className="text-sm text-stone-700">
				Who is doing the action.
			</TabsContent>
			<TabsContent value="target" className="space-y-2 text-sm text-stone-700">
				<p>What the action lands on.</p>
				<p>
					<GreekText size="lg">Βλέπω τον φίλο.</GreekText>{" "}
					<span className="text-stone-500">I see the friend.</span>
				</p>
			</TabsContent>
			<TabsContent value="owner" className="text-sm text-stone-700">
				Whose it is.
			</TabsContent>
		</Tabs>
	</div>
);

export const TablePanel = () => (
	<div className="max-w-sm p-4">
		<Tabs defaultValue="aorist">
			<TabsList className="w-full">
				<TabsTrigger value="present">Present</TabsTrigger>
				<TabsTrigger value="aorist">Past</TabsTrigger>
			</TabsList>
			<TabsContent value="present">
				<ParadigmTable
					meaning="to write"
					infinitive="γράφω"
					forms={{
						sg1: form("γράφ", "ω"),
						sg2: form("γράφ", "εις"),
						sg3: form("γράφ", "ει"),
						pl1: form("γράφ", "ουμε"),
						pl2: form("γράφ", "ετε"),
						pl3: form("γράφ", "ουν"),
					}}
				/>
			</TabsContent>
			<TabsContent value="aorist">
				<ParadigmTable
					meaning="to write"
					infinitive="γράφω"
					forms={{
						sg1: form("έγραψ", "α"),
						sg2: form("έγραψ", "ες"),
						sg3: form("έγραψ", "ε"),
						pl1: form("γράψ", "αμε"),
						pl2: form("γράψ", "ατε"),
						pl3: form("έγραψ", "αν"),
					}}
				/>
			</TabsContent>
		</Tabs>
	</div>
);

const GREETINGS = [
	{ greek: "Καλημέρα", english: "Good morning" },
	{ greek: "Καλησπέρα", english: "Good evening" },
	{ greek: "Καληνύχτα", english: "Good night" },
];

export const PhraseList = () => (
	<div className="max-w-sm p-4">
		<Tabs defaultValue="greetings">
			<TabsList>
				<TabsTrigger value="greetings">Greetings</TabsTrigger>
				<TabsTrigger value="cafe">At the café</TabsTrigger>
			</TabsList>
			<TabsContent value="greetings">
				<ul className="divide-y divide-stone-200">
					{GREETINGS.map((row) => (
						<li key={row.greek} className="flex items-baseline justify-between gap-4 py-2">
							<GreekText size="lg">{row.greek}</GreekText>
							<span className="text-sm text-stone-500">{row.english}</span>
						</li>
					))}
				</ul>
			</TabsContent>
			<TabsContent value="cafe">
				<GreekText size="lg">Έναν φραπέ, παρακαλώ.</GreekText>
			</TabsContent>
		</Tabs>
	</div>
);
