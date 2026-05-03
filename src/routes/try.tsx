import { ArrowRight, UserPlus, Zap } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Link } from "react-router";

import { Card } from "@/components/Card";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { greekToPhonetic } from "@/lib/greek-transliteration";

import { type SimpleListItem, SimpleListDrill } from "./practice/engines/simple-list-drill";
import type { SessionStats } from "./practice/engines/use-drill-engine";

export function meta() {
	return [
		{ title: "Try Greek Drills - Kalimera" },
		{
			name: "description",
			content: "Experience timed Greek production drills - no signup required",
		},
	];
}

const TRY_QUESTIONS: Array<{ id: string; prompt: string; correctGreek: string }> = [
	{ id: "try-1", prompt: "me (object)", correctGreek: "με" },
	{ id: "try-2", prompt: "you (object, singular)", correctGreek: "σε" },
	{ id: "try-3", prompt: "him", correctGreek: "τον" },
	{ id: "try-4", prompt: "her", correctGreek: "την" },
	{ id: "try-5", prompt: "my", correctGreek: "μου" },
	{ id: "try-6", prompt: "your (singular)", correctGreek: "σου" },
	{ id: "try-7", prompt: "I want", correctGreek: "θέλω" },
	{ id: "try-8", prompt: "I have", correctGreek: "έχω" },
];

const TRY_ITEMS: SimpleListItem[] = TRY_QUESTIONS.map((q) => ({
	id: q.id,
	greek: q.correctGreek,
	greeklish: greekToPhonetic(q.correctGreek),
	label: q.prompt,
	english: q.prompt,
}));

const TryShell: React.FC<{ children: React.ReactNode; innerPy?: string }> = ({
	children,
	innerPy = "py-12",
}) => (
	<div className="app-shell bg-cream">
		<main className="app-main">
			<div className="mx-auto max-w-6xl px-6 md:px-8">
				<Header isAuthenticated={false} />
			</div>
			<div className={`mx-auto max-w-xl px-6 ${innerPy}`}>{children}</div>
		</main>
	</div>
);

const TryDrillIntro = ({ onStart }: { onStart: () => void }) => (
	<TryShell>
		<Card variant="bordered" padding="lg" className="text-center">
			<div className="py-8">
				<div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-terracotta-100">
					<Zap size={32} className="text-terracotta" />
				</div>
				<h1 className="mb-2 text-2xl font-bold">Try a Speed Drill</h1>
				<p className="mb-6 text-stone-600">
					8 questions. Type Greek with your normal keyboard. We understand phonetic spelling. Let's
					see what you've got.
				</p>

				<Button size="lg" onClick={onStart} className="gap-2">
					<Zap size={20} />
					Start Drill
				</Button>

				<div className="mt-6 space-y-1 text-xs text-stone-400">
					<p>
						<kbd className="rounded bg-stone-100 px-1.5 py-0.5 text-stone-600">Space</kbd> to start
						each question
					</p>
					<p>
						<kbd className="rounded bg-stone-100 px-1.5 py-0.5 text-stone-600">Enter</kbd> to submit
						answer
					</p>
				</div>
			</div>
		</Card>
	</TryShell>
);

const TryDrillComplete = ({ stats }: { stats: SessionStats<SimpleListItem> }) => {
	const percentage = Math.round((stats.correct / stats.total) * 100);
	const getMessage = () => {
		if (percentage >= 80) return { emoji: "🎉", text: "Excellent! You've got solid foundations." };
		if (percentage >= 50)
			return {
				emoji: "💪",
				text: "Good effort! Regular practice will build your speed.",
			};
		return {
			emoji: "🌱",
			text: "Great start! This is how you build real fluency.",
		};
	};
	const { emoji, text } = getMessage();

	return (
		<TryShell>
			<Card variant="bordered" padding="lg" className="text-center">
				<div className="py-8">
					<p className="mb-4 text-5xl">{emoji}</p>
					<h2 className="mb-2 text-2xl font-bold">
						{stats.correct}/{stats.total} correct
					</h2>
					<p className="mb-6 text-stone-600">{text}</p>

					<div className="mb-6 rounded-xl border border-ocean-200 bg-ocean-50 p-6 text-left">
						<p className="mb-2 font-medium text-ocean-text">This was just a taste.</p>
						<p className="text-sm text-stone-600">
							Create an account to track your progress, build streaks with automatic freeze
							protection, and access the full drill library. It's free.
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
							className="block text-sm text-stone-500 transition-colors hover:text-terracotta"
						>
							Already have an account? Sign in
						</Link>
					</div>
				</div>
			</Card>

			<div className="mt-8 text-center">
				<Link
					to="/"
					className="inline-flex items-center gap-1 text-sm text-stone-500 transition-colors hover:text-terracotta"
				>
					Learn more about Kalimera
					<ArrowRight size={14} />
				</Link>
			</div>
		</TryShell>
	);
};

export default function TryDrillRoute() {
	const [started, setStarted] = useState(false);
	const [completedStats, setCompletedStats] = useState<SessionStats<SimpleListItem> | null>(null);

	if (completedStats) {
		return <TryDrillComplete stats={completedStats} />;
	}

	if (!started) {
		return <TryDrillIntro onStart={() => setStarted(true)} />;
	}

	return (
		<TryShell innerPy="py-8">
			<SimpleListDrill
				items={TRY_ITEMS}
				title="Try Drill"
				subtitle="8 quick rounds"
				drillId="try"
				autoStart
				onComplete={setCompletedStats}
			/>
		</TryShell>
	);
}
