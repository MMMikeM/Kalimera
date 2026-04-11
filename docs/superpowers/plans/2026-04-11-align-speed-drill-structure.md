# Speed Drill Route Restructuring Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure the monolithic speed-drill.tsx file into a nested folder-based architecture matching the memory route pattern, with separate files for each vocabulary category drill.

**Architecture:** The speed drill will be reorganized into a three-level hierarchy: `speed/` (mode selection) → `speed/vocab/` or `speed/grammar/` (type selection) → `speed/vocab/[category].tsx` (individual drills). Each level uses the layout/index pattern: `layout.tsx` provides an `<Outlet />` wrapper, and `index.tsx` provides selection UI.

**Tech Stack:** React Router 7 (framework mode), TypeScript, tailwindcss, shadcn/ui components

---

## File Structure

### Files to Create
```
src/routes/practice/
  speed/
    layout.tsx                    # Outlet wrapper, no UI
    index.tsx                     # Mode selection (Vocab vs Grammar)
    vocab/
      layout.tsx                  # Outlet wrapper for vocab category drills
      index.tsx                   # Category selection (pronouns, articles, verbs, nouns)
      pronouns.tsx                # Pronouns drill implementation
      articles.tsx                # Articles drill implementation
      verbs.tsx                   # Verbs drill implementation
      nouns.tsx                   # Nouns drill implementation
    grammar/
      layout.tsx                  # Outlet wrapper for grammar exercises
      index.tsx                   # Grammar exercise selection
```

### Files to Modify
```
src/routes.ts                     # Update route configuration
```

### Files to Delete (after routes updated)
```
src/routes/practice/speed-drill.tsx
```

---

## Task Breakdown

### Task 1: Create Speed Layout Wrapper

**Files:**
- Create: `src/routes/practice/speed/layout.tsx`

- [ ] **Step 1: Create the layout wrapper file**

Create `src/routes/practice/speed/layout.tsx`:

```typescript
import { Outlet } from "react-router";
import type { Route } from "./+types/layout";

export default function SpeedLayout({}: Route.ComponentProps) {
	return <Outlet />;
}
```

- [ ] **Step 2: Verify file created**

```bash
ls -la src/routes/practice/speed/layout.tsx
```

Expected: File exists and is readable.

---

### Task 2: Create Speed Mode Selection Index

**Files:**
- Create: `src/routes/practice/speed/index.tsx`

- [ ] **Step 1: Create the mode selection index**

Create `src/routes/practice/speed/index.tsx`:

```typescript
import { Zap } from "lucide-react";
import { useNavigate } from "react-router";

import { Card } from "@/components/Card";
import { Button } from "@/components/ui/button";

export default function SpeedIndex() {
	const navigate = useNavigate();

	return (
		<div className="mx-auto max-w-xl">
			<Card variant="bordered" padding="lg" className="text-center">
				<div className="py-8">
					<div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-terracotta-100">
						<Zap size={32} className="text-terracotta" />
					</div>
					<h2 className="mb-2 text-2xl font-bold">Speed Drill</h2>
					<p className="mb-8 text-stone-600">
						Rapid-fire production practice. Type fast, build automaticity.
					</p>

					<div className="space-y-3">
						<Button
							onClick={() => navigate("vocab")}
							className="w-full gap-2"
							size="lg"
						>
							<Zap size={20} />
							Vocabulary Drills
						</Button>
						<Button
							onClick={() => navigate("grammar")}
							className="w-full gap-2"
							size="lg"
							variant="outline"
						>
							<Zap size={20} />
							Grammar Exercises
						</Button>
					</div>
				</div>
			</Card>
		</div>
	);
}
```

- [ ] **Step 2: Verify file created**

```bash
ls -la src/routes/practice/speed/index.tsx
```

Expected: File exists and is readable.

---

### Task 3: Create Vocabulary Layout Wrapper

**Files:**
- Create: `src/routes/practice/speed/vocab/layout.tsx`

- [ ] **Step 1: Create the vocabulary layout wrapper**

Create `src/routes/practice/speed/vocab/layout.tsx`:

```typescript
import { Outlet } from "react-router";
import type { Route } from "./+types/layout";

export default function VocabLayout({}: Route.ComponentProps) {
	return <Outlet />;
}
```

- [ ] **Step 2: Verify file created**

```bash
ls -la src/routes/practice/speed/vocab/layout.tsx
```

Expected: File exists and is readable.

---

### Task 4: Create Vocabulary Category Selection Index

**Files:**
- Create: `src/routes/practice/speed/vocab/index.tsx`

- [ ] **Step 1: Create the category selection index**

Create `src/routes/practice/speed/vocab/index.tsx`:

```typescript
import { BookOpen } from "lucide-react";
import { Link } from "react-router";

import { Card } from "@/components/Card";
import { CATEGORY_CONFIG, type QuestionCategory } from "@/lib/drill/generate-questions";

const VOCAB_CATEGORIES: {
	id: QuestionCategory;
	label: string;
	preview: string;
}[] = [
	{
		id: "pronouns",
		label: "Pronouns",
		preview: "αὐτὸς, ἐμὸς, ὡς",
	},
	{
		id: "articles",
		label: "Articles",
		preview: "ὁ, ἡ, τό — nominative, accusative, genitive",
	},
	{
		id: "verbs",
		label: "Verbs",
		preview: "λύω, εἴμι, ἵστημι — principal parts and conjugation",
	},
	{
		id: "nouns",
		label: "Nouns",
		preview: "λόγος, δῶρον, γυνή — declension patterns",
	},
];

export default function VocabIndex() {
	return (
		<div className="mx-auto max-w-xl">
			<Card variant="bordered" padding="lg">
				<div className="text-center">
					<div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-honey-100">
						<BookOpen size={32} className="text-honey" />
					</div>
					<h2 className="mb-2 text-2xl font-bold">Vocabulary Drills</h2>
					<p className="mb-8 text-stone-600">
						Select a category to drill on.
					</p>
				</div>

				<div className="space-y-3">
					{VOCAB_CATEGORIES.map((category) => (
						<Link
							key={category.id}
							to={category.id}
							className="block rounded-lg border-2 border-stone-200 p-4 transition-colors hover:border-stone-300 hover:bg-stone-50"
						>
							<div className="mb-1 font-semibold text-stone-800">
								{category.label}
							</div>
							<div className="text-sm font-mono text-stone-600">
								{category.preview}
							</div>
						</Link>
					))}
				</div>
			</Card>
		</div>
	);
}
```

- [ ] **Step 2: Verify file created**

```bash
ls -la src/routes/practice/speed/vocab/index.tsx
```

Expected: File exists and is readable.

---

### Task 5: Create Pronouns Drill

**Files:**
- Create: `src/routes/practice/speed/vocab/pronouns.tsx`

- [ ] **Step 1: Create the pronouns drill file**

Create `src/routes/practice/speed/vocab/pronouns.tsx`:

```typescript
import { RotateCcw, Zap } from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
import { useFetcher, useOutletContext, useSearchParams } from "react-router";

import { Card } from "@/components/Card";
import { Button } from "@/components/ui/button";
import {
	generateQuestions,
	CATEGORY_CONFIG,
} from "@/lib/drill/generate-questions";
import UnifiedDrill, {
	type SessionStats,
	type UnifiedAttemptResult,
	type UnifiedQuestion,
} from "../components/unified-drill";
import type { PracticeLoaderData } from "../layout";

export default function PronounsDrill() {
	const { userId, stats } = useOutletContext<PracticeLoaderData>();
	const fetcher = useFetcher();
	const sessionIdRef = useRef<number | null>(null);

	const [sessionCount, setSessionCount] = useState(0);
	const [lastStats, setLastStats] = useState<SessionStats | null>(null);
	const [searchParams] = useSearchParams();
	const initialDrillSize = searchParams.get("size") === "quick" ? 10 : 15;
	const [drillSize, setDrillSize] = useState(initialDrillSize);
	const [reDrillQuestions, setReDrillQuestions] = useState<UnifiedQuestion[] | null>(null);
	const isReDrillRef = useRef(false);

	const questions = useMemo(() => {
		if (reDrillQuestions) return reDrillQuestions;
		return generateQuestions(["pronouns"], drillSize);
	}, [reDrillQuestions, drillSize]);

	const startDbSession = useCallback(() => {
		if (!userId) return;

		fetcher.submit(
			{
				intent: "startSession",
				userId: userId.toString(),
				sessionType: "case_drill",
				category: "speed_drill",
			},
			{ method: "post", action: "/practice" },
		);
	}, [userId, fetcher]);

	const handleAttempt = useCallback(
		(attempt: UnifiedAttemptResult) => {
			if (!userId || isReDrillRef.current) return;

			const weakAreaIdentifier = attempt.questionId.includes("obj-")
				? "object_pronouns"
				: attempt.questionId.includes("poss-")
					? "possessive_pronouns"
					: undefined;

			fetcher.submit(
				{
					intent: "recordAttempt",
					userId: userId.toString(),
					sessionId: sessionIdRef.current?.toString() ?? "",
					questionText: attempt.prompt,
					correctAnswer: attempt.correctGreek,
					userAnswer: attempt.userAnswer,
					isCorrect: attempt.isCorrect ? "on" : "",
					timeTaken: attempt.timeTaken.toString(),
					skillType: "production",
					weakAreaType: "case",
					...(weakAreaIdentifier && { weakAreaIdentifier }),
				},
				{ method: "post", action: "/practice" },
			);
		},
		[userId, fetcher],
	);

	const handleComplete = useCallback(
		(statsData: SessionStats) => {
			setLastStats(statsData);

			if (!userId || !sessionIdRef.current || isReDrillRef.current) return;

			fetcher.submit(
				{
					intent: "completeSession",
					sessionId: sessionIdRef.current.toString(),
					totalQuestions: statsData.total.toString(),
					correctAnswers: statsData.correct.toString(),
				},
				{ method: "post", action: "/practice" },
			);
		},
		[userId, fetcher],
	);

	const handleDrillMistakes = useCallback((missedQuestions: UnifiedQuestion[]) => {
		isReDrillRef.current = true;
		setReDrillQuestions(missedQuestions);
		setSessionCount((c) => c + 1);
		setLastStats(null);
		sessionIdRef.current = null;
	}, []);

	const handleNewSession = () => {
		setReDrillQuestions(null);
		isReDrillRef.current = false;
		setSessionCount((c) => c + 1);
		setLastStats(null);
		sessionIdRef.current = null;
	};

	if (fetcher.data?.success && fetcher.data?.session?.id && !sessionIdRef.current) {
		sessionIdRef.current = fetcher.data.session.id;
	}

	const categoryConfig = CATEGORY_CONFIG.pronouns;

	if (sessionCount === 0 && !lastStats) {
		return (
			<div className="mx-auto max-w-xl">
				<Card variant="bordered" padding="lg" className="text-center">
					<div className="py-8">
						<div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-terracotta-100">
							<Zap size={32} className="text-terracotta" />
						</div>
						<h2 className="mb-2 text-2xl font-bold">
							{categoryConfig.label} Drill
						</h2>
						<p className="mb-6 text-stone-600">
							Rapid-fire production practice. Type fast, build automaticity.
						</p>

						<div className="mb-6">
							<span className="mb-2 block text-sm text-stone-500">Questions</span>
							<div className="flex justify-center gap-2">
								{[10, 15, 20, 30].map((size) => (
									<Button
										key={size}
										variant={drillSize === size ? "primary" : "outline"}
										size="sm"
										onClick={() => setDrillSize(size)}
									>
										{size}
									</Button>
								))}
							</div>
						</div>

						<Button
							size="lg"
							onClick={() => {
								setSessionCount(1);
								startDbSession();
							}}
							className="gap-2"
						>
							<Zap size={20} />
							Start Training
						</Button>

						<div className="mt-6 space-y-1 text-xs text-stone-400">
							<p>
								<kbd className="rounded bg-stone-100 px-1.5 py-0.5 text-stone-600">
									Space
								</kbd>{" "}
								to start each question
							</p>
							<p>
								<kbd className="rounded bg-stone-100 px-1.5 py-0.5 text-stone-600">
									Enter
								</kbd>{" "}
								to submit answer
							</p>
							<p>Auto-advance on correct answers</p>
						</div>
					</div>
				</Card>
			</div>
		);
	}

	return (
		<div className="mx-auto max-w-xl">
			<UnifiedDrill
				key={sessionCount}
				title={`${categoryConfig.label} Drill #${sessionCount}`}
				questions={questions}
				onAttempt={handleAttempt}
				onComplete={handleComplete}
				userId={userId}
				sessionCount={sessionCount}
				streakDays={stats?.streak}
				onDrillMistakes={handleDrillMistakes}
			/>

			{lastStats && (
				<div className="mt-4 flex justify-center">
					<Button onClick={handleNewSession} className="gap-2">
						<RotateCcw size={16} />
						New Session
					</Button>
				</div>
			)}
		</div>
	);
}
```

- [ ] **Step 2: Verify file created**

```bash
ls -la src/routes/practice/speed/vocab/pronouns.tsx
```

Expected: File exists and is readable.

---

### Task 6: Create Articles Drill

**Files:**
- Create: `src/routes/practice/speed/vocab/articles.tsx`

- [ ] **Step 1: Create the articles drill file**

Create `src/routes/practice/speed/vocab/articles.tsx`:

```typescript
import { RotateCcw, Zap } from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
import { useFetcher, useOutletContext, useSearchParams } from "react-router";

import { Card } from "@/components/Card";
import { Button } from "@/components/ui/button";
import {
	generateQuestions,
	CATEGORY_CONFIG,
} from "@/lib/drill/generate-questions";
import UnifiedDrill, {
	type SessionStats,
	type UnifiedAttemptResult,
	type UnifiedQuestion,
} from "../components/unified-drill";
import type { PracticeLoaderData } from "../layout";

export default function ArticlesDrill() {
	const { userId, stats } = useOutletContext<PracticeLoaderData>();
	const fetcher = useFetcher();
	const sessionIdRef = useRef<number | null>(null);

	const [sessionCount, setSessionCount] = useState(0);
	const [lastStats, setLastStats] = useState<SessionStats | null>(null);
	const [searchParams] = useSearchParams();
	const initialDrillSize = searchParams.get("size") === "quick" ? 10 : 15;
	const [drillSize, setDrillSize] = useState(initialDrillSize);
	const [reDrillQuestions, setReDrillQuestions] = useState<UnifiedQuestion[] | null>(null);
	const isReDrillRef = useRef(false);

	const questions = useMemo(() => {
		if (reDrillQuestions) return reDrillQuestions;
		return generateQuestions(["articles"], drillSize);
	}, [reDrillQuestions, drillSize]);

	const startDbSession = useCallback(() => {
		if (!userId) return;

		fetcher.submit(
			{
				intent: "startSession",
				userId: userId.toString(),
				sessionType: "case_drill",
				category: "speed_drill",
			},
			{ method: "post", action: "/practice" },
		);
	}, [userId, fetcher]);

	const handleAttempt = useCallback(
		(attempt: UnifiedAttemptResult) => {
			if (!userId || isReDrillRef.current) return;

			fetcher.submit(
				{
					intent: "recordAttempt",
					userId: userId.toString(),
					sessionId: sessionIdRef.current?.toString() ?? "",
					questionText: attempt.prompt,
					correctAnswer: attempt.correctGreek,
					userAnswer: attempt.userAnswer,
					isCorrect: attempt.isCorrect ? "on" : "",
					timeTaken: attempt.timeTaken.toString(),
					skillType: "production",
					weakAreaType: "case",
					weakAreaIdentifier: "articles",
				},
				{ method: "post", action: "/practice" },
			);
		},
		[userId, fetcher],
	);

	const handleComplete = useCallback(
		(statsData: SessionStats) => {
			setLastStats(statsData);

			if (!userId || !sessionIdRef.current || isReDrillRef.current) return;

			fetcher.submit(
				{
					intent: "completeSession",
					sessionId: sessionIdRef.current.toString(),
					totalQuestions: statsData.total.toString(),
					correctAnswers: statsData.correct.toString(),
				},
				{ method: "post", action: "/practice" },
			);
		},
		[userId, fetcher],
	);

	const handleDrillMistakes = useCallback((missedQuestions: UnifiedQuestion[]) => {
		isReDrillRef.current = true;
		setReDrillQuestions(missedQuestions);
		setSessionCount((c) => c + 1);
		setLastStats(null);
		sessionIdRef.current = null;
	}, []);

	const handleNewSession = () => {
		setReDrillQuestions(null);
		isReDrillRef.current = false;
		setSessionCount((c) => c + 1);
		setLastStats(null);
		sessionIdRef.current = null;
	};

	if (fetcher.data?.success && fetcher.data?.session?.id && !sessionIdRef.current) {
		sessionIdRef.current = fetcher.data.session.id;
	}

	const categoryConfig = CATEGORY_CONFIG.articles;

	if (sessionCount === 0 && !lastStats) {
		return (
			<div className="mx-auto max-w-xl">
				<Card variant="bordered" padding="lg" className="text-center">
					<div className="py-8">
						<div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-terracotta-100">
							<Zap size={32} className="text-terracotta" />
						</div>
						<h2 className="mb-2 text-2xl font-bold">
							{categoryConfig.label} Drill
						</h2>
						<p className="mb-6 text-stone-600">
							Rapid-fire production practice. Type fast, build automaticity.
						</p>

						<div className="mb-6">
							<span className="mb-2 block text-sm text-stone-500">Questions</span>
							<div className="flex justify-center gap-2">
								{[10, 15, 20, 30].map((size) => (
									<Button
										key={size}
										variant={drillSize === size ? "primary" : "outline"}
										size="sm"
										onClick={() => setDrillSize(size)}
									>
										{size}
									</Button>
								))}
							</div>
						</div>

						<Button
							size="lg"
							onClick={() => {
								setSessionCount(1);
								startDbSession();
							}}
							className="gap-2"
						>
							<Zap size={20} />
							Start Training
						</Button>

						<div className="mt-6 space-y-1 text-xs text-stone-400">
							<p>
								<kbd className="rounded bg-stone-100 px-1.5 py-0.5 text-stone-600">
									Space
								</kbd>{" "}
								to start each question
							</p>
							<p>
								<kbd className="rounded bg-stone-100 px-1.5 py-0.5 text-stone-600">
									Enter
								</kbd>{" "}
								to submit answer
							</p>
							<p>Auto-advance on correct answers</p>
						</div>
					</div>
				</Card>
			</div>
		);
	}

	return (
		<div className="mx-auto max-w-xl">
			<UnifiedDrill
				key={sessionCount}
				title={`${categoryConfig.label} Drill #${sessionCount}`}
				questions={questions}
				onAttempt={handleAttempt}
				onComplete={handleComplete}
				userId={userId}
				sessionCount={sessionCount}
				streakDays={stats?.streak}
				onDrillMistakes={handleDrillMistakes}
			/>

			{lastStats && (
				<div className="mt-4 flex justify-center">
					<Button onClick={handleNewSession} className="gap-2">
						<RotateCcw size={16} />
						New Session
					</Button>
				</div>
			)}
		</div>
	);
}
```

- [ ] **Step 2: Verify file created**

```bash
ls -la src/routes/practice/speed/vocab/articles.tsx
```

Expected: File exists and is readable.

---

### Task 7: Create Verbs Drill

**Files:**
- Create: `src/routes/practice/speed/vocab/verbs.tsx`

- [ ] **Step 1: Create the verbs drill file**

Create `src/routes/practice/speed/vocab/verbs.tsx`:

```typescript
import { RotateCcw, Zap } from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
import { useFetcher, useOutletContext, useSearchParams } from "react-router";

import { Card } from "@/components/Card";
import { Button } from "@/components/ui/button";
import {
	generateQuestions,
	CATEGORY_CONFIG,
} from "@/lib/drill/generate-questions";
import UnifiedDrill, {
	type SessionStats,
	type UnifiedAttemptResult,
	type UnifiedQuestion,
} from "../components/unified-drill";
import type { PracticeLoaderData } from "../layout";

export default function VerbsDrill() {
	const { userId, stats } = useOutletContext<PracticeLoaderData>();
	const fetcher = useFetcher();
	const sessionIdRef = useRef<number | null>(null);

	const [sessionCount, setSessionCount] = useState(0);
	const [lastStats, setLastStats] = useState<SessionStats | null>(null);
	const [searchParams] = useSearchParams();
	const initialDrillSize = searchParams.get("size") === "quick" ? 10 : 15;
	const [drillSize, setDrillSize] = useState(initialDrillSize);
	const [reDrillQuestions, setReDrillQuestions] = useState<UnifiedQuestion[] | null>(null);
	const isReDrillRef = useRef(false);

	const questions = useMemo(() => {
		if (reDrillQuestions) return reDrillQuestions;
		return generateQuestions(["verbs"], drillSize);
	}, [reDrillQuestions, drillSize]);

	const startDbSession = useCallback(() => {
		if (!userId) return;

		fetcher.submit(
			{
				intent: "startSession",
				userId: userId.toString(),
				sessionType: "case_drill",
				category: "speed_drill",
			},
			{ method: "post", action: "/practice" },
		);
	}, [userId, fetcher]);

	const handleAttempt = useCallback(
		(attempt: UnifiedAttemptResult) => {
			if (!userId || isReDrillRef.current) return;

			let weakAreaIdentifier: string | undefined;
			if (attempt.questionId.includes("verb-")) {
				weakAreaIdentifier = attempt.questionId.split("-")[2];
			}

			fetcher.submit(
				{
					intent: "recordAttempt",
					userId: userId.toString(),
					sessionId: sessionIdRef.current?.toString() ?? "",
					questionText: attempt.prompt,
					correctAnswer: attempt.correctGreek,
					userAnswer: attempt.userAnswer,
					isCorrect: attempt.isCorrect ? "on" : "",
					timeTaken: attempt.timeTaken.toString(),
					skillType: "production",
					weakAreaType: "verb_family",
					...(weakAreaIdentifier && { weakAreaIdentifier }),
				},
				{ method: "post", action: "/practice" },
			);
		},
		[userId, fetcher],
	);

	const handleComplete = useCallback(
		(statsData: SessionStats) => {
			setLastStats(statsData);

			if (!userId || !sessionIdRef.current || isReDrillRef.current) return;

			fetcher.submit(
				{
					intent: "completeSession",
					sessionId: sessionIdRef.current.toString(),
					totalQuestions: statsData.total.toString(),
					correctAnswers: statsData.correct.toString(),
				},
				{ method: "post", action: "/practice" },
			);
		},
		[userId, fetcher],
	);

	const handleDrillMistakes = useCallback((missedQuestions: UnifiedQuestion[]) => {
		isReDrillRef.current = true;
		setReDrillQuestions(missedQuestions);
		setSessionCount((c) => c + 1);
		setLastStats(null);
		sessionIdRef.current = null;
	}, []);

	const handleNewSession = () => {
		setReDrillQuestions(null);
		isReDrillRef.current = false;
		setSessionCount((c) => c + 1);
		setLastStats(null);
		sessionIdRef.current = null;
	};

	if (fetcher.data?.success && fetcher.data?.session?.id && !sessionIdRef.current) {
		sessionIdRef.current = fetcher.data.session.id;
	}

	const categoryConfig = CATEGORY_CONFIG.verbs;

	if (sessionCount === 0 && !lastStats) {
		return (
			<div className="mx-auto max-w-xl">
				<Card variant="bordered" padding="lg" className="text-center">
					<div className="py-8">
						<div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-terracotta-100">
							<Zap size={32} className="text-terracotta" />
						</div>
						<h2 className="mb-2 text-2xl font-bold">
							{categoryConfig.label} Drill
						</h2>
						<p className="mb-6 text-stone-600">
							Rapid-fire production practice. Type fast, build automaticity.
						</p>

						<div className="mb-6">
							<span className="mb-2 block text-sm text-stone-500">Questions</span>
							<div className="flex justify-center gap-2">
								{[10, 15, 20, 30].map((size) => (
									<Button
										key={size}
										variant={drillSize === size ? "primary" : "outline"}
										size="sm"
										onClick={() => setDrillSize(size)}
									>
										{size}
									</Button>
								))}
							</div>
						</div>

						<Button
							size="lg"
							onClick={() => {
								setSessionCount(1);
								startDbSession();
							}}
							className="gap-2"
						>
							<Zap size={20} />
							Start Training
						</Button>

						<div className="mt-6 space-y-1 text-xs text-stone-400">
							<p>
								<kbd className="rounded bg-stone-100 px-1.5 py-0.5 text-stone-600">
									Space
								</kbd>{" "}
								to start each question
							</p>
							<p>
								<kbd className="rounded bg-stone-100 px-1.5 py-0.5 text-stone-600">
									Enter
								</kbd>{" "}
								to submit answer
							</p>
							<p>Auto-advance on correct answers</p>
						</div>
					</div>
				</Card>
			</div>
		);
	}

	return (
		<div className="mx-auto max-w-xl">
			<UnifiedDrill
				key={sessionCount}
				title={`${categoryConfig.label} Drill #${sessionCount}`}
				questions={questions}
				onAttempt={handleAttempt}
				onComplete={handleComplete}
				userId={userId}
				sessionCount={sessionCount}
				streakDays={stats?.streak}
				onDrillMistakes={handleDrillMistakes}
			/>

			{lastStats && (
				<div className="mt-4 flex justify-center">
					<Button onClick={handleNewSession} className="gap-2">
						<RotateCcw size={16} />
						New Session
					</Button>
				</div>
			)}
		</div>
	);
}
```

- [ ] **Step 2: Verify file created**

```bash
ls -la src/routes/practice/speed/vocab/verbs.tsx
```

Expected: File exists and is readable.

---

### Task 8: Create Nouns Drill

**Files:**
- Create: `src/routes/practice/speed/vocab/nouns.tsx`

- [ ] **Step 1: Create the nouns drill file**

Create `src/routes/practice/speed/vocab/nouns.tsx`:

```typescript
import { RotateCcw, Zap } from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
import { useFetcher, useOutletContext, useSearchParams } from "react-router";

import { Card } from "@/components/Card";
import { Button } from "@/components/ui/button";
import {
	generateQuestions,
	CATEGORY_CONFIG,
} from "@/lib/drill/generate-questions";
import UnifiedDrill, {
	type SessionStats,
	type UnifiedAttemptResult,
	type UnifiedQuestion,
} from "../components/unified-drill";
import type { PracticeLoaderData } from "../layout";

export default function NounsDrill() {
	const { userId, stats } = useOutletContext<PracticeLoaderData>();
	const fetcher = useFetcher();
	const sessionIdRef = useRef<number | null>(null);

	const [sessionCount, setSessionCount] = useState(0);
	const [lastStats, setLastStats] = useState<SessionStats | null>(null);
	const [searchParams] = useSearchParams();
	const initialDrillSize = searchParams.get("size") === "quick" ? 10 : 15;
	const [drillSize, setDrillSize] = useState(initialDrillSize);
	const [reDrillQuestions, setReDrillQuestions] = useState<UnifiedQuestion[] | null>(null);
	const isReDrillRef = useRef(false);

	const questions = useMemo(() => {
		if (reDrillQuestions) return reDrillQuestions;
		return generateQuestions(["nouns"], drillSize);
	}, [reDrillQuestions, drillSize]);

	const startDbSession = useCallback(() => {
		if (!userId) return;

		fetcher.submit(
			{
				intent: "startSession",
				userId: userId.toString(),
				sessionType: "case_drill",
				category: "speed_drill",
			},
			{ method: "post", action: "/practice" },
		);
	}, [userId, fetcher]);

	const handleAttempt = useCallback(
		(attempt: UnifiedAttemptResult) => {
			if (!userId || isReDrillRef.current) return;

			fetcher.submit(
				{
					intent: "recordAttempt",
					userId: userId.toString(),
					sessionId: sessionIdRef.current?.toString() ?? "",
					questionText: attempt.prompt,
					correctAnswer: attempt.correctGreek,
					userAnswer: attempt.userAnswer,
					isCorrect: attempt.isCorrect ? "on" : "",
					timeTaken: attempt.timeTaken.toString(),
					skillType: "production",
				},
				{ method: "post", action: "/practice" },
			);
		},
		[userId, fetcher],
	);

	const handleComplete = useCallback(
		(statsData: SessionStats) => {
			setLastStats(statsData);

			if (!userId || !sessionIdRef.current || isReDrillRef.current) return;

			fetcher.submit(
				{
					intent: "completeSession",
					sessionId: sessionIdRef.current.toString(),
					totalQuestions: statsData.total.toString(),
					correctAnswers: statsData.correct.toString(),
				},
				{ method: "post", action: "/practice" },
			);
		},
		[userId, fetcher],
	);

	const handleDrillMistakes = useCallback((missedQuestions: UnifiedQuestion[]) => {
		isReDrillRef.current = true;
		setReDrillQuestions(missedQuestions);
		setSessionCount((c) => c + 1);
		setLastStats(null);
		sessionIdRef.current = null;
	}, []);

	const handleNewSession = () => {
		setReDrillQuestions(null);
		isReDrillRef.current = false;
		setSessionCount((c) => c + 1);
		setLastStats(null);
		sessionIdRef.current = null;
	};

	if (fetcher.data?.success && fetcher.data?.session?.id && !sessionIdRef.current) {
		sessionIdRef.current = fetcher.data.session.id;
	}

	const categoryConfig = CATEGORY_CONFIG.nouns;

	if (sessionCount === 0 && !lastStats) {
		return (
			<div className="mx-auto max-w-xl">
				<Card variant="bordered" padding="lg" className="text-center">
					<div className="py-8">
						<div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-terracotta-100">
							<Zap size={32} className="text-terracotta" />
						</div>
						<h2 className="mb-2 text-2xl font-bold">
							{categoryConfig.label} Drill
						</h2>
						<p className="mb-6 text-stone-600">
							Rapid-fire production practice. Type fast, build automaticity.
						</p>

						<div className="mb-6">
							<span className="mb-2 block text-sm text-stone-500">Questions</span>
							<div className="flex justify-center gap-2">
								{[10, 15, 20, 30].map((size) => (
									<Button
										key={size}
										variant={drillSize === size ? "primary" : "outline"}
										size="sm"
										onClick={() => setDrillSize(size)}
									>
										{size}
									</Button>
								))}
							</div>
						</div>

						<Button
							size="lg"
							onClick={() => {
								setSessionCount(1);
								startDbSession();
							}}
							className="gap-2"
						>
							<Zap size={20} />
							Start Training
						</Button>

						<div className="mt-6 space-y-1 text-xs text-stone-400">
							<p>
								<kbd className="rounded bg-stone-100 px-1.5 py-0.5 text-stone-600">
									Space
								</kbd>{" "}
								to start each question
							</p>
							<p>
								<kbd className="rounded bg-stone-100 px-1.5 py-0.5 text-stone-600">
									Enter
								</kbd>{" "}
								to submit answer
							</p>
							<p>Auto-advance on correct answers</p>
						</div>
					</div>
				</Card>
			</div>
		);
	}

	return (
		<div className="mx-auto max-w-xl">
			<UnifiedDrill
				key={sessionCount}
				title={`${categoryConfig.label} Drill #${sessionCount}`}
				questions={questions}
				onAttempt={handleAttempt}
				onComplete={handleComplete}
				userId={userId}
				sessionCount={sessionCount}
				streakDays={stats?.streak}
				onDrillMistakes={handleDrillMistakes}
			/>

			{lastStats && (
				<div className="mt-4 flex justify-center">
					<Button onClick={handleNewSession} className="gap-2">
						<RotateCcw size={16} />
						New Session
					</Button>
				</div>
			)}
		</div>
	);
}
```

- [ ] **Step 2: Verify file created**

```bash
ls -la src/routes/practice/speed/vocab/nouns.tsx
```

Expected: File exists and is readable.

---

### Task 9: Create Grammar Layout Wrapper

**Files:**
- Create: `src/routes/practice/speed/grammar/layout.tsx`

- [ ] **Step 1: Create the grammar layout wrapper**

Create `src/routes/practice/speed/grammar/layout.tsx`:

```typescript
import { Outlet } from "react-router";
import type { Route } from "./+types/layout";

export default function GrammarLayout({}: Route.ComponentProps) {
	return <Outlet />;
}
```

- [ ] **Step 2: Verify file created**

```bash
ls -la src/routes/practice/speed/grammar/layout.tsx
```

Expected: File exists and is readable.

---

### Task 10: Create Grammar Exercise Selection Index

**Files:**
- Create: `src/routes/practice/speed/grammar/index.tsx`

- [ ] **Step 1: Create the grammar exercise selection index**

Create `src/routes/practice/speed/grammar/index.tsx`:

```typescript
import { Clock } from "lucide-react";
import { Link } from "react-router";

import { Card } from "@/components/Card";
import { Badge } from "@/components/ui/badge";
import {
	GRAMMAR_EXERCISE_CONFIG,
	type GrammarExerciseType,
} from "@/lib/drill/generate-questions";

const GRAMMAR_EXERCISES = Object.entries(GRAMMAR_EXERCISE_CONFIG) as [
	GrammarExerciseType,
	(typeof GRAMMAR_EXERCISE_CONFIG)[GrammarExerciseType],
][];

const formatTimeLimit = (ms: number): string => {
	const seconds = ms / 1000;
	return seconds % 1 === 0 ? `${seconds}s` : `${seconds.toFixed(1)}s`;
};

export default function GrammarIndex() {
	return (
		<div className="mx-auto max-w-xl">
			<Card variant="bordered" padding="lg">
				<div className="text-center">
					<h2 className="mb-2 text-2xl font-bold">Grammar Exercises</h2>
					<p className="mb-8 text-stone-600">
						Select an exercise type to practice specific grammar patterns.
					</p>
				</div>

				<div className="space-y-3">
					{GRAMMAR_EXERCISES.map(([type, config]) => (
						<Link
							key={type}
							to={type}
							className={`block rounded-lg border-2 p-4 text-left transition-colors hover:border-stone-300 hover:bg-stone-50 border-stone-200`}
						>
							<div className="mb-2 flex items-center justify-between">
								<span className="font-semibold text-stone-800">
									{config.label}
								</span>
								<Badge variant="outline" className="gap-1">
									<Clock size={12} />
									{formatTimeLimit(config.timeLimit)}
								</Badge>
							</div>
							<p className="mb-1 font-mono text-base text-terracotta-700">
								{config.greekExample}
							</p>
							<p className="text-sm text-stone-500">{config.description}</p>
						</Link>
					))}
				</div>
			</Card>
		</div>
	);
}
```

- [ ] **Step 2: Verify file created**

```bash
ls -la src/routes/practice/speed/grammar/index.tsx
```

Expected: File exists and is readable.

---

### Task 11: Update Route Configuration

**Files:**
- Modify: `src/routes.ts`

- [ ] **Step 1: Read the current routes.ts file**

```bash
head -100 src/routes.ts
```

Identify the current speed-drill route definition.

- [ ] **Step 2: Update the speed route configuration**

In `src/routes.ts`, find the line that defines the speed route (currently: `route("speed", "routes/practice/speed-drill.tsx")`) and replace it with:

```typescript
route("speed", "routes/practice/speed/layout.tsx", [
	index("routes/practice/speed/index.tsx"),
	route("vocab", "routes/practice/speed/vocab/layout.tsx", [
		index("routes/practice/speed/vocab/index.tsx"),
		route("pronouns", "routes/practice/speed/vocab/pronouns.tsx"),
		route("articles", "routes/practice/speed/vocab/articles.tsx"),
		route("verbs", "routes/practice/speed/vocab/verbs.tsx"),
		route("nouns", "routes/practice/speed/vocab/nouns.tsx"),
	]),
	route("grammar", "routes/practice/speed/grammar/layout.tsx", [
		index("routes/practice/speed/grammar/index.tsx"),
	]),
]),
```

Make sure `index` and `route` are imported from `react-router/dev/routing`.

- [ ] **Step 3: Verify routes updated**

```bash
grep -A 20 'route("speed"' src/routes.ts
```

Expected: Output shows the nested route structure as updated above.

---

### Task 12: Delete Old Speed Drill File

**Files:**
- Delete: `src/routes/practice/speed-drill.tsx`

- [ ] **Step 1: Verify old file exists**

```bash
ls -la src/routes/practice/speed-drill.tsx
```

Expected: File exists.

- [ ] **Step 2: Delete the old file**

```bash
git rm src/routes/practice/speed-drill.tsx
```

- [ ] **Step 3: Verify deletion**

```bash
ls -la src/routes/practice/speed-drill.tsx
```

Expected: File not found (exit code 1 is normal here).

---

### Task 13: Verify Type Generation and No TypeScript Errors

**Files:**
- Review generated types (automatic)

- [ ] **Step 1: Run React Router type generation**

```bash
pnpm react-router typegen
```

Expected: Command completes successfully with output showing generated types.

- [ ] **Step 2: Check TypeScript compilation**

```bash
pnpm type-check
```

Expected: No TypeScript errors reported.

---

### Task 14: Test the Routes in Development

**Files:**
- All created files

- [ ] **Step 1: Start the dev server**

```bash
make dev
```

Expected: Dev server starts successfully.

- [ ] **Step 2: Navigate to /practice/speed**

Open browser to `http://localhost:5173/practice/speed` (adjust port if needed).

Expected: Speed Drill landing page appears with Vocab and Grammar buttons.

- [ ] **Step 3: Click Vocabulary**

Click the "Vocabulary Drills" button.

Expected: Category selection page appears with Pronouns, Articles, Verbs, Nouns options.

- [ ] **Step 4: Click a category (Pronouns)**

Click the "Pronouns" link.

Expected: Pronouns drill configuration screen appears with question count selector and Start Training button.

- [ ] **Step 5: Click Grammar**

Use browser back button to return to /practice/speed, then click "Grammar Exercises".

Expected: Grammar exercise selection page appears with exercise options.

- [ ] **Step 6: Verify no console errors**

Open browser DevTools console.

Expected: No JavaScript errors or React warnings.

---

## Spec Coverage Checklist

- ✓ Restructure speed-drill from monolithic file to nested folder architecture
- ✓ Create speed/index.tsx for mode selection (Vocab vs Grammar)
- ✓ Create speed/vocab/ subfolder with index and category-specific files (pronouns, articles, verbs, nouns)
- ✓ Create speed/grammar/ subfolder with index and exercise selection
- ✓ Each folder has layout.tsx wrapper with Outlet
- ✓ Update routes.ts with nested route configuration
- ✓ Delete old speed-drill.tsx file
- ✓ Maintain all original functionality (session management, attempt recording, stats tracking)
- ✓ Verify TypeScript types are generated and no errors
- ✓ Test routes work in development
