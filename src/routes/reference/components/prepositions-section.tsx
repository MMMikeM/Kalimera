import type React from "react";

import { CollapsibleSection } from "@/components/CollapsibleSection";
import { MistakeComparison } from "@/components/MistakeComparison";
import { MonoText } from "@/components/MonoText";
import { SectionHeading } from "@/components/SectionHeading";
import { type GrammarScheme, SCHEME } from "@/constants/grammar-palette";
import {
	COMPOUND_CONTRAST_PAIRS,
	OTHER_PREPOSITIONS,
	PREPOSITION_MISTAKES,
	PREPOSITION_PRONOUN_INFO,
	SE_CONTRACTIONS,
	TIME_EXPRESSIONS,
} from "@/constants/prepositions";
import { cn } from "@/lib/utils";

import { PrepositionNavigator } from "./preposition-navigator";

const CONTRACTION_GENDER_SCHEME: Record<string, GrammarScheme> = {
	neuter: "gender-neuter",
	feminine: "gender-feminine",
	masculine: "gender-masculine",
};

const GENDER_ORDER = ["masculine", "feminine", "neuter"];
const byGender = (a: { gender: string }, b: { gender: string }) =>
	GENDER_ORDER.indexOf(a.gender) - GENDER_ORDER.indexOf(b.gender);

const SeCard: React.FC = () => {
	const singular = SE_CONTRACTIONS.formulas.filter((f) => f.number === "singular").sort(byGender);
	const plural = SE_CONTRACTIONS.formulas.filter((f) => f.number === "plural").sort(byGender);

	return (
		<div className="rounded-xl border-2 border-navy-300 bg-navy-100 px-8 py-8">
			{/* Header */}
			<div className="mb-1 text-xs font-semibold tracking-widest uppercase text-navy-text">
				The σε story
			</div>
			<h3 className="font-serif text-3xl text-navy-text mb-2">σε + article contraction</h3>
			<p className="text-sm text-stone-600 mb-8 max-w-md">{SE_CONTRACTIONS.intro}</p>

			{/* All 6 forms — singular then plural */}
			<div className="space-y-3 mb-6">
				{[
					{ label: "Singular", forms: singular },
					{ label: "Plural", forms: plural },
				].map(({ label, forms }) => (
					<div key={label}>
						<p className="text-xs font-semibold tracking-widest text-stone-400 uppercase mb-2">
							{label}
						</p>
						<div className="grid grid-cols-3 gap-3">
							{forms.map((f) => {
								const [from, to] = f.formula.split(" = ");
								const gStyle = SCHEME[CONTRACTION_GENDER_SCHEME[f.gender] ?? "neutral"];
								return (
									<div key={f.formula} className="rounded-lg border border-navy-200 bg-white py-4 text-center">
										<div className="text-xs text-stone-400 mb-2">{from}</div>
										<span className={cn("font-serif text-3xl font-bold", gStyle.text)}>{to}</span>
									</div>
								);
							})}
						</div>
					</div>
				))}
			</div>

			{/* Examples */}
			<div className="border-t border-navy-200 pt-5 space-y-1.5 mb-5">
				{singular.flatMap((f) => f.examples.slice(0, 1)).map((ex) => (
					<div key={ex.greek} className="flex items-baseline gap-3 text-sm">
						<MonoText size="sm" variant="greek" className="font-medium text-stone-800">
							{ex.greek}
						</MonoText>
						<span className="text-stone-500">{ex.english}</span>
					</div>
				))}
			</div>

			{/* When σε stays σε */}
			<div className="rounded-lg border border-navy-200 bg-white p-4">
				<p className="text-xs font-semibold text-navy-text mb-1.5">
					{SE_CONTRACTIONS.noArticle.title}
				</p>
				<p className="text-sm text-stone-600">
					{SE_CONTRACTIONS.noArticle.explanation}:{" "}
					{SE_CONTRACTIONS.noArticle.examples.map((ex, i) => (
						<span key={ex.greek}>
							{i > 0 && ", "}
							<MonoText size="sm" variant="highlighted" className="font-medium">
								{ex.greek}
							</MonoText>{" "}
							<span className="text-stone-500">({ex.english})</span>
						</span>
					))}
				</p>
			</div>
		</div>
	);
};

export const PrepositionsSection: React.FC = () => (
	<section id="prepositions" className="space-y-6">
		<SectionHeading
			title="Prepositions"
			subtitle="Four words cover most situations. One rule applies to all."
		/>

		{/* Decision Navigator */}
		<PrepositionNavigator />

		{/* Dark σε card */}
		<SeCard />

		{/* No contraction — από/με/για + μέχρι/πριν/μετά/χωρίς/προς merged */}
		<div className="border-t-2 border-stone-900 pt-8">
			<div className="mb-1 text-xs font-semibold tracking-widest text-stone-400 uppercase">
				No contraction
			</div>
			<h3 className="font-serif text-2xl text-stone-900 mb-1">The rest</h3>
			<p className="text-sm text-stone-500 mb-5">
				Use accusative forms on what follows. Nothing transforms.
			</p>
			<div className="space-y-3">
				{[
					{ greek: "με", english: "with", example: "Καφέ με γάλα", exampleEnglish: "coffee with milk" },
					{ greek: "για", english: "for", example: "Αυτό είναι για σένα", exampleEnglish: "this is for you" },
					{ greek: "από", english: "from", example: "Είμαι από την Αθήνα", exampleEnglish: "I'm from Athens" },
					...OTHER_PREPOSITIONS.map((p) => ({
						greek: p.greek,
						english: p.english,
						example: p.example,
						exampleEnglish: p.exampleEnglish,
					})),
				].map((prep) => (
					<div key={prep.greek} className="flex items-baseline gap-4">
						<MonoText variant="greek" size="xl" className="w-12 shrink-0 font-bold text-stone-900">
							{prep.greek}
						</MonoText>
						<span className="w-24 shrink-0 text-sm text-stone-500">{prep.english}</span>
						<MonoText size="sm" variant="greek" className="text-stone-500">
							{prep.example}
						</MonoText>
						<span className="text-xs text-stone-400">{prep.exampleEnglish}</span>
					</div>
				))}
			</div>
		</div>

		{/* Time expressions — plain section */}
		<div className="border-t border-stone-200 pt-6">
			<div className="mb-1 text-xs font-semibold tracking-widest text-stone-400 uppercase">
				Time
			</div>
			<h3 className="font-serif text-xl text-stone-900 mb-4">Time expressions</h3>
			<div className="grid gap-6 sm:grid-cols-3">
				{TIME_EXPRESSIONS.patterns.map((p) => (
					<div key={p.pattern}>
						<div className="mb-1 text-sm font-semibold text-stone-700">{p.pattern}</div>
						<div className="mb-2 text-xs text-stone-400">{p.meaning}</div>
						<div className="space-y-1">
							{p.examples.map((ex) => (
								<div key={ex.greek} className="text-sm">
									<MonoText size="sm" variant="greek">
										{ex.greek}
									</MonoText>
									<span className="ml-1 text-xs text-stone-400">{ex.english}</span>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</div>

		{/* Pronouns — plain section */}
		<div className="border-t border-stone-200 pt-6">
			<div className="mb-1 text-xs font-semibold tracking-widest text-stone-400 uppercase">
				With pronouns
			</div>
			<h3 className="font-serif text-xl text-stone-900 mb-1">Prepositions with pronouns</h3>
			<p className="text-sm text-stone-500 mb-4">
				Weak forms (με, σε) go before verbs only. After a preposition, use the long emphatic forms.
			</p>
			<div className="flex flex-wrap gap-2">
				{PREPOSITION_PRONOUN_INFO.examples.map((ex) => (
					<div
						key={ex.greek}
						className="rounded-full border border-stone-200 bg-white px-3 py-1.5 text-sm"
					>
						<MonoText size="sm" className="font-medium text-stone-800">
							{ex.greek}
						</MonoText>
						<span className="ml-1 text-stone-500">({ex.english})</span>
					</div>
				))}
			</div>
		</div>

		{/* Common mistakes — collapsible */}
		<CollapsibleSection title="Common mistakes" colorScheme="stone" defaultOpen={false}>
			<div className="p-3">
				<MistakeComparison
					mistakes={PREPOSITION_MISTAKES.map((m) => ({
						wrong: m.wrong,
						correct: m.right,
						explanation: m.rule,
					}))}
					title=""
					cardClassName="bg-transparent"
				/>
			</div>
		</CollapsibleSection>

		{/* Compound Prepositions */}
		<CollapsibleSection
			title="Compound Prepositions"
			subtitle="Spatial descriptions: on, under, next to, behind..."
			colorScheme="stone"
			defaultOpen={false}
		>
			<div className="space-y-4">
				<div className="rounded-lg border border-stone-200 bg-white p-4 space-y-3">
					<p className="text-xs font-semibold uppercase tracking-widest text-stone-400">
						The pattern
					</p>
					<div className="space-y-2 text-sm">
						<div className="flex items-center gap-2">
							<span className="w-20 shrink-0 rounded bg-stone-200 px-2 py-0.5 text-center text-xs font-semibold text-stone-700">
								+ σε
							</span>
							<span className="text-stone-600">contracts with article:</span>
							<MonoText size="sm" className="font-semibold text-stone-800">
								πάνω στο
							</MonoText>
						</div>
						<div className="flex items-center gap-2">
							<span className="w-20 shrink-0 rounded border border-stone-200 px-2 py-0.5 text-center text-xs text-stone-400">
								+ από
							</span>
							<span className="text-stone-500">no change:</span>
							<MonoText size="sm" className="text-stone-600">
								κάτω από το
							</MonoText>
						</div>
					</div>
				</div>

				{(() => {
					const all = COMPOUND_CONTRAST_PAIRS.flatMap((pair) => [pair.left, pair.right]);
					const contracts = all.filter((item) => item.usesσε);
					const noChange = all.filter((item) => !item.usesσε);
					const col = (items: typeof contracts, tinted: boolean) => (
						<div className="space-y-2">
							{items.map((item) => (
								<div
									key={item.greek}
									className={cn(
										"rounded-lg border p-3",
										tinted
											? "border-case-accusative-300 bg-case-accusative-100"
											: "border-stone-200 bg-white",
									)}
								>
									<div className="mb-1 flex items-baseline gap-2">
										<MonoText variant="greek" size="md" className="font-semibold text-stone-800">
											{item.greek}
										</MonoText>
										<span className="text-sm text-stone-500">{item.english}</span>
									</div>
									<MonoText variant="greek" size="sm" className="block text-stone-500">
										{item.example}
									</MonoText>
								</div>
							))}
						</div>
					);
					return (
						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
							<div className="space-y-2">
								<p className="text-xs font-semibold uppercase tracking-widest text-case-accusative-text">
									σε — contracts
								</p>
								{col(contracts, true)}
							</div>
							<div className="space-y-2">
								<p className="text-xs font-semibold uppercase tracking-widest text-stone-400">
									από — no change
								</p>
								{col(noChange, false)}
							</div>
						</div>
					);
				})()}
			</div>
		</CollapsibleSection>
	</section>
);
