import { Lightbulb } from "lucide-react";

import { ContentSection } from "@/components/ContentSection";
import { Alert, AlertDescription } from "@/components/ui/alert";

import type { EssentialsLoaderData } from "../$subtab";
import { EssentialsBackLink } from "./essentials-back-link";
import { ExampleList } from "./example-list";
import { GreekText } from "@/components/GreekText";

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
	const adverbByGreek = new Map(data.frequencyAdverbs.map((a) => [a.greekText, a]));

	return (
		<div className="space-y-6">
			<EssentialsBackLink />

			{/* Frequency Spectrum */}
			<ContentSection title="Frequency" subtitle="never → always" colorScheme="olive">
				<div className="divide-y divide-stone-200/60">
					{FREQUENCY_ORDER.map((greek) => {
						const adverb = adverbByGreek.get(greek);
						const percent = FREQUENCY_PERCENT[greek] ?? 50;
						return (
							<div key={greek} className="px-3 py-2.5">
								<div className="flex items-center justify-between gap-3">
									<div className="min-w-0">
										<GreekText tone="accent" size="lg">{greek}</GreekText>
										<div className="text-xs text-stone-500">
											{adverb?.englishTranslation ?? greek}
										</div>
									</div>
									<div className="h-2 w-24 shrink-0 overflow-hidden rounded-full bg-stone-200">
										<div
											className="h-full rounded-full bg-olive-500"
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
			<ContentSection title="Watch the Accent" subtitle="ποτέ vs πότε" colorScheme="honey">
				<Alert variant="warning" className="mx-3 mt-3 mb-2">
					<Lightbulb size={16} />
					<AlertDescription>The accent changes meaning completely!</AlertDescription>
				</Alert>

				<div className="divide-y divide-stone-200/60">
					<div className="px-3 py-2.5">
						<GreekText tone="accent" size="lg">
							ποτ<span className="font-bold text-honey-600">έ</span>
						</GreekText>
						<div className="text-xs text-stone-500">never (accent on ε)</div>
					</div>
					<div className="px-3 py-2.5">
						<GreekText tone="accent" size="lg">
							π<span className="font-bold text-honey-600">ό</span>τε
						</GreekText>
						<div className="text-xs text-stone-500">when? (accent on ο)</div>
					</div>
				</div>

				<div className="mx-3 mt-3 rounded-lg border border-honey-200 bg-honey-100 p-2.5">
					<p className="mb-2 text-sm font-medium text-honey-text">Grammar pattern</p>
					<div className="space-y-1.5 text-sm">
						<div>
							<GreekText tone="accent" size="lg">ποτέ δεν + verb</GreekText>
							<span className="ml-2 text-xs text-stone-500">= never do X</span>
						</div>
						<div>
							<GreekText tone="accent" size="lg">Ποτέ δεν τρώω κρέας.</GreekText>
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
				<div className="space-y-3 px-3 pt-3 pb-1">
					<div>
						<GreekText tone="accent" size="lg" className="font-semibold">
							καμιά φορά
						</GreekText>
						<p className="mt-0.5 text-xs text-stone-500">Once in a while, unexpectedly</p>
						<div className="mt-1">
							<GreekText tone="accent" size="sm">
								Καμιά φορά τρώω γλυκά.
							</GreekText>
							<span className="ml-2 text-xs text-stone-400">I eat sweets once in a while.</span>
						</div>
					</div>

					<div>
						<GreekText tone="accent" size="lg" className="font-semibold">
							μερικές φορές
						</GreekText>
						<p className="mt-0.5 text-xs text-stone-500">Several times, countable occurrences</p>
						<div className="mt-1">
							<GreekText tone="accent" size="sm">
								Έχω πάει μερικές φορές.
							</GreekText>
							<span className="ml-2 text-xs text-stone-400">I've been several times.</span>
						</div>
					</div>

					<div>
						<GreekText tone="accent" size="lg" className="font-semibold">
							πότε πότε
						</GreekText>
						<p className="mt-0.5 text-xs text-stone-500">Now and then, neutral/standard</p>
						<div className="mt-1">
							<GreekText tone="accent" size="sm">
								Πότε πότε πάω γυμναστήριο.
							</GreekText>
							<span className="ml-2 text-xs text-stone-400">I go to the gym now and then.</span>
						</div>
					</div>

					<div>
						<GreekText tone="accent" size="lg" className="font-semibold">
							κάπου κάπου
						</GreekText>
						<p className="mt-0.5 text-xs text-stone-500">Here and there, casual/colloquial</p>
						<div className="mt-1">
							<GreekText tone="accent" size="sm">
								Κάπου κάπου βλέπω ταινίες.
							</GreekText>
							<span className="ml-2 text-xs text-stone-400">I watch films here and there.</span>
						</div>
					</div>
				</div>
			</ContentSection>

			{/* Usage Examples */}
			<ContentSection title="Usage" subtitle="Adverb before verb" colorScheme="terracotta">
				<ExampleList examples={USAGE_EXAMPLES} />

				<div className="mx-3 mt-3 rounded-lg border border-terracotta-200 bg-terracotta-100 p-2.5">
					<p className="text-sm font-medium text-terracotta-text">Word order</p>
					<p className="mt-1 text-xs text-stone-500">
						Frequency adverb typically comes <strong>before</strong> the verb
					</p>
				</div>
			</ContentSection>
		</div>
	);
}
