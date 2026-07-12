import { readFileSync } from "node:fs";
import { relative } from "node:path";

type CloneFile = { name: string; start: number; end: number };
type Report = {
	statistics: {
		total: { clones: number; duplicatedLines: number; percentage: number };
	};
	duplicates: Array<{ firstFile: CloneFile; secondFile: CloneFile; lines: number }>;
};

const report: Report = JSON.parse(readFileSync("reports/jscpd/jscpd-report.json", "utf8"));

const { clones, duplicatedLines, percentage } = report.statistics.total;
console.log(`${clones} clones · ${duplicatedLines} duplicated lines · ${percentage}%\n`);

const loc = (f: CloneFile) => `${relative(process.cwd(), f.name)}:${f.start}-${f.end}`;
for (const { firstFile, secondFile, lines } of report.duplicates) {
	console.log(`${loc(firstFile)} <-> ${loc(secondFile)} (${lines} lines)`);
}
