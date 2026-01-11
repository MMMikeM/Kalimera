/**
 * Generate PWA icons from favicon.svg
 * Run with: npx tsx scripts/generate-icons.ts
 */

import { mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const FAVICON_PATH = join(process.cwd(), "public/favicon.svg");
const OUTPUT_DIR = join(process.cwd(), "public/icons");

const SIZES = [
	{ size: 192, name: "icon-192.png" },
	{ size: 512, name: "icon-512.png" },
	{ size: 180, name: "../apple-touch-icon.png" }, // Apple touch icon in public/
];

// Maskable icon needs padding (safe zone is inner 80%)
const MASKABLE_SIZE = 512;
const MASKABLE_PADDING = Math.floor(MASKABLE_SIZE * 0.1); // 10% padding each side

const generateIcons = async () => {
	const svgBuffer = readFileSync(FAVICON_PATH);

	// Ensure output directory exists
	mkdirSync(OUTPUT_DIR, { recursive: true });

	// Generate standard icons
	for (const { size, name } of SIZES) {
		const outputPath = join(OUTPUT_DIR, name);
		await sharp(svgBuffer).resize(size, size).png().toFile(outputPath);
		console.log(`Generated: ${name} (${size}x${size})`);
	}

	// Generate maskable icon with safe zone padding
	const maskableOutput = join(OUTPUT_DIR, "icon-maskable-512.png");
	const innerSize = MASKABLE_SIZE - MASKABLE_PADDING * 2;

	// Create the icon at inner size, then extend with background
	await sharp(svgBuffer)
		.resize(innerSize, innerSize)
		.extend({
			top: MASKABLE_PADDING,
			bottom: MASKABLE_PADDING,
			left: MASKABLE_PADDING,
			right: MASKABLE_PADDING,
			background: { r: 74, g: 124, b: 143, alpha: 1 }, // #4A7C8F from favicon
		})
		.png()
		.toFile(maskableOutput);
	console.log(
		`Generated: icon-maskable-512.png (${MASKABLE_SIZE}x${MASKABLE_SIZE} with safe zone)`,
	);

	console.log("\nAll icons generated successfully!");
};

generateIcons().catch(console.error);
