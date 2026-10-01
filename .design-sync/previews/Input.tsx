import { Input, Label } from "kalimera";

export const Default = () => (
	<div className="max-w-sm p-4">
		<Input placeholder="Type the Greek" aria-label="Answer" />
	</div>
);

export const WithGreek = () => (
	<div className="max-w-sm p-4">
		<Input lang="el" defaultValue="καλημέρα" aria-label="Answer" />
	</div>
);

export const WithLabel = () => (
	<div className="max-w-sm space-y-2 p-4">
		<Label htmlFor="display-name">Display name</Label>
		<Input id="display-name" defaultValue="Eleni" />
	</div>
);

export const Invalid = () => (
	<div className="max-w-sm space-y-2 p-4">
		<Input aria-invalid defaultValue="kalimera!" aria-label="Username" />
		<p className="text-sm text-incorrect-text">Letters, numbers and underscores only.</p>
	</div>
);

export const Disabled = () => (
	<div className="max-w-sm p-4">
		<Input disabled placeholder="Type the Greek" aria-label="Answer" />
	</div>
);
