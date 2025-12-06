import { AlertCircle, CheckCircle, ChevronDown, Lightbulb } from "lucide-react";
import type React from "react";
import {
	AGREEMENT_MISTAKES,
	AGREEMENT_PARADIGMS,
	ARTICLE_AGREEMENT_QUICK_REF,
	type AgreementParadigm,
} from "../../constants/agreement";
import { GENDER_HINTS } from "../../constants/nouns";
import { MOVABLE_NU_RULE } from "../../constants/articles";
import { Card, MonoText } from "../../components";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

// Reusable paradigm table for agreement patterns
const AgreementParadigmTable: React.FC<{
	paradigm: AgreementParadigm;
	showPlural?: boolean;
}> = ({ paradigm, showPlural = true }) => {
	const genderColor =
		paradigm.gender === "masculine"
			? "blue"
			: paradigm.gender === "feminine"
				? "pink"
				: "green";

	const borderClass = `border-${genderColor}-200`;
	const bgClass = `bg-${genderColor}-50/50`;
	const headerBg = `bg-${genderColor}-100`;
	const textClass = `text-${genderColor}-800`;

	return (
		<Card variant="bordered" padding="md" className={`${bgClass} ${borderClass}`}>
			<div className="flex items-center gap-2 mb-3">
				<MonoText
					variant={paradigm.gender === "masculine" ? "masculine" : paradigm.gender === "feminine" ? "feminine" : "neuter"}
					size="lg"
					className="font-bold"
				>
					{paradigm.pattern}
				</MonoText>
				<span className={`text-sm ${textClass}`}>{paradigm.title}</span>
				<span
					className={`text-xs px-2 py-0.5 rounded ${
						paradigm.frequency === "very common"
							? "bg-green-100 text-green-700"
							: paradigm.frequency === "common"
								? "bg-yellow-100 text-yellow-700"
								: "bg-gray-100 text-gray-600"
					}`}
				>
					{paradigm.frequency}
				</span>
			</div>

			{paradigm.tip && (
				<p className="text-sm text-gray-600 mb-3 italic">{paradigm.tip}</p>
			)}

			<div className="overflow-x-auto">
				<table className="w-full text-sm">
					<thead>
						<tr className={`${headerBg} border-b ${borderClass}`}>
							<th className="text-left py-2 px-3 font-medium text-gray-600 w-16">Case</th>
							<th className="text-left py-2 px-3 font-medium text-gray-600">Article</th>
							<th className="text-left py-2 px-3 font-medium text-gray-600">Ending</th>
							<th className="text-left py-2 px-3 font-medium text-gray-600">Example</th>
							<th className="text-left py-2 px-3 font-medium text-gray-500">English</th>
						</tr>
					</thead>
					<tbody>
						{paradigm.forms.map((form, i) => (
							<tr key={i} className="border-b border-gray-100">
								<td className="py-2 px-3 text-gray-500 text-xs">{form.case}</td>
								<td className="py-2 px-3">
									<MonoText variant="highlighted" size="sm">{form.article}</MonoText>
								</td>
								<td className="py-2 px-3">
									<MonoText size="sm" className="text-gray-600">{form.ending}</MonoText>
								</td>
								<td className="py-2 px-3">
									<MonoText
										variant={paradigm.gender === "masculine" ? "masculine" : paradigm.gender === "feminine" ? "feminine" : "neuter"}
									>
										{form.full}
									</MonoText>
								</td>
								<td className="py-2 px-3 text-gray-500 text-sm">{form.english}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{showPlural && paradigm.pluralForms && (
				<div className="mt-4 pt-3 border-t border-gray-200">
					<div className="text-xs text-gray-500 mb-2 font-medium">Plural Forms</div>
					<div className="overflow-x-auto">
						<table className="w-full text-sm">
							<tbody>
								{paradigm.pluralForms.map((form, i) => (
									<tr key={i} className="border-b border-gray-50">
										<td className="py-1.5 px-3 text-gray-400 text-xs w-16">{form.case}</td>
										<td className="py-1.5 px-3">
											<MonoText variant="highlighted" size="sm">{form.article}</MonoText>
										</td>
										<td className="py-1.5 px-3">
											<MonoText size="sm" className="text-gray-500">{form.ending}</MonoText>
										</td>
										<td className="py-1.5 px-3">
											<MonoText size="sm">{form.full}</MonoText>
										</td>
										<td className="py-1.5 px-3 text-gray-400 text-xs">{form.english}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			)}
		</Card>
	);
};

// Agreement mistakes component
const AgreementMistakes: React.FC = () => {
	const groupedMistakes = {
		gender: AGREEMENT_MISTAKES.filter((m) => m.category === "gender"),
		case: AGREEMENT_MISTAKES.filter((m) => m.category === "case"),
		number: AGREEMENT_MISTAKES.filter((m) => m.category === "number"),
	};

	return (
		<div className="space-y-4">
			<h3 className="text-lg font-bold text-red-700">Common Agreement Mistakes</h3>

			<div className="grid md:grid-cols-3 gap-4">
				{Object.entries(groupedMistakes).map(([category, mistakes]) => (
					<div key={category} className="space-y-2">
						<div className="text-sm font-medium text-gray-600 capitalize">{category} Errors</div>
						{mistakes.map((mistake, i) => (
							<Card key={i} variant="bordered" padding="sm" className="bg-white">
								<div className="flex items-start gap-2 mb-1">
									<AlertCircle className="text-red-500 mt-0.5 shrink-0" size={14} />
									<MonoText variant="error" size="sm" className="line-through">
										{mistake.wrong}
									</MonoText>
								</div>
								<div className="flex items-start gap-2 mb-2">
									<CheckCircle className="text-green-500 mt-0.5 shrink-0" size={14} />
									<MonoText variant="success" size="sm">{mistake.correct}</MonoText>
								</div>
								<div className="text-xs text-gray-500 pl-5">{mistake.explanation}</div>
							</Card>
						))}
					</div>
				))}
			</div>
		</div>
	);
};

// Gender hints card - compact reference for spotting gender
const GenderHintsCard: React.FC = () => (
	<Card variant="bordered" padding="md">
		<div className="text-sm font-medium text-gray-700 mb-2">Spot gender by ending:</div>
		<div className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
			<div className="flex items-center gap-2">
				<span className="w-2 h-2 rounded-full bg-blue-400" />
				<span className="text-gray-600">Masculine:</span>
				<span className="text-gray-800">{GENDER_HINTS.masculine.endings.join(", ")}</span>
			</div>
			<div className="flex items-center gap-2">
				<span className="w-2 h-2 rounded-full bg-pink-400" />
				<span className="text-gray-600">Feminine:</span>
				<span className="text-gray-800">{GENDER_HINTS.feminine.endings.join(", ")}</span>
			</div>
			<div className="flex items-center gap-2">
				<span className="w-2 h-2 rounded-full bg-green-400" />
				<span className="text-gray-600">Neuter:</span>
				<span className="text-gray-800">{GENDER_HINTS.neuter.endings.join(", ")}</span>
			</div>
		</div>
	</Card>
);

// Collapsible article quick lookup
const ArticleQuickLookup: React.FC = () => (
	<Collapsible>
		<CollapsibleTrigger className="flex items-center gap-2 w-full p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-left group border border-gray-200">
			<span className="font-medium text-gray-700">Article Quick Lookup</span>
			<span className="text-sm text-gray-500">(ο, η, το, τον, την...)</span>
			<ChevronDown size={16} className="ml-auto text-gray-500 transition-transform group-data-[state=open]:rotate-180" />
		</CollapsibleTrigger>
		<CollapsibleContent>
			<div className="mt-3 grid md:grid-cols-2 gap-4">
				{/* Singular */}
				<Card variant="bordered" padding="sm">
					<div className="text-xs font-medium text-gray-500 mb-2">Singular</div>
					<table className="w-full text-sm">
						<thead>
							<tr className="border-b border-gray-200">
								<th className="text-left py-1 pr-2 text-gray-500 font-medium w-12"></th>
								<th className="text-left py-1 px-2 text-blue-600 font-medium">M</th>
								<th className="text-left py-1 px-2 text-pink-600 font-medium">F</th>
								<th className="text-left py-1 px-2 text-green-600 font-medium">N</th>
							</tr>
						</thead>
						<tbody>
							<tr className="border-b border-gray-100">
								<td className="py-1 pr-2 text-gray-400 text-xs">Nom</td>
								<td className="py-1 px-2"><MonoText size="sm">{ARTICLE_AGREEMENT_QUICK_REF.singular.masculine.nom}</MonoText></td>
								<td className="py-1 px-2"><MonoText size="sm">{ARTICLE_AGREEMENT_QUICK_REF.singular.feminine.nom}</MonoText></td>
								<td className="py-1 px-2"><MonoText size="sm">{ARTICLE_AGREEMENT_QUICK_REF.singular.neuter.nom}</MonoText></td>
							</tr>
							<tr className="border-b border-gray-100">
								<td className="py-1 pr-2 text-gray-400 text-xs">Acc</td>
								<td className="py-1 px-2"><MonoText size="sm">{ARTICLE_AGREEMENT_QUICK_REF.singular.masculine.acc}</MonoText></td>
								<td className="py-1 px-2"><MonoText size="sm">{ARTICLE_AGREEMENT_QUICK_REF.singular.feminine.acc}</MonoText></td>
								<td className="py-1 px-2"><MonoText size="sm">{ARTICLE_AGREEMENT_QUICK_REF.singular.neuter.acc}</MonoText></td>
							</tr>
							<tr>
								<td className="py-1 pr-2 text-gray-400 text-xs">Gen</td>
								<td className="py-1 px-2"><MonoText size="sm">{ARTICLE_AGREEMENT_QUICK_REF.singular.masculine.gen}</MonoText></td>
								<td className="py-1 px-2"><MonoText size="sm">{ARTICLE_AGREEMENT_QUICK_REF.singular.feminine.gen}</MonoText></td>
								<td className="py-1 px-2"><MonoText size="sm">{ARTICLE_AGREEMENT_QUICK_REF.singular.neuter.gen}</MonoText></td>
							</tr>
						</tbody>
					</table>
				</Card>
				{/* Plural */}
				<Card variant="bordered" padding="sm">
					<div className="text-xs font-medium text-gray-500 mb-2">Plural</div>
					<table className="w-full text-sm">
						<thead>
							<tr className="border-b border-gray-200">
								<th className="text-left py-1 pr-2 text-gray-500 font-medium w-12"></th>
								<th className="text-left py-1 px-2 text-blue-600 font-medium">M</th>
								<th className="text-left py-1 px-2 text-pink-600 font-medium">F</th>
								<th className="text-left py-1 px-2 text-green-600 font-medium">N</th>
							</tr>
						</thead>
						<tbody>
							<tr className="border-b border-gray-100">
								<td className="py-1 pr-2 text-gray-400 text-xs">Nom</td>
								<td className="py-1 px-2"><MonoText size="sm">{ARTICLE_AGREEMENT_QUICK_REF.plural.masculine.nom}</MonoText></td>
								<td className="py-1 px-2"><MonoText size="sm">{ARTICLE_AGREEMENT_QUICK_REF.plural.feminine.nom}</MonoText></td>
								<td className="py-1 px-2"><MonoText size="sm">{ARTICLE_AGREEMENT_QUICK_REF.plural.neuter.nom}</MonoText></td>
							</tr>
							<tr className="border-b border-gray-100">
								<td className="py-1 pr-2 text-gray-400 text-xs">Acc</td>
								<td className="py-1 px-2"><MonoText size="sm">{ARTICLE_AGREEMENT_QUICK_REF.plural.masculine.acc}</MonoText></td>
								<td className="py-1 px-2"><MonoText size="sm">{ARTICLE_AGREEMENT_QUICK_REF.plural.feminine.acc}</MonoText></td>
								<td className="py-1 px-2"><MonoText size="sm">{ARTICLE_AGREEMENT_QUICK_REF.plural.neuter.acc}</MonoText></td>
							</tr>
							<tr>
								<td className="py-1 pr-2 text-gray-400 text-xs">Gen</td>
								<td className="py-1 px-2"><MonoText size="sm">{ARTICLE_AGREEMENT_QUICK_REF.plural.masculine.gen}</MonoText></td>
								<td className="py-1 px-2"><MonoText size="sm">{ARTICLE_AGREEMENT_QUICK_REF.plural.feminine.gen}</MonoText></td>
								<td className="py-1 px-2"><MonoText size="sm">{ARTICLE_AGREEMENT_QUICK_REF.plural.neuter.gen}</MonoText></td>
							</tr>
						</tbody>
					</table>
				</Card>
			</div>
		</CollapsibleContent>
	</Collapsible>
);

export const AgreementSection: React.FC = () => {
	const masculineParadigms = AGREEMENT_PARADIGMS.filter((p) => p.gender === "masculine");
	const feminineParadigms = AGREEMENT_PARADIGMS.filter((p) => p.gender === "feminine");
	const neuterParadigms = AGREEMENT_PARADIGMS.filter((p) => p.gender === "neuter");

	return (
		<section id="agreement" className="space-y-6">
			<div>
				<h2 className="text-2xl font-bold text-gray-800">Nouns & Articles</h2>
				<p className="text-gray-600 mt-1">How articles and nouns must match in gender, case, and number</p>
			</div>

			{/* Gender hints - how to spot gender by ending */}
			<GenderHintsCard />

			{/* Collapsible article quick lookup */}
			<ArticleQuickLookup />

			<Alert variant="info">
				<Lightbulb size={16} />
				<AlertTitle>The Core Pattern</AlertTitle>
				<AlertDescription>
					In Greek, the article must <strong>agree</strong> with its noun in three ways: gender (masculine/feminine/neuter),
					case (nominative/accusative/genitive), and number (singular/plural). This is why "the" has so many forms!
				</AlertDescription>
			</Alert>

			<Card variant="bordered" padding="lg" className="bg-gray-50/50">
				<Tabs defaultValue="masculine" className="w-full">
					<TabsList className="flex-wrap h-auto gap-1 mb-4">
						<TabsTrigger value="masculine" className="text-blue-700">
							Masculine ({masculineParadigms.length})
						</TabsTrigger>
						<TabsTrigger value="feminine" className="text-pink-700">
							Feminine ({feminineParadigms.length})
						</TabsTrigger>
						<TabsTrigger value="neuter" className="text-green-700">
							Neuter ({neuterParadigms.length})
						</TabsTrigger>
					</TabsList>

					<TabsContent value="masculine" className="space-y-4 mt-0">
						<div className="grid lg:grid-cols-2 gap-4">
							{masculineParadigms.map((paradigm) => (
								<AgreementParadigmTable key={paradigm.id} paradigm={paradigm} />
							))}
						</div>
						<div className="text-sm text-gray-600 flex flex-wrap items-center gap-x-4 gap-y-1 pt-2">
							<span className="font-medium text-gray-700">Vocative changes:</span>
							<MonoText size="sm">-ος → -ε</MonoText>
							<MonoText size="sm">-ας → -α</MonoText>
							<MonoText size="sm">-ης → -η</MonoText>
							<MonoText size="sm">-ές → -έ</MonoText>
						</div>
					</TabsContent>

					<TabsContent value="feminine" className="mt-0">
						<div className="grid lg:grid-cols-2 gap-4">
							{feminineParadigms.map((paradigm) => (
								<AgreementParadigmTable key={paradigm.id} paradigm={paradigm} />
							))}
						</div>
					</TabsContent>

					<TabsContent value="neuter" className="mt-0">
						<div className="grid lg:grid-cols-2 gap-4">
							{neuterParadigms.map((paradigm) => (
								<AgreementParadigmTable key={paradigm.id} paradigm={paradigm} />
							))}
						</div>
					</TabsContent>
				</Tabs>
			</Card>

			<AgreementMistakes />
		</section>
	);
};

// ============================================================================
// MOVABLE NU SECTION (The -ν Rule)
// ============================================================================
export const MovableNuSection: React.FC = () => (
	<section id="movable-nu" className="space-y-6">
		<div>
			<h2 className="text-2xl font-bold text-gray-800">The -ν Rule</h2>
			<p className="text-gray-600 mt-1">
				Fine-tuning: when to keep or drop final ν on articles
			</p>
		</div>

		<Card
			variant="elevated"
			padding="lg"
			className="bg-gradient-to-r from-slate-50 to-gray-50 border-2 border-slate-200"
		>
			<Alert variant="info" className="mb-6">
				<Lightbulb size={16} />
				<AlertTitle>The Rule</AlertTitle>
				<AlertDescription>{MOVABLE_NU_RULE.rule}</AlertDescription>
			</Alert>
			<div className="grid md:grid-cols-2 gap-6">
				<div className="space-y-4">
					<h4 className="text-lg font-bold text-green-700">Keep the -ν</h4>
					<div className="space-y-3">
						{MOVABLE_NU_RULE.examples.keep.map((example, index) => (
							<div
								key={index}
								className="p-3 bg-green-100 rounded-lg border border-green-200"
							>
								<MonoText variant="success" size="lg" className="block mb-1">
									{example.text}
								</MonoText>
								<div className="text-green-600 text-sm italic">
									{example.reason}
								</div>
							</div>
						))}
					</div>
				</div>
				<div className="space-y-4">
					<h4 className="text-lg font-bold text-red-700">Drop the -ν</h4>
					<div className="space-y-3">
						{MOVABLE_NU_RULE.examples.drop.map((example, index) => (
							<div
								key={index}
								className="p-3 bg-red-100 rounded-lg border border-red-200"
							>
								<MonoText variant="error" size="lg" className="block mb-1">
									{example.text}
								</MonoText>
								<div className="text-red-600 text-sm italic">
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
