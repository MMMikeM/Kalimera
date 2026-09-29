/**
 * Splits a SQL file into statements at each `;` that sits outside a string,
 * a quoted identifier or a comment. Comments are dropped, and so are statements
 * left empty once they are.
 */
export const splitSql = (source: string): string[] => {
	const statements: string[] = [];
	let current = "";
	let i = 0;
	while (i < source.length) {
		const char = source[i]!;
		const next = source[i + 1];
		if (char === "-" && next === "-") {
			const end = source.indexOf("\n", i);
			i = end === -1 ? source.length : end;
			continue;
		}
		if (char === "/" && next === "*") {
			const end = source.indexOf("*/", i + 2);
			i = end === -1 ? source.length : end + 2;
			continue;
		}
		if (char === "'" || char === '"' || char === "`") {
			let end = i + 1;
			// A doubled quote inside a quoted run is an escaped quote, not its end.
			while (end < source.length && !(source[end] === char && source[end + 1] !== char)) {
				end += source[end] === char ? 2 : 1;
			}
			current += source.slice(i, end + 1);
			i = end + 1;
			continue;
		}
		if (char === ";") {
			if (current.trim()) statements.push(current.trim());
			current = "";
		} else {
			current += char;
		}
		i++;
	}
	if (current.trim()) statements.push(current.trim());
	return statements;
};
