import { Lightbulb, Target } from "lucide-react";
import type React from "react";
import type { Route } from "./+types/daily-patterns";
import { db } from "../db";
import { Badge, Card, InfoBox, MonoText } from "../components/ui";

interface DailyPatternItem {
	id: number;
	greek: string;
	english: string;
	explanation?: string;
	whyThisCase?: string;
}

export async function loader(_args: Route.LoaderArgs) {
	const getByTag = async (slug: string): Promise<DailyPatternItem[]> => {
		const results = await db
			.selectFrom("vocabulary")
			.innerJoin(
				"vocabulary_tags",
				"vocabulary_tags.vocabulary_id",
				"vocabulary.id"
			)
			.innerJoin("tags", "tags.id", "vocabulary_tags.tag_id")
			.select([
				"vocabulary.id",
				"vocabulary.greek_text as greek",
				"vocabulary.english_translation as english",
				"vocabulary.metadata",
			])
			.where("tags.slug", "=", slug)
			.where("vocabulary.status", "=", "processed")
			.orderBy("vocabulary_tags.display_order")
			.execute();

		return results.map((r) => ({
			id: r.id,
			greek: r.greek,
			english: r.english,
			explanation: (r.metadata as Record<string, unknown> | null)
				?.explanation as string | undefined,
			whyThisCase: (r.metadata as Record<string, unknown> | null)
				?.whyThisCase as string | undefined,
		}));
	};

	const [coffeeFood, houseLocation, timeSchedule, family] = await Promise.all([
		getByTag("daily-coffee"),
		getByTag("daily-house"),
		getByTag("daily-time"),
		getByTag("daily-family"),
	]);

	return {
		coffeeFood,
		houseLocation,
		timeSchedule,
		family,
	};
}

export function meta() {
	return [
		{ title: "Daily Patterns - Greek Conjugation Reference" },
		{
			name: "description",
			content: "Common Greek phrases and daily usage patterns",
		},
	];
}

const PatternCard: React.FC<{
	title: string;
	icon: string;
	items: DailyPatternItem[];
	colorClass: string;
	bgClass: string;
	textClass: string;
}> = ({ title, icon, items, colorClass, bgClass, textClass }) => (
	<Card variant="bordered" padding="lg" className={`${colorClass} ${bgClass}`}>
		<h3 className={`text-lg font-bold mb-4 ${textClass} flex items-center gap-2`}>
			{icon} {title}
		</h3>
		<div className="space-y-3">
			{items.map((item) => (
				<div key={item.id} className={`p-3 ${bgClass.replace("/30", "-100")} rounded-lg`}>
					<MonoText variant="highlighted" size="lg" className="block mb-1">
						{item.greek}
					</MonoText>
					<div className="text-gray-700 text-sm mb-1">{item.english}</div>
					{item.explanation && (
						<div className={`${textClass.replace("700", "600")} text-xs italic mb-1`}>
							{item.explanation}
						</div>
					)}
					{item.whyThisCase && (
						<div className={`${textClass.replace("700", "800")} text-xs font-medium ${bgClass.replace("/30", "-50")} px-2 py-1 rounded`}>
							{item.whyThisCase}
						</div>
					)}
				</div>
			))}
		</div>
	</Card>
);

const DailyPatterns: React.FC<{
	loaderData: Route.ComponentProps["loaderData"];
}> = ({ loaderData }) => {
	const { coffeeFood, houseLocation, timeSchedule, family } = loaderData;

	return (
		<div className="space-y-10">
			{/* Priority Banner */}
			<Card
				variant="elevated"
				padding="lg"
				className="bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200"
			>
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-2xl font-bold text-emerald-800">
						Essential Daily Patterns
					</h2>
					<Badge variant="success" size="lg">
						Priority #1 - 80% Daily Use
					</Badge>
				</div>
				<InfoBox variant="success" title="Learning Strategy" className="mb-6">
					Master these high-frequency patterns first! They appear in 80% of
					daily conversations. Focus on{" "}
					<strong>recognition over memorization</strong> - see the pattern,
					understand the context.
				</InfoBox>
			</Card>

			{/* Essential Daily Patterns (80% - Most Used) */}
			<Card
				variant="elevated"
				padding="lg"
				className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200"
			>
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-2xl font-bold text-orange-800">
						Daily Essentials
					</h2>
					<Badge variant="warning" size="lg">
						Learn These First!
					</Badge>
				</div>

				<div className="grid lg:grid-cols-2 gap-8">
					{/* Coffee & Food */}
					<PatternCard
						title="Coffee & Food"
						icon="☕"
						items={coffeeFood}
						colorClass="border-orange-200"
						bgClass="bg-orange-50/30"
						textClass="text-orange-700"
					/>

					{/* House & Location */}
					<PatternCard
						title="House & Location"
						icon="🏠"
						items={houseLocation}
						colorClass="border-blue-200"
						bgClass="bg-blue-50/30"
						textClass="text-blue-700"
					/>

					{/* Time & Daily Schedule */}
					<PatternCard
						title="Time & Daily Schedule"
						icon="🕐"
						items={timeSchedule}
						colorClass="border-yellow-200"
						bgClass="bg-yellow-50/30"
						textClass="text-yellow-700"
					/>

					{/* Family & Relationships */}
					<PatternCard
						title="Family & Relationships"
						icon="👨‍👩‍👧‍👦"
						items={family}
						colorClass="border-amber-200"
						bgClass="bg-amber-50/30"
						textClass="text-amber-700"
					/>
				</div>
			</Card>

			{/* Practice Tips */}
			<Card
				variant="elevated"
				padding="lg"
				className="bg-gradient-to-r from-purple-50 to-violet-50 border-2 border-purple-200"
			>
				<h2 className="text-xl font-bold text-center mb-4 text-purple-800 flex items-center justify-center gap-2">
					<Target size={20} /> Practice Strategy
				</h2>
				<div className="grid md:grid-cols-2 gap-6">
					<div>
						<h3 className="text-lg font-bold text-purple-700 mb-3">
							Daily Practice
						</h3>
						<ul className="space-y-2 text-sm text-gray-700">
							<li>
								• Start with <strong>one theme per day</strong> (Coffee & Food
								Monday, etc.)
							</li>
							<li>
								• <strong>Say examples out loud</strong> - hearing helps memory
							</li>
							<li>
								• <strong>Focus on context</strong> - when would you say this?
							</li>
							<li>
								• <strong>Notice the "why"</strong> hints - they build pattern
								recognition
							</li>
						</ul>
					</div>
					<div>
						<h3 className="text-lg font-bold text-purple-700 mb-3">
							Next Steps
						</h3>
						<ul className="space-y-2 text-sm text-gray-700">
							<li>
								• When confused, check <strong>"Core Rules"</strong> tab for
								grammar
							</li>
							<li>
								• Use <strong>"Case Practice"</strong> to test yourself
							</li>
							<li>
								• Try <strong>"Search Words"</strong> to find specific examples
							</li>
							<li>
								• Remember: <strong>patterns over memorization!</strong>
							</li>
						</ul>
					</div>
				</div>
			</Card>

			{/* Cross-Reference Note */}
			<InfoBox
				variant="info"
				title="Need the Grammar Rules?"
				icon={<Lightbulb size={18} />}
			>
				Confused about why we use τον vs την vs το? Head to the{" "}
				<strong>"Core Rules"</strong> tab for the complete grammar reference,
				then come back here to practice!
			</InfoBox>
		</div>
	);
};

export default function DailyPatternsRoute({
	loaderData,
}: Route.ComponentProps) {
	return <DailyPatterns loaderData={loaderData} />;
}
