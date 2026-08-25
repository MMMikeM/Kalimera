import type React from "react";

import { Callout } from "@/components/cards";
import { GreekText } from "@/components/GreekText";
import { HOMOGRAPH_ROWS } from "@/constants/homographs";

const COLUMNS = [
	{ key: "article", heading: "Before a noun", gloss: "= “the”" },
	{ key: "object", heading: "Before a verb", gloss: "= him / her / it" },
	{ key: "possessive", heading: "After a noun", gloss: "= his / her / their" },
] as const;

/**
 * Shown in both the Articles and the Pronouns tab. Each tab teaches one half of a
 * paradigm whose third person is spelled exactly like the other half, so whichever
 * one the learner opens first, they meet the collision there.
 */
export const HomographCallout: React.FC<{ id: string }> = ({ id }) => (
	<div id={id} className="scroll-mt-24">
		<Callout
			scheme="neutral"
			title="Same word, two jobs"
			footer="Case colour cannot separate these — τον φίλο and τον ξέρω are both Target. The word beside it is the only tell."
		>
			<p className="leading-relaxed text-stone-700">
				Every third-person pronoun is spelled like an article. Eight forms do double duty, and
				nothing about the form itself says which one you are reading — only its neighbour does.
			</p>

			<div className="overflow-x-auto">
				<table className="w-full border-collapse text-left">
					<thead>
						<tr>
							<th className="py-2 pr-3 text-xs tracking-widest text-stone-500 uppercase">Form</th>
							{COLUMNS.map((column) => (
								<th
									key={column.key}
									className="py-2 pr-3 text-xs tracking-widest text-stone-500 uppercase"
								>
									{column.heading}
									<span className="block text-[0.65rem] tracking-normal normal-case">
										{column.gloss}
									</span>
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{HOMOGRAPH_ROWS.map((row) => (
							<tr key={row.form} className="border-t border-stone-200">
								<GreekText as="td" tone="default" size="sm" className="py-2 pr-3 font-semibold">
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
					</tbody>
				</table>
			</div>
		</Callout>
	</div>
);
