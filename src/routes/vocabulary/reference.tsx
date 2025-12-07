import { useOutletContext } from "react-router";
import { Sun, Hash, Palette, TrendingUp, MapPin, Lightbulb } from "lucide-react";
import { Card, MonoText } from "@/components";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { type VocabularyLoaderData, VocabItemDisplay, VocabSection } from "./shared";

const TIME_ORDER = ["morning", "midday", "afternoon", "evening", "night"];

const POSITION_PAIRS = [
	["αριστερά", "δεξιά"],
	["πάνω", "κάτω"],
	["μέσα", "έξω"],
	["μπροστά", "πίσω"],
	["εδώ", "εκεί"],
	["κοντά", "μακριά"],
];

export default function ReferenceRoute() {
	const data = useOutletContext<VocabularyLoaderData>();

	const sortedTimes = [...data.reference.timesOfDay].sort((a, b) => {
		const aOrder = TIME_ORDER.indexOf(a.english.toLowerCase());
		const bOrder = TIME_ORDER.indexOf(b.english.toLowerCase());
		return (aOrder === -1 ? 999 : aOrder) - (bOrder === -1 ? 999 : bOrder);
	});

	const pairedAdverbs: Array<{
		left: (typeof data.reference.positionAdverbs)[0] | null;
		right: (typeof data.reference.positionAdverbs)[0] | null;
	}> = [];
	const usedIds = new Set<number>();

	for (const [leftGreek, rightGreek] of POSITION_PAIRS) {
		const left =
			data.reference.positionAdverbs.find((a) => a.greek === leftGreek) || null;
		const right =
			data.reference.positionAdverbs.find((a) => a.greek === rightGreek) ||
			null;
		if (left || right) {
			pairedAdverbs.push({ left, right });
			if (left) usedIds.add(left.id);
			if (right) usedIds.add(right.id);
		}
	}

	const unpaired = data.reference.positionAdverbs.filter(
		(a) => !usedIds.has(a.id)
	);

	return (
		<div className="space-y-6">
			<Card
				variant="bordered"
				padding="lg"
				className="bg-honey/5 border-honey/30"
			>
				<div className="flex items-center gap-3 mb-4">
					<div className="p-2 rounded-lg bg-honey/20">
						<Sun size={20} className="text-honey-text" />
					</div>
					<h3 className="text-lg font-bold text-honey-text">Times of Day</h3>
				</div>
				<div className="grid grid-cols-2 md:grid-cols-5 gap-4">
					{sortedTimes.map((time) => (
						<div
							key={time.id}
							className="text-center p-3 bg-white rounded-lg border border-honey/20 shadow-sm"
						>
							<MonoText variant="greek" size="lg" className="block mb-1">
								{time.greek}
							</MonoText>
							<div className="text-stone-600 text-sm">{time.english}</div>
							{time.timeRange && (
								<div className="text-xs text-stone-600 mt-1">
									{time.timeRange}
								</div>
							)}
						</div>
					))}
				</div>
			</Card>

			<Card
				variant="bordered"
				padding="lg"
				className="bg-aegean/5 border-aegean/30"
			>
				<div className="flex items-center gap-3 mb-4">
					<div className="p-2 rounded-lg bg-aegean/20">
						<Hash size={20} className="text-aegean-text" />
					</div>
					<div>
						<h3 className="text-lg font-bold text-aegean-text">Numbers</h3>
						<p className="text-sm text-stone-600">Αριθμοί</p>
					</div>
				</div>
				<Alert variant="info" className="mb-4">
					<AlertDescription>
						<strong>Pattern:</strong> For 21-99, combine tens + units: τριάντα +
						δύο = τριάντα δύο (32)
					</AlertDescription>
				</Alert>
				<div className="grid md:grid-cols-3 gap-6">
					<div>
						<h5 className="font-semibold text-aegean-text mb-3">Units (0-9)</h5>
						<div className="space-y-2">
							{data.reference.numbers
								.filter(
									(n) =>
										n.numericValue !== undefined &&
										n.numericValue >= 0 &&
										n.numericValue <= 9
								)
								.map((number) => (
									<div key={number.id} className="flex items-baseline gap-2">
										<MonoText>{number.greek}</MonoText>
										<span className="text-stone-600 text-sm">
											{number.english}
										</span>
									</div>
								))}
						</div>
					</div>
					<div>
						<h5 className="font-semibold text-aegean-text mb-3">
							Teens (10-19)
						</h5>
						<div className="space-y-2">
							{data.reference.numbers
								.filter(
									(n) => n.numericValue && n.numericValue >= 10 && n.numericValue <= 19
								)
								.map((number) => (
									<div key={number.id} className="flex items-baseline gap-2">
										<MonoText>{number.greek}</MonoText>
										<span className="text-stone-600 text-sm">
											{number.english}
										</span>
									</div>
								))}
						</div>
					</div>
					<div>
						<h5 className="font-semibold text-aegean-text mb-3">
							Tens (20-100)
						</h5>
						<div className="space-y-2">
							{data.reference.numbers
								.filter((n) => n.numericValue && n.numericValue >= 20)
								.map((number) => (
									<div key={number.id} className="flex items-baseline gap-2">
										<MonoText>{number.greek}</MonoText>
										<span className="text-stone-600 text-sm">
											{number.english}
										</span>
									</div>
								))}
						</div>
					</div>
				</div>
			</Card>

			<VocabSection
				title="Colors"
				icon={<Palette size={20} />}
				colorScheme="terracotta"
			>
				{data.reference.colors.map((color) => (
					<VocabItemDisplay
						key={color.id}
						greek={color.greek}
						english={color.english}
					/>
				))}
			</VocabSection>

			<Card
				variant="bordered"
				padding="lg"
				className="bg-olive/5 border-olive/30"
			>
				<div className="flex items-center gap-3 mb-4">
					<div className="p-2 rounded-lg bg-olive/20">
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
				<div className="grid md:grid-cols-3 gap-3">
					{data.reference.frequencyAdverbs.map((adverb) => (
						<VocabItemDisplay
							key={adverb.id}
							greek={adverb.greek}
							english={adverb.english}
						/>
					))}
				</div>
			</Card>

			<Card
				variant="bordered"
				padding="lg"
				className="bg-aegean/5 border-aegean/30"
			>
				<div className="flex items-center gap-3 mb-4">
					<div className="p-2 rounded-lg bg-aegean/20">
						<MapPin size={20} className="text-aegean-text" />
					</div>
					<h3 className="text-lg font-bold text-aegean-text">
						Position & Direction
					</h3>
				</div>
				<Alert variant="info" className="mb-4">
					<AlertDescription>
						Essential for giving and understanding directions. Opposites are
						grouped together.
					</AlertDescription>
				</Alert>
				<div className="space-y-2">
					{pairedAdverbs.map((pair, idx) => (
						<div
							key={idx}
							className="grid grid-cols-2 gap-4 p-3 bg-white rounded-lg border border-aegean/20"
						>
							{pair.left ? (
								<div className="flex items-baseline gap-2">
									<MonoText variant="greek" size="md">
										{pair.left.greek}
									</MonoText>
									<span className="text-stone-600 text-sm">
										{pair.left.english}
									</span>
								</div>
							) : (
								<div />
							)}
							{pair.right ? (
								<div className="flex items-baseline gap-2">
									<span className="text-stone-400 mr-1">↔</span>
									<MonoText variant="greek" size="md">
										{pair.right.greek}
									</MonoText>
									<span className="text-stone-600 text-sm">
										{pair.right.english}
									</span>
								</div>
							) : (
								<div />
							)}
						</div>
					))}
					{unpaired.length > 0 && (
						<div className="grid md:grid-cols-3 gap-3 mt-4 pt-4 border-t border-aegean/20">
							{unpaired.map((adverb) => (
								<VocabItemDisplay
									key={adverb.id}
									greek={adverb.greek}
									english={adverb.english}
								/>
							))}
						</div>
					)}
				</div>
			</Card>
		</div>
	);
}
