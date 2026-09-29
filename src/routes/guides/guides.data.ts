import type { Guide, GuideSection } from "@/types/guide";

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
