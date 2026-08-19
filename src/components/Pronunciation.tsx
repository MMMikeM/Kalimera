import { tv } from "tailwind-variants";

import { greekToPronunciationTokens } from "@/lib/greek-phonetic";

/**
 * The learner-facing pronunciation gloss for a Greek word.
 *
 * This is the ONLY place a gloss is produced. Call sites pass Greek and get the
 * rendering; they never reach for the transliteration helpers themselves, because
 * there are two of them with opposite jobs and the wrong one was being rendered
 * app-wide (learners were shown "pws" for πώς, which nobody says).
 *
 * It also exists because a plain string cannot carry stress. Greek stress
 * placement is not recoverable from the Latin letters, so a string gloss teaches
 * the wrong pronunciation by omission. The stressed run is underlined rather
 * than bolded: weight is already load-bearing in the paradigm tables, which use
 * it to separate deviating forms from the anchor and from derivable ones.
 */
const pronunciationVariants = tv({
	base: "font-sans",
	variants: {
		size: {
			xs: "text-xs",
			sm: "text-sm",
			base: "text-base",
		},
		tone: {
			muted: "text-muted-foreground",
			inherit: "",
		},
	},
	defaultVariants: {
		size: "sm",
		tone: "muted",
	},
});

interface PronunciationProps extends React.HTMLAttributes<HTMLElement> {
	greek: string;
	size?: "xs" | "sm" | "base";
	tone?: "muted" | "inherit";
	/** Slashes signal "this is a pronunciation, not a spelling". */
	slashes?: boolean;
}

export const Pronunciation: React.FC<PronunciationProps> = ({
	greek,
	size,
	tone,
	slashes = true,
	className,
	...props
}) => {
	const tokens = greekToPronunciationTokens(greek);

	return (
		// el-Latn: Greek written in Latin script. Not `el` — this is not Greek text,
		// and screen readers should not attempt Greek pronunciation of it.
		<span lang="el-Latn" className={pronunciationVariants({ size, tone, className })} {...props}>
			{slashes && "/"}
			{tokens.map((token, index) =>
				token.stressed ? (
					// Underline, not bold. Reads as a diacritic rather than a link
					// because it sits inside a muted, slash-delimited run.
					<span
						key={`${index}-${token.text}`}
						className="underline decoration-1 underline-offset-2"
					>
						{token.text}
					</span>
				) : (
					<span key={`${index}-${token.text}`}>{token.text}</span>
				),
			)}
			{slashes && "/"}
		</span>
	);
};
