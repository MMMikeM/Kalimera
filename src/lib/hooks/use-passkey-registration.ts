import { useState, useCallback } from "react";
import { startRegistration } from "@simplewebauthn/browser";
import type { PublicKeyCredentialCreationOptionsJSON } from "@simplewebauthn/browser";

type PasskeyState = "idle" | "loading" | "success" | "error";

interface UsePasskeyRegistrationOptions {
	userId: number;
	username: string;
}

interface UsePasskeyRegistrationReturn {
	register: () => Promise<void>;
	state: PasskeyState;
	error: string | null;
}

export function usePasskeyRegistration(
	options: UsePasskeyRegistrationOptions,
): UsePasskeyRegistrationReturn {
	const [state, setState] = useState<PasskeyState>("idle");
	const [error, setError] = useState<string | null>(null);

	const register = useCallback(async () => {
		setState("loading");
		setError(null);

		try {
			const optionsResponse = await fetch("/api/webauthn/register-options", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					userId: options.userId,
					username: options.username,
				}),
			});

			if (!optionsResponse.ok) {
				const errorData = (await optionsResponse.json()) as { error?: string };
				throw new Error(
					errorData.error || "Failed to get registration options",
				);
			}

			const regOptions: PublicKeyCredentialCreationOptionsJSON =
				await optionsResponse.json();

			const attestation = await startRegistration({ optionsJSON: regOptions });

			const verifyResponse = await fetch("/api/webauthn/register-verify", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					userId: options.userId,
					response: attestation,
					challenge: regOptions.challenge,
				}),
			});

			if (!verifyResponse.ok) {
				const errorData = (await verifyResponse.json()) as { error?: string };
				throw new Error(errorData.error || "Failed to verify passkey");
			}

			setState("success");
		} catch (err) {
			console.error("Passkey setup error:", err);
			setState("error");
			setError(
				err instanceof Error ? err.message : "Failed to set up passkey",
			);
		}
	}, [options.userId, options.username]);

	return { register, state, error };
}
