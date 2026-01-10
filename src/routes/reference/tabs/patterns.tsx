import { Heart, UserCircle, Blocks } from "lucide-react";
import { Card } from "@/components/Card";
import { MonoText } from "@/components/MonoText";
import { QuickTest } from "@/components/QuickTest";
import { TabHero } from "@/components/TabHero";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { PatternsData, PatternItem } from "../data.server";

const ParadigmCard = ({
	title,
	subtitle,
	icon,
	patternNote,
	columns,
	colorScheme,
}: {
	title: string;
	subtitle: string;
	icon: React.ReactNode;
	patternNote: string;
	columns: { title: string; items: PatternItem[] }[];
	colorScheme: "ocean" | "terracotta" | "olive";
}) => {
	const colors = {
		ocean: {
			bg: "bg-ocean-50",
			border: "border-ocean-300",
			text: "text-ocean-text",
			iconBg: "bg-ocean-200",
		},
		terracotta: {
			bg: "bg-terracotta-50",
			border: "border-terracotta-300",
			text: "text-terracotta-text",
			iconBg: "bg-terracotta-200",
		},
		olive: {
			bg: "bg-olive-50",
			border: "border-olive-300",
			text: "text-olive-text",
			iconBg: "bg-olive-200",
		},
	};
	const c = colors[colorScheme];

	return (
		<Card variant="bordered" padding="lg" className={`${c.bg} ${c.border}`}>
			<div className="flex items-center gap-3 mb-4">
				<div className={`p-2 rounded-lg ${c.iconBg}`}>
					<span className={c.text}>{icon}</span>
				</div>
				<div>
					<h3 className={`text-lg font-bold ${c.text}`}>{title}</h3>
					<p className="text-sm text-stone-600">{subtitle}</p>
				</div>
			</div>
			<Alert variant="info" className="mb-4">
				<AlertDescription>
					<strong>Pattern:</strong> {patternNote}
				</AlertDescription>
			</Alert>
			<div className="grid md:grid-cols-2 gap-6">
				{columns.map((col) => (
					<div key={col.title}>
						<h5 className={`font-semibold ${c.text} mb-3`}>{col.title}</h5>
						<div className="space-y-2">
							{col.items.map((item) => (
								<div
									key={item.id}
									className="flex items-baseline gap-2 p-2 bg-white rounded border border-stone-200"
								>
									<MonoText variant="greek" size="md">
										{item.greek}
									</MonoText>
									<span className="text-stone-600 text-sm">{item.english}</span>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</Card>
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
				Some Greek constructions work differently than English. Learn these
				patterns and you'll understand why "I like coffee" becomes "Coffee
				pleases me."
			</TabHero>

			<ParadigmCard
				title="Likes Construction"
				subtitle="μου αρέσει / αρέσουν"
				icon={<Heart size={20} />}
				patternNote="[Person] αρέσει (one thing) / αρέσουν (many things) - the thing liked is the subject!"
				colorScheme="ocean"
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
						Remember: the thing liked is the <strong>subject</strong>, so the
						verb agrees with it!
					</>
				}
			/>

			{nameConstruction.length > 0 && (
				<Card
					variant="bordered"
					padding="lg"
					className="bg-ocean-50 border-ocean-300"
				>
					<div className="flex items-center gap-3 mb-4">
						<div className="p-2 rounded-lg bg-ocean-200">
							<UserCircle size={20} className="text-ocean-text" />
						</div>
						<div>
							<h3 className="text-lg font-bold text-ocean-text">
								Name Construction
							</h3>
							<p className="text-sm text-stone-600">
								με λένε = my name is (lit. "they call me")
							</p>
						</div>
					</div>
					<Alert variant="info" className="mb-4">
						<AlertDescription>
							<strong>Pattern:</strong> [Pronoun] λένε + name - literally "they
							call me..."
						</AlertDescription>
					</Alert>
					<div className="grid md:grid-cols-2 gap-3">
						{nameConstruction.map((name) => (
							<div
								key={name.id}
								className="flex items-baseline gap-2 p-2 bg-white rounded border border-stone-200"
							>
								<MonoText variant="greek" size="md">
									{name.greek}
								</MonoText>
								<span className="text-stone-600 text-sm">{name.english}</span>
							</div>
						))}
					</div>
				</Card>
			)}
		</div>
	);
}
