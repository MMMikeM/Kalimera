import { createFileRoute, redirect } from "@tanstack/react-router";
import { DoorOpen, Hand, MessageCircle, Utensils } from "lucide-react";
import type React from "react";

import { BackLink } from "@/components/BackLink";
import { ConversationModeToggle } from "@/components/ConversationModeToggle";
import type { ConversationMode } from "@/components/DialogueExchange";
import type { NavTab } from "@/components/NavTabs";
import { NavTabs } from "@/components/NavTabs";
import { usePersistedState } from "@/lib/hooks/use-persisted-state";

import { ConversationModeProvider } from "./components/conversation-shell";
import { ArrivingTab } from "./tabs/arriving";
import { FoodTab } from "./tabs/food";
import { RequestsTab } from "./tabs/requests";
import { SmalltalkTab } from "./tabs/smalltalk";

const VALID_TABS = ["arriving", "food", "smalltalk", "requests"] as const;

const CONVERSATION_TABS: NavTab[] = [
	{
		id: "arriving",
		label: "Arriving",
		icon: <DoorOpen size={16} />,
		color: "olive",
	},
	{
		id: "food",
		label: "Food",
		icon: <Utensils size={16} />,
		color: "terracotta",
	},
	{
		id: "smalltalk",
		label: "Talk",
		icon: <MessageCircle size={16} />,
		color: "ocean",
	},
	{
		id: "requests",
		label: "Requests",
		icon: <Hand size={16} />,
		color: "honey",
	},
];

export const Route = createFileRoute("/learn/conversations/$tab")({
	beforeLoad: ({ params }) => {
		const tab = VALID_TABS.find((t) => t === params.tab);
		if (!tab) throw redirect({ to: "/learn/conversations/$tab", params: { tab: "arriving" } });
		return { tab };
	},
	loader: ({ context: { tab } }) => ({ tab }),
	component: ConversationsPage,
});

const TAB_CONTENT = {
	arriving: ArrivingTab,
	food: FoodTab,
	smalltalk: SmalltalkTab,
	requests: RequestsTab,
} satisfies Record<(typeof VALID_TABS)[number], React.FC>;

function ConversationsPage() {
	const { tab } = Route.useLoaderData();
	const TabContent = TAB_CONTENT[tab];

	const [rawMode, setMode] = usePersistedState<string>("conversation-mode", "read");
	const mode: ConversationMode = rawMode === "roleplay" ? "roleplay" : "read";

	return (
		<ConversationModeProvider value={mode}>
			<div className="space-y-4">
				<BackLink to="/learn">Learn</BackLink>

				<NavTabs
					tabs={CONVERSATION_TABS}
					activeTab={tab}
					buildUrl={(tabId) => `/learn/conversations/${tabId}`}
				/>

				<ConversationModeToggle mode={mode} onModeChange={setMode} />

				<TabContent />
			</div>
		</ConversationModeProvider>
	);
}
