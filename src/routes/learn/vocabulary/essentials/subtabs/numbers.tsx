import { Link } from "react-router";
import { Hash, ChevronLeft } from "lucide-react";
import { Card } from "@/components/Card";
import { MonoText } from "@/components/MonoText";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { EssentialsLoaderData } from "../data.server";

interface Props {
	data: EssentialsLoaderData;
}

function highlightPattern(greek: string, numericValue: number | undefined) {
	if (numericValue === undefined) return <MonoText>{greek}</MonoText>;

	if (numericValue >= 13 && numericValue <= 19) {
		const prefix = "δεκα";
		if (greek.startsWith(prefix)) {
			return (
				<MonoText>
					<span className="text-ocean-600 font-semibold">{prefix}</span>
					{greek.slice(prefix.length)}
				</MonoText>
			);
		}
	}

	if (numericValue >= 30 && numericValue <= 90 && numericValue % 10 === 0) {
		const suffix = "ντα";
		if (greek.endsWith(suffix)) {
			return (
				<MonoText>
					{greek.slice(0, -suffix.length)}
					<span className="text-ocean-600 font-semibold">{suffix}</span>
				</MonoText>
			);
		}
	}

	return <MonoText>{greek}</MonoText>;
}

export function NumbersSubtab({ data }: Props) {
	const units = data.numbers.filter(
		(n) =>
			n.numericValue !== undefined && n.numericValue >= 0 && n.numericValue <= 9,
	);
	const teens = data.numbers.filter(
		(n) =>
			n.numericValue !== undefined &&
			n.numericValue >= 10 &&
			n.numericValue <= 19,
	);
	const tens = data.numbers.filter(
		(n) => n.numericValue !== undefined && n.numericValue >= 20,
	);

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
						<Hash size={20} className="text-ocean-text" />
					</div>
					<div>
						<h3 className="text-lg font-bold text-ocean-text">Numbers</h3>
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
						<h5 className="font-semibold text-ocean-text mb-3">Units (0-9)</h5>
						<div className="space-y-2">
							{units.map((number) => (
								<div key={number.id} className="flex items-baseline gap-2">
									{highlightPattern(number.greek, number.numericValue)}
									<span className="text-stone-600 text-sm">
										{number.english}
									</span>
								</div>
							))}
						</div>
					</div>
					<div>
						<h5 className="font-semibold text-ocean-text mb-3">
							Teens (the <span className="text-ocean-600">δεκα-</span> family)
						</h5>
						<div className="space-y-2">
							{teens.map((number) => (
								<div key={number.id} className="flex items-baseline gap-2">
									{highlightPattern(number.greek, number.numericValue)}
									<span className="text-stone-600 text-sm">
										{number.english}
									</span>
								</div>
							))}
						</div>
					</div>
					<div>
						<h5 className="font-semibold text-ocean-text mb-3">
							Tens (the <span className="text-ocean-600">-ντα</span> pattern)
						</h5>
						<div className="space-y-2">
							{tens.map((number) => (
								<div key={number.id} className="flex items-baseline gap-2">
									{highlightPattern(number.greek, number.numericValue)}
									<span className="text-stone-600 text-sm">
										{number.english}
									</span>
								</div>
							))}
						</div>
					</div>
				</div>

				<div className="mt-6 p-3 bg-ocean-100 rounded-lg border border-ocean-200">
					<p className="text-sm text-ocean-text font-medium mb-1">
						Usage examples
					</p>
					<div className="space-y-1 text-sm">
						<p>
							<MonoText variant="greek">στις τρεις</MonoText>
							<span className="text-stone-600 ml-2">(at three o'clock)</span>
						</p>
						<p>
							<MonoText variant="greek">πέντε ευρώ</MonoText>
							<span className="text-stone-600 ml-2">(five euros)</span>
						</p>
					</div>
				</div>
			</Card>
		</div>
	);
}
