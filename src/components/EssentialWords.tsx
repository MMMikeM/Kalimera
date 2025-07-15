import React from "react";
import { VERB_CATEGORIES } from "../constants/verbs";
import {
	TIMES_OF_DAY,
	FREQUENCY_ADVERBS,
	LIKES_CONSTRUCTION,
	SUMMER_VOCABULARY,
	TIME_EXPRESSIONS,
	NUMBERS,
	COLORS,
	USEFUL_EXPRESSIONS,
	TRANSPORTATION,
} from "../constants/vocabulary";
import { InfoBox } from "./ui";

const EssentialWords: React.FC = () => {
	return (
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
};

export default EssentialWords;
