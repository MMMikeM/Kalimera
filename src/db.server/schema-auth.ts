import { index, integer, sqliteTable, uniqueIndex } from "drizzle-orm/sqlite-core";

import {
	bool,
	cascadeFk,
	createdAt,
	json,
	nullableBool,
	nullableFk,
	nullableOneOf,
	nullableString,
	nullableTimestamp,
	oneOf,
	pk,
	string,
	timestamp,
} from "./columns";
import type { AuthenticatorTransport } from "./enums";
import { challengeTypes } from "./enums";

export const users = sqliteTable(
	"users",
	{
		id: pk(),
		code: string("code"),
		username: nullableString("username"), // For login (nullable during migration, will become NOT NULL)
		displayName: string("display_name"),
		passwordHash: nullableString("password_hash"), // SHA-256 hash for password fallback
		createdAt: createdAt(),
		// Streak freeze feature
		freezeCount: integer("freeze_count").notNull().default(0),
		lastFreezeUsedAt: nullableTimestamp("last_freeze_used_at"),
		freezeUsedForDate: nullableString("freeze_used_for_date"), // ISO date string like "2026-01-05"
		consecutiveDaysAtEarn: integer("consecutive_days_at_earn").notNull().default(0),
	},
	(table) => [
		uniqueIndex("idx_users_code").on(table.code),
		uniqueIndex("idx_users_username").on(table.username),
	],
);

export const pushSubscriptions = sqliteTable(
	"push_subscriptions",
	{
		id: pk(),
		userId: cascadeFk("user_id", () => users.id),
		endpoint: string("endpoint"),
		p256dh: string("p256dh"), // Client's ECDH public key
		auth: string("auth"), // Client's auth secret
		snoozedUntil: nullableTimestamp("snoozed_until"),
		notificationMode: oneOf("notification_mode", ["adaptive", "always"] as const).default(
			"adaptive",
		),
		taperOfferPending: bool("taper_offer_pending").default(false),
		createdAt: createdAt(),
	},
	(table) => [
		index("idx_push_subscriptions_user").on(table.userId),
		uniqueIndex("idx_push_subscriptions_endpoint").on(table.endpoint),
	],
);

export const notificationLogs = sqliteTable(
	"notification_logs",
	{
		id: pk(),
		userId: cascadeFk("user_id", () => users.id),
		sentAt: nullableTimestamp("sent_at"),
		type: oneOf("type", ["streak_warning", "practice_reminder", "review_due"] as const),
		tappedAction: nullableOneOf("tapped_action", ["2min", "body", "snooze"] as const),
		tappedAt: nullableTimestamp("tapped_at"),
	},
	(table) => [
		index("idx_notification_logs_user").on(table.userId),
		index("idx_notification_logs_sent_at").on(table.sentAt),
	],
);

export const passkeys = sqliteTable(
	"passkeys",
	{
		id: pk(),
		userId: cascadeFk("user_id", () => users.id),
		credentialId: string("credential_id"), // Base64URL from WebAuthn
		publicKey: string("public_key"), // Base64URL-encoded COSE key
		counter: integer("counter").notNull().default(0),
		transports: json<AuthenticatorTransport[]>("transports"),
		deviceType: nullableString("device_type"), // "singleDevice" | "multiDevice"
		backedUp: nullableBool("backed_up"), // Credential backup status
		name: nullableString("name"), // User-friendly name like "MacBook Pro"
		lastUsedAt: nullableTimestamp("last_used_at"),
		createdAt: createdAt(),
	},
	(table) => [
		uniqueIndex("idx_passkeys_credential_id").on(table.credentialId),
		index("idx_passkeys_user").on(table.userId),
	],
);

export const authChallenges = sqliteTable(
	"auth_challenges",
	{
		id: pk(),
		challenge: string("challenge"), // Random Base64URL string
		type: oneOf("type", challengeTypes), // "registration" | "authentication"
		userId: nullableFk("user_id", () => users.id),
		expiresAt: timestamp("expires_at"), // Always set TTL (5 min)
		createdAt: createdAt(),
	},
	(table) => [
		uniqueIndex("idx_auth_challenges_challenge").on(table.challenge),
		index("idx_auth_challenges_expires").on(table.expiresAt),
	],
);
