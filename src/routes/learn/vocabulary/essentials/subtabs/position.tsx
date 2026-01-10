import { Link } from "react-router";
import { MapPin, ChevronLeft } from "lucide-react";
import { Card } from "@/components/Card";
import { MonoText } from "@/components/MonoText";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { EssentialsLoaderData } from "../data.server";

interface Props {
	data: EssentialsLoaderData;
}

const POSITION_PAIRS = [
	["αριστερά", "δεξιά"],
	["πάνω", "κάτω"],
	["μέσα", "έξω"],
	["μπροστά", "πίσω"],
	["εδώ", "εκεί"],
	["κοντά", "μακριά"],
];

export function PositionSubtab({ data }: Props) {
	const pairedAdverbs: Array<{
		left: (typeof data.positionAdverbs)[0] | null;
		right: (typeof data.positionAdverbs)[0] | null;
	}> = [];
	const usedIds = new Set<number>();

	for (const [leftGreek, rightGreek] of POSITION_PAIRS) {
		const left =
			data.positionAdverbs.find((a) => a.greek === leftGreek) || null;
		const right =
			data.positionAdverbs.find((a) => a.greek === rightGreek) || null;
		if (left || right) {
			pairedAdverbs.push({ left, right });
			if (left) usedIds.add(left.id);
			if (right) usedIds.add(right.id);
		}
	}

	const unpaired = data.positionAdverbs.filter((a) => !usedIds.has(a.id));

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
				className="bg-ocean-50 border-ocean-300"
			>
				<div className="flex items-center gap-3 mb-4">
					<div className="p-2 rounded-lg bg-ocean-200">
						<MapPin size={20} className="text-ocean-text" />
					</div>
					<h3 className="text-lg font-bold text-ocean-text">
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
					{pairedAdverbs.map((pair) => (
						<div
							key={`${pair.left?.id ?? "empty"}-${pair.right?.id ?? "empty"}`}
							className="grid grid-cols-2 gap-4 p-3 bg-white rounded-lg border border-ocean-200"
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
						<div className="grid md:grid-cols-3 gap-3 mt-4 pt-4 border-t border-ocean-200">
							{unpaired.map((adverb) => (
								<div key={adverb.id} className="flex items-baseline gap-2">
									<MonoText variant="greek" size="md">
										{adverb.greek}
									</MonoText>
									<span className="text-stone-600 text-sm">
										{adverb.english}
									</span>
								</div>
							))}
						</div>
					)}
				</div>

				<div className="mt-6 p-3 bg-ocean-100 rounded-lg border border-ocean-200">
					<p className="text-sm text-ocean-text font-medium mb-1">
						Usage example
					</p>
					<p className="text-sm">
						<MonoText variant="greek">στρίψε αριστερά</MonoText>
						<span className="text-stone-600 ml-2">(turn left)</span>
					</p>
				</div>
			</Card>
		</div>
	);
}
