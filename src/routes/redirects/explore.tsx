import { redirect } from "react-router";
import type { Route } from "./+types/explore";

export const loader = ({ params }: Route.LoaderArgs) => {
	const path = params["*"] || "";

	// Map old paths to new paths
	// /explore/words/* -> /learn/vocabulary/*
	// /explore/conversations/* -> /learn/conversations/*
	// /explore/phrases/* -> /learn/phrases/*
	let newPath = path;
	if (path.startsWith("words")) {
		newPath = path.replace(/^words/, "vocabulary");
	}

	return redirect(`/learn/${newPath}`, { status: 301 });
};
