import type { PublicKeyCredentialRequestOptionsJSON } from "@simplewebauthn/browser";
import { startAuthentication } from "@simplewebauthn/browser";
import { useCallback, useState } from "react";
import { setStoredAuth } from "../auth-storage";

interface UsePasskeyAuthOptions {
	/** Optional username to pre-filter credentials */
	getUsername?: () => string | undefined;
}

interface UsePasskeyAuthReturn {
	authenticate: () => Promise<void>;
	isLoading: boolean;
	error: string | null;
	clearError: () => void;
}

export function usePasskeyAuth(
	options: UsePasskeyAuthOptions = {},
): UsePasskeyAuthReturn {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const clearError = useCallback(() => setError(null), []);

	const authenticate = useCallback(async () => {
		setError(null);
		setIsLoading(true);

		try {
			const username = options.getUsername?.();

			const optionsResponse = await fetch("/api/webauthn/auth-options", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username: username || undefined }),
			});

			if (!optionsResponse.ok) {
				const errorData = (await optionsResponse.json()) as { error?: string };
				throw new Error(
					errorData.error || "Failed to get authentication options",
				);
			}

			const authOptions: PublicKeyCredentialRequestOptionsJSON =
				await optionsResponse.json();

			const authResponse = await startAuthentication({
				optionsJSON: authOptions,
			});

			const verifyResponse = await fetch("/api/webauthn/auth-verify", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					response: authResponse,
					challenge: authOptions.challenge,
				}),
			});

			if (!verifyResponse.ok) {
				const errorData = (await verifyResponse.json()) as { error?: string };
				throw new Error(errorData.error || "Authentication failed");
			}

			const result = (await verifyResponse.json()) as {
				verified: boolean;
				userId: number;
				username?: string;
			};

			if (result.verified && result.userId) {
				// Keep localStorage in sync for backward compatibility during migration
				setStoredAuth({
					userId: result.userId,
					username: result.username || "user",
				});
				// Cookie is set by the API response, do a full page reload to pick it up
				window.location.href = "/";
			}
		} catch (err) {
			const message =
				err instanceof Error ? err.message : "Passkey authentication failed";

			if (message.includes("not allowed") || message.includes("AbortError")) {
				setError("Authentication was cancelled");
			} else {
				setError(message);
			}
		} finally {
			setIsLoading(false);
		}
	}, [options]);

	return { authenticate, isLoading, error, clearError };
}
