import { ChevronDown, ChevronLeft, ChevronUp, Star } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Link } from "react-router";
import { TabHero } from "@/components/TabHero";
import {
	IRREGULAR_VERBS,
	VERB_CONJUGATIONS,
	VERB_FAMILIES,
	VERB_PATTERNS,
} from "@/constants/verbs";
import { type ColorScheme, colorStyles } from "@/lib/colors";
import { cn } from "@/lib/utils";
import type { Route } from "./+types/route";

export { loader } from "./loader.server";

const PRONOUNS = {
	sg: ["I", "you", "s/he"],
	pl: ["we", "you", "they"],
};

type FrequencyLevel = 1 | 2 | 3;

const VERB_FREQUENCY: Record<string, FrequencyLevel> = {
	είμαι: 3,
	έχω: 3,
	θέλω: 3,
	κάνω: 3,
	λέω: 2,
	πάω: 2,
	τρώω: 1,
	μιλάω: 2,
	έρχομαι: 2,
	θυμάμαι: 1,
	μπορώ: 3,
};

const FrequencyStars: React.FC<{ level: FrequencyLevel }> = ({ level }) => (
	<div className="flex gap-0.5">
		{[1, 2, 3].map((star) => (
			<Star
				key={star}
				size={12}
				className={
					star <= level
						? "fill-honey-500 text-honey-500"
						: "fill-none text-stone-300"
				}
			/>
		))}
	</div>
);

interface ConjugationCellProps {
	form: string;
	pronoun: string;
	highlighted?: string;
	colorScheme?: ColorScheme;
}

const splitFormByEnding = (
	form: string,
	highlighted?: string,
): { stem: string; ending: string } | null => {
	if (!highlighted) return null;
	const ending = highlighted.replace(/^-/, "");
	if (form.endsWith(ending)) {
		return {
			stem: form.slice(0, form.length - ending.length),
			ending,
		};
	}
	return null;
};

const endingColors: Record<ColorScheme, string> = {
	ocean: "text-ocean-500 font-bold",
	terracotta: "text-terracotta-600 font-bold",
	olive: "text-olive-500 font-bold",
	honey: "text-honey-500 font-bold",
	navy: "text-navy-500 font-bold",
	slate: "text-slate-500 font-bold",
};

const ConjugationCell: React.FC<ConjugationCellProps> = ({
	form,
	pronoun,
	highlighted,
	colorScheme = "olive",
}) => {
	const split = splitFormByEnding(form, highlighted);

	return (
		<div className="flex items-baseline gap-1.5 min-w-0">
			<span className="font-mono text-sm font-bold">
				{split ? (
					<>
						<span className="text-stone-800">{split.stem}</span>
						<span className={endingColors[colorScheme]}>{split.ending}</span>
					</>
				) : (
					<span className="text-stone-800">{form}</span>
				)}
			</span>
			<span className="text-xs text-stone-400 shrink-0">({pronoun})</span>
		</div>
	);
};

interface VerbFormWithHighlight {
	form: string;
	highlighted?: string;
}

interface VerbCardProps {
	infinitive: string;
	meaning: string;
	forms: {
		sg1: string | VerbFormWithHighlight;
		sg2: string | VerbFormWithHighlight;
		sg3: string | VerbFormWithHighlight;
		pl1: string | VerbFormWithHighlight;
		pl2: string | VerbFormWithHighlight;
		pl3: string | VerbFormWithHighlight;
	};
	note?: string;
	examples?: Array<{ greek: string; english: string }>;
	frequency?: FrequencyLevel;
	category?: string;
	subtitle?: string;
	colorScheme?: ColorScheme;
	footer?: React.ReactNode;
}

const extractForm = (
	f: string | VerbFormWithHighlight,
): { form: string; highlighted?: string } =>
	typeof f === "string" ? { form: f } : f;

const VerbCard: React.FC<VerbCardProps> = ({
	infinitive,
	meaning,
	forms,
	note,
	examples,
	frequency = 2,
	category,
	subtitle,
	colorScheme = "olive",
	footer,
}) => {
	const [showExamples, setShowExamples] = useState(false);
	const styles = colorStyles[colorScheme];

	const singularForms = [forms.sg1, forms.sg2, forms.sg3].map(extractForm);
	const pluralForms = [forms.pl1, forms.pl2, forms.pl3].map(extractForm);

	return (
		<div
			className={cn(
				"rounded-xl overflow-hidden border-2",
				category ? styles.border : "border-stone-200",
			)}
		>
			{category && (
				<header className={cn("px-3 py-2", styles.header)}>
					<h3 className="font-black tracking-wide text-white text-sm">
						{category}
					</h3>
					{subtitle && (
						<p className="text-white/80 text-xs mt-0.5">{subtitle}</p>
					)}
				</header>
			)}

			<div className="p-3 bg-white">
				<div className="mb-3">
					<div className="flex items-center gap-2">
						<h4 className="font-mono text-lg font-bold text-stone-800">
							{infinitive}
						</h4>
						<FrequencyStars level={frequency} />
					</div>
					<p className="text-sm text-stone-600">{meaning}</p>
				</div>

				<div>
					<div className="grid grid-cols-2 gap-2 mb-1.5">
						<div className="text-xs font-medium text-stone-400 uppercase tracking-wide">
							Singular
						</div>
						<div className="text-xs font-medium text-stone-400 uppercase tracking-wide">
							Plural
						</div>
					</div>
					{[0, 1, 2].map((idx) => (
						<div
							key={idx}
							className="grid grid-cols-2 gap-2 py-1.5 border-b border-stone-100 last:border-0"
						>
							<ConjugationCell
								form={singularForms[idx]?.form ?? ""}
								highlighted={singularForms[idx]?.highlighted}
								pronoun={PRONOUNS.sg[idx] ?? ""}
								colorScheme={colorScheme}
							/>
							<ConjugationCell
								form={pluralForms[idx]?.form ?? ""}
								highlighted={pluralForms[idx]?.highlighted}
								pronoun={PRONOUNS.pl[idx] ?? ""}
								colorScheme={colorScheme}
							/>
						</div>
					))}
				</div>

				{note && (
					<div className="mt-2 pt-2 border-t border-stone-100">
						<p className="text-sm text-stone-600 italic">{note}</p>
					</div>
				)}
			</div>

			{examples && examples.length > 0 && (
				<div className="border-t border-stone-200">
					<button
						type="button"
						onClick={() => setShowExamples(!showExamples)}
						className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-stone-600 hover:bg-stone-50 transition-colors"
					>
						{showExamples ? (
							<>
								<ChevronUp size={14} />
								<span>Hide examples</span>
							</>
						) : (
							<>
								<ChevronDown size={14} />
								<span>Examples</span>
							</>
						)}
					</button>

					{showExamples && (
						<div className="bg-stone-50 border-t border-stone-200 p-3 space-y-2">
							{examples.map((example) => (
								<div key={example.greek}>
									<p className="font-mono text-sm text-stone-800">
										{example.greek}
									</p>
									<p className="text-xs text-stone-500">{example.english}</p>
								</div>
							))}
						</div>
					)}
				</div>
			)}

			{footer && (
				<div className="border-t border-stone-200 bg-stone-50 px-3 py-2">
					{footer}
				</div>
			)}
		</div>
	);
};

interface VerbListProps {
	verbs: Array<{ id: number; greek: string; english: string }>;
	label: string;
}

const VerbList: React.FC<VerbListProps> = ({ verbs, label }) => (
	<details className="group">
		<summary className="cursor-pointer text-sm text-stone-600 hover:text-stone-800 flex items-center gap-1">
			<ChevronDown
				size={14}
				className="group-open:rotate-180 transition-transform"
			/>
			<span>
				All {verbs.length} {label}
			</span>
		</summary>
		<div className="mt-2 grid grid-cols-2 gap-1.5">
			{verbs.map((verb) => (
				<div
					key={verb.id}
					className="flex items-baseline gap-2 p-1.5 bg-white/60 rounded"
				>
					<span className="font-mono text-sm font-medium text-stone-800">
						{verb.greek}
					</span>
					<span className="text-xs text-stone-500">{verb.english}</span>
				</div>
			))}
		</div>
	</details>
);

const PATTERN_GUIDE_DATA = [
	{
		ending: "-ω",
		pattern: "Active",
		description: "The default — most verbs (βλέπω, θέλω, έχω)",
		colorScheme: "ocean" as ColorScheme,
	},
	{
		ending: "-άω/-ώ",
		pattern: "Contracted",
		description: "Verbs that 'swallow' their α (μιλάω, αγαπάω, ρωτάω)",
		colorScheme: "terracotta" as ColorScheme,
	},
	{
		ending: "-μαι",
		pattern: "Deponent",
		description:
			"Ending says 'I am ___ed' but means 'I ___' — έρχομαι = I come",
		colorScheme: "olive" as ColorScheme,
	},
];

const PatternGuide: React.FC = () => (
	<div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
		<h3 className="text-xs font-semibold text-stone-500 uppercase tracking-wide px-3 pt-3 pb-2">
			Which pattern?
		</h3>
		<div className="divide-y divide-stone-100">
			{PATTERN_GUIDE_DATA.map((item) => (
				<div key={item.ending} className="px-3 py-2.5">
					<div className="flex items-baseline gap-2">
						<span
							className={cn(
								"font-mono font-bold text-base",
								endingColors[item.colorScheme],
							)}
						>
							{item.ending}
						</span>
						<span className="font-medium text-stone-700 text-sm">
							{item.pattern}
						</span>
					</div>
					<p className="text-stone-500 text-xs mt-0.5 leading-relaxed">
						{item.description}
					</p>
				</div>
			))}
		</div>
	</div>
);

const ActivePassiveExplainer: React.FC = () => (
	<details className="bg-stone-50 rounded-lg border border-stone-200">
		<summary className="cursor-pointer px-3 py-2 text-sm font-medium text-stone-600 hover:text-stone-800 flex items-center gap-1.5">
			<ChevronDown
				size={14}
				className="transition-transform [details[open]_&]:rotate-180"
			/>
			What's active/passive?
		</summary>
		<div className="px-3 pb-3 pt-1 space-y-3 text-sm">
			<div>
				<p className="font-medium text-stone-700">Active</p>
				<p className="text-stone-500 text-xs">Subject DOES the action</p>
				<p className="mt-1">
					<span className="font-mono font-bold text-stone-800">
						βλέπω τον φίλο
					</span>
					<span className="text-stone-500 text-xs ml-2">
						= I see the friend
					</span>
				</p>
			</div>
			<div>
				<p className="font-medium text-stone-700">Passive</p>
				<p className="text-stone-500 text-xs">Subject RECEIVES the action</p>
				<p className="mt-1">
					<span className="font-mono font-bold text-stone-800">βλέπομαι</span>
					<span className="text-stone-500 text-xs ml-2">= I am seen</span>
				</p>
			</div>
			<div>
				<p className="font-medium text-stone-700">Deponent</p>
				<p className="text-stone-500 text-xs">
					-μαι ending but YOU'RE doing the action
				</p>
				<p className="mt-1">
					<span className="font-mono font-bold text-stone-800">έρχομαι</span>
					<span className="text-stone-500 text-xs ml-2">
						= I come (not "I am come-d")
					</span>
				</p>
			</div>
		</div>
	</details>
);

const PATTERN_COMPARISON_DATA = {
	pronouns: ["I", "you", "s/he", "we", "you (pl)", "they"],
	patterns: [
		{
			name: "-ω",
			colorScheme: "ocean" as ColorScheme,
			endings: ["-ω", "-εις", "-ει", "-ουμε", "-ετε", "-ουν"],
		},
		{
			name: "-άω",
			colorScheme: "terracotta" as ColorScheme,
			endings: ["-άω", "-άς", "-άει", "-άμε", "-άτε", "-άνε"],
		},
		{
			name: "-μαι",
			colorScheme: "olive" as ColorScheme,
			endings: ["-ομαι", "-εσαι", "-εται", "-όμαστε", "-εστε", "-ονται"],
		},
	],
};

const PatternComparison: React.FC = () => (
	<div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
		<h3 className="text-xs font-semibold text-stone-500 uppercase tracking-wide px-3 pt-3 pb-2">
			Ending patterns
		</h3>
		<div className="overflow-x-auto">
			<table className="w-full text-sm">
				<thead>
					<tr className="border-b border-stone-200">
						<th className="text-left text-xs text-stone-400 font-normal px-3 py-1.5 w-16" />
						{PATTERN_COMPARISON_DATA.patterns.map((p) => (
							<th
								key={p.name}
								className={cn(
									"text-center font-bold font-mono px-2 py-1.5",
									endingColors[p.colorScheme],
								)}
							>
								{p.name}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{PATTERN_COMPARISON_DATA.pronouns.map((pronoun, idx) => (
						<tr
							key={pronoun}
							className={cn(
								idx !== PATTERN_COMPARISON_DATA.pronouns.length - 1 &&
									"border-b border-stone-100",
							)}
						>
							<td className="text-xs text-stone-500 px-3 py-1.5">{pronoun}</td>
							{PATTERN_COMPARISON_DATA.patterns.map((p) => (
								<td
									key={p.name}
									className={cn(
										"text-center font-mono px-2 py-1.5",
										endingColors[p.colorScheme],
									)}
								>
									{p.endings[idx]}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	</div>
);

const IRREGULAR_HEADERS: Record<
	string,
	{ category: string; subtitle: string }
> = {
	είμαι: {
		category: "είμαι (to be)",
		subtitle: "Unique — no other verb works like this",
	},
	λέω: {
		category: "λέω (to say)",
		subtitle: "Short stem creates contractions",
	},
	τρώω: {
		category: "τρώω (to eat)",
		subtitle: "Same contraction pattern as λέω",
	},
	πάω: {
		category: "πάω (to go)",
		subtitle: "Regular alternative: πηγαίνω",
	},
};

const VERB_EXAMPLES: Record<
	string,
	Array<{ greek: string; english: string }>
> = {
	είμαι: [
		{ greek: "Είμαι καλά.", english: "I'm fine." },
		{ greek: "Είσαι έτοιμος;", english: "Are you ready?" },
		{ greek: "Είναι φίλος μου.", english: "He's my friend." },
		{ greek: "Είμαστε εδώ.", english: "We're here." },
	],
	λέω: [
		{ greek: "Τι λες;", english: "What are you saying?" },
		{ greek: "Τα λέμε!", english: "See you later!" },
		{ greek: "Λέει ότι έρχεται.", english: "She says she's coming." },
	],
	τρώω: [
		{ greek: "Τρώω πρωινό.", english: "I'm eating breakfast." },
		{ greek: "Τι τρώτε;", english: "What are you (pl) eating?" },
	],
	πάω: [
		{ greek: "Πάω σπίτι.", english: "I'm going home." },
		{ greek: "Πάμε!", english: "Let's go!" },
		{ greek: "Πού πάτε;", english: "Where are you going?" },
	],
	κάνω: [
		{ greek: "Τι κάνεις;", english: "How are you? (What do you do?)" },
		{ greek: "Κάνει κρύο.", english: "It's cold." },
		{ greek: "Κάνουμε διάλειμμα.", english: "We're taking a break." },
	],
	μιλάω: [
		{ greek: "Μιλάς ελληνικά;", english: "Do you speak Greek?" },
		{ greek: "Δεν μιλάμε πολύ.", english: "We don't speak much." },
	],
	έρχομαι: [
		{ greek: "Έρχομαι αύριο.", english: "I'm coming tomorrow." },
		{ greek: "Πότε έρχεσαι;", english: "When are you coming?" },
	],
	θυμάμαι: [
		{ greek: "Δεν θυμάμαι.", english: "I don't remember." },
		{ greek: "Θυμάσαι;", english: "Do you remember?" },
	],
};

export default function VerbsPage({ loaderData }: Route.ComponentProps) {
	const { verbs } = loaderData;

	const regularCategories = verbs.categories
		.filter((c) => c.title !== "irregular")
		.map((category) => {
			const familyConfig = VERB_FAMILIES[category.title];
			const colorScheme = familyConfig?.colorScheme ?? "olive";
			const displayTitle = familyConfig?.displayName ?? category.title;

			const patternKey = familyConfig?.patternKey ?? null;
			const conjugationKey = familyConfig?.conjugationKey ?? null;
			const pattern = patternKey ? VERB_PATTERNS[patternKey] : null;
			const conjugation = conjugationKey
				? VERB_CONJUGATIONS[conjugationKey]
				: null;

			if (!pattern || !conjugation) return null;

			const infinitive = pattern.canonical.infinitive;

			return {
				id: category.id,
				infinitive,
				meaning: pattern.canonical.meaning,
				forms: {
					sg1: {
						form: conjugation[0]?.form ?? "",
						highlighted: conjugation[0]?.highlighted,
					},
					sg2: {
						form: conjugation[1]?.form ?? "",
						highlighted: conjugation[1]?.highlighted,
					},
					sg3: {
						form: conjugation[2]?.form ?? "",
						highlighted: conjugation[2]?.highlighted,
					},
					pl1: {
						form: conjugation[3]?.form ?? "",
						highlighted: conjugation[3]?.highlighted,
					},
					pl2: {
						form: conjugation[4]?.form ?? "",
						highlighted: conjugation[4]?.highlighted,
					},
					pl3: {
						form: conjugation[5]?.form ?? "",
						highlighted: conjugation[5]?.highlighted,
					},
				},
				examples: VERB_EXAMPLES[infinitive] ?? pattern.usage,
				frequency: VERB_FREQUENCY[infinitive] ?? 2,
				category: displayTitle,
				subtitle: familyConfig?.description || `${category.verbs.length} verbs`,
				colorScheme,
				verbs: category.verbs,
				shortName: familyConfig?.shortName ?? "verbs",
			};
		})
		.filter((cat): cat is NonNullable<typeof cat> => cat !== null);

	const eimai = IRREGULAR_VERBS.find((v) => v.infinitive === "είμαι");
	const shortStemIrregulars = IRREGULAR_VERBS.filter(
		(v) => v.infinitive !== "είμαι",
	).sort(
		(a, b) =>
			(VERB_FREQUENCY[b.infinitive] ?? 2) - (VERB_FREQUENCY[a.infinitive] ?? 2),
	);

	return (
		<div className="space-y-4">
			<Link
				to="/learn"
				className="inline-flex items-center gap-1 text-sm text-stone-600 hover:text-stone-800 transition-colors"
			>
				<ChevronLeft size={16} />
				<span>Learn</span>
			</Link>

			<TabHero
				title="Verbs"
				greekPhrase="κάνω, μιλάω, έρχομαι"
				colorScheme="olive"
			>
				Patterns and conjugations organised by frequency.
			</TabHero>

			<PatternGuide />

			<ActivePassiveExplainer />

			<PatternComparison />

			{eimai && (
				<VerbCard
					infinitive={eimai.infinitive}
					meaning={eimai.meaning}
					forms={eimai.forms}
					note={eimai.note}
					examples={VERB_EXAMPLES[eimai.infinitive]}
					frequency={VERB_FREQUENCY[eimai.infinitive] ?? 3}
					category={IRREGULAR_HEADERS[eimai.infinitive]?.category}
					subtitle={IRREGULAR_HEADERS[eimai.infinitive]?.subtitle}
					colorScheme="honey"
				/>
			)}

			<div className="grid gap-3 md:grid-cols-2">
				{regularCategories.map((cat) => (
					<VerbCard
						key={cat.id}
						infinitive={cat.infinitive}
						meaning={cat.meaning}
						forms={cat.forms}
						examples={cat.examples}
						frequency={cat.frequency as FrequencyLevel}
						category={cat.category}
						subtitle={cat.subtitle}
						colorScheme={cat.colorScheme as ColorScheme}
						footer={
							cat.verbs.length > 1 ? (
								<VerbList verbs={cat.verbs} label={cat.shortName} />
							) : null
						}
					/>
				))}
			</div>

			<div className="space-y-3">
				<h2 className="font-bold text-stone-700 text-sm px-1">
					Short-stem irregulars
				</h2>
				<div className="grid gap-3 md:grid-cols-2">
					{shortStemIrregulars.map((verb) => (
						<VerbCard
							key={verb.infinitive}
							infinitive={verb.infinitive}
							meaning={verb.meaning}
							forms={verb.forms}
							note={verb.note}
							examples={VERB_EXAMPLES[verb.infinitive]}
							frequency={VERB_FREQUENCY[verb.infinitive] ?? 2}
							category={IRREGULAR_HEADERS[verb.infinitive]?.category}
							subtitle={IRREGULAR_HEADERS[verb.infinitive]?.subtitle}
							colorScheme="honey"
						/>
					))}
				</div>
			</div>
		</div>
	);
}
