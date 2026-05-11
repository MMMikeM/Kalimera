import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, FileText, Home, Zap } from "lucide-react";

const MOBILE_NAV_ITEMS = [
	{ id: "home", label: "Home", path: "/", icon: Home },
	{ id: "practice", label: "Practice", path: "/practice/vocab", icon: Zap },
	{ id: "learn", label: "Learn", path: "/learn", icon: BookOpen },
	{ id: "reference", label: "Reference", path: "/reference", icon: FileText },
];

export function MobileNav() {
	const routerState = useRouterState();
	const pathname = routerState.location.pathname;
	const currentSection = pathname.split("/")[1] || "home";

	return (
		<nav className="safe-area-pb fixed right-0 bottom-0 left-0 z-50 border-t border-stone-200 bg-cream/95 px-4 py-2 backdrop-blur-sm md:hidden">
			<div className="mx-auto flex max-w-md items-center justify-around">
				{MOBILE_NAV_ITEMS.map((item) => {
					const Icon = item.icon;
					const isActive = currentSection === item.id;
					return (
						<Link
							key={item.id}
							to={item.path}
							className={`flex flex-col items-center gap-1 rounded-xl px-4 py-2 transition-all ${
								isActive ? "bg-terracotta/10 text-terracotta" : "text-stone-500"
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
