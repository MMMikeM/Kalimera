import { Outlet } from "react-router";

import type { Route } from "./+types/layout";

export { loader } from "./loader.server";

export default function EssentialsLayout({ loaderData }: Route.ComponentProps) {
	return <Outlet context={loaderData} />;
}
