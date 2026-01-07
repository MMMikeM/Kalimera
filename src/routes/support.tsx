import { Link } from "react-router";
import { Card } from "@/components/Card";
import { Heart, Coffee, ArrowLeft } from "lucide-react";

export default function SupportPage() {
	return (
		<div className="max-w-2xl mx-auto py-8">
			<Link
				to="/"
				className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-700 mb-8"
			>
				<ArrowLeft size={16} />
				<span>Back</span>
			</Link>

			<h1 className="text-3xl font-serif text-terracotta mb-4">
				About This Project
			</h1>

			<div className="prose prose-stone max-w-none mb-12">
				<p className="text-lg text-stone-600 leading-relaxed">
					My wife is Cypriot. We've moved to Cyprus and we're starting a family.
					I want our son to grow up speaking Greek. As close to native as
					possible.
				</p>
				<p className="text-stone-600 leading-relaxed">
					Problem is, I'm learning from square one. Apps, textbooks, courses.
					Everything trained me to recognise Greek, not produce it. I
					could tap the right answer in a multiple choice quiz, but when someone
					asked me something, my mind went blank.
				</p>
				<p className="text-stone-600 leading-relaxed">
					So I built this. Timed drills that force retrieval under pressure. 3.5
					seconds to produce the Greek. No hints. No multiple choice. Either you
					know it or you don't.
				</p>
				<p className="text-stone-600 leading-relaxed">
					It's how I'm learning. Maybe it'll help you too.
				</p>
			</div>

			<h2 className="text-2xl font-serif text-stone-800 mb-6">
				Support This Project
			</h2>

			<div className="grid gap-4 sm:grid-cols-2 mb-12">
				<Card className="p-6">
					<div className="flex items-start gap-4">
						<div className="w-10 h-10 rounded-full bg-terracotta/10 flex items-center justify-center flex-shrink-0">
							<Coffee size={20} className="text-terracotta" />
						</div>
						<div>
							<h3 className="font-medium text-stone-800 mb-1">Buy me a coffee</h3>
							<p className="text-sm text-stone-600 mb-3">
								One-time support to keep this project going.
							</p>
							<a
								href="https://ko-fi.com/"
								target="_blank"
								rel="noopener noreferrer"
								className="text-sm font-medium text-terracotta hover:text-terracotta-dark"
							>
								Support on Ko-fi →
							</a>
						</div>
					</div>
				</Card>

				<Card className="p-6">
					<div className="flex items-start gap-4">
						<div className="w-10 h-10 rounded-full bg-terracotta/10 flex items-center justify-center flex-shrink-0">
							<Heart size={20} className="text-terracotta" />
						</div>
						<div>
							<h3 className="font-medium text-stone-800 mb-1">Spread the word</h3>
							<p className="text-sm text-stone-600 mb-3">
								Share with someone learning Greek. Word of mouth helps the most.
							</p>
						</div>
					</div>
				</Card>
			</div>

			<h2 className="text-2xl font-serif text-stone-800 mb-6">What's Next</h2>

			<Card className="p-6 mb-12">
				<ul className="space-y-3 text-stone-600">
					<li className="flex items-start gap-3">
						<span className="text-terracotta">•</span>
						<span>More vocabulary and phrases from real conversations</span>
					</li>
					<li className="flex items-start gap-3">
						<span className="text-terracotta">•</span>
						<span>Verb conjugation drills</span>
					</li>
					<li className="flex items-start gap-3">
						<span className="text-terracotta">•</span>
						<span>Audio pronunciation (when I can afford it)</span>
					</li>
					<li className="flex items-start gap-3">
						<span className="text-terracotta">•</span>
						<span>More grammar reference content</span>
					</li>
				</ul>
			</Card>

			<div className="text-center text-stone-500 text-sm">
				<p>
					Built with care in Cyprus.{" "}
					<span className="font-serif text-terracotta">Ευχαριστώ</span> for using
					this.
				</p>
			</div>
		</div>
	);
}
