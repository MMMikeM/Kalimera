import { Callout, GreekText } from "kalimera";

const Lightbulb = () => (
	<svg
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true"
	>
		<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
		<path d="M9 18h6" />
		<path d="M10 22h4" />
	</svg>
);

export const WithIcon = () => (
	<div className="max-w-sm">
		<Callout scheme="neutral" icon={<Lightbulb />} title="Word order">
			<p className="text-stone-700">
				Greek adjectives usually come <strong>before</strong> the noun:{" "}
				<GreekText tone="accent" size="sm">
					ο καλός φίλος
				</GreekText>{" "}
				(the good friend), not *ο φίλος καλός.
			</p>
		</Callout>
	</div>
);

export const WithFooter = () => (
	<div className="max-w-sm">
		<Callout
			scheme="neutral"
			title="The -ν on τη(ν) and δε(ν)"
			footer={
				<>
					Keep it before a vowel or a hard sound such as κ, π, τ:{" "}
					<GreekText size="sm">την πόρτα</GreekText>, but{" "}
					<GreekText size="sm">τη μητέρα</GreekText>.
				</>
			}
		>
			<p className="leading-relaxed text-stone-700">
				Native speakers drop the final <GreekText size="sm">-ν</GreekText> on some short words when
				the next sound makes it awkward to say.
			</p>
			<p className="leading-relaxed text-stone-700">
				Keeping it where you're unsure is never wrong.
			</p>
		</Callout>
	</div>
);

export const Deponent = () => (
	<div className="max-w-sm">
		<Callout scheme="verb-deponent" title="Passive endings, active meaning">
			<p className="text-stone-700">
				<GreekText size="sm" weight="semibold">
					έρχομαι
				</GreekText>{" "}
				means <em>I come</em>. The <GreekText size="sm">-μαι</GreekText> ending looks passive, but
				nothing is being done to anyone.
			</p>
		</Callout>
	</div>
);

export const Gender = () => (
	<div className="max-w-sm">
		<Callout scheme="gender-neuter" title="Neuter nouns in -μα">
			<p className="text-stone-700">
				Every form but the dictionary one adds <GreekText size="sm">-τ-</GreekText>:
			</p>
			<GreekText size="lg" className="block">
				το όνομα · τα ονόματα · του ονόματος
			</GreekText>
		</Callout>
	</div>
);
