import { ArrowRight } from "lucide-react";
import type React from "react";
import { Link } from "react-router";
import { Card } from "@/components/Card";
import { CollapsibleSection } from "@/components/CollapsibleSection";
import { ContentSection } from "@/components/ContentSection";
import { MonoText } from "@/components/MonoText";
import { SectionHeading } from "@/components/SectionHeading";
import { ARTICLE_AGREEMENT_QUICK_REF } from "@/constants/agreement";

const ArticleQuickLookup: React.FC = () => (
	<Card variant="bordered" padding="md" className="bg-ocean-50/30">
		<div className="grid md:grid-cols-2 gap-4">
			<div>
				<div className="text-xs font-medium text-stone-600 mb-2">Singular</div>
				<table className="w-full text-sm">
					<thead>
						<tr className="border-b border-stone-200">
							<th className="text-left py-1 pr-2 text-stone-600 font-medium w-12" />
							<th className="text-left py-1 px-2 text-gender-masculine font-medium">
								M
							</th>
							<th className="text-left py-1 px-2 text-gender-feminine font-medium">
								F
							</th>
							<th className="text-left py-1 px-2 text-gender-neuter font-medium">
								N
							</th>
						</tr>
					</thead>
					<tbody>
						<tr className="border-b border-stone-100">
							<td className="py-1 pr-2 text-stone-500 text-xs">Nom</td>
							<td className="py-1 px-2">
								<MonoText size="sm">
									{ARTICLE_AGREEMENT_QUICK_REF.singular.masculine.nom}
								</MonoText>
							</td>
							<td className="py-1 px-2">
								<MonoText size="sm">
									{ARTICLE_AGREEMENT_QUICK_REF.singular.feminine.nom}
								</MonoText>
							</td>
							<td className="py-1 px-2">
								<MonoText size="sm">
									{ARTICLE_AGREEMENT_QUICK_REF.singular.neuter.nom}
								</MonoText>
							</td>
						</tr>
						<tr className="border-b border-stone-100">
							<td className="py-1 pr-2 text-stone-500 text-xs">Acc</td>
							<td className="py-1 px-2">
								<MonoText size="sm">
									{ARTICLE_AGREEMENT_QUICK_REF.singular.masculine.acc}
								</MonoText>
							</td>
							<td className="py-1 px-2">
								<MonoText size="sm">
									{ARTICLE_AGREEMENT_QUICK_REF.singular.feminine.acc}
								</MonoText>
							</td>
							<td className="py-1 px-2">
								<MonoText size="sm">
									{ARTICLE_AGREEMENT_QUICK_REF.singular.neuter.acc}
								</MonoText>
							</td>
						</tr>
						<tr>
							<td className="py-1 pr-2 text-stone-500 text-xs">Gen</td>
							<td className="py-1 px-2">
								<MonoText size="sm">
									{ARTICLE_AGREEMENT_QUICK_REF.singular.masculine.gen}
								</MonoText>
							</td>
							<td className="py-1 px-2">
								<MonoText size="sm">
									{ARTICLE_AGREEMENT_QUICK_REF.singular.feminine.gen}
								</MonoText>
							</td>
							<td className="py-1 px-2">
								<MonoText size="sm">
									{ARTICLE_AGREEMENT_QUICK_REF.singular.neuter.gen}
								</MonoText>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div>
				<div className="text-xs font-medium text-stone-600 mb-2">Plural</div>
				<table className="w-full text-sm">
					<thead>
						<tr className="border-b border-stone-200">
							<th className="text-left py-1 pr-2 text-stone-600 font-medium w-12" />
							<th className="text-left py-1 px-2 text-gender-masculine font-medium">
								M
							</th>
							<th className="text-left py-1 px-2 text-gender-feminine font-medium">
								F
							</th>
							<th className="text-left py-1 px-2 text-gender-neuter font-medium">
								N
							</th>
						</tr>
					</thead>
					<tbody>
						<tr className="border-b border-stone-100">
							<td className="py-1 pr-2 text-stone-500 text-xs">Nom</td>
							<td className="py-1 px-2">
								<MonoText size="sm">
									{ARTICLE_AGREEMENT_QUICK_REF.plural.masculine.nom}
								</MonoText>
							</td>
							<td className="py-1 px-2">
								<MonoText size="sm">
									{ARTICLE_AGREEMENT_QUICK_REF.plural.feminine.nom}
								</MonoText>
							</td>
							<td className="py-1 px-2">
								<MonoText size="sm">
									{ARTICLE_AGREEMENT_QUICK_REF.plural.neuter.nom}
								</MonoText>
							</td>
						</tr>
						<tr className="border-b border-stone-100">
							<td className="py-1 pr-2 text-stone-500 text-xs">Acc</td>
							<td className="py-1 px-2">
								<MonoText size="sm">
									{ARTICLE_AGREEMENT_QUICK_REF.plural.masculine.acc}
								</MonoText>
							</td>
							<td className="py-1 px-2">
								<MonoText size="sm">
									{ARTICLE_AGREEMENT_QUICK_REF.plural.feminine.acc}
								</MonoText>
							</td>
							<td className="py-1 px-2">
								<MonoText size="sm">
									{ARTICLE_AGREEMENT_QUICK_REF.plural.neuter.acc}
								</MonoText>
							</td>
						</tr>
						<tr>
							<td className="py-1 pr-2 text-stone-500 text-xs">Gen</td>
							<td className="py-1 px-2">
								<MonoText size="sm">
									{ARTICLE_AGREEMENT_QUICK_REF.plural.masculine.gen}
								</MonoText>
							</td>
							<td className="py-1 px-2">
								<MonoText size="sm">
									{ARTICLE_AGREEMENT_QUICK_REF.plural.feminine.gen}
								</MonoText>
							</td>
							<td className="py-1 px-2">
								<MonoText size="sm">
									{ARTICLE_AGREEMENT_QUICK_REF.plural.neuter.gen}
								</MonoText>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<p className="text-xs text-stone-500 mt-3">
			Need to identify gender?{" "}
			<Link to="/reference/nouns" className="text-olive-600 hover:underline">
				Check noun endings →
			</Link>
		</p>
	</Card>
);

const PrepositionContractions: React.FC = () => (
	<ContentSection title="σε + article contractions" colorScheme="ocean">
		<div className="p-4">
			<p className="text-sm text-stone-600 mb-3">
				The preposition{" "}
				<MonoText variant="greek" size="sm">
					σε
				</MonoText>{" "}
				(to/at/in) contracts with the article:
			</p>
			<div className="grid grid-cols-3 gap-2 text-sm">
				<div className="p-2 bg-stone-50 rounded border text-center">
					<div className="text-stone-500 text-xs mb-1">σε + τον</div>
					<MonoText variant="greek">στον</MonoText>
				</div>
				<div className="p-2 bg-stone-50 rounded border text-center">
					<div className="text-stone-500 text-xs mb-1">σε + την</div>
					<MonoText variant="greek">στην</MonoText>
				</div>
				<div className="p-2 bg-stone-50 rounded border text-center">
					<div className="text-stone-500 text-xs mb-1">σε + το</div>
					<MonoText variant="greek">στο</MonoText>
				</div>
				<div className="p-2 bg-stone-50 rounded border text-center">
					<div className="text-stone-500 text-xs mb-1">σε + τους</div>
					<MonoText variant="greek">στους</MonoText>
				</div>
				<div className="p-2 bg-stone-50 rounded border text-center">
					<div className="text-stone-500 text-xs mb-1">σε + τις</div>
					<MonoText variant="greek">στις</MonoText>
				</div>
				<div className="p-2 bg-stone-50 rounded border text-center">
					<div className="text-stone-500 text-xs mb-1">σε + τα</div>
					<MonoText variant="greek">στα</MonoText>
				</div>
			</div>
		</div>
	</ContentSection>
);

const ArticleUsageDifferences: React.FC = () => (
	<ContentSection
		title="When Greek uses articles differently"
		colorScheme="honey"
	>
		<div className="p-4 space-y-3">
			<p className="text-sm text-stone-600">
				Greek uses articles where English doesn't (and vice versa):
			</p>
			<div className="space-y-2">
				<div className="p-2 bg-stone-50 rounded border">
					<MonoText variant="greek" size="sm">
						η αγάπη είναι τυφλή
					</MonoText>
					<span className="text-stone-500 text-sm ml-2">
						Abstract nouns need the article
					</span>
				</div>
				<div className="p-2 bg-stone-50 rounded border">
					<MonoText variant="greek" size="sm">
						είναι γιατρός
					</MonoText>
					<span className="text-stone-500 text-sm ml-2">
						Professions after είμαι: no article
					</span>
				</div>
				<div className="p-2 bg-stone-50 rounded border">
					<MonoText variant="greek" size="sm">
						ο φίλος μου
					</MonoText>
					<span className="text-stone-500 text-sm ml-2">
						Possessives use definite article (not "a friend of mine")
					</span>
				</div>
				<div className="p-2 bg-stone-50 rounded border">
					<MonoText variant="greek" size="sm">
						η Ελλάδα
					</MonoText>
					<span className="text-stone-500 text-sm ml-2">
						Countries and proper nouns take the article
					</span>
				</div>
			</div>
		</div>
	</ContentSection>
);

const MovableNuQuickWin: React.FC = () => (
	<ContentSection title="The -ν on τον/την" colorScheme="olive">
		<div className="p-4 space-y-3">
			<div className="p-3 bg-correct-100 rounded-lg border border-correct-300">
				<div className="text-sm font-medium text-correct mb-1">
					The simple rule
				</div>
				<p className="text-sm text-stone-600">
					Always keep the -ν on{" "}
					<MonoText variant="greek" size="sm">
						τον/την/στον/στην
					</MonoText>
					. Native speakers sometimes drop it, but keeping it is never wrong.
				</p>
			</div>
			<CollapsibleSection
				title="When do natives drop it?"
				colorScheme="default"
				defaultOpen={false}
			>
				<div className="p-3 text-sm text-stone-600 space-y-2">
					<p>
						Keep the -ν before vowels and κ, π, τ, ξ, ψ, γκ, μπ, ντ. Drop it
						before other consonants (μ, δ, θ, etc.).
					</p>
					<div className="grid md:grid-cols-2 gap-3">
						<div>
							<div className="font-medium text-correct mb-1">Keep -ν:</div>
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
							<div className="font-medium text-incorrect mb-1">Drop -ν:</div>
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
	</ContentSection>
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

			<Card variant="bordered" padding="md" className="bg-stone-50">
				<div className="flex items-center justify-between">
					<div>
						<div className="text-sm font-medium text-stone-700">
							How noun endings change
						</div>
						<p className="text-xs text-stone-500">
							See declension patterns by gender
						</p>
					</div>
					<Link
						to="/reference/nouns"
						className="flex items-center gap-1 text-sm text-olive-600 hover:text-olive-700"
					>
						Nouns <ArrowRight size={14} />
					</Link>
				</div>
			</Card>
		</section>
	);
};
