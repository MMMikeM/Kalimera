import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { GreekText } from "@/components/GreekText";

export const FirstTimeUserCTA = () => (
	<div className="rounded-2xl border border-stone-200 bg-cream py-8 text-center">
		<GreekText as="p" size="3xl" tone="inherit" className="mb-2 font-serif text-navy">
			Καλώς ήρθες!
		</GreekText>
		<p className="mb-6 text-lg text-stone-600">Let's learn your first Greek words.</p>
		<Link
			to="/practice"
			className="inline-flex items-center gap-2 rounded-xl bg-terracotta px-8 py-4 font-semibold text-white shadow-md transition-colors hover:bg-terracotta-dark"
		>
			Begin Learning
			<ArrowRight className="h-5 w-5" />
		</Link>
		<p className="mt-4 text-sm text-stone-500">~2 min to get started</p>
	</div>
);
