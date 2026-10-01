import { GreekText, Pronunciation } from "kalimera";

export const UnderAWord = () => (
	<div className="flex flex-col gap-1 p-4">
		<GreekText size="4xl">ευχαριστώ</GreekText>
		<Pronunciation greek="ευχαριστώ" />
	</div>
);

export const Stress = () => (
	<ul className="space-y-2 p-4">
		{[
			["καλημέρα", "good morning"],
			["πώς", "how"],
			["μιλάω", "I speak"],
			["θέλω", "I want"],
		].map(([greek, english]) => (
			<li key={greek} className="flex items-baseline gap-3">
				<GreekText size="lg" className="w-28">
					{greek}
				</GreekText>
				<Pronunciation greek={greek} />
				<span className="text-sm text-stone-500">{english}</span>
			</li>
		))}
	</ul>
);

export const Sizes = () => (
	<div className="flex flex-col gap-2 p-4">
		<Pronunciation greek="Τι κάνεις;" size="base" />
		<Pronunciation greek="Τι κάνεις;" size="sm" />
		<Pronunciation greek="Τι κάνεις;" size="xs" />
	</div>
);

export const WithoutSlashes = () => (
	<p className="p-4 text-stone-700">
		Say <Pronunciation greek="Μιλάς ελληνικά;" slashes={false} tone="inherit" size="base" />{" "}
		to ask if someone speaks Greek.
	</p>
);
