import type {
	AuthenticationResponseJSON,
	AuthenticatorTransportFuture,
	RegistrationResponseJSON,
} from "@simplewebauthn/server";
import {
	generateAuthenticationOptions,
	generateRegistrationOptions,
	verifyAuthenticationResponse,
	verifyRegistrationResponse,
} from "@simplewebauthn/server";
import { isoBase64URL } from "@simplewebauthn/server/helpers";
import {
	createChallenge,
	createPasskey,
	deleteChallenge,
	findChallenge,
	findPasskeyByCredentialId,
	findPasskeysByUserId,
	updatePasskeyCounter,
} from "@/db.server/queries/auth";
import type { AuthenticatorTransport } from "@/db.server/schema";

type WebAuthnConfig = {
	rpName: string;
	rpID: string;
	origin: string;
};

export const createWebAuthn = (config: WebAuthnConfig) => {
	const { rpName, rpID, origin } = config;

	return {
		generateRegistrationOptions: async (userId: number, userName: string) => {
			const existingCredentials = await findPasskeysByUserId(userId);

			const options = await generateRegistrationOptions({
				rpName,
				rpID,
				userName,
				userDisplayName: userName,
				attestationType: "none",
				excludeCredentials: existingCredentials.map((cred) => ({
					id: cred.credentialId,
					transports: cred.transports as AuthenticatorTransportFuture[] | undefined,
				})),
				authenticatorSelection: {
					residentKey: "preferred",
					userVerification: "preferred",
					authenticatorAttachment: "platform",
				},
			});

			await createChallenge(options.challenge, "registration", userId);

			return options;
		},

		verifyRegistration: async (
			userId: number,
			response: RegistrationResponseJSON,
			expectedChallenge: string,
		) => {
			const challengeRecord = await findChallenge(expectedChallenge, "registration");
			if (!challengeRecord) {
				throw new Error("Challenge not found or expired");
			}

			const verification = await verifyRegistrationResponse({
				response,
				expectedChallenge,
				expectedOrigin: origin,
				expectedRPID: rpID,
				requireUserVerification: false,
			});

			if (!verification.verified || !verification.registrationInfo) {
				throw new Error("Registration verification failed");
			}

			const { credential, credentialDeviceType, credentialBackedUp } =
				verification.registrationInfo;

			await createPasskey({
				userId,
				credentialId: credential.id,
				publicKey: isoBase64URL.fromBuffer(credential.publicKey),
				counter: credential.counter,
				transports: (response.response.transports as AuthenticatorTransport[]) ?? null,
				deviceType: credentialDeviceType,
				backedUp: credentialBackedUp,
				name: credentialDeviceType === "singleDevice" ? "Security Key" : "Passkey",
			});

			await deleteChallenge(expectedChallenge);

			return {
				verified: true,
				credentialId: credential.id,
				deviceType: credentialDeviceType,
				backedUp: credentialBackedUp,
			};
		},

		generateAuthenticationOptions: async (userId?: number) => {
			let allowCredentials: { id: string; transports?: AuthenticatorTransportFuture[] }[] = [];

			if (userId) {
				const credentials = await findPasskeysByUserId(userId);
				allowCredentials = credentials.map((cred) => ({
					id: cred.credentialId,
					transports: cred.transports as AuthenticatorTransportFuture[] | undefined,
				}));
			}

			const options = await generateAuthenticationOptions({
				rpID,
				userVerification: "preferred",
				allowCredentials: allowCredentials.length > 0 ? allowCredentials : undefined,
			});

			await createChallenge(options.challenge, "authentication", userId);

			return options;
		},

		verifyAuthentication: async (
			response: AuthenticationResponseJSON,
			expectedChallenge: string,
		) => {
			const challengeRecord = await findChallenge(expectedChallenge, "authentication");
			if (!challengeRecord) {
				throw new Error("Challenge not found or expired");
			}

			const credential = await findPasskeyByCredentialId(response.id);
			if (!credential) {
				throw new Error("Credential not found");
			}

			const verification = await verifyAuthenticationResponse({
				response,
				expectedChallenge,
				expectedOrigin: origin,
				expectedRPID: rpID,
				credential: {
					id: credential.credentialId,
					publicKey: isoBase64URL.toBuffer(credential.publicKey),
					counter: credential.counter,
					transports: credential.transports as AuthenticatorTransportFuture[] | undefined,
				},
				requireUserVerification: false,
			});

			if (!verification.verified) {
				throw new Error("Authentication verification failed");
			}

			await updatePasskeyCounter(
				credential.credentialId,
				verification.authenticationInfo.newCounter,
			);

			await deleteChallenge(expectedChallenge);

			return {
				verified: true,
				userId: credential.userId,
				credentialId: credential.credentialId,
			};
		},
	};
};

export type WebAuthn = ReturnType<typeof createWebAuthn>;
