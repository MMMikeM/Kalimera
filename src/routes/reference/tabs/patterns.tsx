import { Blocks, Heart, UserCircle } from "lucide-react";

import { TeachingCard } from "@/components/cards";
import { MonoText } from "@/components/MonoText";
import { QuickTest } from "@/components/QuickTest";
import { TabHero } from "@/components/TabHero";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { type GrammarScheme, SCHEME } from "@/constants/grammar-palette";

import type { PatternItem, PatternsData } from "../loader.server";

const ParadigmCard = ({
	title,
	subtitle,
	icon,
	patternNote,
	columns,
	scheme,
}: {
	title: string;
	subtitle: string;
	icon: React.ReactNode;
	patternNote: string;
	columns: { title: string; items: PatternItem[] }[];
	scheme: GrammarScheme;
}) => {
	const style = SCHEME[scheme];

	return (
		<TeachingCard
			scheme={scheme}
			tone="soft"
			eyebrow="Pattern"
			title={
				<span className="flex items-center gap-2">
					<span className={`inline-flex items-center justify-center rounded-md p-1.5 ${style.badgeBg} ${style.text}`}>
						{icon}
					</span>
					{title}
				</span>
			}
			description={subtitle}
		>
			<Alert variant="info" className="mb-4">
				<AlertDescription>
					<strong>Pattern:</strong> {patternNote}
				</AlertDescription>
			</Alert>
			<div className="grid gap-6 md:grid-cols-2">
				{columns.map((col) => (
					<div key={col.title}>
						<h5 className={`font-semibold ${style.text} mb-3`}>{col.title}</h5>
						<div className="space-y-2">
							{col.items.map((item) => (
								<div
									key={item.id}
									className="flex items-baseline gap-2 rounded border border-stone-200 bg-white p-2"
								>
									<MonoText variant="greek" size="md">
										{item.greekText}
									</MonoText>
									<span className="text-sm text-stone-600">{item.englishTranslation}</span>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</TeachingCard>
	);
};

export function PatternsTab({ data }: { data: PatternsData }) {
	const { likesConstruction, nameConstruction } = data;

	return (
		<div className="space-y-6">
			<TabHero
				title="Greek sentence patterns"
				greekPhrase="Μου αρέσει..."
				colorScheme="honey"
				icon={<Blocks size={18} />}
			>
				Some Greek constructions work differently than English. Learn these patterns and you'll
				understand why "I like coffee" becomes "Coffee pleases me."
			</TabHero>

			<ParadigmCard
				title="Likes Construction"
				subtitle="μου αρέσει / αρέσουν"
				icon={<Heart size={20} />}
				patternNote="[Person] αρέσει (one thing) / αρέσουν (many things) - the thing liked is the subject!"
				scheme="neutral"
				columns={[
					{
						title: "One thing (αρέσει)",
						items: likesConstruction.singular,
					},
					{
						title: "Many things (αρέσουν)",
						items: likesConstruction.plural,
					},
				]}
			/>

			<QuickTest
				title="αρέσει or αρέσουν?"
				intro="Choose the correct verb form based on what is liked."
				colorScheme="ocean"
				options={[
					{
						condition: "One thing is liked (singular subject)",
						answer: "αρέσει",
						examples: [
							{ greek: "Μου αρέσει ο καφές", english: "I like coffee" },
							{
								greek: "Σου αρέσει η μουσική;",
								english: "Do you like the music?",
							},
						],
					},
					{
						condition: "Multiple things are liked (plural subject)",
						answer: "αρέσουν",
						examples: [
							{ greek: "Μου αρέσουν οι γάτες", english: "I like cats" },
							{ greek: "Τους αρέσουν τα βιβλία", english: "They like books" },
						],
					},
				]}
				summary={
					<>
						Remember: the thing liked is the <strong>subject</strong>, so the verb agrees with it!
					</>
				}
			/>

			{nameConstruction.length > 0 && (
				<TeachingCard
					scheme="neutral"
					tone="soft"
					eyebrow="Pattern"
					title={
						<span className="flex items-center gap-2">
							<span className="inline-flex items-center justify-center rounded-md bg-stone-200 p-1.5 text-stone-800">
								<UserCircle size={20} />
							</span>
							Name Construction
						</span>
					}
					description={`με λένε = my name is (lit. "they call me")`}
				>
					<Alert variant="info" className="mb-4">
						<AlertDescription>
							<strong>Pattern:</strong> [Pronoun] λένε + name - literally "they call me..."
						</AlertDescription>
					</Alert>
					<div className="grid gap-3 md:grid-cols-2">
						{nameConstruction.map((name) => (
							<div
								key={name.id}
								className="flex items-baseline gap-2 rounded border border-stone-200 bg-white p-2"
							>
								<MonoText variant="greek" size="md">
									{name.greekText}
								</MonoText>
								<span className="text-sm text-stone-600">{name.englishTranslation}</span>
							</div>
						))}
					</div>
				</TeachingCard>
			)}
		</div>
	);
}
