import { useOutletContext } from "react-router";
import type { Route } from "./+types/$subtab";
import type { EssentialsLoaderData } from "./data.server";
import { NumbersSubtab } from "./subtabs/numbers";
import { PositionSubtab } from "./subtabs/position";
import { TimeSubtab } from "./subtabs/time";
import { FrequencySubtab } from "./subtabs/frequency";
import { ColoursSubtab } from "./subtabs/colours";

const VALID_SUBTABS = [
	"numbers",
	"position",
	"time",
	"frequency",
	"colours",
] as const;
type SubtabId = (typeof VALID_SUBTABS)[number];

export function loader({ params }: Route.LoaderArgs) {
	const subtab = params.subtab as string;

	if (!VALID_SUBTABS.includes(subtab as SubtabId)) {
		throw new Response("Not Found", { status: 404 });
	}

	return { subtab: subtab as SubtabId };
}

export default function EssentialsSubtab({ loaderData }: Route.ComponentProps) {
	const data = useOutletContext<EssentialsLoaderData>();
	const { subtab } = loaderData;

	switch (subtab) {
		case "numbers":
			return <NumbersSubtab data={data} />;
		case "position":
			return <PositionSubtab data={data} />;
		case "time":
			return <TimeSubtab data={data} />;
		case "frequency":
			return <FrequencySubtab data={data} />;
		case "colours":
			return <ColoursSubtab data={data} />;
		default:
			return null;
	}
}
