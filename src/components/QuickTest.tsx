import type { ReactNode } from "react";
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
	colorScheme?: "honey" | "ocean" | "olive" | "terracotta";
}

const colorStyles = {
	honey: {
		bg: "bg-honey-100",
		border: "border-honey-400",
		text: "text-honey-text",
		shadow: "shadow-md shadow-honey-100",
	},
	ocean: {
		bg: "bg-ocean-100",
		border: "border-ocean-400",
		text: "text-ocean-text",
		shadow: "shadow-md shadow-ocean-100",
	},
	olive: {
		bg: "bg-olive-100",
		border: "border-olive-400",
		text: "text-olive-text",
		shadow: "shadow-md shadow-olive-100",
	},
	terracotta: {
		bg: "bg-terracotta-100",
		border: "border-terracotta-400",
		text: "text-terracotta-text",
		shadow: "shadow-md shadow-terracotta-100",
	},
};

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
			className={`${colors.bg} ${colors.border} ${colors.shadow}`}
		>
			<h3 className={`text-lg font-bold ${colors.text} mb-2`}>{title}</h3>
			{intro && <p className="text-sm text-stone-600 mb-4">{intro}</p>}

			<div className="space-y-3">
				{options.map((option) => (
					<div
						key={option.condition}
						className={`p-3 bg-white rounded-lg border ${colors.border}`}
					>
						<div className="flex items-start gap-3">
							<div className={`${colors.text} font-bold text-sm shrink-0`}>
								{option.answer}
							</div>
							<div className="flex-1">
								<div className="text-sm font-medium text-stone-800 mb-1">
									{option.condition}
								</div>
								{option.examples && (
									<div className="text-sm text-stone-600 space-y-0.5">
										{option.examples.map((ex) => (
											<div key={ex.greek}>
												<MonoText size="sm" variant="greek">
													{ex.greek}
												</MonoText>
												<span className="text-stone-600 ml-2">
													— {ex.english}
												</span>
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
				<div
					className={`mt-4 pt-3 border-t ${colors.border} text-sm ${colors.text}`}
				>
					{summary}
				</div>
			)}
		</Card>
	);
};
