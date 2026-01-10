import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { ContentSection, TwoColumnList } from "@/components/ContentSection";
import { MonoText } from "@/components/MonoText";
import { TabHero } from "@/components/TabHero";
import type { PhrasesLoaderData, PhraseItem } from "../components/shared";

type TimeListItem = {
	id: string | number;
	primary: string;
	secondary: string;
	note?: string;
};

const toTimeListItems = (items: PhraseItem[]): TimeListItem[] =>
	items.map((i) => ({
		id: i.id,
		primary: i.greek,
		secondary: i.english,
		note: (i.metadata as Record<string, unknown>)?.note as string | undefined,
	}));

const TimeSubsection = ({
	label,
	subtitle,
	items,
	variant = "default",
	className,
}: {
	label: string;
	subtitle?: string;
	items: TimeListItem[];
	variant?: "default" | "muted";
	className?: string;
}) => {
	if (items.length === 0) return null;

	const isUppercase = variant === "muted";

	return (
		<div className={className}>
			<div
				className={cn(
					"pl-3 mb-1",
					isUppercase
						? "text-xs uppercase tracking-wider text-stone-500 font-semibold"
						: "text-sm font-semibold text-ocean-text",
				)}
			>
				{label}
				{subtitle && (
					<span className="text-stone-400 font-normal"> {subtitle}</span>
				)}
			</div>
			<TwoColumnList
				items={items}
				renderPrimary={(item) => (
					<MonoText variant="greek" className="text-lg">
						{item.primary}
					</MonoText>
				)}
				renderSecondary={(item) => (
					<>
						{item.secondary}
						{item.note && (
							<span className="text-stone-400 text-xs ml-2">({item.note})</span>
						)}
					</>
				)}
			/>
		</div>
	);
};

const TimeTellingSection = ({ items }: { items: PhraseItem[] }) => {
	if (items.length === 0) return null;

	const basic = items.filter(
		(i) => (i.metadata as Record<string, unknown>)?.category === "basic",
	);
	const fractions = items.filter(
		(i) => (i.metadata as Record<string, unknown>)?.category === "fractions",
	);
	const atTimes = items.filter(
		(i) => (i.metadata as Record<string, unknown>)?.category === "at-times",
	);

	const pastHour = fractions.filter((i) => i.greek.includes("και"));
	const toHour = fractions.filter((i) => i.greek.includes("παρά"));

	return (
		<ContentSection
			title="Telling Time"
			subtitle="Τι ώρα είναι;"
			colorScheme="ocean"
		>
			<div className="px-4 py-3 bg-ocean-50 border-b border-ocean-200">
				<div className="text-sm font-semibold text-ocean-text mb-1.5">
					How to Tell Time
				</div>
				<div className="space-y-1 text-sm text-stone-600">
					<div>
						<strong className="text-ocean-text">Basic:</strong>{" "}
						<MonoText variant="greek" size="sm">Είναι</MonoText> + time /{" "}
						<MonoText variant="greek" size="sm">Η ώρα είναι</MonoText> + time
					</div>
					<div className="flex flex-wrap gap-x-6">
						<span>
							<MonoText variant="greek" size="sm" className="text-ocean-text font-semibold">και</MonoText>{" "}
							= past (add minutes)
						</span>
						<span>
							<MonoText variant="greek" size="sm" className="text-ocean-text font-semibold">παρά</MonoText>{" "}
							= to (subtract from next hour)
						</span>
					</div>
				</div>
			</div>

			<TimeSubsection
				label="Basic Structure"
				items={toTimeListItems(basic)}
				variant="muted"
				className="py-4 border-b-2 border-ocean-400"
			/>

			{(pastHour.length > 0 || toHour.length > 0) && (
				<div className="grid md:grid-cols-2">
					<TimeSubsection
						label="Past the Hour"
						subtitle="(και)"
						items={toTimeListItems(pastHour)}
						className="py-4 border-b-2 md:border-b-0 md:border-r-2 border-ocean-400"
					/>
					<TimeSubsection
						label="To the Hour"
						subtitle="(παρά)"
						items={toTimeListItems(toHour)}
						className="py-4"
					/>
				</div>
			)}

			<TimeSubsection
				label={`"At" Times (στις)`}
				items={toTimeListItems(atTimes)}
				variant="muted"
				className="py-4 border-t-2 border-ocean-400 bg-ocean-50"
			/>
		</ContentSection>
	);
};

export const TimeTab = ({ data }: { data: PhrasesLoaderData }) => {
	const { timeTelling } = data.time;

	return (
		<div className="space-y-6">
			<TabHero
				title="Telling time"
				greekPhrase="Τι ώρα είναι;"
				colorScheme="ocean"
				icon={<Clock size={18} />}
			>
				How to ask and tell time in Greek — essential patterns for scheduling
				and understanding when things happen.
			</TabHero>

			<TimeTellingSection items={timeTelling} />
		</div>
	);
};
