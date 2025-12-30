import { redirect } from "react-router";
import type { Route } from "./+types/quick-reference";

export const loader = ({ params }: Route.LoaderArgs) => {
	const path = params["*"] || "";
	return redirect(`/reference/${path}`);
};
