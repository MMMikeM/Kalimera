import { createInterface } from "node:readline/promises";

import { eq } from "drizzle-orm";

import { db } from "../src/server/db";
import { users } from "../src/server/db/schema-auth";

const hashPassword = async (password: string): Promise<string> => {
	const salt = crypto.randomUUID();
	const data = new TextEncoder().encode(salt + password);
	const hashBuffer = await crypto.subtle.digest("SHA-256", data);
	const hashHex = Array.from(new Uint8Array(hashBuffer))
		.map((b) => b.toString(16).padStart(2, "0"))
		.join("");
	return `${salt}:${hashHex}`;
};

const rl = createInterface({ input: process.stdin, output: process.stdout });

const username = await rl.question("Username: ");
const password = await rl.question("New password: ");
rl.close();

const user = await db
	.select({ id: users.id })
	.from(users)
	.where(eq(users.username, username))
	.get();

if (!user) {
	console.error(`No user found with username: ${username}`);
	process.exit(1);
}

const hash = await hashPassword(password);
await db.update(users).set({ passwordHash: hash }).where(eq(users.id, user.id));

console.log(`Password updated for ${username}`);
