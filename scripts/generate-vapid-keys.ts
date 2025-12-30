/**
 * Generate VAPID keys for push notifications
 * Run with: npx tsx scripts/generate-vapid-keys.ts
 *
 * Add the output to your .env file and Cloudflare secrets:
 *   wrangler secret put VAPID_PUBLIC_KEY
 *   wrangler secret put VAPID_PRIVATE_KEY
 *   wrangler secret put VAPID_SUBJECT
 */
import { generateVapidKeys } from "@mmmike/web-push/vapid";

const main = async () => {
	const keys = await generateVapidKeys();

	console.log("\n=== VAPID Keys Generated ===\n");
	console.log("Add these to your .env file:\n");
	console.log(`VAPID_PUBLIC_KEY=${keys.publicKey}`);
	console.log(`VAPID_PRIVATE_KEY=${keys.privateKey}`);
	console.log("VAPID_SUBJECT=mailto:your-email@example.com\n");
	console.log("For Cloudflare Workers, run:");
	console.log(`  wrangler secret put VAPID_PUBLIC_KEY`);
	console.log(`  wrangler secret put VAPID_PRIVATE_KEY`);
	console.log(`  wrangler secret put VAPID_SUBJECT\n`);
};

main().catch(console.error);
