import { useState } from "react";
import { Link } from "react-router";
import {
	ArrowRight,
	BookOpen,
	ChevronDown,
	ChevronUp,
	Link2,
	MessageCircle,
	Sparkles,
	Target,
} from "lucide-react";
import { MonoText } from "@/components";
import { getAppStats } from "@/db/queries/stats";
import type { Route } from "./+types/home";

export function meta() {
	return [
		{ title: "Kalimera - Learn Greek Through Patterns" },
		{
			name: "description",
			content: "A pattern-based approach to Greek grammar for English speakers",
		},
	];
}

export async function loader() {
	return { stats: await getAppStats() };
}

const PatternDemo = () => (
	<div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
		<p className="text-xs uppercase tracking-widest text-stone-400 mb-4">
			One pattern, many words
		</p>
		<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
			<div>
				<p className="text-sm text-stone-500 mb-2">Articles (accusative)</p>
				<div className="flex gap-4">
					<div className="text-center">
						<MonoText variant="greek" className="text-xl text-ocean">
							τ<span className="font-bold">ον</span>
						</MonoText>
						<p className="text-xs text-stone-400 mt-1">the (m)</p>
					</div>
					<div className="text-center">
						<MonoText variant="greek" className="text-xl text-rose-500">
							τ<span className="font-bold">ην</span>
						</MonoText>
						<p className="text-xs text-stone-400 mt-1">the (f)</p>
					</div>
					<div className="text-center">
						<MonoText variant="greek" className="text-xl text-stone-600">
							τ<span className="font-bold">ο</span>
						</MonoText>
						<p className="text-xs text-stone-400 mt-1">the (n)</p>
					</div>
				</div>
			</div>
			<div>
				<p className="text-sm text-stone-500 mb-2">Pronouns (accusative)</p>
				<div className="flex gap-4">
					<div className="text-center">
						<MonoText variant="greek" className="text-xl text-ocean">
							αυτ<span className="font-bold">όν</span>
						</MonoText>
						<p className="text-xs text-stone-400 mt-1">him</p>
					</div>
					<div className="text-center">
						<MonoText variant="greek" className="text-xl text-rose-500">
							αυτ<span className="font-bold">ήν</span>
						</MonoText>
						<p className="text-xs text-stone-400 mt-1">her</p>
					</div>
					<div className="text-center">
						<MonoText variant="greek" className="text-xl text-stone-600">
							αυτ<span className="font-bold">ό</span>
						</MonoText>
						<p className="text-xs text-stone-400 mt-1">it</p>
					</div>
				</div>
			</div>
		</div>
		<p className="text-xs text-stone-400 mt-4 text-center">
			Same endings:{" "}
			<span className="text-ocean font-medium">-ον</span> /{" "}
			<span className="text-rose-500 font-medium">-ην</span> /{" "}
			<span className="text-stone-600 font-medium">-ο</span>
		</p>
	</div>
);

const DailyPhrase = () => {
	const [showGrammar, setShowGrammar] = useState(false);

	const phrases = [
		{
			greek: "Καλημέρα",
			english: "Good morning",
			literal: "Beautiful day",
			grammar:
				"Καλή (beautiful) + ημέρα (day). Greek combines adjective + noun into one word for common greetings.",
		},
		{
			greek: "Τι κάνεις;",
			english: "How are you?",
			literal: "What do you do?",
			grammar:
				"Τι (what) + κάνεις (you do, 2nd person singular). The -εις ending marks informal 'you'.",
		},
		{
			greek: "Ευχαριστώ πολύ",
			english: "Thank you very much",
			literal: "I thank much",
			grammar:
				"Ευχαριστώ (I thank, 1st person) + πολύ (much/very). The -ώ ending marks 1st person singular.",
		},
		{
			greek: "Με λένε...",
			english: "My name is...",
			literal: "They call me...",
			grammar:
				"Με (me, accusative) + λένε (they call, 3rd person plural). Greek uses 'they call me' instead of 'my name is'.",
		},
		{
			greek: "Χαίρω πολύ",
			english: "Nice to meet you",
			literal: "I rejoice much",
			grammar:
				"Χαίρω (I rejoice, 1st person) + πολύ (much). A formal greeting expressing pleasure at meeting someone.",
		},
	];

	const today = new Date();
	const dayIndex = today.getDate() % phrases.length;
	const phrase = phrases[dayIndex] ?? phrases[0];

	return (
		<div className="bg-terracotta-50 rounded-2xl p-6 border border-terracotta-100">
			<p className="text-xs uppercase tracking-widest text-stone-400 mb-3">
				Phrase of the day
			</p>
			<p className="text-3xl font-serif text-terracotta mb-1 greek-text">
				{phrase?.greek}
			</p>
			<p className="text-stone-700">{phrase?.english}</p>
			<p className="text-sm text-stone-500 italic">lit. "{phrase?.literal}"</p>

			<button
				type="button"
				onClick={() => setShowGrammar(!showGrammar)}
				className="mt-3 flex items-center gap-1 text-sm text-ocean hover:text-ocean-dark transition-colors"
			>
				Why this works
				{showGrammar ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
			</button>

			{showGrammar && (
				<div className="mt-3 p-3 bg-white rounded-lg border border-stone-200">
					<p className="text-sm text-stone-600">{phrase?.grammar}</p>
				</div>
			)}
		</div>
	);
};

const PrimaryCard = ({
	icon,
	title,
	description,
	href,
	accent,
}: {
	icon: React.ReactNode;
	title: string;
	description: string;
	href: string;
	accent: "terracotta" | "olive" | "ocean" | "honey";
}) => {
	const styles = {
		terracotta: {
			bg: "bg-terracotta-50 hover:bg-terracotta-100",
			border: "border-terracotta-200",
			icon: "text-terracotta",
		},
		olive: {
			bg: "bg-olive-50 hover:bg-olive-100",
			border: "border-olive-200",
			icon: "text-olive",
		},
		ocean: {
			bg: "bg-ocean-50 hover:bg-ocean-100",
			border: "border-ocean-200",
			icon: "text-ocean",
		},
		honey: {
			bg: "bg-honey-50 hover:bg-honey-100",
			border: "border-honey-200",
			icon: "text-honey-dark",
		},
	};

	const s = styles[accent];

	return (
		<Link
			to={href}
			className={`group block p-6 rounded-2xl border-2 ${s.bg} ${s.border} transition-all`}
		>
			<div className={`mb-3 ${s.icon}`}>{icon}</div>
			<h3 className="text-lg font-semibold text-stone-800 mb-1">{title}</h3>
			<p className="text-sm text-stone-600 mb-3">{description}</p>
			<span className="inline-flex items-center gap-1 text-sm font-medium text-terracotta group-hover:gap-2 transition-all">
				Get started <ArrowRight size={14} />
			</span>
		</Link>
	);
};

const SecondaryLink = ({
	icon,
	title,
	description,
	href,
}: {
	icon: React.ReactNode;
	title: string;
	description: string;
	href: string;
}) => (
	<Link
		to={href}
		className="group flex items-start gap-4 p-4 rounded-xl hover:bg-stone-50 transition-colors"
	>
		<div className="text-stone-400 group-hover:text-stone-600 transition-colors mt-0.5">
			{icon}
		</div>
		<div className="flex-1">
			<h4 className="font-medium text-stone-700 group-hover:text-stone-900 transition-colors">
				{title}
			</h4>
			<p className="text-sm text-stone-500">{description}</p>
		</div>
		<ArrowRight
			size={16}
			className="text-stone-300 group-hover:text-terracotta group-hover:translate-x-1 transition-all mt-1"
		/>
	</Link>
);

export default function HomeRoute({ loaderData }: Route.ComponentProps) {
	const { stats } = loaderData;

	return (
		<div className="min-h-[80vh]">
			{/* Hero */}
			<section className="pt-8 pb-12">
				<div className="max-w-3xl">
					<p className="text-terracotta font-medium tracking-wide mb-2 greek-text text-lg">
						Καλημέρα
					</p>
					<h1 className="text-4xl md:text-5xl font-serif text-navy leading-tight mb-4">
						Greek grammar is a system of patterns
					</h1>
					<p className="text-lg text-stone-600 leading-relaxed">
						Once you see the structure, the language clicks. We show patterns,
						not memorization lists.
					</p>
					{stats.vocabulary > 0 && (
						<p className="mt-3 text-sm text-stone-500">
							{stats.vocabulary} vocabulary items
						</p>
					)}
				</div>
			</section>

			{/* Pattern demo + Daily phrase side by side */}
			<section className="grid md:grid-cols-2 gap-6 mb-12">
				<PatternDemo />
				<DailyPhrase />
			</section>

			{/* Primary paths */}
			<section className="mb-12">
				<h2 className="text-xl font-serif text-navy mb-6">Start learning</h2>
				<div className="grid md:grid-cols-2 gap-4">
					<PrimaryCard
						icon={<Target size={24} strokeWidth={1.5} />}
						title="Practice Drills"
						description="Interactive exercises that build recognition. See how well you know the patterns."
						href="/practice"
						accent="honey"
					/>
					<PrimaryCard
						icon={<MessageCircle size={24} strokeWidth={1.5} />}
						title="Conversations"
						description="Common situations: greetings, food, hospitality. Learn phrases in context."
						href="/conversations"
						accent="olive"
					/>
				</div>
			</section>

			{/* Secondary paths */}
			<section className="mb-8">
				<h2 className="text-lg font-medium text-stone-700 mb-4">
					Reference & study
				</h2>
				<div className="bg-white rounded-2xl border border-stone-200 divide-y divide-stone-100">
					<SecondaryLink
						icon={<BookOpen size={20} strokeWidth={1.5} />}
						title="Quick Reference"
						description="Cases, pronouns, articles, and verb patterns organized to reveal structure"
						href="/quick-reference"
					/>
					<SecondaryLink
						icon={<Link2 size={20} strokeWidth={1.5} />}
						title="Phrases"
						description="Discourse markers, responses, and expressions that make Greek sound natural"
						href="/phrases"
					/>
					<SecondaryLink
						icon={<Sparkles size={20} strokeWidth={1.5} />}
						title="Vocabulary"
						description="Words organized by everyday situations, with examples in context"
						href="/vocabulary"
					/>
				</div>
			</section>
		</div>
	);
}
