import type { VerbConjugationGraphRow } from "@/db.server/queries/vocabulary";
import { fetchVerbWithConjugationRelations } from "@/db.server/queries/vocabulary";
import type { Route } from "./+types/route";

type ParadigmForms = {
	sg1: string;
	sg2: string;
	sg3: string;
	pl1: string;
	pl2: string;
	pl3: string;
};

export type VerbWithConjugations = {
	id: number;
	greekText: string;
	englishTranslation: string;
	verbDetails: {
		conjugationFamily: string;
		presentStem: string | null;
		aoristStem: string | null;
		futureStem: string | null;
		isSuppletive: boolean | null;
		notes: string | null;
	} | null;
	conjugations: Record<string, ParadigmForms>;
	imperatives: {
		imperfective: { singular: string; plural: string } | null;
		perfective: { singular: string; plural: string } | null;
	};
};

function verbDetailFromGraph(result: VerbConjugationGraphRow): VerbWithConjugations {
	const conjugations: Record<string, ParadigmForms> = {};
	for (const conj of result.verbConjugations) {
		const tenseKey = conj.tense;
		if (!conjugations[tenseKey]) {
			conjugations[tenseKey] = {
				sg1: "",
				sg2: "",
				sg3: "",
				pl1: "",
				pl2: "",
				pl3: "",
			};
		}
		const paradigm = conjugations[tenseKey];
		if (paradigm) {
			paradigm[conj.person as keyof ParadigmForms] = conj.form;
		}
	}

	let imperfective: { singular: string; plural: string } | null = null;
	let perfective: { singular: string; plural: string } | null = null;

	for (const imp of result.verbImperatives) {
		if (imp.aspect === "imperfective") {
			if (!imperfective) imperfective = { singular: "", plural: "" };
			if (imp.number === "singular") {
				imperfective.singular = imp.form;
			} else {
				imperfective.plural = imp.form;
			}
		} else {
			if (!perfective) perfective = { singular: "", plural: "" };
			if (imp.number === "singular") {
				perfective.singular = imp.form;
			} else {
				perfective.plural = imp.form;
			}
		}
	}

	return {
		id: result.id,
		greekText: result.greekText,
		englishTranslation: result.englishTranslation,
		verbDetails: result.verbDetails
			? {
					conjugationFamily: result.verbDetails.conjugationFamily,
					presentStem: result.verbDetails.presentStem,
					aoristStem: result.verbDetails.aoristStem,
					futureStem: result.verbDetails.futureStem,
					isSuppletive: result.verbDetails.isSuppletive,
					notes: result.verbDetails.notes,
				}
			: null,
		conjugations,
		imperatives: { imperfective, perfective },
	};
}

export const loader = async ({ params }: Route.LoaderArgs) => {
	const verbId = Number(params.verbId);

	if (Number.isNaN(verbId)) {
		throw new Response("Invalid verb ID", { status: 400 });
	}

	const row = await fetchVerbWithConjugationRelations(verbId);
	if (!row) {
		throw new Response("Verb not found", { status: 404 });
	}

	return { verb: verbDetailFromGraph(row) };
};
