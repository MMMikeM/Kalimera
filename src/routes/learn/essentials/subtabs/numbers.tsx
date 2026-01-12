import { ChevronLeft } from "lucide-react";
import { Link } from "react-router";
import { ContentSection } from "@/components/ContentSection";
import { MonoText } from "@/components/MonoText";
import type { EssentialsLoaderData } from "../data.server";

interface Props {
	data: EssentialsLoaderData;
}

const UNIT_TEN_PAIRS: Array<{
	unit: number;
	ten: number;
	connection?: string;
}> = [
	{ unit: 1, ten: 10 },
	{ unit: 2, ten: 20 },
	{ unit: 3, ten: 30, connection: "τρι-" },
	{ unit: 4, ten: 40 },
	{ unit: 5, ten: 50, connection: "πεν-" },
	{ unit: 6, ten: 60, connection: "εξ-" },
	{ unit: 7, ten: 70 },
	{ unit: 8, ten: 80 },
	{ unit: 9, ten: 90 },
];

function highlightTeenPattern(greek: string) {
	// δέκα (10) - the whole word is "ten"
	if (greek === "δέκα") {
		return <span className="text-ocean-600 font-semibold">{greek}</span>;
	}
	// δώδεκα (12) - "two-ten", highlight δεκα at end
	if (greek === "δώδεκα") {
		return (
			<>
				δώ<span className="text-ocean-600 font-semibold">δεκα</span>
			</>
		);
	}
	// δεκα* (13-19) - highlight prefix
	const prefix = "δεκα";
	if (greek.startsWith(prefix)) {
		return (
			<>
				<span className="text-ocean-600 font-semibold">{prefix}</span>
				{greek.slice(prefix.length)}
			</>
		);
	}
	return greek;
}

export function NumbersSubtab({ data }: Props) {
	const numberByValue = new Map(data.numbers.map((n) => [n.numericValue, n]));

	const zero = numberByValue.get(0);
	const teens = data.numbers.filter(
		(n) =>
			n.numericValue !== undefined &&
			n.numericValue >= 10 &&
			n.numericValue <= 19,
	);

	return (
		<div className="space-y-6">
			<Link
				to="/learn/essentials"
				className="inline-flex items-center gap-1 text-sm text-stone-600 hover:text-stone-900"
			>
				<ChevronLeft size={16} />
				Essentials
			</Link>

			{/* Units + Tens Paired Layout */}
			<ContentSection
				title="Units & Tens"
				subtitle="Building blocks — see how tens derive from units"
				colorScheme="ocean"
			>
				<div className="divide-y divide-stone-200/60">
					{/* Header row */}
					<div className="grid grid-cols-[1fr_1fr] gap-4 px-3 py-2 bg-ocean-100/50">
						<span className="text-xs font-medium text-ocean-text uppercase tracking-wide">
							Units
						</span>
						<span className="text-xs font-medium text-ocean-text uppercase tracking-wide">
							Tens
						</span>
					</div>

					{/* Zero special case */}
					{zero && (
						<div className="grid grid-cols-[1fr_1fr] gap-4 px-3 py-2.5">
							<div>
								<MonoText variant="greek">{zero.greek}</MonoText>
								<div className="text-xs text-stone-500">{zero.english}</div>
							</div>
							<div className="text-stone-300 text-sm italic">—</div>
						</div>
					)}

					{/* Paired rows */}
					{UNIT_TEN_PAIRS.map(({ unit, ten, connection }) => {
						const unitNum = numberByValue.get(unit);
						const tenNum = numberByValue.get(ten);

						return (
							<div
								key={unit}
								className="grid grid-cols-[1fr_1fr] gap-4 px-3 py-2.5"
							>
								{/* Unit column */}
								<div>
									{unitNum ? (
										<>
											<MonoText variant="greek">{unitNum.greek}</MonoText>
											<div className="text-xs text-stone-500">
												{unitNum.english}
											</div>
										</>
									) : (
										<span className="text-stone-300">—</span>
									)}
								</div>

								{/* Tens column */}
								<div className="flex items-start gap-2">
									<div className="flex-1">
										{tenNum ? (
											<>
												<MonoText variant="greek">{tenNum.greek}</MonoText>
												<div className="text-xs text-stone-500">
													{tenNum.english}
												</div>
											</>
										) : (
											<span className="text-stone-300">—</span>
										)}
									</div>
									{connection && (
										<span className="text-xs text-ocean-600 bg-ocean-100 px-1.5 py-0.5 rounded font-medium mt-0.5">
											{connection}
										</span>
									)}
								</div>
							</div>
						);
					})}
				</div>
			</ContentSection>

			{/* Teens Section */}
			<ContentSection
				title="Teens"
				subtitle="The δεκα- (ten) family: 10-19"
				colorScheme="honey"
			>
				<div className="divide-y divide-stone-200/60">
					{teens.map((number) => (
						<div
							key={number.id}
							className="grid grid-cols-[3fr_2fr] items-center gap-x-3 py-2.5 px-3"
						>
							<MonoText variant="greek">
								{highlightTeenPattern(number.greek)}
							</MonoText>
							<span className="text-stone-500 text-sm">{number.english}</span>
						</div>
					))}
				</div>
				<div className="mx-3 mt-3 p-2.5 bg-honey-100 rounded-lg border border-honey-200">
					<p className="text-sm text-honey-text font-medium">
						Pattern: <MonoText className="text-honey-text">δεκα</MonoText> +
						unit
					</p>
					<p className="text-xs text-stone-500 mt-1">
						Exception: 11, 12 are irregular (έντεκα, δώδεκα)
					</p>
				</div>
			</ContentSection>

			{/* Combining Section */}
			<ContentSection
				title="Combining"
				subtitle="Building 21-99"
				colorScheme="olive"
			>
				<div className="px-3 pt-3 pb-1 space-y-3">
					<p className="text-sm text-stone-600">
						Combine tens + units as separate words:
					</p>

					<div className="space-y-2">
						<div>
							<MonoText variant="greek">
								τριάντα + δύο ={" "}
								<span className="font-semibold">τριάντα δύο</span>
							</MonoText>
							<div className="text-xs text-stone-500">thirty-two</div>
						</div>
						<div>
							<MonoText variant="greek">
								πενήντα + πέντε ={" "}
								<span className="font-semibold">πενήντα πέντε</span>
							</MonoText>
							<div className="text-xs text-stone-500">fifty-five</div>
						</div>
						<div>
							<MonoText variant="greek">
								ενενήντα + εννέα ={" "}
								<span className="font-semibold">ενενήντα εννέα</span>
							</MonoText>
							<div className="text-xs text-stone-500">ninety-nine</div>
						</div>
					</div>
				</div>
			</ContentSection>

			{/* Usage Examples */}
			<ContentSection
				title="Usage"
				subtitle="Numbers in context"
				colorScheme="terracotta"
			>
				<div className="px-3 pt-3 pb-1 space-y-4">
					{/* Telling Time */}
					<div>
						<p className="text-xs font-medium text-terracotta-text uppercase tracking-wide mb-2">
							Telling Time
						</p>
						<div className="space-y-2">
							<div>
								<MonoText variant="greek">στις τρεις</MonoText>
								<div className="text-xs text-stone-500">at three o'clock</div>
							</div>
							<div>
								<MonoText variant="greek">στις δέκα και μισή</MonoText>
								<div className="text-xs text-stone-500">at half past ten</div>
							</div>
						</div>
						<p className="text-xs text-stone-500 mt-1.5 pt-1.5 border-t border-terracotta-200/50">
							<MonoText className="text-stone-700">στις</MonoText> = at (uses
							feminine accusative)
						</p>
					</div>

					{/* Money & Quantities */}
					<div>
						<p className="text-xs font-medium text-terracotta-text uppercase tracking-wide mb-2">
							Money & Quantities
						</p>
						<div className="space-y-2">
							<div>
								<MonoText variant="greek">πέντε ευρώ</MonoText>
								<div className="text-xs text-stone-500">five euros</div>
							</div>
							<div>
								<MonoText variant="greek">δύο κιλά</MonoText>
								<div className="text-xs text-stone-500">two kilos</div>
							</div>
							<div>
								<MonoText variant="greek">τρία μπουκάλια νερό</MonoText>
								<div className="text-xs text-stone-500">
									three bottles of water
								</div>
							</div>
						</div>
					</div>

					{/* Talking About Age */}
					<div>
						<p className="text-xs font-medium text-terracotta-text uppercase tracking-wide mb-2">
							Talking About Age
						</p>
						<div className="space-y-2">
							<div>
								<MonoText variant="greek">είμαι τριάντα δύο χρονών</MonoText>
								<div className="text-xs text-stone-500">I'm 32 years old</div>
							</div>
							<div>
								<MonoText variant="greek">πόσων χρονών είσαι;</MonoText>
								<div className="text-xs text-stone-500">How old are you?</div>
							</div>
						</div>
					</div>
				</div>

				{/* Gender Agreement Warning */}
				<div className="mx-3 mt-3 mb-2 p-2.5 bg-terracotta-100 rounded-lg border border-terracotta-200">
					<p className="text-sm text-terracotta-text font-medium mb-2">
						Gender Agreement: 1, 3, 4 change form
					</p>

					{/* Gender grid */}
					<div className="grid grid-cols-4 gap-1 text-sm mb-3">
						<div className="text-xs text-stone-500" />
						<div className="text-xs text-stone-500 text-center">masc.</div>
						<div className="text-xs text-stone-500 text-center">fem.</div>
						<div className="text-xs text-stone-500 text-center">neut.</div>

						<div className="text-xs text-stone-600 font-medium">1</div>
						<div className="text-center">
							<MonoText size="sm">ένας</MonoText>
						</div>
						<div className="text-center">
							<MonoText size="sm">μία</MonoText>
						</div>
						<div className="text-center">
							<MonoText size="sm">ένα</MonoText>
						</div>

						<div className="text-xs text-stone-600 font-medium">3</div>
						<div className="text-center">
							<MonoText size="sm">τρεις</MonoText>
						</div>
						<div className="text-center">
							<MonoText size="sm">τρεις</MonoText>
						</div>
						<div className="text-center">
							<MonoText size="sm">τρία</MonoText>
						</div>

						<div className="text-xs text-stone-600 font-medium">4</div>
						<div className="text-center">
							<MonoText size="sm">τέσσερις</MonoText>
						</div>
						<div className="text-center">
							<MonoText size="sm">τέσσερις</MonoText>
						</div>
						<div className="text-center">
							<MonoText size="sm">τέσσερα</MonoText>
						</div>
					</div>

					<div className="space-y-1.5 text-sm">
						<div>
							<MonoText variant="greek">ένας καφές</MonoText>
							<span className="text-stone-500 text-xs ml-2">
								(one coffee, masc.)
							</span>
						</div>
						<div>
							<MonoText variant="greek">μία μπύρα</MonoText>
							<span className="text-stone-500 text-xs ml-2">
								(one beer, fem.)
							</span>
						</div>
						<div>
							<MonoText variant="greek">ένα νερό</MonoText>
							<span className="text-stone-500 text-xs ml-2">
								(one water, neut.)
							</span>
						</div>
					</div>

					<p className="text-xs text-stone-500 mt-2 pt-1.5 border-t border-terracotta-200/50">
						Numbers 2 and 5+ don't change for gender
					</p>
				</div>
			</ContentSection>
		</div>
	);
}
