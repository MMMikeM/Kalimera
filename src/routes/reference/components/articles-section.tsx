import type React from "react";

import { Callout, LookupCard, NextStepCard, TeachingCard } from "@/components/cards";
import { CollapsibleSection } from "@/components/CollapsibleSection";
import { MonoText } from "@/components/MonoText";
import { ARTICLE_AGREEMENT_QUICK_REF } from "@/constants/agreement";
import type { Gender } from "@/db.server/enums";
import { GENDER_SCHEME, SCHEME } from "@/constants/grammar-palette";

import { CaseTableGrid } from "./CaseTable";

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

const USAGE_NOTES: Array<{ greek: string; note: string; gender: Gender | null }> = [
	{ greek: "η αγάπη είναι τυφλή", note: "Abstract nouns need the article", gender: "feminine" },
	{ greek: "είναι γιατρός", note: "Professions after είμαι: no article", gender: null },
	{
		greek: "ο φίλος μου",
		note: "Possessives use the definite article (not 'a friend of mine')",
		gender: "masculine",
	},
	{ greek: "η Ελλάδα", note: "Countries and proper nouns take the article", gender: "feminine" },
];


export const ArticlesSection: React.FC = () => {
	return (
		<section id="articles" className="space-y-16">
			{/* BAND 1 — CONCEPT (the intersection table is the king) */}
			<TeachingCard
				scheme="neutral"
				eyebrow="The table"
				title="One article, six slots."
				description="The definite article changes along two axes: gender (M · F · N) across the columns, case (Nom · Acc · Gen) down the rows. Reading Greek: the article tells you the case. Writing Greek: pick the case first, then find the column for the noun's gender."
			>
				<CaseTableGrid data={ARTICLE_AGREEMENT_QUICK_REF} />
			</TeachingCard>

			{/* BAND 2 — LOOKUP (related reference material) */}
			<div className="space-y-6">
				<BandHeading
					kicker="Related"
					title="Usage notes"
					lede="Where Greek article usage differs from English. The preposition σε fuses with these article forms (στο, στη, στον…) — see Prepositions for the full breakdown."
				/>
				

				<LookupCard scheme="neutral" chip="Usage" eyebrow="When Greek differs from English">
					<div className="space-y-2 px-5 pt-4 pb-4">
						{USAGE_NOTES.map((row) => {
							const style = row.gender ? SCHEME[GENDER_SCHEME[row.gender]] : null;
							return (
								<div
									key={row.greek}
									className="rounded border border-stone-200 bg-white p-2"
								>
									<MonoText variant="greek" size="sm" className={style?.text}>
										{row.greek}
									</MonoText>
									<span className="ml-2 text-sm text-stone-500">{row.note}</span>
								</div>
							);
						})}
					</div>
				</LookupCard>

				<Callout scheme="neutral" title="The -ν on τον / την">
					<p className="leading-relaxed text-stone-700">
						Always keep the <MonoText size="sm">-ν</MonoText>. Native speakers sometimes drop it,
						but keeping it is never wrong.{" "}
						<strong className="text-stone-800">Safe default:</strong>{" "}
						<MonoText size="sm">τον / την / στον / στην</MonoText>.
					</p>
					<CollapsibleSection
						title="When do natives drop it?"
						colorScheme="stone"
						defaultOpen={false}
					>
						<div className="space-y-3 p-3 text-sm text-stone-600">
							<p>
								Keep the <MonoText size="sm">-ν</MonoText> before vowels and κ, π, τ, ξ, ψ, γκ, μπ,
								ντ. Drop it before other consonants (μ, δ, θ, …).
							</p>
							<div className="grid gap-3 md:grid-cols-2">
								<div>
									<div className="mb-1 font-medium text-correct">Keep -ν</div>
									<div className="space-y-1">
										<div>
											<MonoText variant="greek" size="sm">
												τον άντρα
											</MonoText>{" "}
											<span className="text-stone-400">(before vowel)</span>
										</div>
										<div>
											<MonoText variant="greek" size="sm">
												στην πόρτα
											</MonoText>{" "}
											<span className="text-stone-400">(before π)</span>
										</div>
									</div>
								</div>
								<div>
									<div className="mb-1 font-medium text-incorrect">Drop -ν</div>
									<div className="space-y-1">
										<div>
											<MonoText variant="greek" size="sm">
												τη μητέρα
											</MonoText>{" "}
											<span className="text-stone-400">(before μ)</span>
										</div>
										<div>
											<MonoText variant="greek" size="sm">
												στη θάλασσα
											</MonoText>{" "}
											<span className="text-stone-400">(before θ)</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</CollapsibleSection>
				</Callout>
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
