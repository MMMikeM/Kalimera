import { Link, getRouteApi, useRouterState } from "@tanstack/react-router";
import { BookOpen, Compass, FileText, Home, Zap } from "lucide-react";

const rootRoute = getRouteApi("__root__");

// /practice needs an account; a visitor's Practice tab is the anonymous /try drill,
// the same place the desktop header's "Try a drill" button goes.
const navItems = (isAuthenticated: boolean) => [
	{ id: "home", label: "Home", path: "/", icon: Home, sections: ["home"] },
	{
		id: "practice",
		label: "Practice",
		path: isAuthenticated ? "/practice" : "/try",
		icon: Zap,
		sections: ["practice", "try"],
	},
	{ id: "learn", label: "Learn", path: "/learn", icon: BookOpen, sections: ["learn"] },
	{ id: "guides", label: "Guides", path: "/guides", icon: Compass, sections: ["guides"] },
	{ id: "reference", label: "Reference", path: "/reference", icon: FileText, sections: ["reference"] },
];

export function MobileNav() {
	const routerState = useRouterState();
	const pathname = routerState.location.pathname;
	const currentSection = pathname.split("/")[1] || "home";
	const { auth } = rootRoute.useRouteContext();

	return (
		<nav className="safe-area-pb fixed right-0 bottom-0 left-0 z-50 border-t border-stone-200 bg-cream/95 px-4 py-2 backdrop-blur-sm md:hidden">
			<div className="mx-auto flex max-w-md items-center justify-around">
				{navItems(auth !== null).map((item) => {
					const Icon = item.icon;
					const isActive = item.sections.includes(currentSection);
					return (
						<Link
							key={item.id}
							to={item.path}
							className={`flex flex-col items-center gap-1 rounded-xl px-4 py-2 transition-all ${
								isActive ? "bg-terracotta/10 text-terracotta-700 dark:text-terracotta-text" : "text-stone-600"
							}`}
						>
							<Icon size={22} strokeWidth={1.5} />
							<span className="text-xs font-medium">{item.label}</span>
						</Link>
					);
				})}
			</div>
		</nav>
	);
}
