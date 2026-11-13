import { Link } from "@tanstack/react-router";
import type React from "react";

import { type ColumnDef, GrammarTable, type RowDef } from "@/components/GrammarTable";
import { GreekText } from "@/components/GreekText";
import { ProseWithGreek } from "@/components/ProseWithGreek";
import type { PersonNumber, VerbTense } from "@/server/db/enums";
import type { VerbTableVerb } from "@/server/fns/verb-tables";

import { type GuideSectionRef, TAUGHT_IN } from "../taught-in.data";
import { LookupPage, LookupSection } from "./lookup-section";

interface ParadigmTable {
	kind: "paradigm";
	title: string;
	taughtIn: GuideSectionRef;
	tense: VerbTense;
	lemmas: string[];
}

interface StemTable {
	kind: "stems";
	title: string;
	taughtIn: GuideSectionRef;
	lemmas: string[];
}

interface CommandTable {
	kind: "commands";
	title: string;
	taughtIn: GuideSectionRef;
	aspect: "perfective" | "imperfective";
	lemmas: string[];
}

type TableSpec = ParadigmTable | StemTable | CommandTable;

export const VERB_BANDS = [
	{ id: "present", label: "Present" },
	{ id: "past", label: "Simple past" },
	{ id: "past-continuous", label: "Past continuous" },
	{ id: "future", label: "Future" },
	{ id: "commands", label: "Commands" },
] as const;

export type VerbBandId = (typeof VERB_BANDS)[number]["id"];

export const isVerbBand = (value: string): value is VerbBandId =>
	VERB_BANDS.some((band) => band.id === value);

const paradigm = (
	title: string,
	taughtIn: GuideSectionRef,
	tense: VerbTense,
	lemmas: string[],
): ParadigmTable => ({ kind: "paradigm", title, taughtIn, tense, lemmas });

const MAI_VERBS = ["σκέφτομαι", "κάθομαι", "θυμάμαι"];

/** The example verbs behind each table, in the order the tables appear. */
const BAND_TABLES: Record<VerbBandId, TableSpec[]> = {
	present: [
		paradigm("Most verbs, -άω verbs and the πάω set", TAUGHT_IN.presentEndings, "present", [
			"γράφω",
			"μιλάω",
			"πάω",
			"τρώω",
		]),
		paradigm("Verbs in a stressed -ώ", TAUGHT_IN.oVerbs, "present", ["μπορώ", "οδηγώ", "τηλεφωνώ"]),
		paradigm("Verbs in -μαι", TAUGHT_IN.maiVerbs, "present", ["σκέφτομαι", "κάθομαι", "έρχομαι"]),
		paradigm("Verbs in -άμαι", TAUGHT_IN.amaiVerbs, "present", ["θυμάμαι", "κοιμάμαι"]),
		paradigm("είμαι", TAUGHT_IN.eimai, "present", ["είμαι"]),
	],
	past: [
		paradigm("Simple past endings", TAUGHT_IN.pastEndings, "aorist", ["δουλεύω", "γράφω", "μιλάω"]),
		{
			kind: "stems",
			title: "Simple past stems with σ, ψ and ξ",
			taughtIn: TAUGHT_IN.pastStem,
			lemmas: ["ακούω", "διαβάζω", "πληρώνω", "γράφω", "παίζω", "τρέχω", "ανοίγω", "τηλεφωνώ"],
		},
		paradigm("Past of their own: going in, out and learning", TAUGHT_IN.pastOwn, "aorist", [
			"μπαίνω",
			"βγαίνω",
			"μαθαίνω",
		]),
		paradigm("Past of their own: no σ", TAUGHT_IN.pastOwn, "aorist", [
			"κάνω",
			"έχω",
			"παίρνω",
			"μένω",
		]),
		paradigm("Past of their own: one of a kind", TAUGHT_IN.pastOwn, "aorist", [
			"πάω",
			"λέω",
			"βλέπω",
		]),
		paradigm("Past of their own: eat, drink and come", TAUGHT_IN.pastOwn, "aorist", [
			"τρώω",
			"πίνω",
			"έρχομαι",
		]),
		paradigm("Verbs in -μαι", TAUGHT_IN.maiVerbs, "aorist", MAI_VERBS),
		paradigm("είμαι", TAUGHT_IN.eimai, "aorist", ["είμαι"]),
	],
	"past-continuous": [
		paradigm("Present stem and the past endings", TAUGHT_IN.ongoingPast, "past_continuous", [
			"γράφω",
			"δουλεύω",
		]),
		paradigm("Verbs in -άω and -ώ", TAUGHT_IN.ongoingPast, "past_continuous", [
			"μιλάω",
			"μπορώ",
			"οδηγώ",
		]),
		paradigm("Verbs that add a γ", TAUGHT_IN.ongoingPast, "past_continuous", [
			"τρώω",
			"λέω",
			"ακούω",
		]),
		paradigm("Verbs with a simple past of their own", TAUGHT_IN.ongoingPast, "past_continuous", [
			"πάω",
			"έχω",
			"βλέπω",
			"έρχομαι",
		]),
		paradigm("Verbs in -μαι", TAUGHT_IN.maiVerbs, "past_continuous", MAI_VERBS),
		paradigm("είμαι", TAUGHT_IN.eimai, "past_continuous", ["είμαι"]),
	],
	future: [
		paradigm("Simple future: θα and the short form", TAUGHT_IN.future, "future", [
			"γράφω",
			"διαβάζω",
			"μιλάω",
		]),
		paradigm("Short forms of their own: eat, drink and see", TAUGHT_IN.future, "future", [
			"τρώω",
			"πίνω",
			"βλέπω",
		]),
		paradigm("Short forms of their own: say, go and come", TAUGHT_IN.future, "future", [
			"λέω",
			"πάω",
			"έρχομαι",
		]),
		paradigm("Short forms of their own: give, take and bring", TAUGHT_IN.future, "future", [
			"δίνω",
			"παίρνω",
			"φέρνω",
		]),
		paradigm("No separate short form", TAUGHT_IN.keepShape, "future", [
			"έχω",
			"θέλω",
			"ξέρω",
		]),
		paradigm("No separate short form, continued", TAUGHT_IN.keepShape, "future", [
			"κάνω",
			"περιμένω",
			"είμαι",
		]),
		paradigm("Verbs in -μαι", TAUGHT_IN.maiVerbs, "future", MAI_VERBS),
	],
	commands: [
		{
			kind: "commands",
			title: "Commands from the short form",
			taughtIn: TAUGHT_IN.commands,
			aspect: "perfective",
			lemmas: ["γράφω", "ακούω", "μιλάω", "ανοίγω", "κλείνω", "περιμένω"],
		},
		{
			kind: "commands",
			title: "Commands of their own",
			taughtIn: TAUGHT_IN.commands,
			aspect: "perfective",
			lemmas: ["έρχομαι", "λέω", "τρώω", "πίνω", "βλέπω", "παίρνω", "φέρνω", "δίνω", "πάω", "κάθομαι"],
		},
		{
			kind: "commands",
			title: "Ongoing commands",
			taughtIn: TAUGHT_IN.commandAspect,
			aspect: "imperfective",
			lemmas: ["γράφω", "μιλάω", "τρώω", "πίνω"],
		},
	],
};

export const bandLemmas = (band: VerbBandId): string[] => [
	...new Set(BAND_TABLES[band].flatMap((spec) => spec.lemmas)),
];

const PERSON_ROWS: Array<RowDef & { key: PersonNumber }> = [
	{ key: "sg1", label: "I" },
	{ key: "sg2", label: "you" },
	{ key: "sg3", label: "he/she" },
	{ key: "pl1", label: "we" },
	{ key: "pl2", label: "you all" },
	{ key: "pl3", label: "they" },
];

const Form: React.FC<{ children: string | undefined }> = ({ children }) => (
	<GreekText size="sm" className="whitespace-nowrap">{children ?? "–"}</GreekText>
);

const VerbLink: React.FC<{ verb: VerbTableVerb; className?: string }> = ({ verb, className }) => (
	<Link
		to="/learn/verbs/$verbId"
		params={{ verbId: String(verb.id) }}
		className="underline-offset-4 hover:underline"
	>
		<GreekText size="sm" className={className}>
			{verb.lemma}
		</GreekText>
	</Link>
);

const verbHeading = (verb: VerbTableVerb): ColumnDef => ({
	key: verb.lemma,
	label: (
		<span className="block">
			<VerbLink verb={verb} className="font-semibold text-stone-800" />
			<span className="block text-xs font-normal text-stone-500">{verb.english}</span>
		</span>
	),
});

const ParadigmGrid: React.FC<{ verbs: VerbTableVerb[]; tense: VerbTense }> = ({ verbs, tense }) => (
	<GrammarTable
		columns={verbs.map(verbHeading)}
		rows={PERSON_ROWS}
		cells={PERSON_ROWS.map((row) =>
			verbs.map((verb) => <Form key={verb.lemma}>{verb.forms[tense]?.[row.key]}</Form>),
		)}
	/>
);

const StemGrid: React.FC<{ verbs: VerbTableVerb[] }> = ({ verbs }) => (
	<GrammarTable
		columns={[
			{ key: "past", label: "Simple past (I)" },
			{ key: "meaning", label: "Meaning" },
		]}
		rows={verbs.map((verb) => ({
			key: verb.lemma,
			label: <VerbLink verb={verb} />,
		}))}
		cells={verbs.map((verb) => [
			<Form key="past">{verb.forms.aorist?.sg1}</Form>,
			<span key="meaning" className="text-sm text-stone-600">
				{verb.english}
			</span>,
		])}
	/>
);

const CommandGrid: React.FC<{ verbs: VerbTableVerb[]; aspect: "perfective" | "imperfective" }> = ({
	verbs,
	aspect,
}) => (
	<GrammarTable
		columns={[
			{ key: "singular", label: "One person" },
			{ key: "plural", label: "Several, or polite" },
			{ key: "meaning", label: "Meaning" },
		]}
		rows={verbs.map((verb) => ({ key: verb.lemma, label: <VerbLink verb={verb} /> }))}
		cells={verbs.map((verb) => [
			<Form key="singular">{verb.commands[aspect]?.singular}</Form>,
			<Form key="plural">{verb.commands[aspect]?.plural}</Form>,
			<span key="meaning" className="text-sm text-stone-600">
				{verb.english.replace(/^I /, "")}
			</span>,
		])}
	/>
);

const byLemma = (verbs: VerbTableVerb[], lemmas: string[]) =>
	lemmas.flatMap((lemma) => verbs.filter((verb) => verb.lemma === lemma));

export const VerbBandTables: React.FC<{ band: VerbBandId; verbs: VerbTableVerb[] }> = ({
	band,
	verbs,
}) => (
	<LookupPage title={`Verbs: ${VERB_BANDS.find((b) => b.id === band)!.label.toLowerCase()}`}>
		{BAND_TABLES[band].map((spec) => {
			const rows = byLemma(verbs, spec.lemmas);
			return (
				<LookupSection
					tone="ocean"
					key={`${spec.taughtIn.section}:${spec.title}`}
					title={<ProseWithGreek text={spec.title} />}
					taughtIn={[spec.taughtIn]}
				>
					{spec.kind === "stems" ? (
						<StemGrid verbs={rows} />
					) : spec.kind === "commands" ? (
						<CommandGrid verbs={rows} aspect={spec.aspect} />
					) : (
						<ParadigmGrid verbs={rows} tense={spec.tense} />
					)}
				</LookupSection>
			);
		})}
	</LookupPage>
);
