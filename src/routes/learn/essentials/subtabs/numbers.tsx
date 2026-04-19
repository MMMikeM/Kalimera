import { ContentSection } from "@/components/ContentSection";
import { MonoText } from "@/components/MonoText";

import type { EssentialsLoaderData } from "../loader.server";
import { EssentialsBackLink } from "./EssentialsBackLink";

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
		return <span className="font-semibold text-ocean-600">{greek}</span>;
	}
	// δώδεκα (12) - "two-ten", highlight δεκα at end
	if (greek === "δώδεκα") {
		return (
			<>
				δώ<span className="font-semibold text-ocean-600">δεκα</span>
			</>
		);
	}
	// δεκα* (13-19) - highlight prefix
	const prefix = "δεκα";
	if (greek.startsWith(prefix)) {
		return (
			<>
				<span className="font-semibold text-ocean-600">{prefix}</span>
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
		(n) => n.numericValue !== undefined && n.numericValue >= 10 && n.numericValue <= 19,
	);

	return (
		<div className="space-y-6">
			<EssentialsBackLink />

			{/* Units + Tens Paired Layout */}
			<ContentSection
				title="Units & Tens"
				subtitle="Building blocks — see how tens derive from units"
				colorScheme="ocean"
			>
				<div className="divide-y divide-stone-200/60">
					{/* Header row */}
					<div className="grid grid-cols-2 gap-4 bg-ocean-100/50 px-3 py-2">
						<span className="text-xs font-medium tracking-wide text-ocean-text uppercase">
							Units
						</span>
						<span className="text-xs font-medium tracking-wide text-ocean-text uppercase">
							Tens
						</span>
					</div>

					{/* Zero special case */}
					{zero && (
						<div className="grid grid-cols-2 gap-4 px-3 py-2.5">
							<div>
								<MonoText variant="greek">{zero.greekText}</MonoText>
								<div className="text-xs text-stone-500">{zero.englishTranslation}</div>
							</div>
							<div className="text-sm text-stone-300 italic">—</div>
						</div>
					)}

					{/* Paired rows */}
					{UNIT_TEN_PAIRS.map(({ unit, ten, connection }) => {
						const unitNum = numberByValue.get(unit);
						const tenNum = numberByValue.get(ten);

						return (
							<div key={unit} className="grid grid-cols-2 gap-4 px-3 py-2.5">
								{/* Unit column */}
								<div>
									{unitNum ? (
										<>
											<MonoText variant="greek">{unitNum.greekText}</MonoText>
											<div className="text-xs text-stone-500">{unitNum.englishTranslation}</div>
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
												<MonoText variant="greek">{tenNum.greekText}</MonoText>
												<div className="text-xs text-stone-500">{tenNum.englishTranslation}</div>
											</>
										) : (
											<span className="text-stone-300">—</span>
										)}
									</div>
									{connection && (
										<span className="mt-0.5 rounded bg-ocean-100 px-1.5 py-0.5 text-xs font-medium text-ocean-600">
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
			<ContentSection title="Teens" subtitle="The δεκα- (ten) family: 10-19" colorScheme="honey">
				<div className="divide-y divide-stone-200/60">
					{teens.map((number) => (
						<div
							key={number.id}
							// eslint-disable-next-line better-tailwindcss/no-restricted-classes -- 60/40 layout, no token fit
							className="grid grid-cols-[3fr_2fr] items-center gap-x-3 px-3 py-2.5"
						>
							<MonoText variant="greek">{highlightTeenPattern(number.greekText)}</MonoText>
							<span className="text-sm text-stone-500">{number.englishTranslation}</span>
						</div>
					))}
				</div>
				<div className="mx-3 mt-3 rounded-lg border border-honey-200 bg-honey-100 p-2.5">
					<p className="text-sm font-medium text-honey-text">
						Pattern: <MonoText className="text-honey-text">δεκα</MonoText> + unit
					</p>
					<p className="mt-1 text-xs text-stone-500">
						Exception: 11, 12 are irregular (έντεκα, δώδεκα)
					</p>
				</div>
			</ContentSection>

			{/* Combining Section */}
			<ContentSection title="Combining" subtitle="Building 21-99" colorScheme="olive">
				<div className="space-y-3 px-3 pt-3 pb-1">
					<p className="text-sm text-stone-600">Combine tens + units as separate words:</p>

					<div className="space-y-2">
						<div>
							<MonoText variant="greek">
								τριάντα + δύο = <span className="font-semibold">τριάντα δύο</span>
							</MonoText>
							<div className="text-xs text-stone-500">thirty-two</div>
						</div>
						<div>
							<MonoText variant="greek">
								πενήντα + πέντε = <span className="font-semibold">πενήντα πέντε</span>
							</MonoText>
							<div className="text-xs text-stone-500">fifty-five</div>
						</div>
						<div>
							<MonoText variant="greek">
								ενενήντα + εννέα = <span className="font-semibold">ενενήντα εννέα</span>
							</MonoText>
							<div className="text-xs text-stone-500">ninety-nine</div>
						</div>
					</div>
				</div>
			</ContentSection>

			{/* Usage Examples */}
			<ContentSection title="Usage" subtitle="Numbers in context" colorScheme="terracotta">
				<div className="space-y-4 px-3 pt-3 pb-1">
					{/* Telling Time */}
					<div>
						<p className="mb-2 text-xs font-medium tracking-wide text-terracotta-text uppercase">
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
						<p className="mt-1.5 border-t border-terracotta-200/50 pt-1.5 text-xs text-stone-500">
							<MonoText className="text-stone-700">στις</MonoText> = at (uses feminine accusative)
						</p>
					</div>

					{/* Money & Quantities */}
					<div>
						<p className="mb-2 text-xs font-medium tracking-wide text-terracotta-text uppercase">
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
								<div className="text-xs text-stone-500">three bottles of water</div>
							</div>
						</div>
					</div>

					{/* Talking About Age */}
					<div>
						<p className="mb-2 text-xs font-medium tracking-wide text-terracotta-text uppercase">
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
				<div className="mx-3 mt-3 mb-2 rounded-lg border border-terracotta-200 bg-terracotta-100 p-2.5">
					<p className="mb-2 text-sm font-medium text-terracotta-text">
						Gender Agreement: 1, 3, 4 change form
					</p>

					{/* Gender grid */}
					<div className="mb-3 grid grid-cols-4 gap-1 text-sm">
						<div className="text-xs text-stone-500" />
						<div className="text-center text-xs text-stone-500">masc.</div>
						<div className="text-center text-xs text-stone-500">fem.</div>
						<div className="text-center text-xs text-stone-500">neut.</div>

						<div className="text-xs font-medium text-stone-600">1</div>
						<div className="text-center">
							<MonoText size="sm">ένας</MonoText>
						</div>
						<div className="text-center">
							<MonoText size="sm">μία</MonoText>
						</div>
						<div className="text-center">
							<MonoText size="sm">ένα</MonoText>
						</div>

						<div className="text-xs font-medium text-stone-600">3</div>
						<div className="text-center">
							<MonoText size="sm">τρεις</MonoText>
						</div>
						<div className="text-center">
							<MonoText size="sm">τρεις</MonoText>
						</div>
						<div className="text-center">
							<MonoText size="sm">τρία</MonoText>
						</div>

						<div className="text-xs font-medium text-stone-600">4</div>
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
							<span className="ml-2 text-xs text-stone-500">(one coffee, masc.)</span>
						</div>
						<div>
							<MonoText variant="greek">μία μπύρα</MonoText>
							<span className="ml-2 text-xs text-stone-500">(one beer, fem.)</span>
						</div>
						<div>
							<MonoText variant="greek">ένα νερό</MonoText>
							<span className="ml-2 text-xs text-stone-500">(one water, neut.)</span>
						</div>
					</div>

					<p className="mt-2 border-t border-terracotta-200/50 pt-1.5 text-xs text-stone-500">
						Numbers 2 and 5+ don't change for gender
					</p>
				</div>
			</ContentSection>
		</div>
	);
}
