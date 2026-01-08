import { useState } from "react";
import { Link } from "react-router";
import { Zap, ArrowRight, UserPlus } from "lucide-react";
import UnifiedDrill, {
	type SessionStats,
} from "./practice/components/unified-drill";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/Card";
import { Header } from "@/components/Header";

export function meta() {
	return [
		{ title: "Try Greek Drills - Kalimera" },
		{
			name: "description",
			content: "Experience timed Greek production drills - no signup required",
		},
	];
}

const TRY_QUESTIONS = [
	{ id: "try-1", prompt: "me (object)", correctGreek: "με", timeLimit: 4000 },
	{ id: "try-2", prompt: "you (object, singular)", correctGreek: "σε", timeLimit: 4000 },
	{ id: "try-3", prompt: "him", correctGreek: "τον", timeLimit: 4000 },
	{ id: "try-4", prompt: "her", correctGreek: "την", timeLimit: 4000 },
	{ id: "try-5", prompt: "my", correctGreek: "μου", timeLimit: 4000 },
	{ id: "try-6", prompt: "your (singular)", correctGreek: "σου", timeLimit: 4000 },
	{ id: "try-7", prompt: "I want", correctGreek: "θέλω", timeLimit: 4500 },
	{ id: "try-8", prompt: "I have", correctGreek: "έχω", timeLimit: 4500 },
];

const TryDrillIntro = ({ onStart }: { onStart: () => void }) => (
	<div className="app-shell bg-cream">
		<main className="app-main">
			<div className="max-w-6xl mx-auto px-6 md:px-8">
				<Header isAuthenticated={false} />
			</div>

			<div className="max-w-xl mx-auto px-6 py-12">
				<Card variant="bordered" padding="lg" className="text-center">
					<div className="py-8">
						<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-terracotta-100 mb-4">
							<Zap size={32} className="text-terracotta" />
						</div>
						<h1 className="text-2xl font-bold mb-2">Try a Speed Drill</h1>
						<p className="text-stone-600 mb-6">
							8 questions. Type Greek with your normal keyboard. We understand phonetic spelling. Let's see what you've got.
						</p>

						<Button size="lg" onClick={onStart} className="gap-2">
							<Zap size={20} />
							Start Drill
						</Button>

						<div className="mt-6 text-xs text-stone-400 space-y-1">
							<p>
								<kbd className="px-1.5 py-0.5 bg-stone-100 rounded text-stone-600">
									Space
								</kbd>{" "}
								to start each question
							</p>
							<p>
								<kbd className="px-1.5 py-0.5 bg-stone-100 rounded text-stone-600">
									Enter
								</kbd>{" "}
								to submit answer
							</p>
						</div>
					</div>
				</Card>
			</div>
		</main>
	</div>
);

const TryDrillComplete = ({ stats }: { stats: SessionStats }) => {
	const percentage = Math.round((stats.correct / stats.total) * 100);
	const getMessage = () => {
		if (percentage >= 80) return { emoji: "🎉", text: "Excellent! You've got solid foundations." };
		if (percentage >= 50) return { emoji: "💪", text: "Good effort! Regular practice will build your speed." };
		return { emoji: "🌱", text: "Great start! This is how you build real fluency." };
	};
	const { emoji, text } = getMessage();

	return (
		<div className="app-shell bg-cream">
			<main className="app-main">
				<div className="max-w-6xl mx-auto px-6 md:px-8">
					<Header isAuthenticated={false} />
				</div>

				<div className="max-w-xl mx-auto px-6 py-12">
					<Card variant="bordered" padding="lg" className="text-center">
						<div className="py-8">
							<p className="text-5xl mb-4">{emoji}</p>
							<h2 className="text-2xl font-bold mb-2">
								{stats.correct}/{stats.total} correct
							</h2>
							<p className="text-stone-600 mb-6">{text}</p>

							<div className="bg-ocean-50 border border-ocean-200 rounded-xl p-6 mb-6 text-left">
								<p className="text-ocean-text font-medium mb-2">
									This was just a taste.
								</p>
								<p className="text-stone-600 text-sm">
									Create an account to track your progress, build streaks with automatic freeze protection, and access
									the full drill library. It's free.
								</p>
							</div>

							<div className="space-y-3">
								<Link to="/register?from=try" className="block">
									<Button size="lg" className="w-full gap-2">
										<UserPlus size={20} />
										Create Free Account
									</Button>
								</Link>

								<Link
									to="/login"
									className="block text-sm text-stone-500 hover:text-terracotta transition-colors"
								>
									Already have an account? Sign in
								</Link>
							</div>
						</div>
					</Card>

					<div className="mt-8 text-center">
						<Link
							to="/"
							className="inline-flex items-center gap-1 text-sm text-stone-500 hover:text-terracotta transition-colors"
						>
							Learn more about Kalimera
							<ArrowRight size={14} />
						</Link>
					</div>
				</div>
			</main>
		</div>
	);
};

export default function TryDrillRoute() {
	const [started, setStarted] = useState(false);
	const [completedStats, setCompletedStats] = useState<SessionStats | null>(null);

	if (completedStats) {
		return <TryDrillComplete stats={completedStats} />;
	}

	if (!started) {
		return <TryDrillIntro onStart={() => setStarted(true)} />;
	}

	return (
		<div className="app-shell bg-cream">
			<main className="app-main">
				<div className="max-w-6xl mx-auto px-6 md:px-8">
					<Header isAuthenticated={false} />
				</div>

				<div className="max-w-xl mx-auto px-6 py-8">
					<UnifiedDrill
						title="Try Drill"
						questions={TRY_QUESTIONS}
						onComplete={(stats) => setCompletedStats(stats)}
					/>
				</div>
			</main>
		</div>
	);
}
