import { GreekText, LookupCard } from "kalimera";

const GREEK_ADDS = [
	{ article: "η", after: " Ελλάδα", english: "Greece", note: "Countries, and first names in speech" },
	{ article: "η", after: " αγάπη είναι τυφλή", english: "love is blind", note: "Abstract nouns" },
	{
		article: "ο",
		after: " φίλος μου",
		english: "my friend",
		note: "Possessives keep the article",
	},
	{ article: "το", after: " Σάββατο", english: "on Saturday", note: "Days and dates" },
];

export const Decision = () => (
	<div className="max-w-sm">
		<LookupCard scheme="decision" chip="Greek adds it" eyebrow="English doesn't">
			<ul className="divide-y divide-honey-200">
				{GREEK_ADDS.map((row) => (
					<li key={row.after} className="px-5 py-3.5">
						<div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
							<GreekText size="xl">
								<span className="font-bold">{row.article}</span>
								{row.after}
							</GreekText>
							<span className="text-sm text-stone-500 italic">{row.english}</span>
						</div>
						<p className="mt-0.5 text-xs text-stone-500">{row.note}</p>
					</li>
				))}
			</ul>
		</LookupCard>
	</div>
);

export const Neutral = () => (
	<div className="max-w-sm">
		<LookupCard scheme="neutral" chip="Greek drops it" eyebrow="English keeps it">
			<div className="px-5 py-5">
				<GreekText size="2xl" className="block leading-snug">
					είναι γιατρός
				</GreekText>
				<p className="mt-1 text-sm text-stone-500 italic">he is a doctor</p>
				<p className="mt-4 text-sm leading-relaxed text-stone-600">
					Professions after <GreekText size="sm">είμαι</GreekText> take no article at all.
				</p>
			</div>
		</LookupCard>
	</div>
);

const NEUTER_ENDINGS = [
	{ ending: "-ο", example: "το βιβλίο", english: "the book" },
	{ ending: "-ι", example: "το παιδί", english: "the child" },
	{ ending: "-μα", example: "το όνομα", english: "the name" },
];

export const Gender = () => (
	<div className="max-w-sm">
		<LookupCard scheme="gender-neuter" chip="Neuter" eyebrow="Three endings">
			<ul>
				{NEUTER_ENDINGS.map((row, index) => (
					<li
						key={row.ending}
						className={`flex items-baseline gap-4 px-5 py-3 ${index > 0 ? "border-t border-gender-neuter-200" : ""}`}
					>
						<GreekText size="lg" weight="bold" className="w-10 shrink-0">
							{row.ending}
						</GreekText>
						<GreekText size="lg">{row.example}</GreekText>
						<span className="text-sm text-stone-500 italic">{row.english}</span>
					</li>
				))}
			</ul>
		</LookupCard>
	</div>
);
