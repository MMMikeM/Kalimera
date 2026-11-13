import { ArrowLink } from "@/components/ArrowLink";
import { ProseWithGreek } from "@/components/ProseWithGreek";

import { TAUGHT_IN } from "../../tables/taught-in.data";

export function GuideLink({ to }: { to: keyof typeof TAUGHT_IN }) {
	const { guide, section, title } = TAUGHT_IN[to];
	return (
		<ArrowLink to="/guides/$guide" params={{ guide }} hash={section} className="mx-3">
			<span>
				How these change: <ProseWithGreek text={title} />
			</span>
		</ArrowLink>
	);
}
