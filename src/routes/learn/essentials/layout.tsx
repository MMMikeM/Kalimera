import { Outlet } from "react-router";
import type { Route } from "./+types/layout";
import { getEssentialsData } from "./data.server";

export async function loader() {
	return getEssentialsData();
}

export default function EssentialsLayout({ loaderData }: Route.ComponentProps) {
	return <Outlet context={loaderData} />;
}
