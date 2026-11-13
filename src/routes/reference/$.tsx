import { createFileRoute, notFound, redirect } from "@tanstack/react-router";

import { referenceRedirect } from "./redirects.data";

export const Route = createFileRoute("/reference/$")({
	beforeLoad: ({ params }) => {
		const href = referenceRedirect(params._splat ?? "");
		if (!href) throw notFound();
		throw redirect({ href, statusCode: 301 });
	},
});
