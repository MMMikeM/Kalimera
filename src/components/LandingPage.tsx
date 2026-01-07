import { Link } from "react-router";
import { Clock, Brain, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/Card";
import { DrillDemo } from "@/components/DrillDemo";
import { Header } from "@/components/Header";

const FEATURES = [
	{
		icon: Clock,
		title: "Timed Drills",
		description: "3.5 seconds. No hints. Pure retrieval.",
	},
	{
		icon: Brain,
		title: "Spaced Repetition",
		description: "Science-backed review scheduling.",
	},
	{
		icon: Flame,
		title: "Daily Streaks",
		description: "Build the habit. Track your progress.",
	},
];

export const LandingPage = () => (
	<div className="app-shell bg-cream">
		<main className="app-main">
			<div className="max-w-6xl mx-auto px-6 md:px-8">
				<Header isAuthenticated={false} />
			</div>

			<div className="max-w-4xl mx-auto px-6 md:px-8">
				{/* Hero Section */}
				<section className="py-12 md:py-20 text-center">
					<h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-terracotta leading-tight mb-4">
						You know Greek.
						<br />
						You just can't say it.
					</h1>

					<p className="text-lg md:text-xl text-stone-600 max-w-xl mx-auto mb-8">
						Recognition isn't fluency. Retrieval is. Train your Greek with
						timed production drills.
					</p>

					{/* Drill Demo */}
					<div className="mb-8">
						<DrillDemo />
					</div>

					{/* Beta badge */}
					<div className="mb-8">
						<span className="inline-block px-3 py-1 text-sm font-medium text-ocean-text bg-ocean-100 rounded-full">
							Free to use. Support if it helps.
						</span>
					</div>

					{/* Primary CTA */}
					<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
						<Link to="/try">
							<Button variant="primary" size="lg">
								Try a Drill
							</Button>
						</Link>
					</div>

					<p className="mt-4 text-sm text-stone-500">
						Already have an account?{" "}
						<Link
							to="/login"
							className="text-terracotta hover:text-terracotta-dark font-medium"
						>
							Sign in
						</Link>
					</p>
				</section>

				{/* Origin Story Section */}
				<section className="py-12 md:py-16">
					<Card className="bg-cream-dark/50 border-stone-200">
						<h2 className="text-2xl md:text-3xl font-serif text-terracotta mb-6">
							Why I Built This
						</h2>
						<div className="space-y-4 text-stone-700 leading-relaxed">
							<p>
								My wife is Cypriot. We've moved to Cyprus and we're starting a
								family. I want our son to grow up speaking Greek—as close to
								native as possible.
							</p>
							<p>
								Problem is, I'm learning from square one. And everything I
								tried—apps, textbooks, courses—trained me to{" "}
								<em>recognise</em> Greek, not <em>produce</em> it. I could tap
								the right answer in a multiple choice quiz, but when my{" "}
								<span className="font-serif text-terracotta">παππούς</span>{" "}
								asked me something, my mind went blank.
							</p>
							<p>
								So I built this. Timed drills that force retrieval under
								pressure. 3.5 seconds to produce the Greek. No hints. No
								multiple choice. Either you know it or you don't.
							</p>
							<p className="text-stone-600">
								It's how I'm learning. Maybe it'll help you too.
							</p>
						</div>
					</Card>
				</section>

				{/* Features Section */}
				<section className="py-12 md:py-16">
					<div className="grid md:grid-cols-3 gap-6">
						{FEATURES.map((feature) => {
							const Icon = feature.icon;
							return (
								<Card key={feature.title} className="text-center p-6">
									<div className="w-12 h-12 rounded-full bg-terracotta/10 flex items-center justify-center mx-auto mb-4">
										<Icon size={24} className="text-terracotta" />
									</div>
									<h3 className="text-lg font-medium text-stone-800 mb-2">
										{feature.title}
									</h3>
									<p className="text-stone-600">{feature.description}</p>
								</Card>
							);
						})}
					</div>
				</section>

				{/* Time Commitment */}
				<section className="py-12 text-center">
					<p className="text-2xl font-serif text-stone-700">
						Just <span className="text-terracotta">2-3 minutes</span> a day
					</p>
					<p className="text-stone-500 mt-2">
						Small consistent effort beats occasional cramming
					</p>
				</section>

				{/* Footer CTA */}
				<section className="py-12 md:py-16 text-center border-t border-stone-200">
					<h2 className="text-2xl font-serif text-terracotta mb-4">
						Ready to start?
					</h2>
					<Link to="/try">
						<Button variant="primary" size="lg">
							Try a Drill
						</Button>
					</Link>
				</section>

				{/* Footer */}
				<footer className="py-8 text-center text-sm text-stone-500 space-y-2">
					<p className="font-serif text-terracotta-text">Ellinika</p>
					<p>
						<Link
							to="/support"
							className="text-stone-500 hover:text-terracotta transition-colors"
						>
							About this project
						</Link>
					</p>
				</footer>
			</div>
		</main>
	</div>
);
