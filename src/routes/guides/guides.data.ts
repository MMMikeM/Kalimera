import type { Guide, GuideSection, GuideTone, SectionTone } from "@/types/guide";

import { AGREEMENT_GUIDE } from "./agreement.data";
import { FUTURE_COMMANDS_GUIDE } from "./future-commands.data";
import { GENDER_GUIDE } from "./gender.data";
import { JOINING_GUIDE } from "./joining.data";
import { LITTLE_WORDS_GUIDE } from "./little-words.data";
import { NO_DOER_GUIDE } from "./no-doer.data";
import { NOUN_EXCEPTIONS_GUIDE } from "./noun-exceptions.data";
import { NOUNS_GUIDE } from "./nouns.data";
import { OWNER_CALLING_GUIDE } from "./owner-calling.data";
import { PAST_GUIDE } from "./past.data";
import { PLACE_GUIDE } from "./place.data";
import { ROLES_GUIDE } from "./roles.data";
import { SCALES_GUIDE } from "./scales.data";
import { VERBS_GUIDE } from "./verbs.data";

/** The guides in reading order, grouped by topic. Each guide owns its own content; this list only orders them. */
export const GUIDE_GROUPS: { title: string; guides: Guide[] }[] = [
	{
		title: "Nouns and the words around them",
		guides: [ROLES_GUIDE, NOUNS_GUIDE, GENDER_GUIDE, NOUN_EXCEPTIONS_GUIDE, OWNER_CALLING_GUIDE, AGREEMENT_GUIDE],
	},
	{ title: "Verbs", guides: [VERBS_GUIDE, PAST_GUIDE, FUTURE_COMMANDS_GUIDE] },
	{ title: "Small words and whole sentences", guides: [LITTLE_WORDS_GUIDE, PLACE_GUIDE, SCALES_GUIDE, JOINING_GUIDE, NO_DOER_GUIDE] },
];

export const GUIDES: Guide[] = GUIDE_GROUPS.flatMap((group) => group.guides);

export const findGuide = (slug: string): Guide | undefined => GUIDES.find((g) => g.slug === slug);

/** A section's core examples and its details' examples together. */
export const sectionExamples = (section: GuideSection) => [
	...(section.examples ?? []),
	...(section.details ?? []).flatMap((d) => d.examples ?? []),
];

/** A section's own table and its details' tables together. */
export const sectionTables = (section: GuideSection) =>
	[section.table, ...(section.details ?? []).map((d) => d.table)].filter((t) => t !== undefined);

export const usesMarks = (guide: Guide) =>
	guide.sections.some(
		(s) =>
			sectionExamples(s).some((e) => e.marks?.length) ||
			sectionTables(s).some((t) => t.rows.some((row) => row.some((cell) => typeof cell !== "string" && cell.marks?.length))),
	);

const CYCLE: GuideTone[] = ["terracotta", "olive", "ocean", "honey", "navy", "slate", "sunset"];

/** Each section's header colour: its own `tone`, or the next colour in the guide's cycle. */
export const sectionTones = (guide: Guide): SectionTone[] =>
	guide.sections.map((s, i) => s.tone ?? CYCLE[i % CYCLE.length]!);

/** Resolves `"<section>"` within `from`, or `"<guide>/<section>"` anywhere. */
export const resolveSectionRef = (
	ref: string,
	from: Guide,
): { guide: Guide; section: GuideSection } | undefined => {
	const [guideSlug, sectionId] = ref.includes("/") ? ref.split("/") : [from.slug, ref];
	const guide = guideSlug ? findGuide(guideSlug) : undefined;
	const section = guide?.sections.find((s) => s.id === sectionId);
	return guide && section ? { guide, section } : undefined;
};
