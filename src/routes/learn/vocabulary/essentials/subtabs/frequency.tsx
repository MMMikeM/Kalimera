import { Link } from "react-router";
import { TrendingUp, ChevronLeft, Lightbulb } from "lucide-react";
import { Card } from "@/components/Card";
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

			<Card
				variant="bordered"
				padding="lg"
				className="bg-olive-50 border-olive-300"
			>
				<div className="flex items-center gap-3 mb-4">
					<div className="p-2 rounded-lg bg-olive-200">
						<TrendingUp size={20} className="text-olive-text" />
					</div>
					<h3 className="text-lg font-bold text-olive-text">
						Adverbs of Frequency
					</h3>
				</div>

				<Alert variant="warning" className="mb-4">
					<Lightbulb size={16} />
					<AlertDescription>
						<strong>Remember:</strong> ποτέ = never, πότε = when (question) —
						accent changes meaning!
					</AlertDescription>
				</Alert>

				<div className="mb-4 flex items-center justify-between text-xs text-stone-500 px-1">
					<span>never</span>
					<span>always</span>
				</div>

				<div className="space-y-3">
					{sortedFrequency.map((adverb) => {
						const percent = FREQUENCY_PERCENT[adverb.greek] ?? 50;
						return (
							<div key={adverb.id} className="flex items-center gap-3">
								<div className="flex-1 flex items-baseline gap-2 min-w-0">
									<MonoText variant="greek" size="md" className="shrink-0">
										{adverb.greek}
									</MonoText>
									<span className="text-stone-600 text-sm truncate">
										{adverb.english}
									</span>
								</div>
								<div className="w-24 h-2 bg-stone-200 rounded-full overflow-hidden shrink-0">
									<div
										className="h-full bg-olive-500 rounded-full transition-all"
										style={{ width: `${percent}%` }}
									/>
								</div>
							</div>
						);
					})}
				</div>

				<div className="mt-6 p-3 bg-olive-100 rounded-lg border border-olive-200">
					<p className="text-sm text-olive-text font-medium mb-1">
						Usage example
					</p>
					<p className="text-sm">
						<MonoText variant="greek">Συνήθως πίνω καφέ το πρωί</MonoText>
						<span className="text-stone-600 ml-2">
							(I usually drink coffee in the morning)
						</span>
					</p>
				</div>
			</Card>
		</div>
	);
}
