import type React from "react";
import { Link } from "react-router";

import { NextStepCard, TeachingCard } from "@/components/cards";
import { CollapsibleSection } from "@/components/CollapsibleSection";
import { MonoText } from "@/components/MonoText";
import { SectionHeading } from "@/components/SectionHeading";
import { ARTICLE_AGREEMENT_QUICK_REF } from "@/constants/agreement";

import { CaseTableGrid } from "./CaseTable";

const ArticleQuickLookup: React.FC = () => (
	<TeachingCard
		scheme="neutral"
		tone="full"
		eyebrow="Quick lookup"
		title="Article by gender and case"
		description="The single most important table on this page."
		footer={
			<p className="text-xs text-stone-500">
				Need to identify gender?{" "}
				<Link to="/reference/nouns" className="text-stone-600 underline hover:text-stone-800">
					Check noun endings →
				</Link>
			</p>
		}
	>
		<CaseTableGrid data={ARTICLE_AGREEMENT_QUICK_REF} />
	</TeachingCard>
);

const PrepositionContractions: React.FC = () => (
	<TeachingCard
		scheme="neutral"
		tone="soft"
		eyebrow="Contractions"
		title={
			<>
				<MonoText variant="greek" size="lg">
					σε
				</MonoText>{" "}
				+ article
			</>
		}
		description="The preposition σε (to/at/in) fuses with the article."
	>
		<div className="grid grid-cols-3 gap-2 text-sm">
			{[
				["σε + τον", "στον"],
				["σε + την", "στην"],
				["σε + το", "στο"],
				["σε + τους", "στους"],
				["σε + τις", "στις"],
				["σε + τα", "στα"],
			].map(([from, to]) => (
				<div key={from} className="rounded border border-stone-200 bg-white p-2 text-center">
					<div className="mb-1 text-xs text-stone-500">{from}</div>
					<MonoText variant="greek">{to}</MonoText>
				</div>
			))}
		</div>
	</TeachingCard>
);

const ArticleUsageDifferences: React.FC = () => (
	<TeachingCard
		scheme="neutral"
		tone="soft"
		eyebrow="Usage"
		title="When Greek uses articles differently"
		description="Greek uses articles where English doesn't, and vice versa."
	>
		<div className="space-y-2">
			{[
				{ greek: "η αγάπη είναι τυφλή", note: "Abstract nouns need the article" },
				{ greek: "είναι γιατρός", note: "Professions after είμαι: no article" },
				{
					greek: "ο φίλος μου",
					note: "Possessives use definite article (not 'a friend of mine')",
				},
				{ greek: "η Ελλάδα", note: "Countries and proper nouns take the article" },
			].map((row) => (
				<div key={row.greek} className="rounded border border-stone-200 bg-white p-2">
					<MonoText variant="greek" size="sm">
						{row.greek}
					</MonoText>
					<span className="ml-2 text-sm text-stone-500">{row.note}</span>
				</div>
			))}
		</div>
	</TeachingCard>
);

const MovableNuQuickWin: React.FC = () => (
	<TeachingCard
		scheme="neutral"
		tone="soft"
		eyebrow="Quick win"
		title="The -ν on τον / την"
		description="Always keep the -ν. Native speakers sometimes drop it, but keeping it is never wrong."
	>
		<div className="space-y-3">
			<div className="bg-correct-100 border-correct-300 rounded-lg border p-3">
				<p className="text-sm text-stone-600">
					Safe default:{" "}
					<MonoText variant="greek" size="sm">
						τον/την/στον/στην
					</MonoText>
					.
				</p>
			</div>
			<CollapsibleSection title="When do natives drop it?" colorScheme="stone" defaultOpen={false}>
				<div className="space-y-2 p-3 text-sm text-stone-600">
					<p>
						Keep the -ν before vowels and κ, π, τ, ξ, ψ, γκ, μπ, ντ. Drop it before other consonants
						(μ, δ, θ, etc.).
					</p>
					<div className="grid gap-3 md:grid-cols-2">
						<div>
							<div className="mb-1 font-medium text-correct">Keep -ν:</div>
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
							<div className="mb-1 font-medium text-incorrect">Drop -ν:</div>
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
		</div>
	</TeachingCard>
);

export const ArticlesSection: React.FC = () => {
	return (
		<section id="articles" className="space-y-6">
			<SectionHeading
				title="The Definite Article"
				subtitle="Greek articles change to match their noun's gender, case, and number"
			/>

			<ArticleQuickLookup />

			<MovableNuQuickWin />

			<PrepositionContractions />

			<ArticleUsageDifferences />

			<NextStepCard
				to="/reference/nouns"
				kicker="Next"
				title="Nouns"
				description="How noun endings change across gender and case"
			/>
		</section>
	);
};
