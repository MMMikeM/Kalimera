import { getVerbWithConjugations } from "@/db.server/queries/vocabulary";
import type { Route } from "./+types/route";

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
