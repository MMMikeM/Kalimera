import { ArrowLeft, Gift, MapPin, Users } from "lucide-react";
import { Card } from "@/components/Card";
import { MonoText } from "@/components/MonoText";
import { PREPOSITION_NAVIGATOR_OPTIONS } from "@/constants/prepositions";

const ICONS = {
	MapPin,
	ArrowLeft,
	Users,
	Gift,
} as const;

export const PrepositionNavigator = () => (
	<Card variant="bordered" padding="lg" className="bg-honey-50 border-honey-300">
		<h3 className="text-lg font-bold text-honey-text mb-3">Which preposition do I need?</h3>
		<p className="text-sm text-stone-600 mb-4">
			Ask yourself what <strong>relationship</strong> you're describing:
		</p>

		<div className="grid sm:grid-cols-2 gap-3">
			{PREPOSITION_NAVIGATOR_OPTIONS.map((option) => {
				const Icon = ICONS[option.icon as keyof typeof ICONS];
				return (
					<div
						key={option.answer}
						className="p-3 bg-white rounded-lg border border-honey-300"
					>
						<div className="flex items-start gap-3">
							<div className="mt-0.5 text-honey-text">
								<Icon size={18} />
							</div>
							<div className="flex-1 min-w-0">
								<div className="text-sm font-medium text-stone-700 mb-1">
									{option.question}
								</div>
								<div className="text-honey-text font-bold mb-2">
									→ <MonoText size="sm">{option.answer}</MonoText>
								</div>
								<div className="space-y-0.5">
									{option.examples.map((ex) => (
										<div key={ex.greek} className="text-sm">
											<MonoText size="sm" variant="highlighted">
												{ex.greek}
											</MonoText>
											<span className="text-stone-500 ml-1 text-xs">
												{ex.english}
											</span>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				);
			})}
		</div>

		<div className="mt-4 pt-3 border-t border-honey-300 text-sm text-honey-text">
			<strong>Remember:</strong> σε is the most common and contracts with articles (σε + το = στο).
			The others stay unchanged.
		</div>
	</Card>
);
