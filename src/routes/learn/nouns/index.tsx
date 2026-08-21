import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { ChevronLeft, Package } from "lucide-react";
import type React from "react";

import { ContentSection } from "@/components/ContentSection";
import { TabHero } from "@/components/TabHero";
import {
	type BrowsableNoun,
	type NounSubjectGroup,
	groupNounsBySubject,
} from "@/lib/noun-browser-groups";
import { getNounsWithFormsAndSubjects } from "@/server/db/queries/noun-browser";

import { NounRow } from "./components/noun-row";

const nounsLoader = createServerFn().handler(async () => ({
	groups: groupNounsBySubject(await getNounsWithFormsAndSubjects()),
}));

export const Route = createFileRoute("/learn/nouns")({
	loader: () => nounsLoader(),
	component: NounsRefactorPage,
});

/** Masculine/feminine counterparts worth seeing side by side. */
const nounPairs: Record<string, Array<[string, string]>> = {
	people: [
		["πατέρας", "μητέρα"],
		["αδελφός", "αδελφή"],
		["παππούς", "γιαγιά"],
		["άντρας", "γυναίκα"],
		["γιος", "κόρη"],
		["θείος", "θεία"],
		["ξάδερφος", "ξαδέρφη"],
		["ανιψιός", "ανιψιά"],
		["εγγονός", "εγγονή"],
		["πεθερός", "πεθερά"],
		["γαμπρός", "νύφη"],
		["φίλος", "φίλη"],
	],
};

/** Hand-authored sub-groups inside a subject; anything unmatched falls to "More". */
const nounSubgroups: Record<string, Array<{ title: string; words: string[] }>> = {
	people: [
		{ title: "Family", words: ["πατέρας", "μητέρα", "αδελφός", "αδελφή", "γιος", "κόρη", "παιδί", "οικογένεια"] },
		{ title: "Extended family", words: ["θείος", "θεία", "ξάδερφος", "ξαδέρφη", "ανιψιός", "ανιψιά", "εγγονός", "εγγονή"] },
		{ title: "In-laws", words: ["πεθερός", "πεθερά", "γαμπρός", "νύφη"] },
		{ title: "Partners & friends", words: ["άντρας", "γυναίκα", "φίλος", "φίλη", "σύζυγος"] },
		{ title: "People & pets", words: ["άνθρωπος", "αγόρι", "νάνος", "σκύλος"] },
	],
	"time-calendar": [
		{ title: "Days", words: ["Δευτέρα", "Τρίτη", "Τετάρτη", "Πέμπτη", "Παρασκευή", "Σάββατο", "Κυριακή", "Σαββατοκύριακο"] },
		{ title: "Months", words: ["Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάιος", "Ιούνιος", "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"] },
		{ title: "Seasons", words: ["άνοιξη", "καλοκαίρι", "φθινόπωρο", "χειμώνας"] },
		{ title: "Parts of the day", words: ["πρωί", "μεσημέρι", "απόγευμα", "βράδυ", "νύχτα", "μεσάνυχτα"] },
	],
	"work-study": [
		{ title: "Jobs", words: ["γιατρός", "δάσκαλος", "δασκάλα", "οδηγός", "ηθοποιός", "κηπουρός", "γεωργός", "βοσκός", "κυνηγός", "αρχηγός", "αρχιτέκτονας", "μηχανικός", "κομμωτής", "κομμώτρια", "κρεοπώλης", "κουρέας", "μπαρμπέρης", "γραμματέας", "ιατρός", "νοσοκόμα", "νοσοκόμος", "νοσηλευτής", "οδοντίατρος", "πωλητής", "προγραμματιστής", "υπάλληλος", "υπεύθυνος", "ξεναγός", "φύλακας", "μάστορας", "μπαρίστα", "μαθηματικός", "καλλιτέχνης", "βοηθός"] },
		{ title: "Study", words: ["μάθημα", "εκπαίδευση", "ερώτηση", "έρευνα", "παρουσίαση", "φοιτητής", "φοιτήτρια", "γλώσσα", "επίπεδο", "πίνακας"] },
	],
	shopping: [
		{ title: "Food & drink", words: ["καφές", "χυμός", "ντομάτα", "αγγούρι", "πορτοκάλι", "ψωμί"] },
		{ title: "At the shop", words: ["αντηλιακό", "μπουκάλι", "απόδειξη", "ψώνια"] },
	],
	summer: [
		{ title: "At the beach", words: ["θάλασσα", "παραλία", "ήλιος", "ξαπλώστρα", "μαγιό", "καπέλο"] },
		{ title: "Summer treats", words: ["καλοκαίρι", "ζέστη", "παγωτό", "καρπούζι"] },
	],
};

const splitIntoPairsAndSingles = (
	nouns: BrowsableNoun[],
	subjectSlug: string,
): { pairs: Array<[BrowsableNoun, BrowsableNoun]>; singles: BrowsableNoun[] } => {
	const pairDefs = nounPairs[subjectSlug] ?? [];
	const byLemma = new Map(nouns.map((n) => [n.lemma.toLowerCase(), n]));

	const pairs: Array<[BrowsableNoun, BrowsableNoun]> = [];
	const used = new Set<string>();

	for (const [leftWord, rightWord] of pairDefs) {
		const left = byLemma.get(leftWord);
		const right = byLemma.get(rightWord);
		if (left && right) {
			pairs.push([left, right]);
			used.add(leftWord);
			used.add(rightWord);
		}
	}

	return { pairs, singles: nouns.filter((n) => !used.has(n.lemma.toLowerCase())) };
};

const NounList: React.FC<{ nouns: BrowsableNoun[]; subjectSlug: string }> = ({
	nouns,
	subjectSlug,
}) => {
	const { pairs, singles } = splitIntoPairsAndSingles(nouns, subjectSlug);

	return (
		<>
			{pairs.length > 0 && (
				<div className="divide-y divide-stone-200/60">
					{pairs.map(([left, right]) => (
						<div
							key={`${left.id}-${right.id}`}
							className="grid grid-cols-1 divide-y divide-stone-200/60 sm:grid-cols-2 sm:divide-x sm:divide-y-0"
						>
							<NounRow noun={left} />
							<NounRow noun={right} />
						</div>
					))}
				</div>
			)}

			{singles.length > 0 && (
				<div
					className={`divide-y divide-stone-200/60 ${pairs.length > 0 ? "border-t border-stone-200/60" : ""}`}
				>
					{singles.map((noun) => (
						<NounRow key={noun.id} noun={noun} />
					))}
				</div>
			)}
		</>
	);
};

const SubjectSection: React.FC<{ group: NounSubjectGroup }> = ({ group }) => {
	const subgroups = nounSubgroups[group.slug];

	if (!subgroups) {
		return (
			<ContentSection
				title={group.title}
				subtitle={`${group.nouns.length} nouns`}
				colorScheme="stone"
			>
				<NounList nouns={group.nouns} subjectSlug={group.slug} />
			</ContentSection>
		);
	}

	const seen = new Set<number>();
	const blocks: Array<{ title: string; nouns: BrowsableNoun[] }> = [];

	for (const sub of subgroups) {
		const words = new Set(sub.words.map((w) => w.toLowerCase()));
		const matched = group.nouns.filter((n) => !seen.has(n.id) && words.has(n.lemma.toLowerCase()));
		for (const n of matched) seen.add(n.id);
		if (matched.length > 0) blocks.push({ title: sub.title, nouns: matched });
	}

	// Catch-all so nouns outside the hand-authored sub-groups are never dropped.
	const unmatched = group.nouns.filter((n) => !seen.has(n.id));
	if (unmatched.length > 0) blocks.push({ title: "More", nouns: unmatched });

	return (
		<ContentSection
			title={group.title}
			subtitle={`${group.nouns.length} nouns`}
			colorScheme="stone"
		>
			{blocks.map((block) => (
				<div key={block.title}>
					<h4 className="px-3 pt-3 pb-1 text-xs font-semibold tracking-wide text-stone-500 uppercase">
						{block.title}
					</h4>
					<NounList nouns={block.nouns} subjectSlug={group.slug} />
				</div>
			))}
		</ContentSection>
	);
};

function NounsRefactorPage() {
	const { groups } = Route.useLoaderData();

	return (
		<div className="space-y-6">
			<Link
				to="/learn"
				className="inline-flex items-center gap-1 text-sm text-stone-600 transition-colors hover:text-stone-800"
			>
				<ChevronLeft size={16} />
				<span>Learn</span>
			</Link>

			<TabHero
				title="Everyday nouns"
				greekPhrase="ο / η / το"
				colorScheme="ocean"
				icon={<Package size={24} />}
				expandedExample={{
					label: "Endings hint at gender",
					content: (
						<div className="space-y-2">
							<p className="text-sm text-stone-600">
								Noun endings often predict gender. The article confirms it:
							</p>
							<div className="flex flex-wrap gap-3 text-sm">
								<span>
									<strong className="text-gender-masculine-text">ο</strong> +{" "}
									<span className="text-gender-masculine-text">-ος, -ης, -ας</span> = masculine
								</span>
								<span>
									<strong className="text-gender-feminine-text">η</strong> +{" "}
									<span className="text-gender-feminine-text">-η, -α</span> = feminine
								</span>
								<span>
									<strong className="text-gender-neuter-text">το</strong> +{" "}
									<span className="text-gender-neuter-text">-ο, -ι, -μα</span> = neuter
								</span>
							</div>
						</div>
					),
				}}
			>
				The words you'll use most, organised by subject. The{" "}
				<span className="font-medium text-stone-700">coloured article</span> shows gender at a
				glance — tap any word to see how it changes.
			</TabHero>

			<div className="flex items-center gap-3 px-1 text-xs text-stone-500">
				<span className="font-medium">Gender:</span>
				<span className="flex items-center gap-1.5">
					<span className="rounded bg-gender-masculine-100 px-1 py-0.5 text-xs font-bold text-gender-masculine-text">
						ο
					</span>
					masculine
				</span>
				<span className="flex items-center gap-1.5">
					<span className="rounded bg-gender-feminine-100 px-1 py-0.5 text-xs font-bold text-gender-feminine-text">
						η
					</span>
					feminine
				</span>
				<span className="flex items-center gap-1.5">
					<span className="rounded bg-gender-neuter-100 px-1 py-0.5 text-xs font-bold text-gender-neuter-text">
						το
					</span>
					neuter
				</span>
			</div>

			<div className="space-y-4">
				{groups.map((group) => (
					<SubjectSection group={group} key={group.slug} />
				))}
			</div>
		</div>
	);
}
