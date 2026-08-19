import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { ChevronLeft } from "lucide-react";
import type React from "react";
import { useState } from "react";

import { TabHero } from "@/components/TabHero";
import { cn } from "@/lib/utils";
import { fetchVerbParadigms, fetchVerbsForInventory } from "@/server/db/queries/vocabulary";

import { MemoriseSection, type Paradigm, RulesSection, classifyVerbs } from "./verbs/components/verb-inventory";

const verbsLoader = createServerFn().handler(async () => {
	const inventory = classifyVerbs(await fetchVerbsForInventory());

	const irregularIds = inventory.filter((v) => v.klass === "irregular").map((v) => v.id);
	const rows = await fetchVerbParadigms(irregularIds);

	const paradigms: Record<number, Paradigm> = {};
	for (const row of rows) {
		const byTense: Paradigm = {};
		for (const c of row.verbConjugations) {
			(byTense[c.tense] ??= {})[c.person] = c.form;
		}
		paradigms[row.id] = byTense;
	}

	return { inventory, paradigms };
});

export const Route = createFileRoute("/learn/verbs")({
	loader: () => verbsLoader(),
	component: VerbsPage,
});

type InventoryTab = "irregulars" | "rules";

const InventoryTabs: React.FC<{
	irregularCount: number;
	active: InventoryTab;
	onChange: (tab: InventoryTab) => void;
}> = ({ irregularCount, active, onChange }) => (
	<div className="flex w-full items-center gap-1 rounded-lg bg-muted p-1">
		{(
			[
				["irregulars", `Irregulars (${irregularCount})`],
				["rules", "Follow the rules"],
			] as const
		).map(([id, label]) => (
			<button
				key={id}
				type="button"
				onClick={() => onChange(id)}
				className={cn(
					"flex-1 rounded-md px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors",
					active === id ? "bg-white text-foreground shadow-sm" : "text-stone-600",
				)}
			>
				{label}
			</button>
		))}
	</div>
);

function VerbsPage() {
	const { inventory, paradigms } = Route.useLoaderData();
	const [tab, setTab] = useState<InventoryTab>("irregulars");

	const irregularCount = inventory.filter((v) => v.klass === "irregular").length;

	return (
		<div className="space-y-4">
			<Link
				to="/learn"
				className="inline-flex items-center gap-1 text-sm text-stone-600 transition-colors hover:text-stone-800"
			>
				<ChevronLeft size={16} />
				<span>Learn</span>
			</Link>

			<TabHero title="Verbs" greekPhrase="είδα, ήπια, πήγα" colorScheme="olive">
				Which verbs you have to memorise, and which come free with a rule.
			</TabHero>

			<InventoryTabs irregularCount={irregularCount} active={tab} onChange={setTab} />

			{tab === "irregulars" && <MemoriseSection verbs={inventory} paradigms={paradigms} />}
			{tab === "rules" && <RulesSection verbs={inventory} />}
		</div>
	);
}
