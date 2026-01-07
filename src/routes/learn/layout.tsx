import { Outlet } from "react-router";

export function meta() {
	return [
		{ title: "Learn - Greek Learning" },
		{
			name: "description",
			content: "Browse conversations, phrases, and vocabulary",
		},
	];
}

export default function LearnLayout() {
	return <Outlet />;
}
