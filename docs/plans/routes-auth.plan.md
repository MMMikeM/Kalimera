# Plan: `src/routes/(auth)` Alignment & Polish

Audit feedback and implementation plan for authentication routes (`login.tsx`, `register.tsx`).

---

## 1. LLM Context Files

### Issues
- `docs/user-flows.llm` (lines 57, 75) points to obsolete flat routes `src/routes/login.tsx` and `src/routes/register.tsx`.

### Actions
- [ ] Update `docs/user-flows.llm` to reference `src/routes/(auth)/login.tsx` and `src/routes/(auth)/register.tsx`. (shared file — exact edit in report)
- [ ] Ensure user journeys reflect Passkey WebAuthn + password fallback correctly. (shared file — exact edit in report)

---

## 2. Design Guidelines & Contrast

### Issues
- **Contrast Failures on Headings and Links:**
  - `src/routes/(auth)/login.tsx:93, 149`: `<h1 className="font-serif text-3xl text-terracotta">` fails AAA contrast against cream canvas.
  - `src/routes/(auth)/register.tsx:70, 132`: `<h1 className="font-serif text-3xl text-terracotta">` fails AAA contrast.
  - `src/routes/(auth)/login.tsx:233`: `<Link to="/register" className="... text-terracotta hover:text-terracotta-dark">` uses decorative token on text.
  - `src/routes/(auth)/register.tsx:181`: `<Link to="/login" className="... text-terracotta hover:underline">` uses decorative token on text.
- **Hardcoded Colors vs Semantic Feedback Tokens:**
  - `login.tsx:125, 178`: `text-red-600` used for inline errors.
  - `register.tsx:67-68`: `bg-green-100 text-green-600` badge.
  - `register.tsx:85, 166`: `border-red-200 bg-red-50 text-red-700` error banner.
  - `register.tsx:93`: `border-green-200 bg-green-50 text-green-700` success banner.
- **Mobile Edge Bleed:**
  - `register.tsx:65, 130`: Root `<div>` lacks `px-4`, causing the registration card to touch screen edges on mobile devices.
- **Brand Alignment:**
  - `register.tsx:71, 133`: Placeholder strings (`"Welcome to Greek Learning!"`) should reflect the scholarly, warm brand voice.

### Actions
- [x] Change `<h1>` heading colors to `text-navy-text` or `text-foreground`.
- [x] Change `<Link>` switch text colors to `text-terracotta-text`.
- [x] Replace custom error and success banners with `@/components/ui/alert` (`variant="error"` and `variant="success"`) using semantic tokens `text-incorrect` / `bg-incorrect-light` and `text-correct` / `bg-correct-light`.
- [x] Add `px-4` to root wrapper in `register.tsx`.

---

## 3. Tailwind & Component Architecture

### Issues
- **Function Declarations:**
  - `login.tsx:15` (`function LoginRoute()`) and `register.tsx:16` (`function RegisterRoute()`) violate the `const` arrow function rule in `CLAUDE.md`.
- **Form Controls & Mobile A11y:**
  - `login.tsx:27`: Direct DOM querying `document.querySelector<HTMLInputElement>('input[name="username"]')` instead of React ref/state.
  - `register.tsx:138-143`: Username input missing `autoCapitalize="none"` and `autoCorrect="off"`.
  - `register.tsx:138-163`: Inputs missing `disabled={isSubmitting}` during submission.

### Actions
- [x] Convert `LoginRoute` and `RegisterRoute` to `const` arrow functions. (moved above `export const Route` to avoid TDZ)
- [x] Bind username input via ref instead of `document.querySelector`. (form ref + `elements.namedItem`; `FormField` forwards no ref)
- [x] Add `autoCapitalize="none"` and `autoCorrect="off"` to registration inputs. (username only — display name must keep capitalisation)
- [x] Pass `disabled={isSubmitting}` to all registration form fields.
