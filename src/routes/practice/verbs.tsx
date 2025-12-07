import { useOutletContext } from "react-router";
import VerbDrill from "./verb-drill";
import { PracticeStrategy, type PracticeLoaderData } from "./layout";

export default function VerbsRoute() {
	useOutletContext<PracticeLoaderData>();

	return (
		<div className="space-y-4">
			<VerbDrill />
			<PracticeStrategy />
		</div>
	);
}
