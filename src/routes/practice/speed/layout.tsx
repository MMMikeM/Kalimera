import { Outlet } from "react-router";
import type { Route } from "./+types/layout";

export default function SpeedLayout({}: Route.ComponentProps) {
	return <Outlet />;
}
