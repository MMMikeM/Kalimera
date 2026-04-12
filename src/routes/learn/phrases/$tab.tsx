import { useOutletContext } from "react-router";

import { validateTab } from "@/lib/validate-tab";

import type { Route } from "./+types/$tab";
import type { PhrasesLoaderData } from "./components/shared";
import { ConnectorsTab } from "./tabs/ConnectorsTab";
import { OpinionsTab } from "./tabs/OpinionsTab";
import { RequestsTab } from "./tabs/RequestsTab";
import { ResponsesTab } from "./tabs/ResponsesTab";
import { SurvivalTab } from "./tabs/SurvivalTab";
import { TimeTab } from "./tabs/TimeTab";

const VALID_TABS = ["survival", "responses", "requests", "opinions", "connectors", "time"] as const;

export function loader({ params }: Route.LoaderArgs) {
	return { tab: validateTab(params.tab as string, VALID_TABS) };
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
