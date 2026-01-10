import {
	index,
	prefix,
	route,
	type RouteConfig,
} from "@react-router/dev/routes";

export default [
	// Auth
	route("login", "routes/login.tsx"),
	route("register", "routes/register.tsx"),

	// Try before signup (public)
	route("try", "routes/try.tsx"),

	// Dashboard (replaces landing page)
	index("routes/home.tsx"),

	// Practice - core loop
	route("practice", "routes/practice/layout.tsx", [
		index("routes/practice/index.tsx"),
		route("speed", "routes/practice/speed-drill.tsx"),
		route(":tab", "routes/practice/$tab.tsx"),
	]),

	// Learn - content exploration (conversations, phrases, vocabulary)
	route("learn", "routes/learn/layout.tsx", [
		index("routes/learn/index.tsx"),
		route("conversations", "routes/learn/conversations/layout.tsx", [
			index("routes/learn/conversations/index.tsx"),
			route(":tab", "routes/learn/conversations/$tab.tsx"),
		]),
		route("phrases", "routes/learn/phrases/layout.tsx", [
			index("routes/learn/phrases/index.tsx"),
			route(":tab", "routes/learn/phrases/$tab.tsx"),
		]),
		route("vocabulary", "routes/learn/vocabulary/layout.tsx", [
			index("routes/learn/vocabulary/index.tsx"),
			route(":tab", "routes/learn/vocabulary/$tab.tsx"),
			route("verbs/:verbId", "routes/learn/vocabulary/verbs/$verbId/route.tsx"),
		]),
	]),


	// Reference - grammar lookup
	route("reference", "routes/reference/layout.tsx", [
		index("routes/reference/index.tsx"),
		route(":tab", "routes/reference/$tab.tsx"),
	]),

	// Search (will become modal later, keep route for now)
	route("search", "routes/search.tsx"),

	// Support/About page
	route("support", "routes/support.tsx"),

	// Progress/Analytics
	route("progress", "routes/progress.tsx"),

	// API routes
	...prefix("api", [
		// Push notifications
		route("push/subscribe", "routes/api/push.subscribe.ts"),
		route("push/unsubscribe", "routes/api/push.unsubscribe.ts"),
		route("push/vapid-key", "routes/api/push.vapid-key.ts"),

		// Milestones
		route("milestones", "routes/api/milestones.ts"),

		// WebAuthn
		route("webauthn/register-options", "routes/api/webauthn/register-options.ts"),
		route("webauthn/register-verify", "routes/api/webauthn/register-verify.ts"),
		route("webauthn/auth-options", "routes/api/webauthn/auth-options.ts"),
		route("webauthn/auth-verify", "routes/api/webauthn/auth-verify.ts"),
	]),
] satisfies RouteConfig;
