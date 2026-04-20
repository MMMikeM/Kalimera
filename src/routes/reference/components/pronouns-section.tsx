import type React from "react";

import { Card } from "@/components/Card";
import { LookupCard } from "@/components/cards";
import { CollapsibleSection } from "@/components/CollapsibleSection";
import { MonoText } from "@/components/MonoText";
import { CASE_SCHEME, SCHEME } from "@/constants/grammar-palette";
import {
	EMPHATIC_PRONOUN_EXAMPLES,
	EMPHATIC_PRONOUNS,
	OBJECT_PRONOUN_EXAMPLES,
	OBJECT_PRONOUNS,
	POSSESSIVE_PRONOUN_EXAMPLES,
	POSSESSIVE_PRONOUNS,
	type PronounParadigm,
	PRONOUN_PATTERNS,
	PRONOUN_PHRASES,
	SUBJECT_PRONOUNS,
} from "@/constants/pronouns";

import { PronounDecisionGuide } from "./pronoun-decision-guide";
import { PronounParadigmTable } from "./pronoun-paradigm-table";

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

const ParadigmLookup = ({
	caseName,
	role,
	rule,
	paradigm,
	examples,
	note,
}: {
	caseName: "Nominative" | "Accusative" | "Genitive";
	role: string;
	rule: string;
	paradigm: PronounParadigm[];
	examples?: Array<{ greek: string; english: string }>;
	note?: string;
}) => {
	const scheme = CASE_SCHEME[caseName];
	const style = SCHEME[scheme];
	return (
		<LookupCard scheme={scheme} chip={caseName} eyebrow={role}>
			<div className="space-y-4 px-5 pt-4 pb-4">
				<p className="text-sm leading-relaxed text-stone-600">{rule}</p>
				<PronounParadigmTable data={paradigm} caseName={caseName} note={note} />
				{examples ? (
					<PronounExamplePills
						examples={examples}
						borderColor={style.borderSoft}
						textColor={style.text}
					/>
				) : null}
			</div>
		</LookupCard>
	);
};

const PronounExamplePills = ({
	examples,
	borderColor,
	textColor,
}: {
	examples: Array<{ greek: string; english: string }>;
	borderColor: string;
	textColor: string;
}) => (
	<div className={`border-t ${borderColor} pt-4`}>
		<div className="mb-2 text-sm font-medium text-stone-600">Examples:</div>
		<div className="flex flex-wrap gap-2">
			{examples.map((ex) => (
				<div
					key={ex.greek}
					className={`rounded-full border ${borderColor} bg-white px-3 py-1.5 text-sm`}
				>
					<MonoText size="sm" className={textColor}>
						{ex.greek}
					</MonoText>
					<span className="ml-1 text-stone-600">({ex.english})</span>
				</div>
			))}
		</div>
	</div>
);

const groupPhrasesByCategory = () => {
	const groups: Record<string, typeof PRONOUN_PHRASES> = {};
	for (const phrase of PRONOUN_PHRASES) {
		const category = phrase.category;
		if (!groups[category]) {
			groups[category] = [];
		}
		groups[category]?.push(phrase);
	}
	return groups;
};

const CATEGORY_LABELS: Record<string, string> = {
	requests: "Requests",
	opinions: "Opinions",
	questions: "Questions",
	answers: "Answers",
	family: "Family",
};

// One English "me" → three Greek forms. The pronouns-specific angle:
// English uses one word, Greek splits the job across cases (and weak/strong).
const ME_SPLIT = [
	{
		caseName: "Accusative" as const,
		role: "Target",
		greek: "με",
		job: "before the verb",
		example: "με βλέπεις",
		translation: "you see me",
	},
	{
		caseName: "Genitive" as const,
		role: "Owner",
		greek: "μου",
		job: "after the noun, or 'to me'",
		example: "μου λέει",
		translation: "tells me",
	},
	{
		caseName: "Accusative" as const,
		role: "Target (strong)",
		greek: "εμένα",
		job: "after a preposition, or for emphasis",
		example: "για εμένα",
		translation: "for me",
	},
];

export const PronounsSection: React.FC = () => {
	const phraseGroups = groupPhrasesByCategory();

	return (
		<section id="pronouns" className="space-y-16">
			{/* BAND 1 — THE SPLIT (pronouns-specific angle, not a cases recap) */}
			<div className="space-y-6">
				<Card variant="bordered" padding="lg" className="border-stone-200 bg-white">
					<div className="space-y-1">
						<div className="text-xs font-semibold tracking-widest text-stone-500 uppercase">
							The split
						</div>
						<h3 className="font-serif text-2xl text-stone-900">
							One English "me", three Greek forms.
						</h3>
						<p className="max-w-2xl text-sm text-stone-600">
							English packs every job into one word. Greek picks a different form depending on
							what the pronoun is doing — which is where case shows up.
						</p>
					</div>
					<ul className="mt-5 space-y-3">
						{ME_SPLIT.map((item) => {
							const scheme = CASE_SCHEME[item.caseName];
							const style = SCHEME[scheme];
							return (
								<li
									key={item.greek}
									// eslint-disable-next-line better-tailwindcss/no-restricted-classes -- fixed form column
									className="grid items-baseline gap-x-5 gap-y-1 sm:grid-cols-[6rem_1fr_auto]"
								>
									<MonoText
										variant="greek"
										size="2xl"
										className={`leading-none ${style.text}`}
									>
										{item.greek}
									</MonoText>
									<div className="text-sm text-stone-700">
										<span className="text-stone-500">{item.job}</span>
										<span className="mx-2 text-stone-300">·</span>
										<MonoText variant="greek" size="sm" className={style.text}>
											{item.example}
										</MonoText>
										<span className="ml-1 text-stone-500 italic">({item.translation})</span>
									</div>
									<span
										className={`justify-self-start rounded-full px-2.5 py-1 text-xs font-semibold tracking-[0.12em] uppercase sm:justify-self-end ${style.badgeBg} ${style.text}`}
									>
										{item.role}
									</span>
								</li>
							);
						})}
					</ul>
				</Card>
				<Card variant="bordered" padding="md" className="border-stone-200 bg-stone-50/60">
					<p className="text-sm text-stone-700">
						<strong className="text-stone-800">Target and Owner are the daily drivers.</strong>{" "}
						Subject pronouns (εγώ, εσύ…) exist but Greek usually drops them — the verb ending
						already tells you who.
					</p>
				</Card>
			</div>

			{/* BAND 2 — PARADIGMS (lookup containers — same idiom as cases triggers) */}
			<div className="space-y-8">
				<BandHeading
					kicker="Paradigms"
					title="All the forms"
					lede="Full tables for each role. Object and possessive are the daily drivers."
				/>

				{/* Tier 1: Object + Possessive */}
				<div className="grid gap-6 lg:grid-cols-2">
					<ParadigmLookup
						caseName="Accusative"
						role="Target"
						rule="Goes BEFORE the verb — σε βλέπω = I see you."
						paradigm={OBJECT_PRONOUNS}
						examples={OBJECT_PRONOUN_EXAMPLES}
					/>
					<ParadigmLookup
						caseName="Genitive"
						role="Owner"
						rule="Goes AFTER the noun — το σπίτι μου = my house."
						paradigm={POSSESSIVE_PRONOUNS}
						examples={POSSESSIVE_PRONOUN_EXAMPLES}
						note="Neuter uses the same form as masculine (του)"
					/>
				</div>

				{/* Tier 2: Subject (demoted) */}
				<ParadigmLookup
					caseName="Nominative"
					role="Doer"
					rule="Usually dropped — the verb ending already shows who. Use only for emphasis or contrast."
					paradigm={SUBJECT_PRONOUNS}
				/>

				{/* Weak vs strong comparison */}
				<Card variant="bordered" padding="lg" className="border-stone-200 bg-white">
					<div className="space-y-1">
						<div className="text-xs font-semibold tracking-widest text-stone-500 uppercase">
							Weak vs strong
						</div>
						<h4 className="font-serif text-xl text-stone-900">
							με vs εμένα — same meaning, different jobs
						</h4>
						<p className="max-w-2xl text-sm text-stone-600">
							The target form has a short (weak) version that clips onto verbs and a long (strong)
							version that survives on its own. Same case, different stress.
						</p>
					</div>
					<div className="mt-4 overflow-x-auto">
						<table className="w-full text-sm">
							<thead>
								<tr className="border-b border-stone-200">
									<th className="py-2 pr-4 text-left text-xs font-medium tracking-wide text-stone-500 uppercase">
										English
									</th>
									<th className="px-2 py-2 text-left text-xs font-medium tracking-wide text-stone-500 uppercase">
										Weak (before verb)
									</th>
									<th className="px-2 py-2 text-left text-xs font-medium tracking-wide text-stone-500 uppercase">
										Strong (after prep / emphasis)
									</th>
								</tr>
							</thead>
							<tbody>
								{OBJECT_PRONOUNS.map((obj, i) => {
									const strong = EMPHATIC_PRONOUNS[i];
									if (!strong) return null;
									return (
										<tr key={obj.person} className="border-b border-stone-100 align-top">
											<td className="py-2 pr-4 text-stone-600">
												{obj.singular.english} / {obj.plural.english}
											</td>
											<td className="px-2 py-2">
												<MonoText variant="greek" size="sm" className="text-case-accusative-text">
													{obj.singular.greek}
												</MonoText>
												<span className="text-stone-400"> · </span>
												<MonoText variant="greek" size="sm" className="text-case-accusative-text">
													{obj.plural.greek}
												</MonoText>
											</td>
											<td className="px-2 py-2">
												<MonoText variant="greek" size="sm" className="text-case-accusative-text">
													{strong.singular.greek}
												</MonoText>
												<span className="text-stone-400"> · </span>
												<MonoText variant="greek" size="sm" className="text-case-accusative-text">
													{strong.plural.greek}
												</MonoText>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
					<div className="mt-4 grid gap-3 sm:grid-cols-2">
						<div className="rounded-md border border-stone-200 bg-stone-50 p-3">
							<div className="mb-1 text-xs font-semibold tracking-wide text-stone-500 uppercase">
								Weak example
							</div>
							<MonoText variant="greek" size="md" className="block text-stone-800">
								με βλέπεις
							</MonoText>
							<p className="mt-0.5 text-xs text-stone-500 italic">you see me</p>
						</div>
						<div className="rounded-md border border-stone-200 bg-stone-50 p-3">
							<div className="mb-1 text-xs font-semibold tracking-wide text-stone-500 uppercase">
								Strong example
							</div>
							<MonoText variant="greek" size="md" className="block text-stone-800">
								για εμένα
							</MonoText>
							<p className="mt-0.5 text-xs text-stone-500 italic">for me (after preposition)</p>
						</div>
					</div>
					<div className="mt-4">
						<div className="mb-2 text-xs font-semibold tracking-wide text-stone-500 uppercase">
							More strong-form phrases
						</div>
						<div className="flex flex-wrap gap-2">
							{EMPHATIC_PRONOUN_EXAMPLES.map((ex) => (
								<div
									key={ex.greek}
									className="rounded-full border border-stone-200 bg-white px-3 py-1.5 text-sm"
								>
									<MonoText size="sm" className="text-case-accusative-text">
										{ex.greek}
									</MonoText>
									<span className="ml-1 text-stone-600">({ex.english})</span>
								</div>
							))}
						</div>
					</div>
				</Card>
			</div>

			{/* BAND 3 — PRODUCTION (open by default) */}
			<div className="space-y-4">
				<BandHeading
					kicker="Production"
					title="Ready-made phrases"
					lede="High-frequency chunks with pronouns already baked in. Memorise whole, don't decompose."
				/>
				<Card variant="bordered" padding="lg" className="border-stone-200 bg-white">
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{Object.entries(phraseGroups).map(([category, phrases]) => (
							<div key={category}>
								<h4 className="mb-2 text-xs font-semibold tracking-wide text-stone-500 uppercase">
									{CATEGORY_LABELS[category] || category}
								</h4>
								<div className="space-y-1.5">
									{phrases.map((phrase) => (
										<div key={phrase.greek} className="flex items-baseline gap-2 text-sm">
											<MonoText variant="greek" size="sm" className="font-medium text-stone-800">
												{phrase.greek}
											</MonoText>
											<span className="text-stone-600">{phrase.english}</span>
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				</Card>
			</div>

			{/* BAND 4 — NAVIGATION (retrieval scaffold) */}
			<div className="space-y-4">
				<BandHeading
					kicker="Decide"
					title="Which form do I need?"
					lede="Use this once you've seen the forms. It's a lookup, not a lesson."
				/>
				<PronounDecisionGuide />
			</div>

			{/* BAND 5 — INDEFINITES (core chunks only) */}
			<div className="space-y-4">
				<BandHeading
					kicker="Indefinites"
					title="Someone, nothing, everyone"
					lede="Memorise these as whole words. The prefix pattern is interesting but not drillable."
				/>
				<Card variant="bordered" padding="lg" className="border-stone-200 bg-white">
					<div className="grid gap-x-6 gap-y-1.5 sm:grid-cols-2 md:grid-cols-3">
						{[
							{ greek: "κάτι", english: "something" },
							{ greek: "τίποτα", english: "nothing / anything" },
							{ greek: "όλα", english: "everything" },
							{ greek: "κάποιος", english: "someone" },
							{ greek: "κανένας", english: "no one / anyone" },
							{ greek: "όλοι", english: "everyone" },
							{ greek: "κάπου", english: "somewhere" },
							{ greek: "πουθενά", english: "nowhere / anywhere" },
							{ greek: "παντού", english: "everywhere" },
						].map((item) => (
							<div key={item.greek} className="flex items-baseline gap-2 text-sm">
								<MonoText variant="greek" size="sm" className="font-medium text-stone-800">
									{item.greek}
								</MonoText>
								<span className="text-stone-600">{item.english}</span>
							</div>
						))}
					</div>
				</Card>
			</div>

			{/* COLLAPSED — Two-pronoun ordering (Phase 3-4 material) */}
			<CollapsibleSection
				title="Two-pronoun word order (advanced)"
				colorScheme="stone"
				defaultOpen={false}
			>
				<Card variant="bordered" padding="md" className="border-stone-200 bg-white">
					<h4 className="mb-1 font-bold text-stone-800">{PRONOUN_PATTERNS.doubleObject.title}</h4>
					<p className="mb-4 text-sm text-stone-600">{PRONOUN_PATTERNS.doubleObject.explanation}</p>
					<div className="mb-4 space-y-1 rounded-lg border border-stone-200 bg-stone-50 p-3 text-sm">
						<div className="flex items-center gap-2">
							<span className="w-16 text-stone-600">English:</span>
							<span className="text-stone-700">{PRONOUN_PATTERNS.doubleObject.contrast.english}</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="w-16 text-stone-600">Greek:</span>
							<MonoText variant="highlighted">
								{PRONOUN_PATTERNS.doubleObject.contrast.greek}
							</MonoText>
							<span className="text-stone-600">
								({PRONOUN_PATTERNS.doubleObject.contrast.literal})
							</span>
						</div>
					</div>
					<div className="flex flex-wrap gap-2">
						{PRONOUN_PATTERNS.doubleObject.examples.map((ex) => (
							<div
								key={ex.greek}
								className="rounded-lg border border-stone-200 bg-stone-50 px-3 py-2"
							>
								<MonoText variant="highlighted">{ex.greek}</MonoText>
								<span className="ml-2 text-sm text-stone-600">({ex.literal})</span>
							</div>
						))}
					</div>
				</Card>
			</CollapsibleSection>
		</section>
	);
};
