import type React from "react";

type ParadigmType = "pronouns" | "articles" | "verbs";

interface PronounHighlight {
	type: "object" | "possessive";
	person: string;
	number: "singular" | "plural";
}

interface ArticleHighlight {
	case: "nominative" | "accusative" | "genitive";
	gender: "masculine" | "feminine" | "neuter";
	number: "singular" | "plural";
}

interface VerbHighlight {
	verb: string;
	person: string;
	number: "singular" | "plural";
}

type Highlight = PronounHighlight | ArticleHighlight | VerbHighlight;

interface ParadigmHintProps {
	type: ParadigmType;
	highlight?: Highlight;
}

const OBJECT_PRONOUNS = [
	{ person: "1st", singular: "με", plural: "μας", englishSg: "me", englishPl: "us" },
	{ person: "2nd", singular: "σε", plural: "σας", englishSg: "you", englishPl: "you" },
	{ person: "3rd m", singular: "τον", plural: "τους", englishSg: "him", englishPl: "them" },
	{ person: "3rd f", singular: "την", plural: "τις", englishSg: "her", englishPl: "them" },
	{ person: "3rd n", singular: "το", plural: "τα", englishSg: "it", englishPl: "them" },
];

const POSSESSIVE_PRONOUNS = [
	{ person: "1st", singular: "μου", plural: "μας", englishSg: "my", englishPl: "our" },
	{ person: "2nd", singular: "σου", plural: "σας", englishSg: "your", englishPl: "your" },
	{ person: "3rd m", singular: "του", plural: "τους", englishSg: "his", englishPl: "their" },
	{ person: "3rd f", singular: "της", plural: "τους", englishSg: "her", englishPl: "their" },
	{ person: "3rd n", singular: "του", plural: "τους", englishSg: "its", englishPl: "their" },
];

const ARTICLES = {
	nominative: {
		masculine: { singular: "ο", plural: "οι" },
		feminine: { singular: "η", plural: "οι" },
		neuter: { singular: "το", plural: "τα" },
	},
	accusative: {
		masculine: { singular: "τον", plural: "τους" },
		feminine: { singular: "την", plural: "τις" },
		neuter: { singular: "το", plural: "τα" },
	},
	genitive: {
		masculine: { singular: "του", plural: "των" },
		feminine: { singular: "της", plural: "των" },
		neuter: { singular: "του", plural: "των" },
	},
};

const PronounTable: React.FC<{ highlight?: PronounHighlight }> = ({ highlight }) => {
	const data = highlight?.type === "possessive" ? POSSESSIVE_PRONOUNS : OBJECT_PRONOUNS;
	const title = highlight?.type === "possessive" ? "Possessive Pronouns" : "Object Pronouns";
	const position = highlight?.type === "possessive" ? "(after noun)" : "(before verb)";

	const isHighlighted = (person: string, number: "singular" | "plural") => {
		if (!highlight) return false;
		return highlight.person === person && highlight.number === number;
	};

	return (
		<div className="text-xs">
			<div className="text-stone-500 mb-2 font-medium">
				{title} <span className="font-normal">{position}</span>
			</div>
			<table className="w-full border-collapse">
				<thead>
					<tr className="text-stone-500">
						<th className="p-1 text-left font-medium">Person</th>
						<th className="p-1 text-center font-medium">Singular</th>
						<th className="p-1 text-center font-medium">Plural</th>
					</tr>
				</thead>
				<tbody>
					{data.map((row) => (
						<tr key={row.person}>
							<td className="p-1 text-stone-600">{row.person}</td>
							<td
								className={`p-1 text-center ${
									isHighlighted(row.person, "singular")
										? "bg-terracotta/20 rounded font-bold text-terracotta-text"
										: ""
								}`}
							>
								{row.singular}
							</td>
							<td
								className={`p-1 text-center ${
									isHighlighted(row.person, "plural")
										? "bg-terracotta/20 rounded font-bold text-terracotta-text"
										: ""
								}`}
							>
								{row.plural}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

const ArticleTable: React.FC<{ highlight?: ArticleHighlight }> = ({ highlight }) => {
	const cases = ["nominative", "accusative", "genitive"] as const;
	const genders = ["masculine", "feminine", "neuter"] as const;

	const isHighlighted = (
		caseType: string,
		gender: string,
		number: "singular" | "plural"
	) => {
		if (!highlight) return false;
		return (
			highlight.case === caseType &&
			highlight.gender === gender &&
			highlight.number === number
		);
	};

	return (
		<div className="text-xs">
			<div className="text-stone-500 mb-2 font-medium">Definite Articles</div>
			<table className="w-full border-collapse">
				<thead>
					<tr className="text-stone-500">
						<th className="p-1 text-left font-medium">Case</th>
						<th className="p-1 text-center font-medium" colSpan={2}>
							Masc
						</th>
						<th className="p-1 text-center font-medium" colSpan={2}>
							Fem
						</th>
						<th className="p-1 text-center font-medium" colSpan={2}>
							Neut
						</th>
					</tr>
					<tr className="text-stone-400 text-[10px]">
						<th></th>
						<th className="p-0.5">sg</th>
						<th className="p-0.5">pl</th>
						<th className="p-0.5">sg</th>
						<th className="p-0.5">pl</th>
						<th className="p-0.5">sg</th>
						<th className="p-0.5">pl</th>
					</tr>
				</thead>
				<tbody>
					{cases.map((caseType) => (
						<tr key={caseType}>
							<td className="p-1 text-stone-600 capitalize">{caseType.slice(0, 3)}</td>
							{genders.map((gender) => (
								<>
									<td
										key={`${gender}-sg`}
										className={`p-1 text-center ${
											isHighlighted(caseType, gender, "singular")
												? "bg-terracotta/20 rounded font-bold text-terracotta-text"
												: ""
										}`}
									>
										{ARTICLES[caseType][gender].singular}
									</td>
									<td
										key={`${gender}-pl`}
										className={`p-1 text-center ${
											isHighlighted(caseType, gender, "plural")
												? "bg-terracotta/20 rounded font-bold text-terracotta-text"
												: ""
										}`}
									>
										{ARTICLES[caseType][gender].plural}
									</td>
								</>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

const VerbTable: React.FC<{ highlight?: VerbHighlight }> = ({ highlight: _highlight }) => {
	const VERB_FORMS = [
		{ person: "εγώ", form: "-ω/-ώ", english: "I" },
		{ person: "εσύ", form: "-εις/-άς", english: "you" },
		{ person: "αυτός", form: "-ει/-ά", english: "he/she/it" },
		{ person: "εμείς", form: "-ουμε/-άμε", english: "we" },
		{ person: "εσείς", form: "-ετε/-άτε", english: "you" },
		{ person: "αυτοί", form: "-ουν/-άνε", english: "they" },
	];

	return (
		<div className="text-xs">
			<div className="text-stone-500 mb-2 font-medium">Verb Endings Pattern</div>
			<table className="w-full border-collapse">
				<thead>
					<tr className="text-stone-500">
						<th className="p-1 text-left font-medium">Person</th>
						<th className="p-1 text-center font-medium">Ending</th>
					</tr>
				</thead>
				<tbody>
					{VERB_FORMS.map((row) => (
						<tr key={row.person}>
							<td className="p-1 text-stone-600">
								{row.person} <span className="text-stone-400">({row.english})</span>
							</td>
							<td className="p-1 text-center font-mono">{row.form}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export const ParadigmHint: React.FC<ParadigmHintProps> = ({ type, highlight }) => {
	switch (type) {
		case "pronouns":
			return <PronounTable highlight={highlight as PronounHighlight} />;
		case "articles":
			return <ArticleTable highlight={highlight as ArticleHighlight} />;
		case "verbs":
			return <VerbTable highlight={highlight as VerbHighlight} />;
		default:
			return null;
	}
};
