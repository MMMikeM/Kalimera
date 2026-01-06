import type React from "react";
import { useOutletContext } from "react-router";
import type { Route } from "./+types/$tab";
import {
	Sparkles,
	AlertTriangle,
	MessageCircle,
	Users,
	Hand,
	Volume2,
	Heart,
	Link2,
	Zap,
	Calendar,
	Clock,
	UserCircle,
	HelpCircle,
	Blocks,
} from "lucide-react";
import { Card } from "@/components/Card";
import { MonoText } from "@/components/MonoText";
import { CollapsibleSection } from "@/components/CollapsibleSection";
import { CategoryCard } from "@/components/CategoryCard";
import { QuickTest } from "@/components/QuickTest";
import { TabHero } from "@/components/TabHero";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { PhrasesLoaderData, PhraseItem } from "./shared";
import { PhraseSection, PhraseItemDisplay } from "./shared";

const VALID_TABS = [
	"survival",
	"responses",
	"requests",
	"opinions",
	"connectors",
	"time",
	"constructions",
] as const;
type TabId = (typeof VALID_TABS)[number];

export function loader({ params }: Route.LoaderArgs) {
	const tab = params.tab as string;

	if (!VALID_TABS.includes(tab as TabId)) {
		throw new Response("Not Found", { status: 404 });
	}

	return { tab: tab as TabId };
}

// ─── Survival Tab Components ───────────────────────────────────────────────
const EssentialPhraseCard: React.FC<{ phrase: PhraseItem }> = ({ phrase }) => (
	<div className="flex items-baseline gap-3 p-3 bg-white/60 rounded-lg border border-honey-200">
		<MonoText variant="greek" size="lg">
			{phrase.greek}
		</MonoText>
		<span className="text-stone-600">{phrase.english}</span>
	</div>
);

const SurvivalTab: React.FC<{ data: PhrasesLoaderData }> = ({ data }) => {
	const { essential, survival } = data.survival;

	return (
		<div className="space-y-6">
			<TabHero
				title="Start with the basics"
				greekPhrase="Γεια σας!"
				colorScheme="honey"
				icon={<Sparkles size={18} />}
			>
				These phrases will get you through most situations. Practice them until
				they're automatic — when someone says "Γεια σας", your response should
				be instant.
			</TabHero>

			<CategoryCard
				title="Essential Greetings"
				subtitle="The phrases you'll use every single day"
				colorScheme="honey"
				priority="primary"
				badge="Start Here"
			>
				<div className="grid md:grid-cols-2 gap-3">
					{essential.map((phrase) => (
						<EssentialPhraseCard key={phrase.id} phrase={phrase} />
					))}
				</div>
			</CategoryCard>

			{survival.length > 0 && (
				<PhraseSection
					title="Survival Phrases"
					icon={<AlertTriangle size={20} />}
					colorScheme="terracotta"
				>
					{survival.map((phrase) => (
						<PhraseItemDisplay
							key={phrase.id}
							greek={phrase.greek}
							english={phrase.english}
						/>
					))}
				</PhraseSection>
			)}
		</div>
	);
};

// ─── Responses Tab ─────────────────────────────────────────────────────────
const ResponsesTab: React.FC<{ data: PhrasesLoaderData }> = ({ data }) => {
	const { responses, socialPhrases } = data.responses;

	return (
		<div className="space-y-6">
			<TabHero
				title="Keep the conversation flowing"
				greekPhrase="Ναι, βέβαια!"
				colorScheme="terracotta"
				icon={<MessageCircle size={18} />}
			>
				Quick responses that show you're following along. These short phrases
				buy you time while you process and keep the conversation natural.
			</TabHero>

			<PhraseSection
				title="Common Responses"
				icon={<MessageCircle size={20} />}
				colorScheme="terracotta"
			>
				{responses.map((phrase) => (
					<PhraseItemDisplay
						key={phrase.id}
						greek={phrase.greek}
						english={phrase.english}
					/>
				))}
			</PhraseSection>

			{socialPhrases.length > 0 && (
				<PhraseSection
					title="Social Phrases"
					icon={<Users size={20} />}
					colorScheme="olive"
				>
					{socialPhrases.map((phrase) => (
						<PhraseItemDisplay
							key={phrase.id}
							greek={phrase.greek}
							english={phrase.english}
						/>
					))}
				</PhraseSection>
			)}
		</div>
	);
};

// ─── Requests Tab ──────────────────────────────────────────────────────────
const RequestsTab: React.FC<{ data: PhrasesLoaderData }> = ({ data }) => {
	const { requests, commands } = data.requests;

	return (
		<div className="space-y-6">
			<TabHero
				title="Ask politely, get results"
				greekPhrase="Παρακαλώ..."
				colorScheme="olive"
				icon={<Hand size={18} />}
			>
				Adding "παρακαλώ" (please) to any request makes it more polite. Greeks
				appreciate the effort — politeness goes a long way!
			</TabHero>

			{requests.length > 0 && (
				<PhraseSection
					title="Polite Requests"
					icon={<Hand size={20} />}
					colorScheme="terracotta"
				>
					{requests.map((phrase) => (
						<PhraseItemDisplay
							key={phrase.id}
							greek={phrase.greek}
							english={phrase.english}
						/>
					))}
				</PhraseSection>
			)}

			{commands.length > 0 && (
				<PhraseSection
					title="Commands"
					icon={<Volume2 size={20} />}
					colorScheme="olive"
				>
					{commands.map((phrase) => (
						<PhraseItemDisplay
							key={phrase.id}
							greek={phrase.greek}
							english={phrase.english}
						/>
					))}
				</PhraseSection>
			)}
		</div>
	);
};

// ─── Opinions Tab ──────────────────────────────────────────────────────────
const OpinionsTab: React.FC<{ data: PhrasesLoaderData }> = ({ data }) => {
	const { opinions } = data.opinions;

	return (
		<div className="space-y-6">
			<TabHero
				title="Express yourself"
				greekPhrase="Νομίζω ότι..."
				colorScheme="terracotta"
				icon={<Heart size={18} />}
			>
				Share your thoughts and feelings in Greek. These phrases help you
				participate in conversations beyond basic exchanges.
			</TabHero>

			<PhraseSection
				title="Opinions & Feelings"
				icon={<Heart size={20} />}
				colorScheme="olive"
			>
				{opinions.map((phrase) => (
					<PhraseItemDisplay
						key={phrase.id}
						greek={phrase.greek}
						english={phrase.english}
					/>
				))}
			</PhraseSection>
		</div>
	);
};

// ─── Connectors Tab ────────────────────────────────────────────────────────
const ConnectorsTab: React.FC<{ data: PhrasesLoaderData }> = ({ data }) => {
	const { discourseMarkers, discourseFillers } = data.connectors;

	return (
		<div className="space-y-6">
			<TabHero
				title="The glue of natural speech"
				greekPhrase="Λοιπόν..."
				colorScheme="ocean"
				icon={<Link2 size={18} />}
			>
				Greeks use connectors constantly — mastering them will make your Greek
				sound much more fluent. These small words hold conversations together.
			</TabHero>

			{discourseMarkers.length > 0 && (
				<PhraseSection
					title="Discourse Markers"
					icon={<Link2 size={20} />}
					colorScheme="olive"
				>
					{discourseMarkers.map((phrase) => (
						<PhraseItemDisplay
							key={phrase.id}
							greek={phrase.greek}
							english={phrase.english}
						/>
					))}
				</PhraseSection>
			)}

			{discourseFillers.length > 0 && (
				<PhraseSection
					title="Fillers & Connectors"
					icon={<Zap size={20} />}
					colorScheme="ocean"
				>
					{discourseFillers.map((phrase) => (
						<PhraseItemDisplay
							key={phrase.id}
							greek={phrase.greek}
							english={phrase.english}
						/>
					))}
				</PhraseSection>
			)}
		</div>
	);
};

// ─── Time Tab Components ───────────────────────────────────────────────────
const TimeTellingSection: React.FC<{ items: PhraseItem[] }> = ({ items }) => {
	const grouped = items.reduce(
		(acc, item) => {
			const meta = item.metadata as Record<string, unknown> | null;
			const cat = (meta?.category as string) || "other";
			if (!acc[cat]) acc[cat] = [];
			acc[cat].push(item);
			return acc;
		},
		{} as Record<string, PhraseItem[]>,
	);

	const categoryLabels: Record<string, string> = {
		basic: "Basic Time Structure",
		fractions: "Minutes & Fractions",
		"at-times": '"At" Times (στις)',
	};

	const categoryOrder = ["basic", "fractions", "at-times"];

	if (items.length === 0) return null;

	return (
		<Card
			variant="bordered"
			padding="lg"
			className="bg-ocean-50 border-ocean-300"
		>
			<div className="flex items-center gap-3 mb-4">
				<div className="p-2 rounded-lg bg-ocean-200">
					<Clock size={20} className="text-ocean-text" />
				</div>
				<div>
					<h3 className="text-lg font-bold text-ocean-text">Telling Time</h3>
					<p className="text-sm text-stone-600">Τι ώρα είναι;</p>
				</div>
			</div>
			<Alert variant="info" className="mb-4">
				<AlertDescription>
					<strong>Pattern:</strong> Είναι + time / Η ώρα είναι + time
				</AlertDescription>
			</Alert>
			<div className="grid md:grid-cols-2 gap-6">
				{categoryOrder.map((cat) => {
					const catItems = grouped[cat] || [];
					if (catItems.length === 0) return null;
					return (
						<div key={cat}>
							<h5 className="font-semibold text-ocean-text mb-3">
								{categoryLabels[cat]}
							</h5>
							<div className="space-y-2">
								{catItems.map((item) => {
									const meta = item.metadata as Record<string, unknown> | null;
									const note = meta?.note ? String(meta.note) : null;
									return (
										<div key={item.id} className="flex items-baseline gap-2">
											<MonoText variant="highlighted">{item.greek}</MonoText>
											<span className="text-stone-600 text-sm">
												{item.english}
											</span>
											{note && (
												<span className="text-stone-600 text-xs">({note})</span>
											)}
										</div>
									);
								})}
							</div>
						</div>
					);
				})}
			</div>
		</Card>
	);
};

const TimeTab: React.FC<{ data: PhrasesLoaderData }> = ({ data }) => {
	const { daysOfWeek, months, timeTelling } = data.time;

	return (
		<div className="space-y-6">
			<TabHero
				title="Master time expressions"
				greekPhrase="Τι ώρα είναι;"
				colorScheme="ocean"
				icon={<Clock size={18} />}
			>
				Days, months, and telling time — essential for making plans, scheduling,
				and understanding when things happen.
			</TabHero>

			<div className="grid md:grid-cols-2 gap-4">
				{daysOfWeek.length > 0 && (
					<PhraseSection
						title="Days of the Week"
						icon={<Calendar size={20} />}
						colorScheme="ocean"
						columns={2}
					>
						{daysOfWeek.map((day) => (
							<PhraseItemDisplay
								key={day.id}
								greek={day.greek}
								english={day.english}
							/>
						))}
					</PhraseSection>
				)}

				{months.length > 0 && (
					<CollapsibleSection
						title="Months of the Year"
						colorScheme="ocean"
						defaultOpen={false}
					>
						<div className="grid grid-cols-2 gap-2">
							{months.map((month) => (
								<PhraseItemDisplay
									key={month.id}
									greek={month.greek}
									english={month.english}
								/>
							))}
						</div>
					</CollapsibleSection>
				)}
			</div>

			<TimeTellingSection items={timeTelling} />
		</div>
	);
};

// ─── Constructions Tab Components ──────────────────────────────────────────
const ParadigmCard: React.FC<{
	title: string;
	subtitle: string;
	icon: React.ReactNode;
	patternNote: string;
	columns: { title: string; items: PhraseItem[] }[];
	colorScheme: "ocean" | "terracotta" | "olive";
}> = ({ title, subtitle, icon, patternNote, columns, colorScheme }) => {
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
								<PhraseItemDisplay
									key={item.id}
									greek={item.greek}
									english={item.english}
								/>
							))}
						</div>
					</div>
				))}
			</div>
		</Card>
	);
};

const ConstructionsTab: React.FC<{ data: PhrasesLoaderData }> = ({ data }) => {
	const { likesConstruction, nameConstruction, questionWords } =
		data.constructions;

	return (
		<div className="space-y-6">
			<TabHero
				title="Understand Greek sentence patterns"
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
							<PhraseItemDisplay
								key={name.id}
								greek={name.greek}
								english={name.english}
							/>
						))}
					</div>
				</Card>
			)}

			{questionWords.length > 0 && (
				<PhraseSection
					title="Question Words"
					icon={<HelpCircle size={20} />}
					colorScheme="terracotta"
				>
					{questionWords.map((q) => (
						<PhraseItemDisplay
							key={q.id}
							greek={q.greek}
							english={q.english}
							variant="highlighted"
						/>
					))}
				</PhraseSection>
			)}
		</div>
	);
};

// ─── Main Component ────────────────────────────────────────────────────────
export default function TabRoute({ loaderData }: Route.ComponentProps) {
	const { tab } = loaderData;
	const data = useOutletContext<PhrasesLoaderData>();

	switch (tab) {
		case "survival":
			return <SurvivalTab data={data} />;
		case "responses":
			return <ResponsesTab data={data} />;
		case "requests":
			return <RequestsTab data={data} />;
		case "opinions":
			return <OpinionsTab data={data} />;
		case "connectors":
			return <ConnectorsTab data={data} />;
		case "time":
			return <TimeTab data={data} />;
		case "constructions":
			return <ConstructionsTab data={data} />;
		default:
			return null;
	}
}
