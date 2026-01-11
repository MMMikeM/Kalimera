import { withZod } from "@rvf/zod";
import { z } from "zod";

// Login form - just needs identifier, password optional for legacy code flow
export const loginSchema = z.object({
	username: z.string().min(1, "Please enter username"),
	password: z.string().optional(),
});

export const loginValidator = withZod(loginSchema);

// Password setup for existing users migrating to password auth
export const passwordSetupSchema = z
	.object({
		newPassword: z.string().min(4, "Password must be at least 4 characters"),
		confirmPassword: z.string(),
		userId: z.string(),
		username: z.string(),
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export const passwordSetupValidator = withZod(passwordSetupSchema);

// Registration form
export const registerSchema = z
	.object({
		username: z
			.string()
			.min(3, "Username must be at least 3 characters")
			.regex(
				/^[a-zA-Z0-9_-]+$/,
				"Username can only contain letters, numbers, underscores, and hyphens",
			),
		displayName: z.string().min(1, "Display name is required"),
		password: z.string().min(6, "Password must be at least 6 characters"),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export const registerValidator = withZod(registerSchema);
