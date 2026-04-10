import { differenceInDays, getDate, getDay } from "date-fns";
import { ArrowRight, Calendar, Check, ChevronDown, ChevronUp, Play, Sparkles } from "lucide-react";
import { useState } from "react";
import { Link, useFetcher } from "react-router";
import { FreezeIndicator } from "@/components/FreezeIndicator";
import {
	getItemsDueTomorrow,
	getLastPracticeDate,
	getPracticeStats,
	getUserById,
} from "@/db.server/queries/practice";
import {
	getPushSubscriptionByUserId,
	setNotificationMode,
} from "@/db.server/queries/push-notifications";
import {
	calculateDaysUntilNextFreeze,
	type FreezeStatus,
	getFreezeStatus,
} from "@/db.server/queries/streak";
import { getAuthSession } from "@/lib/auth-cookie";
import type { Route } from "./+types/home";

type Stats = {
	streak: number;
	itemsMastered: number;
	dueCount: number;
	totalLearned: number;
	newAvailable: number;
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

const DEFAULT_STATS: Stats = {
	streak: 0,
	itemsMastered: 0,
	dueCount: 0,
	totalLearned: 0,
	newAvailable: 0,
};

const DEFAULT_FREEZE_STATUS: FreezeStatus = {
	status: "none",
	freezeCount: 0,
};

export async function loader({ request }: Route.LoaderArgs) {
	const auth = getAuthSession(request);
	const userId = auth?.userId ?? null;

	if (!userId) {
		return {
			userId: null,
			stats: DEFAULT_STATS,
			weekData: Array.from({ length: 7 }, () => ({ practiced: false })),
			todayPracticed: false,
			freezeStatus: DEFAULT_FREEZE_STATUS,
			daysUntilNextFreeze: null,
			itemsDueTomorrow: 0,
			daysSinceLastPractice: null,
			taperOfferPending: false,
		};
	}

	const [rawStats, user, itemsDueTomorrow, lastPracticeDate] = await Promise.all([
		getPracticeStats(userId),
		getUserById(userId),
		getItemsDueTomorrow(userId),
		getLastPracticeDate(userId),
	]);

	const daysSinceLastPractice = lastPracticeDate
		? differenceInDays(new Date(), lastPracticeDate)
		: null;

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
	const freezeStatus = user ? getFreezeStatus(user) : { status: "none" as const, freezeCount: 0 };
	const daysUntilNextFreeze = user ? calculateDaysUntilNextFreeze(stats.streak, user) : 7;

	const pushSub = await getPushSubscriptionByUserId(userId);

	return {
		userId,
		stats,
		weekData,
		todayPracticed,
		freezeStatus,
		daysUntilNextFreeze,
		itemsDueTomorrow,
		daysSinceLastPractice,
		taperOfferPending: pushSub?.taperOfferPending ?? false,
	};
}

export async function action({ request }: Route.ActionArgs) {
	const auth = getAuthSession(request);
	const userId = auth?.userId ?? null;
	if (!userId) return { error: "Unauthorised" };

	const formData = await request.formData();
	const intent = formData.get("intent") as string;

	if (intent === "setNotificationMode") {
		const mode = formData.get("mode") as string;
		if (mode === "adaptive" || mode === "always") {
			await setNotificationMode(userId, mode);
		}
		return { ok: true };
	}

	return { error: "Unknown intent" };
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
				className="block rounded-2xl border-2 border-honey-400 bg-linear-to-br from-honey-100 to-honey-200 p-6 shadow-md transition-all hover:scale-[1.01] hover:shadow-lg"
			>
				<div className="flex items-center justify-between">
					<div>
						<p className="text-3xl font-bold text-honey-text">{dueCount} items due</p>
						<p className="mt-1 text-stone-600">~{estimatedMinutes} min</p>
					</div>
					<div className="flex h-14 w-14 items-center justify-center rounded-full bg-honey-400 text-white shadow-sm">
						<Play className="ml-0.5 h-6 w-6" />
					</div>
				</div>
				<div className="mt-4 rounded-xl bg-white/60 py-3 text-center font-semibold text-honey-text">
					Start Practice
				</div>
				{itemsDueTomorrow > 0 && (
					<div className="mt-3 flex items-center justify-center gap-2 text-sm text-stone-500">
						<Calendar className="h-4 w-4" />
						<span>
							Tomorrow: {itemsDueTomorrow} {itemsDueTomorrow === 1 ? "item" : "items"}
						</span>
					</div>
				)}
			</Link>

			{showQuickOption && (
				<Link
					to={`/practice/review?limit=${QUICK_REVIEW_COUNT}`}
					className="block rounded-xl border border-stone-200 bg-stone-50 p-4 text-center transition-colors hover:bg-stone-100"
				>
					<span className="text-stone-600">Short on time? </span>
					<span className="font-medium text-stone-800">Just {QUICK_REVIEW_COUNT} items</span>
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
		<div className="bg-linear-to-brrom-ocean-50 rounded-2xl border border-ocean-200 to-ocean-100 p-6">
			<p className="font-serif text-2xl text-ocean-text">{greeting}</p>
			<p className="mt-1 text-stone-600">{message}</p>
			<p className="mt-1 font-medium text-stone-700">{emphasis}</p>

			<Link
				to={`/practice/review?limit=${QUICK_REVIEW_COUNT}`}
				className="mt-5 block rounded-xl bg-ocean py-3 text-center font-semibold text-white transition-colors hover:bg-ocean-dark"
			>
				Start with just {QUICK_REVIEW_COUNT} items
			</Link>

			<p className="mt-3 text-center text-sm text-stone-500">
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
	<div className="rounded-2xl border border-olive-200 bg-olive-50 py-8 text-center">
		<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-olive-100">
			<Check className="h-8 w-8 text-olive" />
		</div>
		<p className="greek-text font-serif text-2xl text-olive">Μπράβο!</p>
		<p className="mt-1 text-lg text-stone-700">All caught up</p>
		<p className="mt-2 text-sm text-stone-500">
			You've reviewed all due items. Check back later or learn something new.
		</p>
		{itemsDueTomorrow > 0 && (
			<div className="mt-4 flex items-center justify-center gap-2 text-sm text-stone-600">
				<Calendar className="h-4 w-4 text-ocean" />
				<span>
					{itemsDueTomorrow} {itemsDueTomorrow === 1 ? "item" : "items"} due tomorrow
				</span>
			</div>
		)}
		{newAvailable > 0 && (
			<Link
				to="/practice/vocabulary"
				className="mt-6 inline-flex items-center gap-2 rounded-xl border border-ocean-300 bg-ocean-100 px-6 py-3 font-medium text-ocean transition-colors hover:bg-ocean-200"
			>
				<Sparkles className="h-4 w-4" />
				Learn {Math.min(5, newAvailable)} new items
			</Link>
		)}
	</div>
);

// First time user state
const FirstTimeUserCTA = () => (
	<div className="rounded-2xl border border-stone-200 bg-cream py-8 text-center">
		<p className="greek-text mb-2 font-serif text-3xl text-navy">Καλώς ήρθες!</p>
		<p className="mb-6 text-lg text-stone-600">Let's learn your first Greek words.</p>
		<Link
			to="/practice/vocabulary"
			className="inline-flex items-center gap-2 rounded-xl bg-terracotta px-8 py-4 font-semibold text-white shadow-md transition-colors hover:bg-terracotta-dark"
		>
			Begin Learning
			<ArrowRight className="h-5 w-5" />
		</Link>
		<p className="mt-4 text-sm text-stone-500">~2 min to get started</p>
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
			<p className="mb-4 text-xs tracking-widest text-stone-400 uppercase">Today's Phrase</p>

			<p className="mb-4 text-lg text-stone-700">"{phrase?.english}"</p>

			<button
				type="button"
				onClick={() => setRevealed(true)}
				disabled={revealed}
				className={`w-full rounded-xl p-4 transition-all ${
					!revealed
						? "cursor-pointer border-2 border-dashed border-terracotta-300 bg-terracotta-50 hover:bg-terracotta-100"
						: "border border-stone-200 bg-stone-50"
				}`}
			>
				{!revealed ? (
					<p className="font-medium text-terracotta">Tap to reveal Greek</p>
				) : (
					<div>
						<p className="greek-text font-serif text-2xl text-navy">{phrase?.greek}</p>
						<p className="mt-1 text-sm text-stone-500 italic">lit. "{phrase?.literal}"</p>
					</div>
				)}
			</button>

			{revealed && (
				<button
					type="button"
					onClick={() => setShowGrammar(!showGrammar)}
					className="mt-3 flex items-center gap-1 text-sm text-ocean transition-colors hover:text-ocean-dark"
				>
					Why this works
					{showGrammar ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
				</button>
			)}

			{showGrammar && (
				<div className="mt-3 rounded-lg border border-ocean-200 bg-ocean-50 p-3">
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
			<p className="mb-3 text-sm font-medium text-stone-600">This Week</p>
			<div className="flex justify-between gap-2">
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
						className += "border-2 border-terracotta text-terracotta animate-pulse";
					} else {
						className += "border border-stone-200 text-stone-300";
					}

					const dayKey = `day-${i}`;
					return (
						<div key={dayKey} className="flex flex-col items-center gap-1.5">
							<span className="text-xs text-stone-400">{day}</span>
							<div className={className}>
								{(isPast || (isToday && todayPracticed)) && didPractice ? (
									<Check className="h-4 w-4" />
								) : isToday && !todayPracticed ? (
									<span className="h-2 w-2 rounded-full bg-current" />
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
		<div className="flex-1 rounded-xl border border-olive-200 bg-olive-50 p-4 text-center">
			<p className="text-2xl font-bold text-olive">{itemsMastered}</p>
			<p className="text-xs text-stone-500">Mastered</p>
		</div>
		<div className="flex-1 rounded-xl border border-ocean-200 bg-ocean-50 p-4 text-center">
			<p className="text-2xl font-bold text-ocean">{totalLearned}</p>
			<p className="text-xs text-stone-500">Learning</p>
		</div>
	</div>
);

export default function DashboardRoute({ loaderData }: Route.ComponentProps) {
	const {
		userId,
		stats,
		weekData,
		todayPracticed,
		freezeStatus,
		daysUntilNextFreeze,
		itemsDueTomorrow,
		daysSinceLastPractice,
		taperOfferPending,
	} = loaderData;

	const taperFetcher = useFetcher();

	const handleTaperResponse = (mode: "reduce" | "always") => {
		taperFetcher.submit(
			{
				intent: "setNotificationMode",
				mode: mode === "reduce" ? "adaptive" : "always",
			},
			{ method: "POST" },
		);
	};

	if (!userId) {
		return (
			<div className="flex min-h-[50vh] items-center justify-center">
				<span className="font-serif text-2xl text-terracotta">καλημέρα</span>
			</div>
		);
	}

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
				<AllCaughtUpCTA newAvailable={stats.newAvailable} itemsDueTomorrow={itemsDueTomorrow} />
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
		return <PracticeCTA dueCount={stats.dueCount} itemsDueTomorrow={itemsDueTomorrow} />;
	};

	return (
		<div className="space-y-6 pb-8">
			{/* Primary CTA Section */}
			<section>{renderCTA()}</section>

			{/* Taper offer — shown when user consistently practises before notification fires */}
			{taperOfferPending && taperFetcher.state === "idle" && !taperFetcher.data && (
				<section>
					<div className="rounded-md border border-stone-200 bg-amber-50 px-4 py-3 text-sm text-stone-600">
						<p>You've been practising before your reminder arrives. Want fewer nudges?</p>
						<div className="mt-2 flex gap-3">
							<button
								type="button"
								onClick={() => handleTaperResponse("reduce")}
								className="text-ocean-700 underline underline-offset-2"
							>
								Yes, reduce reminders
							</button>
							<span className="text-stone-400">·</span>
							<button
								type="button"
								onClick={() => handleTaperResponse("always")}
								className="text-stone-500 underline underline-offset-2"
							>
								I rely on these, keep them coming
							</button>
						</div>
					</div>
				</section>
			)}

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
					<p className="text-center text-xs text-stone-500">
						Day 1! Practice for 7 days to earn a streak freeze.
					</p>
				)}
			</section>

			{/* Stats Summary */}
			{stats.totalLearned > 0 && (
				<section>
					<StatsSummary itemsMastered={stats.itemsMastered} totalLearned={stats.totalLearned} />
				</section>
			)}
		</div>
	);
}
