/**
 * Rejects a class completed by interpolation, which picks a token without going
 * through `src/constants/grammar-palette.ts`.
 *
 * Template literals only, so `"bg-" + role`, `clsx()` and `.join()` pass. Joining
 * whole classes stays legal: `${scheme.bg} ${scheme.text}` is not flagged.
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
