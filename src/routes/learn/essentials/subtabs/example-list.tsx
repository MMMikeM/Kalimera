import { MonoText } from "@/components/MonoText";

interface Example {
	greek: string;
	english: string;
}

export function ExampleList({ examples }: { examples: Example[] }) {
	return (
		<div className="divide-y divide-stone-200/60">
			{examples.map((example) => (
				<div key={example.greek} className="px-3 py-2.5">
					<MonoText variant="greek">{example.greek}</MonoText>
					<div className="text-xs text-stone-500">{example.english}</div>
				</div>
			))}
		</div>
	);
}
