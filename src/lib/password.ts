/**
 * Simple password hashing using SHA-256 + UUID salt.
 * Works on Cloudflare Workers (Web Crypto API).
 */

const _hashValue = async (salt: string, password: string): Promise<string> => {
	const data = new TextEncoder().encode(salt + password);
	const hashBuffer = await crypto.subtle.digest("SHA-256", data);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
};

export const hashPassword = async (password: string): Promise<string> => {
	const salt = crypto.randomUUID();
	const hashHex = await _hashValue(salt, password);
	return `${salt}:${hashHex}`;
};

export const verifyPassword = async (stored: string, password: string): Promise<boolean> => {
	const [salt, storedHash] = stored.split(":");
	if (!salt || !storedHash) return false;
	return (await _hashValue(salt, password)) === storedHash;
};
