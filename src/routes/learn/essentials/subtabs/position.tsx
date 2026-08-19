import { ContentSection } from "@/components/ContentSection";

import type { EssentialsLoaderData } from "../$subtab";
import { EssentialsBackLink } from "./essentials-back-link";
import { ExampleList } from "./example-list";
import { GreekText } from "@/components/GreekText";

interface Props {
	data: EssentialsLoaderData;
}

const POSITION_PAIRS: Array<[string, string]> = [
	["αριστερά", "δεξιά"],
	["πάνω", "κάτω"],
	["μέσα", "έξω"],
	["μπροστά", "πίσω"],
	["εδώ", "εκεί"],
	["κοντά", "μακριά"],
];

const DIRECTION_EXAMPLES = [
	{ greek: "στρίψε αριστερά", english: "turn left" },
	{ greek: "στρίψε δεξιά", english: "turn right" },
	{ greek: "πήγαινε ευθεία", english: "go straight" },
	{ greek: "γύρισε πίσω", english: "turn around" },
	{ greek: "έλα μέσα", english: "come inside" },
];

const RELATIVE_POSITION_EXAMPLES = [
	{ greek: "μπροστά από την τράπεζα", english: "in front of the bank" },
	{ greek: "πίσω από το σούπερ μάρκετ", english: "behind the supermarket" },
	{ greek: "κοντά στο σταθμό", english: "near the station" },
	{ greek: "μακριά από εδώ", english: "far from here" },
	{ greek: "ανάμεσα στα δέντρα", english: "between the trees" },
	{ greek: "απέναντι από την εκκλησία", english: "across from the church" },
];

export function PositionSubtab({ data }: Props) {
	const adverbByGreek = new Map(data.positionAdverbs.map((a) => [a.greekText, a]));

	return (
		<div className="space-y-6">
			<EssentialsBackLink />

			{/* Opposites Grid */}
			<ContentSection title="Opposites" subtitle="Position words come in pairs" colorScheme="ocean">
				<div className="divide-y divide-stone-200/60">
					{POSITION_PAIRS.map(([leftGreek, rightGreek]) => {
						const left = adverbByGreek.get(leftGreek);
						const right = adverbByGreek.get(rightGreek);

						if (!left && !right) return null;

						return (
							<div
								key={`${leftGreek}-${rightGreek}`}
								className="grid grid-cols-2 divide-x divide-stone-200/60"
							>
								{/* Left column */}
								<div className="px-3 py-2.5">
									{left && (
										<>
											<GreekText tone="accent" size="lg">{left.greekText}</GreekText>
											<div className="text-xs text-stone-500">{left.englishTranslation}</div>
										</>
									)}
								</div>

								{/* Right column */}
								<div className="px-3 py-2.5">
									{right && (
										<>
											<GreekText tone="accent" size="lg">{right.greekText}</GreekText>
											<div className="text-xs text-stone-500">{right.englishTranslation}</div>
										</>
									)}
								</div>
							</div>
						);
					})}
				</div>

				<div className="mx-3 mt-3 rounded-lg border border-ocean-200 bg-ocean-100 p-2.5">
					<p className="mb-2 text-sm font-medium text-ocean-text">Using opposites with verbs</p>
					<div className="space-y-1.5 text-sm">
						<div>
							<GreekText tone="accent" size="lg">μπες μέσα</GreekText>
							<span className="ml-2 text-xs text-stone-500">go inside</span>
						</div>
						<div>
							<GreekText tone="accent" size="lg">βγες έξω</GreekText>
							<span className="ml-2 text-xs text-stone-500">go outside</span>
						</div>
						<div>
							<GreekText tone="accent" size="lg">ανέβα πάνω</GreekText>
							<span className="ml-2 text-xs text-stone-500">go up</span>
						</div>
						<div>
							<GreekText tone="accent" size="lg">κατέβα κάτω</GreekText>
							<span className="ml-2 text-xs text-stone-500">go down</span>
						</div>
					</div>
					<p className="mt-2 border-t border-ocean-200/50 pt-1.5 text-xs text-stone-500">
						Greek pairs direction verbs with position words for emphasis
					</p>
				</div>
			</ContentSection>

			{/* Giving Directions */}
			<ContentSection
				title="Giving Directions"
				subtitle="Commands for navigation"
				colorScheme="terracotta"
			>
				<ExampleList examples={DIRECTION_EXAMPLES} />

				<div className="mx-3 mt-3 rounded-lg border border-terracotta-200 bg-terracotta-100 p-2.5">
					<p className="mb-2 text-sm font-medium text-terracotta-text">Key verbs for directions</p>
					<div className="space-y-1.5 text-sm">
						<div>
							<GreekText tone="accent" size="lg">στρίψε</GreekText>
							<span className="ml-2 text-xs text-stone-500">turn (command)</span>
						</div>
						<div>
							<GreekText tone="accent" size="lg">πήγαινε</GreekText>
							<span className="ml-2 text-xs text-stone-500">go (command)</span>
						</div>
						<div>
							<GreekText tone="accent" size="lg">έλα</GreekText>
							<span className="ml-2 text-xs text-stone-500">come (command)</span>
						</div>
					</div>
				</div>
			</ContentSection>

			{/* Relative Position */}
			<ContentSection
				title="Relative Position"
				subtitle="Describing where things are"
				colorScheme="olive"
			>
				<ExampleList examples={RELATIVE_POSITION_EXAMPLES} />

				<div className="mx-3 mt-3 rounded-lg border border-olive-200 bg-olive-100 p-2.5">
					<p className="mb-2 text-sm font-medium text-olive-text">Preposition patterns</p>
					<div className="space-y-1.5 text-sm">
						<div>
							<GreekText tone="accent" size="lg">μπροστά / πίσω / μακριά</GreekText>
							<span className="ml-2 text-xs text-stone-500">+ από</span>
						</div>
						<div>
							<GreekText tone="accent" size="lg">κοντά / μέσα</GreekText>
							<span className="ml-2 text-xs text-stone-500">+ σε</span>
						</div>
						<div>
							<GreekText tone="accent" size="lg">ανάμεσα</GreekText>
							<span className="ml-2 text-xs text-stone-500">+ σε</span>
						</div>
						<div>
							<GreekText tone="accent" size="lg">απέναντι</GreekText>
							<span className="ml-2 text-xs text-stone-500">+ από</span>
						</div>
					</div>
					<p className="mt-2 border-t border-olive-200/50 pt-1.5 text-xs text-stone-500">
						<GreekText tone="default" size="base" className="text-stone-700">κοντά στο</GreekText> = κοντά + σε + το (contracted)
					</p>
				</div>
			</ContentSection>
		</div>
	);
}
