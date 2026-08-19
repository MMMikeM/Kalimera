import { ArrowLeft, Gift, MapPin, Users } from "lucide-react";

import { NavigatorCard, NavigatorCell } from "@/components/cards";
import { PREPOSITION_NAVIGATOR_OPTIONS } from "@/constants/prepositions";
import { GreekText } from "@/components/GreekText";

const ICONS = {
	MapPin,
	ArrowLeft,
	Users,
	Gift,
} as const;

export const PrepositionNavigator = () => (
	<NavigatorCard
		title="Which preposition do I need?"
		subtitle={
			<>
				Ask yourself what <strong>relationship</strong> you're describing:
			</>
		}
		layout="grid"
		footer={
			<>
				<strong>Remember:</strong> σε is the most common and contracts with articles (σε + το =
				στο). The others stay unchanged.
			</>
		}
	>
		{PREPOSITION_NAVIGATOR_OPTIONS.map((option) => {
			const Icon = ICONS[option.icon as keyof typeof ICONS];
			return (
				<NavigatorCell key={option.answer}>
					<div className="flex items-start gap-3">
						<div className="mt-0.5 text-honey-text">
							<Icon size={18} />
						</div>
						<div className="min-w-0 flex-1">
							<div className="mb-2 text-sm text-stone-500">{option.question}</div>
							<div className="mb-3">
								<GreekText tone="default" size="xl" className="font-bold text-honey-text">
									{option.answer.replace(" → ", " / ")}
								</GreekText>
							</div>
							<div className="space-y-1">
								{option.examples.map((ex) => (
									<div key={ex.greek} className="text-sm">
										<GreekText tone="accent" size="sm" className="text-stone-700">
											{ex.greek}
										</GreekText>
										<span className="ml-2 text-xs text-stone-400">{ex.english}</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</NavigatorCell>
			);
		})}
	</NavigatorCard>
);
