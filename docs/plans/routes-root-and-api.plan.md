# Plan: Root Routes, Components & API Alignment & Polish

Audit feedback and implementation plan for `src/routes/` root files (`__root.tsx`, `index.tsx`, `progress.tsx`, `search.tsx`, `support.tsx`, `try.tsx`), `src/routes/components/`, and `src/routes/api/`.

---

## 1. LLM Context Files

### Issues
- **`docs/user-flows.llm`:**
  - Line 35 references `home.tsx` instead of `src/routes/index.tsx`.
  - Line 41 references `DailyPhrase`, which is currently orphaned/unmounted in `index.tsx`.
  - Lines 44–45 reference unimplemented features ("Just 5 items" and "Tomorrow preview").
  - Line 49 states `AllCaughtUpCTA` navigates to `/practice/vocabulary`, but button routes to `/practice`.
  - Line 417 specifies 30-day rolling accuracy trend, but `progress.tsx` implements a 7-day rolling average.
  - Line 434 specifies Buy Me a Coffee, but `support.tsx` links to Ko-fi.

### Actions
- [ ] Update `docs/user-flows.llm` to reflect `index.tsx`, 7-day rolling progress, and Ko-fi support link.
- [ ] Either mount `<DailyPhrase />` in `index.tsx` or prune it from `user-flows.llm`.

---

## 2. Design Guidelines, Layout & Contrast

### Issues
- **PWA Layout Shell & DOM Hierarchy (`__root.tsx`):**
  - Line 52: `<TanStackRouterDevtoolsInProd />` is rendered before `<RootComponent />`, placing DOM elements outside `<html>`.
  - Line 123: `<MobileNav />` is rendered outside the `isAuthRoute` check, displaying the bottom nav bar on `/login` and `/register`.
- **CSS Class Typo:**
  - `components/LapsedUserCTA.tsx:44`: `bg-linear-to-brrom-ocean-50` (malformed gradient class).
- **Text Contrast Violations:**
  - `components/AllCaughtUpCTA.tsx:17`: `text-ocean` on `bg-ocean-100` (fails AAA).
  - `components/PracticeCTA.tsx:34`: `bg-honey-400 text-white` fails contrast (~1.4:1).
  - `components/StatsSummary.tsx:10, 14`: Uses base `text-olive` and `text-ocean` on tinted backgrounds.
  - `index.tsx:86, 93`: Unmapped palette token `bg-amber-50` and raw `text-ocean-700`.
- **Typography & Greek Scaling:**
  - `try.tsx:43, 89`: `<h1>` and `<h2>` use sans-serif instead of `font-serif`.
  - `__root.tsx:118`, `progress.tsx:42`, `support.tsx:108`: Missing `.greek-text` scale helper on Greek terms (`Ελληνικά`, `καλημέρα`, `Ευχαριστώ`).
- **Brand Principles:**
  - `try.tsx:71-88`: Uses gamified emoji heroes (`🎉`, `💪`, `🌱` in `text-5xl`). Replace with an editorial score summary card.

### Actions
- [ ] Move `<TanStackRouterDevtoolsInProd />` inside `RootBody` in `__root.tsx`.
- [ ] Wrap `<MobileNav />` in `{!isAuthRoute && <MobileNav />}` in `__root.tsx`.
- [ ] Fix gradient class typo in `LapsedUserCTA.tsx`.
- [ ] Upgrade all text tokens to AAA variants (`text-ocean-text`, `text-olive-text`, `text-honey-text`).
- [ ] Fix heading font stacks to `font-serif` and apply `.greek-text` to Greek text elements.

---

## 3. Tailwind & API Routes

### Issues
- **API Route Defect in `api/push/vapid-key.ts:4` (High):**
  - Uses `loader` instead of `server.handlers.GET` and lacks `import "@tanstack/react-start";`. Fails as an HTTP endpoint.
- **Inconsistent Push Endpoint Wrapper:**
  - `api/push/unsubscribe.ts:14` bypasses `withPushPost`.
- **Procedural String Concatenation in `components/WeekStreak.tsx:25-38`:**
  - Uses nested `if/else` procedural logic to build day indicator classes.

### Actions
- [ ] Fix `api/push/vapid-key.ts` handler:
```typescript
import "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";
import { getVapidPublicKey } from "@/server/push/web-push";

export const Route = createFileRoute("/api/push/vapid-key")({
  server: {
    handlers: {
      GET: async () => {
        const key = getVapidPublicKey();
        if (!key) {
          return new Response(JSON.stringify({ error: "Push notifications not configured" }), {
            status: 503,
            headers: { "Content-Type": "application/json" },
          });
        }
        return Response.json({ publicKey: key });
      },
    },
  },
});
```
- [ ] Refactor `WeekStreak.tsx` using `tv()` day indicator variants.
