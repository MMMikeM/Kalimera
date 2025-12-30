import { redirect } from "react-router";
import type { Route } from "./+types/phrases";

export const loader = ({ params }: Route.LoaderArgs) => {
	const path = params["*"] || "";
	return redirect(`/explore/phrases/${path}`);
};
