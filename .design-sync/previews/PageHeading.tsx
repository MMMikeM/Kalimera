import { GreekText, PageHeading } from "kalimera";

export const WithLede = () => (
	<div className="max-w-2xl p-4">
		<PageHeading title="Try a drill">
			<p>
				You'll get eight prompts in English, with ten seconds for each. Type the Greek in
				Greeklish, Latin letters on your normal keyboard: <span className="font-medium">thelo</span>{" "}
				counts as <GreekText>θέλω</GreekText>.
			</p>
			<p>No account, and nothing is saved.</p>
		</PageHeading>
	</div>
);

export const GreekTitle = () => (
	<div className="max-w-2xl p-4">
		<PageHeading
			title={
				<>
					<GreekText size="inherit" tone="muted" className="mr-3">
						Συμφωνία
					</GreekText>
					Words that agree
				</>
			}
		>
			<p>
				Every noun is masculine, feminine or neuter, and the words around it copy that: the
				article, the adjective, even some numbers. Learn each noun with its article and the rest
				follows.
			</p>
		</PageHeading>
	</div>
);

export const TitleOnly = () => (
	<div className="max-w-2xl p-4">
		<PageHeading title="About this project" />
	</div>
);
