import { Zap } from "lucide-react";
import { useNavigate } from "react-router";

import { Card } from "@/components/Card";
import { Button } from "@/components/ui/button";

export default function SpeedIndex() {
	const navigate = useNavigate();

	return (
		<div className="mx-auto max-w-xl">
			<Card variant="bordered" padding="lg" className="text-center">
				<div className="py-8">
					<div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-terracotta-100">
						<Zap size={32} className="text-terracotta" />
					</div>
					<h2 className="mb-2 text-2xl font-bold">Speed Drill</h2>
					<p className="mb-8 text-stone-600">
						Rapid-fire production practice. Type fast, build automaticity.
					</p>

					<div className="space-y-3">
						<Button
							onClick={() => navigate("vocab")}
							className="w-full gap-2"
							size="lg"
						>
							<Zap size={20} />
							Vocabulary Drills
						</Button>
						<Button
							onClick={() => navigate("grammar")}
							className="w-full gap-2"
							size="lg"
							variant="outline"
						>
							<Zap size={20} />
							Grammar Exercises
						</Button>
					</div>
				</div>
			</Card>
		</div>
	);
}
