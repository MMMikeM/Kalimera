// Side-effect import to enable TanStack Start server route type augmentations
import "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";

import { getUserMilestones, recordMilestone } from "@/server/db/queries/milestones-achieved";

interface RecordMilestoneBody {
	userId: number;
	milestone: number;
	streak: number;
}

export const Route = createFileRoute("/api/milestones")({
	server: {
		handlers: {
			/**
			 * GET /api/milestones?userId=<id>
			 * Get all milestones achieved by a user
			 */
			GET: async ({ request }) => {
				const url = new URL(request.url);
				const userIdParam = url.searchParams.get("userId");

				if (!userIdParam) {
					return Response.json({ error: "Missing userId" }, { status: 400 });
				}

				const userId = Number.parseInt(userIdParam, 10);
				if (Number.isNaN(userId)) {
					return Response.json({ error: "Invalid userId" }, { status: 400 });
				}

				try {
					const milestones = await getUserMilestones(userId);
					return Response.json({ milestones });
				} catch (error) {
					console.error("Get milestones error:", error);
					return Response.json({ error: "Failed to get milestones" }, { status: 500 });
				}
			},

			/**
			 * POST /api/milestones
			 * Record a milestone achievement
			 */
			POST: async ({ request }) => {
				try {
					const body = (await request.json()) as RecordMilestoneBody;
					const { userId, milestone, streak } = body;

					if (!userId || !milestone || !streak) {
						return Response.json(
							{ error: "Missing required fields: userId, milestone, streak" },
							{ status: 400 },
						);
					}

					const result = await recordMilestone({
						userId,
						milestone,
						streakAtAchievement: streak,
					});
					return Response.json({ success: true, recorded: result !== null });
				} catch (error) {
					console.error("Record milestone error:", error);
					return Response.json({ error: "Failed to record milestone" }, { status: 500 });
				}
			},
		},
	},
});
