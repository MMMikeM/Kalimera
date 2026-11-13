import { BackLink } from "@/components/BackLink";
import { ContentSection } from "@/components/ContentSection";
import { GreekText } from "@/components/GreekText";

import type { EssentialsLoaderData } from "../$subtab";
import { ExampleList } from "./example-list";
import { GuideLink } from "./guide-link";

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
			<BackLink to="/learn/essentials">Essentials</BackLink>

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
										<GreekText tone="accent" size="lg">
											{greek}
										</GreekText>
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
				<GuideLink to="frequency" />
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
