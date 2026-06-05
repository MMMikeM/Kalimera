import { createFileRoute } from "@tanstack/react-router";

import { greekToPhonetic } from "@/lib/greek-transliteration";
import { getOppositePairsFn } from "@/server/fns/opposites";

import type { DrillForm } from "../components/engines/deck";
import { Drill } from "../components/engines/drill";

interface OppositeCard extends DrillForm {
	sourceGreek: string;
	sourceEnglish: string;
}

const cleanGloss = (english: string): string => english.replace(/^I /, "");

const makeCard = (
	sourceId: number,
	sourceGreek: string,
	sourceEnglish: string,
	targetId: number,
	targetGreek: string,
): OppositeCard => ({
	id: `opp-${sourceId}-${targetId}`,
	greek: targetGreek,
	greeklish: greekToPhonetic(targetGreek),
	label: `${sourceGreek} — ${cleanGloss(sourceEnglish)}`,
	vocabId: targetId,
	sourceGreek,
	sourceEnglish: cleanGloss(sourceEnglish),
});

export const Route = createFileRoute("/practice/blocks/opposites")({
	loader: async () => {
		const pairs = await getOppositePairsFn();
		const items: OppositeCard[] = pairs.flatMap((p) => [
			makeCard(p.aId, p.aGreek, p.aEnglish, p.bId, p.bGreek),
			makeCard(p.bId, p.bGreek, p.bEnglish, p.aId, p.aGreek),
		]);
		if (items.length === 0) throw new Error("No opposite pairs available");
		return { items };
	},
	staleTime: 0,
	component: OppositesDrill,
});

function OppositesDrill() {
	const { items } = Route.useLoaderData();
	return (
		<Drill
			drillId="blocks-opposites"
			items={items}
			title="Opposites"
			subtitle={`${items.length} cards / timed`}
			colorTheme="terracotta"
			backTo="/practice/blocks"
			forwardDesc="Greek word → its opposite"
			reverseDesc="Greek word → recall its opposite (self-assess)"
			forwardPrompt={(form) => {
				const card = form as OppositeCard;
				return (
					<div className="mx-auto flex w-full max-w-72 flex-col">
						<p className="mb-3 text-xs font-medium tracking-widest text-muted-foreground uppercase">
							opposite of
						</p>
						<p lang="el" className="greek-text font-serif text-5xl leading-none text-foreground">
							{card.sourceGreek}
						</p>
						<p className="mt-4 font-serif text-base text-muted-foreground italic">
							"{card.sourceEnglish}"
						</p>
					</div>
				);
			}}
		/>
	);
}
