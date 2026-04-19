import type React from "react";

import { Card } from "@/components/Card";
import { NextStepCard, TeachingCard } from "@/components/cards";
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
			<p className="max-w-3xl leading-relaxed text-stone-700">
				In English, word order shows meaning: <em>"The dog bit the man"</em> vs{" "}
				<em>"The man bit the dog."</em> In Greek, word <strong>endings</strong> show meaning, so
				word order is flexible. These different endings are called <strong>cases</strong>.
			</p>

			{/* BAND 1 — CONCEPT */}
			<div className="space-y-6">
				<BandHeading
					kicker="Concept"
					title="One word, three roles"
					lede="The word for “coffee” shifts its ending depending on what it's doing in the sentence. Focus on the plain-English job first — the grammar label comes second."
				/>
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
							>
								<MonoText
									variant="greek"
									size="lg"
									className={`block text-xl leading-snug ${style.text}`}
								>
									{role.example}
								</MonoText>
								<p className="mt-1 text-xs text-stone-500 italic">{role.translation}</p>
							</TeachingCard>
						);
					})}
				</div>
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
							const style = SCHEME[CASE_SCHEME[group.caseName]];
							return (
								<div
									key={group.caseName}
									className={`rounded-lg border ${style.borderSoft} ${style.bgSoft} overflow-hidden`}
								>
									<div className="flex items-baseline gap-3 px-5 pt-4 pb-3">
										<span
											className={`rounded-full px-3 py-0.5 text-xs font-semibold tracking-wider uppercase ${style.badgeBg} ${style.text}`}
										>
											{group.caseName}
										</span>
										<span className="text-xs font-semibold tracking-wider text-stone-500 uppercase">
											{group.role} triggers
										</span>
									</div>
									<ul className={`divide-y ${style.borderSoft} border-t ${style.borderSoft}`}>
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
								</div>
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
