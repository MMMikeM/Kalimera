import React, { useState } from "react";
import {
	BookOpen,
	Clock,
	FileText,
	Lightbulb,
	Search,
	Users,
	Download,
	X,
} from "lucide-react";
import {
	ALL_WORDS,
	COLORS,
	DEFAULT_TAB,
	DEFINITE_ARTICLES,
	FREQUENCY_ADVERBS,
	FUTURE_TENSE_EXAMPLES,
	LIKES_CONSTRUCTION,
	NUMBERS,
	PAST_TENSE_EXAMPLES,
	SUMMER_VOCABULARY,
	TABS,
	TIME_EXPRESSIONS,
	TIMES_OF_DAY,
	TRANSPORTATION,
	USEFUL_EXPRESSIONS,
	VERB_CATEGORIES,
	VERB_CONJUGATIONS,
} from "../constants/greek-reference";
import type {
	ArticleForm,
	TabId,
	VerbConjugation,
	WordInfo,
} from "../types/greek-reference";
import {
	Button,
	Card,
	InfoBox,
	Badge,
	MonoText,
	SearchInput,
	Table,
} from "./ui";
import { exportOptions, downloadMarkdown } from "../utils/markdown-export";

const GreekReference: React.FC = () => {
	const [activeTab, setActiveTab] = useState<TabId>(DEFAULT_TAB);
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState<WordInfo[]>([]);
	const [showExportModal, setShowExportModal] = useState(false);

	// Helper function to get icon component
	const getIcon = (iconName: string) => {
		const iconMap = {
			Search: <Search size={16} />,
			BookOpen: <BookOpen size={16} />,
			Users: <Users size={16} />,
			Clock: <Clock size={16} />,
			FileText: <FileText size={16} />,
		};
		return iconMap[iconName as keyof typeof iconMap] || null;
	};

	// Handle export
	const handleExport = (optionId: string) => {
		const option = exportOptions.find((opt) => opt.id === optionId);
		if (option) {
			const content = option.exportFunction();
			downloadMarkdown(content, option.filename);
			setShowExportModal(false);
		}
	};

	// Helper function to render highlighted verb forms
	const renderVerbForm = (conjugation: VerbConjugation, colorClass: string) => {
		if (!conjugation.highlighted) {
			return <MonoText>{conjugation.form}</MonoText>;
		}

		const parts = conjugation.form.split(conjugation.highlighted);
		return (
			<MonoText>
				{parts[0]}
				<span className={colorClass}>{conjugation.highlighted}</span>
				{parts[1]}
			</MonoText>
		);
	};

	// Helper function to render article forms with colors
	const renderArticleForm = (form: ArticleForm) => [
		form.case,
		<MonoText key={`${form.case}-m`} variant="masculine">
			{form.masculine}
		</MonoText>,
		<MonoText key={`${form.case}-f`} variant="feminine">
			{form.feminine}
		</MonoText>,
		<MonoText key={`${form.case}-n`} variant="neuter">
			{form.neuter}
		</MonoText>,
	];

	const ArticlesContent = () => (
		<div className="space-y-10">
			<InfoBox
				variant="info"
				title='The "Tin Tis Toun" Mystery Solved!'
				icon={<Lightbulb size={20} />}
			>
				These are all forms of "the" - they change based on gender, number, and
				case!
			</InfoBox>

			<div className="grid lg:grid-cols-2 gap-8">
				<div className="space-y-4">
					<Table
						title="Definite Article 'The' (Singular)"
						headers={["Case", "Masculine", "Feminine", "Neuter"]}
						headerColors={[
							"",
							"text-blue-600 font-bold",
							"text-pink-600 font-bold",
							"text-green-600 font-bold",
						]}
						rows={DEFINITE_ARTICLES.singular.map(renderArticleForm)}
					/>
				</div>

				<div className="space-y-4">
					<Table
						title="Plural Forms"
						headers={["Case", "Masculine", "Feminine", "Neuter"]}
						headerColors={[
							"",
							"text-blue-600 font-bold",
							"text-pink-600 font-bold",
							"text-green-600 font-bold",
						]}
						rows={DEFINITE_ARTICLES.plural.map(renderArticleForm)}
					/>
				</div>
			</div>

			<InfoBox variant="warning" title='Memory Aid: The "ν" Rule' icon="🧠">
				<p className="mb-3">
					Add "ν" to τον/την/το when the next word starts with: vowel, κ, π, τ,
					ξ, ψ, γκ, μπ, ντ
				</p>
				<div className="bg-white/50 rounded-lg p-4 mt-4">
					<div className="font-semibold text-yellow-800 mb-2">Examples:</div>
					<div className="space-y-2">
						<div>
							<MonoText variant="warning" size="lg">
								τον άντρα
							</MonoText>{" "}
							(ton andra)
						</div>
						<div>
							<MonoText variant="warning" size="lg">
								την ώρα
							</MonoText>{" "}
							(tin ora)
						</div>
					</div>
				</div>
			</InfoBox>

			<div className="grid lg:grid-cols-2 gap-6">
				<InfoBox variant="success" title="When to use Accusative" icon="✅">
					<ul className="space-y-2">
						<li>
							• Direct object: "I see <em>the man</em>"
						</li>
						<li>
							• After prepositions: "to <em>the house</em>"
						</li>
						<li>
							• Time expressions: "on <em>Monday</em>"
						</li>
					</ul>
				</InfoBox>

				<InfoBox variant="info" title="When to use Nominative" icon="📝">
					<ul className="space-y-2">
						<li>
							• Subject: "<em>The man</em> is tall"
						</li>
						<li>
							• After "to be": "He is <em>a teacher</em>"
						</li>
					</ul>
				</InfoBox>
			</div>
		</div>
	);

	const PresentTenseContent = () => (
		<div className="space-y-10">
			<InfoBox
				variant="purple"
				title="Two Main Families"
				icon={<Lightbulb size={20} />}
			>
				Almost every Greek verb fits into one of these two patterns!
			</InfoBox>

			<div className="grid lg:grid-cols-2 gap-8">
				<Card variant="bordered" padding="lg">
					<h3 className="text-xl font-bold mb-4 text-blue-600">
						Family 1: Active (-ω verbs)
					</h3>

					<InfoBox variant="info" size="sm" title="🎵 The Rhythm">
						<MonoText variant="highlighted" size="lg">
							-ω, -εις, -ει, -ουμε, -ετε, -ουν(ε)
						</MonoText>
					</InfoBox>

					<div className="mt-6 space-y-6">
						<Table
							title="Type A: κάνω (I do) - stress on stem"
							rows={VERB_CONJUGATIONS.kano.map((conj) => [
								conj.person,
								renderVerbForm(conj, "bg-blue-200"),
								conj.english,
							])}
						/>

						<Table
							title="Type B: μιλάω (I speak) - stress on ending"
							rows={VERB_CONJUGATIONS.milao.map((conj) => [
								conj.person,
								renderVerbForm(conj, "bg-blue-200"),
								conj.english,
							])}
						/>
					</div>
				</Card>

				<div className="border rounded-lg p-4">
					<h3 className="text-lg font-bold mb-3 text-green-600">
						Family 2: Passive (-ομαι verbs)
					</h3>

					<div className="bg-green-50 p-3 rounded mb-4">
						<h4 className="font-bold">🎵 The Rhythm:</h4>
						<p className="font-mono text-lg">
							-ομαι, -εσαι, -εται, -όμαστε, -εστε, -ονται
						</p>
					</div>

					<h4 className="font-semibold mb-2">Type A: έρχομαι (I come)</h4>
					<Table
						rows={VERB_CONJUGATIONS.erhomai.map((conj) => [
							conj.person,
							renderVerbForm(conj, "bg-green-200"),
							conj.english,
						])}
						className="mb-4"
					/>

					<h4 className="font-semibold mb-2">Type B: θυμάμαι (I remember)</h4>
					<Table
						rows={VERB_CONJUGATIONS.thymamai.map((conj) => [
							conj.person,
							renderVerbForm(conj, "bg-green-200"),
							conj.english,
						])}
					/>
				</div>
			</div>

			<div className="bg-orange-50 p-4 rounded-lg">
				<h4 className="font-bold text-orange-800 mb-2">🧠 Memory Tips</h4>
				<div className="grid md:grid-cols-2 gap-4 text-orange-700">
					<div>
						<p>
							<strong>Active verbs (-ω):</strong> Someone DOES something
						</p>
						<p>
							<strong>Passive verbs (-ομαι):</strong> Look passive but often
							mean active actions
						</p>
					</div>
					<div>
						<p>
							<strong>Pattern recognition:</strong> Learn the "I" form (εγώ) and
							you know the family!
						</p>
						<p>
							<strong>έρχομαι = -ομαι family</strong>
						</p>
						<p>
							<strong>κάνω = -ω family</strong>
						</p>
					</div>
				</div>
			</div>

			<div className="bg-red-50 p-4 rounded-lg">
				<h4 className="font-bold text-red-800 mb-2">
					⚡ Irregular Verbs - Must Memorize!
				</h4>
				<div className="bg-red-100 p-2 rounded mb-3">
					<p className="text-sm text-red-700">
						These don't follow the standard patterns - learn them individually!
					</p>
				</div>

				<div className="grid md:grid-cols-2 gap-4 mb-4">
					<div>
						<h5 className="font-semibold mb-2">πάω (I go)</h5>
						<Table
							rows={VERB_CONJUGATIONS.pao.map((conj) => [
								conj.person,
								conj.form,
								conj.english,
							])}
						/>
					</div>

					<div>
						<h5 className="font-semibold mb-2">λέω (I say)</h5>
						<Table
							rows={VERB_CONJUGATIONS.leo.map((conj) => [
								conj.person,
								conj.form,
								conj.english,
							])}
						/>
					</div>
				</div>

				<div className="grid md:grid-cols-2 gap-4 mb-4">
					<div>
						<h5 className="font-semibold mb-2">τρώω (I eat) - drops ω</h5>
						<Table
							rows={VERB_CONJUGATIONS.troo.map((conj) => [
								conj.person,
								conj.form,
								conj.english,
							])}
						/>
					</div>

					<div>
						<h5 className="font-semibold mb-2">είμαι (I am)</h5>
						<Table
							rows={VERB_CONJUGATIONS.eimai.map((conj) => [
								conj.person,
								conj.form,
								conj.english,
							])}
						/>
					</div>
				</div>

				<div className="bg-orange-100 p-3 rounded">
					<h6 className="font-bold text-orange-800 mb-2">🧠 Memory Notes:</h6>
					<div className="text-sm text-orange-700 space-y-1">
						<p>
							<strong>πάω:</strong> Alternative form is πηγαίνω (follows normal
							Type A pattern)
						</p>
						<p>
							<strong>λέω:</strong> Notice how it drops the final ω in most
							forms
						</p>
						<p>
							<strong>τρώω:</strong> Similar to λέω - drops the final ω
						</p>
						<p>
							<strong>τα λέμε:</strong> "see ya later" (literally "we say them")
						</p>
					</div>
				</div>
			</div>
		</div>
	);

	const OtherTensesContent = () => (
		<div className="space-y-6">
			<InfoBox variant="purple" title="Future Reference - Key Patterns">
				These follow the same base patterns as present tense, just with
				different markers.
			</InfoBox>

			<div className="grid md:grid-cols-2 gap-6">
				<div className="border rounded-lg p-4">
					<h3 className="text-lg font-bold mb-3">
						Simple Future (θα + present)
					</h3>
					<div className="bg-blue-50 p-3 rounded mb-3">
						<p>
							<strong>Formula:</strong> θα + present tense forms
						</p>
					</div>
					<Table
						headers={["Person", "θα κάνω", "English"]}
						rows={FUTURE_TENSE_EXAMPLES.map((conj) => [
							conj.person,
							conj.form,
							conj.english,
						])}
					/>
				</div>

				<div className="border rounded-lg p-4">
					<h3 className="text-lg font-bold mb-3">
						Past Simple - Basic Pattern
					</h3>
					<div className="bg-green-50 p-3 rounded mb-3">
						<p>
							<strong>Key:</strong> Often starts with έ- and changes endings
						</p>
					</div>
					<Table
						headers={["Person", "έκανα", "English"]}
						rows={PAST_TENSE_EXAMPLES.map((conj) => [
							conj.person,
							conj.form,
							conj.english,
						])}
					/>
				</div>
			</div>

			<div className="bg-yellow-50 p-4 rounded-lg">
				<h4 className="font-bold text-yellow-800 mb-2">
					🎯 Focus on Present First!
				</h4>
				<p className="text-yellow-700">
					Master the present tense patterns before diving deep into other
					tenses. The same verb families apply - just with different time
					markers.
				</p>
			</div>
		</div>
	);

	const VocabularyContent = () => (
		<div className="space-y-6">
			<InfoBox variant="success" title="Quick Verb Reference">
				From your Greek learning materials - organized by conjugation pattern.
			</InfoBox>

			{VERB_CATEGORIES.map((category) => (
				<div key={category.id} className="border rounded-lg p-4">
					<h3 className="text-lg font-bold mb-3">{category.title}</h3>
					<div className="grid md:grid-cols-2 gap-4">
						{category.verbs.map((verb) => (
							<div
								key={verb.id}
								className="flex justify-between items-center p-2 bg-gray-50 rounded"
							>
								<div>
									<span className="font-mono text-lg">{verb.greek}</span>
									<span className="text-gray-600 ml-2">{verb.english}</span>
								</div>
								<span className="text-xs bg-blue-100 px-2 py-1 rounded">
									{verb.pattern}
								</span>
							</div>
						))}
					</div>
				</div>
			))}

			<div className="border rounded-lg p-4 mb-6">
				<h3 className="text-lg font-bold mb-3">Telling Time - Τι ώρα είναι;</h3>
				<div className="bg-blue-50 p-3 rounded mb-3">
					<p className="text-sm text-blue-700">
						<strong>🕐 Pattern:</strong> Είναι + time / Η ώρα είναι + time
					</p>
				</div>
				<div className="grid md:grid-cols-2 gap-4">
					<div>
						<h5 className="font-semibold mb-2">Basic Time Structure</h5>
						<div className="space-y-1 text-sm">
							<div>
								<span className="font-mono">είναι μία</span> - it's one o'clock
							</div>
							<div>
								<span className="font-mono">είναι δύο</span> - it's two o'clock
							</div>
							<div>
								<span className="font-mono">είναι μία ακριβώς</span> - it's
								exactly one
							</div>
							<div>
								<span className="font-mono">τι ώρα είναι;</span> - what time is
								it?
							</div>
						</div>
					</div>
					<div>
						<h5 className="font-semibold mb-2">Minutes & Fractions</h5>
						<div className="space-y-1 text-sm">
							<div>
								<span className="font-mono">και τέταρτο</span> - quarter past
							</div>
							<div>
								<span className="font-mono">και μισή</span> - half past
							</div>
							<div>
								<span className="font-mono">παρά τέταρτο</span> - quarter to
							</div>
							<div>
								<span className="font-mono">παρά πέντε</span> - five to
							</div>
							<div>
								<span className="font-mono">και είκοσι πέντε</span> -
								twenty-five past
							</div>
						</div>
					</div>
				</div>
				<div className="bg-green-50 p-3 rounded mt-3">
					<p className="text-sm text-green-700">
						<strong>🕒 "At" times:</strong> στη μία (at one), στις τρεις (at
						three), στις τέσσερις (at four)
					</p>
				</div>
			</div>

			<div className="border rounded-lg p-4 mb-6">
				<h3 className="text-lg font-bold mb-3">Times of Day</h3>
				<div className="grid md:grid-cols-5 gap-2 text-sm">
					{TIMES_OF_DAY.map((time) => (
						<div key={time.id} className="text-center">
							<div className="font-mono text-lg">{time.greek}</div>
							<div className="text-gray-600">{time.english}</div>
							<div className="text-xs">{time.timeRange}</div>
						</div>
					))}
				</div>
			</div>

			<div className="border rounded-lg p-4 mb-6">
				<h3 className="text-lg font-bold mb-3">Transportation Vocabulary</h3>
				<div className="grid md:grid-cols-2 gap-4">
					<div>
						<h5 className="font-semibold mb-2">Vehicles</h5>
						<div className="space-y-1 text-sm">
							{TRANSPORTATION.vehicles.map((vehicle) => (
								<div key={vehicle.id}>
									<span className="font-mono">{vehicle.greek}</span> -{" "}
									{vehicle.english}
								</div>
							))}
						</div>
					</div>
					<div>
						<h5 className="font-semibold mb-2">Actions</h5>
						<div className="space-y-1 text-sm">
							{TRANSPORTATION.actions.map((action) => (
								<div key={action.id}>
									<span className="font-mono">{action.greek}</span> -{" "}
									{action.english}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			<div className="border rounded-lg p-4 mb-6">
				<h3 className="text-lg font-bold mb-3">Adverbs of Frequency</h3>
				<div className="bg-yellow-50 p-3 rounded mb-3">
					<p className="text-sm text-yellow-700">
						<strong>Remember:</strong> ποτέ = never, πότε = when (question)
					</p>
				</div>
				<div className="grid md:grid-cols-2 gap-2 text-sm">
					<div className="space-y-1">
						{FREQUENCY_ADVERBS.slice(0, 6).map((adverb) => (
							<div key={adverb.id}>
								<span className="font-mono">{adverb.greek}</span> -{" "}
								{adverb.english}
							</div>
						))}
					</div>
					<div className="space-y-1">
						{FREQUENCY_ADVERBS.slice(6).map((adverb) => (
							<div key={adverb.id}>
								<span className="font-mono">{adverb.greek}</span> -{" "}
								{adverb.english}
							</div>
						))}
					</div>
				</div>
			</div>

			<div className="border rounded-lg p-4 mb-6">
				<h3 className="text-lg font-bold mb-3">
					Likes Construction - μου αρέσει/αρέσουν
				</h3>
				<div className="bg-blue-50 p-3 rounded mb-3">
					<p className="text-sm text-blue-700">
						<strong>Pattern:</strong> [Person] αρέσει (for one thing) / αρέσουν
						(for many things)
					</p>
				</div>
				<div className="grid md:grid-cols-2 gap-4">
					<div>
						<h5 className="font-semibold mb-2">Single thing (αρέσει)</h5>
						<div className="space-y-1 text-sm">
							{LIKES_CONSTRUCTION.singular.map((like) => (
								<div key={like.id}>
									<span className="font-mono">{like.greek}</span> -{" "}
									{like.english}
								</div>
							))}
						</div>
					</div>
					<div>
						<h5 className="font-semibold mb-2">Multiple things (αρέσουν)</h5>
						<div className="space-y-1 text-sm">
							{LIKES_CONSTRUCTION.plural.map((like) => (
								<div key={like.id}>
									<span className="font-mono">{like.greek}</span> -{" "}
									{like.english}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			<div className="grid md:grid-cols-2 gap-4 mb-6">
				<div className="border rounded-lg p-4">
					<h4 className="font-bold mb-2">Summer & Beach Vocabulary</h4>
					<div className="space-y-1 text-sm">
						{SUMMER_VOCABULARY.map((word) => (
							<div key={word.id}>
								<span className="font-mono">{word.greek}</span> - {word.english}
							</div>
						))}
					</div>
				</div>

				<div className="border rounded-lg p-4">
					<h4 className="font-bold mb-2">Time Expressions</h4>
					<div className="space-y-1 text-sm">
						{TIME_EXPRESSIONS.map((expr) => (
							<div key={expr.id}>
								<span className="font-mono">{expr.greek}</span> - {expr.english}
							</div>
						))}
					</div>
				</div>
			</div>

			<div className="grid md:grid-cols-3 gap-4">
				<div className="border rounded-lg p-4">
					<h4 className="font-bold mb-2">Numbers (1-10)</h4>
					<div className="space-y-1 text-sm">
						{NUMBERS.map((number) => (
							<div key={number}>{number}</div>
						))}
					</div>
				</div>

				<div className="border rounded-lg p-4">
					<h4 className="font-bold mb-2">Colors</h4>
					<div className="space-y-1 text-sm">
						{COLORS.map((color) => (
							<div key={color}>{color}</div>
						))}
					</div>
				</div>

				<div className="border rounded-lg p-4">
					<h4 className="font-bold mb-2">Useful Expressions</h4>
					<div className="space-y-1 text-sm">
						{USEFUL_EXPRESSIONS.map((expr) => (
							<div key={expr.id}>
								<span className="font-mono">{expr.greek}</span> - {expr.english}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);

	const SearchContent = () => {
		const handleSearch = (term: string) => {
			setSearchTerm(term);
			if (term.length > 0) {
				const results = ALL_WORDS.filter(
					(word) =>
						word.greek.toLowerCase().includes(term.toLowerCase()) ||
						word.english.toLowerCase().includes(term.toLowerCase()),
				);
				setSearchResults(results);
			} else {
				setSearchResults([]);
			}
		};

		return (
			<div className="space-y-6">
				<InfoBox variant="purple" title="Quick Lookup">
					Search Greek or English words from your materials.
				</InfoBox>

				<SearchInput
					placeholder="Search Greek or English..."
					value={searchTerm}
					onChange={(e) => handleSearch(e.target.value)}
				/>

				{searchResults.length > 0 && (
					<div className="space-y-2">
						<h4 className="font-bold">Search Results:</h4>
						{searchResults.map((result) => (
							<div
								key={result.id}
								className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
							>
								<div>
									<MonoText variant="primary" size="lg">
										{result.greek}
									</MonoText>
									<span className="text-gray-700 ml-3">{result.english}</span>
								</div>
								<div className="flex gap-2">
									<Badge variant="default">{result.type}</Badge>
									{result.family && (
										<Badge variant="primary">{result.family}</Badge>
									)}
								</div>
							</div>
						))}
					</div>
				)}

				{searchTerm && searchResults.length === 0 && (
					<div className="text-center py-8 text-gray-500">
						No results found for "{searchTerm}"
					</div>
				)}

				<div className="bg-gray-50 p-4 rounded-lg">
					<h4 className="font-bold mb-2">💡 Search Tips</h4>
					<ul className="text-sm text-gray-700 space-y-1">
						<li>• Type in Greek or English to find matches</li>
						<li>
							• Search will find partial matches (e.g., "καλ" finds "καλημέρα")
						</li>
						<li>
							• Look for the verb family tags to know conjugation patterns
						</li>
					</ul>
				</div>
			</div>
		);
	};

	const renderContent = () => {
		switch (activeTab) {
			case "articles":
				return <ArticlesContent />;
			case "present":
				return <PresentTenseContent />;
			case "other-tenses":
				return <OtherTensesContent />;
			case "vocabulary":
				return <VocabularyContent />;
			case "search":
				return <SearchContent />;
			default:
				return <ArticlesContent />;
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
			<div className="max-w-7xl mx-auto p-6">
				<header className="text-center mb-12 pt-8 relative">
					<div className="absolute top-4 right-4">
						<Button
							onClick={() => setShowExportModal(true)}
							variant="secondary"
							size="md"
							className="shadow-lg"
						>
							<Download size={16} />
							Export as Markdown
						</Button>
					</div>

					<div className="relative">
						<h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 leading-tight">
							Greek Conjugation Reference
						</h1>
						<div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-lg opacity-5 blur-xl"></div>
					</div>
					<p className="text-xl text-gray-600 font-medium mt-4 max-w-2xl mx-auto leading-relaxed">
						Your comprehensive pattern-based guide to Greek grammar
					</p>
				</header>

				<nav className="mb-10">
					<div className="flex flex-wrap gap-3 justify-center p-2 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
						{TABS.map((tab) => (
							<Button
								key={tab.id}
								onClick={() => setActiveTab(tab.id as TabId)}
								active={activeTab === tab.id}
								variant="secondary"
								size="lg"
								className="shadow-sm"
							>
								{getIcon(tab.icon)}
								{tab.label}
							</Button>
						))}
					</div>
				</nav>

				<main className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/30 p-8 mb-8">
					{renderContent()}
				</main>

				<footer className="text-center mt-8 mb-8">
					<div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-6 shadow-lg border border-white/30">
						<p className="text-lg text-gray-700 font-medium">
							💡 Remember: Patterns over memorization! Once you know the family,
							you know the conjugation.
						</p>
					</div>
				</footer>

				{/* Export Modal */}
				{showExportModal && (
					<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
						<div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
							<div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
								<div className="flex justify-between items-center">
									<h2 className="text-2xl font-bold">Export as Markdown</h2>
									<Button
										onClick={() => setShowExportModal(false)}
										variant="ghost"
										size="sm"
										className="text-white hover:bg-white/20"
									>
										<X size={20} />
									</Button>
								</div>
								<p className="mt-2 text-blue-100">
									Choose what to export for offline study or sharing
								</p>
							</div>

							<div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
								{exportOptions.map((option) => (
									<Card
										key={option.id}
										variant="bordered"
										padding="md"
										className="hover:shadow-lg transition-all duration-200 cursor-pointer group"
										onClick={() => handleExport(option.id)}
									>
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-3">
												<div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
													<FileText size={20} className="text-blue-600" />
												</div>
												<div>
													<h3 className="font-semibold text-gray-900 group-hover:text-blue-600">
														{option.label}
													</h3>
													<p className="text-sm text-gray-500">
														{option.filename}
													</p>
												</div>
											</div>
											<Download
												size={16}
												className="text-gray-400 group-hover:text-blue-600 transition-colors"
											/>
										</div>
									</Card>
								))}
							</div>

							<div className="bg-gray-50 p-6 border-t">
								<div className="flex items-start gap-3">
									<div className="p-2 bg-yellow-100 rounded-lg">
										<Lightbulb size={16} className="text-yellow-600" />
									</div>
									<div className="text-sm text-gray-600">
										<p className="font-medium mb-1">📝 Perfect for:</p>
										<ul className="space-y-1 text-xs">
											<li>
												• Offline study with markdown apps (Obsidian, Notion)
											</li>
											<li>• Sharing with other Greek learners</li>
											<li>• Creating printable study materials</li>
											<li>• Backing up your reference content</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default GreekReference;
