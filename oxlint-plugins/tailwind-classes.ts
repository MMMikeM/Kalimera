/**
 * Rejects a class completed by interpolation. Tailwind only generates classes it
 * can see written out, so `text-${tone}` ships no CSS at all.
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
						message: `Tailwind class "${match[1]}-…" is being completed by interpolation, and Tailwind only generates classes it can see written out, so it would never be emitted. Write the whole class out, for example in a lookup object.`,
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
