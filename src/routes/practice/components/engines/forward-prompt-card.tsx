import type { LucideIcon } from "lucide-react";

import type { Gender, GrammaticalNumber } from "@/server/db/enums";

import { GENDER_CHIP, HERO_TEXT, NUMBER_CHIP, PERSON_CHIP } from "./chip-specs";
import type { Person } from "./drill-constants";

interface PromptFacet {
	icon: LucideIcon;
	label: string;
	colorText: string;
}

interface ForwardPromptCardProps {
	facets: PromptFacet[];
	gloss?: React.ReactNode;
}

export const ForwardPromptCard = ({ facets, gloss }: ForwardPromptCardProps) => (
	<div className="mx-auto flex w-full max-w-72 flex-col">
		<ul className="flex flex-col divide-y divide-stone-200/70">
			{facets.map((f, i) => {
				const Icon = f.icon;
				return (
					<li
						key={i}
						className={`flex items-center gap-5 py-4 ${f.colorText}`}
						aria-label={f.label}
					>
						<Icon size={32} strokeWidth={1.5} aria-hidden className="shrink-0" />
						<span className="font-serif text-5xl leading-none tracking-tight lowercase">
							{f.label}
						</span>
					</li>
				);
			})}
		</ul>
		{gloss ? (
			<p className="mt-4 font-serif text-base text-muted-foreground italic">{gloss}</p>
		) : null}
	</div>
);

/** Person and number, plus gender when the form has one: the pronoun drills' prompt. */
export const personFacets = (
	{ person, number, gender }: { person: Person; number: GrammaticalNumber; gender: Gender | "" },
	personColour: string = HERO_TEXT.person[person],
): PromptFacet[] => [
	{ icon: PERSON_CHIP[person].icon, label: PERSON_CHIP[person].longLabel, colorText: personColour },
	{
		icon: NUMBER_CHIP[number].icon,
		label: NUMBER_CHIP[number].longLabel,
		colorText: HERO_TEXT.number[number],
	},
	...(gender
		? [
				{
					icon: GENDER_CHIP[gender].icon,
					label: GENDER_CHIP[gender].longLabel,
					colorText: HERO_TEXT.gender[gender],
				},
			]
		: []),
];
