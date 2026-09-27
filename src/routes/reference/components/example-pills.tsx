import { GreekText } from "@/components/GreekText";
import { MarkedGreek } from "@/components/MarkedGreek";
import type { NominalCase } from "@/server/db/enums";

interface Example {
	greek: string;
	english: string;
	/** The words that carry the case; only these take the case colour. */
	marked?: string;
}

/** A wrapping row of rounded "greek (english)" chips. */
export const ExamplePills = ({
	examples,
	tone,
	greekClassName,
	borderClassName = "border-stone-200",
	englishClassName = "text-stone-600",
}: {
	examples: ReadonlyArray<Example>;
	/** Colours each example's marked words in this case; omit for neutral Greek. */
	tone?: NominalCase;
	greekClassName?: string;
	borderClassName?: string;
	englishClassName?: string;
}) => (
	<div className="flex flex-wrap gap-2">
		{examples.map((ex) => (
			<div
				key={ex.greek}
				className={`rounded-full border ${borderClassName} bg-card px-3 py-1.5 text-sm`}
			>
				{tone && ex.marked ? (
					<MarkedGreek greek={ex.greek} marked={ex.marked} tone={tone} size="sm" />
				) : (
					<GreekText tone="inherit" size="sm" className={greekClassName}>
						{ex.greek}
					</GreekText>
				)}
				<span className={`ml-1 ${englishClassName}`}>({ex.english})</span>
			</div>
		))}
	</div>
);
