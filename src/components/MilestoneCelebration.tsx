import { useEffect, useState } from "react";
import { tv } from "tailwind-variants";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const MILESTONES = [7, 30, 100] as const;
type Milestone = (typeof MILESTONES)[number];

const MILESTONE_DATA: Record<
	Milestone,
	{ badge: string; title: string; message: string }
> = {
	7: {
		badge: "1 Week",
		title: "First week complete!",
		message: "You're building a habit. Consistency is the key to fluency.",
	},
	30: {
		badge: "1 Month",
		title: "One month strong!",
		message:
			"Greek is becoming part of your routine. Your dedication is paying off.",
	},
	100: {
		badge: "100 Days",
		title: "100 days of learning!",
		message:
			"You're truly dedicated. Most learners never make it this far. Keep going!",
	},
};

const STORAGE_KEY = "greek-milestones-seen";

const getSeenMilestones = (): Set<number> => {
	if (typeof window === "undefined") return new Set();
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (!stored) return new Set();
		return new Set(JSON.parse(stored) as number[]);
	} catch {
		return new Set();
	}
};

const markMilestoneSeen = (milestone: number): void => {
	if (typeof window === "undefined") return;
	try {
		const seen = getSeenMilestones();
		seen.add(milestone);
		localStorage.setItem(STORAGE_KEY, JSON.stringify([...seen]));
	} catch {
		// localStorage unavailable, silently fail
	}
};

const getMilestoneToShow = (streak: number): Milestone | null => {
	if (!MILESTONES.includes(streak as Milestone)) return null;
	const seen = getSeenMilestones();
	if (seen.has(streak)) return null;
	return streak as Milestone;
};

const confettiVariants = tv({
	base: "absolute text-2xl animate-confetti pointer-events-none",
	variants: {
		position: {
			"0": "left-[10%] top-0 animation-delay-0",
			"1": "left-[25%] top-0 animation-delay-100",
			"2": "left-[40%] top-0 animation-delay-200",
			"3": "left-[55%] top-0 animation-delay-300",
			"4": "left-[70%] top-0 animation-delay-400",
			"5": "left-[85%] top-0 animation-delay-500",
		},
	},
});

const CONFETTI_ITEMS = [
	{ id: "c1", char: "*" },
	{ id: "c2", char: "+" },
	{ id: "c3", char: "*" },
	{ id: "c4", char: "+" },
	{ id: "c5", char: "*" },
	{ id: "c6", char: "+" },
];

export interface MilestoneCelebrationProps {
	streak: number;
}

export const MilestoneCelebration = ({ streak }: MilestoneCelebrationProps) => {
	const [showMilestone, setShowMilestone] = useState<Milestone | null>(null);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const milestone = getMilestoneToShow(streak);
		if (milestone) {
			setShowMilestone(milestone);
			setIsOpen(true);
		}
	}, [streak]);

	const handleDismiss = () => {
		if (showMilestone) {
			markMilestoneSeen(showMilestone);
		}
		setIsOpen(false);
	};

	if (!showMilestone) return null;

	const data = MILESTONE_DATA[showMilestone];

	return (
		<Dialog open={isOpen} onOpenChange={handleDismiss}>
			<DialogContent
				className="sm:max-w-md overflow-hidden bg-gradient-to-b from-honey-50 to-white border-honey-300"
				showCloseButton={false}
			>
				<div className="absolute inset-0 overflow-hidden pointer-events-none">
					{CONFETTI_ITEMS.map((item, i) => (
						<span
							key={item.id}
							className={confettiVariants({
								position: String(i) as "0" | "1" | "2" | "3" | "4" | "5",
							})}
							style={{
								animationDelay: `${i * 0.1}s`,
								color:
									i % 3 === 0
										? "var(--color-terracotta)"
										: i % 3 === 1
											? "var(--color-olive)"
											: "var(--color-ocean)",
							}}
						>
							{item.char}
						</span>
					))}
				</div>

				<DialogHeader className="text-center pt-4">
					<div className="mx-auto mb-4 w-20 h-20 rounded-full bg-gradient-to-br from-honey-400 to-terracotta-400 flex items-center justify-center shadow-lg">
						<span className="text-3xl font-bold text-white">
							{showMilestone}
						</span>
					</div>

					<div className="inline-block mx-auto px-3 py-1 rounded-full bg-honey-200 text-honey-text text-sm font-medium mb-2">
						{data.badge} Streak
					</div>

					<DialogTitle className="text-2xl font-serif text-navy-text">
						{data.title}
					</DialogTitle>

					<DialogDescription className="text-base text-stone-600 mt-2">
						{data.message}
					</DialogDescription>
				</DialogHeader>

				<div className="mt-4 text-center">
					<p className="text-4xl font-serif text-navy greek-text mb-1">
						{showMilestone === 7 && "Συγχαρητήρια!"}
						{showMilestone === 30 && "Εξαιρετικά!"}
						{showMilestone === 100 && "Απίστευτο!"}
					</p>
					<p className="text-sm text-stone-500 italic">
						{showMilestone === 7 && "Congratulations!"}
						{showMilestone === 30 && "Excellent!"}
						{showMilestone === 100 && "Incredible!"}
					</p>
				</div>

				<div className="mt-6 pb-2">
					<Button
						variant="primary"
						size="lg"
						className="w-full"
						onClick={handleDismiss}
					>
						Keep Going
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};
