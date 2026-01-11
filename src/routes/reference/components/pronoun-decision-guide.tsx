import { Card } from "@/components/Card";
import { MonoText } from "@/components/MonoText";

interface PronounOption {
	label: string;
	description: string;
	examples: Array<{ greek: string; english: string }>;
}

const PRONOUN_OPTIONS: PronounOption[] = [
	{
		label: "με / σε",
		description: "Someone does something **to** you (direct object)",
		examples: [
			{ greek: "σε βλέπω", english: "I see you" },
			{ greek: "με ακούς;", english: "do you hear me?" },
		],
	},
	{
		label: "μου / σου",
		description: "**My/your** (possession) OR **to me/you** (indirect object)",
		examples: [
			{ greek: "το σπίτι μου", english: "my house" },
			{ greek: "μου λέει", english: "tells (to) me" },
			{ greek: "σου δίνω", english: "I give (to) you" },
		],
	},
	{
		label: "εμένα / εσένα",
		description: "After prepositions (για, με, από, σε) OR for **emphasis**",
		examples: [
			{ greek: "για μένα", english: "for me" },
			{ greek: "με σένα", english: "with you" },
			{ greek: "εμένα μου αρέσει!", english: "I like it! (emphatic)" },
		],
	},
];

const renderDescription = (text: string) => {
	const parts = text.split(/(\*\*[^*]+\*\*)/g);
	return parts.map((part) => {
		if (part.startsWith("**") && part.endsWith("**")) {
			return <strong key={part}>{part.slice(2, -2)}</strong>;
		}
		return part;
	});
};

export const PronounDecisionGuide = () => (
	<Card
		variant="bordered"
		padding="lg"
		className="bg-honey-50 border-honey-300"
	>
		<h3 className="text-lg font-bold text-honey-text mb-3">
			Which "me/you" do I use?
		</h3>
		<p className="text-sm text-stone-600 mb-4">
			English "me" is one word. Greek splits it by <strong>function</strong>:
		</p>

		<div className="space-y-3">
			{PRONOUN_OPTIONS.map((option) => (
				<div
					key={option.label}
					className="p-3 bg-white rounded-lg border border-honey-300"
				>
					<div className="flex items-start gap-3">
						<div className="text-honey-text font-bold text-sm w-20 shrink-0">
							{option.label}
						</div>
						<div className="flex-1">
							<div className="text-sm font-medium text-stone-800 mb-1">
								{renderDescription(option.description)}
							</div>
							<div className="text-sm text-stone-600 space-y-0.5">
								{option.examples.map((ex) => (
									<div key={ex.greek}>
										<MonoText size="sm" variant="highlighted">
											{ex.greek}
										</MonoText>
										<span className="text-stone-600"> = {ex.english}</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			))}
		</div>

		{/* Cross-type comparison table */}
		<div className="mt-4 pt-3 border-t border-honey-300">
			<p className="text-xs text-stone-500 mb-2">
				One English word → multiple Greek forms:
			</p>
			<div className="overflow-x-auto">
				<table className="w-full text-sm border-collapse">
					<thead>
						<tr className="border-b border-honey-300">
							<th className="text-left py-1.5 px-2 text-stone-500 font-medium text-xs">
								English
							</th>
							<th className="text-left py-1.5 px-2 text-stone-500 font-medium text-xs">
								Object
							</th>
							<th className="text-left py-1.5 px-2 text-stone-500 font-medium text-xs">
								Possessive
							</th>
							<th className="text-left py-1.5 px-2 text-stone-500 font-medium text-xs">
								Emphatic
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="py-1.5 px-2 text-stone-600 text-xs">me / my</td>
							<td className="py-1.5 px-2">
								<MonoText size="sm">με</MonoText>
							</td>
							<td className="py-1.5 px-2">
								<MonoText size="sm">μου</MonoText>
							</td>
							<td className="py-1.5 px-2">
								<MonoText size="sm">εμένα</MonoText>
							</td>
						</tr>
						<tr>
							<td className="py-1.5 px-2 text-stone-600 text-xs">you / your</td>
							<td className="py-1.5 px-2">
								<MonoText size="sm">σε</MonoText>
							</td>
							<td className="py-1.5 px-2">
								<MonoText size="sm">σου</MonoText>
							</td>
							<td className="py-1.5 px-2">
								<MonoText size="sm">εσένα</MonoText>
							</td>
						</tr>
						<tr>
							<td className="py-1.5 px-2 text-stone-600 text-xs">him / his</td>
							<td className="py-1.5 px-2">
								<MonoText size="sm">τον</MonoText>
							</td>
							<td className="py-1.5 px-2">
								<MonoText size="sm">του</MonoText>
							</td>
							<td className="py-1.5 px-2">
								<MonoText size="sm">αυτόν</MonoText>
							</td>
						</tr>
						<tr>
							<td className="py-1.5 px-2 text-stone-600 text-xs">her</td>
							<td className="py-1.5 px-2">
								<MonoText size="sm">την</MonoText>
							</td>
							<td className="py-1.5 px-2">
								<MonoText size="sm">της</MonoText>
							</td>
							<td className="py-1.5 px-2">
								<MonoText size="sm">αυτήν</MonoText>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

		<div className="mt-4 pt-3 border-t border-honey-300 text-sm text-honey-text">
			<strong>Quick test:</strong> Can you insert "to" before it? → Use{" "}
			<MonoText size="sm">μου/σου</MonoText>. Is there a preposition before it?
			→ Use <MonoText size="sm">εμένα/εσένα</MonoText>. Otherwise → Use{" "}
			<MonoText size="sm">με/σε</MonoText>.
		</div>
	</Card>
);
