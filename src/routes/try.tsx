import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

import { GreekText } from "@/components/GreekText";
import { PageHeading } from "@/components/PageHeading";
import { Button, ButtonLink } from "@/components/ui/button";
import { pageTitle } from "@/lib/page-title";

import { SPEEDMAP, type SpeedId } from "./practice/components/drill-speeds";
import type { SimpleListItem } from "./practice/components/engines/deck";
import { Drill } from "./practice/components/engines/drill";

export const Route = createFileRoute("/try")({
	head: () => ({ meta: [{ title: pageTitle("Try a drill") }] }),
	component: TryDrillRoute,
});

// The hint pins down which "her" or "you" is meant, without naming a grammar term.
const TRY_QUESTIONS: Array<{
	id: string;
	prompt: string;
	hint?: string;
	correctGreek: string;
	acceptAlso?: string;
}> = [
	{ id: "try-1", prompt: "me", hint: "as in “she sees me”", correctGreek: "με" },
	{ id: "try-2", prompt: "you", hint: "as in “I see you”, one person", correctGreek: "σε" },
	{ id: "try-3", prompt: "him", hint: "as in “I see him”", correctGreek: "τον" },
	{ id: "try-4", prompt: "her", hint: "as in “I see her”", correctGreek: "την", acceptAlso: "τη" },
	{ id: "try-5", prompt: "my", hint: "as in “my house”", correctGreek: "μου" },
	{ id: "try-6", prompt: "your", hint: "as in “your house”, one person", correctGreek: "σου" },
	{ id: "try-7", prompt: "I want", correctGreek: "θέλω" },
	{ id: "try-8", prompt: "I have", correctGreek: "έχω" },
];

const TRY_ITEMS: SimpleListItem[] = TRY_QUESTIONS.map((q) => ({
	id: q.id,
	greek: q.correctGreek,
	label: q.prompt,
	english: q.prompt,
	...(q.hint && { detail: q.hint }),
	...(q.acceptAlso && { acceptAlso: q.acceptAlso }),
}));

const TRY_SPEED: SpeedId = "medium";
const TRY_SECONDS = SPEEDMAP[TRY_SPEED].timeLimit / 1000;

const TryDrillIntro = ({ onStart }: { onStart: () => void }) => (
	<section className="py-10 md:py-16">
		<PageHeading title="Try a drill">
			<p>
				You'll get {TRY_ITEMS.length} prompts in English, with {TRY_SECONDS} seconds for each. Type
				the Greek in Greeklish, Latin letters on your normal keyboard:{" "}
				<span className="font-medium">thelo</span> counts as <GreekText>θέλω</GreekText>.
			</p>
			<p>No account, and nothing is saved.</p>
		</PageHeading>
		<Button size="lg" onClick={onStart} className="mt-8">
			Start
		</Button>
		<p className="mt-3 text-sm text-muted-foreground pointer-coarse:hidden">
			Press Enter to check each answer.
		</p>
	</section>
);

const AccountPitch = () => (
	<aside className="mt-10 border-t border-stone-200 pt-6">
		<h2 className="font-medium text-foreground">Keep going with an account</h2>
		<p className="mt-1 text-sm leading-relaxed text-muted-foreground">
			It remembers what you miss and brings it back when it's due, across the full drill library.
			It's free.
		</p>
		<ButtonLink
			to="/register"
			search={{ from: "try" }}
			variant="secondary"
			className="mt-4 w-full"
		>
			Create a free account
		</ButtonLink>
		<p className="mt-3 text-center text-sm text-muted-foreground">
			Already have one?{" "}
			<Link
				to="/login"
				className="font-medium text-terracotta-text underline-offset-2 hover:underline"
			>
				Sign in
			</Link>
		</p>
	</aside>
);

function TryDrillRoute() {
	const [started, setStarted] = useState(false);

	if (!started) {
		return <TryDrillIntro onStart={() => setStarted(true)} />;
	}

	return (
		<Drill
			items={TRY_ITEMS}
			title="Try a drill"
			subtitle={`${TRY_ITEMS.length} prompts`}
			drillId="try"
			sessionSize={TRY_ITEMS.length}
			speed={TRY_SPEED}
			backTo="/"
			autoStart
			summaryFooter={<AccountPitch />}
		/>
	);
}
