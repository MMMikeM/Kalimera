import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { ArrowLeft } from "lucide-react";
import { z } from "zod";

import { Card } from "@/components/Card";
import { ImperativeTable } from "@/components/ImperativeTable";
import { MonoText } from "@/components/MonoText";
import { SectionHeading } from "@/components/SectionHeading";
import { StemInsight } from "@/components/StemInsight";
import { TenseNavigator } from "@/components/TenseNavigator";
import { Badge } from "@/components/ui/badge";
import type { VerbConjugationGraphRow } from "@/db.server/queries/vocabulary";
import { fetchVerbWithConjugationRelations } from "@/db.server/queries/vocabulary";

type ParadigmForms = {
	sg1: string;
	sg2: string;
	sg3: string;
	pl1: string;
	pl2: string;
	pl3: string;
};

type VerbWithConjugations = {
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
			conjugations[tenseKey] = { sg1: "", sg2: "", sg3: "", pl1: "", pl2: "", pl3: "" };
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

const verbDetailLoader = createServerFn()
	.inputValidator(z.object({ verbId: z.string() }))
	.handler(async ({ data }) => {
		const verbId = Number(data.verbId);

		if (Number.isNaN(verbId)) {
			throw new Response("Invalid verb ID", { status: 400 });
		}

		const row = await fetchVerbWithConjugationRelations(verbId);
		if (!row) {
			throw new Response("Verb not found", { status: 404 });
		}

		return { verb: verbDetailFromGraph(row) };
	});

export const Route = createFileRoute("/learn/verbs/$verbId")({
	loader: ({ params }) => verbDetailLoader({ data: { verbId: params.verbId } }),
	component: VerbDetailPage,
});

const FAMILY_DISPLAY: Record<
	string,
	{ label: string; variant: "primary" | "secondary" | "success" | "warning" }
> = {
	omega: { label: "-ω verbs", variant: "primary" },
	contracted: { label: "-άω contracted", variant: "secondary" },
	deponent: { label: "-μαι deponent", variant: "success" },
	irregular: { label: "Irregular", variant: "warning" },
};

function VerbDetailPage() {
	const { verb } = Route.useLoaderData();

	const familyConfig = verb.verbDetails?.conjugationFamily
		? FAMILY_DISPLAY[verb.verbDetails.conjugationFamily]
		: null;

	const isSuppletive = verb.verbDetails?.isSuppletive ?? false;
	const hasConjugations = Object.keys(verb.conjugations).length > 0;
	const hasImperatives =
		verb.imperatives.imperfective !== null || verb.imperatives.perfective !== null;

	return (
		<div className="space-y-6">
			<Link
				to="/learn/verbs"
				className="inline-flex items-center gap-1.5 text-sm text-ocean-text hover:underline"
			>
				<ArrowLeft size={14} />
				Verbs
			</Link>

			<Card variant="bordered" padding="lg" className="bg-white">
				<div className="flex flex-wrap items-start justify-between gap-4">
					<div>
						<MonoText variant="greek" size="2xl" weight="bold">
							{verb.greekText}
						</MonoText>
						<p className="mt-1 text-lg text-stone-600">{verb.englishTranslation}</p>
					</div>

					<div className="flex flex-wrap items-center gap-2">
						{familyConfig && (
							<Badge variant={familyConfig.variant} size="md">
								{familyConfig.label}
							</Badge>
						)}
						{isSuppletive && (
							<Badge variant="warning" size="md">
								Suppletive
							</Badge>
						)}
					</div>
				</div>

				{verb.verbDetails?.notes && (
					<p className="mt-4 rounded-lg border border-stone-200 bg-stone-50 p-3 text-sm text-stone-600">
						{verb.verbDetails.notes}
					</p>
				)}
			</Card>

			{isSuppletive && verb.verbDetails && (
				<StemInsight
					isSuppletive={true}
					stems={{
						present: verb.verbDetails.presentStem,
						aorist: verb.verbDetails.aoristStem,
						future: verb.verbDetails.futureStem,
					}}
				/>
			)}

			{hasConjugations && (
				<section>
					<SectionHeading
						title="Conjugations"
						subtitle="All tense paradigms for this verb"
						level="h3"
					/>
					<TenseNavigator
						conjugations={verb.conjugations}
						verbDetails={
							verb.verbDetails
								? {
										presentStem: verb.verbDetails.presentStem,
										aoristStem: verb.verbDetails.aoristStem,
										futureStem: verb.verbDetails.futureStem,
									}
								: undefined
						}
						meaning={verb.englishTranslation}
					/>
				</section>
			)}

			{hasImperatives && (
				<section>
					<ImperativeTable imperatives={verb.imperatives} />
				</section>
			)}

			{!hasConjugations && !hasImperatives && (
				<Card variant="bordered" padding="lg" className="bg-stone-50 text-center">
					<p className="text-stone-600">No conjugation data available for this verb yet.</p>
				</Card>
			)}
		</div>
	);
}
