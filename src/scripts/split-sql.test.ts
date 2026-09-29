import { describe, expect, it } from "vite-plus/test";

import { splitSql } from "./split-sql";

describe("splitSql", () => {
	it("splits statements at semicolons and trims them", () => {
		expect(splitSql("SELECT 1;\n  SELECT 2 ;\n")).toEqual(["SELECT 1", "SELECT 2"]);
	});

	it("keeps a final statement with no semicolon", () => {
		expect(splitSql("SELECT 1; SELECT 2")).toEqual(["SELECT 1", "SELECT 2"]);
	});

	it("ignores semicolons inside strings, including escaped quotes", () => {
		expect(splitSql("SELECT 'a;b'; SELECT 'it''s; fine';")).toEqual([
			"SELECT 'a;b'",
			"SELECT 'it''s; fine'",
		]);
	});

	it("ignores semicolons inside quoted identifiers", () => {
		expect(splitSql('SELECT "odd;name" FROM t;')).toEqual(['SELECT "odd;name" FROM t']);
	});

	it("drops line and block comments, and statements left empty by them", () => {
		expect(splitSql("-- note; here\nSELECT 1; /* gone; */ ;\nSELECT 2; -- trailing")).toEqual([
			"SELECT 1",
			"SELECT 2",
		]);
	});

	it("keeps Greek text intact", () => {
		expect(splitSql("SELECT id FROM vocabulary WHERE greek_text = 'πλήρης απασχόλησης';")).toEqual([
			"SELECT id FROM vocabulary WHERE greek_text = 'πλήρης απασχόλησης'",
		]);
	});
});
