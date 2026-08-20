import { ContentSection } from "@/components/ContentSection";
import { GreekText } from "@/components/GreekText";
import { type Gender, getArticle } from "@/lib/greek-grammar";

import type { EssentialsLoaderData } from "../$subtab";
import { EssentialsBackLink } from "./essentials-back-link";

const ARTICLE_STYLES: Record<Gender, string> = {
	masculine: "bg-gender-masculine-100 text-gender-masculine-text",
	feminine: "bg-gender-feminine-100 text-gender-feminine-text",
	neuter: "bg-gender-neuter-100 text-gender-neuter-text",
};

/**
 * The article is derived from the noun's gender rather than baked into
 * `greek_text`. Storing it in the text is what produced a duplicate "η Δευτέρα"
 * row beside "Δευτέρα", and it cannot show that Σάββατο is the one neuter day.
 */
const CalendarName = ({
	greek,
	english,
	gender,
}: {
	greek: string;
	english: string;
	gender?: Gender | null;
}) => (
	<div
		// eslint-disable-next-line better-tailwindcss/no-restricted-classes -- 60/40 layout, no token fit
		className="grid grid-cols-[3fr_2fr] items-center gap-x-3 px-3 py-2.5"
	>
		<span className="flex items-baseline gap-2">
			{gender && (
				<span className={`rounded px-1.5 py-0.5 text-sm font-bold ${ARTICLE_STYLES[gender]}`}>
					{getArticle(gender)}
				</span>
			)}
			<GreekText tone="accent" size="lg">
				{greek}
			</GreekText>
		</span>
		<span className="text-sm text-stone-500">{english}</span>
	</div>
);

interface Props {
	data: EssentialsLoaderData;
}

const TIME_ORDER = ["morning", "midday", "afternoon", "evening", "night"];

const DAY_ORDER = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

const MONTH_ORDER = [
	"january",
	"february",
	"march",
	"april",
	"may",
	"june",
	"july",
	"august",
	"september",
	"october",
	"november",
	"december",
];

export function TimeSubtab({ data }: Props) {
	const sortedTimes = [...data.timesOfDay].sort((a, b) => {
		const aOrder = TIME_ORDER.indexOf(a.englishTranslation.toLowerCase());
		const bOrder = TIME_ORDER.indexOf(b.englishTranslation.toLowerCase());
		return (aOrder === -1 ? 999 : aOrder) - (bOrder === -1 ? 999 : bOrder);
	});

	const sortedDays = [...data.daysOfWeek].sort((a, b) => {
		const aOrder = DAY_ORDER.indexOf(a.englishTranslation.toLowerCase());
		const bOrder = DAY_ORDER.indexOf(b.englishTranslation.toLowerCase());
		return (aOrder === -1 ? 999 : aOrder) - (bOrder === -1 ? 999 : bOrder);
	});

	const sortedMonths = [...data.months].sort((a, b) => {
		const aOrder = MONTH_ORDER.indexOf(a.englishTranslation.toLowerCase());
		const bOrder = MONTH_ORDER.indexOf(b.englishTranslation.toLowerCase());
		return (aOrder === -1 ? 999 : aOrder) - (bOrder === -1 ? 999 : bOrder);
	});

	return (
		<div className="space-y-6">
			<EssentialsBackLink />

			{/* Times of Day */}
			<ContentSection title="Times of Day" subtitle="Οι ώρες της ημέρας" colorScheme="honey">
				<div className="divide-y divide-stone-200/60">
					{sortedTimes.map((time) => (
						<div
							key={time.id}
							// eslint-disable-next-line better-tailwindcss/no-restricted-classes -- 60/40 layout, no token fit
							className="grid grid-cols-[3fr_2fr] items-center gap-x-3 px-3 py-2.5"
						>
							<GreekText tone="accent" size="lg">{time.greekText}</GreekText>
							<div>
								<span className="text-sm text-stone-500">{time.englishTranslation}</span>
								{time.timeRange && (
									<span className="ml-1.5 text-xs text-stone-400">({time.timeRange})</span>
								)}
							</div>
						</div>
					))}
				</div>
				<div className="mx-3 mt-3 rounded-lg border border-honey-200 bg-honey-100 p-2.5">
					<p className="mb-2 text-sm font-medium text-honey-text">Pattern: το + time of day</p>
					<div className="space-y-2 text-sm">
						<div>
							<GreekText tone="accent" size="lg">
								στις δύο <span className="font-semibold">το μεσημέρι</span>
							</GreekText>
							<div className="text-xs text-stone-500">at two in the afternoon</div>
						</div>
						<div>
							<GreekText tone="accent" size="lg">
								στις οκτώ <span className="font-semibold">το βράδυ</span>
							</GreekText>
							<div className="text-xs text-stone-500">at eight in the evening</div>
						</div>
						<p className="border-t border-honey-200/50 pt-1.5 text-xs text-stone-500">
							<GreekText tone="accent" size="lg" className="text-stone-700">
								το
							</GreekText>{" "}
							(neuter) — time periods are neuter nouns
						</p>
					</div>
				</div>
			</ContentSection>

			{/* Days of the Week */}
			{sortedDays.length > 0 && (
				<ContentSection
					title="Days of the Week"
					subtitle="Οι μέρες της εβδομάδας"
					colorScheme="ocean"
				>
					<div className="divide-y divide-stone-200/60">
						{sortedDays.map((day) => (
							<CalendarName
								key={day.id}
								greek={day.greekText}
								english={day.englishTranslation}
								gender={day.nounDetails?.gender}
							/>
						))}
					</div>
					<div className="mx-3 mt-3 rounded-lg border border-ocean-200 bg-ocean-100 p-2.5">
						<p className="mb-2 text-sm font-medium text-ocean-text">Days use feminine accusative</p>
						<div className="space-y-2 text-sm">
							<div>
								<GreekText tone="accent" size="lg">
									<span className="font-semibold">την</span> Τρίτη
								</GreekText>
								<div className="text-xs text-stone-500">on Tuesday (specific)</div>
							</div>
							<div>
								<GreekText tone="accent" size="lg">κάθε Τρίτη</GreekText>
								<div className="text-xs text-stone-500">every Tuesday (no article)</div>
							</div>
							<div>
								<GreekText tone="accent" size="lg">
									<span className="font-semibold">την</span> περασμένη Τρίτη
								</GreekText>
								<div className="text-xs text-stone-500">last Tuesday</div>
							</div>
							<p className="border-t border-ocean-200/50 pt-1.5 text-xs text-stone-500">
								<GreekText tone="accent" size="lg" className="text-stone-700">
									την
								</GreekText>{" "}
								= accusative of{" "}
								<GreekText tone="accent" size="lg" className="text-stone-700">
									η
								</GreekText>{" "}
								(fem.)
							</p>
						</div>
					</div>
				</ContentSection>
			)}

			{/* Months of the Year */}
			{sortedMonths.length > 0 && (
				<ContentSection
					title="Months of the Year"
					subtitle="Οι μήνες του χρόνου"
					colorScheme="olive"
				>
					<div className="divide-y divide-stone-200/60">
						{sortedMonths.map((month) => (
							<CalendarName
								key={month.id}
								greek={month.greekText}
								english={month.englishTranslation}
								gender={month.nounDetails?.gender}
							/>
						))}
					</div>
					<div className="mx-3 mt-3 rounded-lg border border-olive-200 bg-olive-100 p-2.5">
						<p className="mb-2 text-sm font-medium text-olive-text">
							Months use masculine accusative
						</p>
						<div className="space-y-2 text-sm">
							<div>
								<GreekText tone="accent" size="lg">
									<span className="font-semibold">τον</span> Ιούλιο
								</GreekText>
								<div className="text-xs text-stone-500">in July</div>
							</div>
							<div>
								<GreekText tone="accent" size="lg">
									<span className="font-semibold">τον</span> περασμένο Μάρτιο
								</GreekText>
								<div className="text-xs text-stone-500">last March</div>
							</div>
							<div>
								<GreekText tone="accent" size="lg">
									<span className="font-semibold">τον</span> επόμενο μήνα
								</GreekText>
								<div className="text-xs text-stone-500">next month</div>
							</div>
							<p className="border-t border-olive-200/50 pt-1.5 text-xs text-stone-500">
								<GreekText tone="accent" size="lg" className="text-stone-700">
									τον
								</GreekText>{" "}
								= accusative of{" "}
								<GreekText tone="accent" size="lg" className="text-stone-700">
									ο
								</GreekText>{" "}
								(masc.)
							</p>
						</div>
					</div>
				</ContentSection>
			)}
		</div>
	);
}
