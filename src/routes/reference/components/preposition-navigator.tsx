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
	<Card variant="bordered" padding="lg" className="border-honey-300 bg-honey-50">
		<h3 className="mb-3 text-lg font-bold text-honey-text">Which preposition do I need?</h3>
		<p className="mb-4 text-sm text-stone-600">
			Ask yourself what <strong>relationship</strong> you're describing:
		</p>

		<div className="grid gap-3 sm:grid-cols-2">
			{PREPOSITION_NAVIGATOR_OPTIONS.map((option) => {
				const Icon = ICONS[option.icon as keyof typeof ICONS];
				return (
					<div key={option.answer} className="rounded-lg border border-honey-300 bg-white p-3">
						<div className="flex items-start gap-3">
							<div className="mt-0.5 text-honey-text">
								<Icon size={18} />
							</div>
							<div className="min-w-0 flex-1">
								<div className="mb-1 text-sm font-medium text-stone-700">{option.question}</div>
								<div className="mb-2 font-bold text-honey-text">
									→ <MonoText size="sm">{option.answer}</MonoText>
								</div>
								<div className="space-y-0.5">
									{option.examples.map((ex) => (
										<div key={ex.greek} className="text-sm">
											<MonoText size="sm" variant="highlighted">
												{ex.greek}
											</MonoText>
											<span className="ml-1 text-xs text-stone-500">{ex.english}</span>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				);
			})}
		</div>

		<div className="mt-4 border-t border-honey-300 pt-3 text-sm text-honey-text">
			<strong>Remember:</strong> σε is the most common and contracts with articles (σε + το = στο).
			The others stay unchanged.
		</div>
	</Card>
);
