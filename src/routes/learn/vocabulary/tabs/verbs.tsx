import { ArrowRight, Languages } from "lucide-react";
import type React from "react";
import { Link, useOutletContext } from "react-router";
import { ContentSection } from "@/components/ContentSection";
import { CollapsibleSection } from "@/components/CollapsibleSection";
import { MonoText } from "@/components/MonoText";
import { ParadigmTable } from "@/components/ParadigmTable";
import { TabHero } from "@/components/TabHero";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
	IRREGULAR_VERBS,
	VERB_CONJUGATIONS,
	VERB_FAMILIES,
	VERB_PATTERNS,
} from "@/constants/verbs";
import type { VocabularyLoaderData } from "../components/shared";

const VerbList: React.FC<{
	verbs: Array<{ id: number; greek: string; english: string }>;
}> = ({ verbs }) => (
	<div className="grid md:grid-cols-2 gap-3">
		{verbs.map((verb) => (
			<div
				key={verb.id}
				className="flex justify-between items-center p-3 bg-stone-50 rounded-lg border border-stone-200"
			>
				<div className="flex items-baseline gap-2">
					<MonoText variant="greek" size="lg">
						{verb.greek}
					</MonoText>
					<span className="text-stone-600">{verb.english}</span>
				</div>
			</div>
		))}
	</div>
);

export function VerbsTab() {
	const data = useOutletContext<VocabularyLoaderData>();

	return (
		<div className="space-y-6">
			<TabHero
				title="Verbs by family"
				greekPhrase="κάνω, μιλάω, έρχομαι"
				colorScheme="olive"
				icon={<Languages size={18} />}
			>
				Learn one verb from each family and you can conjugate thousands. That's
				not an exaggeration.
			</TabHero>

			<div className="p-3 bg-ocean-100 rounded-lg border border-ocean-300 flex items-center justify-between">
				<span className="text-sm text-stone-700">
					For detailed conjugation patterns and usage examples
				</span>
				<Link
					to="/reference/verbs"
					className="inline-flex items-center gap-1.5 text-sm font-medium text-ocean-text hover:underline"
				>
					See full patterns <ArrowRight size={14} />
				</Link>
			</div>

			{data.verbs.categories.map((category) => {
				const familyConfig = VERB_FAMILIES[category.title];
				const colorScheme = familyConfig?.colorScheme ?? "olive";
				const displayTitle = familyConfig?.displayName ?? category.title;

				if (category.title === "deponent" && category.subCategories) {
					return (
						<ContentSection
							key={category.id}
							title={displayTitle}
							subtitle={`${category.verbs.length} verbs`}
							colorScheme={colorScheme}
						>
							<Alert variant="info" className="mb-4">
								<AlertDescription>
									<strong>Pattern insight:</strong> Just like active verbs have
									-ω and -άω patterns, deponent verbs have -ομαι and -άμαι. Same
									vowel contraction!
								</AlertDescription>
							</Alert>

							<div className="grid md:grid-cols-2 gap-4 mb-4">
								<div className="p-4 bg-olive-50 rounded-lg border border-olive-200">
									<h4 className="font-semibold text-olive-text mb-3">
										Type 1: -ομαι
									</h4>
									<ParadigmTable
										infinitive="έρχομαι"
										meaning="come"
										forms={{
											sg1: VERB_CONJUGATIONS.erhomai?.[0]?.form ?? "",
											sg2: VERB_CONJUGATIONS.erhomai?.[1]?.form ?? "",
											sg3: VERB_CONJUGATIONS.erhomai?.[2]?.form ?? "",
											pl1: VERB_CONJUGATIONS.erhomai?.[3]?.form ?? "",
											pl2: VERB_CONJUGATIONS.erhomai?.[4]?.form ?? "",
											pl3: VERB_CONJUGATIONS.erhomai?.[5]?.form ?? "",
										}}
									/>
								</div>

								<div className="p-4 bg-olive-50 rounded-lg border border-olive-200">
									<h4 className="font-semibold text-olive-text mb-3">
										Type 2: -άμαι
									</h4>
									<ParadigmTable
										infinitive="θυμάμαι"
										meaning="remember"
										forms={{
											sg1: VERB_CONJUGATIONS.thymamai?.[0]?.form ?? "",
											sg2: VERB_CONJUGATIONS.thymamai?.[1]?.form ?? "",
											sg3: VERB_CONJUGATIONS.thymamai?.[2]?.form ?? "",
											pl1: VERB_CONJUGATIONS.thymamai?.[3]?.form ?? "",
											pl2: VERB_CONJUGATIONS.thymamai?.[4]?.form ?? "",
											pl3: VERB_CONJUGATIONS.thymamai?.[5]?.form ?? "",
										}}
									/>
								</div>
							</div>

							<div className="space-y-3">
								{category.subCategories.map((sub) => (
									<CollapsibleSection
										key={sub.pattern}
										title={`${sub.title} (${sub.verbs.length} verbs)`}
										colorScheme="olive"
										defaultOpen={false}
									>
										<VerbList verbs={sub.verbs} />
									</CollapsibleSection>
								))}
							</div>
						</ContentSection>
					);
				}

				if (category.title === "irregular") {
					return (
						<ContentSection
							key={category.id}
							title={displayTitle}
							subtitle={`${category.verbs.length} verbs`}
							colorScheme={colorScheme}
						>
							<div className="grid sm:grid-cols-2 gap-4">
								{IRREGULAR_VERBS.map((verb) => (
									<div
										key={verb.infinitive}
										className="p-4 bg-honey-50 rounded-lg border border-honey-200"
									>
										<ParadigmTable
											infinitive={verb.infinitive}
											meaning={verb.meaning}
											forms={verb.forms}
										/>
										{verb.note && (
											<p className="mt-2 text-sm text-stone-600 italic">
												{verb.note}
											</p>
										)}
									</div>
								))}
							</div>
						</ContentSection>
					);
				}

				const patternKey = familyConfig?.patternKey ?? null;
				const conjugationKey = familyConfig?.conjugationKey ?? null;
				const pattern = patternKey ? VERB_PATTERNS[patternKey] : null;
				const conjugation = conjugationKey
					? VERB_CONJUGATIONS[conjugationKey]
					: null;

				return (
					<ContentSection
						key={category.id}
						title={displayTitle}
						subtitle={`${category.verbs.length} verbs`}
						colorScheme={colorScheme}
					>
						{pattern && conjugation && (
							<div className="mb-4">
								<ParadigmTable
									infinitive={pattern.canonical.infinitive}
									meaning={pattern.canonical.meaning}
									forms={{
										sg1: conjugation[0]?.form ?? "",
										sg2: conjugation[1]?.form ?? "",
										sg3: conjugation[2]?.form ?? "",
										pl1: conjugation[3]?.form ?? "",
										pl2: conjugation[4]?.form ?? "",
										pl3: conjugation[5]?.form ?? "",
									}}
								/>
							</div>
						)}

						<CollapsibleSection
							title={`All ${familyConfig?.shortName ?? category.title}`}
							colorScheme={colorScheme}
							defaultOpen={false}
						>
							<VerbList verbs={category.verbs} />
						</CollapsibleSection>
					</ContentSection>
				);
			})}
		</div>
	);
}
