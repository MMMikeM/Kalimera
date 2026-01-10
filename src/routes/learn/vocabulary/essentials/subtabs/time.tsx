import { Link } from "react-router";
import { Sun, ChevronLeft } from "lucide-react";
import { Card } from "@/components/Card";
import { MonoText } from "@/components/MonoText";
import type { EssentialsLoaderData } from "../data.server";

interface Props {
	data: EssentialsLoaderData;
}

const TIME_ORDER = ["morning", "midday", "afternoon", "evening", "night"];

export function TimeSubtab({ data }: Props) {
	const sortedTimes = [...data.timesOfDay].sort((a, b) => {
		const aOrder = TIME_ORDER.indexOf(a.english.toLowerCase());
		const bOrder = TIME_ORDER.indexOf(b.english.toLowerCase());
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
				className="bg-honey-50 border-honey-300"
			>
				<div className="flex items-center gap-3 mb-4">
					<div className="p-2 rounded-lg bg-honey-200">
						<Sun size={20} className="text-honey-text" />
					</div>
					<h3 className="text-lg font-bold text-honey-text">Times of Day</h3>
				</div>

				<div className="grid grid-cols-2 md:grid-cols-5 gap-4">
					{sortedTimes.map((time) => (
						<div
							key={time.id}
							className="text-center p-3 bg-white rounded-lg border border-honey-200 shadow-sm"
						>
							<MonoText variant="greek" size="lg" className="block mb-1">
								{time.greek}
							</MonoText>
							<div className="text-stone-600 text-sm">{time.english}</div>
							{time.timeRange && (
								<div className="text-xs text-stone-500 mt-1">
									{time.timeRange}
								</div>
							)}
						</div>
					))}
				</div>

				<div className="mt-6 p-3 bg-honey-100 rounded-lg border border-honey-200">
					<p className="text-sm text-honey-text font-medium mb-1">
						Usage example
					</p>
					<p className="text-sm">
						<MonoText variant="greek">στις δύο το μεσημέρι</MonoText>
						<span className="text-stone-600 ml-2">(at two in the afternoon)</span>
					</p>
				</div>
			</Card>
		</div>
	);
}
