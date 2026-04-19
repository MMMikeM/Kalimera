import { NavigatorCard, NavigatorCell } from "@/components/cards";
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
	<NavigatorCard
		title={`Which "me/you" do I use?`}
		subtitle={
			<>
				English "me" is one word. Greek splits it by <strong>function</strong>:
			</>
		}
		layout="stack"
		footer={
			<>
				{/* Cross-type comparison table */}
				<div className="-mt-1 mb-4">
					<p className="mb-2 text-xs text-stone-500">One English word → multiple Greek forms:</p>
					<div className="overflow-x-auto">
						<table className="w-full border-collapse text-sm">
							<thead>
								<tr className="border-b border-honey-300">
									<th className="px-2 py-1.5 text-left text-xs font-medium text-stone-500">
										English
									</th>
									<th className="px-2 py-1.5 text-left text-xs font-medium text-stone-500">
										Object
									</th>
									<th className="px-2 py-1.5 text-left text-xs font-medium text-stone-500">
										Possessive
									</th>
									<th className="px-2 py-1.5 text-left text-xs font-medium text-stone-500">
										Emphatic
									</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td className="px-2 py-1.5 text-xs text-stone-600">me / my</td>
									<td className="px-2 py-1.5">
										<MonoText size="sm">με</MonoText>
									</td>
									<td className="px-2 py-1.5">
										<MonoText size="sm">μου</MonoText>
									</td>
									<td className="px-2 py-1.5">
										<MonoText size="sm">εμένα</MonoText>
									</td>
								</tr>
								<tr>
									<td className="px-2 py-1.5 text-xs text-stone-600">you / your</td>
									<td className="px-2 py-1.5">
										<MonoText size="sm">σε</MonoText>
									</td>
									<td className="px-2 py-1.5">
										<MonoText size="sm">σου</MonoText>
									</td>
									<td className="px-2 py-1.5">
										<MonoText size="sm">εσένα</MonoText>
									</td>
								</tr>
								<tr>
									<td className="px-2 py-1.5 text-xs text-stone-600">him / his</td>
									<td className="px-2 py-1.5">
										<MonoText size="sm">τον</MonoText>
									</td>
									<td className="px-2 py-1.5">
										<MonoText size="sm">του</MonoText>
									</td>
									<td className="px-2 py-1.5">
										<MonoText size="sm">αυτόν</MonoText>
									</td>
								</tr>
								<tr>
									<td className="px-2 py-1.5 text-xs text-stone-600">her</td>
									<td className="px-2 py-1.5">
										<MonoText size="sm">την</MonoText>
									</td>
									<td className="px-2 py-1.5">
										<MonoText size="sm">της</MonoText>
									</td>
									<td className="px-2 py-1.5">
										<MonoText size="sm">αυτήν</MonoText>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<strong>Quick test:</strong> Can you insert "to" before it? → Use{" "}
				<MonoText size="sm">μου/σου</MonoText>. Is there a preposition before it? → Use{" "}
				<MonoText size="sm">εμένα/εσένα</MonoText>. Otherwise → Use{" "}
				<MonoText size="sm">με/σε</MonoText>.
			</>
		}
	>
		{PRONOUN_OPTIONS.map((option) => (
			<NavigatorCell key={option.label}>
				<div className="flex items-start gap-3">
					<div className="w-20 shrink-0 text-sm font-bold text-honey-text">{option.label}</div>
					<div className="flex-1">
						<div className="mb-1 text-sm font-medium text-stone-800">
							{renderDescription(option.description)}
						</div>
						<div className="space-y-0.5 text-sm text-stone-600">
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
			</NavigatorCell>
		))}
	</NavigatorCard>
);
