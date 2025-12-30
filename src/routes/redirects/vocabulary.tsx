import { redirect } from "react-router";
import type { Route } from "./+types/vocabulary";

export const loader = ({ params }: Route.LoaderArgs) => {
	const path = params["*"] || "";
	return redirect(`/explore/words/${path}`);
};
