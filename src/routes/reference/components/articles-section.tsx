import type React from "react";

import { Callout, LookupCard, NextStepCard, TeachingCard } from "@/components/cards";
import { CollapsibleSection } from "@/components/CollapsibleSection";
import { ARTICLE_AGREEMENT_QUICK_REF } from "@/constants/agreement";

import { BandHeading } from "./BandHeading";
import { CaseTableGrid } from "./case-table";
import { HomographCallout } from "./homograph-callout";
import { GreekText } from "@/components/GreekText";

interface UsageNote {
	greek: string;
	english: string;
	note: string;
}

// Greek reaches for the article in five places English refuses it, and drops it in one
// place English keeps it. Forming the article is a lookup; deploying it is the error.
const GREEK_ADDS: UsageNote[] = [
	{
		greek: "η Ελλάδα",
		english: "Greece",
		note: "Countries, and first names in speech — ο Γιάννης",
	},
	{
		greek: "η αγάπη είναι τυφλή",
		english: "love is blind",
		note: "Abstract nouns",
	},
	{
		greek: "ο φίλος μου",
		english: "my friend",
		note: "Possessives keep the article — never 'a friend of mine'",
	},
	{
		greek: "μου αρέσουν οι γάτες",
		english: "I like cats",
		note: "Whole categories, stated in the plural",
	},
	{
		greek: "το Σάββατο",
		english: "on Saturday",
		note: "Days and dates",
	},
];

const GREEK_DROPS: UsageNote[] = [
	{
		greek: "είναι γιατρός",
		english: "he is a doctor",
		note: "Professions after είμαι take no article at all",
	},
];

const UsageList = ({ rows, heading }: { rows: UsageNote[]; heading: string }) => (
	<div className="space-y-2">
		<div className="text-xs font-semibold tracking-widest text-stone-500 uppercase">{heading}</div>
		{rows.map((row) => (
			<div key={row.greek} className="rounded border border-stone-200 bg-white p-2">
				<div className="flex flex-wrap items-baseline gap-x-2">
					<GreekText tone="accent" size="sm">
						{row.greek}
					</GreekText>
					<span className="text-sm text-stone-500">{row.english}</span>
				</div>
				<div className="mt-0.5 text-xs text-stone-500">{row.note}</div>
			</div>
		))}
	</div>
);

export const ArticlesSection: React.FC = () => {
	return (
		<section id="articles" className="space-y-16">
			{/* BAND 1 — CONCEPT (forming the article is a lookup; deploying it is the skill) */}
			<TeachingCard
				scheme="neutral"
				eyebrow="The hard part"
				title="Forming it is a lookup. Knowing when to use it is the skill."
				description="Six slots cover every form, and the table below has them all. What actually costs you marks is that Greek puts an article where English refuses one — in front of countries, abstract nouns, whole categories, even your own friend."
			>
				<div className="space-y-4">
					<UsageList rows={GREEK_ADDS} heading="Greek adds it — English doesn't" />
					<UsageList rows={GREEK_DROPS} heading="Greek drops it — English keeps it" />
				</div>
			</TeachingCard>

			{/* BAND 2 — LOOKUP (the form tables and the spelling rules) */}
			<div className="space-y-6">
				<BandHeading
					kicker="Lookup"
					title="Every form, and how it's spelled"
					lede="The preposition σε fuses with these forms (στο, στη, στον…) — see Prepositions for the full breakdown."
				/>

				<LookupCard scheme="neutral" chip="Forms" eyebrow="Gender across, case down">
					<div className="px-5 pt-4 pb-4">
						<CaseTableGrid data={ARTICLE_AGREEMENT_QUICK_REF} />
					</div>
				</LookupCard>

				<Callout scheme="neutral" title="The -ν on τον / την / δεν / μην">
					<p className="leading-relaxed text-stone-700">
						Always keep the <GreekText tone="default" size="sm">-ν</GreekText>. Native speakers sometimes drop it,
						but keeping it is never wrong. <strong className="text-stone-800">Safe default:</strong>{" "}
						<GreekText tone="default" size="sm">τον / την / στον / στην</GreekText>.
					</p>
					<p className="leading-relaxed text-stone-700">
						The same rule governs the negatives:{" "}
						<GreekText tone="default" size="sm">δεν</GreekText> and{" "}
						<GreekText tone="default" size="sm">μην</GreekText> keep or drop their{" "}
						<GreekText tone="default" size="sm">-ν</GreekText> on exactly the same grounds —{" "}
						<GreekText tone="accent" size="sm">δεν πάω</GreekText> but{" "}
						<GreekText tone="accent" size="sm">δε θέλω</GreekText>.
					</p>
					<CollapsibleSection
						title="When do natives drop it?"
						colorScheme="stone"
						defaultOpen={false}
					>
						<div className="space-y-3 p-3 text-sm text-stone-600">
							<p>
								Keep the <GreekText tone="default" size="sm">-ν</GreekText> before vowels and κ, π, τ, ξ, ψ, γκ, μπ,
								ντ. Drop it before other consonants (μ, δ, θ, …).
							</p>
							<div className="grid gap-3 md:grid-cols-2">
								<div>
									<div className="mb-1 font-medium text-correct">Keep -ν</div>
									<div className="space-y-1">
										<div>
											<GreekText tone="accent" size="sm">
												τον άντρα
											</GreekText>{" "}
											<span className="text-stone-400">(before vowel)</span>
										</div>
										<div>
											<GreekText tone="accent" size="sm">
												στην πόρτα
											</GreekText>{" "}
											<span className="text-stone-400">(before π)</span>
										</div>
									</div>
								</div>
								<div>
									<div className="mb-1 font-medium text-incorrect">Drop -ν</div>
									<div className="space-y-1">
										<div>
											<GreekText tone="accent" size="sm">
												τη μητέρα
											</GreekText>{" "}
											<span className="text-stone-400">(before μ)</span>
										</div>
										<div>
											<GreekText tone="accent" size="sm">
												στη θάλασσα
											</GreekText>{" "}
											<span className="text-stone-400">(before θ)</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</CollapsibleSection>
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
