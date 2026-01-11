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
	"σπάνια",
	"κάπου κάπου",
	"πότε πότε",
	"καμιά φορά",
	"μερικές φορές",
	"πολλές φορές",
	"συχνά",
	"συνήθως",
	"σχεδόν πάντα",
	"πάντα",
];

const FREQUENCY_PERCENT: Record<string, number> = {
	ποτέ: 0,
	σπάνια: 10,
	"κάπου κάπου": 20,
	"πότε πότε": 25,
	"καμιά φορά": 35,
	"μερικές φορές": 40,
	"πολλές φορές": 60,
	συχνά: 70,
	συνήθως: 80,
	"σχεδόν πάντα": 90,
	πάντα: 100,
};

const getSpectrumBorder = (percent: number): string => {
	if (percent <= 10) return "border-l-olive-200";
	if (percent <= 30) return "border-l-olive-300";
	if (percent <= 50) return "border-l-olive-400";
	if (percent <= 75) return "border-l-olive-500";
	return "border-l-olive-600";
};

export function FrequencySubtab({ data }: Props) {
	const sortedFrequency = [...data.frequencyAdverbs].sort((a, b) => {
		const aOrder = FREQUENCY_ORDER.indexOf(a.greek);
		const bOrder = FREQUENCY_ORDER.indexOf(b.greek);
		return (aOrder === -1 ? 999 : aOrder) - (bOrder === -1 ? 999 : bOrder);
	});

	return (
		<div className="space-y-6">
			<Link
				to="/learn/vocabulary/essentials"
				className="inline-flex items-center gap-1 text-sm text-stone-600 hover:text-stone-900"
			>
				<ChevronLeft size={16} />
				Essentials
			</Link>

			<ContentSection
				title="Frequency"
				subtitle="never → always"
				colorScheme="olive"
			>
				<Alert variant="warning" className="mx-3 mt-3">
					<Lightbulb size={16} />
					<AlertDescription>
						<strong>Remember:</strong> ποτέ = never, πότε = when (question) —
						accent changes meaning!
					</AlertDescription>
				</Alert>

				<div className="divide-y divide-stone-200/60 mt-3">
					{sortedFrequency.map((adverb) => {
						const percent = FREQUENCY_PERCENT[adverb.greek] ?? 50;
						return (
							<div
								key={adverb.id}
								className={`py-2.5 px-3 border-l-4 ${getSpectrumBorder(percent)}`}
							>
								<MonoText variant="greek">{adverb.greek}</MonoText>
								<div className="text-xs text-stone-500">{adverb.english}</div>
							</div>
						);
					})}
				</div>

				<div className="mx-3 mt-3 p-2.5 bg-olive-100 rounded-lg border border-olive-200">
					<p className="text-sm text-olive-text font-medium mb-2">
						Usage example
					</p>
					<div className="text-sm">
						<MonoText variant="greek">Συνήθως πίνω καφέ το πρωί</MonoText>
						<span className="text-stone-500 text-xs ml-2">
							I usually drink coffee in the morning
						</span>
					</div>
				</div>
			</ContentSection>
		</div>
	);
}
