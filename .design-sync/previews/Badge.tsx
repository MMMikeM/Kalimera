import { Badge, GreekText } from "kalimera";

export const VerbHeader = () => (
	<div className="max-w-sm space-y-2 p-4">
		<GreekText as="p" size="3xl">
			βλέπω
		</GreekText>
		<p className="text-stone-600">to see</p>
		<div className="flex flex-wrap items-center gap-2">
			<Badge variant="primary" size="md">
				-ω verbs
			</Badge>
			<Badge variant="warning" size="md">
				Suppletive
			</Badge>
		</div>
	</div>
);

export const SearchResult = () => (
	<div className="max-w-sm space-y-2 p-4">
		<div className="flex flex-wrap items-center gap-2">
			<GreekText size="xl">μιλάω</GreekText>
			<span className="text-stone-600">to speak</span>
		</div>
		<div className="flex flex-wrap items-center gap-2">
			<Badge variant="default" size="md">
				verb
			</Badge>
			<Badge variant="primary" size="md">
				-άω verbs
			</Badge>
		</div>
		<div className="flex flex-wrap items-center gap-2">
			<Badge variant="secondary" size="sm">
				conversation
			</Badge>
			<Badge variant="secondary" size="sm">
				everyday
			</Badge>
		</div>
	</div>
);

export const Variants = () => (
	<div className="flex flex-wrap items-center gap-2 p-4">
		<Badge variant="default">noun</Badge>
		<Badge variant="primary">-ω verbs</Badge>
		<Badge variant="secondary">food</Badge>
		<Badge variant="success">-ομαι verbs</Badge>
		<Badge variant="warning">Irregular</Badge>
		<Badge variant="error">Missed</Badge>
		<Badge variant="destructive">Reset</Badge>
		<Badge variant="outline">A1</Badge>
	</div>
);

export const Sizes = () => (
	<div className="flex flex-wrap items-center gap-2 p-4">
		<Badge variant="secondary" size="xs">
			-άω verbs
		</Badge>
		<Badge variant="secondary" size="sm">
			-άω verbs
		</Badge>
		<Badge variant="secondary" size="md">
			-άω verbs
		</Badge>
		<Badge variant="secondary" size="lg">
			-άω verbs
		</Badge>
	</div>
);
