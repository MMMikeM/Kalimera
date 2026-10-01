import { GrammarMark } from "kalimera";

export const Cases = () => (
	<div className="flex flex-wrap items-end gap-6 p-4 text-xl">
		<GrammarMark case="nominative">ο άντρας</GrammarMark>
		<GrammarMark case="accusative">τον άντρα</GrammarMark>
		<GrammarMark case="genitive">του άντρα</GrammarMark>
		<GrammarMark case="vocative">Γιάννη</GrammarMark>
	</div>
);

export const Genders = () => (
	<div className="flex flex-wrap items-end gap-6 p-4 text-xl">
		<GrammarMark case="accusative" gender="masculine">
			τον φίλο
		</GrammarMark>
		<GrammarMark case="accusative" gender="feminine">
			τη μητέρα
		</GrammarMark>
		<GrammarMark case="accusative" gender="neuter">
			το παιδί
		</GrammarMark>
	</div>
);

export const OneAndMore = () => (
	<div className="flex flex-wrap items-end gap-6 p-4 text-xl">
		<GrammarMark case="nominative" gender="feminine">
			η γυναίκα
		</GrammarMark>
		<GrammarMark case="nominative" gender="feminine" plural>
			οι γυναίκες
		</GrammarMark>
	</div>
);

export const InASentence = () => (
	<p className="max-w-md p-4 font-serif text-2xl leading-loose text-stone-900">
		<GrammarMark case="nominative" gender="masculine">
			Ο άντρας
		</GrammarMark>{" "}
		θέλει{" "}
		<GrammarMark case="accusative" gender="feminine">
			πορτοκαλάδα
		</GrammarMark>
		.
	</p>
);
