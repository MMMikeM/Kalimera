import { ArrowLeft, Gift, MapPin, Users } from "lucide-react";

import { NavigatorCard, NavigatorCell } from "@/components/cards";
import { MonoText } from "@/components/MonoText";
import { PREPOSITION_NAVIGATOR_OPTIONS } from "@/constants/prepositions";

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
				<strong>Remember:</strong> σε is the most common and contracts with articles (σε + το = στο).
				The others stay unchanged.
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
				</NavigatorCell>
			);
		})}
	</NavigatorCard>
);
