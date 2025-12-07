import { useState } from "react";
import { Link } from "react-router";
import { ArrowRight, BookOpen, CheckCircle, ChevronDown, ChevronUp, Link2, MessageCircle, Sparkles, Target } from "lucide-react";
import { MonoText } from "@/components";
import { Badge } from "@/components/ui/badge";
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

export const loader = async ({ context }: Route.LoaderArgs) => {
	const db = context?.db ?? (await import("../db")).db;
	const { users, vocabulary } = await import("../db/schema");
	const { count } = await import("drizzle-orm");

	const [userCount] = await db.select({ count: count() }).from(users);
	const [vocabCount] = await db.select({ count: count() }).from(vocabulary);

	return {
		stats: {
			users: userCount?.count ?? 0,
			vocabulary: vocabCount?.count ?? 0,
		},
	};
};

const GreekLetter = ({ letter, className = "" }: { letter: string; className?: string }) => (
	<span
		className={`inline-block font-serif text-terracotta/10 select-none pointer-events-none ${className}`}
		aria-hidden="true"
	>
		{letter}
	</span>
);

const PathCard = ({
	icon,
	title,
	description,
	href,
	accent,
	badge,
}: {
	icon: React.ReactNode;
	title: string;
	description: string;
	href: string;
	accent: "terracotta" | "olive" | "aegean" | "honey";
	badge?: string;
}) => {
	const accentStyles = {
		terracotta: "border-terracotta/20 hover:border-terracotta/40 hover:bg-terracotta/5",
		olive: "border-olive/20 hover:border-olive/40 hover:bg-olive/5",
		aegean: "border-aegean/20 hover:border-aegean/40 hover:bg-aegean/5",
		honey: "border-honey/20 hover:border-honey/40 hover:bg-honey/5",
	};

	const iconStyles = {
		terracotta: "text-terracotta",
		olive: "text-olive",
		aegean: "text-aegean",
		honey: "text-honey-dark",
	};

	return (
		<Link
			to={href}
			className={`group relative block p-6 rounded-2xl border-2 bg-white/50 backdrop-blur-sm transition-all duration-300 ${accentStyles[accent]}`}
		>
			{badge && (
				<Badge variant="default" className="absolute top-4 right-4 bg-terracotta text-white border-terracotta font-semibold">
					{badge}
				</Badge>
			)}
			<div className={`mb-4 ${iconStyles[accent]}`}>{icon}</div>
			<h3 className="text-lg font-semibold text-stone-800 mb-2 group-hover:text-stone-900">
				{title}
			</h3>
			<p className="text-slate text-sm leading-relaxed mb-4">{description}</p>
			<div className="inline-flex items-center gap-1 text-sm font-medium text-santorini opacity-0 group-hover:opacity-100 transition-opacity">
				Explore <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
			</div>
		</Link>
	);
};

const DailyPhrase = () => {
	const [showGrammar, setShowGrammar] = useState(false);

	const phrases = [
		{
			greek: "Καλημέρα",
			english: "Good morning",
			literal: "Beautiful day",
			grammar: "Καλή (beautiful) + ημέρα (day). Greek combines adjective + noun into one word for common greetings.",
		},
		{
			greek: "Τι κάνεις;",
			english: "How are you?",
			literal: "What do you do?",
			grammar: "Τι (what) + κάνεις (you do, 2nd person singular). The -εις ending marks informal 'you'.",
		},
		{
			greek: "Ευχαριστώ πολύ",
			english: "Thank you very much",
			literal: "I thank much",
			grammar: "Ευχαριστώ (I thank, 1st person) + πολύ (much/very). The -ώ ending marks 1st person singular.",
		},
		{
			greek: "Με λένε...",
			english: "My name is...",
			literal: "They call me...",
			grammar: "Με (me, accusative) + λένε (they call, 3rd person plural). Greek uses 'they call me' instead of 'my name is'.",
		},
		{
			greek: "Χαίρω πολύ",
			english: "Nice to meet you",
			literal: "I rejoice much",
			grammar: "Χαίρω (I rejoice, 1st person) + πολύ (much). A formal greeting expressing pleasure at meeting someone.",
		},
	];

	const today = new Date();
	const dayIndex = today.getDate() % phrases.length;
	const phrase = phrases[dayIndex];

	return (
		<div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-stone-50 to-cream p-8 border border-stone-200/50">
			<div className="absolute -top-8 -right-8 text-[120px] font-serif text-terracotta/5 leading-none select-none">
				Ω
			</div>
			<p className="text-xs uppercase tracking-widest text-slate mb-3">Phrase of the day</p>
			<p className="text-5xl font-serif text-terracotta mb-2 greek-text">{phrase.greek}</p>
			<p className="text-lg text-stone-700 mb-1">{phrase.english}</p>
			<p className="text-sm text-slate italic">lit. "{phrase.literal}"</p>

			<button
				onClick={() => setShowGrammar(!showGrammar)}
				className="mt-4 flex items-center gap-1 text-sm text-aegean hover:text-aegean-dark transition-colors"
			>
				Why this works
				{showGrammar ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
			</button>

			{showGrammar && (
				<div className="mt-3 p-3 bg-aegean/5 rounded-lg border border-aegean/20">
					<p className="text-sm text-aegean-text">{phrase.grammar}</p>
				</div>
			)}
		</div>
	);
};

const QuickStartSection = () => (
	<section className="mt-16">
		<div className="flex items-end justify-between mb-8">
			<div>
				<h2 className="text-2xl font-serif text-navy">Where would you like to start?</h2>
				<p className="text-slate mt-1">Choose your path based on what you need</p>
			</div>
		</div>

		<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
			<PathCard
				icon={<MessageCircle size={28} strokeWidth={1.5} />}
				title="Conversations"
				description="Navigate common situations: greetings, food, hospitality, and small talk with Greeks."
				href="/conversations"
				accent="olive"
				badge="Start here"
			/>
			<PathCard
				icon={<Link2 size={28} strokeWidth={1.5} />}
				title="Phrases"
				description="Discourse markers, responses, and expressions that make your Greek sound natural."
				href="/phrases"
				accent="aegean"
			/>
			<PathCard
				icon={<BookOpen size={28} strokeWidth={1.5} />}
				title="Quick Reference"
				description="Cases, pronouns, articles, and verb patterns organized to reveal Greek's structure."
				href="/quick-reference"
				accent="terracotta"
			/>
			<PathCard
				icon={<Target size={28} strokeWidth={1.5} />}
				title="Practice Drills"
				description="Interactive exercises that adapt to your progress. Build fluency through focused practice."
				href="/practice"
				accent="honey"
			/>
			<PathCard
				icon={<Sparkles size={28} strokeWidth={1.5} />}
				title="Vocabulary"
				description="Build your word bank organized by everyday situations. See words in context."
				href="/vocabulary"
				accent="olive"
			/>
		</div>
	</section>
);

const PhilosophySection = () => (
	<section className="mt-12 mb-8">
		<div className="max-w-2xl">
			<h2 className="text-xl font-serif text-navy mb-4">Our approach</h2>
			<p className="text-slate leading-relaxed">
				Greek grammar isn't a list of exceptions to memorize—it's a system of patterns.
				Once you see the structure, the language clicks.
			</p>

			<div className="mt-6 p-4 bg-white/80 rounded-xl border border-stone-200/50">
				<p className="text-xs uppercase tracking-widest text-stone-500 mb-3">Same pattern, different words</p>
				<div className="grid grid-cols-2 gap-4">
					<div className="text-center">
						<p className="text-sm text-slate mb-2">Definite articles</p>
						<div className="flex justify-center gap-3">
							<div className="flex flex-col items-center">
								<MonoText variant="greek" className="text-aegean">τ<span className="text-aegean font-bold">ον</span></MonoText>
								<span className="text-xs text-aegean/70 mt-1">m</span>
							</div>
							<div className="flex flex-col items-center">
								<MonoText variant="greek" className="text-rose-500">τ<span className="text-rose-500 font-bold">ην</span></MonoText>
								<span className="text-xs text-rose-400 mt-1">f</span>
							</div>
							<div className="flex flex-col items-center">
								<MonoText variant="greek" className="text-stone-500">τ<span className="text-stone-600 font-bold">ο</span></MonoText>
								<span className="text-xs text-stone-400 mt-1">n</span>
							</div>
						</div>
					</div>
					<div className="text-center">
						<p className="text-sm text-slate mb-2">Demonstratives</p>
						<div className="flex justify-center gap-3">
							<div className="flex flex-col items-center">
								<MonoText variant="greek" className="text-aegean">αυτ<span className="text-aegean font-bold">όν</span></MonoText>
								<span className="text-xs text-aegean/70 mt-1">m</span>
							</div>
							<div className="flex flex-col items-center">
								<MonoText variant="greek" className="text-rose-500">αυτ<span className="text-rose-500 font-bold">ήν</span></MonoText>
								<span className="text-xs text-rose-400 mt-1">f</span>
							</div>
							<div className="flex flex-col items-center">
								<MonoText variant="greek" className="text-stone-500">αυτ<span className="text-stone-600 font-bold">ό</span></MonoText>
								<span className="text-xs text-stone-400 mt-1">n</span>
							</div>
						</div>
					</div>
				</div>
				<p className="text-xs text-center text-stone-500 mt-3">
					Both follow the same endings:{" "}
					<span className="text-aegean font-medium">-ον</span> /{" "}
					<span className="text-rose-500 font-medium">-ην</span> /{" "}
					<span className="text-stone-600 font-medium">-ο</span>
				</p>
			</div>

			<p className="text-slate leading-relaxed mt-4">
				We show structure, not flat lists. Greek first, English as context.
				Comprehension before production.
			</p>
		</div>
	</section>
);

export default function HomeRoute({ loaderData }: Route.ComponentProps) {
	const { stats } = loaderData;

	return (
		<div className="min-h-[80vh]">
			{/* Hero Section */}
			<section className="relative pt-8 pb-12">
				{/* Decorative Greek letters */}
				<GreekLetter letter="Α" className="absolute top-0 left-0 text-[200px] -translate-x-1/3 -translate-y-1/4" />
				<GreekLetter letter="Ω" className="absolute bottom-0 right-0 text-[180px] translate-x-1/4 translate-y-1/4" />

				<div className="relative z-10 max-w-3xl">
					<p className="text-terracotta font-medium tracking-wide mb-4 greek-text">Καλημέρα</p>
					<h1 className="text-5xl md:text-6xl font-serif text-navy leading-tight mb-6">
						Learn Greek
						<br />
						<span className="text-terracotta">through patterns</span>
					</h1>
					<p className="text-xl text-slate leading-relaxed max-w-xl">
						A pattern-based reference for English speakers learning Modern Greek. See the structure,
						not just the words.
					</p>

					{/* Learning outcomes */}
					<div className="mt-6 flex flex-wrap gap-3">
						<span className="inline-flex items-center gap-1.5 text-sm text-olive-text bg-olive/10 px-3 py-1.5 rounded-full">
							<CheckCircle size={14} /> Understand cases
						</span>
						<span className="inline-flex items-center gap-1.5 text-sm text-aegean-text bg-aegean/10 px-3 py-1.5 rounded-full">
							<CheckCircle size={14} /> Recognize patterns
						</span>
						<span className="inline-flex items-center gap-1.5 text-sm text-terracotta-text bg-terracotta/10 px-3 py-1.5 rounded-full">
							<CheckCircle size={14} /> Build sentences
						</span>
					</div>

					{stats.vocabulary > 0 && (
						<p className="mt-4 text-sm text-slate">
							{stats.vocabulary} vocabulary items • No prior Greek required
						</p>
					)}
				</div>
			</section>

			{/* Daily Phrase */}
			<DailyPhrase />

			{/* Philosophy - moved before Quick Start */}
			<PhilosophySection />

			{/* Quick Start Paths */}
			<QuickStartSection />
		</div>
	);
}
