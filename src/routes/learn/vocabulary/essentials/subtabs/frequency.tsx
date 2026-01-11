import { ChevronLeft, Lightbulb } from "lucide-react";
import { Link } from "react-router";
import { ContentSection } from "@/components/ContentSection";
import { MonoText } from "@/components/MonoText";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { EssentialsLoaderData } from "../data.server";

interface Props {
	data: EssentialsLoaderData;
}

const FREQUENCY_ORDER = [
	"ποτέ",
	"σχεδόν ποτέ",
	"σπάνια",
	"πότε πότε",
	"κάπου κάπου",
	"καμιά φορά",
	"μερικές φορές",
	"συχνά",
	"πολλές φορές",
	"συνήθως",
	"σχεδόν πάντα",
	"πάντα",
];

const FREQUENCY_PERCENT: Record<string, number> = {
	ποτέ: 0,
	"σχεδόν ποτέ": 5,
	σπάνια: 10,
	"πότε πότε": 20,
	"κάπου κάπου": 25,
	"καμιά φορά": 30,
	"μερικές φορές": 40,
	συχνά: 60,
	"πολλές φορές": 65,
	συνήθως: 80,
	"σχεδόν πάντα": 95,
	πάντα: 100,
};

const USAGE_EXAMPLES = [
	{ greek: "Ποτέ δεν πίνω καφέ.", english: "I never drink coffee." },
	{ greek: "Σπάνια τρώω έξω.", english: "I rarely eat out." },
	{ greek: "Καμιά φορά βλέπω ταινίες.", english: "Sometimes I watch films." },
	{ greek: "Συχνά περπατάω στο πάρκο.", english: "I often walk in the park." },
	{ greek: "Συνήθως ξυπνάω στις 7.", english: "I usually wake up at 7." },
	{
		greek: "Πάντα πίνω νερό το πρωί.",
		english: "I always drink water in the morning.",
	},
];

export function FrequencySubtab({ data }: Props) {
	const adverbByGreek = new Map(data.frequencyAdverbs.map((a) => [a.greek, a]));

	return (
		<div className="space-y-6">
			<Link
				to="/learn/vocabulary/essentials"
				className="inline-flex items-center gap-1 text-sm text-stone-600 hover:text-stone-900"
			>
				<ChevronLeft size={16} />
				Essentials
			</Link>

			{/* Frequency Spectrum */}
			<ContentSection
				title="Frequency"
				subtitle="never → always"
				colorScheme="olive"
			>
				<div className="divide-y divide-stone-200/60">
					{FREQUENCY_ORDER.map((greek) => {
						const adverb = adverbByGreek.get(greek);
						const percent = FREQUENCY_PERCENT[greek] ?? 50;
						return (
							<div key={greek} className="py-2.5 px-3">
								<div className="flex items-center justify-between gap-3">
									<div className="min-w-0">
										<MonoText variant="greek">{greek}</MonoText>
										<div className="text-xs text-stone-500">
											{adverb?.english ?? greek}
										</div>
									</div>
									<div className="w-24 h-2 bg-stone-200 rounded-full overflow-hidden shrink-0">
										<div
											className="h-full bg-olive-500 rounded-full"
											style={{ width: `${percent}%` }}
										/>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</ContentSection>

			{/* Accent Warning */}
			<ContentSection
				title="Watch the Accent"
				subtitle="ποτέ vs πότε"
				colorScheme="honey"
			>
				<Alert variant="warning" className="mx-3 mt-3 mb-2">
					<Lightbulb size={16} />
					<AlertDescription>
						The accent changes meaning completely!
					</AlertDescription>
				</Alert>

				<div className="divide-y divide-stone-200/60">
					<div className="py-2.5 px-3">
						<MonoText variant="greek">
							ποτ<span className="text-honey-600 font-bold">έ</span>
						</MonoText>
						<div className="text-xs text-stone-500">never (accent on ε)</div>
					</div>
					<div className="py-2.5 px-3">
						<MonoText variant="greek">
							π<span className="text-honey-600 font-bold">ό</span>τε
						</MonoText>
						<div className="text-xs text-stone-500">when? (accent on ο)</div>
					</div>
				</div>

				<div className="mx-3 mt-3 p-2.5 bg-honey-100 rounded-lg border border-honey-200">
					<p className="text-sm text-honey-text font-medium mb-2">
						Grammar pattern
					</p>
					<div className="space-y-1.5 text-sm">
						<div>
							<MonoText variant="greek">ποτέ δεν + verb</MonoText>
							<span className="text-stone-500 text-xs ml-2">= never do X</span>
						</div>
						<div>
							<MonoText variant="greek">Ποτέ δεν τρώω κρέας.</MonoText>
							<div className="text-xs text-stone-500">I never eat meat.</div>
						</div>
					</div>
				</div>
			</ContentSection>

			{/* Which "Sometimes"? Decision Guide */}
			<ContentSection
				title="Which 'Sometimes'?"
				subtitle="Choosing the right word"
				colorScheme="ocean"
			>
				<div className="px-3 pt-3 pb-1 space-y-3">
					<div>
						<MonoText variant="greek" className="font-semibold">
							καμιά φορά
						</MonoText>
						<p className="text-xs text-stone-500 mt-0.5">
							Once in a while, unexpectedly
						</p>
						<div className="mt-1">
							<MonoText variant="greek" size="sm">
								Καμιά φορά τρώω γλυκά.
							</MonoText>
							<span className="text-xs text-stone-400 ml-2">
								I eat sweets once in a while.
							</span>
						</div>
					</div>

					<div>
						<MonoText variant="greek" className="font-semibold">
							μερικές φορές
						</MonoText>
						<p className="text-xs text-stone-500 mt-0.5">
							Several times, countable occurrences
						</p>
						<div className="mt-1">
							<MonoText variant="greek" size="sm">
								Έχω πάει μερικές φορές.
							</MonoText>
							<span className="text-xs text-stone-400 ml-2">
								I've been several times.
							</span>
						</div>
					</div>

					<div>
						<MonoText variant="greek" className="font-semibold">
							πότε πότε
						</MonoText>
						<p className="text-xs text-stone-500 mt-0.5">
							Now and then, neutral/standard
						</p>
						<div className="mt-1">
							<MonoText variant="greek" size="sm">
								Πότε πότε πάω γυμναστήριο.
							</MonoText>
							<span className="text-xs text-stone-400 ml-2">
								I go to the gym now and then.
							</span>
						</div>
					</div>

					<div>
						<MonoText variant="greek" className="font-semibold">
							κάπου κάπου
						</MonoText>
						<p className="text-xs text-stone-500 mt-0.5">
							Here and there, casual/colloquial
						</p>
						<div className="mt-1">
							<MonoText variant="greek" size="sm">
								Κάπου κάπου βλέπω ταινίες.
							</MonoText>
							<span className="text-xs text-stone-400 ml-2">
								I watch films here and there.
							</span>
						</div>
					</div>
				</div>
			</ContentSection>

			{/* Usage Examples */}
			<ContentSection
				title="Usage"
				subtitle="Adverb before verb"
				colorScheme="terracotta"
			>
				<div className="divide-y divide-stone-200/60">
					{USAGE_EXAMPLES.map((example) => (
						<div key={example.greek} className="py-2.5 px-3">
							<MonoText variant="greek">{example.greek}</MonoText>
							<div className="text-xs text-stone-500">{example.english}</div>
						</div>
					))}
				</div>

				<div className="mx-3 mt-3 p-2.5 bg-terracotta-100 rounded-lg border border-terracotta-200">
					<p className="text-sm text-terracotta-text font-medium">Word order</p>
					<p className="text-xs text-stone-500 mt-1">
						Frequency adverb typically comes <strong>before</strong> the verb
					</p>
				</div>
			</ContentSection>
		</div>
	);
}
