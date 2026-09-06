/**
 * Keeps colour choices going through the palette.
 *
 * A class assembled as `bg-case-${role}-100` picks a token without consulting
 * `src/constants/grammar-palette.ts`, which is the file CLAUDE.md makes
 * responsible for deciding which token a grammar role gets. That is the failure
 * this rule is for: bypassing the single source, the same drift that had seven
 * files naming role tokens by hand.
 *
 * It has a second effect worth knowing but not worth relying on. Tailwind only
 * emits classes it can see written out, so an interpolated one is also never
 * generated and the element renders unstyled. This rule is not a general guard
 * against that: it reads template literals only, so `"bg-" + role`, `clsx()` and
 * `.join()` all pass. If dynamic class names are ever genuinely needed, the fix
 * for the rendering half is `@source inline(...)` in `src/index.css`, not here.
 *
 * Only interpolation *inside* a class name is flagged. Joining whole classes with
 * a space is how every themed component composes, so `${scheme.bg} ${scheme.text}`
 * stays legal: the check reads the text immediately before each `${` and fires
 * only when it is a partial utility rather than whitespace.
 */

const UTILITY_PREFIX =
	/(?:^|\s)(?:[\w-]+:)*(bg|text|border|ring|fill|stroke|divide|outline|accent|from|via|to|shadow|decoration|caret|placeholder)-[\w./-]*$/;

interface TemplateElement {
	value: { raw: string };
}

interface TemplateLiteralNode {
	quasis: TemplateElement[];
	expressions: unknown[];
}

interface RuleContext {
	report: (descriptor: { message: string; node: unknown }) => void;
}

const noInterpolatedClass = {
	create(context: RuleContext) {
		return {
			TemplateLiteral(node: TemplateLiteralNode) {
				for (let i = 0; i < node.expressions.length; i++) {
					const before = node.quasis[i]?.value.raw ?? "";
					const match = UTILITY_PREFIX.exec(before);
					if (!match) continue;

					context.report({
						message: `Tailwind class "${match[1]}-…" is being completed by interpolation, which picks a token without going through the palette. Read the finished class from SCHEME, caseScheme() or genderScheme() in src/constants/grammar-palette.ts. (It would also never be emitted: Tailwind only generates classes it can see written out.)`,
						node,
					});
					return;
				}
			},
		};
	},
};

export default {
	meta: { name: "tw" },
	rules: { "no-interpolated-class": noInterpolatedClass },
};
