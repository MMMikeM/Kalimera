import { Outlet } from "react-router";

export function meta() {
	return [
		{ title: "Reference - Greek Grammar" },
		{
			name: "description",
			content: "Grammar patterns and paradigms",
		},
	];
}

export default function ReferenceLayout() {
	return <Outlet />;
}
