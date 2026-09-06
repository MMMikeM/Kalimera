import { cn } from "tailwind-variants";
import type React from "react";
import { Fragment } from "react";

import { Callout } from "@/components/cards/Callout";
import { GreekText } from "@/components/GreekText";
import { type GrammarScheme, SCHEME } from "@/constants/grammar-palette";
import { HOMOGRAPH_ROWS } from "@/constants/homographs";

const Discriminator: React.FC<{ children: string }> = ({ children }) => (
	<span className="font-bold text-stone-800">{children}</span>
);

// The bold word is the one that changes between columns — it is the whole tell.
const COLUMNS = [
	{
		key: "article",
		heading: (
			<>
				Before a <Discriminator>noun</Discriminator>
			</>
		),
		gloss: "= “the”",
	},
	{
		key: "object",
		heading: (
			<>
				Before a <Discriminator>verb</Discriminator>
			</>
		),
		gloss: "= him / her / it",
	},
	{
		key: "possessive",
		heading: (
			<>
				<Discriminator>After</Discriminator> a noun
			</>
		),
		gloss: "= his / her / their",
	},
] as const;

interface FormGroup {
	label: string;
	scheme: GrammarScheme;
	forms: string[];
}

// The rows share a case within each block, so the row edge may carry the case
// colour: it marks the case, never which job the form is doing (no colour can).
const GROUPS: FormGroup[] = [
	{ label: "Target · singular", scheme: "case-accusative", forms: ["τον", "την", "το"] },
	{ label: "Target · plural", scheme: "case-accusative", forms: ["τους", "τις", "τα"] },
	{ label: "Owner", scheme: "case-genitive", forms: ["του", "της"] },
];

const grouped = GROUPS.map((group) => ({
	...group,
	rows: HOMOGRAPH_ROWS.filter((row) => group.forms.includes(row.form)),
}));

const matchedForms = new Set(grouped.flatMap((group) => group.rows.map((row) => row.form)));
const ungrouped = HOMOGRAPH_ROWS.filter((row) => !matchedForms.has(row.form));
const renderedGroups = ungrouped.length
	? [...grouped, { label: "Other", scheme: "neutral" as GrammarScheme, rows: ungrouped }]
	: grouped;

/**
 * Shown in both the Articles and the Pronouns tab. Each tab teaches one half of a
 * paradigm whose third person is spelled exactly like the other half, so whichever
 * one the learner opens first, they meet the collision there.
 */
export const HomographCallout: React.FC<{ id: string }> = ({ id }) => (
	<div id={id} className="scroll-mt-24">
		<Callout scheme="neutral" title="Article or pronoun?">
			<p className="leading-relaxed text-stone-700">
				All eight forms for third person pronouns reuse the word for the equivalent article. The
				meanings can be differentiated by what they precede or follow.
			</p>

			<div className="overflow-x-auto">
				<table className="w-full border-collapse text-left">
					<thead>
						<tr>
							<td className="pr-3">
								<span className="sr-only">Form</span>
							</td>
							<th className="pr-3 pb-1">
								<span className="block w-full border-b-2 border-stone-300 pb-1 text-xs font-semibold tracking-widest text-stone-700 uppercase">
									As the article
								</span>
							</th>
							<th className="pr-3 pb-1" colSpan={2}>
								<span className="block w-full border-b-2 border-stone-300 pb-1 text-xs font-semibold tracking-widest text-stone-700 uppercase">
									As a pronoun
								</span>
							</th>
						</tr>
						<tr>
							<th className="py-2 pr-3 pl-2 text-xs tracking-widest text-stone-500 uppercase">
								Form
							</th>
							{COLUMNS.map((column) => (
								<th
									key={column.key}
									className="py-2 pr-3 text-xs tracking-widest text-stone-500 uppercase"
								>
									{column.heading}
									<span className="block text-xs tracking-normal normal-case">{column.gloss}</span>
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{renderedGroups.map((group) => {
							const style = SCHEME[group.scheme];
							return (
								<Fragment key={group.label}>
									<tr>
										<td
											colSpan={4}
											className={cn(
												"border-t border-stone-200 pt-3 pb-1 pl-2 text-xs font-semibold tracking-widest uppercase",
												style.text,
											)}
										>
											{group.label}
										</td>
									</tr>
									{group.rows.map((row) => (
										<tr key={`${row.form}-${row.gender}`} className="border-t border-stone-200/70">
											<GreekText
												as="td"
												tone={row.gender}
												size="sm"
												className={cn("border-l-2 py-2 pr-3 pl-2", style.border)}
											>
												{row.form}
											</GreekText>
											{COLUMNS.map((column) => {
												const example = row[column.key];
												return example ? (
													<GreekText
														as="td"
														key={column.key}
														tone="default"
														size="sm"
														className="py-2 pr-3 whitespace-nowrap"
													>
														{example}
													</GreekText>
												) : (
													<td key={column.key} className="py-2 pr-3 text-stone-300">
														—
													</td>
												);
											})}
										</tr>
									))}
								</Fragment>
							);
						})}
					</tbody>
				</table>
			</div>
		</Callout>
	</div>
);
