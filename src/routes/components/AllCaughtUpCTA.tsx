import { Link } from "@tanstack/react-router";
import { Check, Sparkles } from "lucide-react";

export const AllCaughtUpCTA = ({ newAvailable }: { newAvailable: number }) => (
	<div className="rounded-2xl border border-olive-200 bg-olive-50 py-8 text-center">
		<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-olive-100">
			<Check className="h-8 w-8 text-olive" />
		</div>
		<p className="greek-text font-serif text-2xl text-olive">Μπράβο!</p>
		<p className="mt-1 text-lg text-stone-700">All caught up</p>
		<p className="mt-2 text-sm text-stone-500">
			No rusty drills right now. Check back later or learn something new.
		</p>
		{newAvailable > 0 && (
			<Link
				to="/practice"
				className="mt-6 inline-flex items-center gap-2 rounded-xl border border-ocean-300 bg-ocean-100 px-6 py-3 font-medium text-ocean transition-colors hover:bg-ocean-200"
			>
				<Sparkles className="h-4 w-4" />
				Learn {Math.min(5, newAvailable)} new items
			</Link>
		)}
	</div>
);
