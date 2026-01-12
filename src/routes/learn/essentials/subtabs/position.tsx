import { ChevronLeft } from "lucide-react";
import { Link } from "react-router";
import { ContentSection } from "@/components/ContentSection";
import { MonoText } from "@/components/MonoText";
import type { EssentialsLoaderData } from "../data.server";

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
	const adverbByGreek = new Map(data.positionAdverbs.map((a) => [a.greek, a]));

	return (
		<div className="space-y-6">
			<Link
				to="/learn/essentials"
				className="inline-flex items-center gap-1 text-sm text-stone-600 hover:text-stone-900"
			>
				<ChevronLeft size={16} />
				Essentials
			</Link>

			{/* Opposites Grid */}
			<ContentSection
				title="Opposites"
				subtitle="Position words come in pairs"
				colorScheme="ocean"
			>
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
								<div className="py-2.5 px-3">
									{left && (
										<>
											<MonoText variant="greek">{left.greek}</MonoText>
											<div className="text-xs text-stone-500">
												{left.english}
											</div>
										</>
									)}
								</div>

								{/* Right column */}
								<div className="py-2.5 px-3">
									{right && (
										<>
											<MonoText variant="greek">{right.greek}</MonoText>
											<div className="text-xs text-stone-500">
												{right.english}
											</div>
										</>
									)}
								</div>
							</div>
						);
					})}
				</div>

				<div className="mx-3 mt-3 p-2.5 bg-ocean-100 rounded-lg border border-ocean-200">
					<p className="text-sm text-ocean-text font-medium mb-2">
						Using opposites with verbs
					</p>
					<div className="space-y-1.5 text-sm">
						<div>
							<MonoText variant="greek">μπες μέσα</MonoText>
							<span className="text-stone-500 text-xs ml-2">go inside</span>
						</div>
						<div>
							<MonoText variant="greek">βγες έξω</MonoText>
							<span className="text-stone-500 text-xs ml-2">go outside</span>
						</div>
						<div>
							<MonoText variant="greek">ανέβα πάνω</MonoText>
							<span className="text-stone-500 text-xs ml-2">go up</span>
						</div>
						<div>
							<MonoText variant="greek">κατέβα κάτω</MonoText>
							<span className="text-stone-500 text-xs ml-2">go down</span>
						</div>
					</div>
					<p className="text-xs text-stone-500 mt-2 pt-1.5 border-t border-ocean-200/50">
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
				<div className="divide-y divide-stone-200/60">
					{DIRECTION_EXAMPLES.map((example) => (
						<div key={example.greek} className="py-2.5 px-3">
							<MonoText variant="greek">{example.greek}</MonoText>
							<div className="text-xs text-stone-500">{example.english}</div>
						</div>
					))}
				</div>

				<div className="mx-3 mt-3 p-2.5 bg-terracotta-100 rounded-lg border border-terracotta-200">
					<p className="text-sm text-terracotta-text font-medium mb-2">
						Key verbs for directions
					</p>
					<div className="space-y-1.5 text-sm">
						<div>
							<MonoText variant="greek">στρίψε</MonoText>
							<span className="text-stone-500 text-xs ml-2">
								turn (command)
							</span>
						</div>
						<div>
							<MonoText variant="greek">πήγαινε</MonoText>
							<span className="text-stone-500 text-xs ml-2">go (command)</span>
						</div>
						<div>
							<MonoText variant="greek">έλα</MonoText>
							<span className="text-stone-500 text-xs ml-2">
								come (command)
							</span>
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
				<div className="divide-y divide-stone-200/60">
					{RELATIVE_POSITION_EXAMPLES.map((example) => (
						<div key={example.greek} className="py-2.5 px-3">
							<MonoText variant="greek">{example.greek}</MonoText>
							<div className="text-xs text-stone-500">{example.english}</div>
						</div>
					))}
				</div>

				<div className="mx-3 mt-3 p-2.5 bg-olive-100 rounded-lg border border-olive-200">
					<p className="text-sm text-olive-text font-medium mb-2">
						Preposition patterns
					</p>
					<div className="space-y-1.5 text-sm">
						<div>
							<MonoText variant="greek">μπροστά / πίσω / μακριά</MonoText>
							<span className="text-stone-500 text-xs ml-2">+ από</span>
						</div>
						<div>
							<MonoText variant="greek">κοντά / μέσα</MonoText>
							<span className="text-stone-500 text-xs ml-2">+ σε</span>
						</div>
						<div>
							<MonoText variant="greek">ανάμεσα</MonoText>
							<span className="text-stone-500 text-xs ml-2">+ σε</span>
						</div>
						<div>
							<MonoText variant="greek">απέναντι</MonoText>
							<span className="text-stone-500 text-xs ml-2">+ από</span>
						</div>
					</div>
					<p className="text-xs text-stone-500 mt-2 pt-1.5 border-t border-olive-200/50">
						<MonoText className="text-stone-700">κοντά στο</MonoText> = κοντά +
						σε + το (contracted)
					</p>
				</div>
			</ContentSection>
		</div>
	);
}
