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
		...prefix("articles", [
			route("context", "routes/practice/drills/articles/context.tsx"),
			route("paradigm", "routes/practice/drills/articles/paradigm.tsx"),
			route("contractions", "routes/practice/drills/articles/contractions.tsx"),
			route("noun-cases", "routes/practice/drills/articles/noun-cases.tsx"),
			route("noun-genders", "routes/practice/drills/articles/noun-genders.tsx"),
		]),
		...prefix("pronouns", [
			route("object", "routes/practice/drills/pronouns/object.tsx"),
			route("possessives", "routes/practice/drills/pronouns/possessives.tsx"),
		]),
		...prefix("verbs", [
			route("present", "routes/practice/drills/verbs/present.tsx"),
			route("aorist-stems", "routes/practice/drills/verbs/aorist-stems.tsx"),
			route("imperatives", "routes/practice/drills/verbs/imperatives.tsx"),
		]),
		...prefix("blocks", [
			route("chunks", "routes/practice/drills/blocks/chunks.tsx"),
			route("numbers", "routes/practice/drills/blocks/numbers.tsx"),
			route("days-of-week", "routes/practice/drills/blocks/days-of-week.tsx"),
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
