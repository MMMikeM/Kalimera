import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ParadigmTable, type ParadigmForms } from "./ParadigmTable";
import { cn } from "@/lib/utils";

const TENSE_CONFIG: Record<
	string,
	{ greek: string; english: string; colorScheme: TenseColorScheme }
> = {
	present: { greek: "Ενεστώτας", english: "Present", colorScheme: "ocean" },
	aorist: { greek: "Αόριστος", english: "Aorist", colorScheme: "terracotta" },
	future: { greek: "Μέλλοντας", english: "Future", colorScheme: "olive" },
	past_continuous: {
		greek: "Παρατατικός",
		english: "Past Continuous",
		colorScheme: "honey",
	},
};

type TenseColorScheme = "ocean" | "terracotta" | "olive" | "honey";

const colorStyles: Record<
	TenseColorScheme,
	{ tab: string; activeTab: string; content: string }
> = {
	ocean: {
		tab: "data-[state=active]:bg-ocean-200 data-[state=active]:text-ocean-text",
		activeTab: "border-ocean-400",
		content: "bg-ocean-50 border-ocean-200",
	},
	terracotta: {
		tab: "data-[state=active]:bg-terracotta-200 data-[state=active]:text-terracotta-text",
		activeTab: "border-terracotta-400",
		content: "bg-terracotta-50 border-terracotta-200",
	},
	olive: {
		tab: "data-[state=active]:bg-olive-200 data-[state=active]:text-olive-text",
		activeTab: "border-olive-400",
		content: "bg-olive-50 border-olive-200",
	},
	honey: {
		tab: "data-[state=active]:bg-honey-200 data-[state=active]:text-honey-text",
		activeTab: "border-honey-400",
		content: "bg-honey-50 border-honey-200",
	},
};

export interface TenseNavigatorProps {
	conjugations: Record<string, ParadigmForms>;
	verbDetails?: {
		presentStem?: string | null;
		aoristStem?: string | null;
		futureStem?: string | null;
	};
	meaning?: string;
	className?: string;
}

export const TenseNavigator = ({
	conjugations,
	verbDetails,
	meaning = "",
	className,
}: TenseNavigatorProps) => {
	const availableTenses = Object.keys(conjugations).filter(
		(tense) => TENSE_CONFIG[tense] && conjugations[tense],
	);

	if (availableTenses.length === 0) {
		return (
			<div className="text-stone-500 italic p-4">
				No conjugation data available
			</div>
		);
	}

	const defaultTense = availableTenses.includes("present")
		? "present"
		: availableTenses[0];

	const getStemForTense = (tense: string): string | undefined => {
		if (!verbDetails) return undefined;
		switch (tense) {
			case "present":
			case "past_continuous":
				return verbDetails.presentStem ?? undefined;
			case "aorist":
				return verbDetails.aoristStem ?? undefined;
			case "future":
				return verbDetails.futureStem ?? undefined;
			default:
				return undefined;
		}
	};

	return (
		<Tabs defaultValue={defaultTense} className={cn("w-full", className)}>
			<TabsList className="w-full h-auto flex-wrap gap-1 bg-stone-100 p-1">
				{availableTenses.map((tense) => {
					const config = TENSE_CONFIG[tense];
					if (!config) return null;
					const styles = colorStyles[config.colorScheme];
					return (
						<TabsTrigger
							key={tense}
							value={tense}
							className={cn(
								"flex-1 min-w-[100px] px-3 py-2 text-sm",
								styles.tab,
							)}
						>
							<span className="flex flex-col items-center gap-0.5">
								<span className="font-mono text-xs">{config.greek}</span>
								<span className="text-xs opacity-75">{config.english}</span>
							</span>
						</TabsTrigger>
					);
				})}
			</TabsList>

			{availableTenses.map((tense) => {
				const config = TENSE_CONFIG[tense];
				if (!config) return null;
				const styles = colorStyles[config.colorScheme];
				const stem = getStemForTense(tense);
				const forms = conjugations[tense];
				if (!forms) return null;

				return (
					<TabsContent
						key={tense}
						value={tense}
						className={cn("rounded-lg border p-4 mt-2", styles.content)}
					>
						<ParadigmTable
							stem={stem}
							meaning={meaning}
							forms={forms}
							variant="bordered"
						/>
					</TabsContent>
				);
			})}
		</Tabs>
	);
};
