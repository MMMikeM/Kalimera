import type React from "react";
import { useOutletContext } from "react-router";
import { Calendar, Clock } from "lucide-react";
import { Card } from "@/components/Card";
import { MonoText } from "@/components/MonoText";
import { CollapsibleSection } from "@/components/CollapsibleSection";
import { TabHero } from "@/components/TabHero";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { PhrasesLoaderData, PhraseItem } from "../components/shared";
import { PhraseSection, PhraseItemDisplay } from "../components/shared";

const TimeTellingSection: React.FC<{ items: PhraseItem[] }> = ({ items }) => {
	const grouped = items.reduce(
		(acc, item) => {
			const meta = item.metadata as Record<string, unknown> | null;
			const cat = (meta?.category as string) || "other";
			if (!acc[cat]) acc[cat] = [];
			acc[cat].push(item);
			return acc;
		},
		{} as Record<string, PhraseItem[]>,
	);

	const categoryLabels: Record<string, string> = {
		basic: "Basic Time Structure",
		fractions: "Minutes & Fractions",
		"at-times": '"At" Times (στις)',
	};

	const categoryOrder = ["basic", "fractions", "at-times"];

	if (items.length === 0) return null;

	return (
		<Card
			variant="bordered"
			padding="lg"
			className="bg-ocean-50 border-ocean-300"
		>
			<div className="flex items-center gap-3 mb-4">
				<div className="p-2 rounded-lg bg-ocean-200">
					<Clock size={20} className="text-ocean-text" />
				</div>
				<div>
					<h3 className="text-lg font-bold text-ocean-text">Telling Time</h3>
					<p className="text-sm text-stone-600">Τι ώρα είναι;</p>
				</div>
			</div>
			<Alert variant="info" className="mb-4">
				<AlertDescription>
					<strong>Pattern:</strong> Είναι + time / Η ώρα είναι + time
				</AlertDescription>
			</Alert>
			<div className="grid md:grid-cols-2 gap-6">
				{categoryOrder.map((cat) => {
					const catItems = grouped[cat] || [];
					if (catItems.length === 0) return null;
					return (
						<div key={cat}>
							<h5 className="font-semibold text-ocean-text mb-3">
								{categoryLabels[cat]}
							</h5>
							<div className="space-y-2">
								{catItems.map((item) => {
									const meta = item.metadata as Record<string, unknown> | null;
									const note = meta?.note ? String(meta.note) : null;
									return (
										<div key={item.id} className="flex items-baseline gap-2">
											<MonoText variant="highlighted">{item.greek}</MonoText>
											<span className="text-stone-600 text-sm">
												{item.english}
											</span>
											{note && (
												<span className="text-stone-600 text-xs">({note})</span>
											)}
										</div>
									);
								})}
							</div>
						</div>
					);
				})}
			</div>
		</Card>
	);
};

export function TimeTab() {
	const data = useOutletContext<PhrasesLoaderData>();
	const { daysOfWeek, months, timeTelling } = data.time;

	return (
		<div className="space-y-6">
			<TabHero
				title="Master time expressions"
				greekPhrase="Τι ώρα είναι;"
				colorScheme="ocean"
				icon={<Clock size={18} />}
			>
				Days, months, and telling time — essential for making plans, scheduling,
				and understanding when things happen.
			</TabHero>

			<div className="grid md:grid-cols-2 gap-4">
				{daysOfWeek.length > 0 && (
					<PhraseSection
						title="Days of the Week"
						icon={<Calendar size={20} />}
						colorScheme="ocean"
						columns={2}
					>
						{daysOfWeek.map((day) => (
							<PhraseItemDisplay
								key={day.id}
								greek={day.greek}
								english={day.english}
							/>
						))}
					</PhraseSection>
				)}

				{months.length > 0 && (
					<CollapsibleSection
						title="Months of the Year"
						colorScheme="ocean"
						defaultOpen={false}
					>
						<div className="grid grid-cols-2 gap-2">
							{months.map((month) => (
								<PhraseItemDisplay
									key={month.id}
									greek={month.greek}
									english={month.english}
								/>
							))}
						</div>
					</CollapsibleSection>
				)}
			</div>

			<TimeTellingSection items={timeTelling} />
		</div>
	);
}
