import type React from "react";
import { Fragment } from "react";
import { cn } from "tailwind-variants";

import { Card } from "@/components/Card";
import { NextStepCard } from "@/components/cards/NextStepCard";
import { TeachingCard } from "@/components/cards/TeachingCard";
import { type ColumnDef, GrammarTable, type RowDef } from "@/components/GrammarTable";
import { GreekText } from "@/components/GreekText";
import { MarkedGreek } from "@/components/MarkedGreek";
import { CASE_KEY, CASE_SCHEME, SCHEME } from "@/constants/grammar-palette";
import {
	EMPHATIC_PRONOUNS,
	OBJECT_PRONOUNS,
	POSSESSIVE_PRONOUNS,
	PRONOUN_JOBS,
	PRONOUN_PHRASES,
	type PronounParadigm,
	SUBJECT_PRONOUNS,
} from "@/constants/pronouns";
import { typedEntries } from "@/lib/object";
import type { GrammaticalNumber, NominalCase } from "@/server/db/enums";

import { BandHeading } from "./BandHeading";
import { HeaderChip } from "./case-table";
import { HomographCallout } from "./homograph-callout";

const NOTE_LEAD = "text-stone-800";

const PRONOUN_NOTES: Array<{ key: string; body: React.ReactNode }> = [
	{
		key: "which",
		body: (
			<>
				<strong className={NOTE_LEAD}>Not sure which?</strong> A preposition in front means{" "}
				<GreekText tone="accusative">εμένα</GreekText>. If English could say “to” (tell{" "}
				<em>to</em> me), it's <GreekText tone="genitive">μου</GreekText>. Otherwise,{" "}
				<GreekText tone="accusative">με</GreekText>.
			</>
		),
	},
	{
		key: "double-duty",
		body: (
			<>
				<strong className={NOTE_LEAD}>
					<GreekText>μας</GreekText> and <GreekText>σας</GreekText> do double duty.
				</strong>{" "}
				One word covers Target and Owner:{" "}
				<MarkedGreek greek="μας βλέπει" marked="μας" tone="accusative" /> (he sees us),{" "}
				<MarkedGreek greek="το σπίτι μας" marked="μας" tone="genitive" /> (our house).
			</>
		),
	},
	{
		key: "doer",
		body: (
			<>
				<strong className={NOTE_LEAD}>The Doer usually drops out.</strong> The verb ending
				already says who: <GreekText>θέλω</GreekText> is “I want”.{" "}
				<GreekText tone="nominative">εγώ</GreekText> and{" "}
				<GreekText tone="nominative">εσύ</GreekText> come back for contrast:{" "}
				<MarkedGreek greek="εγώ θέλω τσάι, εσύ;" marked={["εγώ", "εσύ"]} tone="nominative" /> (I
				want tea; and you?)
			</>
		),
	},
	{
		key: "formal",
		body: (
			<>
				<strong className={NOTE_LEAD}>Formal “you” is plural.</strong> With strangers and
				elders, use <GreekText>σας</GreekText>:{" "}
				<MarkedGreek greek="σας ευχαριστώ" marked="σας" tone="accusative" /> (thank you),{" "}
				<MarkedGreek greek="η γνώμη σας" marked="σας" tone="genitive" /> (your opinion).
			</>
		),
	},
];

interface Clitic {
	greek: string;
	caseKey: NominalCase;
}

const ME: Clitic = { greek: "με", caseKey: "accusative" };
const TO_ME: Clitic = { greek: "μου", caseKey: "genitive" };
const IT: Clitic = { greek: "το", caseKey: "accusative" };

interface Placement {
	lead?: string;
	before?: Clitic[];
	verb: string;
	after?: Clitic[];
	english: string;
}

// Laid out as slots so the rule is visible in the alignment: the pronoun column
// never moves, whatever stands in front of it, until a command pushes it past
// the verb into a column of its own.
const STATEMENTS: Placement[] = [
	{ before: [ME], verb: "βλέπει", english: "he sees me" },
	{ lead: "θα", before: [ME], verb: "δει", english: "he will see me" },
	{ lead: "δεν", before: [ME], verb: "βλέπει", english: "he doesn't see me" },
	{ lead: "θέλω να", before: [ME], verb: "δεις", english: "I want you to see me" },
	{ before: [TO_ME, IT], verb: "δίνει", english: "he gives it to me" },
];

const COMMANDS: Placement[] = [
	{ verb: "δες", after: [ME], english: "look at me" },
	{ verb: "δώσε", after: [TO_ME, IT], english: "give it to me" },
];

const Clitics = ({ clitics }: { clitics?: Clitic[] }) =>
	clitics ? (
		<GreekText size="lg">
			{clitics.map((clitic, i) => (
				<Fragment key={clitic.greek}>
					{i > 0 ? " " : null}
					<GreekText tone={clitic.caseKey} size="lg">
						{clitic.greek}
					</GreekText>
				</Fragment>
			))}
		</GreekText>
	) : null;

const GREEK_CELL = "pt-2.5 pb-1 sm:pb-2.5";

/** A phone has no room for a fifth column, so there the English drops to a line of
 * its own under the pronoun and verb. */
const PlacementRow = ({ row }: { row: Placement }) => (
	<>
		<tr className="border-t border-stone-200">
			<td className={cn(GREEK_CELL, "pr-2 text-right whitespace-nowrap")}>
				{row.lead ? (
					<GreekText size="lg" tone="muted">
						{row.lead}
					</GreekText>
				) : null}
			</td>
			<td className={cn(GREEK_CELL, "pr-3 whitespace-nowrap")}>
				<Clitics clitics={row.before} />
			</td>
			<td className={cn(GREEK_CELL, "pr-3")}>
				<GreekText size="lg">{row.verb}</GreekText>
			</td>
			<td className={cn(GREEK_CELL, "pr-3 whitespace-nowrap")}>
				<Clitics clitics={row.after} />
			</td>
			<td className="hidden py-2.5 text-sm text-stone-500 italic sm:table-cell">{row.english}</td>
		</tr>
		<tr className="sm:hidden">
			<td aria-hidden="true" />
			<td colSpan={3} className="pb-2.5 text-xs text-stone-500 italic">
				{row.english}
			</td>
		</tr>
	</>
);

const PlacementTable = () => (
	<Card variant="bordered" padding="lg" className="overflow-x-auto px-4 sm:px-6">
		<table className="w-full text-left">
			<thead>
				<tr className="text-xs text-stone-500">
					<th className="pr-2 pb-2">
						<span className="sr-only">Before</span>
					</th>
					<th className="pr-3 pb-2 font-normal">Pronoun</th>
					<th className="pr-3 pb-2 font-normal">Verb</th>
					<th className="pr-3 pb-2">
						<span className="sr-only">Pronoun after the verb</span>
					</th>
					<th className="hidden pb-2 sm:table-cell">
						<span className="sr-only">English</span>
					</th>
				</tr>
			</thead>
			<tbody>
				{STATEMENTS.map((row) => (
					<PlacementRow key={row.english} row={row} />
				))}
				<tr>
					<th
						colSpan={5}
						scope="rowgroup"
						className="pt-6 pb-2 text-left text-xs font-semibold tracking-widest text-stone-500 uppercase"
					>
						Commands put it after
					</th>
				</tr>
				{COMMANDS.map((row) => (
					<PlacementRow key={row.english} row={row} />
				))}
			</tbody>
		</table>
	</Card>
);

const PLACEMENT_NOTES: Array<{ key: string; body: React.ReactNode }> = [
	{
		key: "two",
		body: (
			<>
				<strong className={NOTE_LEAD}>With two, the person comes first:</strong>{" "}
				<GreekText>
					<GreekText tone="genitive">μου</GreekText> <GreekText tone="accusative">το</GreekText>
				</GreekText>
				, never the other way round.
			</>
		),
	},
	{
		key: "my",
		body: (
			<>
				<strong className={NOTE_LEAD}>“My” goes after the noun</strong>, and the article stays:{" "}
				<MarkedGreek greek="το σπίτι μου" marked="μου" tone="genitive" />,{" "}
				<MarkedGreek greek="η μητέρα σου" marked="σου" tone="genitive" />.
			</>
		),
	},
];

type ColumnWeight = "receded" | "scanned" | "plain";

interface PronounColumn {
	key: string;
	paradigm: PronounParadigm[];
	caseKey: NominalCase;
	handle: string;
	/** Tells apart the two Target columns, which share a case. */
	form?: "short" | "long";
	note: string;
	/** The two short-form columns are the ones scanned daily; the Doer is usually dropped. */
	weight: ColumnWeight;
}

const PRONOUN_COLUMNS: PronounColumn[] = [
	{
		key: "doer",
		paradigm: SUBJECT_PRONOUNS,
		caseKey: "nominative",
		handle: "Doer",
		note: "usually dropped",
		weight: "receded",
	},
	{
		key: "target",
		paradigm: OBJECT_PRONOUNS,
		caseKey: "accusative",
		handle: "Target",
		form: "short",
		note: "before the verb",
		weight: "scanned",
	},
	{
		key: "owner",
		paradigm: POSSESSIVE_PRONOUNS,
		caseKey: "genitive",
		handle: "Owner",
		note: "my, to me",
		weight: "scanned",
	},
	{
		key: "strong",
		paradigm: EMPHATIC_PRONOUNS,
		caseKey: "accusative",
		handle: "Target",
		form: "long",
		note: "after a preposition",
		weight: "plain",
	},
];

// Four pills do not fit across a phone, so there the handle is plain text in its
// case colour, and the short/long qualifier moves to the line beneath.
const columnDefs: ColumnDef[] = PRONOUN_COLUMNS.map((column) => {
	const scheme = `case-${column.caseKey}` as const;
	return {
		key: column.key,
		label: (
			<span className="flex flex-col items-start gap-1">
				<span className={cn("text-xs font-semibold sm:hidden", SCHEME[scheme].text)}>
					{column.handle}
				</span>
				<HeaderChip scheme={scheme} className="hidden sm:inline-block">
					{column.handle}
					{column.form ? ` · ${column.form}` : null}
				</HeaderChip>
				<span className="text-xs font-normal text-stone-500">
					<span className="sm:hidden">{column.form}</span>
					<span className="hidden sm:inline">{column.note}</span>
				</span>
			</span>
		),
	};
});

const THIRD_PERSON_GENDER: Record<string, string> = {
	"3rd m": "masculine",
	"3rd f": "feminine",
	"3rd n": "neuter",
};

/** Rows are named by the English Doer. Plural "they" is one English word for three
 * Greek rows, so those carry their gender beneath. */
const personRows = (number: GrammaticalNumber): RowDef[] =>
	SUBJECT_PRONOUNS.map((row) => ({
		key: row.person,
		label: row[number].english,
		sublabel: number === "plural" ? THIRD_PERSON_GENDER[row.person] : undefined,
	}));

const PronounCell = ({
	column,
	index,
	number,
}: {
	column: PronounColumn;
	index: number;
	number: GrammaticalNumber;
}) => {
	const form = column.paradigm[index]?.[number];
	if (!form) return <span className="text-stone-300">—</span>;
	return (
		<GreekText
			size="sm"
			tone={column.weight === "receded" ? "muted" : "default"}
			weight={column.weight === "scanned" ? "semibold" : "normal"}
		>
			{form.greek}
		</GreekText>
	);
};

const PronounTable = () => (
	<Card variant="bordered" padding="lg" className="space-y-4 px-4 sm:px-6">
		<div className="-mx-4 overflow-x-auto px-4">
			<GrammarTable
				className="sm:table-fixed"
				columns={columnDefs}
				groups={(["singular", "plural"] as const).map((number) => ({
					label: number === "singular" ? "Singular" : "Plural",
					rows: personRows(number),
					cells: SUBJECT_PRONOUNS.map((_, index) =>
						PRONOUN_COLUMNS.map((column) => (
							<PronounCell key={column.key} column={column} index={index} number={number} />
						)),
					),
				}))}
				rowHeaderLabel="Person"
			/>
		</div>
		<p className="text-sm text-stone-600">
			After a preposition, <GreekText size="sm">εμένα</GreekText> and{" "}
			<GreekText size="sm">εσένα</GreekText> often lose their first{" "}
			<GreekText size="sm">ε</GreekText>: <GreekText size="sm">για μένα</GreekText>,{" "}
			<GreekText size="sm">χωρίς σένα</GreekText>.
		</p>
	</Card>
);

const INDEFINITE_COLUMNS: ColumnDef[] = [
	{ key: "some", label: "some" },
	{ key: "none", label: "no, any" },
	{ key: "every", label: "every" },
];

// Three kinds of thing across three quantities: laid out as a grid, the κάπ- of the
// "some" column and the όλ- of the "every" column show without being taught.
const INDEFINITES: Array<{ key: string; forms: Array<[greek: string, english: string]> }> = [
	{
		key: "thing",
		forms: [
			["κάτι", "something"],
			["τίποτα", "nothing, anything"],
			["όλα", "everything"],
		],
	},
	{
		key: "person",
		forms: [
			["κάποιος", "someone"],
			["κανένας", "no one, anyone"],
			["όλοι", "everyone"],
		],
	},
	{
		key: "place",
		forms: [
			["κάπου", "somewhere"],
			["πουθενά", "nowhere, anywhere"],
			["παντού", "everywhere"],
		],
	},
];

const IndefinitesTable = () => (
	<GrammarTable
		columns={INDEFINITE_COLUMNS}
		rows={INDEFINITES.map((row) => ({ key: row.key, label: row.key }))}
		cells={INDEFINITES.map((row) =>
			row.forms.map(([greek, english]) => (
				<span key={greek} className="block">
					<GreekText size="base" weight="medium" className="block">
						{greek}
					</GreekText>
					<span className="text-xs text-stone-500">{english}</span>
				</span>
			)),
		)}
		rowHeaderLabel="Kind"
	/>
);

const CATEGORY_LABELS: Record<string, string> = {
	requests: "Requests",
	opinions: "Opinions",
	questions: "Questions",
	answers: "Answers",
	family: "Family",
};

const phrasesByCategory = () => {
	const groups: Record<string, typeof PRONOUN_PHRASES> = {};
	for (const phrase of PRONOUN_PHRASES) {
		(groups[phrase.category] ??= []).push(phrase);
	}
	return groups;
};

const Phrases = () => (
	<div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
		{typedEntries(phrasesByCategory()).map(([category, phrases]) => (
			<div key={category}>
				<h4 className="mb-1 text-xs font-semibold tracking-widest text-stone-500 uppercase">
					{CATEGORY_LABELS[category] ?? category}
				</h4>
				<ul className="divide-y divide-stone-200 border-y border-stone-200">
					{phrases.map((phrase) => (
						<li key={phrase.greek} className="flex flex-wrap items-baseline gap-x-3 py-1.5">
							<GreekText weight="medium">{phrase.greek}</GreekText>
							<span className="text-sm text-stone-600">{phrase.english}</span>
						</li>
					))}
				</ul>
			</div>
		))}
	</div>
);

const RuledNotes = ({ notes }: { notes: Array<{ key: string; body: React.ReactNode }> }) => (
	<ul className="divide-y divide-stone-200 border-y border-stone-200">
		{notes.map((note) => (
			<li key={note.key} className="py-4 leading-relaxed text-stone-700">
				{note.body}
			</li>
		))}
	</ul>
);

export const PronounsSection: React.FC = () => (
	<section id="pronouns" className="space-y-16">
		<div className="space-y-8">
			<h2 className="sr-only">Three words for “me”</h2>
			<div className="grid gap-4 md:grid-cols-3 md:items-stretch">
				{PRONOUN_JOBS.map((job) => (
					<TeachingCard
						key={job.greek}
						scheme={CASE_SCHEME[job.caseName]}
						title={
							<GreekText tone="inherit" size="3xl">
								{job.greek}
							</GreekText>
						}
						badge={job.handle}
						description={job.job}
					>
						<ul className="space-y-2">
							{job.examples.map((example) => (
								<li key={example.greek}>
									<MarkedGreek
										greek={example.greek}
										marked={example.marked}
										tone={CASE_KEY[job.caseName]}
										size="xl"
										className="block leading-snug"
									/>
									<p className="text-xs text-stone-600 italic">{example.english}</p>
								</li>
							))}
						</ul>
					</TeachingCard>
				))}
			</div>
			<RuledNotes notes={PRONOUN_NOTES} />
		</div>

		<div id="clitic-placement" className="scroll-mt-24 space-y-6">
			<BandHeading
				title="Short pronouns hug the verb."
				lede={
					<>
						English puts them after the verb (I see <em>him</em>). Greek puts them right in front
						of it. <GreekText size="sm">θα</GreekText>, <GreekText size="sm">να</GreekText> and{" "}
						<GreekText size="sm">δεν</GreekText> stay outside; only a command moves the pronoun past the
						verb.
					</>
				}
			/>
			<PlacementTable />
			<RuledNotes notes={PLACEMENT_NOTES} />
		</div>

		<div className="space-y-8">
			<BandHeading
				title="Look it up"
				lede="Every form in one place. The two bold columns are the ones you'll reach for daily."
			/>
			<PronounTable />
			<HomographCallout id="article-or-pronoun" />

			<div className="space-y-3">
				<BandHeading
					as="h3"
					size="md"
					tone="quiet"
					title="Someone, nothing, everyone"
					lede="Learn these as whole words."
				/>
				<IndefinitesTable />
			</div>

			<div className="space-y-3">
				<BandHeading
					as="h3"
					size="md"
					tone="quiet"
					title="Phrases to learn whole"
					lede="The pronoun is already in place. Say each one as a single word."
				/>
				<Phrases />
			</div>
		</div>

		<div className="space-y-6 border-t border-stone-200 pt-12">
			<BandHeading
				title="You have the words. Now build with them."
				lede="Two everyday constructions are built almost entirely out of these pronouns."
			/>
			<div className="grid gap-3 md:grid-cols-3">
				<NextStepCard
					to="/reference/patterns"
					title="Patterns"
					description="“I like” and “my name is”, built on these pronouns"
					emphasis
				/>
				<NextStepCard
					to="/reference/prepositions"
					title="Prepositions"
					description="Where the long forms come in"
				/>
				<NextStepCard
					to="/reference/cases"
					title="Cases"
					description="What Doer, Target and Owner mean"
				/>
			</div>
		</div>
	</section>
);
