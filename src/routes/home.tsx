import { useState } from "react";
import { Link } from "react-router";
import {
	ArrowRight,
	Calendar,
	Check,
	ChevronDown,
	ChevronUp,
	Play,
	Sparkles,
} from "lucide-react";
import { differenceInDays, getDay, getDate } from "date-fns";
import {
	getItemsDueTomorrow,
	getLastPracticeDate,
	getPracticeStats,
	getUserById,
} from "@/db.server/queries/practice";
import {
	getFreezeStatus,
	calculateDaysUntilNextFreeze,
	type FreezeStatus,
} from "@/db.server/queries/streak";
import { FreezeIndicator } from "@/components/FreezeIndicator";
import { MilestoneCelebration } from "@/components/MilestoneCelebration";

type Stats = {
	streak: number;
	itemsMastered: number;
	dueCount: number;
	totalLearned: number;
	newAvailable: number;
};

type LoaderData = {
	userId: number;
	stats: Stats;
	weekData: { practiced: boolean }[];
	todayPracticed: boolean;
	freezeStatus: FreezeStatus;
	daysUntilNextFreeze: number | null;
	itemsDueTomorrow: number;
	daysSinceLastPractice: number | null;
};

export function meta() {
	return [
		{ title: "Kalimera - Greek Learning" },
		{
			name: "description",
			content: "Practice Greek and build retrieval speed",
		},
	];
}

export async function loader(): Promise<LoaderData> {
	// TODO: Get actual user ID from session
	const userId = 1;
	const [rawStats, user, itemsDueTomorrow, lastPracticeDate] =
		await Promise.all([
			getPracticeStats(userId),
			getUserById(userId),
			getItemsDueTomorrow(userId),
			getLastPracticeDate(userId),
		]);

	const daysSinceLastPractice = lastPracticeDate
		? differenceInDays(new Date(), lastPracticeDate)
		: null;

	// Cast to fix Drizzle count() type inference issue
	const stats: Stats = {
		streak: rawStats.streak,
		itemsMastered: Number(rawStats.itemsMastered),
		dueCount: Number(rawStats.dueCount),
		totalLearned: Number(rawStats.totalLearned),
		newAvailable: Number(rawStats.newAvailable),
	};

	// Get week practice data
	const today = new Date();
	const dayOfWeek = getDay(today);
	const mondayOffset = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

	// TODO: Query actual practice history for the week
	// For now, mock based on streak
	const weekData = Array.from({ length: 7 }, (_, i) => ({
		practiced: i < mondayOffset && i < stats.streak,
	}));

	const todayPracticed = stats.streak > 0 && mondayOffset <= stats.streak;

	// Get freeze status
	const freezeStatus = user
		? getFreezeStatus(user)
		: { status: "none" as const, freezeCount: 0 };
	const daysUntilNextFreeze = user
		? calculateDaysUntilNextFreeze(stats.streak, user)
		: 7;

	return {
		userId,
		stats,
		weekData,
		todayPracticed,
		freezeStatus,
		daysUntilNextFreeze,
		itemsDueTomorrow,
		daysSinceLastPractice,
	};
}

// Practice CTA - Primary action when items are due
const QUICK_REVIEW_THRESHOLD = 15;
const QUICK_REVIEW_COUNT = 5;

const PracticeCTA = ({
	dueCount,
	itemsDueTomorrow,
}: {
	dueCount: number;
	itemsDueTomorrow: number;
}) => {
	const estimatedMinutes = Math.max(1, Math.ceil(dueCount * 0.25));
	const showQuickOption = dueCount > QUICK_REVIEW_THRESHOLD;

	return (
		<div className="space-y-3">
			<Link
				to="/practice"
				className="block rounded-2xl p-6 bg-gradient-to-br from-honey-100 to-honey-200 border-2 border-honey-400 shadow-md hover:shadow-lg transition-all hover:scale-[1.01]"
			>
				<div className="flex items-center justify-between">
					<div>
						<p className="text-3xl font-bold text-honey-text">
							{dueCount} items due
						</p>
						<p className="text-stone-600 mt-1">~{estimatedMinutes} min</p>
					</div>
					<div className="flex items-center justify-center w-14 h-14 rounded-full bg-honey-400 text-white shadow-sm">
						<Play className="w-6 h-6 ml-0.5" />
					</div>
				</div>
				<div className="mt-4 py-3 rounded-xl bg-white/60 text-center font-semibold text-honey-text">
					Start Practice
				</div>
				{itemsDueTomorrow > 0 && (
					<div className="flex items-center justify-center gap-2 mt-3 text-sm text-stone-500">
						<Calendar className="w-4 h-4" />
						<span>
							Tomorrow: {itemsDueTomorrow}{" "}
							{itemsDueTomorrow === 1 ? "item" : "items"}
						</span>
					</div>
				)}
			</Link>

			{showQuickOption && (
				<Link
					to={`/practice/review?limit=${QUICK_REVIEW_COUNT}`}
					className="block rounded-xl p-4 bg-stone-50 border border-stone-200 hover:bg-stone-100 transition-colors text-center"
				>
					<span className="text-stone-600">Short on time? </span>
					<span className="font-medium text-stone-800">
						Just {QUICK_REVIEW_COUNT} items
					</span>
					<span className="text-stone-500"> (~1 min)</span>
				</Link>
			)}
		</div>
	);
};

// Lapsed user state - returning after 7+ days with large queue
const LAPSED_DAYS_THRESHOLD = 7;
const LAPSED_QUEUE_THRESHOLD = 15;

type LapsedUserCTAProps = {
	dueCount: number;
	daysSinceLastPractice: number;
	streak: number;
	wasProtectedByFreeze: boolean;
};

const LapsedUserCTA = ({
	dueCount,
	daysSinceLastPractice,
	streak,
	wasProtectedByFreeze,
}: LapsedUserCTAProps) => {
	const getMessage = () => {
		if (wasProtectedByFreeze && streak > 0) {
			return {
				greeting: "Welcome back!",
				message: `Your freeze protected your ${streak}-day streak.`,
				emphasis: "Pick up where you left off.",
			};
		}
		if (streak === 0 && daysSinceLastPractice > 14) {
			return {
				greeting: "Ready for a fresh start?",
				message: "Your vocabulary is still here, waiting for you.",
				emphasis: "Let's ease back in.",
			};
		}
		return {
			greeting: "Welcome back!",
			message: `It's been ${daysSinceLastPractice} days.`,
			emphasis: "Your words are ready when you are.",
		};
	};

	const { greeting, message, emphasis } = getMessage();

	return (
		<div className="rounded-2xl bg-gradient-to-br from-ocean-50 to-ocean-100 border border-ocean-200 p-6">
			<p className="text-2xl font-serif text-ocean-text">{greeting}</p>
			<p className="text-stone-600 mt-1">{message}</p>
			<p className="text-stone-700 font-medium mt-1">{emphasis}</p>

			<Link
				to={`/practice/review?limit=${QUICK_REVIEW_COUNT}`}
				className="block mt-5 py-3 rounded-xl bg-ocean text-white text-center font-semibold hover:bg-ocean-dark transition-colors"
			>
				Start with just {QUICK_REVIEW_COUNT} items
			</Link>

			<p className="text-center text-sm text-stone-500 mt-3">
				{dueCount} items total (~{Math.ceil(dueCount * 0.25)} min)
			</p>
		</div>
	);
};

// All caught up state
const AllCaughtUpCTA = ({
	newAvailable,
	itemsDueTomorrow,
}: {
	newAvailable: number;
	itemsDueTomorrow: number;
}) => (
	<div className="text-center py-8 rounded-2xl bg-olive-50 border border-olive-200">
		<div className="mx-auto w-16 h-16 rounded-full bg-olive-100 flex items-center justify-center mb-4">
			<Check className="w-8 h-8 text-olive" />
		</div>
		<p className="text-2xl font-serif text-olive greek-text">Μπράβο!</p>
		<p className="text-lg text-stone-700 mt-1">All caught up</p>
		<p className="text-sm text-stone-500 mt-2">
			You've reviewed all due items. Check back later or learn something new.
		</p>
		{itemsDueTomorrow > 0 && (
			<div className="flex items-center justify-center gap-2 mt-4 text-sm text-stone-600">
				<Calendar className="w-4 h-4 text-ocean" />
				<span>
					{itemsDueTomorrow} {itemsDueTomorrow === 1 ? "item" : "items"} due
					tomorrow
				</span>
			</div>
		)}
		{newAvailable > 0 && (
			<Link
				to="/practice/vocabulary"
				className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-xl bg-ocean-100 border border-ocean-300 text-ocean font-medium hover:bg-ocean-200 transition-colors"
			>
				<Sparkles className="w-4 h-4" />
				Learn {Math.min(5, newAvailable)} new items
			</Link>
		)}
	</div>
);

// First time user state
const FirstTimeUserCTA = () => (
	<div className="text-center py-8 rounded-2xl bg-cream border border-stone-200">
		<p className="text-3xl font-serif text-navy greek-text mb-2">
			Καλώς ήρθες!
		</p>
		<p className="text-lg text-stone-600 mb-6">
			Let's learn your first Greek words.
		</p>
		<Link
			to="/practice/vocabulary"
			className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-terracotta text-white font-semibold shadow-md hover:bg-terracotta-dark transition-colors"
		>
			Begin Learning
			<ArrowRight className="w-5 h-5" />
		</Link>
		<p className="text-sm text-stone-500 mt-4">~2 min to get started</p>
	</div>
);

// Interactive daily phrase
const DAILY_PHRASES = [
	{
		greek: "Καλημέρα",
		english: "Good morning",
		literal: "Beautiful day",
		grammar:
			"Καλή (beautiful) + ημέρα (day). Greek combines adjective + noun into one word for common greetings.",
	},
	{
		greek: "Τι κάνεις;",
		english: "How are you?",
		literal: "What do you do?",
		grammar:
			"Τι (what) + κάνεις (you do, 2nd person singular). The -εις ending marks informal 'you'.",
	},
	{
		greek: "Ευχαριστώ πολύ",
		english: "Thank you very much",
		literal: "I thank much",
		grammar:
			"Ευχαριστώ (I thank, 1st person) + πολύ (much/very). The -ώ ending marks 1st person singular.",
	},
	{
		greek: "Με λένε...",
		english: "My name is...",
		literal: "They call me...",
		grammar:
			"Με (me, accusative) + λένε (they call, 3rd person plural). Greek uses 'they call me' instead of 'my name is'.",
	},
	{
		greek: "Χαίρω πολύ",
		english: "Nice to meet you",
		literal: "I rejoice much",
		grammar:
			"Χαίρω (I rejoice, 1st person) + πολύ (much). A formal greeting expressing pleasure at meeting someone.",
	},
];

const DailyPhrase = () => {
	const [revealed, setRevealed] = useState(false);
	const [showGrammar, setShowGrammar] = useState(false);

	const dayIndex = getDate(new Date()) % DAILY_PHRASES.length;
	const phrase = DAILY_PHRASES[dayIndex] ?? DAILY_PHRASES[0];

	return (
		<div className="rounded-2xl border border-stone-200 bg-white p-5">
			<p className="text-xs uppercase tracking-widest text-stone-400 mb-4">
				Today's Phrase
			</p>

			<p className="text-lg text-stone-700 mb-4">"{phrase?.english}"</p>

			<button
				type="button"
				onClick={() => setRevealed(true)}
				disabled={revealed}
				className={`w-full rounded-xl p-4 transition-all ${
					!revealed
						? "border-2 border-dashed border-terracotta-300 bg-terracotta-50 hover:bg-terracotta-100 cursor-pointer"
						: "bg-stone-50 border border-stone-200"
				}`}
			>
				{!revealed ? (
					<p className="text-terracotta font-medium">Tap to reveal Greek</p>
				) : (
					<div>
						<p className="text-2xl font-serif text-navy greek-text">
							{phrase?.greek}
						</p>
						<p className="text-sm text-stone-500 italic mt-1">
							lit. "{phrase?.literal}"
						</p>
					</div>
				)}
			</button>

			{revealed && (
				<button
					type="button"
					onClick={() => setShowGrammar(!showGrammar)}
					className="mt-3 flex items-center gap-1 text-sm text-ocean hover:text-ocean-dark transition-colors"
				>
					Why this works
					{showGrammar ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
				</button>
			)}

			{showGrammar && (
				<div className="mt-3 p-3 bg-ocean-50 rounded-lg border border-ocean-200">
					<p className="text-sm text-ocean-text">{phrase?.grammar}</p>
				</div>
			)}
		</div>
	);
};

// Week streak visualization
const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

const WeekStreak = ({
	weekData,
	todayPracticed,
}: {
	weekData: { practiced: boolean }[];
	todayPracticed: boolean;
}) => {
	const todayDayOfWeek = getDay(new Date());
	const mondayOffset = todayDayOfWeek === 0 ? 6 : todayDayOfWeek - 1;

	return (
		<div className="rounded-2xl border border-stone-200 bg-white p-5">
			<p className="text-sm font-medium text-stone-600 mb-3">This Week</p>
			<div className="flex gap-2 justify-between">
				{DAYS.map((day, i) => {
					const isToday = i === mondayOffset;
					const isPast = i < mondayOffset;
					const didPractice = weekData[i]?.practiced ?? false;

					let className =
						"w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-all ";

					if (isPast && didPractice) {
						className += "bg-olive-400 text-white";
					} else if (isPast && !didPractice) {
						className += "bg-stone-200 text-stone-400";
					} else if (isToday && todayPracticed) {
						className += "bg-terracotta text-white";
					} else if (isToday && !todayPracticed) {
						className +=
							"border-2 border-terracotta text-terracotta animate-pulse";
					} else {
						className += "border border-stone-200 text-stone-300";
					}

					const dayKey = `day-${i}`;
					return (
						<div key={dayKey} className="flex flex-col items-center gap-1.5">
							<span className="text-xs text-stone-400">{day}</span>
							<div className={className}>
								{(isPast || (isToday && todayPracticed)) && didPractice ? (
									<Check className="w-4 h-4" />
								) : isToday && !todayPracticed ? (
									<span className="w-2 h-2 rounded-full bg-current" />
								) : null}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

// Stats summary
const StatsSummary = ({
	itemsMastered,
	totalLearned,
}: {
	itemsMastered: number;
	totalLearned: number;
}) => (
	<div className="flex gap-3">
		<div className="flex-1 rounded-xl bg-olive-50 border border-olive-200 p-4 text-center">
			<p className="text-2xl font-bold text-olive">{itemsMastered}</p>
			<p className="text-xs text-stone-500">Mastered</p>
		</div>
		<div className="flex-1 rounded-xl bg-ocean-50 border border-ocean-200 p-4 text-center">
			<p className="text-2xl font-bold text-ocean">{totalLearned}</p>
			<p className="text-xs text-stone-500">Learning</p>
		</div>
	</div>
);

export default function DashboardRoute({
	loaderData,
}: {
	loaderData: LoaderData;
}) {
	const {
		userId,
		stats,
		weekData,
		todayPracticed,
		freezeStatus,
		daysUntilNextFreeze,
		itemsDueTomorrow,
		daysSinceLastPractice,
	} = loaderData;

	const isLapsedUser =
		daysSinceLastPractice !== null &&
		daysSinceLastPractice >= LAPSED_DAYS_THRESHOLD &&
		stats.dueCount >= LAPSED_QUEUE_THRESHOLD;

	const wasProtectedByFreeze = freezeStatus.status === "just_used";

	const renderCTA = () => {
		if (stats.totalLearned === 0) {
			return <FirstTimeUserCTA />;
		}
		if (stats.dueCount === 0) {
			return (
				<AllCaughtUpCTA
					newAvailable={stats.newAvailable}
					itemsDueTomorrow={itemsDueTomorrow}
				/>
			);
		}
		if (isLapsedUser) {
			return (
				<LapsedUserCTA
					dueCount={stats.dueCount}
					daysSinceLastPractice={daysSinceLastPractice}
					streak={stats.streak}
					wasProtectedByFreeze={wasProtectedByFreeze}
				/>
			);
		}
		return (
			<PracticeCTA
				dueCount={stats.dueCount}
				itemsDueTomorrow={itemsDueTomorrow}
			/>
		);
	};

	return (
		<div className="pb-8 space-y-6">
			<MilestoneCelebration streak={stats.streak} userId={userId} />

			{/* Primary CTA Section */}
			<section>{renderCTA()}</section>

			{/* Daily Phrase */}
			<section>
				<DailyPhrase />
			</section>

			{/* Week View + Freeze Status */}
			<section className="space-y-3">
				<WeekStreak weekData={weekData} todayPracticed={todayPracticed} />
				<FreezeIndicator
					freezeCount={freezeStatus.freezeCount}
					status={freezeStatus.status}
					hoursUntilRecovery={freezeStatus.hoursUntilRecovery}
					daysUntilNextEarn={daysUntilNextFreeze ?? undefined}
					protectedDate={freezeStatus.protectedDate}
				/>
				{stats.streak === 1 && freezeStatus.freezeCount === 0 && (
					<p className="text-xs text-stone-500 text-center">
						Day 1! Practice for 7 days to earn a streak freeze.
					</p>
				)}
			</section>

			{/* Stats Summary */}
			{stats.totalLearned > 0 && (
				<section>
					<StatsSummary
						itemsMastered={stats.itemsMastered}
						totalLearned={stats.totalLearned}
					/>
				</section>
			)}
		</div>
	);
}
