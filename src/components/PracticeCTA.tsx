import { Zap } from "lucide-react";
import { Link } from "react-router";
import { Card } from "@/components/Card";
import { Button } from "@/components/ui/button";

interface PracticeCTAProps {
	title?: string;
	description?: string;
	topic?: string;
}

export const PracticeCTA = ({
	title = "Ready to practice?",
	description = "Turn knowledge into fluency with timed retrieval drills.",
	topic: _topic,
}: PracticeCTAProps) => {
	return (
		<Card className="bg-terracotta/5 border-terracotta/20">
			<div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
				<div className="w-12 h-12 rounded-full bg-terracotta/10 flex items-center justify-center flex-shrink-0">
					<Zap size={24} className="text-terracotta" />
				</div>
				<div className="flex-1 text-center sm:text-left">
					<h3 className="font-medium text-stone-800 mb-1">{title}</h3>
					<p className="text-sm text-stone-600">{description}</p>
				</div>
				<Link to="/register" className="flex-shrink-0">
					<Button variant="primary">Try a Drill</Button>
				</Link>
			</div>
		</Card>
	);
};
