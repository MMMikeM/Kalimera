/**
 * Enforces the two Greek rendering conventions at the import boundary.
 *
 * `greek-transliteration.ts` produces the key used to grade answers;
 * `greek-phonetic.ts` produces the gloss shown to learners. They are not
 * interchangeable, and for a long time every rendered gloss used the wrong one,
 * so learners were shown "pws" for πώς. Components own that choice now.
 *
 * `matchPhonetic` is deliberately not restricted: it grades answers and never
 * produces anything a learner sees.
 *
 * The allowlist lives in `oxlint.config.ts` as an `overrides` block that turns
 * this rule off for the component and lib files — the same shape the config
 * already uses for `no-restricted-imports`. Keeping it there rather than
 * matching filenames in here avoids depending on `context.filename`, which is
 * not something to rely on while the JS plugin API is alpha.
 *
 * `scripts/lint-greek.ts` covers the same ground plus the JSX cases, and is the
 * gate that runs in CI. This rule is the fast in-editor signal.
 */

const RESTRICTED = new Set(["greekToPhonetic", "greekToPronunciation"]);

interface ImportSpecifier {
	imported?: { name?: string };
	local?: { name?: string };
}

interface ImportNode {
	source: { value: string };
	specifiers?: ImportSpecifier[];
}

interface RuleContext {
	report: (descriptor: { message: string; node: unknown }) => void;
}

const noPhoneticRender = {
	create(context: RuleContext) {
		return {
			ImportDeclaration(node: ImportNode) {
				if (!node.source.value.includes("greek-transliteration")) {
					if (!node.source.value.includes("greek-phonetic")) return;
				}

				for (const specifier of node.specifiers ?? []) {
					const name = specifier.imported?.name;
					if (!name || !RESTRICTED.has(name)) continue;

					context.report({
						message: `Do not import ${name}. Render Greek with <GreekText>, and its gloss with <Pronunciation> — those own the choice between the matching and display conventions.`,
						node,
					});
				}
			},
		};
	},
};

export default {
	meta: { name: "greek" },
	rules: { "no-phonetic-render": noPhoneticRender },
};
