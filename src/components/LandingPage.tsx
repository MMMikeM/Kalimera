import { Link } from "@tanstack/react-router";
import { Brain, Clock, Flame } from "lucide-react";

import { Card } from "@/components/Card";
import { DrillDemo } from "@/components/DrillDemo";
import { Button } from "@/components/ui/button";

const FEATURES = [
	{
		icon: Clock,
		title: "Timed Drills",
		description: "4 different timing options, answers in reasonably typo generous Greeklish .",
	},
	{
		icon: Brain,
		title: "Spaced Repetition",
		description: "Whatever you keep getting wrong comes back round more often.",
	},
	{
		icon: Flame,
		title: "Daily Streaks",
		description: "A week of practice earns a freeze, so one missed day doesn't wipe it.",
	},
];

export const LandingPage = () => (
	<>
		<section className="py-12 text-center md:py-20">
			<h1 className="mb-4 font-serif text-3xl leading-tight text-terracotta md:text-4xl lg:text-5xl">
				Helping to remember Greek when you need it
			</h1>

			<p className="mx-auto mb-8 max-w-xl text-lg text-stone-600 md:text-xl">
				The apps I tried all seemed to focus on recognising Greek. These ones drill producing it, 4
				seconds on the clock, your normal keyboard, nothing to pick from.
			</p>

			{/* Drill Demo */}
			<div className="mb-8">
				<DrillDemo />
			</div>

			{/* Beta badge */}
			<div className="mb-8">
				<span className="inline-block rounded-full bg-ocean-100 px-3 py-1 text-sm font-medium text-ocean-text">
					Free to use. Support if it helps.
				</span>
			</div>

			{/* Primary CTA */}
			<div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
				<Link to="/try">
					<Button variant="primary" size="lg">
						Try a Drill
					</Button>
				</Link>
			</div>

			<p className="mt-4 text-sm text-stone-500">
				Already have an account?{" "}
				<Link to="/login" className="font-medium text-terracotta hover:text-terracotta-dark">
					Sign in
				</Link>
			</p>
		</section>

		{/* Origin Story Section */}
		<section className="py-12 md:py-16">
			<Card className="border-stone-200 bg-cream-dark/50">
				<h2 className="mb-6 font-serif text-2xl text-terracotta md:text-3xl">Why I Built This</h2>
				<div className="space-y-4 leading-relaxed text-stone-700">
					<p>
						My wife is Cypriot. We've moved to Cyprus and we're starting a family. I want our son to
						grow up speaking Greek. As close to native as possible.
					</p>
					<p>
						Problem is, I'm learning from square one. Apps, textbooks, courses. Everything trained
						me to <em>recognise</em> Greek, not <em>produce</em> it. I could tap the right answer in
						a multiple choice quiz, but when my{" "}
						<span className="font-serif text-terracotta">παππούς</span> asked me something, my mind
						went blank.
					</p>
					<p>
						So I built this. Timed drills that force retrieval under pressure. 4 seconds to produce the
						Greek. No hints. No multiple choice. Either you know it or you don't.
					</p>
					<p className="text-stone-600">It's how I'm learning. Maybe it'll help you too.</p>
				</div>
			</Card>
		</section>

		{/* Features Section */}
		<section className="py-12 md:py-16">
			<div className="grid gap-6 md:grid-cols-3">
				{FEATURES.map((feature) => {
					const Icon = feature.icon;
					return (
						<Card key={feature.title} className="p-6 text-center">
							<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-terracotta/10">
								<Icon size={24} className="text-terracotta" />
							</div>
							<h3 className="mb-2 text-lg font-medium text-stone-800">{feature.title}</h3>
							<p className="text-stone-600">{feature.description}</p>
						</Card>
					);
				})}
			</div>
		</section>

		{/* Time Commitment */}
		<section className="py-12 text-center">
			<p className="font-serif text-2xl text-stone-700">
				Just <span className="text-terracotta">2-3 minutes</span> a day
			</p>
			<p className="mt-2 text-stone-500">That's what I manage most mornings, and it's enough to stop the reviews stacking up</p>
		</section>

		{/* Footer CTA */}
		<section className="border-t border-stone-200 py-12 text-center md:py-16">
			<h2 className="mb-4 font-serif text-2xl text-terracotta">Give one drill a go</h2>
			<Link to="/try">
				<Button variant="primary" size="lg">
					Try a Drill
				</Button>
			</Link>
		</section>
	</>
);
