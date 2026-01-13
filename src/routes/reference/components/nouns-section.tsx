import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { Card } from "@/components/Card";
import { CollapsibleSection } from "@/components/CollapsibleSection";
import { ContentSection } from "@/components/ContentSection";
import { MonoText } from "@/components/MonoText";
import { SectionHeading } from "@/components/SectionHeading";
import {
	AGREEMENT_PARADIGMS,
	type AgreementParadigm,
} from "@/constants/agreement";

// ═══════════════════════════════════════════════════════════════════════════════
// Types & Constants
// ═══════════════════════════════════════════════════════════════════════════════

type Gender = "masculine" | "feminine" | "neuter";
type Case = "Nom" | "Acc" | "Gen";

const CASES: Case[] = ["Nom", "Acc", "Gen"];

const GENDER_PATTERNS: Record<Gender, readonly string[]> = {
	masculine: ["masc-os", "masc-as", "masc-is"],
	feminine: ["fem-a", "fem-i", "fem-si"],
	neuter: ["neut-o", "neut-i", "neut-ma"],
};

const ESSENTIAL_IDS = ["masc-os", "fem-a", "neut-o"] as const;

const GENDER_HINTS: Record<Gender, { endings: string; hint: string }> = {
	masculine: { endings: "-ος, -ας, -ης, -ές", hint: "Male people, -ος words" },
	feminine: { endings: "-α, -η, -ση/-ξη", hint: "Female people, abstract -η" },
	neuter: { endings: "-ο, -ι, -μα", hint: "Diminutives, result nouns" },
};

const CASE_QUESTIONS: Array<{
	case: Case;
	question: string;
	greek: string;
	english: string;
}> = [
	{
		case: "Nom",
		question: "Who does it?",
		greek: "ο φίλος μιλάει",
		english: "the friend speaks",
	},
	{
		case: "Acc",
		question: "Who/what receives?",
		greek: "βλέπω τον φίλο",
		english: "I see the friend",
	},
	{
		case: "Gen",
		question: "Whose is it?",
		greek: "το σπίτι του φίλου",
		english: "the friend's house",
	},
];

const DECISION_GUIDES = [
	{
		question: "Should I use ο or τον?",
		explanation: ["doing", "receiving"],
		examples: [
			{ label: "Doing", greek: "ο φίλος μιλάει" },
			{ label: "Receiving", greek: "βλέπω τον φίλο" },
		],
	},
	{
		question: "Should I use τον or του?",
		explanation: ["receiving action", "possession"],
		examples: [
			{ label: "Action", greek: "θέλω τον καφέ" },
			{ label: "Possession", greek: "το σπίτι του φίλου" },
		],
	},
	{
		question: "Should I use το or τα?",
		explanation: ["one thing", "many"],
		examples: [
			{ label: "One", greek: "το βιβλίο" },
			{ label: "Many", greek: "τα βιβλία" },
		],
	},
];

const VOCATIVE_CHANGES = [
	{ pattern: "-ος → -ε", example: "φίλε!" },
	{ pattern: "-ας → -α", example: "πατέρα!" },
	{ pattern: "-ης → -η", example: "μαθητή!" },
];

// ═══════════════════════════════════════════════════════════════════════════════
// Utilities
// ═══════════════════════════════════════════════════════════════════════════════

const getParadigms = (ids: readonly string[]): AgreementParadigm[] =>
	ids
		.map((id) => AGREEMENT_PARADIGMS.find((p) => p.id === id))
		.filter((p): p is AgreementParadigm => p !== undefined);

const getEnding = (paradigm: AgreementParadigm, caseType: Case) =>
	paradigm.forms.find((f) => f.case === caseType)?.ending ?? "—";

const getFull = (paradigm: AgreementParadigm, caseType: Case) =>
	paradigm.forms.find((f) => f.case === caseType)?.full ?? "—";

const nomEqualsAcc = (paradigm: AgreementParadigm) =>
	getEnding(paradigm, "Nom") === getEnding(paradigm, "Acc");

// ═══════════════════════════════════════════════════════════════════════════════
// Sub-components
// ═══════════════════════════════════════════════════════════════════════════════

const CaseGuide = () => (
	<ContentSection title="Which case should I use?" colorScheme="ocean">
		<div className="p-4 space-y-3">
			{CASE_QUESTIONS.map(({ case: c, question, greek, english }) => (
				<div key={c} className="flex items-start gap-3">
					<span className="font-mono text-xs bg-stone-100 px-2 py-1 rounded shrink-0">
						{c}
					</span>
					<div>
						<span className="font-medium text-sm">{question}</span>
						<div className="text-stone-500 text-sm">
							<MonoText variant="greek" size="sm">
								{greek}
							</MonoText>{" "}
							({english})
						</div>
					</div>
				</div>
			))}
			<p className="text-sm text-stone-500 pt-2 border-t border-stone-100">
				All prepositions (σε, με, για, από...) take accusative.
			</p>
		</div>
	</ContentSection>
);

const GenderHints = () => (
	<Card variant="bordered" padding="md" className="bg-stone-50/50">
		<div className="text-sm font-medium text-stone-700 mb-3">
			Recognise gender by ending
		</div>
		<div className="grid grid-cols-3 gap-3 text-sm">
			{(["masculine", "feminine", "neuter"] as const).map((gender) => (
				<div key={gender} className="space-y-1">
					<div className="flex items-center gap-1.5">
						<span className={`w-2.5 h-2.5 rounded-full bg-gender-${gender}`} />
						<span className={`font-medium text-gender-${gender} capitalize`}>
							{gender}
						</span>
					</div>
					<div className="text-stone-600 text-xs">
						{GENDER_HINTS[gender].endings}
					</div>
					<div className="text-stone-500 text-xs">
						{GENDER_HINTS[gender].hint}
					</div>
				</div>
			))}
		</div>
		<p className="text-xs text-stone-500 mt-3 pt-2 border-t border-stone-200">
			The ending tells you the gender → the gender tells you how it declines
		</p>
	</Card>
);

const ViewToggle = ({
	mode,
	onChange,
}: {
	mode: "endings" | "full";
	onChange: (mode: "endings" | "full") => void;
}) => (
	<div className="flex rounded-lg border border-stone-200 overflow-hidden text-xs">
		{(["endings", "full"] as const).map((m) => (
			<button
				key={m}
				type="button"
				onClick={() => onChange(m)}
				className={`px-3 py-1.5 transition-colors ${
					mode === m
						? "bg-stone-700 text-white"
						: "bg-white text-stone-600 hover:bg-stone-50"
				}`}
			>
				{m === "endings" ? "Endings" : "Full forms"}
			</button>
		))}
	</div>
);

const ParadigmTable = ({
	paradigms,
	mode = "endings",
	showNomAccHighlight = false,
}: {
	paradigms: AgreementParadigm[];
	mode?: "endings" | "full";
	showNomAccHighlight?: boolean;
}) => (
	<div className="overflow-x-auto -mx-4 px-4">
		<table className="w-full text-sm min-w-[280px]">
			<thead>
				<tr className="border-b border-stone-200">
					<th className="text-left py-2 pr-2 font-medium text-stone-500 text-xs w-12">
						Case
					</th>
					{paradigms.map((p) => (
						<th
							key={p.id}
							className={`text-left py-2 px-2 font-medium text-xs text-gender-${p.gender}`}
						>
							<MonoText size="sm">{p.pattern}</MonoText>
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{CASES.map((caseType) => (
					<tr key={caseType} className="border-b border-stone-100">
						<td className="py-2 pr-2 text-stone-500 text-xs">{caseType}</td>
						{paradigms.map((p) => {
							const highlight =
								showNomAccHighlight && caseType === "Acc" && nomEqualsAcc(p);
							const value =
								mode === "endings" ? getEnding(p, caseType) : getFull(p, caseType);
							return (
								<td
									key={p.id}
									className={`py-2 px-2 ${highlight ? "bg-olive-50" : ""}`}
								>
									<MonoText
										size="sm"
										variant={p.gender}
										className={highlight ? "font-medium" : ""}
									>
										{value}
									</MonoText>
									{highlight && (
										<span className="ml-1 text-olive-600 text-xs">★</span>
									)}
								</td>
							);
						})}
					</tr>
				))}
			</tbody>
		</table>
	</div>
);

const EssentialPatterns = () => {
	const [mode, setMode] = useState<"endings" | "full">("endings");
	const paradigms = getParadigms(ESSENTIAL_IDS);

	return (
		<Card variant="bordered" padding="md" className="bg-white">
			<div className="space-y-3">
				<div className="flex items-center justify-between">
					<div className="text-sm font-medium text-stone-700">
						Essential patterns
					</div>
					<ViewToggle mode={mode} onChange={setMode} />
				</div>
				<ParadigmTable
					paradigms={paradigms}
					mode={mode}
					showNomAccHighlight={true}
				/>
				<div className="pt-3 border-t border-stone-200">
					<div className="flex items-start gap-2">
						<span className="text-olive-600 text-lg">★</span>
						<div>
							<div className="text-sm font-medium text-olive-700">
								Feminine & neuter: Nominative = Accusative
							</div>
							<p className="text-sm text-stone-600">
								Only genitive changes. Less to memorise!
							</p>
						</div>
					</div>
					<p className="text-xs text-stone-500 mt-2">
						Masculine is the tricky one — it changes in every case.
					</p>
				</div>
			</div>
		</Card>
	);
};

const GenderVariants = ({ gender }: { gender: Gender }) => {
	const paradigms = getParadigms(GENDER_PATTERNS[gender]);
	if (paradigms.length === 0) return null;

	const title = `${gender.charAt(0).toUpperCase()}${gender.slice(1)} variants`;

	return (
		<ContentSection title={title} colorScheme={gender}>
			<div className="p-3">
				<ParadigmTable paradigms={paradigms} mode="endings" />
				<div className="flex flex-wrap gap-x-3 gap-y-1 mt-3 pt-2 border-t border-stone-200 text-xs text-stone-600">
					{paradigms.map((p) => (
						<span key={p.id}>
							<MonoText size="sm" variant={gender}>
								{p.pattern}
							</MonoText>{" "}
							{p.example}
						</span>
					))}
				</div>
			</div>
		</ContentSection>
	);
};

const DecisionGuide = () => (
	<CollapsibleSection
		title="When you're unsure"
		colorScheme="honey"
		defaultOpen={false}
	>
		<div className="p-4 space-y-3">
			{DECISION_GUIDES.map(({ question, explanation, examples }) => (
				<div key={question} className="p-3 bg-stone-50 rounded-lg">
					<div className="font-medium text-sm text-stone-700 mb-1">
						"{question}"
					</div>
					<p className="text-sm text-stone-600">
						Is it <strong>{explanation[0]}</strong> or{" "}
						<strong>{explanation[1]}</strong>?
					</p>
					<div className="mt-2 space-y-1 text-sm">
						{examples.map(({ label, greek }) => (
							<div key={label} className="flex items-center gap-2">
								<span className="text-stone-400">{label}:</span>
								<MonoText variant="greek" size="sm">
									{greek}
								</MonoText>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	</CollapsibleSection>
);

const VocativeSection = () => (
	<CollapsibleSection
		title="Vocative (direct address)"
		colorScheme="default"
		defaultOpen={false}
	>
		<div className="p-4 space-y-4">
			<p className="text-sm text-stone-600">
				When calling someone directly, masculine nouns change. Feminine and
				neuter stay the same.
			</p>
			<div className="grid grid-cols-2 gap-4 text-sm">
				<div>
					<div className="font-medium text-gender-masculine mb-2">
						Masculine changes
					</div>
					<div className="space-y-1">
						{VOCATIVE_CHANGES.map(({ pattern, example }) => (
							<div key={pattern}>
								<MonoText size="sm">{pattern}</MonoText>{" "}
								<span className="text-stone-500">{example}</span>
							</div>
						))}
					</div>
				</div>
				<div>
					<div className="font-medium text-stone-600 mb-2">Fem & Neut</div>
					<p className="text-stone-500">Same as nominative</p>
					<div className="mt-1 text-stone-500">γυναίκα! παιδί!</div>
				</div>
			</div>
		</div>
	</CollapsibleSection>
);

const ArticlesLink = () => (
	<Card variant="bordered" padding="md" className="bg-stone-50">
		<div className="flex items-center justify-between">
			<div>
				<div className="text-sm font-medium text-stone-700">
					Article forms by case
				</div>
				<p className="text-xs text-stone-500">See the definite article paradigm</p>
			</div>
			<Link
				to="/reference/articles"
				className="flex items-center gap-1 text-sm text-olive-600 hover:text-olive-700"
			>
				Articles <ArrowRight size={14} />
			</Link>
		</div>
	</Card>
);

// ═══════════════════════════════════════════════════════════════════════════════
// Main Export
// ═══════════════════════════════════════════════════════════════════════════════

export const NounsSection = () => (
	<section id="nouns" className="space-y-6">
		<SectionHeading
			title="How Noun Endings Change"
			subtitle="Patterns by gender and case"
		/>
		<CaseGuide />
		<GenderHints />
		<EssentialPatterns />
		<GenderVariants gender="masculine" />
		<GenderVariants gender="feminine" />
		<GenderVariants gender="neuter" />
		<DecisionGuide />
		<VocativeSection />
		<ArticlesLink />
	</section>
);
