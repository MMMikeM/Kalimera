import { cn } from "tailwind-variants";
import type React from "react";

import { Callout } from "@/components/cards/Callout";
import { LookupCard } from "@/components/cards/LookupCard";
import { NextStepCard } from "@/components/cards/NextStepCard";
import { ARTICLE_AGREEMENT_QUICK_REF } from "@/constants/agreement";

import { BandHeading } from "./BandHeading";
import { CaseTableGrid } from "./case-table";
import { HomographCallout } from "./homograph-callout";
import { GreekText } from "@/components/GreekText";

interface UsageNote {
	before?: string;
	article: string;
	after: string;
	english: string;
	note: string;
}

// Greek reaches for the article in five places English refuses it, and drops it in one
// place English keeps it. Forming the article is a lookup; deploying it is the error.
// `article` is split out so the row can carry the target morpheme at heavier weight.
const GREEK_ADDS: UsageNote[] = [
	{
		article: "η",
		after: " Ελλάδα",
		english: "Greece",
		note: "Countries, and first names in speech (ο Γιάννης)",
	},
	{
		article: "η",
		after: " αγάπη είναι τυφλή",
		english: "love is blind",
		note: "Abstract nouns",
	},
	{
		article: "ο",
		after: " φίλος μου",
		english: "my friend",
		note: "Possessives keep the article, never 'a friend of mine'",
	},
	{
		before: "μου αρέσουν ",
		article: "οι",
		after: " γάτες",
		english: "I like cats",
		note: "Whole categories, stated in the plural",
	},
	{
		article: "το",
		after: " Σάββατο",
		english: "on Saturday",
		note: "Days and dates",
	},
];

interface NuRuleColumn {
	label: string;
	membership: string;
	/** The keep branch keeps the colour and the bold -ν; the drop branch loses both. */
	keeps: boolean;
	examples: [greek: string, gloss: string][];
}

const NU_RULE_COLUMNS: NuRuleColumn[] = [
	{
		label: "Keep -ν",
		membership: "short bursts: vowels, and the κ, π, τ family (ξ, ψ, γκ, μπ, ντ)",
		keeps: true,
		examples: [
			["την άνοιξη", "before vowel"],
			["στην πόρτα", "before π"],
			["δεν πάω", "before π"],
		],
	},
	{
		label: "Drop -ν",
		membership: "stretchable sounds: β, γ, δ, ζ, θ, λ, μ, ν, ρ, σ, φ, χ",
		keeps: false,
		examples: [
			["τη μητέρα", "before μ"],
			["στη θάλασσα", "before θ"],
			["δε θέλω", "before θ"],
		],
	},
];

// The first word of every keep example ends in the -ν being taught; the weight
// goes on that one letter so the eye lands on the morpheme, not the phrase.
const boldFinalNu = (greek: string) => {
	const [word = "", ...rest] = greek.split(" ");
	return (
		<>
			{word.slice(0, -1)}
			<span className="font-bold">ν</span>
			{rest.length ? ` ${rest.join(" ")}` : null}
		</>
	);
};

const UsageRow = ({ row }: { row: UsageNote }) => (
	<li className="px-5 py-3.5">
		<div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
			<GreekText tone="default" size="xl">
				{row.before}
				<span className="font-bold">{row.article}</span>
				{row.after}
			</GreekText>
			<span className="text-sm text-stone-500 italic">{row.english}</span>
		</div>
		<p className="mt-0.5 text-xs text-stone-500">{row.note}</p>
	</li>
);

export const ArticlesSection: React.FC = () => {
	return (
		<section id="articles" className="space-y-16">
			{/* BAND 1 — CONCEPT (forming the article is a lookup; deploying it is the skill) */}
			<div className="space-y-6">
				<BandHeading
					kicker="Usage"
					title="Where Greek and English disagree"
					lede="Greek puts an article where English refuses one, in front of countries, abstract nouns, whole categories, even your own friend."
				/>
				{/* eslint-disable-next-line better-tailwindcss/no-restricted-classes -- 60/40 layout, no token fit */}
				<div className="grid gap-4 lg:grid-cols-[3fr_2fr] lg:items-start">
					<LookupCard scheme="decision" chip="Greek adds it" eyebrow="English doesn't">
						<ul className="divide-y divide-honey-200">
							{GREEK_ADDS.map((row) => (
								<UsageRow key={row.article + row.after} row={row} />
							))}
						</ul>
					</LookupCard>
					<LookupCard scheme="neutral" chip="Greek drops it" eyebrow="English keeps it">
						<div className="px-5 py-5">
							<GreekText tone="default" size="2xl" className="block leading-snug">
								είναι γιατρός
							</GreekText>
							<p className="mt-1 text-sm text-stone-500 italic">he is a doctor</p>
							<p className="mt-4 max-w-prose text-sm leading-relaxed text-stone-600">
								Professions after <GreekText tone="default" size="sm">είμαι</GreekText> take no
								article at all.
							</p>
						</div>
					</LookupCard>
				</div>
			</div>

			{/* BAND 2 — LOOKUP (the form tables and the spelling rules) */}
			<div className="space-y-6">
				<BandHeading
					kicker="Lookup"
					title="Every form, and how it's spelled"
					lede="The preposition σε fuses with these forms (στο, στη, στον…). See Prepositions for the full breakdown."
				/>

				<LookupCard scheme="neutral" chip="Forms" eyebrow="Gender across, case down">
					<div className="px-5 pt-5 pb-5">
						<CaseTableGrid data={ARTICLE_AGREEMENT_QUICK_REF} hero />
					</div>
				</LookupCard>

				<Callout scheme="neutral" title="The -ν on τη(ν) / δε(ν) / μη(ν)">
					<p className="leading-relaxed text-stone-700">
						Native speakers sometimes drop the <GreekText tone="default" size="sm">-ν</GreekText> on
						certain articles depending on what sound follows it, in order to improve the flow of
						pronunciation.
					</p>
					<p className="leading-relaxed text-stone-700">
						Although there are more cases where it's dropped than kept, it is not wrong to defer to
						keeping it.
					</p>
					<div className="space-y-3 border-t border-stone-200 pt-3 text-sm text-stone-600">
						<p>
							A hard stop like /p/, /b/, /k/ or /g/ keeps the{" "}
							<GreekText tone="default" size="sm">-ν</GreekText>, which naturally blends into it:{" "}
							<GreekText tone="accent" size="sm">την πόρτα</GreekText> flows out as
							&ldquo;tim&#8209;bórta&rdquo;.
						</p>
						<p>
							A sound you can stretch out drops it:{" "}
							<GreekText tone="accent" size="sm">τη μητέρα</GreekText> flows out as
							&ldquo;ti&#8209;mitéra&rdquo;, a <GreekText tone="default" size="sm">ν</GreekText>{" "}
							would only clog the μ. The negatives{" "}
							<GreekText tone="default" size="sm">δεν</GreekText> and{" "}
							<GreekText tone="default" size="sm">μην</GreekText> follow the same rule.
						</p>
						<div className="grid gap-4 md:grid-cols-2">
							{NU_RULE_COLUMNS.map((column) => (
								<div
									key={column.label}
									className={cn(
										"overflow-hidden rounded-lg border",
										column.keeps ? "border-navy-200" : "border-stone-200",
									)}
								>
									<div
										className={cn(
											"px-4 py-2.5",
											column.keeps ? "bg-navy-100" : "bg-stone-100",
										)}
									>
										<div
											className={cn(
												"font-semibold",
												column.keeps ? "text-navy-text" : "text-stone-700",
											)}
										>
											{column.label}
										</div>
										<p className="mt-0.5 text-xs text-stone-600">{column.membership}</p>
									</div>
									<ul
										className={cn(
											"divide-y",
											column.keeps ? "divide-navy-100" : "divide-stone-100",
										)}
									>
										{column.examples.map(([greek, gloss]) => (
											<li key={greek} className="flex flex-wrap items-baseline gap-x-3 px-4 py-2">
												<GreekText tone="default" size="base">
													{column.keeps ? boldFinalNu(greek) : greek}
												</GreekText>
												<span className="text-xs text-stone-500">{gloss}</span>
											</li>
										))}
									</ul>
								</div>
							))}
						</div>
						<p>
							Masculine <GreekText tone="default" size="sm">τον</GreekText> is the odd one out: it
							keeps its <GreekText tone="default" size="sm">-ν</GreekText> everywhere,{" "}
							<GreekText tone="accent" size="sm">τον φίλο</GreekText>, never{" "}
							<GreekText tone="incorrect" size="sm">το φίλο</GreekText>, because the{" "}
							<GreekText tone="default" size="sm">-ν</GreekText> is all that separates it from
							neuter <GreekText tone="default" size="sm">το</GreekText>.
						</p>
					</div>
				</Callout>

				<HomographCallout id="article-or-pronoun" />
			</div>

			{/* BAND 3 — HANDOFF */}
			<div className="space-y-6 border-t border-stone-200 pt-12">
				<BandHeading
					kicker="Next"
					title="You can read articles. Now read nouns."
					lede="The article signals gender and case. Nouns carry their own endings that reinforce the signal."
				/>
				<div className="grid gap-3 md:grid-cols-2">
					<NextStepCard
						to="/reference/nouns"
						kicker="Continue"
						title="Nouns"
						description="How noun endings change across gender and case"
						emphasis
					/>
					<NextStepCard
						to="/reference/cases"
						kicker="Review"
						title="Cases"
						description="What each case is for"
					/>
				</div>
			</div>
		</section>
	);
};
