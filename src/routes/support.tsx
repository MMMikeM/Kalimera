import { ArrowLeft, Coffee, Heart } from "lucide-react";
import { Link } from "react-router";
import { Card } from "@/components/Card";

export default function SupportPage() {
	return (
		<div className="mx-auto max-w-2xl py-8">
			<Link
				to="/"
				className="mb-8 inline-flex items-center gap-2 text-stone-500 hover:text-stone-700"
			>
				<ArrowLeft size={16} />
				<span>Back</span>
			</Link>

			<h1 className="mb-4 font-serif text-3xl text-terracotta">About This Project</h1>

			<div className="prose prose-stone mb-12 max-w-none">
				<p className="text-lg leading-relaxed text-stone-600">
					My wife is Cypriot. We've moved to Cyprus and we're starting a family. I want our son to
					grow up speaking Greek. As close to native as possible.
				</p>
				<p className="leading-relaxed text-stone-600">
					Problem is, I'm learning from square one. Apps, textbooks, courses. Everything trained me
					to recognise Greek, not produce it. I could tap the right answer in a multiple choice
					quiz, but when someone asked me something, my mind went blank.
				</p>
				<p className="leading-relaxed text-stone-600">
					So I built this. Timed drills that force retrieval under pressure. 3.5 seconds to produce
					the Greek. No hints. No multiple choice. Either you know it or you don't.
				</p>
				<p className="leading-relaxed text-stone-600">
					It's how I'm learning. Maybe it'll help you too.
				</p>
			</div>

			<h2 className="mb-6 font-serif text-2xl text-stone-800">Support This Project</h2>

			<div className="mb-12 grid gap-4 sm:grid-cols-2">
				<Card className="p-6">
					<div className="flex items-start gap-4">
						<div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-terracotta/10">
							<Coffee size={20} className="text-terracotta" />
						</div>
						<div>
							<h3 className="mb-1 font-medium text-stone-800">Buy me a coffee</h3>
							<p className="mb-3 text-sm text-stone-600">
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
						<div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-terracotta/10">
							<Heart size={20} className="text-terracotta" />
						</div>
						<div>
							<h3 className="mb-1 font-medium text-stone-800">Spread the word</h3>
							<p className="mb-3 text-sm text-stone-600">
								Share with someone learning Greek. Word of mouth helps the most.
							</p>
						</div>
					</div>
				</Card>
			</div>

			<h2 className="mb-6 font-serif text-2xl text-stone-800">What's Next</h2>

			<Card className="mb-12 p-6">
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

			<div className="text-center text-sm text-stone-500">
				<p>
					Built with care in Cyprus. <span className="font-serif text-terracotta">Ευχαριστώ</span>{" "}
					for using this.
				</p>
			</div>
		</div>
	);
}
