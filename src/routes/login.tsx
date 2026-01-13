import {
	isValidationErrorResponse,
	parseFormData,
	useForm,
	validationError,
} from "@rvf/react-router";
import { KeyRound, Loader2, LogIn } from "lucide-react";
import { useEffect } from "react";
import { Link, redirect } from "react-router";
import { Card } from "@/components/Card";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import {
	findUserByCode,
	findUserByUsername,
	getUserPasswordHash,
	setUserPassword,
} from "@/db.server/queries/auth";
import { createAuthCookie } from "@/lib/auth-cookie";
import { usePasskeyAuth } from "@/lib/hooks/use-passkey-auth";
import { hashPassword, verifyPassword } from "@/lib/password";
import {
	loginSchema,
	loginValidator,
	passwordSetupSchema,
	passwordSetupValidator,
} from "@/lib/validators/auth";
import type { Route } from "./+types/login";

export function meta() {
	return [
		{ title: "Login - Greek Learning" },
		{
			name: "description",
			content: "Sign in to track your Greek learning progress",
		},
	];
}

export const loader = async () => {
	return {};
};

type ActionError = { success: false; error: string };
type ActionNeedsPasswordSetup = {
	success: false;
	needsPasswordSetup: true;
	userId: number;
	userCode: string;
	displayName: string | null;
};

function createAuthRedirect(userId: number, username: string) {
	const cookie = createAuthCookie({ userId, username });
	return redirect("/", {
		headers: { "Set-Cookie": cookie },
	});
}

export const action = async ({ request }: Route.ActionArgs) => {
	const formData = await request.formData();
	const intent = formData.get("intent") as string;

	// Handle password setup for existing users
	if (intent === "setup-password") {
		const result = await parseFormData(formData, passwordSetupSchema);
		if (result.error)
			return validationError(result.error, result.submittedData);

		const { newPassword, userId, username } = result.data;
		const hash = await hashPassword(newPassword);
		await setUserPassword(Number(userId), hash, username);

		return createAuthRedirect(Number(userId), username.toLowerCase());
	}

	// Login flow
	const result = await parseFormData(formData, loginSchema);
	if (result.error) return validationError(result.error, result.submittedData);

	const { username: identifier, password } = result.data;

	// Try to find user by username first, then by code (for legacy users)
	let user = await findUserByUsername(identifier);
	if (!user) {
		user = await findUserByCode(identifier);
	}

	if (!user) {
		return { success: false, error: "User not found" } satisfies ActionError;
	}

	const passwordHash = await getUserPasswordHash(user.id);

	// User exists but has no password - needs to set one up
	if (!passwordHash) {
		return {
			success: false,
			needsPasswordSetup: true,
			userId: user.id,
			userCode: user.code,
			displayName: user.displayName,
		} satisfies ActionNeedsPasswordSetup;
	}

	// Normal login flow
	if (!password) {
		return {
			success: false,
			error: "Please enter your password",
		} satisfies ActionError;
	}

	const isValid = await verifyPassword(passwordHash, password);
	if (!isValid) {
		return { success: false, error: "Invalid password" } satisfies ActionError;
	}

	return createAuthRedirect(user.id, user.username || user.code);
};

export default function LoginRoute({ actionData }: Route.ComponentProps) {
	const loginForm = useForm({
		validator: loginValidator,
		method: "post",
	});

	const passwordSetupForm = useForm({
		validator: passwordSetupValidator,
		method: "post",
		defaultValues: {
			userId: "",
			username: "",
			newPassword: "",
			confirmPassword: "",
		},
	});

	const passkey = usePasskeyAuth({
		getUsername: () => loginForm.value("username") || undefined,
	});

	// Skip validation error responses - RVF handles those automatically
	const businessData =
		actionData && !isValidationErrorResponse(actionData) ? actionData : null;

	const error =
		(businessData && "error" in businessData ? businessData.error : null) ||
		passkey.error;

	const needsPasswordSetup =
		businessData && "needsPasswordSetup" in businessData;

	// Update password setup form defaults when we get needsPasswordSetup response
	useEffect(() => {
		if (needsPasswordSetup && businessData && "userId" in businessData) {
			passwordSetupForm.setValue("userId", String(businessData.userId));
			if ("userCode" in businessData && businessData.userCode) {
				passwordSetupForm.setValue("username", businessData.userCode);
			}
		}
	}, [needsPasswordSetup, businessData, passwordSetupForm]);

	// Password setup form for existing users
	if (needsPasswordSetup && businessData && "userId" in businessData) {
		const isSubmitting = passwordSetupForm.formState.isSubmitting;

		return (
			<div className="min-h-[60vh] flex flex-col items-center justify-center space-y-8 px-4">
				<div className="text-center space-y-2">
					<h1 className="text-3xl font-serif text-terracotta">
						Set Up Your Password
					</h1>
					<p className="text-stone-600">
						Welcome back
						{"displayName" in businessData && businessData.displayName
							? `, ${businessData.displayName}`
							: ""}
						! Please create a password for your account.
					</p>
				</div>

				<Card className="w-full max-w-sm p-6">
					<form {...passwordSetupForm.getFormProps()} className="space-y-6">
						<input type="hidden" name="intent" value="setup-password" />
						<input type="hidden" name="userId" value={businessData.userId} />
						<input
							type="hidden"
							name="username"
							value={"userCode" in businessData ? businessData.userCode : ""}
						/>

						<div className="space-y-4">
							<FormField
								scope={passwordSetupForm.scope("newPassword")}
								label="New Password"
								type="password"
								autoComplete="new-password"
								placeholder="Choose a password"
								disabled={isSubmitting}
							/>
							<FormField
								scope={passwordSetupForm.scope("confirmPassword")}
								label="Confirm Password"
								type="password"
								autoComplete="new-password"
								placeholder="Confirm your password"
								disabled={isSubmitting}
							/>
						</div>

						{error && (
							<p className="text-sm text-red-600 text-center">{error}</p>
						)}

						<Button
							type="submit"
							variant="primary"
							className="w-full"
							disabled={isSubmitting}
						>
							{isSubmitting ? (
								<>
									<Loader2 size={16} className="animate-spin" />
									Setting up...
								</>
							) : (
								<>
									Set Password
									<LogIn size={16} />
								</>
							)}
						</Button>
					</form>
				</Card>
			</div>
		);
	}

	const isSubmitting = loginForm.formState.isSubmitting;

	return (
		<div className="min-h-[60vh] flex flex-col items-center justify-center space-y-8 px-4">
			<div className="text-center space-y-2">
				<h1 className="text-3xl font-serif text-terracotta">Welcome Back</h1>
				<p className="text-stone-600">Sign in to continue learning Greek</p>
			</div>

			<Card className="w-full max-w-sm p-6">
				<form {...loginForm.getFormProps()} className="space-y-6">
					<div className="space-y-4">
						<FormField
							scope={loginForm.scope("username")}
							label="Username"
							autoComplete="username"
							autoCapitalize="none"
							autoCorrect="off"
							placeholder="Enter your username"
							disabled={isSubmitting || passkey.isLoading}
						/>

						<div className="space-y-2">
							<FormField
								scope={loginForm.scope("password")}
								label="Password"
								type="password"
								autoComplete="current-password"
								placeholder="Enter your password"
								disabled={isSubmitting || passkey.isLoading}
							/>
							<div className="mt-3 p-3 bg-ocean-100 border border-ocean-300 rounded-lg">
								<p className="text-sm text-ocean-800 font-medium">
									Existing user? Enter your code without a password to set one
									up.
								</p>
							</div>
						</div>
					</div>

					{error && <p className="text-sm text-red-600 text-center">{error}</p>}

					<div className="space-y-3">
						<Button
							type="submit"
							variant="primary"
							className="w-full"
							disabled={isSubmitting || passkey.isLoading}
						>
							{isSubmitting ? (
								<>
									<Loader2 size={16} className="animate-spin" />
									Signing in...
								</>
							) : (
								<>
									Sign in
									<LogIn size={16} />
								</>
							)}
						</Button>

						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<span className="w-full border-t border-stone-200" />
							</div>
							<div className="relative flex justify-center text-xs uppercase">
								<span className="bg-white px-2 text-stone-500">or</span>
							</div>
						</div>

						<Button
							type="button"
							variant="outline"
							className="w-full"
							onClick={passkey.authenticate}
							disabled={isSubmitting || passkey.isLoading}
						>
							{passkey.isLoading ? (
								<>
									<Loader2 size={16} className="animate-spin" />
									Authenticating...
								</>
							) : (
								<>
									<KeyRound size={16} />
									Sign in with passkey
								</>
							)}
						</Button>
					</div>
				</form>

				<div className="mt-6 text-center text-sm text-stone-600">
					Don't have an account?{" "}
					<Link
						to="/register"
						className="text-terracotta hover:text-terracotta-dark font-medium"
					>
						Create one
					</Link>
				</div>
			</Card>
		</div>
	);
}
