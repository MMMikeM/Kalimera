import { createFileRoute, redirect } from "@tanstack/react-router";
import { Link, useLocation } from "@tanstack/react-router";
import { ChevronLeft, DoorOpen, Hand, MessageCircle, Utensils } from "lucide-react";
import type React from "react";

import { ConversationModeToggle } from "@/components/ConversationModeToggle";
import type { ConversationMode } from "@/components/DialogueExchange";
import type { NavTab } from "@/components/NavTabs";
import { NavTabs } from "@/components/NavTabs";
import { usePersistedState } from "@/lib/hooks/use-persisted-state";
import { validateTab } from "@/lib/validate-tab";

import { ConversationProvider } from "./components/conversation-shell";
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
		color: "ocean",
	},
	{ id: "food", label: "Food", icon: <Utensils size={16} />, color: "olive" },
	{
		id: "smalltalk",
		label: "Talk",
		icon: <MessageCircle size={16} />,
		color: "honey",
	},
	{
		id: "requests",
		label: "Requests",
		icon: <Hand size={16} />,
		color: "terracotta",
	},
];

export const Route = createFileRoute("/learn/conversations/$tab")({
	beforeLoad: (x) => {
		if (!VALID_TABS.some((tab) => tab === x.params.tab)) {
			throw redirect({ to: "/learn/conversations/$tab", params: { tab: "arriving" } });
		}
	},
	loader: ({ params }) => ({ tab: validateTab(params.tab as string, VALID_TABS) }),
	component: () => (
		<ConversationsLayout>
			<TabRoute />
		</ConversationsLayout>
	),
});

function TabRoute() {
	const { tab } = Route.useLoaderData();

	switch (tab) {
		case "arriving":
			return <ArrivingTab />;
		case "food":
			return <FoodTab />;
		case "smalltalk":
			return <SmalltalkTab />;
		case "requests":
			return <RequestsTab />;
		default:
			return null;
	}
}

function ConversationsLayout({ children }: { children: React.ReactNode }) {
	const location = useLocation();
	const pathSegments = location.pathname.split("/").filter(Boolean);
	const activeTab = pathSegments[2] || "arriving";

	const [rawMode, setMode] = usePersistedState<string>("conversation-mode", "read");
	const mode: ConversationMode = rawMode === "roleplay" ? "roleplay" : "read";

	return (
		<ConversationProvider value={{ mode, setMode: setMode as (mode: ConversationMode) => void }}>
			<div className="space-y-4">
				<Link
					to="/learn"
					className="flex items-center gap-1 text-stone-600 transition-colors hover:text-stone-800"
				>
					<ChevronLeft size={20} />
					<span className="font-medium">Convos</span>
				</Link>

				<NavTabs
					tabs={CONVERSATION_TABS}
					activeTab={activeTab}
					buildUrl={(tabId) => `/learn/conversations/${tabId}`}
				/>

				<ConversationModeToggle mode={mode} onModeChange={setMode} />

				{children}
			</div>
		</ConversationProvider>
	);
}
