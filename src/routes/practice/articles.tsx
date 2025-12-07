import { useOutletContext } from "react-router";
import ArticleDrill from "./article-drill";
import { PracticeStrategy, type PracticeLoaderData } from "./layout";

export default function ArticlesRoute() {
	useOutletContext<PracticeLoaderData>();

	return (
		<div className="space-y-4">
			<ArticleDrill />
			<PracticeStrategy />
		</div>
	);
}
