import { createContext } from "react-router";

export type CloudflareEnv = {
	TURSO_DATABASE_URL: string;
	TURSO_AUTH_TOKEN?: string;
	VAPID_PUBLIC_KEY?: string;
	VAPID_PRIVATE_KEY?: string;
	VAPID_SUBJECT?: string;
};

export type CloudflareContext = {
	env: CloudflareEnv;
	ctx: ExecutionContext;
};

export const cloudflareContext = createContext<CloudflareContext>();
