/**
 * One-shot: generate case + gender role-token values from OKLCH targets.
 * Writes directly into src/index.css. Do not commit this script.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

// --- Hue plan (per conversation) ---
// Genders: M=240 (navy fixed), F=30 (sunset fixed), N=135 (antipode of M-F midpoint).
// Acc tweaked: 187° teal collided with N territory. Warmer ACC to match
// the terracotta-for-action intuition without landing on honey (75°).
const HUES = {
	"gender-masculine": 268, // NOM+45 — cool violet-blue
	"gender-feminine": 2, // ACC−40 — pink-red
	"gender-neuter": 171, // GEN+40 — teal-green
	"case-nominative": 223, // ocean (legacy brand)
	"case-accusative": 60, // terracotta, more orange
	"case-genitive": 127, // olive — matches old -200 hue
};

// Chip-step (-200) target chroma per slot. Rest of scale is scaled from honey's
// chroma curve proportionally. Genders sit quiet, cases carry the signal.
const CHROMA_AT_200: Record<string, number> = {
	"gender-masculine": 0.08,
	"gender-feminine": 0.08,
	"gender-neuter": 0.08,
	"case-nominative": 0.035,
	"case-accusative": 0.035,
	"case-genitive": 0.035,
};

// Honey as centerpoint — every step inherits honey's L and C.
// Grammar scales become "honey transposed to hue X": same softness, different hue.
// Full scale so grammar roles stand alone (no base-palette var() dependencies).
// Scale renumbered: inserted new 200 between old 100 and old 200; dropped old 950.
// Old -200 → new -300, old -300 → new -400, etc.
const HONEY_HEX: Record<string, string> = {
	"100": "#f3ebce", // unchanged
	"200": "#eee0b7", // NEW: interpolated L≈0.91 C≈0.055 H≈93 (between old 100 and old 200)
	"300": "#e8d6a0", // was old 200
	"400": "#dbb969", // was old 300
	"500": "#d4a853", // was old 400
	"600": "#c08932", // was old 500
	"700": "#a56c29", // was old 600
	"800": "#845024", // was old 700
	"900": "#6f4124", // was old 800
	"950": "#5f3824", // was old 900 (old 950 dropped)
	text: "#4a3508",
};

// --- sRGB hex → linear RGB → OKLCH (for honey L/C extraction) ---
function gammaDecode(c: number): number {
	return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function hexToOKLCH(hex: string): { L: number; C: number; H: number } {
	const r = gammaDecode(Number.parseInt(hex.slice(1, 3), 16) / 255);
	const g = gammaDecode(Number.parseInt(hex.slice(3, 5), 16) / 255);
	const b = gammaDecode(Number.parseInt(hex.slice(5, 7), 16) / 255);
	const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
	const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
	const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;
	const l_ = Math.cbrt(l);
	const m_ = Math.cbrt(m);
	const s_ = Math.cbrt(s);
	const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
	const a = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
	const bb = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;
	const C = Math.sqrt(a * a + bb * bb);
	const H = (Math.atan2(bb, a) * 180) / Math.PI;
	return { L, C, H: H < 0 ? H + 360 : H };
}

const STEPS: Record<string, { L: number; C: number }> = Object.fromEntries(
	Object.entries(HONEY_HEX).map(([step, hex]) => {
		const { L, C } = hexToOKLCH(hex);
		return [step, { L, C }];
	}),
);

console.log("Honey centerpoint (L, C per step):");
for (const [step, { L, C }] of Object.entries(STEPS)) {
	console.log(`  ${step.padEnd(4)} L=${L.toFixed(3)} C=${C.toFixed(3)}`);
}
console.log();

// --- OKLCH → linear sRGB → sRGB (clip chroma on gamut miss) ---
function oklchToLinearRGB(L: number, C: number, hDeg: number) {
	const h = (hDeg * Math.PI) / 180;
	const a = C * Math.cos(h);
	const b = C * Math.sin(h);
	const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
	const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
	const s_ = L - 0.0894841775 * a - 1.291485548 * b;
	const l = l_ ** 3;
	const m = m_ ** 3;
	const s = s_ ** 3;
	return {
		r: 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
		g: -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
		b: -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
	};
}

function gammaEncode(c: number): number {
	const abs = Math.abs(c);
	return abs <= 0.0031308 ? 12.92 * c : Math.sign(c) * (1.055 * abs ** (1 / 2.4) - 0.055);
}

function inGamut(rgb: { r: number; g: number; b: number }, eps = 0.0001) {
	return (
		rgb.r >= -eps && rgb.r <= 1 + eps && rgb.g >= -eps && rgb.g <= 1 + eps && rgb.b >= -eps && rgb.b <= 1 + eps
	);
}

function clipChroma(L: number, C: number, h: number) {
	let lo = 0;
	let hi = C;
	let last = { r: 0, g: 0, b: 0 };
	for (let i = 0; i < 24; i++) {
		const mid = (lo + hi) / 2;
		const rgb = oklchToLinearRGB(L, mid, h);
		if (inGamut(rgb)) {
			lo = mid;
			last = rgb;
		} else {
			hi = mid;
		}
	}
	const rgb = oklchToLinearRGB(L, lo, h);
	return { rgb, C: lo, clipped: last };
}

function toHex(rgb: { r: number; g: number; b: number }): string {
	const encode = (x: number) =>
		Math.round(Math.max(0, Math.min(1, gammaEncode(x))) * 255)
			.toString(16)
			.padStart(2, "0");
	return `#${encode(rgb.r)}${encode(rgb.g)}${encode(rgb.b)}`;
}

function relativeLuminance(hex: string): number {
	const r = Number.parseInt(hex.slice(1, 3), 16) / 255;
	const g = Number.parseInt(hex.slice(3, 5), 16) / 255;
	const b = Number.parseInt(hex.slice(5, 7), 16) / 255;
	const lin = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
	return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function contrast(hex: string, bg = "#ffffff"): number {
	const l1 = relativeLuminance(hex);
	const l2 = relativeLuminance(bg);
	const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
	return (hi + 0.05) / (lo + 0.05);
}

// --- Generate tokens ---
type Row = { slot: string; step: string; hex: string; oklch: string; L: number; C: number; h: number };

const fmt = (n: number, d: number) => Number(n.toFixed(d)).toString();

const toOklch = (L: number, C: number, h: number) =>
	`oklch(${fmt(L, 2)} ${fmt(C, 2)} ${fmt(h, 0)})`;

// Equalize visual strength against the page background. Honey is the reference;
// every grammar hue at every step is tuned to hit honey's own contrast ratio
// against honey-50. Same "pop" per step across all 6 grammar hues.
const PAGE_BG_HEX = toHex(oklchToLinearRGB(0.98, 0.01, 94)); // honey-50

// Honey's hex per step (already resolved from HONEY_HEX above, reused here)
function targetContrastForStep(step: string): number {
	const honeyHex = HONEY_HEX[step] ?? "#000";
	return contrast(honeyHex, PAGE_BG_HEX);
}

// Per-slot override. Genders need brighter text to push chroma through sRGB
// gamut (teal/navy clip heavily at dark L). AA-level 6.0 is still comfortable
// for chip/table label text.
const TEXT_CONTRAST_OVERRIDE: Record<string, number> = {
	"gender-masculine": 6.5,
	"gender-feminine": 6.5,
	"gender-neuter": 5.0, // brighter L → more chroma through sRGB gamut for teal
};

function tuneL(C: number, h: number, targetRatio: number, darker: boolean): number {
	let lo = darker ? 0.15 : 0.82;
	let hi = darker ? 0.85 : 0.99;
	for (let i = 0; i < 32; i++) {
		const mid = (lo + hi) / 2;
		const clip = clipChroma(mid, C, h);
		const rgb = oklchToLinearRGB(mid, clip.C, h);
		const ratio = contrast(toHex(rgb), PAGE_BG_HEX);
		// For lighter steps (bg > page): lower L → higher contrast.
		// For darker steps (text): lower L → higher contrast too.
		// Binary search: if ratio too low, move L toward darker.
		if (ratio < targetRatio) hi = mid;
		else lo = mid;
	}
	return (lo + hi) / 2;
}

// Honey's chroma at -200 as baseline. Each slot scales its C proportionally
// across the full scale to hit its CHROMA_AT_200 target at the chip step.
const HONEY_C_200 = STEPS["200"]?.C ?? 0.07;
// Override text-step chroma per slot. Default keeps text dark-neutral;
// boosting lifts the hue identity so M-text vs F-text etc. read distinct
// rather than all appearing near-black. Gamut clipped per hue.
const TEXT_C_TARGET: Record<string, number> = {
	"gender-masculine": 0.12, // violet reads very saturated — pulled back
	"gender-feminine": 0.18,
	"gender-neuter": 0.18, // gamut-clipped but pushed
	"case-nominative": 0.15,
	"case-accusative": 0.15,
	"case-genitive": 0.15,
};

const rows: Row[] = [];
for (const [slot, h] of Object.entries(HUES)) {
	const slotTargetC200 = CHROMA_AT_200[slot] ?? HONEY_C_200;
	const scale = slotTargetC200 / HONEY_C_200;
	for (const [step, { L: baseL, C: honeyC }] of Object.entries(STEPS)) {
		const C = step === "text" ? (TEXT_C_TARGET[slot] ?? honeyC) : honeyC * scale;
		const target =
			step === "text"
				? (TEXT_CONTRAST_OVERRIDE[slot] ?? targetContrastForStep(step))
				: targetContrastForStep(step);
		const darker = baseL < 0.6;
		const L = tuneL(C, h, target, darker);
		const clip = clipChroma(L, C, h);
		const rgb = oklchToLinearRGB(L, clip.C, h);
		rows.push({
			slot,
			step,
			hex: toHex(rgb),
			oklch: toOklch(L, clip.C, h),
			L,
			C: clip.C,
			h,
		});
	}
}

// --- Verify ---
console.log("=== Palette draft ===\n");
for (const slot of Object.keys(HUES)) {
	console.log(slot);
	for (const r of rows.filter((r) => r.slot === slot)) {
		const ctr = r.step === "text" ? `wh:${contrast(r.hex).toFixed(2)}` : "";
		console.log(`  ${r.step.padEnd(4)} ${r.oklch.padEnd(30)} ${r.hex}  ${ctr}`);
	}
}

// --- Contrast of -text against the honey-tinted page background ---
// Page bg sits in the honey family (cream / honey-50). Want within-group
// uniformity: all 3 cases hit the same ratio, all 3 genders hit the same ratio.
// --- Chip / surface step contrast vs page bg (honey-50) ---
// What the user actually cares about: chip -200 and surface -100 should read
// equally strong against the cream page, so all 3 cases feel visually tied
// and all 3 genders feel visually tied.
console.log("\n=== BG-step contrast vs page (honey-50) — chip/surface visibility ===");
console.log("slot".padEnd(22), "-100   -200   -300");
for (const slot of Object.keys(HUES)) {
	const parts = ["100", "200", "300"].map((step) => {
		const slotHex = rows.find((r) => r.slot === slot && r.step === step)?.hex ?? "#fff";
		return contrast(slotHex, PAGE_BG_HEX).toFixed(3).padStart(5);
	});
	console.log(slot.padEnd(22), parts.join("  "));
}
const bgSpreadReport = (slots: string[], label: string) => {
	console.log(`\n${label} bg-step spread (max−min):`);
	for (const step of ["100", "200", "300"]) {
		const ratios = slots.map((slot) => {
			const slotHex = rows.find((r) => r.slot === slot && r.step === step)?.hex ?? "#fff";
			return contrast(slotHex, PAGE_BG_HEX);
		});
		const spread = Math.max(...ratios) - Math.min(...ratios);
		console.log(
			`  -${step.padEnd(3)} spread=${spread.toFixed(3)}  range=[${Math.min(...ratios).toFixed(3)}..${Math.max(...ratios).toFixed(3)}]`,
		);
	}
};
bgSpreadReport(["case-nominative", "case-accusative", "case-genitive"], "CASES");
bgSpreadReport(["gender-masculine", "gender-feminine", "gender-neuter"], "GENDERS");

console.log("\n=== -text contrast vs honey backgrounds ===");
const BG_LEVELS: Record<string, string> = {
	"honey-50": HONEY_HEX["100"] ?? "#fff", // honey-50 rebuilt at runtime if missing
	"honey-100": HONEY_HEX["100"] ?? "#fff",
	"honey-200": HONEY_HEX["200"] ?? "#fff",
};
// Build honey-50 hex from the OKLCH used earlier (L=0.98 C=0.01 H=94.2)
const honey50Rgb = oklchToLinearRGB(0.98, 0.01, 94);
BG_LEVELS["honey-50"] = toHex(honey50Rgb);

console.log("slot".padEnd(22), Object.keys(BG_LEVELS).join("   "));
for (const slot of Object.keys(HUES)) {
	const textHex = rows.find((r) => r.slot === slot && r.step === "text")?.hex ?? "#000";
	const parts = Object.values(BG_LEVELS).map((bg) =>
		contrast(textHex, bg).toFixed(2).padStart(5),
	);
	console.log(slot.padEnd(22), parts.join("      "));
}

const spreadReport = (slots: string[], label: string) => {
	console.log(`\n${label} spread (max−min) per bg:`);
	for (const [name, bg] of Object.entries(BG_LEVELS)) {
		const ratios = slots.map((slot) => {
			const textHex = rows.find((r) => r.slot === slot && r.step === "text")?.hex ?? "#000";
			return contrast(textHex, bg);
		});
		const spread = Math.max(...ratios) - Math.min(...ratios);
		console.log(`  ${name.padEnd(10)} spread=${spread.toFixed(2)}  range=[${Math.min(...ratios).toFixed(2)}..${Math.max(...ratios).toFixed(2)}]`);
	}
};
spreadReport(["case-nominative", "case-accusative", "case-genitive"], "CASES");
spreadReport(["gender-masculine", "gender-feminine", "gender-neuter"], "GENDERS");

// --- Chip / surface contrast ---
// Typical consumer usage: -text sits on -100 (LookupCard surface), -200 (chip), or white.
console.log("\n=== Contrast of -text against surfaces (WCAG 4.5 for body, 3.0 for UI) ===");
console.log("slot".padEnd(22), "white", "bg-100", "bg-200", "bg-300");
for (const slot of Object.keys(HUES)) {
	const hexFor = (step: string) => rows.find((r) => r.slot === slot && r.step === step)?.hex ?? "#fff";
	const text = hexFor("text");
	const c = (bg: string) => contrast(text, bg).toFixed(2);
	console.log(
		slot.padEnd(22),
		c("#ffffff").padStart(5),
		c(hexFor("100")).padStart(5),
		c(hexFor("200")).padStart(5),
		c(hexFor("300")).padStart(5),
	);
}

// Pairwise hue distance check
const angles = Object.entries(HUES);
let minDelta = 360;
let worstPair = "";
for (let i = 0; i < angles.length; i++) {
	for (let j = i + 1; j < angles.length; j++) {
		const angleI = angles[i];
		const angleJ = angles[j];
		if (!angleI || !angleJ) continue;
		const [a, b] = [angleI[1], angleJ[1]];
		const d = Math.min(Math.abs(a - b), 360 - Math.abs(a - b));
		if (d < minDelta) {
			minDelta = d;
			worstPair = `${angleI[0]} vs ${angleJ[0]}`;
		}
	}
}
console.log(`\nMin hue separation: ${minDelta}° (${worstPair})`);

// --- Apply to index.css ---
const cssPath = resolve(process.cwd(), "src/index.css");
let css = readFileSync(cssPath, "utf8");

// 1. Rewrite grammar role tokens (case-*, gender-*) to OKLCH
for (const row of rows) {
	const token = `--color-${row.slot}-${row.step}`;
	const re = new RegExp(`(${token}:\\s*)[^;]+(;)`, "g");
	css = css.replace(re, `$1${row.oklch}$2`);
}

// 2. Rewrite any hex literal in a --color-* token to OKLCH (honey, sunset, etc.)
// Preserves var() references and other non-hex values.
const HEX_TOKEN_RE = /(--color-[a-z0-9-]+:\s*)(#[0-9a-fA-F]{6})(\s*;)/g;
css = css.replace(HEX_TOKEN_RE, (_m, prefix: string, hex: string, suffix: string) => {
	const { L, C, H } = hexToOKLCH(hex);
	return `${prefix}${toOklch(L, C, H)}${suffix}`;
});

// 3. Re-round existing oklch() literals to current precision targets.
const OKLCH_TOKEN_RE = /(--color-[a-z0-9-]+:\s*)oklch\(\s*([0-9.]+)\s+([0-9.]+)\s+([0-9.]+)\s*\)(\s*;)/g;
css = css.replace(
	OKLCH_TOKEN_RE,
	(_m, prefix: string, l: string, c: string, h: string, suffix: string) =>
		`${prefix}${toOklch(Number(l), Number(c), Number(h))}${suffix}`,
);

writeFileSync(cssPath, css);
console.log(`\nApplied to ${cssPath}`);
