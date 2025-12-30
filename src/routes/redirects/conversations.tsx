import { redirect } from "react-router";
import type { Route } from "./+types/conversations";

export const loader = ({ params }: Route.LoaderArgs) => {
	const path = params["*"] || "";
	return redirect(`/explore/conversations/${path}`);
};
