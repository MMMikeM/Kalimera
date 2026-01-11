import { useOutletContext } from "react-router";
import type { Route } from "./+types/$tab";
import type { PhrasesLoaderData } from "./components/shared";
import { ConnectorsTab } from "./tabs/ConnectorsTab";
import { OpinionsTab } from "./tabs/OpinionsTab";
import { RequestsTab } from "./tabs/RequestsTab";
import { ResponsesTab } from "./tabs/ResponsesTab";
import { SurvivalTab } from "./tabs/SurvivalTab";
import { TimeTab } from "./tabs/TimeTab";

const VALID_TABS = [
	"survival",
	"responses",
	"requests",
	"opinions",
	"connectors",
	"time",
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
	const data = useOutletContext<PhrasesLoaderData>();

	switch (tab) {
		case "survival":
			return <SurvivalTab data={data} />;
		case "responses":
			return <ResponsesTab data={data} />;
		case "requests":
			return <RequestsTab data={data} />;
		case "opinions":
			return <OpinionsTab data={data} />;
		case "connectors":
			return <ConnectorsTab data={data} />;
		case "time":
			return <TimeTab data={data} />;
		default:
			return null;
	}
}
