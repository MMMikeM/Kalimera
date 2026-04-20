import type React from "react";

import { Card } from "@/components/Card";
import { LookupCard, NextStepCard, TeachingCard } from "@/components/cards";
import { MonoText } from "@/components/MonoText";
import { CASE_SCHEME, SCHEME } from "@/constants/grammar-palette";
import { CASE_ROLES, CASE_TRIGGERS } from "@/constants/recognition";

const BandHeading: React.FC<{ kicker: string; title: string; lede?: string }> = ({
	kicker,
	title,
	lede,
}) => (
	<div className="space-y-1">
		<div className="text-xs font-semibold tracking-widest text-stone-500 uppercase">{kicker}</div>
		<h3 className="font-serif text-2xl text-stone-900">{title}</h3>
		{lede ? <p className="max-w-2xl text-sm text-stone-600">{lede}</p> : null}
	</div>
);

export const CasesSection: React.FC = () => {
	const triggersByCase = CASE_ROLES.map((role) => ({
		...role,
		triggers: CASE_TRIGGERS.filter((t) => t.caseName === role.caseName),
	})).filter((group) => group.triggers.length > 0);

	return (
		<section id="cases" className="space-y-16">
			{/* BAND 1 — CONCEPT (cards lead) */}
			<div className="space-y-6">
				<div className="grid gap-4 md:grid-cols-3 md:items-stretch">
					{CASE_ROLES.map((role) => {
						const scheme = CASE_SCHEME[role.caseName];
						const style = SCHEME[scheme];
						return (
							<TeachingCard
								key={role.caseName}
								scheme={scheme}
								title={role.role}
								badge={role.caseName}
								description={role.description}
								contentLayout="tight"
							>
								<MonoText
									variant="greek"
									size="2xl"
									className={`block leading-snug ${style.text}`}
								>
									{role.example}
								</MonoText>
								<p className="mt-1 text-xs text-stone-500 italic">{role.translation}</p>
							</TeachingCard>
						);
					})}
				</div>
				<Card variant="bordered" padding="md" className="border-stone-200 bg-stone-50/60">
					<p className="text-sm leading-relaxed text-stone-700">
						<strong className="text-stone-800">Word order is flexible in Greek</strong> because the
						ending carries the job.{" "}
						<em>"Ο σκύλος δάγκωσε τον άντρα"</em> and{" "}
						<em>"Τον άντρα δάγκωσε ο σκύλος"</em> both mean the dog bit the man — the{" "}
						<MonoText variant="greek" size="sm" className="inline">
							-ς
						</MonoText>{" "}
						and{" "}
						<MonoText variant="greek" size="sm" className="inline">
							-ν
						</MonoText>{" "}
						do the work English word order does.
					</p>
				</Card>
				<Card variant="bordered" padding="md" className="border-stone-200 bg-stone-50/60">
					<p className="text-sm text-stone-700">
						<strong className="text-stone-800">Start with Doer and Target.</strong> They cover most
						of what you'll hear and say. Owner comes up with possession and a few prepositions.
					</p>
				</Card>
			</div>

			{/* BAND 2 — REFERENCE (lookup tables) */}
			<div className="space-y-8">
				<BandHeading
					kicker="Reference"
					title="Look it up"
					lede="Reading Greek, the article tells you the case. Writing Greek, the trigger word decides it."
				/>

				{/* Article per case — compact list */}
				<div className="space-y-3">
					<h4 className="text-sm font-semibold tracking-wide text-stone-700 uppercase">
						Article for each case
					</h4>
					<Card variant="bordered" padding="none" className="overflow-hidden">
						<ul className="divide-y divide-stone-200">
							{CASE_ROLES.map((role) => {
								const style = SCHEME[CASE_SCHEME[role.caseName]];
								return (
									<li
										key={role.caseName}
										// eslint-disable-next-line better-tailwindcss/no-restricted-classes -- fixed-rem label column, no token fit
										className="grid grid-cols-[7rem_1fr] items-center gap-4 px-4 py-3 sm:grid-cols-[9rem_1fr]"
									>
										<span className={`text-sm font-semibold tracking-wide uppercase ${style.text}`}>
											{role.caseName}
										</span>
										<div className="flex flex-wrap gap-2">
											{role.articles.map((article) => (
												<MonoText
													key={article}
													variant="greek"
													size="sm"
													className={`inline-flex min-w-12 justify-center rounded-md px-2 py-1 ${style.badgeBg} ${style.text}`}
												>
													{article}
												</MonoText>
											))}
										</div>
									</li>
								);
							})}
						</ul>
					</Card>
				</div>

				{/* Triggers grouped by case, as tinted list containers */}
				<div className="space-y-3">
					<h4 className="text-sm font-semibold tracking-wide text-stone-700 uppercase">
						Trigger words that pull a case
					</h4>
					{/* eslint-disable-next-line better-tailwindcss/no-restricted-classes -- 60/40 layout, no token fit */}
					<div className="grid gap-4 lg:grid-cols-[3fr_2fr]">
						{triggersByCase.map((group) => {
							const scheme = CASE_SCHEME[group.caseName];
							const style = SCHEME[scheme];
							return (
								<LookupCard
									key={group.caseName}
									scheme={scheme}
									chip={group.caseName}
									eyebrow={`${group.role} triggers`}
								>
									<ul className={`divide-y ${style.borderSoft}`}>
										{group.triggers.map((trigger) => (
											<li key={trigger.pattern} className="px-5 py-3">
												<div className="font-semibold text-stone-800">{trigger.pattern}</div>
												<p className="mt-0.5 mb-2 text-sm text-stone-600">{trigger.meaning}</p>
												<div className="space-y-0.5">
													{trigger.examples.map((example) => (
														<MonoText
															key={example}
															variant="greek"
															size="sm"
															className={`block ${style.text}`}
														>
															{example}
														</MonoText>
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

			{/* BAND 3 — HANDOFF (consolidated: form refs + next tab) */}
			<div className="space-y-6 border-t border-stone-200 pt-12">
				<BandHeading
					kicker="Next"
					title="Picked the case. Now what?"
					lede="This page picks the case. Use these references to shape the actual words."
				/>
				<div className="grid gap-3 md:grid-cols-3">
					<NextStepCard
						to="/reference/articles"
						kicker="Reference"
						title="Articles"
						description="Every gender, every case"
					/>
					<NextStepCard
						to="/reference/nouns"
						kicker="Reference"
						title="Nouns"
						description="Endings by declension and case"
					/>
					<NextStepCard
						to="/reference/pronouns"
						kicker="Continue"
						title="Pronouns"
						description="Cases in the words you'll use most"
						emphasis
					/>
				</div>
			</div>
		</section>
	);
};
