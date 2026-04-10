import type { ReactNode } from "react";
import { type ColorScheme, colorStyles } from "@/lib/colors";
import { Card } from "./Card";
import { MonoText } from "./MonoText";

export interface QuickTestOption {
	condition: string;
	answer: ReactNode;
	examples?: Array<{ greek: string; english: string }>;
}

export interface QuickTestProps {
	title: string;
	intro?: string;
	options: QuickTestOption[];
	summary?: ReactNode;
	colorScheme?: Extract<ColorScheme, "honey" | "ocean" | "olive" | "terracotta">;
}

export const QuickTest = ({
	title,
	intro,
	options,
	summary,
	colorScheme = "honey",
}: QuickTestProps) => {
	const colors = colorStyles[colorScheme];

	return (
		<Card
			variant="bordered"
			padding="lg"
			className={`${colors.bgMuted} ${colors.border} shadow-md`}
		>
			<h3 className={`text-lg font-bold ${colors.text} mb-2`}>{title}</h3>
			{intro && <p className="mb-4 text-sm text-stone-600">{intro}</p>}

			<div className="space-y-3">
				{options.map((option) => (
					<div key={option.condition} className="border-b border-stone-200 py-3 last:border-b-0">
						<div className="flex items-start gap-3">
							<div className={`${colors.text} shrink-0 text-sm font-bold`}>{option.answer}</div>
							<div className="flex-1">
								<div className="mb-1 text-sm font-medium text-stone-800">{option.condition}</div>
								{option.examples && (
									<div className="space-y-0.5 text-sm text-stone-600">
										{option.examples.map((ex) => (
											<div key={ex.greek}>
												<MonoText size="sm" variant="greek">
													{ex.greek}
												</MonoText>
												<span className="ml-2 text-stone-600">— {ex.english}</span>
											</div>
										))}
									</div>
								)}
							</div>
						</div>
					</div>
				))}
			</div>

			{summary && (
				<div className={`mt-4 border-t pt-3 ${colors.border} text-sm ${colors.text}`}>
					{summary}
				</div>
			)}
		</Card>
	);
};
