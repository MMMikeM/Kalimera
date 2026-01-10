import type { Route } from "./+types/$tab";
import { SurvivalTab } from "./tabs/survival";
import { ResponsesTab } from "./tabs/responses";
import { RequestsTab } from "./tabs/requests";
import { OpinionsTab } from "./tabs/opinions";
import { ConnectorsTab } from "./tabs/connectors";
import { TimeTab } from "./tabs/time";
import { ConstructionsTab } from "./tabs/constructions";

const VALID_TABS = [
	"survival",
	"responses",
	"requests",
	"opinions",
	"connectors",
	"time",
	"constructions",
] as const;
type TabId = (typeof VALID_TABS)[number];

export function loader({ params }: Route.LoaderArgs) {
	const tab = params.tab as string;

	if (!VALID_TABS.includes(tab as TabId)) {
		throw new Response("Not Found", { status: 404 });
	}

	return { tab: tab as TabId };
}

export default function TabRoute({ loaderData }: Route.ComponentProps) {
	const { tab } = loaderData;

	switch (tab) {
		case "survival":
			return <SurvivalTab />;
		case "responses":
			return <ResponsesTab />;
		case "requests":
			return <RequestsTab />;
		case "opinions":
			return <OpinionsTab />;
		case "connectors":
			return <ConnectorsTab />;
		case "time":
			return <TimeTab />;
		case "constructions":
			return <ConstructionsTab />;
		default:
			return null;
	}
}
