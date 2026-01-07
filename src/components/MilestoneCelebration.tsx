import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
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
	{ badge: string; title: string; message: string; greek: string; english: string }
> = {
	7: {
		badge: "1 Week",
		title: "First week complete!",
		message: "You're building a habit. Consistency is the key to fluency.",
		greek: "Συγχαρητήρια!",
		english: "Congratulations!",
	},
	30: {
		badge: "1 Month",
		title: "One month strong!",
		message: "Greek is becoming part of your routine. Your dedication is paying off.",
		greek: "Εξαιρετικά!",
		english: "Excellent!",
	},
	100: {
		badge: "100 Days",
		title: "100 days of learning!",
		message: "You're truly dedicated. Most learners never make it this far. Keep going!",
		greek: "Απίστευτο!",
		english: "Incredible!",
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

const markMilestoneSeenLocally = (milestone: number): void => {
	if (typeof window === "undefined") return;
	try {
		const seen = getSeenMilestones();
		seen.add(milestone);
		localStorage.setItem(STORAGE_KEY, JSON.stringify([...seen]));
	} catch {
		// localStorage unavailable
	}
};

const fetchServerMilestones = async (userId: number): Promise<Set<number>> => {
	try {
		const response = await fetch(`/api/milestones?userId=${userId}`);
		if (!response.ok) return new Set();
		const data = (await response.json()) as {
			milestones: Array<{ milestone: number }>;
		};
		return new Set(data.milestones.map((m) => m.milestone));
	} catch {
		return new Set();
	}
};

const recordMilestoneOnServer = async (userId: number, milestone: number, streak: number): Promise<void> => {
	try {
		await fetch("/api/milestones", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ userId, milestone, streak }),
		});
	} catch {
		// Server record failed, but localStorage is still updated
	}
};

const mergeMilestones = (local: Set<number>, server: Set<number>): Set<number> => {
	return new Set([...local, ...server]);
};

const PARTICLE_COLORS = [
	"var(--color-terracotta)",
	"var(--color-olive)",
	"var(--color-ocean)",
	"var(--color-honey)",
];

const generateParticles = (count: number) =>
	Array.from({ length: count }, (_, i) => ({
		id: i,
		angle: (360 / count) * i + Math.random() * 30 - 15,
		distance: 80 + Math.random() * 60,
		size: 6 + Math.random() * 6,
		color: PARTICLE_COLORS[i % PARTICLE_COLORS.length] as string,
		delay: Math.random() * 0.2,
		rotation: Math.random() * 360,
	}));

const Particle = ({
	angle,
	distance,
	size,
	color,
	delay,
	rotation,
}: {
	angle: number;
	distance: number;
	size: number;
	color: string;
	delay: number;
	rotation: number;
}) => {
	const radians = (angle * Math.PI) / 180;
	const x = Math.cos(radians) * distance;
	const y = Math.sin(radians) * distance;

	return (
		<motion.div
			className="absolute rounded-sm"
			style={{
				width: size,
				height: size,
				backgroundColor: color,
				left: "50%",
				top: "50%",
				marginLeft: -size / 2,
				marginTop: -size / 2,
			}}
			initial={{ x: 0, y: 0, scale: 0, rotate: 0, opacity: 1 }}
			animate={{
				x,
				y: y + 20,
				scale: [0, 1.2, 1, 0.8],
				rotate: rotation,
				opacity: [1, 1, 1, 0],
			}}
			transition={{
				duration: 0.8,
				delay,
				ease: [0.36, 0.07, 0.19, 0.97],
			}}
		/>
	);
};

const Sparkle = ({ delay, x, y }: { delay: number; x: number; y: number }) => (
	<motion.div
		className="absolute"
		style={{ left: `${x}%`, top: `${y}%` }}
		initial={{ scale: 0, opacity: 0 }}
		animate={{
			scale: [0, 1, 0],
			opacity: [0, 1, 0],
		}}
		transition={{
			duration: 0.6,
			delay,
			repeat: 2,
			repeatDelay: 0.8,
		}}
	>
		<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
			<path
				d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z"
				fill="var(--color-honey)"
			/>
		</svg>
	</motion.div>
);

export interface MilestoneCelebrationProps {
	streak: number;
	userId?: number;
}

export const MilestoneCelebration = ({ streak, userId }: MilestoneCelebrationProps) => {
	const [showMilestone, setShowMilestone] = useState<Milestone | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [particles] = useState(() => generateParticles(16));

	useEffect(() => {
		const initMilestones = async () => {
			const localSeen = getSeenMilestones();
			let serverSeen = new Set<number>();

			if (userId) {
				serverSeen = await fetchServerMilestones(userId);
				// Merge server milestones into localStorage for offline support
				const merged = mergeMilestones(localSeen, serverSeen);
				if (merged.size > localSeen.size) {
					localStorage.setItem(STORAGE_KEY, JSON.stringify([...merged]));
				}
			}

			// Check if current streak is a milestone that hasn't been seen
			const allSeen = userId ? mergeMilestones(localSeen, serverSeen) : localSeen;
			if (MILESTONES.includes(streak as Milestone) && !allSeen.has(streak)) {
				setShowMilestone(streak as Milestone);
				setIsOpen(true);
			}
		};

		initMilestones();
	}, [streak, userId]);

	const handleDismiss = () => {
		if (showMilestone) {
			// Record locally first (immediate feedback)
			markMilestoneSeenLocally(showMilestone);

			// Then record on server (async, fire-and-forget)
			if (userId) {
				recordMilestoneOnServer(userId, showMilestone, streak);
			}
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
				<AnimatePresence>
					{isOpen && (
						<>
							{/* Sparkles */}
							<div className="absolute inset-0 overflow-hidden pointer-events-none">
								<Sparkle delay={0.3} x={15} y={20} />
								<Sparkle delay={0.5} x={80} y={15} />
								<Sparkle delay={0.7} x={20} y={70} />
								<Sparkle delay={0.9} x={85} y={65} />
							</div>

							<DialogHeader className="text-center pt-4">
								{/* Badge with particle burst */}
								<div className="relative mx-auto mb-4">
									{/* Particles */}
									<div className="absolute inset-0 flex items-center justify-center">
										{particles.map((p) => (
											<Particle key={p.id} {...p} />
										))}
									</div>

									{/* Glow ring */}
									<motion.div
										className="absolute inset-0 rounded-full"
										style={{
											background: "radial-gradient(circle, var(--color-honey-300) 0%, transparent 70%)",
										}}
										initial={{ scale: 0.5, opacity: 0 }}
										animate={{ scale: 1.5, opacity: [0, 0.6, 0] }}
										transition={{ duration: 0.6, delay: 0.1 }}
									/>

									{/* Main badge */}
									<motion.div
										className="relative w-20 h-20 rounded-full bg-gradient-to-br from-honey-400 to-terracotta-400 flex items-center justify-center shadow-lg"
										initial={{ scale: 0, rotate: -180 }}
										animate={{ scale: 1, rotate: 0 }}
										transition={{
											type: "spring",
											stiffness: 200,
											damping: 15,
											delay: 0.1,
										}}
									>
										<motion.span
											className="text-3xl font-bold text-white"
											initial={{ opacity: 0, scale: 0.5 }}
											animate={{ opacity: 1, scale: 1 }}
											transition={{ delay: 0.3 }}
										>
											{showMilestone}
										</motion.span>
									</motion.div>
								</div>

								{/* Badge label */}
								<motion.div
									className="inline-block mx-auto px-3 py-1 rounded-full bg-honey-200 text-honey-text text-sm font-medium mb-2"
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.4 }}
								>
									{data.badge} Streak
								</motion.div>

								{/* Title */}
								<motion.div
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.5 }}
								>
									<DialogTitle className="text-2xl font-serif text-navy-text">
										{data.title}
									</DialogTitle>
								</motion.div>

								{/* Description */}
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: 0.6 }}
								>
									<DialogDescription className="text-base text-stone-600 mt-2">
										{data.message}
									</DialogDescription>
								</motion.div>
							</DialogHeader>

							{/* Greek text */}
							<motion.div
								className="mt-4 text-center"
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.7 }}
							>
								<p className="text-4xl font-serif text-navy greek-text mb-1">
									{data.greek}
								</p>
								<p className="text-sm text-stone-500 italic">{data.english}</p>
							</motion.div>

							{/* Button */}
							<motion.div
								className="mt-6 pb-2"
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.8 }}
							>
								<Button
									variant="primary"
									size="lg"
									className="w-full"
									onClick={handleDismiss}
								>
									Keep Going
								</Button>
							</motion.div>
						</>
					)}
				</AnimatePresence>
			</DialogContent>
		</Dialog>
	);
};
