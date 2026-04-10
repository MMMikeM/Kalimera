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
		<div className="grid gap-4 md:grid-cols-2">
			<div>
				<div className="mb-2 text-xs font-medium text-stone-600">Singular</div>
				<table className="w-full text-sm">
					<thead>
						<tr className="border-b border-stone-200">
							<th className="w-12 py-1 pr-2 text-left font-medium text-stone-600" />
							<th className="px-2 py-1 text-left font-medium text-gender-masculine">
								M
							</th>
							<th className="px-2 py-1 text-left font-medium text-gender-feminine">
								F
							</th>
							<th className="px-2 py-1 text-left font-medium text-gender-neuter">
								N
							</th>
						</tr>
					</thead>
					<tbody>
						<tr className="border-b border-stone-100">
							<td className="py-1 pr-2 text-xs text-stone-500">Nom</td>
							<td className="px-2 py-1">
								<MonoText size="sm">
									{ARTICLE_AGREEMENT_QUICK_REF.singular.masculine.nom}
								</MonoText>
							</td>
							<td className="px-2 py-1">
								<MonoText size="sm">
									{ARTICLE_AGREEMENT_QUICK_REF.singular.feminine.nom}
								</MonoText>
							</td>
							<td className="px-2 py-1">
								<MonoText size="sm">
									{ARTICLE_AGREEMENT_QUICK_REF.singular.neuter.nom}
								</MonoText>
							</td>
						</tr>
						<tr className="border-b border-stone-100">
							<td className="py-1 pr-2 text-xs text-stone-500">Acc</td>
							<td className="px-2 py-1">
								<MonoText size="sm">
									{ARTICLE_AGREEMENT_QUICK_REF.singular.masculine.acc}
								</MonoText>
							</td>
							<td className="px-2 py-1">
								<MonoText size="sm">
									{ARTICLE_AGREEMENT_QUICK_REF.singular.feminine.acc}
								</MonoText>
							</td>
							<td className="px-2 py-1">
								<MonoText size="sm">
									{ARTICLE_AGREEMENT_QUICK_REF.singular.neuter.acc}
								</MonoText>
							</td>
						</tr>
						<tr>
							<td className="py-1 pr-2 text-xs text-stone-500">Gen</td>
							<td className="px-2 py-1">
								<MonoText size="sm">
									{ARTICLE_AGREEMENT_QUICK_REF.singular.masculine.gen}
								</MonoText>
							</td>
							<td className="px-2 py-1">
								<MonoText size="sm">
									{ARTICLE_AGREEMENT_QUICK_REF.singular.feminine.gen}
								</MonoText>
							</td>
							<td className="px-2 py-1">
								<MonoText size="sm">
									{ARTICLE_AGREEMENT_QUICK_REF.singular.neuter.gen}
								</MonoText>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div>
				<div className="mb-2 text-xs font-medium text-stone-600">Plural</div>
				<table className="w-full text-sm">
					<thead>
						<tr className="border-b border-stone-200">
							<th className="w-12 py-1 pr-2 text-left font-medium text-stone-600" />
							<th className="px-2 py-1 text-left font-medium text-gender-masculine">
								M
							</th>
							<th className="px-2 py-1 text-left font-medium text-gender-feminine">
								F
							</th>
							<th className="px-2 py-1 text-left font-medium text-gender-neuter">
								N
							</th>
						</tr>
					</thead>
					<tbody>
						<tr className="border-b border-stone-100">
							<td className="py-1 pr-2 text-xs text-stone-500">Nom</td>
							<td className="px-2 py-1">
								<MonoText size="sm">
									{ARTICLE_AGREEMENT_QUICK_REF.plural.masculine.nom}
								</MonoText>
							</td>
							<td className="px-2 py-1">
								<MonoText size="sm">
									{ARTICLE_AGREEMENT_QUICK_REF.plural.feminine.nom}
								</MonoText>
							</td>
							<td className="px-2 py-1">
								<MonoText size="sm">
									{ARTICLE_AGREEMENT_QUICK_REF.plural.neuter.nom}
								</MonoText>
							</td>
						</tr>
						<tr className="border-b border-stone-100">
							<td className="py-1 pr-2 text-xs text-stone-500">Acc</td>
							<td className="px-2 py-1">
								<MonoText size="sm">
									{ARTICLE_AGREEMENT_QUICK_REF.plural.masculine.acc}
								</MonoText>
							</td>
							<td className="px-2 py-1">
								<MonoText size="sm">
									{ARTICLE_AGREEMENT_QUICK_REF.plural.feminine.acc}
								</MonoText>
							</td>
							<td className="px-2 py-1">
								<MonoText size="sm">
									{ARTICLE_AGREEMENT_QUICK_REF.plural.neuter.acc}
								</MonoText>
							</td>
						</tr>
						<tr>
							<td className="py-1 pr-2 text-xs text-stone-500">Gen</td>
							<td className="px-2 py-1">
								<MonoText size="sm">
									{ARTICLE_AGREEMENT_QUICK_REF.plural.masculine.gen}
								</MonoText>
							</td>
							<td className="px-2 py-1">
								<MonoText size="sm">
									{ARTICLE_AGREEMENT_QUICK_REF.plural.feminine.gen}
								</MonoText>
							</td>
							<td className="px-2 py-1">
								<MonoText size="sm">
									{ARTICLE_AGREEMENT_QUICK_REF.plural.neuter.gen}
								</MonoText>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<p className="mt-3 text-xs text-stone-500">
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
			<p className="mb-3 text-sm text-stone-600">
				The preposition{" "}
				<MonoText variant="greek" size="sm">
					σε
				</MonoText>{" "}
				(to/at/in) contracts with the article:
			</p>
			<div className="grid grid-cols-3 gap-2 text-sm">
				<div className="rounded border bg-stone-50 p-2 text-center">
					<div className="mb-1 text-xs text-stone-500">σε + τον</div>
					<MonoText variant="greek">στον</MonoText>
				</div>
				<div className="rounded border bg-stone-50 p-2 text-center">
					<div className="mb-1 text-xs text-stone-500">σε + την</div>
					<MonoText variant="greek">στην</MonoText>
				</div>
				<div className="rounded border bg-stone-50 p-2 text-center">
					<div className="mb-1 text-xs text-stone-500">σε + το</div>
					<MonoText variant="greek">στο</MonoText>
				</div>
				<div className="rounded border bg-stone-50 p-2 text-center">
					<div className="mb-1 text-xs text-stone-500">σε + τους</div>
					<MonoText variant="greek">στους</MonoText>
				</div>
				<div className="rounded border bg-stone-50 p-2 text-center">
					<div className="mb-1 text-xs text-stone-500">σε + τις</div>
					<MonoText variant="greek">στις</MonoText>
				</div>
				<div className="rounded border bg-stone-50 p-2 text-center">
					<div className="mb-1 text-xs text-stone-500">σε + τα</div>
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
		<div className="space-y-3 p-4">
			<p className="text-sm text-stone-600">
				Greek uses articles where English doesn't (and vice versa):
			</p>
			<div className="space-y-2">
				<div className="rounded border bg-stone-50 p-2">
					<MonoText variant="greek" size="sm">
						η αγάπη είναι τυφλή
					</MonoText>
					<span className="ml-2 text-sm text-stone-500">
						Abstract nouns need the article
					</span>
				</div>
				<div className="rounded border bg-stone-50 p-2">
					<MonoText variant="greek" size="sm">
						είναι γιατρός
					</MonoText>
					<span className="ml-2 text-sm text-stone-500">
						Professions after είμαι: no article
					</span>
				</div>
				<div className="rounded border bg-stone-50 p-2">
					<MonoText variant="greek" size="sm">
						ο φίλος μου
					</MonoText>
					<span className="ml-2 text-sm text-stone-500">
						Possessives use definite article (not "a friend of mine")
					</span>
				</div>
				<div className="rounded border bg-stone-50 p-2">
					<MonoText variant="greek" size="sm">
						η Ελλάδα
					</MonoText>
					<span className="ml-2 text-sm text-stone-500">
						Countries and proper nouns take the article
					</span>
				</div>
			</div>
		</div>
	</ContentSection>
);

const MovableNuQuickWin: React.FC = () => (
	<ContentSection title="The -ν on τον/την" colorScheme="olive">
		<div className="space-y-3 p-4">
			<div className="bg-correct-100 border-correct-300 rounded-lg border p-3">
				<div className="mb-1 text-sm font-medium text-correct">
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
				colorScheme="stone"
				defaultOpen={false}
			>
				<div className="space-y-2 p-3 text-sm text-stone-600">
					<p>
						Keep the -ν before vowels and κ, π, τ, ξ, ψ, γκ, μπ, ντ. Drop it
						before other consonants (μ, δ, θ, etc.).
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
