import { useOutletContext } from "react-router";
import PronounDrill from "./pronoun-drill";
import { PracticeStrategy, type PracticeLoaderData } from "./layout";

export default function PronounsRoute() {
	useOutletContext<PracticeLoaderData>();

	return (
		<div className="space-y-4">
			<PronounDrill />
			<PracticeStrategy />
		</div>
	);
}
