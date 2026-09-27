import { Link } from "@tanstack/react-router";

import { DrillDemo } from "@/components/DrillDemo";
import { GreekText } from "@/components/GreekText";
import { ButtonLink } from "@/components/ui/button";

const HOW_IT_WORKS = [
	{
		term: "Timed drills",
		detail: (
			<>
				Three speeds, from four to eight seconds a prompt. You type the answer in Greeklish, and
				the usual spellings all count: thelo and thelw are both <GreekText>θέλω</GreekText>.
			</>
		),
	},
	{
		term: "Spaced repetition",
		detail: "Whatever you keep getting wrong comes back round more often.",
	},
	{
		term: "Two or three minutes a day",
		detail:
			"That's what I manage most mornings, and it's enough to stop the reviews stacking up.",
	},
];

export const LandingPage = () => (
	<>
		<section className="pt-6 pb-12 text-center md:py-20">
			<h1 className="mx-auto mb-4 max-w-3xl font-serif text-3xl leading-tight text-balance text-terracotta-700 sm:text-4xl md:text-5xl dark:text-terracotta">
				Helping to remember Greek when you need it
			</h1>

			<p className="mx-auto mb-8 max-w-xl text-lg text-pretty text-stone-600 md:mb-10 md:text-xl">
				The apps I tried all seemed to focus on recognising Greek. The drills here make you produce
				it: a few seconds on the clock, your normal keyboard, nothing to pick from.
			</p>

			<DrillDemo />

			<div className="mt-8 flex flex-col items-center gap-3 md:mt-10">
				<ButtonLink to="/try" size="lg">
					Try a drill
				</ButtonLink>
				<p className="text-sm text-stone-600">
					Free to use. Already have an account?{" "}
					<Link
						to="/login"
						className="font-medium text-terracotta-text underline-offset-2 hover:underline"
					>
						Sign in
					</Link>
				</p>
			</div>
		</section>

		<section className="mx-auto max-w-2xl border-t border-stone-200 py-12 md:py-16">
			<h2 className="mb-6 font-serif text-3xl text-stone-900">Why I built this</h2>
			<div className="space-y-4 text-lg leading-relaxed text-stone-700">
				<p>
					My wife is Cypriot. We've moved to Cyprus and we're starting a family. I want our son to
					grow up speaking Greek. As close to native as possible.
				</p>
				<p>
					Problem is, I'm learning from square one. Apps, textbooks, courses. Everything trained me
					to <em>recognise</em> Greek, not <em>produce</em> it. I could tap the right answer in a
					multiple choice quiz, but when my <GreekText tone="accent">παππούς</GreekText> asked me
					something, my mind went blank.
				</p>
				<p>
					So I built this. Timed drills that force retrieval under pressure. As little as four seconds to
					produce the Greek. No multiple choice. Either you know it or you don't.
				</p>
				<p>It's how I'm learning. Maybe it'll help you too.</p>
			</div>

			<dl className="mt-12 divide-y divide-stone-200 border-y border-stone-200">
				{HOW_IT_WORKS.map(({ term, detail }) => (
					<div key={term} className="grid gap-1 py-5 sm:grid-cols-5 sm:items-baseline sm:gap-8">
						<dt className="font-serif text-xl text-stone-900 sm:col-span-2">{term}</dt>
						<dd className="text-stone-700 sm:col-span-3">{detail}</dd>
					</div>
				))}
			</dl>
		</section>

		<section className="py-12 text-center md:py-16">
			<h2 className="mb-5 font-serif text-3xl text-stone-900">Give one drill a go</h2>
			<ButtonLink to="/try" size="lg">
				Try a drill
			</ButtonLink>
		</section>
	</>
);
