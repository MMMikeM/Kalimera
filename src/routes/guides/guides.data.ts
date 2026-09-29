import type { Guide, GuideSection, GuideTone } from "@/types/guide";

import { AGREEMENT_GUIDE } from "./agreement.data";
import { JOINING_GUIDE } from "./joining.data";
import { LITTLE_WORDS_GUIDE } from "./little-words.data";
import { NO_DOER_GUIDE } from "./no-doer.data";
import { PLACE_GUIDE } from "./place.data";
import { ROLES_GUIDE } from "./roles.data";
import { SCALES_GUIDE } from "./scales.data";
import { VERBS_GUIDE } from "./verbs.data";

/** Every guide in reading order. Each guide owns its own content; this list only orders them. */
export const GUIDES: Guide[] = [
	ROLES_GUIDE,
	VERBS_GUIDE,
	LITTLE_WORDS_GUIDE,
	AGREEMENT_GUIDE,
	PLACE_GUIDE,
	SCALES_GUIDE,
	JOINING_GUIDE,
	NO_DOER_GUIDE,
];

export const findGuide = (slug: string): Guide | undefined => GUIDES.find((g) => g.slug === slug);

export const usesMarks = (guide: Guide) =>
	guide.sections.some(
		(s) =>
			s.examples?.some((e) => e.marks?.length) ||
			s.table?.rows.some((row) => row.some((cell) => typeof cell !== "string" && cell.marks?.length)),
	);

// Navy, sunset and slate sit close to the masculine, feminine and neuter mark
// colours, so a guide that shows marks leaves them out of its cycle.
const CYCLE_WITH_MARKS: GuideTone[] = ["terracotta", "olive", "ocean", "honey", "stone"];
const CYCLE: GuideTone[] = ["terracotta", "olive", "ocean", "honey", "navy", "slate", "sunset"];

/** Each section's header colour: its own `tone`, or the next colour in the guide's cycle. */
export const sectionTones = (guide: Guide): GuideTone[] => {
	const cycle = usesMarks(guide) ? CYCLE_WITH_MARKS : CYCLE;
	return guide.sections.map((s, i) => s.tone ?? cycle[i % cycle.length]!);
};

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
