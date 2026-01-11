import { ChevronDown, ChevronUp, Star } from "lucide-react";
import type React from "react";
import { useState } from "react";

import { useOutletContext } from "react-router";
import { TabHero } from "@/components/TabHero";
import { colorStyles, type ColorScheme } from "@/lib/colors";
import { cn } from "@/lib/utils";
import {
	IRREGULAR_VERBS,
	VERB_CONJUGATIONS,
	VERB_FAMILIES,
	VERB_PATTERNS,
} from "@/constants/verbs";
import type { VocabularyLoaderData } from "../components/shared";

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
}

const ConjugationCell: React.FC<ConjugationCellProps> = ({ form, pronoun }) => (
	<div className="flex items-baseline gap-1.5 min-w-0">
		<span className="font-mono text-sm font-semibold text-stone-800">
			{form}
		</span>
		<span className="text-xs text-stone-400 shrink-0">({pronoun})</span>
	</div>
);

interface VerbCardProps {
	infinitive: string;
	meaning: string;
	forms: {
		sg1: string;
		sg2: string;
		sg3: string;
		pl1: string;
		pl2: string;
		pl3: string;
	};
	note?: string;
	examples?: Array<{ greek: string; english: string }>;
	frequency?: FrequencyLevel;
	category?: string;
	subtitle?: string;
	colorScheme?: ColorScheme;
	footer?: React.ReactNode;
}

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

	const singularForms = [forms.sg1, forms.sg2, forms.sg3];
	const pluralForms = [forms.pl1, forms.pl2, forms.pl3];

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
				<div className="flex items-start justify-between mb-3">
					<div>
						<div className="flex items-center gap-2 mb-0.5">
							<FrequencyStars level={frequency} />
						</div>
						<h4 className="font-mono text-lg font-bold text-stone-800">
							{infinitive}
						</h4>
						<p className="text-sm text-stone-600">{meaning}</p>
					</div>
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
								form={singularForms[idx] ?? ""}
								pronoun={PRONOUNS.sg[idx] ?? ""}
							/>
							<ConjugationCell
								form={pluralForms[idx] ?? ""}
								pronoun={PRONOUNS.pl[idx] ?? ""}
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

const VERB_EXAMPLES: Record<string, Array<{ greek: string; english: string }>> =
	{
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

export function VerbsRefactorTab() {
	const data = useOutletContext<VocabularyLoaderData>();

	const regularCategories = data.verbs.categories
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
					sg1: conjugation[0]?.form ?? "",
					sg2: conjugation[1]?.form ?? "",
					sg3: conjugation[2]?.form ?? "",
					pl1: conjugation[3]?.form ?? "",
					pl2: conjugation[4]?.form ?? "",
					pl3: conjugation[5]?.form ?? "",
				},
				examples: VERB_EXAMPLES[infinitive] ?? pattern.usage,
				frequency: VERB_FREQUENCY[infinitive] ?? 2,
				category: displayTitle,
				subtitle: familyConfig?.description ?? `${category.verbs.length} verbs`,
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
			(VERB_FREQUENCY[b.infinitive] ?? 2) -
			(VERB_FREQUENCY[a.infinitive] ?? 2),
	);

	return (
		<div className="space-y-4">
			<TabHero
				title="Verbs (Refactored)"
				greekPhrase="κάνω, μιλάω, έρχομαι"
				colorScheme="olive"
			>
				Organised by frequency and pattern.
			</TabHero>

			{/* 1. είμαι - unique, highest frequency */}
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

			{/* 2. Regular verb patterns - the main learning content */}
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

			{/* 3. Short-stem irregulars - exceptions to -ω pattern */}
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
