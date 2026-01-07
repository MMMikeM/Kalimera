import type { Route } from "./+types/route";
import { getVerbWithConjugations } from "@/db.server/queries/vocabulary";

export const loader = async ({ params }: Route.LoaderArgs) => {
	const verbId = Number(params.verbId);

	if (Number.isNaN(verbId)) {
		throw new Response("Invalid verb ID", { status: 400 });
	}

	const verb = await getVerbWithConjugations(verbId);

	if (!verb) {
		throw new Response("Verb not found", { status: 404 });
	}

	return { verb };
};
