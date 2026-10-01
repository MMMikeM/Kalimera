// Kalimera is an app, not a published package, so the converter has no dist/
// to read. This stages one in .ds-sync/pkg: an entry re-exporting the synced
// components, their emitted .d.ts tree, and the app's compiled Tailwind CSS.
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const pkg = join(root, ".ds-sync/pkg");
const types = join(pkg, "types");

// Router- and server-bound components (BackLink, SectionIndex, StatusPage,
// NextStepCard, ButtonLink) need app context a design canvas can't provide.
const SYNCED = [
	"GreekText",
	"Pronunciation",
	"GreekGloss",
	"ProseWithGreek",
	"GrammarMark",
	"MarkedGreek",
	"GrammarTable",
	"ParadigmTable",
	"PageHeading",
	"SectionHeading",
	"Verdict",
	"Card",
	"cards/TeachingCard",
	"cards/LookupCard",
	"cards/Callout",
	"cards/NavigatorCard",
	"ui/alert",
	"ui/badge",
	"ui/input",
	"ui/label",
	"ui/form-field",
	"ui/tabs",
	"ui/popover",
	"ui/dropdown-menu",
];

rmSync(pkg, { recursive: true, force: true });
mkdirSync(pkg, { recursive: true });

const entryLines = SYNCED.map((p) => `export * from "../../src/components/${p}";`);
entryLines.push(`export { Button, buttonVariants } from "../../src/components/ui/button";`);
writeFileSync(join(pkg, "index.ts"), `${entryLines.join("\n")}\n`);
writeFileSync(
	join(pkg, "package.json"),
	JSON.stringify({ name: "kalimera", version: "0.0.0", module: "index.ts", types: "types/.ds-sync/pkg/index.d.ts" }, null, "\t"),
);

writeFileSync(
	join(pkg, "tsconfig.json"),
	JSON.stringify(
		{
			extends: "../../tsconfig.json",
			compilerOptions: {
				noEmit: false,
				declaration: true,
				emitDeclarationOnly: true,
				rootDir: "../..",
				outDir: "./types",
				tsBuildInfoFile: null,
				types: [],
			},
			include: ["./index.ts"],
		},
		null,
		"\t",
	),
);
execFileSync(join(root, "node_modules/.bin/tsgo"), ["-p", join(pkg, "tsconfig.json")], { stdio: "inherit" });

// ts-morph resolves without tsconfig paths, so point the emitted `@/` imports
// at their relative locations or every aliased type collapses to `any`.
const srcTypes = join(types, "src");
const rewrite = (dir) => {
	for (const name of readdirSync(dir)) {
		const file = join(dir, name);
		if (statSync(file).isDirectory()) rewrite(file);
		else if (file.endsWith(".d.ts")) {
			const text = readFileSync(file, "utf8").replace(/(["'])@\/([^"']+)\1/g, (_, q, target) => {
				let rel = relative(dirname(file), join(srcTypes, target));
				if (!rel.startsWith(".")) rel = `./${rel}`;
				return `${q}${rel}${q}`;
			});
			writeFileSync(file, text);
		}
	}
};
rewrite(types);

execFileSync(
	join(root, ".ds-sync/node_modules/.bin/tailwindcss"),
	["--input", join(root, ".design-sync/styles.css"), "--output", join(pkg, "styles.css")],
	{ stdio: "inherit", cwd: root },
);
