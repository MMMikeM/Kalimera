import { Link } from "@tanstack/react-router";
import type React from "react";
import { useState } from "react";

import { CollapsibleSection } from "@/components/CollapsibleSection";
import { MonoText } from "@/components/MonoText";
import { type AoristClass, classifyAorist } from "@/lib/aorist-class";
import { deviatingPersons } from "@/lib/paradigm-deviation";
import { cn } from "@/lib/utils";
import type { VerbInventoryRow } from "@/server/db/queries/vocabulary";

interface ClassifiedVerb {
	id: number;
	present: string;
	aorist: string;
	future: string | null;
	english: string;
	rank: number;
	klass: AoristClass;
}

export type Paradigm = Record<string, Record<string, string>>;

const RULE_GROUPS: { klass: AoristClass; label: string; becomes: string }[] = [
	{ klass: "psi", label: "-πω -βω -φω -εύω", becomes: "-ψα" },
	{ klass: "ksi", label: "-κω -γω -χω -χνω", becomes: "-ξα" },
	{ klass: "sigma", label: "-νω -ώνω, vowel", becomes: "-σα" },
	{ klass: "zo", label: "-ζω", becomes: "-σα" },
	{ klass: "contracted", label: "-άω -ώ", becomes: "-ησα -εσα -ασα" },
	{ klass: "deponent", label: "-ομαι -άμαι", becomes: "-θηκα -τηκα -ηκα" },
];

export const classifyVerbs = (rows: VerbInventoryRow[]): ClassifiedVerb[] =>
	rows
		.flatMap((row) => {
			const form = (tense: string) =>
				row.verbConjugations.find((c) => c.tense === tense)?.form ?? null;
			const present = form("present");
			const aorist = form("aorist");
			if (!present || !aorist) return [];
			return [
				{
					id: row.id,
					present,
					aorist,
					future: form("future"),
					english: row.englishTranslation,
					rank: row.frequencyRank ?? Number.MAX_SAFE_INTEGER,
					klass: classifyAorist(present, aorist),
				},
			];
		})
		.sort((a, b) => a.rank - b.rank);

const PERSONS: [string, string][] = [
	["sg1", "I"],
	["sg2", "you"],
	["sg3", "s/he"],
	["pl1", "we"],
	["pl2", "you all"],
	["pl3", "they"],
];

const TENSES = ["present", "aorist", "future"] as const;

/**
 * Three weights, not two: sg1 always anchors, so a verb like έχω whose paradigm holds
 * together perfectly still has somewhere for the eye to land instead of greying out whole.
 */
const weightOf = (person: string, deviating: string[]): string => {
	if (deviating.includes(person)) return "font-semibold text-stone-900";
	return person === "sg1" ? "text-stone-700" : "text-stone-400";
};

const ParadigmGrid: React.FC<{ paradigm: Paradigm }> = ({ paradigm }) => {
	const deviating = Object.fromEntries(
		TENSES.map((tense) => [tense, deviatingPersons(paradigm[tense] ?? {})]),
	) as Record<string, string[]>;

	return (
		<table className="w-full border-separate border-spacing-0 text-sm">
			<tbody>
				{PERSONS.map(([key, label]) => (
					<tr key={key}>
						<td className="w-16 py-0.5 text-xs text-stone-400">{label}</td>
						{TENSES.map((tense) => (
							<td key={tense} className="py-0.5 pr-3">
								<MonoText variant="greek" size="sm" className={weightOf(key, deviating[tense] ?? [])}>
									{paradigm[tense]?.[key] ?? "—"}
								</MonoText>
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
};

const CELL = "py-1.5 pr-3 align-baseline";

const VerbRow: React.FC<{
	verb: ClassifiedVerb;
	columns: number;
	showFuture?: boolean;
	paradigm?: Paradigm;
}> = ({ verb, columns, showFuture, paradigm }) => {
	const [open, setOpen] = useState(false);
	const toggle = () => paradigm && setOpen(!open);

	return (
		<>
			<tr
				{...(paradigm
					? {
							onClick: toggle,
							onKeyDown: (e: React.KeyboardEvent) => {
								if (e.key === "Enter" || e.key === " ") {
									e.preventDefault();
									toggle();
								}
							},
							tabIndex: 0,
							role: "button",
							"aria-expanded": open,
							className: "cursor-pointer border-t border-stone-100",
						}
					: { className: "border-t border-stone-100" })}
			>
				<td className={CELL}>
					<MonoText variant="greek" size="sm" className="text-stone-500">
						{verb.present}
					</MonoText>
				</td>
				<td className={CELL}>
					<MonoText variant="greek" size="sm" className="font-semibold text-stone-900">
						{verb.aorist}
					</MonoText>
				</td>
				{showFuture && (
					<td className={CELL}>
						<MonoText variant="greek" size="sm" className="text-stone-500">
							{verb.future ?? "—"}
						</MonoText>
					</td>
				)}
				<td className={cn(CELL, "pr-0 text-xs whitespace-nowrap text-stone-400")}>
					<span className="flex items-baseline justify-between gap-4">
						{verb.english}
						{paradigm && <span className="text-stone-300">{open ? "−" : "+"}</span>}
					</span>
				</td>
			</tr>
			{paradigm && open && (
				<tr>
					<td colSpan={columns} className="pb-3">
						<div className="rounded-lg bg-stone-50 px-3 py-2">
							<ParadigmGrid paradigm={paradigm} />
						</div>
					</td>
				</tr>
			)}
		</>
	);
};

/** Fixed columns, one header per card: the point of the page is scanning the past column. */
const VerbTable: React.FC<{
	verbs: ClassifiedVerb[];
	showFuture?: boolean;
	paradigms?: Record<number, Paradigm>;
}> = ({ verbs, showFuture, paradigms }) => {
	const columns = showFuture ? 4 : 3;

	return (
		<div className="overflow-x-auto">
			<table className="w-full min-w-96 text-sm">
				<thead>
					<tr className="text-xs tracking-widest text-stone-400 uppercase">
						<th className="w-1/4 pb-1 text-left font-medium">present</th>
						<th className="w-1/4 pb-1 text-left font-medium">past</th>
						{showFuture && <th className="w-1/4 pb-1 text-left font-medium">future</th>}
						<th className="pb-1 text-left font-medium">meaning</th>
					</tr>
				</thead>
				<tbody>
					{verbs.map((verb) => (
						<VerbRow
							key={verb.present}
							verb={verb}
							columns={columns}
							showFuture={showFuture}
							paradigm={paradigms?.[verb.id]}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
};

const plain = (s: string) =>
	s
		.normalize("NFD")
		.replace(/[̀-ͯ]/g, "")
		.toLowerCase();

/** Thirty-four verbs is a list; five sets of six is something you can actually work through. */
const irregularGroup = (verb: ClassifiedVerb): string => {
	const p = plain(verb.present);
	const a = plain(verb.aorist).replace(/^[εη]/, "");
	if (p.endsWith("αινω")) return "aino";
	if (!a.startsWith(plain(verb.present).slice(0, 2).replace(/[^α-ω]/g, ""))) return "suppletive";
	if (/[^σξψ]α$/.test(a)) return "bare";
	return "stem";
};

const IRREGULAR_GROUPS: { key: string; title: string; blurb: string; accent: string }[] = [
	{
		key: "suppletive",
		title: "A different word entirely",
		blurb: "No thread connects the two — learn the pair and move on.",
		accent: "border-l-sunset bg-sunset-50/40",
	},
	{
		key: "aino",
		title: "The -αίνω verbs",
		blurb: "One family, two habits: a past in -ηκα, or the bare stem.",
		accent: "border-l-navy bg-navy-50/40",
	},
	{
		key: "bare",
		title: "Stem plus -α, no σ",
		blurb: "Mostly states. The past is the stem with an ending stuck on.",
		accent: "border-l-honey bg-honey-50/40",
	},
	{
		key: "stem",
		title: "The stem shifts",
		blurb: "Recognisable, but not derivable.",
		accent: "border-l-slate bg-slate-50/40",
	},
];

/** The verbs whose past you cannot derive — short list, highest frequency, worth memorising. */
export const MemoriseSection: React.FC<{
	verbs: ClassifiedVerb[];
	paradigms: Record<number, Paradigm>;
}> = ({ verbs, paradigms }) => {
	const irregulars = verbs.filter((v) => v.klass === "irregular");

	return (
		<section className="space-y-4">
			<p className="px-1 text-sm text-stone-600">
				{irregulars.length} verbs whose past you cannot work out from the present — and they are the
				ones you will use most. Grouped by how they misbehave.
			</p>

			{IRREGULAR_GROUPS.map((group) => {
				const members = irregulars.filter((v) => irregularGroup(v) === group.key);
				if (members.length === 0) return null;
				return (
					<div
						key={group.key}
						className={cn("overflow-hidden rounded-xl border border-l-4 border-stone-200", group.accent)}
					>
						<div className="border-b border-stone-100 px-4 py-2.5">
							<div className="flex items-baseline gap-2">
								<h3 className="text-sm font-semibold text-stone-800">{group.title}</h3>
								<span className="text-xs text-stone-400">{members.length}</span>
							</div>
							<p className="text-xs text-stone-500">{group.blurb}</p>
						</div>
						<div className="bg-white px-4 py-2">
							<VerbTable verbs={members} showFuture paradigms={paradigms} />
						</div>
					</div>
				);
			})}
		</section>
	);
};

/** Everything else: pick the rule off the ending and move on. */
export const RulesSection: React.FC<{ verbs: ClassifiedVerb[] }> = ({ verbs }) => {
	const exceptions = verbs.filter((v) => v.klass === "zo-exception");

	return (
		<section className="space-y-3">
			<div className="px-1">
				<p className="text-sm text-stone-600">
					Nothing to memorise per verb — read the ending, apply the rule.{" "}
					<Link to="/reference/verbs/$band" params={{ band: "past" }} className="underline">
						The rules are here
					</Link>
					.
				</p>
			</div>

			{RULE_GROUPS.map((group) => {
				const members = verbs.filter((v) => v.klass === group.klass);
				if (members.length === 0) return null;
				return (
					<div key={group.klass} className="rounded-xl border border-stone-200 bg-white">
						<div className="flex items-baseline gap-3 border-b border-stone-100 px-4 py-2.5">
							<MonoText size="sm" className="text-stone-600">
								{group.label}
							</MonoText>
							<span className="text-xs text-stone-300">→</span>
							<MonoText size="sm" className="font-bold text-navy-text">
								{group.becomes}
							</MonoText>
							<span className="ml-auto text-xs text-stone-400">{members.length} verbs</span>
						</div>
						<div className="px-4 py-2">
							<VerbTable verbs={members.slice(0, 6)} />
						</div>
						{members.length > 6 && (
							<CollapsibleSection
								title={`All ${members.length}`}
								colorScheme="stone"
								defaultOpen={false}
							>
								<div className="px-1">
									<VerbTable verbs={members.slice(6)} />
								</div>
							</CollapsibleSection>
						)}
						{group.klass === "zo" && exceptions.length > 0 && (
							<p className="border-t border-stone-100 px-4 py-2.5 text-xs text-stone-500">
								Four -ζω verbs take -ξα instead:{" "}
								{exceptions.map((v, i) => (
									<span key={v.present}>
										{i > 0 && ", "}
										<MonoText size="sm" className="text-stone-700">
											{v.present} → {v.aorist}
										</MonoText>
									</span>
								))}
							</p>
						)}
					</div>
				);
			})}
		</section>
	);
};
