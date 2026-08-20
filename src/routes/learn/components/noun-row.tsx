import { useState } from "react";
import type React from "react";

import { GreekText } from "@/components/GreekText";
import type { BrowsableNoun, NounGender } from "@/lib/noun-browser-groups";
import { getArticle } from "@/lib/greek-grammar";

const GENDER_STYLES: Record<NounGender, { text: string; bg: string; border: string }> = {
	masculine: {
		text: "text-gender-masculine-text",
		bg: "bg-gender-masculine-100",
		border: "border-gender-masculine-500",
	},
	feminine: {
		text: "text-gender-feminine-text",
		bg: "bg-gender-feminine-100",
		border: "border-gender-feminine-500",
	},
	neuter: {
		text: "text-gender-neuter-text",
		bg: "bg-gender-neuter-100",
		border: "border-gender-neuter-500",
	},
};

/** Longer endings first, so -μα matches before -α. */
const NOUN_ENDINGS = [
	"ματα", "εις", "μα", "ος", "ός", "ας", "άς", "ης", "ής", "α", "ά", "η", "ή", "ο", "ό", "ι", "ί", "ϊ",
];

const splitEnding = (lemma: string): { stem: string; ending: string } => {
	const ending = NOUN_ENDINGS.find((e) => lemma.endsWith(e)) ?? "";
	return { stem: ending ? lemma.slice(0, -ending.length) : lemma, ending };
};

const CASE_ROWS = [
	{ key: "nominative", handle: "Doer", grammar: "Nominative", scheme: "text-ocean-text" },
	{ key: "accusative", handle: "Target", grammar: "Accusative", scheme: "text-terracotta-text" },
	{ key: "genitive", handle: "Owner", grammar: "Genitive", scheme: "text-olive-text" },
] as const;

const cell = (noun: BrowsableNoun, caseKey: string, number: "singular" | "plural") => {
	const stored = noun.forms[`${caseKey}_${number}`];
	if (!stored) return null;
	return stored.article ? `${stored.article} ${stored.form}` : stored.form;
};

/**
 * Declension for one noun, shown only once the row is opened. Cases are rows and
 * number are columns, matching the reference tables, so a learner moving between
 * the two surfaces reads the same shape in the same place.
 */
const NounParadigm: React.FC<{ noun: BrowsableNoun }> = ({ noun }) => (
	<table className="w-full text-sm">
		<thead>
			<tr className="text-xs tracking-widest text-stone-400 uppercase">
				<th className="w-24 pb-1 text-left font-medium" aria-label="Case" />
				<th className="pb-1 text-left font-medium">singular</th>
				<th className="pb-1 text-left font-medium">plural</th>
			</tr>
		</thead>
		<tbody>
			{CASE_ROWS.map((row) => {
				const singular = cell(noun, row.key, "singular");
				const plural = cell(noun, row.key, "plural");
				if (!singular && !plural) return null;
				return (
					<tr key={row.key} className="border-t border-stone-200/60">
						<td className={`py-1.5 pr-3 align-baseline text-xs font-semibold ${row.scheme}`}>
							<span className="block leading-tight">{row.handle}</span>
							<span className="block text-xs font-normal opacity-70">{row.grammar}</span>
						</td>
						<td className="py-1.5 pr-3 align-baseline">
							<GreekText size="sm" tone="default">
								{singular ?? "—"}
							</GreekText>
						</td>
						<td className="py-1.5 align-baseline">
							<GreekText size="sm" tone="muted">
								{plural ?? "—"}
							</GreekText>
						</td>
					</tr>
				);
			})}
		</tbody>
	</table>
);

export const NounRow: React.FC<{ noun: BrowsableNoun }> = ({ noun }) => {
	const [open, setOpen] = useState(false);
	// Numerals have no gender and no stored paradigm, so there is nothing to open.
	const expandable = Object.keys(noun.forms).length > 0;
	const toggle = () => expandable && setOpen(!open);

	const styles = noun.gender ? GENDER_STYLES[noun.gender] : null;
	const article = noun.gender ? getArticle(noun.gender) : null;
	const { stem, ending } = splitEnding(noun.lemma);

	return (
		<div className={`border-l-4 ${styles?.border ?? "border-stone-200"}`}>
			<div
				{...(expandable
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
							className: "cursor-pointer px-3 py-2.5",
						}
					: { className: "px-3 py-2.5" })}
			>
				<div className="flex items-baseline gap-2">
					{article && styles && (
						<span className={`rounded px-1.5 py-0.5 text-sm font-bold ${styles.text} ${styles.bg}`}>
							{article}
						</span>
					)}
					<GreekText tone="accent" size="lg" className="text-stone-900">
						{ending ? (
							<>
								{stem}
								<span className={styles?.text}>{ending}</span>
							</>
						) : (
							noun.lemma
						)}
					</GreekText>
					{expandable && (
						<span className="ml-auto text-stone-300" aria-hidden="true">
							{open ? "−" : "+"}
						</span>
					)}
				</div>
				<div className={`mt-0.5 text-xs text-stone-500 ${article ? "ml-8" : ""}`}>
					{noun.english}
				</div>
			</div>
			{open && (
				<div className="px-3 pb-3">
					<div className="rounded-lg bg-stone-50 px-3 py-2">
						<NounParadigm noun={noun} />
					</div>
				</div>
			)}
		</div>
	);
};
