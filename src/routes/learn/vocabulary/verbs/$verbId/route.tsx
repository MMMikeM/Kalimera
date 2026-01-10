import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import type { Route } from "./+types/route";
import { Card } from "@/components/Card";
import { MonoText } from "@/components/MonoText";
import { SectionHeading } from "@/components/SectionHeading";
import { TenseNavigator } from "@/components/TenseNavigator";
import { ImperativeTable } from "@/components/ImperativeTable";
import { StemInsight } from "@/components/StemInsight";
import { Badge } from "@/components/ui/Badge";

export { loader } from "./loader.server";

export function meta({ data }: Route.MetaArgs) {
	if (!data?.verb) {
		return [{ title: "Verb Not Found - Greek Learning" }];
	}
	return [
		{ title: `${data.verb.greekText} - Greek Verb` },
		{
			name: "description",
			content: `Conjugation details for ${data.verb.greekText} (${data.verb.englishTranslation})`,
		},
	];
}

const FAMILY_DISPLAY: Record<
	string,
	{ label: string; variant: "primary" | "secondary" | "success" | "warning" }
> = {
	omega: { label: "-ω verbs", variant: "primary" },
	contracted: { label: "-άω contracted", variant: "secondary" },
	deponent: { label: "-μαι deponent", variant: "success" },
	irregular: { label: "Irregular", variant: "warning" },
};

export default function VerbDetailPage({ loaderData }: Route.ComponentProps) {
	const { verb } = loaderData;

	const familyConfig = verb.verbDetails?.conjugationFamily
		? FAMILY_DISPLAY[verb.verbDetails.conjugationFamily]
		: null;

	const isSuppletive = verb.verbDetails?.isSuppletive ?? false;
	const hasConjugations = Object.keys(verb.conjugations).length > 0;
	const hasImperatives =
		verb.imperatives.imperfective !== null ||
		verb.imperatives.perfective !== null;

	return (
		<div className="space-y-6">
			<Link
				to="/learn/vocabulary/verbs"
				className="inline-flex items-center gap-1.5 text-sm text-ocean-text hover:underline"
			>
				<ArrowLeft size={14} />
				Back to verbs
			</Link>

			<Card variant="bordered" padding="lg" className="bg-white">
				<div className="flex flex-wrap items-start justify-between gap-4">
					<div>
						<MonoText variant="greek" size="2xl" weight="bold">
							{verb.greekText}
						</MonoText>
						<p className="text-lg text-stone-600 mt-1">
							{verb.englishTranslation}
						</p>
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
					<p className="mt-4 text-sm text-stone-600 bg-stone-50 rounded-lg p-3 border border-stone-200">
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
				<Card
					variant="bordered"
					padding="lg"
					className="bg-stone-50 text-center"
				>
					<p className="text-stone-600">
						No conjugation data available for this verb yet.
					</p>
				</Card>
			)}
		</div>
	);
}
