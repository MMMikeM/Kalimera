import {
	GreekText,
	NavigatorCard,
	NavigatorCell,
} from "kalimera";

const PREPOSITIONS = [
	{
		question: "Where is it, or where to?",
		answer: "σε / στο",
		examples: [
			{ greek: "Πάω στο σπίτι", english: "I'm going home" },
			{ greek: "Είμαι στη δουλειά", english: "I'm at work" },
		],
	},
	{
		question: "Where from?",
		answer: "από",
		examples: [
			{ greek: "Είμαι από την Ελλάδα", english: "I'm from Greece" },
			{ greek: "Έρχομαι από τη δουλειά", english: "I'm coming from work" },
		],
	},
	{
		question: "With whom, or with what?",
		answer: "με",
		examples: [
			{ greek: "Καφέ με γάλα", english: "coffee with milk" },
			{ greek: "Μένω με τους γονείς μου", english: "I live with my parents" },
		],
	},
	{
		question: "For whom, or what for?",
		answer: "για",
		examples: [
			{ greek: "Αυτό είναι για σένα", english: "this is for you" },
			{ greek: "Ευχαριστώ για όλα", english: "thanks for everything" },
		],
	},
];

export const Grid = () => (
	<div className="max-w-2xl">
		<NavigatorCard
			title="Which preposition do I need?"
			subtitle={
				<>
					Ask yourself what <strong>relationship</strong> you're describing:
				</>
			}
			layout="grid"
			footer={
				<>
					<strong>Remember:</strong> σε is the most common and contracts with articles (σε + το =
					στο). The others stay unchanged.
				</>
			}
		>
			{PREPOSITIONS.map((option) => (
				<NavigatorCell key={option.answer}>
					<div className="mb-2 text-sm text-stone-500">{option.question}</div>
					<div className="mb-3">
						<GreekText size="xl" className="font-bold text-honey-text">
							{option.answer}
						</GreekText>
					</div>
					<div className="space-y-1">
						{option.examples.map((ex) => (
							<div key={ex.greek} className="text-sm">
								<GreekText size="sm" className="text-stone-700">
									{ex.greek}
								</GreekText>
								<span className="ml-2 text-xs text-stone-500">{ex.english}</span>
							</div>
						))}
					</div>
				</NavigatorCell>
			))}
		</NavigatorCard>
	</div>
);

const PATTERNS = [
	{
		ending: "-ω",
		name: "Active",
		bg: "bg-navy-100",
		border: "border-navy-300",
		text: "text-navy-text",
		examples: ["κάνω", "θέλω", "βλέπω"],
	},
	{
		ending: "-άω",
		name: "Contracted",
		bg: "bg-slate-100",
		border: "border-slate-300",
		text: "text-slate-text",
		examples: ["μιλάω", "αγαπάω"],
	},
	{
		ending: "-μαι",
		name: "Deponent",
		bg: "bg-sunset-100",
		border: "border-sunset-300",
		text: "text-sunset-text",
		examples: ["έρχομαι", "θυμάμαι"],
	},
];

export const Stack = () => (
	<div className="max-w-2xl">
		<NavigatorCard
			title="Which pattern?"
			subtitle="Look at the verb's dictionary form, the one for I."
		>
			{PATTERNS.map((row) => (
				<NavigatorCell
					key={row.name}
					className={`${row.bg} ${row.border} flex items-center gap-4 border-2`}
				>
					<GreekText size="xl" weight="bold" className={`w-16 shrink-0 ${row.text}`}>
						{row.ending}
					</GreekText>
					<span className="font-semibold text-stone-800">{row.name}</span>
					<div className="ml-auto flex gap-2">
						{row.examples.map((ex) => (
							<GreekText
								key={ex}
								size="sm"
								className={`rounded-md border bg-card px-2 py-1 ${row.border} ${row.text}`}
							>
								{ex}
							</GreekText>
						))}
					</div>
				</NavigatorCell>
			))}
		</NavigatorCard>
	</div>
);

const MapPinIcon = () => (
	<svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
		<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
		<circle cx="12" cy="10" r="3" />
	</svg>
);

const UsersIcon = () => (
	<svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
		<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
		<circle cx="9" cy="7" r="4" />
		<path d="M22 21v-2a4 4 0 0 0-3-3.87" />
		<path d="M16 3.13a4 4 0 0 1 0 7.75" />
	</svg>
);

export const QuestionAndAnswer = () => (
	<div className="max-w-sm p-4">
		<NavigatorCell>
			<div className="mb-2 text-sm text-stone-500">Where from?</div>
			<div className="mb-3">
				<GreekText size="xl" className="font-bold text-honey-text">
					από
				</GreekText>
			</div>
			<div className="space-y-1">
				<div className="text-sm">
					<GreekText size="sm" className="text-stone-700">
						Είμαι από την Ελλάδα
					</GreekText>
					<span className="ml-2 text-xs text-stone-500">I'm from Greece</span>
				</div>
				<div className="text-sm">
					<GreekText size="sm" className="text-stone-700">
						Έρχομαι από τη δουλειά
					</GreekText>
					<span className="ml-2 text-xs text-stone-500">I'm coming from work</span>
				</div>
			</div>
		</NavigatorCell>
	</div>
);

const OPTIONS = [
	{
		Icon: MapPinIcon,
		question: "Where is it, or where to?",
		answer: "σε / στο",
		example: { greek: "Πάω στο σπίτι", english: "I'm going home" },
	},
	{
		Icon: UsersIcon,
		question: "With whom, or with what?",
		answer: "με",
		example: { greek: "Καφέ με γάλα", english: "coffee with milk" },
	},
];

export const WithIcons = () => (
	<div className="max-w-sm p-4">
		<NavigatorCard title="Which preposition do I need?">
			{OPTIONS.map(({ Icon, question, answer, example }) => (
				<NavigatorCell key={answer}>
					<div className="flex items-start gap-3">
						<div className="mt-0.5 text-honey-text">
							<Icon />
						</div>
						<div className="min-w-0 flex-1">
							<div className="mb-2 text-sm text-stone-500">{question}</div>
							<GreekText size="xl" className="mb-2 block font-bold text-honey-text">
								{answer}
							</GreekText>
							<div className="text-sm">
								<GreekText size="sm" className="text-stone-700">
									{example.greek}
								</GreekText>
								<span className="ml-2 text-xs text-stone-500">{example.english}</span>
							</div>
						</div>
					</div>
				</NavigatorCell>
			))}
		</NavigatorCard>
	</div>
);

export const Coloured = () => (
	<div className="max-w-sm p-4">
		<NavigatorCell className="flex items-center gap-4 border-2 border-sunset-300 bg-sunset-100">
			<GreekText size="xl" weight="bold" className="w-16 shrink-0 text-sunset-text">
				-μαι
			</GreekText>
			<span className="font-semibold text-stone-800">Deponent</span>
			<div className="ml-auto flex gap-2">
				{["έρχομαι", "θυμάμαι"].map((ex) => (
					<GreekText
						key={ex}
						size="sm"
						className="rounded-md border border-sunset-300 bg-card px-2 py-1 text-sunset-text"
					>
						{ex}
					</GreekText>
				))}
			</div>
		</NavigatorCell>
	</div>
);
