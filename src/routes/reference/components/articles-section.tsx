import { Lightbulb } from "lucide-react";
import type React from "react";
import { Card } from "@/components/Card";
import { CollapsibleSection } from "@/components/CollapsibleSection";
import { ContentSection } from "@/components/ContentSection";
import { MistakeComparison } from "@/components/MistakeComparison";
import { MonoText } from "@/components/MonoText";
import { SectionHeading } from "@/components/SectionHeading";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
	AGREEMENT_MISTAKES,
	ARTICLE_AGREEMENT_QUICK_REF,
} from "@/constants/agreement";
import { MOVABLE_NU_RULE } from "@/constants/articles";
import { GENDER_HINTS } from "@/constants/nouns";

const GenderHintsCompact: React.FC = () => (
	<Card variant="bordered" padding="md">
		<div className="text-sm font-medium text-stone-700 mb-2">
			Spot gender by noun ending:
		</div>
		<div className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
			<div className="flex items-center gap-2">
				<span className="w-2 h-2 rounded-full bg-gender-masculine" />
				<span className="text-stone-600">Masculine:</span>
				<span className="text-stone-800">
					{GENDER_HINTS.masculine.endings.join(", ")}
				</span>
			</div>
			<div className="flex items-center gap-2">
				<span className="w-2 h-2 rounded-full bg-gender-feminine" />
				<span className="text-stone-600">Feminine:</span>
				<span className="text-stone-800">
					{GENDER_HINTS.feminine.endings.join(", ")}
				</span>
			</div>
			<div className="flex items-center gap-2">
				<span className="w-2 h-2 rounded-full bg-gender-neuter" />
				<span className="text-stone-600">Neuter:</span>
				<span className="text-stone-800">
					{GENDER_HINTS.neuter.endings.join(", ")}
				</span>
			</div>
		</div>
	</Card>
);

const ArticleQuickLookup: React.FC = () => (
	<CollapsibleSection
		title="Article Quick Lookup (ο, η, το, τον, την...)"
		colorScheme="ocean"
		defaultOpen={true}
	>
		<div className="grid md:grid-cols-2 gap-4">
			<Card variant="bordered" padding="sm">
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
			</Card>
			<Card variant="bordered" padding="sm">
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
			</Card>
		</div>
	</CollapsibleSection>
);

export const ArticlesSection: React.FC = () => {
	const genderMistakes = AGREEMENT_MISTAKES.filter(
		(m) => m.category === "gender",
	);

	return (
		<section id="articles" className="space-y-6">
			<SectionHeading
				title="The Definite Article"
				subtitle="Greek articles change to match their noun's gender, case, and number"
			/>

			<Alert variant="info">
				<Lightbulb size={16} />
				<AlertTitle>The Core Pattern</AlertTitle>
				<AlertDescription>
					In Greek, the article must <strong>agree</strong> with its noun in
					three ways: gender (masculine/feminine/neuter), case
					(nominative/accusative/genitive), and number (singular/plural). This
					is why "the" has so many forms!
				</AlertDescription>
			</Alert>

			<GenderHintsCompact />

			<ArticleQuickLookup />

			<ContentSection title="When uncertain, use the -ν form" colorScheme="honey">
				<div className="p-3 space-y-3">
					<p className="text-sm text-stone-600">
						You'll never be wrong if you keep the final ν on τον/την/στον/στην.
					</p>
					<div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
						<div className="text-xs font-semibold text-honey-text uppercase tracking-wide mb-2">
							The simple rule
						</div>
						<p className="text-sm text-stone-600 mb-2">
							For{" "}
							<MonoText variant="greek" size="sm">
								τον/την
							</MonoText>{" "}
							and{" "}
							<MonoText variant="greek" size="sm">
								στον/στην
							</MonoText>
							, you can always include the -ν. Native speakers sometimes drop
							it, but keeping it is never wrong.
						</p>
						<div className="text-stone-600 text-sm">
							<MonoText variant="greek" size="sm">
								τον φίλο
							</MonoText>{" "}
							or{" "}
							<MonoText variant="greek" size="sm">
								τη φίλη
							</MonoText>{" "}
							— both correct!
						</div>
					</div>
				</div>
			</ContentSection>

			<CollapsibleSection
				title="Common Gender Mistakes"
				colorScheme="terracotta"
				defaultOpen={false}
			>
				<MistakeComparison mistakes={genderMistakes} title="" />
			</CollapsibleSection>
		</section>
	);
};

export const MovableNuSection: React.FC = () => (
	<section id="movable-nu" className="space-y-6">
		<SectionHeading
			title="The -ν Rule"
			subtitle="Fine-tuning: when to keep or drop final ν on articles"
		/>

		<Card
			variant="elevated"
			padding="lg"
			className="bg-stone-50 border-2 border-stone-200"
		>
			<Alert variant="info" className="mb-6">
				<Lightbulb size={16} />
				<AlertTitle>The Rule</AlertTitle>
				<AlertDescription>{MOVABLE_NU_RULE.rule}</AlertDescription>
			</Alert>
			<div className="grid md:grid-cols-2 gap-6">
				<div className="space-y-4">
					<h4 className="text-lg font-bold text-correct">Keep the -ν</h4>
					<div className="space-y-3">
						{MOVABLE_NU_RULE.examples.keep.map((example) => (
							<div
								key={example.text}
								className="p-3 bg-correct-100 rounded-lg border border-correct-300"
							>
								<MonoText variant="success" size="lg" className="block mb-1">
									{example.text}
								</MonoText>
								<div className="text-olive-text text-sm italic">
									{example.reason}
								</div>
							</div>
						))}
					</div>
				</div>
				<div className="space-y-4">
					<h4 className="text-lg font-bold text-incorrect">Drop the -ν</h4>
					<div className="space-y-3">
						{MOVABLE_NU_RULE.examples.drop.map((example) => (
							<div
								key={example.text}
								className="p-3 bg-incorrect-100 rounded-lg border border-incorrect-300"
							>
								<MonoText variant="error" size="lg" className="block mb-1">
									{example.text}
								</MonoText>
								<div className="text-terracotta-text text-sm italic">
									{example.reason}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</Card>
	</section>
);
