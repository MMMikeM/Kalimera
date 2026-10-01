import { MarkedGreek } from "kalimera";

export const InANote = () => (
	<p className="max-w-lg p-4 leading-relaxed text-stone-700">
		<strong className="font-semibold text-stone-900">“My” goes after the noun</strong>, and the
		article stays: <MarkedGreek greek="το σπίτι μου" marked="μου" tone="accent" />,{" "}
		<MarkedGreek greek="η μητέρα σου" marked="σου" tone="accent" />.
	</p>
);

export const SeveralWords = () => (
	<p className="max-w-md p-4 leading-relaxed text-stone-700">
		<MarkedGreek greek="εγώ θέλω τσάι, εσύ;" marked={["εγώ", "εσύ"]} tone="accent" /> (I want
		tea; and you?)
	</p>
);

export const LargeExamples = () => (
	<ul className="max-w-sm space-y-2 p-4">
		{[
			{ greek: "Σου μιλάω.", marked: "Σου", english: "I'm talking to you." },
			{ greek: "σας ευχαριστώ", marked: "σας", english: "thank you" },
			{ greek: "Τον ξυπνάω και τον ταΐζω.", marked: ["Τον", "τον"], english: "I wake him and feed him." },
		].map((example) => (
			<li key={example.greek}>
				<MarkedGreek
					greek={example.greek}
					marked={example.marked}
					tone="accent"
					size="xl"
					className="block leading-snug"
				/>
				<p className="text-xs text-stone-600 italic">{example.english}</p>
			</li>
		))}
	</ul>
);

export const GenderedPhrase = () => (
	<div className="flex flex-col gap-2 p-4">
		<MarkedGreek greek="Θέλω τον καφέ μου." marked="τον καφέ" tone="masculine" size="lg" />
		<MarkedGreek greek="Πού είναι η τουαλέτα;" marked="η τουαλέτα" tone="feminine" size="lg" />
		<MarkedGreek greek="Φέρε το νερό, παρακαλώ." marked="το νερό" tone="neuter" size="lg" />
	</div>
);
