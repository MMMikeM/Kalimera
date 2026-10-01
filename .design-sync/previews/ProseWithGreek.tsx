import { ProseWithGreek } from "kalimera";

export const Paragraph = () => (
	<p className="max-w-md p-4 leading-relaxed text-stone-700">
		<ProseWithGreek text="The short words μου, σου, του and the rest do three jobs: my, to me, and the one who likes. After a noun they say whose it is; before a verb they say who it is for." />
	</p>
);

export const Heading = () => (
	<h1 className="max-w-md p-4 font-serif text-3xl font-semibold text-stone-900">
		<ProseWithGreek text="The little words μου, σου, του" />
	</h1>
);

export const DontConfuse = () => (
	<aside className="m-4 max-w-md rounded-md bg-stone-100 p-4 text-sm text-stone-700">
		<p className="mb-1 font-semibold text-stone-900">Don't confuse</p>
		<p>
			<ProseWithGreek text="τον, την, το, τους, τις and τα are also the article. Before a verb they mean him, her, it or them: τον βλέπω, I see him. Before a noun they mean the: τον φίλο. After a noun, του, της and τους mean his, her and their: ο φίλος του." />
		</p>
	</aside>
);

export const TableOfContents = () => (
	<ol className="max-w-md p-4">
		{[
			"The same forms for my, to me and who likes",
			"Liking with μου αρέσει",
			"τον, την, το for him, her and it",
		].map((title, i) => (
			<li key={title} className="flex min-h-11 items-baseline gap-3 py-2">
				<span className="w-6 shrink-0 text-right text-sm text-terracotta-text">{i + 1}.</span>
				<span className="text-stone-800">
					<ProseWithGreek text={title} />
				</span>
			</li>
		))}
	</ol>
);
