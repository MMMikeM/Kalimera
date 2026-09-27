import type React from "react";

import { LookupCard } from "@/components/cards/LookupCard";
import { NextStepCard } from "@/components/cards/NextStepCard";
import { TeachingCard } from "@/components/cards/TeachingCard";
import { GreekText } from "@/components/GreekText";
import { MarkedGreek } from "@/components/MarkedGreek";
import { CASE_KEY, CASE_SCHEME, SCHEME } from "@/constants/grammar-palette";
import { CASE_ROLES, CASE_TRIGGERS } from "@/constants/recognition";

import { BandHeading } from "./BandHeading";
import { ArticleParadigm } from "./case-table";

const CASE_NOTES: Array<{ key: string; body: React.ReactNode }> = [
	{
		key: "word-order",
		body: (
			<>
				<strong className="text-stone-800">Word order is flexible in Greek</strong> because the
				ending carries the job.{" "}
				<GreekText className="italic">
					<GreekText tone="nominative">Ο σκύλος</GreekText> δάγκωσε{" "}
					<GreekText tone="accusative">τον άντρα</GreekText>
				</GreekText>{" "}
				and{" "}
				<GreekText className="italic">
					<GreekText tone="accusative">Τον άντρα</GreekText> δάγκωσε{" "}
					<GreekText tone="nominative">ο σκύλος</GreekText>
				</GreekText>{" "}
				both mean the dog bit the man. The endings, not the order, say who did what.
			</>
		),
	},
	{
		key: "start-here",
		body: (
			<>
				<strong className="text-stone-800">Start with Doer and Target.</strong> They cover most of
				what you'll hear and say. Owner comes up with possession and a few prepositions.
			</>
		),
	},
	{
		key: "prepositions",
		body: (
			<>
				<strong className="text-stone-800">Every everyday preposition pulls Target.</strong> After{" "}
				<GreekText size="sm">σε, με, για, από, χωρίς</GreekText>
				, there is no case decision to make.
			</>
		),
	},
	{
		key: "linking-verbs",
		body: (
			<>
				<strong className="text-stone-800">After είναι, both sides are the Doer.</strong> Verbs like{" "}
				<GreekText>είναι</GreekText> and <GreekText>γίνομαι</GreekText> say what something is
				rather than do something to it. In <GreekText className="italic">η Χρυσάνθη είναι η μητέρα</GreekText>{" "}
				nothing is acted on, so neither noun is a Target.
			</>
		),
	},
];

export const CasesSection: React.FC = () => {
	const triggersByCase = CASE_ROLES.map((role) => ({
		...role,
		triggers: CASE_TRIGGERS.filter((t) => t.caseName === role.caseName),
	})).filter((group) => group.triggers.length > 0);

	return (
		<section id="cases" className="space-y-16">
			<div className="space-y-8">
				<h2 className="sr-only">The three roles</h2>
				<div className="grid gap-4 md:grid-cols-3 md:items-stretch">
					{CASE_ROLES.map((role) => (
						<TeachingCard
							key={role.caseName}
							scheme={CASE_SCHEME[role.caseName]}
							title={role.role}
							badge={role.caseName}
							description={role.description}
						>
							<MarkedGreek
								{...role.example}
								tone={CASE_KEY[role.caseName]}
								size="2xl"
								className="block leading-snug"
							/>
							<p className="mt-1 text-xs text-stone-600 italic">{role.translation}</p>
						</TeachingCard>
					))}
				</div>
				<ul className="divide-y divide-stone-200 border-y border-stone-200">
					{CASE_NOTES.map((note) => (
						<li key={note.key} className="py-4 leading-relaxed text-stone-700">
							{note.body}
						</li>
					))}
				</ul>
			</div>

			<div className="space-y-8">
				<BandHeading
					title="Look it up"
					lede="Reading Greek, the article tells you the case. Writing Greek, the trigger word decides it."
				/>

				<ArticleParadigm />

				<div className="space-y-3">
					<BandHeading as="h3" size="md" tone="quiet" title="Trigger words that pull a case" />
					{/* eslint-disable-next-line better-tailwindcss/no-restricted-classes -- 60/40 layout, no token fit */}
					<div className="grid gap-4 lg:grid-cols-[3fr_2fr] lg:items-start">
						{triggersByCase.map((group) => {
							const scheme = CASE_SCHEME[group.caseName];
							return (
								<LookupCard
									key={group.caseName}
									scheme={scheme}
									chip={`${group.role} triggers`}
									eyebrow={group.caseName}
									className="h-auto"
								>
									<ul className={`divide-y ${SCHEME[scheme].border}`}>
										{group.triggers.map((trigger) => (
											<li key={trigger.pattern} className="px-5 py-3">
												<div className="font-semibold text-stone-800">{trigger.pattern}</div>
												<p className="mt-0.5 mb-2 text-sm text-stone-600">{trigger.meaning}</p>
												<div className="space-y-0.5">
													{trigger.examples.map((example) => (
														<MarkedGreek
															key={example.greek}
															{...example}
															tone={CASE_KEY[group.caseName]}
															className="block"
														/>
													))}
												</div>
											</li>
										))}
									</ul>
								</LookupCard>
							);
						})}
					</div>
				</div>
			</div>

			<div className="space-y-6 border-t border-stone-200 pt-12">
				<BandHeading
					title="Picked the case. Now what?"
					lede="This page picks the case. Use these references to shape the actual words."
				/>
				<div className="grid gap-3 md:grid-cols-3">
					<NextStepCard
						to="/reference/articles"
						title="Articles"
						description="The signal this page reads the case from"
						emphasis
					/>
					<NextStepCard
						to="/reference/pronouns"
						title="Pronouns"
						description="Cases in the words you'll use most"
					/>
					<NextStepCard
						to="/reference/nouns"
						title="Nouns"
						description="Endings by declension and case"
					/>
				</div>
			</div>
		</section>
	);
};
