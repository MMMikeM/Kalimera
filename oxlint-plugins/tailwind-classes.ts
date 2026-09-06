/**
 * Rejects a Tailwind class name assembled by interpolation.
 *
 * Tailwind scans source for complete, literal class names. A class built as
 * `bg-case-${role}-100` produces no candidate, so the utility is never emitted
 * and the element renders unstyled — with no error at build, test or runtime.
 * That failure is invisible, which is what makes it worth a rule: the palette in
 * `src/constants/grammar-palette.ts` spells every role token out precisely so no
 * call site has to build one.
 *
 * Only interpolation *inside* a class name is a problem. Joining whole classes
 * with a space is how every themed component works, so `${scheme.bg} ${scheme.text}`
 * is fine and must stay fine: the check looks at the text immediately before each
 * `${`, and only fires when it is a partial utility rather than whitespace.
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
						message: `Tailwind class "${match[1]}-…" is being completed by interpolation. Tailwind only emits classes it can see written out, so this ships unstyled with no error. Read the finished class from a lookup instead — SCHEME, caseScheme() or genderScheme() in src/constants/grammar-palette.ts for grammar roles.`,
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
