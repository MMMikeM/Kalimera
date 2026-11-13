import { createFileRoute, redirect } from "@tanstack/react-router";

import { REFERENCE_REDIRECTS } from "./redirects.data";

export const Route = createFileRoute("/reference/")({
	beforeLoad: () => {
		throw redirect({ href: REFERENCE_REDIRECTS[""], statusCode: 301 });
	},
});
