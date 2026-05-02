import { ChevronLeft } from "lucide-react";
import { Link } from "react-router";

export function EssentialsBackLink() {
	return (
		<Link
			to="/learn/essentials"
			className="inline-flex items-center gap-1 text-sm text-stone-600 hover:text-stone-900"
		>
			<ChevronLeft size={16} />
			Essentials
		</Link>
	);
}
