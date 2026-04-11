import { ChevronLeft } from "lucide-react";
import { Link } from "react-router";
import { ContentSection } from "@/components/ContentSection";
import { MonoText } from "@/components/MonoText";
import type { EssentialsLoaderData } from "../data.server";

interface Props {
	data: EssentialsLoaderData;
}

const COLOUR_HEX: Record<string, string> = {
	άσπρο: "#ffffff",
	μαύρο: "#1c1917",
	κόκκινο: "#dc2626",
	κίτρινο: "#facc15",
	μπλε: "#2563eb",
	γαλάζιο: "#7dd3fc",
	πράσινο: "#16a34a",
	πορτοκαλί: "#f97316",
	μωβ: "#a855f7",
	γκρι: "#78716c",
	καφέ: "#78350f",
	ροζ: "#ec4899",
	μπεζ: "#d4c4a8",
	χρυσό: "#d4af37",
	ασημί: "#c0c0c0",
	"σκούρο μπλε": "#1e3a5f",
	"ανοιχτό πράσινο": "#86efac",
	"σκούρο κόκκινο": "#7f1d1d",
	"ανοιχτό μπλε": "#93c5fd",
	"έντονο κόκκινο": "#b91c1c",
	"απαλό ροζ": "#fce7f3",
};

const COLOUR_ORDER: Array<[string, string]> = [
	["άσπρο", "μαύρο"],
	["κόκκινο", "πορτοκαλί"],
	["κίτρινο", "πράσινο"],
	["μπλε", "γαλάζιο"],
	["μωβ", "ροζ"],
	["καφέ", "μπεζ"],
	["γκρι", ""],
	["χρυσό", "ασημί"],
];

const MODIFIERS = [
	{ greek: "σκούρο", english: "dark" },
	{ greek: "ανοιχτό", english: "light" },
	{ greek: "έντονο", english: "vivid/intense" },
	{ greek: "απαλό", english: "soft/pale" },
	{ greek: "φωτεινό", english: "bright" },
];

const MODIFIER_EXAMPLES = [
	{ greek: "σκούρο μπλε", english: "dark blue / navy" },
	{ greek: "ανοιχτό πράσινο", english: "light green" },
	{ greek: "έντονο κόκκινο", english: "vivid red" },
	{ greek: "απαλό ροζ", english: "soft pink" },
];

const USAGE_EXAMPLES = [
	{ greek: "θέλω το κόκκινο", english: "I want the red one" },
	{ greek: "η κόκκινη τσάντα", english: "the red bag" },
	{ greek: "το μπλε αυτοκίνητο", english: "the blue car" },
	{ greek: "τα πράσινα μάτια", english: "the green eyes" },
];

function ColourSwatch({ greek }: { greek: string }) {
	const hex = COLOUR_HEX[greek] ?? "#9ca3af";
	const isLight = greek === "άσπρο" || greek === "κίτρινο";

	return (
		<span
			className={`inline-block h-5 w-5 shrink-0 rounded-full ${isLight ? "border border-stone-300" : ""}`}
			style={{ backgroundColor: hex }}
		/>
	);
}

export function ColoursSubtab({ data }: Props) {
	const colourByGreek = new Map(data.colors.map((c) => [c.greekText, c]));

	return (
		<div className="space-y-6">
			<Link
				to="/learn/essentials"
				className="inline-flex items-center gap-1 text-sm text-stone-600 hover:text-stone-900"
			>
				<ChevronLeft size={16} />
				Essentials
			</Link>

			{/* Basic Colours */}
			<ContentSection title="Basic Colours" subtitle="Τα βασικά χρώματα" colorScheme="ocean">
				<div className="divide-y divide-stone-200/60">
					{COLOUR_ORDER.map(([leftGreek, rightGreek]) => {
						const left = colourByGreek.get(leftGreek);
						const right = colourByGreek.get(rightGreek);

						if (!left && !right) return null;

						return (
							<div
								key={`${leftGreek}-${rightGreek}`}
								className="grid grid-cols-2 divide-x divide-stone-200/60"
							>
								{/* Left column */}
								<div className="flex items-start gap-2.5 px-3 py-2.5">
									{left && (
										<>
											<ColourSwatch greek={left.greekText} />
											<div className="min-w-0">
												<MonoText variant="greek">{left.greekText}</MonoText>
												<div className="text-xs text-stone-500">{left.englishTranslation}</div>
											</div>
										</>
									)}
								</div>

								{/* Right column */}
								<div className="flex items-start gap-2.5 px-3 py-2.5">
									{right && (
										<>
											<ColourSwatch greek={right.greekText} />
											<div className="min-w-0">
												<MonoText variant="greek">{right.greekText}</MonoText>
												<div className="text-xs text-stone-500">{right.englishTranslation}</div>
											</div>
										</>
									)}
								</div>
							</div>
						);
					})}
				</div>
			</ContentSection>

			{/* Modifiers */}
			<ContentSection title="Modifiers" subtitle="Describing shades" colorScheme="honey">
				<div className="divide-y divide-stone-200/60">
					{MODIFIERS.map((mod) => (
						<div key={mod.greek} className="grid grid-cols-[1fr_1fr] gap-x-3 px-3 py-2.5">
							<MonoText variant="greek">{mod.greek}</MonoText>
							<span className="text-sm text-stone-500">{mod.english}</span>
						</div>
					))}
				</div>

				<div className="px-3 pt-3 pb-1">
					<p className="mb-2 text-xs font-medium tracking-wide text-stone-500 uppercase">
						Examples
					</p>
					<div className="space-y-2">
						{MODIFIER_EXAMPLES.map((example) => (
							<div key={example.greek} className="flex items-center gap-2.5">
								<ColourSwatch greek={example.greek} />
								<div>
									<MonoText variant="greek">{example.greek}</MonoText>
									<span className="ml-2 text-xs text-stone-500">{example.english}</span>
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="mx-3 mt-3 rounded-lg border border-honey-200 bg-honey-100 p-2.5">
					<p className="mb-2 text-sm font-medium text-honey-text">In context</p>
					<div className="space-y-1.5 text-sm">
						<div>
							<MonoText variant="greek">Θέλω το σκούρο μπλε.</MonoText>
							<div className="text-xs text-stone-500">I want the dark blue (one).</div>
						</div>
						<div>
							<MonoText variant="greek">Έχετε απαλό ροζ;</MonoText>
							<div className="text-xs text-stone-500">Do you have soft pink?</div>
						</div>
					</div>
				</div>
			</ContentSection>

			{/* Usage */}
			<ContentSection title="Usage" subtitle="Colours in sentences" colorScheme="terracotta">
				<div className="divide-y divide-stone-200/60">
					{USAGE_EXAMPLES.map((example) => (
						<div key={example.greek} className="px-3 py-2.5">
							<MonoText variant="greek">{example.greek}</MonoText>
							<div className="text-xs text-stone-500">{example.english}</div>
						</div>
					))}
				</div>

				<div className="mx-3 mt-3 rounded-lg border border-terracotta-200 bg-terracotta-100 p-2.5">
					<p className="mb-2 text-sm font-medium text-terracotta-text">Colour agreement</p>
					<div className="space-y-1.5 text-sm">
						<p className="text-stone-600">
							Most colours are <strong>indeclinable</strong> — they don't change form:
						</p>
						<div className="space-y-1 pl-2">
							<div>
								<MonoText variant="greek">
									μπλε, μωβ, ροζ, γκρι, καφέ, πορτοκαλί, μπεζ, ασημί
								</MonoText>
							</div>
						</div>
					</div>
					<div className="mt-2 space-y-1.5 border-t border-terracotta-200/50 pt-2 text-sm">
						<p className="text-stone-600">
							Some colours <strong>do decline</strong> like adjectives:
						</p>
						<div className="space-y-1 pl-2">
							<div>
								<MonoText variant="greek">άσπρος, -η, -ο</MonoText>
								<span className="ml-2 text-xs text-stone-500">(white)</span>
							</div>
							<div>
								<MonoText variant="greek">μαύρος, -η, -ο</MonoText>
								<span className="ml-2 text-xs text-stone-500">(black)</span>
							</div>
							<div>
								<MonoText variant="greek">κόκκινος, -η, -ο</MonoText>
								<span className="ml-2 text-xs text-stone-500">(red)</span>
							</div>
							<div>
								<MonoText variant="greek">πράσινος, -η, -ο</MonoText>
								<span className="ml-2 text-xs text-stone-500">(green)</span>
							</div>
							<div>
								<MonoText variant="greek">κίτρινος, -η, -ο</MonoText>
								<span className="ml-2 text-xs text-stone-500">(yellow)</span>
							</div>
							<div>
								<MonoText variant="greek">γαλάζιος, -α, -ο</MonoText>
								<span className="ml-2 text-xs text-stone-500">(sky blue)</span>
							</div>
							<div>
								<MonoText variant="greek">χρυσός, -ή, -ό</MonoText>
								<span className="ml-2 text-xs text-stone-500">(gold/golden)</span>
							</div>
						</div>
					</div>
				</div>
			</ContentSection>
		</div>
	);
}
