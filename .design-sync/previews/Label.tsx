import { Input, Label } from "kalimera";

export const AboveAnInput = () => (
	<div className="max-w-sm space-y-2 p-4">
		<Label htmlFor="display-name">Display name</Label>
		<Input id="display-name" defaultValue="Eleni" />
	</div>
);

export const Disabled = () => (
	<div className="group max-w-sm space-y-2 p-4" data-disabled="true">
		<Label htmlFor="username-locked">Username</Label>
		<Input id="username-locked" defaultValue="eleni" disabled />
	</div>
);

export const BesideACheckbox = () => (
	<div className="max-w-sm space-y-3 p-4">
		<div className="flex items-center gap-2">
			<input id="show-gloss" type="checkbox" defaultChecked className="peer size-4" style={{ accentColor: "var(--color-primary)" }} />
			<Label htmlFor="show-gloss">Show the pronunciation gloss</Label>
		</div>
		<div className="flex items-center gap-2">
			<input id="show-english" type="checkbox" disabled className="peer size-4" style={{ accentColor: "var(--color-primary)" }} />
			<Label htmlFor="show-english">Show English first</Label>
		</div>
	</div>
);
