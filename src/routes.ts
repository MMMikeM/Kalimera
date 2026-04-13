import { index, prefix, type RouteConfig, route } from "@react-router/dev/routes";

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
		...prefix("vocab", [
			index("routes/practice/vocab/index.tsx"),
			route("pronouns", "routes/practice/vocab/pronouns.tsx"),
			route("articles", "routes/practice/vocab/articles.tsx"),
			route("verbs", "routes/practice/vocab/verbs.tsx"),
			route("nouns", "routes/practice/vocab/nouns.tsx"),
		]),
		...prefix("grammar", [index("routes/practice/grammar/index.tsx")]),
		...prefix("memory", [
			index("routes/practice/memory/index.tsx"),
			route("articles", "routes/practice/memory/articles.tsx"),
			route("pronouns", "routes/practice/memory/pronouns.tsx"),
			route("possessives", "routes/practice/memory/possessives.tsx"),
			route("contractions", "routes/practice/memory/contractions.tsx"),
		]),
		route(":tab", "routes/practice/$tab.tsx"),
	]),

	// Learn - content exploration (conversations, phrases, vocabulary)
	...prefix("learn", [
		index("routes/learn/index.tsx"),
		route("conversations", "routes/learn/conversations/layout.tsx", [
			index("routes/learn/conversations/index.tsx"),
			route(":tab", "routes/learn/conversations/$tab.tsx"),
		]),
		route("phrases", "routes/learn/phrases/layout.tsx", [
			index("routes/learn/phrases/index.tsx"),
			route(":tab", "routes/learn/phrases/$tab.tsx"),
		]),
		route("nouns", "routes/learn/nouns/route.tsx"),
		route("verbs", "routes/learn/verbs/route.tsx"),
		route("verbs/:verbId", "routes/learn/verbs/$verbId/route.tsx"),
		route("essentials", "routes/learn/essentials/layout.tsx", [
			index("routes/learn/essentials/index.tsx"),
			route(":subtab", "routes/learn/essentials/$subtab.tsx"),
		]),
	]),

	// Reference - grammar lookup
	...prefix("reference", [
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
		route("push/snooze", "routes/api/push.snooze.ts"),
		route("push/log-tap", "routes/api/push.log-tap.ts"),

		// Milestones
		route("milestones", "routes/api/milestones.ts"),

		// Error logging
		route("errors", "routes/api/errors.ts"),

		// WebAuthn
		route("webauthn/register-options", "routes/api/webauthn/register-options.ts"),
		route("webauthn/register-verify", "routes/api/webauthn/register-verify.ts"),
		route("webauthn/auth-options", "routes/api/webauthn/auth-options.ts"),
		route("webauthn/auth-verify", "routes/api/webauthn/auth-verify.ts"),
	]),
] satisfies RouteConfig;
