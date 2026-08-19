import { GreekText } from "@/components/GreekText";

interface Example {
	greek: string;
	english: string;
}

export function ExampleList({ examples }: { examples: Example[] }) {
	return (
		<div className="divide-y divide-stone-200/60">
			{examples.map((example) => (
				<div key={example.greek} className="px-3 py-2.5">
					<GreekText tone="accent" size="lg">{example.greek}</GreekText>
					<div className="text-xs text-stone-500">{example.english}</div>
				</div>
			))}
		</div>
	);
}
