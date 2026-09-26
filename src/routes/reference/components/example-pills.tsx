import { GreekText } from "@/components/GreekText";

/** A wrapping row of rounded "greek (english)" chips. */
export const ExamplePills = ({
	examples,
	greekClassName,
	borderClassName = "border-stone-200",
	englishClassName = "text-stone-600",
}: {
	examples: ReadonlyArray<{ greek: string; english: string }>;
	greekClassName: string;
	borderClassName?: string;
	englishClassName?: string;
}) => (
	<div className="flex flex-wrap gap-2">
		{examples.map((ex) => (
			<div
				key={ex.greek}
				className={`rounded-full border ${borderClassName} bg-card px-3 py-1.5 text-sm`}
			>
				<GreekText tone="inherit" size="sm" className={greekClassName}>
					{ex.greek}
				</GreekText>
				<span className={`ml-1 ${englishClassName}`}>({ex.english})</span>
			</div>
		))}
	</div>
);
