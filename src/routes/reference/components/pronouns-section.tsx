import { Card } from "@/components/Card";
import { CollapsibleSection } from "@/components/CollapsibleSection";
import { ContentSection } from "@/components/ContentSection";
import { MonoText } from "@/components/MonoText";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
	EMPHATIC_PRONOUN_EXAMPLES,
	EMPHATIC_PRONOUNS,
	OBJECT_PRONOUN_EXAMPLES,
	OBJECT_PRONOUNS,
	POSSESSIVE_PRONOUN_EXAMPLES,
	POSSESSIVE_PRONOUNS,
	PRONOUN_PATTERNS,
	PRONOUN_PHRASES,
	SUBJECT_PRONOUN_EXAMPLES,
	SUBJECT_PRONOUNS,
} from "@/constants/pronouns";

import { PronounDecisionGuide } from "./pronoun-decision-guide";
import { PronounParadigmTable } from "./pronoun-paradigm-table";

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

// Group phrases by category
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

export const PronounsSection: React.FC = () => {
	const phraseGroups = groupPhrasesByCategory();

	return (
		<section id="pronouns" className="space-y-6">
			{/* Quick decision guide at the top */}
			<PronounDecisionGuide />

			{/* Primary pronouns - most used */}
			<div className="grid gap-6 lg:grid-cols-2">
				<ContentSection title="Nominative Pronouns" colorScheme="olive">
					<div className="space-y-4 p-3">
						<p className="text-sm text-stone-600">Subject pronouns: often dropped! (εγώ, εσύ...)</p>
						<Alert variant="success">
							<AlertTitle>Good news</AlertTitle>
							<AlertDescription>
								Verb endings already show person, so subject pronouns are usually optional. Use them
								for emphasis.
							</AlertDescription>
						</Alert>
						<PronounParadigmTable data={SUBJECT_PRONOUNS} colorClass="border-olive-400" />
						<PronounExamplePills
							examples={SUBJECT_PRONOUN_EXAMPLES}
							borderColor="border-olive-300"
							textColor="text-olive-text"
						/>
					</div>
				</ContentSection>

				<ContentSection title="Genitive Pronouns" colorScheme="terracotta" badge="Essential">
					<div className="space-y-4 p-3">
						<p className="text-sm text-stone-600">
							Possessive pronouns: for "my/your/their" (μου, σου...)
						</p>
						<Alert variant="purple">
							<AlertTitle>Word order</AlertTitle>
							<AlertDescription>
								Possessives go AFTER the noun: το σπίτι μου (the house my) = my house
							</AlertDescription>
						</Alert>
						<PronounParadigmTable
							data={POSSESSIVE_PRONOUNS}
							colorClass="border-terracotta-400"
							note="Neuter uses same form as masculine (του)"
						/>
						<PronounExamplePills
							examples={POSSESSIVE_PRONOUN_EXAMPLES}
							borderColor="border-terracotta-300"
							textColor="text-terracotta-text"
						/>
					</div>
				</ContentSection>
			</div>

			{/* Secondary pronouns - less frequent */}
			<div className="grid gap-6 lg:grid-cols-2">
				<ContentSection title="Accusative Pronouns" colorScheme="ocean" badge="Essential">
					<div className="space-y-4 p-3">
						<p className="text-sm text-stone-600">
							Object pronouns: use these constantly! (με, σε, τον...)
						</p>
						<Alert variant="info">
							<AlertTitle>Word order</AlertTitle>
							<AlertDescription>
								Object pronouns go BEFORE the verb: σε βλέπω (you I-see) = I see you
							</AlertDescription>
						</Alert>
						<PronounParadigmTable data={OBJECT_PRONOUNS} colorClass="border-ocean-300" />
						<PronounExamplePills
							examples={OBJECT_PRONOUN_EXAMPLES}
							borderColor="border-ocean-300"
							textColor="text-ocean-text"
						/>
					</div>
				</ContentSection>

				<ContentSection title="Emphatic Accusative" colorScheme="honey">
					<div className="space-y-4 p-3">
						<p className="text-sm text-stone-600">
							Strong forms: after prepositions (εμένα, εσένα...)
						</p>
						<Alert variant="warning">
							<AlertTitle>When to use</AlertTitle>
							<AlertDescription>
								Use these after prepositions (για, με, από, σε): για μένα = for me
							</AlertDescription>
						</Alert>
						<PronounParadigmTable data={EMPHATIC_PRONOUNS} colorClass="border-honey-400" />
						<PronounExamplePills
							examples={EMPHATIC_PRONOUN_EXAMPLES}
							borderColor="border-honey-300"
							textColor="text-honey-text"
						/>
					</div>
				</ContentSection>
			</div>

			{/* Connection to cases - NOW it makes sense after seeing the pronouns */}
			<Alert variant="info">
				<AlertTitle>Pronouns = Cases in Action!</AlertTitle>
				<AlertDescription>
					<p>
						<strong>Accusative</strong> (
						<MonoText variant="greek" size="sm">
							με, σε, τον
						</MonoText>
						) answers "WHOM/WHAT do I [verb]?" <strong>Genitive</strong> (
						<MonoText variant="greek" size="sm">
							μου, σου, του
						</MonoText>
						) answers "WHOSE?" You're already using cases every time you use a pronoun!
					</p>
				</AlertDescription>
			</Alert>

			{/* Double object pattern - neutral styling */}
			<Card variant="bordered" padding="md" className="border-stone-200 bg-white">
				<h4 className="mb-1 font-bold text-navy-text">{PRONOUN_PATTERNS.doubleObject.title}</h4>
				<p className="mb-4 text-sm text-stone-600">{PRONOUN_PATTERNS.doubleObject.explanation}</p>

				{/* Visual contrast */}
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

				{/* Examples with literal translations */}
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

			{/* Common Phrases - Collapsible */}
			<CollapsibleSection
				title="Common Phrases with Pronouns"
				colorScheme="stone"
				defaultOpen={false}
			>
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
					{Object.entries(phraseGroups).map(([category, phrases]) => (
						<div key={category}>
							<h4 className="mb-2 text-sm font-medium text-slate-text">
								{CATEGORY_LABELS[category] || category}
							</h4>
							<div className="space-y-1">
								{phrases.map((phrase) => (
									<div key={phrase.greek} className="flex items-baseline gap-2 text-sm">
										<MonoText variant="greek" size="sm" className="font-medium text-stone-700">
											{phrase.greek}
										</MonoText>
										<span className="text-stone-600">{phrase.english}</span>
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			</CollapsibleSection>

			{/* Indefinite Reference - Collapsible */}
			<CollapsibleSection
				title="Indefinite Reference (someone, somewhere, sometime)"
				colorScheme="stone"
				defaultOpen={false}
			>
				<div className="space-y-6">
					{/* Key insight */}
					<Alert variant="purple">
						<AlertTitle>Pattern Recognition</AlertTitle>
						<AlertDescription>
							Greek indefinites share prefixes. Learn the pattern, decode many words:
							<strong className="ml-1">κά-</strong> = some-,
							<strong className="ml-1">πουθ-/κανέ-</strong> = no-/any-,
							<strong className="ml-1">παντ-</strong> = every-,
							<strong className="ml-1">οπου-δήποτε</strong> = -ever
						</AlertDescription>
					</Alert>

					{/* The Pattern Table */}
					<Card variant="bordered" padding="md" className="bg-white">
						<h4 className="mb-3 font-bold text-navy-text">The κά-/πουθ-/παντ- Pattern</h4>
						<div className="overflow-x-auto">
							<table className="w-full text-sm">
								<thead>
									<tr className="border-b border-stone-200">
										<th className="py-2 pr-4 text-left text-stone-600">Prefix</th>
										<th className="px-2 py-2 text-left text-stone-600">WHO (pronoun)</th>
										<th className="px-2 py-2 text-left text-stone-600">WHERE (adverb)</th>
										<th className="px-2 py-2 text-left text-stone-600">WHEN (adverb)</th>
										<th className="py-2 pl-2 text-left text-stone-600">HOW (adverb)</th>
									</tr>
								</thead>
								<tbody>
									<tr className="border-b border-stone-100">
										<td className="py-2 pr-4 text-stone-600">κά- (some-)</td>
										<td className="px-2 py-2">
											<MonoText variant="greek" size="sm">
												κάποιος
											</MonoText>
										</td>
										<td className="px-2 py-2">
											<MonoText variant="greek" size="sm">
												κάπου
											</MonoText>
										</td>
										<td className="px-2 py-2">
											<MonoText variant="greek" size="sm">
												κάποτε
											</MonoText>
										</td>
										<td className="py-2 pl-2">
											<MonoText variant="greek" size="sm">
												κάπως
											</MonoText>
										</td>
									</tr>
									<tr className="border-b border-stone-100">
										<td className="py-2 pr-4 text-stone-600">πουθ-/κανέ- (no-)</td>
										<td className="px-2 py-2">
											<MonoText variant="greek" size="sm">
												κανένας, τίποτα
											</MonoText>
										</td>
										<td className="px-2 py-2">
											<MonoText variant="greek" size="sm">
												πουθενά
											</MonoText>
										</td>
										<td className="px-2 py-2 text-stone-400">—</td>
										<td className="py-2 pl-2 text-stone-400">—</td>
									</tr>
									<tr className="border-b border-stone-100">
										<td className="py-2 pr-4 text-stone-600">παντ- (every-)</td>
										<td className="px-2 py-2">
											<MonoText variant="greek" size="sm">
												όλοι
											</MonoText>
										</td>
										<td className="px-2 py-2">
											<MonoText variant="greek" size="sm">
												παντού
											</MonoText>
										</td>
										<td className="px-2 py-2 text-stone-400">—</td>
										<td className="py-2 pl-2 text-stone-400">—</td>
									</tr>
									<tr>
										<td className="py-2 pr-4 text-stone-600">οπου-δήποτε (-ever)</td>
										<td className="px-2 py-2">
											<MonoText variant="greek" size="sm">
												όποιος, ό,τι
											</MonoText>
										</td>
										<td className="px-2 py-2">
											<MonoText variant="greek" size="sm">
												οπουδήποτε
											</MonoText>
										</td>
										<td className="px-2 py-2">
											<MonoText variant="greek" size="sm">
												οποτεδήποτε
											</MonoText>
										</td>
										<td className="py-2 pl-2">
											<MonoText variant="greek" size="sm">
												οπωσδήποτε
											</MonoText>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</Card>

					{/* Two columns: Pronouns and Adverbs */}
					<div className="grid gap-6 md:grid-cols-2">
						{/* Indefinite Pronouns */}
						<div className="space-y-4">
							<h4 className="font-bold text-navy-text">Indefinite Pronouns</h4>

							{/* Core (invariable) */}
							<div>
								<h5 className="mb-2 text-sm font-medium text-stone-600">
									Core (don't change form)
								</h5>
								<div className="space-y-1.5">
									{[
										{ greek: "κάτι", english: "something" },
										{ greek: "τίποτα", english: "nothing/anything" },
										{ greek: "όλα", english: "everything" },
										{ greek: "ό,τι", english: "whatever" },
									].map((item) => (
										<div key={item.greek} className="flex items-baseline gap-2 text-sm">
											<MonoText variant="greek" className="text-stone-800">
												{item.greek}
											</MonoText>
											<span className="text-stone-500">{item.english}</span>
										</div>
									))}
								</div>
							</div>

							{/* Gendered */}
							<div>
								<h5 className="mb-2 text-sm font-medium text-stone-600">
									Gendered (decline like adjectives)
								</h5>
								<div className="overflow-x-auto">
									<table className="w-full text-sm">
										<thead>
											<tr className="border-b border-stone-200">
												<th className="py-1.5 text-left text-xs text-stone-500">m</th>
												<th className="py-1.5 text-left text-xs text-stone-500">f</th>
												<th className="py-1.5 text-left text-xs text-stone-500">n</th>
												<th className="py-1.5 text-left text-xs text-stone-500">meaning</th>
											</tr>
										</thead>
										<tbody>
											{[
												["κάποιος", "κάποια", "κάποιο", "someone"],
												["κανένας", "καμία", "κανένα", "no one"],
												["όποιος", "όποια", "όποιο", "whoever"],
												["άλλος", "άλλη", "άλλο", "other"],
											].map(([m, f, n, eng]) => (
												<tr key={m} className="border-b border-stone-100">
													<td className="py-1.5">
														<MonoText variant="greek" size="sm">
															{m}
														</MonoText>
													</td>
													<td className="py-1.5">
														<MonoText variant="greek" size="sm">
															{f}
														</MonoText>
													</td>
													<td className="py-1.5">
														<MonoText variant="greek" size="sm">
															{n}
														</MonoText>
													</td>
													<td className="py-1.5 text-stone-500">{eng}</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						</div>

						{/* Indefinite Adverbs */}
						<div className="space-y-4">
							<h4 className="font-bold text-navy-text">Indefinite Adverbs</h4>

							<div className="overflow-x-auto">
								<table className="w-full text-sm">
									<thead>
										<tr className="border-b border-stone-200">
											<th className="py-1.5 text-left text-xs text-stone-500">category</th>
											<th className="py-1.5 text-left text-xs text-stone-500">+</th>
											<th className="py-1.5 text-left text-xs text-stone-500">−</th>
											<th className="py-1.5 text-left text-xs text-stone-500">all</th>
											<th className="py-1.5 text-left text-xs text-stone-500">any</th>
										</tr>
									</thead>
									<tbody>
										<tr className="border-b border-stone-100">
											<td className="py-1.5 text-stone-600">Place</td>
											<td className="py-1.5">
												<MonoText variant="greek" size="sm">
													κάπου
												</MonoText>
											</td>
											<td className="py-1.5">
												<MonoText variant="greek" size="sm">
													πουθενά
												</MonoText>
											</td>
											<td className="py-1.5">
												<MonoText variant="greek" size="sm">
													παντού
												</MonoText>
											</td>
											<td className="py-1.5">
												<MonoText variant="greek" size="sm">
													οπουδήποτε
												</MonoText>
											</td>
										</tr>
										<tr className="border-b border-stone-100">
											<td className="py-1.5 text-stone-600">Time</td>
											<td className="py-1.5">
												<MonoText variant="greek" size="sm">
													κάποτε
												</MonoText>
											</td>
											<td className="py-1.5 text-stone-400">—</td>
											<td className="py-1.5 text-stone-400">—</td>
											<td className="py-1.5">
												<MonoText variant="greek" size="sm">
													οποτεδήποτε
												</MonoText>
											</td>
										</tr>
										<tr>
											<td className="py-1.5 text-stone-600">Manner</td>
											<td className="py-1.5">
												<MonoText variant="greek" size="sm">
													κάπως
												</MonoText>
											</td>
											<td className="py-1.5 text-stone-400">—</td>
											<td className="py-1.5 text-stone-400">—</td>
											<td className="py-1.5">
												<MonoText variant="greek" size="sm">
													οπωσδήποτε
												</MonoText>
											</td>
										</tr>
									</tbody>
								</table>
							</div>

							{/* Examples */}
							<div className="mt-4 rounded-lg border border-stone-200 bg-stone-50 p-3">
								<h5 className="mb-2 text-sm font-medium text-stone-600">Examples</h5>
								<div className="space-y-1.5 text-sm">
									{[
										{
											greek: "Είδες κάποιον;",
											english: "Did you see someone?",
										},
										{
											greek: "Δεν είδα κανέναν",
											english: "I didn't see anyone",
										},
										{ greek: "Πάμε κάπου;", english: "Shall we go somewhere?" },
										{
											greek: "Δεν πάω πουθενά",
											english: "I'm not going anywhere",
										},
									].map((ex) => (
										<div key={ex.greek} className="flex items-baseline gap-2">
											<MonoText variant="greek" className="text-stone-800">
												{ex.greek}
											</MonoText>
											<span className="text-stone-500">{ex.english}</span>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</CollapsibleSection>
		</section>
	);
};
