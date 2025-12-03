import { AlertCircle, CheckCircle, ChevronDown, Lightbulb, Target, Users, XCircle } from "lucide-react";
import type React from "react";
import {
	ARTICLE_FORMULAS,
	DEFINITE_ARTICLES,
	MOVABLE_NU_RULE,
	PREPOSITION_PATTERNS,
	type ArticleForm,
} from "../constants/articles";
import { CASE_RECOGNITION, COMMON_MISTAKES } from "../constants/recognition";
import {
	EMPHATIC_PRONOUNS,
	OBJECT_PRONOUNS,
	POSSESSIVE_PRONOUNS,
	PRONOUN_PATTERNS,
	PRONOUN_PHRASES,
	SUBJECT_PRONOUNS,
} from "../constants/pronouns";
import { FAMILY_NOUNS, GENDER_HINTS, NEUTER_SIMPLIFICATION, NOUN_PATTERNS } from "../constants/nouns";
import { VERB_CONJUGATIONS } from "../constants/verbs";
import { Card, InfoBox, MonoText, Table } from "../components/ui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

// ============================================================================
// SECTION 1: CASES - The Foundation
// ============================================================================
const CasesSection: React.FC = () => (
	<section id="cases" className="space-y-6">
		<div>
			<h2 className="text-2xl font-bold text-gray-800">Cases</h2>
			<p className="text-gray-600 mt-1">The framework that explains why words change</p>
		</div>

		<InfoBox
			variant="info"
			title="The Three Questions"
			icon={<Lightbulb size={20} />}
		>
			Greek uses cases to show a word's role. Master these three questions and you'll know which case to use.
		</InfoBox>

		<Card
			variant="elevated"
			padding="lg"
			className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200"
		>
			<div className="grid md:grid-cols-3 gap-4">
				{CASE_RECOGNITION.quickRules.map((rule, index) => (
					<div key={index} className="text-center p-4 bg-white rounded-xl shadow-sm">
						<div className="text-lg font-bold text-gray-800 mb-2">{rule.question}</div>
						<div className="text-blue-600 font-semibold mb-2">{rule.answer}</div>
						<MonoText variant="highlighted" size="sm">{rule.example}</MonoText>
					</div>
				))}
			</div>
		</Card>

		<Collapsible>
			<CollapsibleTrigger className="flex items-center gap-2 w-full p-3 rounded-lg bg-amber-50 hover:bg-amber-100 transition-colors text-left group border border-amber-200">
				<Target size={18} className="text-amber-600" />
				<span className="font-medium text-amber-800">Quick Spot-Check Patterns</span>
				<ChevronDown size={16} className="ml-auto text-amber-600 transition-transform group-data-[state=open]:rotate-180" />
			</CollapsibleTrigger>
			<CollapsibleContent>
				<div className="mt-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
					{CASE_RECOGNITION.quickSpotCheck?.map((check, index) => (
						<div key={index} className="p-4 bg-white rounded-xl shadow-sm border border-amber-200">
							<div className="text-lg font-bold text-amber-800 mb-2">{check.pattern}</div>
							<div className="text-amber-600 font-medium mb-3 text-sm">→ {check.meaning}</div>
							<div className="space-y-1">
								{check.examples.map((example, i) => (
									<MonoText key={i} variant="warning" size="sm" className="block">{example}</MonoText>
								))}
							</div>
						</div>
					))}
				</div>
			</CollapsibleContent>
		</Collapsible>
	</section>
);

// ============================================================================
// SECTION 2: PRONOUNS - The Most Frequent Words
// ============================================================================
const PronounsSection: React.FC = () => (
	<section id="pronouns" className="space-y-6">
		<div>
			<h2 className="text-2xl font-bold text-gray-800">Pronouns</h2>
			<p className="text-gray-600 mt-1">The most frequent words in conversation</p>
		</div>

		<InfoBox variant="purple" title="Four types, each with a job" icon={<Users size={20} />}>
			Subject (who does it), Object (who receives), Possessive (whose), Emphatic (after prepositions)
		</InfoBox>

		<Tabs defaultValue="object" className="w-full">
			<TabsList className="flex-wrap h-auto gap-1">
				<TabsTrigger value="object">Object (με, σε)</TabsTrigger>
				<TabsTrigger value="possessive">Possessive (μου, σου)</TabsTrigger>
				<TabsTrigger value="subject">Subject (εγώ, εσύ)</TabsTrigger>
				<TabsTrigger value="emphatic">Emphatic (εμένα)</TabsTrigger>
			</TabsList>

			<TabsContent value="object" className="space-y-4">
				<Card variant="bordered" padding="lg" className="bg-blue-50/50 border-blue-200">
					<h3 className="text-lg font-bold text-blue-800 mb-2">Object Pronouns - Use These Constantly!</h3>
					<InfoBox variant="info" size="sm" title="Word order" className="mb-4">
						Object pronouns go <strong>BEFORE</strong> the verb: <MonoText>σε βλέπω</MonoText> (you I-see) = I see you
					</InfoBox>
					<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
						{OBJECT_PRONOUNS.map((p, i) => (
							<div key={i} className="p-3 bg-white rounded-lg border border-blue-200">
								<div className="flex items-baseline gap-2 mb-1">
									<MonoText variant="highlighted" size="lg">{p.greek}</MonoText>
									<span className="text-gray-500">=</span>
									<span className="text-gray-700">{p.english}</span>
								</div>
								<div className="text-sm">
									<MonoText size="sm" className="text-blue-700">{p.example}</MonoText>
									<span className="text-gray-500 ml-1">({p.exampleEnglish})</span>
								</div>
							</div>
						))}
					</div>
				</Card>
			</TabsContent>

			<TabsContent value="possessive" className="space-y-4">
				<Card variant="bordered" padding="lg" className="bg-purple-50/50 border-purple-200">
					<h3 className="text-lg font-bold text-purple-800 mb-2">Possessive Pronouns - For "My/Your/Their"</h3>
					<InfoBox variant="purple" size="sm" title="Word order" className="mb-4">
						Possessives go <strong>AFTER</strong> the noun: <MonoText>το σπίτι μου</MonoText> (the house my) = my house
					</InfoBox>
					<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
						{POSSESSIVE_PRONOUNS.map((p, i) => (
							<div key={i} className="p-3 bg-white rounded-lg border border-purple-200">
								<div className="flex items-baseline gap-2 mb-1">
									<MonoText variant="highlighted" size="lg">{p.greek}</MonoText>
									<span className="text-gray-500">=</span>
									<span className="text-gray-700">{p.english}</span>
								</div>
								<div className="text-sm">
									<MonoText size="sm" className="text-purple-700">{p.example}</MonoText>
									<span className="text-gray-500 ml-1">({p.exampleEnglish})</span>
								</div>
							</div>
						))}
					</div>
				</Card>
			</TabsContent>

			<TabsContent value="subject" className="space-y-4">
				<Card variant="bordered" padding="lg" className="bg-green-50/50 border-green-200">
					<h3 className="text-lg font-bold text-green-800 mb-2">Subject Pronouns - Often Dropped!</h3>
					<InfoBox variant="success" size="sm" title="Good news" className="mb-4">
						Verb endings already show person, so subject pronouns are usually optional. Use them for emphasis.
					</InfoBox>
					<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
						{SUBJECT_PRONOUNS.map((p, i) => (
							<div key={i} className="p-3 bg-white rounded-lg border border-green-200">
								<div className="flex items-baseline gap-2 mb-1">
									<MonoText variant="highlighted" size="lg">{p.greek}</MonoText>
									<span className="text-gray-500">=</span>
									<span className="text-gray-700">{p.english}</span>
								</div>
								<div className="text-sm">
									<MonoText size="sm" className="text-green-700">{p.example}</MonoText>
									<span className="text-gray-500 ml-1">({p.exampleEnglish})</span>
								</div>
							</div>
						))}
					</div>
				</Card>
			</TabsContent>

			<TabsContent value="emphatic" className="space-y-4">
				<Card variant="bordered" padding="lg" className="bg-orange-50/50 border-orange-200">
					<h3 className="text-lg font-bold text-orange-800 mb-2">Emphatic Pronouns - After Prepositions</h3>
					<InfoBox variant="warning" size="sm" title="When to use" className="mb-4">
						Use these after prepositions (για, με, από, σε): <MonoText>για μένα</MonoText> = for me
					</InfoBox>
					<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
						{EMPHATIC_PRONOUNS.map((p, i) => (
							<div key={i} className="p-3 bg-white rounded-lg border border-orange-200">
								<div className="flex items-baseline gap-2 mb-1">
									<MonoText variant="highlighted" size="lg">{p.greek}</MonoText>
									<span className="text-gray-500">=</span>
									<span className="text-gray-700">{p.english}</span>
								</div>
								<div className="text-sm">
									<MonoText size="sm" className="text-orange-700">{p.example}</MonoText>
									<span className="text-gray-500 ml-1">({p.exampleEnglish})</span>
								</div>
							</div>
						))}
					</div>
				</Card>
			</TabsContent>
		</Tabs>

		{/* Key patterns */}
		<Collapsible>
			<CollapsibleTrigger className="flex items-center gap-2 w-full p-3 rounded-lg bg-indigo-50 hover:bg-indigo-100 transition-colors text-left group border border-indigo-200">
				<Lightbulb size={18} className="text-indigo-600" />
				<span className="font-medium text-indigo-800">Essential Patterns & Common Phrases</span>
				<ChevronDown size={16} className="ml-auto text-indigo-600 transition-transform group-data-[state=open]:rotate-180" />
			</CollapsibleTrigger>
			<CollapsibleContent>
				<div className="mt-4 space-y-4">
					{/* Double object pattern */}
					<Card variant="bordered" padding="md" className="bg-indigo-50/50">
						<h4 className="font-bold text-indigo-800 mb-2">{PRONOUN_PATTERNS.doubleObject.title}</h4>
						<p className="text-sm text-gray-600 mb-3">{PRONOUN_PATTERNS.doubleObject.explanation}</p>
						<div className="grid sm:grid-cols-3 gap-2">
							{PRONOUN_PATTERNS.doubleObject.examples.map((ex, i) => (
								<div key={i} className="p-2 bg-white rounded border border-indigo-200">
									<MonoText variant="highlighted" className="block">{ex.greek}</MonoText>
									<span className="text-sm text-gray-600">{ex.english}</span>
								</div>
							))}
						</div>
					</Card>

					{/* Common phrases */}
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
						{PRONOUN_PHRASES.slice(0, 9).map((phrase, i) => (
							<div key={i} className="p-3 bg-white rounded-lg border border-gray-200">
								<MonoText variant="highlighted" className="block mb-1">{phrase.greek}</MonoText>
								<span className="text-sm text-gray-600">{phrase.english}</span>
							</div>
						))}
					</div>
				</div>
			</CollapsibleContent>
		</Collapsible>
	</section>
);

// ============================================================================
// SECTION 3: ARTICLES - The Declension Tables
// ============================================================================
const ArticlesSection: React.FC = () => {
	const renderArticleForm = (form: ArticleForm) => [
		form.case,
		<MonoText key={`${form.case}-m`} variant="masculine">{form.masculine}</MonoText>,
		<MonoText key={`${form.case}-f`} variant="feminine">{form.feminine}</MonoText>,
		<MonoText key={`${form.case}-n`} variant="neuter">{form.neuter}</MonoText>,
	];

	return (
		<section id="articles" className="space-y-6">
			<div>
				<h2 className="text-2xl font-bold text-gray-800">Articles</h2>
				<p className="text-gray-600 mt-1">How "the" changes by gender, number, and case</p>
			</div>

			<InfoBox variant="info" title='The "Tin Tis Toun" Mystery Solved' icon={<Lightbulb size={20} />}>
				These are all forms of "the" - they change based on gender, number, and case.
			</InfoBox>

			<div className="grid lg:grid-cols-2 gap-8">
				<Table
					title="Singular Forms"
					headers={["Case", "Masculine", "Feminine", "Neuter"]}
					headerColors={["", "text-blue-600 font-bold", "text-pink-600 font-bold", "text-green-600 font-bold"]}
					rows={DEFINITE_ARTICLES.singular.map(renderArticleForm)}
				/>
				<Table
					title="Plural Forms"
					headers={["Case", "Masculine", "Feminine", "Neuter"]}
					headerColors={["", "text-blue-600 font-bold", "text-pink-600 font-bold", "text-green-600 font-bold"]}
					rows={DEFINITE_ARTICLES.plural.map(renderArticleForm)}
				/>
			</div>
		</section>
	);
};

// ============================================================================
// SECTION 4: NOUNS - How Nouns Change
// ============================================================================
const NounsSection: React.FC = () => (
	<section id="nouns" className="space-y-6">
		<div>
			<h2 className="text-2xl font-bold text-gray-800">Nouns</h2>
			<p className="text-gray-600 mt-1">How noun endings change by case</p>
		</div>

		{/* Gender hints */}
		<Card variant="bordered" padding="lg" className="bg-gradient-to-r from-blue-50 via-pink-50 to-green-50">
			<h3 className="text-lg font-bold text-gray-800 mb-4">Spotting Gender by Ending</h3>
			<div className="grid md:grid-cols-3 gap-4">
				<div className="p-3 bg-blue-100/50 rounded-lg border border-blue-200">
					<div className="font-bold text-blue-800 mb-2">Masculine</div>
					<div className="text-sm text-blue-700 mb-2">{GENDER_HINTS.masculine.endings.join(", ")}</div>
					<div className="text-xs text-blue-600">{GENDER_HINTS.masculine.tip}</div>
				</div>
				<div className="p-3 bg-pink-100/50 rounded-lg border border-pink-200">
					<div className="font-bold text-pink-800 mb-2">Feminine</div>
					<div className="text-sm text-pink-700 mb-2">{GENDER_HINTS.feminine.endings.join(", ")}</div>
					<div className="text-xs text-pink-600">{GENDER_HINTS.feminine.tip}</div>
				</div>
				<div className="p-3 bg-green-100/50 rounded-lg border border-green-200">
					<div className="font-bold text-green-800 mb-2">Neuter</div>
					<div className="text-sm text-green-700 mb-2">{GENDER_HINTS.neuter.endings.join(", ")}</div>
					<div className="text-xs text-green-600">{GENDER_HINTS.neuter.tip}</div>
				</div>
			</div>
		</Card>

		{/* Neuter simplification */}
		<InfoBox variant="success" title={NEUTER_SIMPLIFICATION.title} icon={<CheckCircle size={20} />}>
			{NEUTER_SIMPLIFICATION.explanation} — {NEUTER_SIMPLIFICATION.tip}
		</InfoBox>

		{/* Family nouns - high priority */}
		<Card variant="bordered" padding="lg">
			<h3 className="text-lg font-bold text-purple-700 mb-2">Family Nouns - Learn These First</h3>
			<p className="text-sm text-gray-600 mb-4">These are the nouns you'll use most with in-laws</p>
			<div className="overflow-x-auto">
				<table className="w-full text-sm">
					<thead>
						<tr className="border-b border-purple-200 bg-purple-50">
							<th className="text-left py-2 px-3">English</th>
							<th className="text-left py-2 px-3">Nominative (subject)</th>
							<th className="text-left py-2 px-3">Accusative (object)</th>
							<th className="text-left py-2 px-3">Genitive (of/possession)</th>
						</tr>
					</thead>
					<tbody>
						{FAMILY_NOUNS.map((noun, i) => (
							<tr key={i} className="border-b border-purple-100">
								<td className="py-2 px-3 text-gray-600">{noun.english}</td>
								<td className="py-2 px-3"><MonoText>{noun.nominative}</MonoText></td>
								<td className="py-2 px-3"><MonoText>{noun.accusative}</MonoText></td>
								<td className="py-2 px-3"><MonoText>{noun.genitive}</MonoText></td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</Card>

		{/* Common noun patterns - collapsible */}
		<Collapsible>
			<CollapsibleTrigger className="flex items-center gap-2 w-full p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-left group border border-gray-200">
				<Target size={18} className="text-gray-600" />
				<span className="font-medium text-gray-700">Noun Declension Patterns (Reference)</span>
				<ChevronDown size={16} className="ml-auto text-gray-500 transition-transform group-data-[state=open]:rotate-180" />
			</CollapsibleTrigger>
			<CollapsibleContent>
				<div className="mt-4 grid md:grid-cols-2 gap-4">
					{NOUN_PATTERNS.slice(0, 6).map((pattern, i) => (
						<Card key={i} variant="bordered" padding="md" className="bg-gray-50/50">
							<div className="flex items-center gap-2 mb-2">
								<MonoText variant="highlighted" size="lg">{pattern.pattern}</MonoText>
								<span className={`text-xs px-2 py-0.5 rounded ${
									pattern.gender === "masculine" ? "bg-blue-100 text-blue-700" :
									pattern.gender === "feminine" ? "bg-pink-100 text-pink-700" :
									"bg-green-100 text-green-700"
								}`}>{pattern.gender}</span>
							</div>
							<p className="text-sm text-gray-600 mb-2">{pattern.description}</p>
							<div className="text-xs space-y-1">
								{pattern.declension.map((d, j) => (
									<div key={j} className="flex gap-2">
										<span className="text-gray-500 w-8">{d.case}</span>
										<MonoText size="sm">{d.singular}</MonoText>
										<span className="text-gray-400">→</span>
										<MonoText size="sm">{d.plural}</MonoText>
									</div>
								))}
							</div>
						</Card>
					))}
				</div>
			</CollapsibleContent>
		</Collapsible>
	</section>
);

// ============================================================================
// SECTION 5: PREPOSITIONS
// ============================================================================
const PrepositionsSection: React.FC = () => (
	<section id="prepositions" className="space-y-6">
		<div>
			<h2 className="text-2xl font-bold text-gray-800">Prepositions</h2>
			<p className="text-gray-600 mt-1">Combining prepositions with articles and pronouns</p>
		</div>

		<Card variant="elevated" padding="lg" className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200">
			<h3 className="text-xl font-bold text-center mb-4 text-green-800 flex items-center justify-center gap-2">
				<Target size={20} />
				Contractions (σε + article)
			</h3>
			<div className="grid md:grid-cols-3 gap-4">
				{ARTICLE_FORMULAS.map((formula, index) => (
					<div key={index} className="text-center p-4 bg-white rounded-xl shadow-sm border border-green-200">
						<div className="text-lg font-bold text-green-800 mb-2">{formula.formula}</div>
						<div className="text-sm text-gray-600 mb-3">{formula.explanation}</div>
						<div className="space-y-1">
							{formula.examples.map((example, i) => (
								<MonoText key={i} variant="success" size="sm" className="block">{example}</MonoText>
							))}
						</div>
					</div>
				))}
			</div>
		</Card>

		<Card variant="bordered" padding="lg">
			<h3 className="text-lg font-bold mb-4 text-green-700">Common Prepositions + Case</h3>
			<InfoBox variant="info" size="sm" title="Key insight" className="mb-4">
				All common prepositions take the accusative case. No exceptions to memorize!
			</InfoBox>
			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
				{PREPOSITION_PATTERNS.map((pattern, index) => (
					<div key={index} className="p-3 bg-green-50 rounded-lg border border-green-200">
						<div className="flex items-center gap-2 mb-2">
							<MonoText variant="success" size="lg">{pattern.preposition}</MonoText>
							<span className="text-xs bg-green-200 text-green-800 px-2 py-0.5 rounded">{pattern.case}</span>
						</div>
						<MonoText variant="highlighted" size="sm" className="block mb-1">{pattern.example}</MonoText>
						<div className="text-sm text-gray-600">{pattern.english}</div>
					</div>
				))}
			</div>
		</Card>
	</section>
);

// ============================================================================
// SECTION 6: COMMON MISTAKES
// ============================================================================
const CommonMistakesSection: React.FC = () => (
	<section id="common-mistakes" className="space-y-6">
		<div>
			<h2 className="text-2xl font-bold text-gray-800">Common Mistakes</h2>
			<p className="text-gray-600 mt-1">Learn from typical errors</p>
		</div>

		<InfoBox variant="warning" title="Learn from errors" icon={<AlertCircle size={20} />}>
			These are the mistakes most learners make. Seeing wrong → right pairs helps you avoid them.
		</InfoBox>

		<div className="grid md:grid-cols-2 gap-4">
			{COMMON_MISTAKES.map((mistake, index) => (
				<Card key={index} variant="bordered" padding="md" className="bg-white">
					<div className="flex items-start gap-3 mb-3">
						<XCircle className="text-red-500 mt-1 shrink-0" size={20} />
						<MonoText variant="error" size="lg" className="line-through">{mistake.wrong}</MonoText>
					</div>
					<div className="flex items-start gap-3 mb-3">
						<CheckCircle className="text-green-500 mt-1 shrink-0" size={20} />
						<MonoText variant="success" size="lg">{mistake.correct}</MonoText>
					</div>
					<div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">{mistake.explanation}</div>
				</Card>
			))}
		</div>
	</section>
);

// ============================================================================
// SECTION 7: VERBS
// ============================================================================
const VerbsSection: React.FC = () => (
	<section id="verbs" className="space-y-6">
		<div>
			<h2 className="text-2xl font-bold text-gray-800">Verbs</h2>
			<p className="text-gray-600 mt-1">Conjugation patterns and essential verbs</p>
		</div>

		{/* Essential verbs first */}
		<Card variant="bordered" padding="lg" className="bg-indigo-50 border-2 border-indigo-200">
			<h3 className="text-lg font-bold mb-3 text-indigo-800">Essential Verbs - Use These Daily</h3>
			<InfoBox variant="info" size="sm" title="Good news" className="mb-4">
				These follow standard -ω patterns. Learn these and you can express most basic needs.
			</InfoBox>
			<div className="grid lg:grid-cols-3 gap-6">
				<Table
					title="έχω (I have)"
					rows={VERB_CONJUGATIONS.echo.map((conj) => [
						conj.person,
						<MonoText key={conj.person}>{conj.form}</MonoText>,
						conj.english,
					])}
				/>
				<Table
					title="θέλω (I want)"
					rows={VERB_CONJUGATIONS.thelo.map((conj) => [
						conj.person,
						<MonoText key={conj.person}>{conj.form}</MonoText>,
						conj.english,
					])}
				/>
				<Table
					title="μπορώ (I can)"
					rows={VERB_CONJUGATIONS.boro.map((conj) => [
						conj.person,
						<MonoText key={conj.person}>{conj.form}</MonoText>,
						conj.english,
					])}
				/>
			</div>
		</Card>

		{/* Verb patterns - collapsible */}
		<Collapsible>
			<CollapsibleTrigger className="flex items-center gap-2 w-full p-3 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors text-left group border border-purple-200">
				<Lightbulb size={18} className="text-purple-600" />
				<span className="font-medium text-purple-800">Four Verb Families (Patterns)</span>
				<ChevronDown size={16} className="ml-auto text-purple-600 transition-transform group-data-[state=open]:rotate-180" />
			</CollapsibleTrigger>
			<CollapsibleContent>
				<div className="mt-4 grid lg:grid-cols-2 gap-6">
					<Card variant="bordered" padding="lg">
						<h4 className="text-lg font-bold mb-4 text-blue-600">Family 1: Active -ω verbs</h4>
						<InfoBox variant="info" size="sm" title="Pattern">
							<MonoText variant="highlighted">-ω, -εις, -ει, -ουμε, -ετε, -ουν(ε)</MonoText>
						</InfoBox>
						<div className="mt-4">
							<Table
								title="κάνω (I do)"
								rows={VERB_CONJUGATIONS.kano.map((conj) => [
									conj.person,
									<MonoText key={conj.person}>{conj.form}</MonoText>,
									conj.english,
								])}
							/>
						</div>
					</Card>

					<Card variant="bordered" padding="lg">
						<h4 className="text-lg font-bold mb-4 text-blue-600">Family 2: Active -άω/-ώ verbs</h4>
						<InfoBox variant="info" size="sm" title="Pattern">
							<MonoText variant="highlighted">-άω/-ώ, -άς, -άει/-ά, -άμε, -άτε, -άνε</MonoText>
						</InfoBox>
						<div className="mt-4">
							<Table
								title="μιλάω (I speak)"
								rows={VERB_CONJUGATIONS.milao.map((conj) => [
									conj.person,
									<MonoText key={conj.person}>{conj.form}</MonoText>,
									conj.english,
								])}
							/>
						</div>
					</Card>

					<Card variant="bordered" padding="lg">
						<h4 className="text-lg font-bold mb-4 text-green-600">Family 3: Passive -ομαι verbs</h4>
						<InfoBox variant="info" size="sm" title="Pattern">
							<MonoText variant="highlighted">-ομαι, -εσαι, -εται, -όμαστε, -εστε, -ονται</MonoText>
						</InfoBox>
						<div className="mt-4">
							<Table
								title="έρχομαι (I come)"
								rows={VERB_CONJUGATIONS.erhomai.map((conj) => [
									conj.person,
									<MonoText key={conj.person}>{conj.form}</MonoText>,
									conj.english,
								])}
							/>
						</div>
					</Card>

					<Card variant="bordered" padding="lg">
						<h4 className="text-lg font-bold mb-4 text-green-600">Family 4: Passive -άμαι verbs</h4>
						<InfoBox variant="info" size="sm" title="Pattern">
							<MonoText variant="highlighted">-άμαι, -άσαι, -άται, -όμαστε, -άστε, -ώνται</MonoText>
						</InfoBox>
						<div className="mt-4">
							<Table
								title="θυμάμαι (I remember)"
								rows={VERB_CONJUGATIONS.thymamai.map((conj) => [
									conj.person,
									<MonoText key={conj.person}>{conj.form}</MonoText>,
									conj.english,
								])}
							/>
						</div>
					</Card>
				</div>
			</CollapsibleContent>
		</Collapsible>

		{/* Irregular verbs - collapsible */}
		<Collapsible>
			<CollapsibleTrigger className="flex items-center gap-2 w-full p-3 rounded-lg bg-red-50 hover:bg-red-100 transition-colors text-left group border border-red-200">
				<AlertCircle size={18} className="text-red-600" />
				<span className="font-medium text-red-800">Irregular Verbs - Must Know!</span>
				<ChevronDown size={16} className="ml-auto text-red-600 transition-transform group-data-[state=open]:rotate-180" />
			</CollapsibleTrigger>
			<CollapsibleContent>
				<div className="mt-4">
					<InfoBox variant="error" size="sm" title="These don't follow patterns" className="mb-4">
						High-frequency verbs that need individual memorization.
					</InfoBox>
					<div className="grid lg:grid-cols-2 gap-6">
						<Table
							title="είμαι (I am)"
							rows={VERB_CONJUGATIONS.eimai.map((conj) => [
								conj.person,
								<MonoText key={conj.person}>{conj.form}</MonoText>,
								conj.english,
							])}
						/>
						<Table
							title="πάω (I go)"
							rows={VERB_CONJUGATIONS.pao.map((conj) => [
								conj.person,
								<MonoText key={conj.person}>{conj.form}</MonoText>,
								conj.english,
							])}
						/>
						<Table
							title="λέω (I say)"
							rows={VERB_CONJUGATIONS.leo.map((conj) => [
								conj.person,
								<MonoText key={conj.person}>{conj.form}</MonoText>,
								conj.english,
							])}
						/>
						<Table
							title="τρώω (I eat)"
							rows={VERB_CONJUGATIONS.troo.map((conj) => [
								conj.person,
								<MonoText key={conj.person}>{conj.form}</MonoText>,
								conj.english,
							])}
						/>
					</div>
					<InfoBox variant="warning" size="sm" title="Memory tip" className="mt-4">
						πάω has an alternative form πηγαίνω that follows normal -ω patterns.
						"τα λέμε" (we say them) = "see ya later"
					</InfoBox>
				</div>
			</CollapsibleContent>
		</Collapsible>

		{/* Simple future */}
		<Card variant="bordered" padding="lg" className="bg-blue-50 border-2 border-blue-200">
			<h3 className="text-lg font-bold mb-3 text-blue-800">Simple Future</h3>
			<div className="bg-white p-3 rounded mb-3">
				<p className="font-semibold">Formula: θα + present tense</p>
			</div>
			<div className="grid md:grid-cols-2 gap-3 text-sm">
				<div><MonoText>θα κάνω</MonoText> = I will do</div>
				<div><MonoText>θα μιλάω</MonoText> = I will speak</div>
				<div><MonoText>θα έρχομαι</MonoText> = I will come</div>
				<div><MonoText>θα θυμάμαι</MonoText> = I will remember</div>
			</div>
		</Card>
	</section>
);

// ============================================================================
// SECTION 8: THE -ν RULE (Fine-tuning)
// ============================================================================
const MovableNuSection: React.FC = () => (
	<section id="movable-nu" className="space-y-6">
		<div>
			<h2 className="text-2xl font-bold text-gray-800">The -ν Rule</h2>
			<p className="text-gray-600 mt-1">Fine-tuning: when to keep or drop final ν</p>
		</div>

		<Card variant="elevated" padding="lg" className="bg-gradient-to-r from-slate-50 to-gray-50 border-2 border-slate-200">
			<InfoBox variant="info" title="The Rule" icon={<Lightbulb size={18} />} className="mb-6">
				{MOVABLE_NU_RULE.rule}
			</InfoBox>
			<div className="grid md:grid-cols-2 gap-6">
				<div className="space-y-4">
					<h4 className="text-lg font-bold text-green-700">Keep the -ν</h4>
					<div className="space-y-3">
						{MOVABLE_NU_RULE.examples.keep.map((example, index) => (
							<div key={index} className="p-3 bg-green-100 rounded-lg border border-green-200">
								<MonoText variant="success" size="lg" className="block mb-1">{example.text}</MonoText>
								<div className="text-green-600 text-sm italic">{example.reason}</div>
							</div>
						))}
					</div>
				</div>
				<div className="space-y-4">
					<h4 className="text-lg font-bold text-red-700">Drop the -ν</h4>
					<div className="space-y-3">
						{MOVABLE_NU_RULE.examples.drop.map((example, index) => (
							<div key={index} className="p-3 bg-red-100 rounded-lg border border-red-200">
								<MonoText variant="error" size="lg" className="block mb-1">{example.text}</MonoText>
								<div className="text-red-600 text-sm italic">{example.reason}</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</Card>
	</section>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================
const QuickReference: React.FC = () => {
	return (
		<div className="space-y-12">
			<CasesSection />
			<PronounsSection />
			<ArticlesSection />
			<NounsSection />
			<PrepositionsSection />
			<CommonMistakesSection />
			<VerbsSection />
			<MovableNuSection />
		</div>
	);
};

export function meta() {
	return [
		{ title: "Quick Reference - Greek Grammar Lookup" },
		{ name: "description", content: "Grammar lookup - find what you need fast" },
	];
}

export default function QuickReferenceRoute() {
	return <QuickReference />;
}
