import { Zap } from "lucide-react";
import { useNavigate } from "react-router";

import { Card } from "@/components/Card";
import { Button } from "@/components/ui/button";

export default function SpeedIndex() {
	const navigate = useNavigate();

	return (
		<div className="mx-auto max-w-xl">
			<Card variant="bordered" padding="lg">
				<div className="mb-8 flex flex-col">
					<div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-terracotta-100">
						<Zap size={32} className="text-terracotta" />
					</div>
					<h2 className="mb-2 font-serif text-xl font-semibold text-navy-text">Speed Drill</h2>
					<p className="text-sm text-muted-foreground">
						Production practice. Recover forms until they no longer require effort.
					</p>
				</div>

				<div className="space-y-3">
					<Button onClick={() => navigate("vocab")} className="w-full" size="lg">
						Vocabulary Drills
					</Button>
					<Button
						onClick={() => navigate("grammar")}
						className="w-full"
						size="lg"
						variant="outline"
					>
						Grammar Exercises
					</Button>
				</div>
			</Card>
		</div>
	);
}
