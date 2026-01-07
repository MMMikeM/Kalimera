import { useState, useEffect } from "react";
import { Link } from "react-router";
import {
	useForm,
	parseFormData,
	validationError,
	isValidationErrorResponse,
} from "@rvf/react-router";
import {
	UserPlus,
	KeyRound,
	ArrowRight,
	Check,
	AlertCircle,
} from "lucide-react";
import type { Route } from "./+types/register";
import {
	createUserWithPassword,
	findUserByUsername,
} from "@/db.server/queries/auth";
import { hashPassword } from "@/lib/password";
import { registerSchema, registerValidator } from "@/lib/validators/auth";
import { usePasskeyRegistration } from "@/lib/hooks/use-passkey-registration";
import { loginAndRedirect } from "@/lib/auth-storage";
import { Card } from "@/components/Card";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";

export function meta() {
	return [
		{ title: "Register - Greek Learning" },
		{
			name: "description",
			content: "Create an account to track your Greek learning progress",
		},
	];
}

export const loader = async () => {
	return {};
};

type ActionSuccess = { success: true; userId: number; username: string };
type ActionError = { success: false; error: string };

export const action = async ({ request }: Route.ActionArgs) => {
	const formData = await request.formData();

	const result = await parseFormData(formData, registerSchema);
	if (result.error) return validationError(result.error, result.submittedData);

	const { username, displayName, password } = result.data;

	const existingUser = await findUserByUsername(username);
	if (existingUser) {
		// Use validationError for field-specific errors
		return validationError({
			fieldErrors: { username: "Username already taken" },
		});
	}

	try {
		const passwordHash = await hashPassword(password);
		const newUser = await createUserWithPassword(
			username,
			displayName,
			passwordHash,
		);

		if (!newUser) {
			return {
				success: false,
				error: "Failed to create account",
			} satisfies ActionError;
		}

		return {
			success: true,
			userId: newUser.id,
			username: newUser.username ?? username,
		} satisfies ActionSuccess;
	} catch (error) {
		console.error("Registration error:", error);
		const message =
			error instanceof Error ? error.message : "Failed to create account";
		return { success: false, error: message } satisfies ActionError;
	}
};

export default function RegisterRoute({ actionData }: Route.ComponentProps) {
	// Post-registration state (user created, now offering passkey setup)
	const [registeredUser, setRegisteredUser] = useState<{
		userId: number;
		username: string;
	} | null>(null);

	const form = useForm({
		validator: registerValidator,
		method: "post",
	});

	const passkey = usePasskeyRegistration({
		userId: registeredUser?.userId ?? 0,
		username: registeredUser?.username ?? "",
	});

	const isSubmitting = form.formState.isSubmitting;

	// Skip validation error responses - RVF handles those automatically
	const businessData =
		actionData && !isValidationErrorResponse(actionData) ? actionData : null;

	useEffect(() => {
		if (
			businessData?.success &&
			"userId" in businessData &&
			"username" in businessData
		) {
			setRegisteredUser({
				userId: businessData.userId,
				username: businessData.username,
			});
		}
	}, [businessData]);

	const handleComplete = () => {
		if (registeredUser) {
			loginAndRedirect(registeredUser);
		}
	};

	// Post-registration: passkey setup screen
	if (registeredUser) {
		return (
			<div className="min-h-[60vh] flex flex-col items-center justify-center space-y-8">
				<div className="text-center space-y-2">
					<div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
						<Check size={32} className="text-green-600" />
					</div>
					<h1 className="text-3xl font-serif text-terracotta">
						Account Created
					</h1>
					<p className="text-stone-600">Welcome to Greek Learning!</p>
				</div>

				<Card className="w-full max-w-md p-6">
					<div className="space-y-6">
						<div className="text-center">
							<KeyRound size={48} className="text-terracotta mx-auto mb-3" />
							<h2 className="text-xl font-medium">Set Up Passkey</h2>
							<p className="text-sm text-stone-500 mt-1">
								Use Face ID, Touch ID, or your device PIN for faster sign-in
								next time.
							</p>
						</div>

						{passkey.state === "error" && (
							<div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
								<AlertCircle size={16} />
								{passkey.error || "Failed to set up passkey"}
							</div>
						)}

						{passkey.state === "success" ? (
							<div className="space-y-4">
								<div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
									<Check size={16} />
									Passkey set up successfully!
								</div>
								<Button
									variant="primary"
									className="w-full"
									onClick={handleComplete}
								>
									Continue to App
									<ArrowRight size={16} />
								</Button>
							</div>
						) : (
							<div className="flex gap-3">
								<Button
									variant="outline"
									className="flex-1"
									onClick={handleComplete}
									disabled={passkey.state === "loading"}
								>
									Skip for Now
								</Button>
								<Button
									variant="primary"
									className="flex-1"
									onClick={passkey.register}
									disabled={passkey.state === "loading"}
								>
									{passkey.state === "loading"
										? "Setting up..."
										: "Set Up Passkey"}
									{passkey.state !== "loading" && <KeyRound size={16} />}
								</Button>
							</div>
						)}
					</div>
				</Card>
			</div>
		);
	}

	return (
		<div className="min-h-[60vh] flex flex-col items-center justify-center space-y-8">
			<div className="text-center space-y-2">
				<h1 className="text-3xl font-serif text-terracotta">Create Account</h1>
				<p className="text-stone-600">Start your Greek learning journey</p>
			</div>

			<Card className="w-full max-w-md p-6">
				<form {...form.getFormProps()} className="space-y-4">
					<FormField
						scope={form.scope("username")}
						label="Username"
						placeholder="Choose a username"
						autoComplete="username"
					/>

					<FormField
						scope={form.scope("displayName")}
						label="Display Name"
						placeholder="How should we call you?"
						autoComplete="name"
					/>

					<FormField
						scope={form.scope("password")}
						label="Password"
						type="password"
						placeholder="At least 6 characters"
						autoComplete="new-password"
					/>

					<FormField
						scope={form.scope("confirmPassword")}
						label="Confirm Password"
						type="password"
						placeholder="Re-enter your password"
						autoComplete="new-password"
					/>

					{businessData && "error" in businessData && (
						<div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
							<AlertCircle size={16} />
							{businessData.error}
						</div>
					)}

					<Button
						type="submit"
						variant="primary"
						className="w-full"
						disabled={isSubmitting}
					>
						{isSubmitting ? "Creating Account..." : "Create Account"}
						{!isSubmitting && <UserPlus size={16} />}
					</Button>
				</form>
			</Card>

			<p className="text-sm text-stone-500">
				Already have an account?{" "}
				<Link
					to="/login"
					className="text-terracotta hover:underline font-medium"
				>
					Sign in
				</Link>
			</p>
		</div>
	);
}
