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

export const createWebAuthnFromRequest = (request: Request) => {
	const { hostname, origin } = new URL(request.url);
	return createWebAuthn({
		rpName: "Greek Learning",
		rpID: hostname,
		origin: origin,
	});
};

const createWebAuthn = ({ rpName, rpID, origin }: WebAuthnConfig) => {
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

			const {
				credential: { publicKey, counter },
			} = verification.registrationInfo;

			const deviceType = verification.registrationInfo.credentialDeviceType;
			const backedUp = verification.registrationInfo.credentialBackedUp;
			const credentialId = verification.registrationInfo.credential.id;

			await createPasskey({
				userId,
				credentialId,
				deviceType,
				backedUp,
				publicKey: isoBase64URL.fromBuffer(publicKey),
				counter: counter,
				transports: (response.response.transports as AuthenticatorTransport[]) ?? null,
				name: deviceType === "singleDevice" ? "Security Key" : "Passkey",
			});

			await deleteChallenge(expectedChallenge);

			return {
				verified: true,
				credentialId,
				deviceType,
				backedUp,
			};
		},

		generateAuthenticationOptions: async (userId?: number) => {
			let allowCredentials: {
				id: string;
				transports?: AuthenticatorTransportFuture[];
			}[] = [];

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
