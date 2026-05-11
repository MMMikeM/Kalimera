import { Link, useNavigate } from "@tanstack/react-router";
import { BarChart3, Info, LogOut, Search, User } from "lucide-react";
import { useState } from "react";

import { GlobalSearch } from "@/components/GlobalSearch";
import {
	Popover,
	PopoverContent,
	PopoverPositioner,
	PopoverTrigger,
} from "@/components/ui/popover";

export function MobileHeader({
	isAuthenticated,
	onLogout,
}: {
	isAuthenticated: boolean;
	onLogout: () => void;
}) {
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();

	return (
		<header className="flex items-center justify-between px-1 py-3 md:hidden">
			<Link to="/" className="flex items-baseline">
				<span className="font-serif text-xl text-terracotta">Kalimera</span>
			</Link>
			<div className="flex items-center gap-1">
				<GlobalSearch>
					{({ isActive }) => (
						<span
							className={`flex items-center justify-center rounded-lg p-2 transition-colors ${
								isActive
									? "bg-terracotta/10 text-terracotta"
									: "text-stone-500 hover:text-stone-700"
							}`}
						>
							<Search size={20} strokeWidth={1.5} />
						</span>
					)}
				</GlobalSearch>
				{isAuthenticated && (
					<Popover open={isOpen} onOpenChange={setIsOpen}>
						<PopoverTrigger
							render={
								<button
									type="button"
									className={`rounded-lg p-2 shadow-none ring-0 outline-transparent transition-colors outline-none ${
										isOpen
											? "bg-terracotta/10 text-terracotta"
											: "text-stone-500 hover:text-stone-700"
									}`}
								/>
							}
						>
							<User size={20} strokeWidth={1.5} />
						</PopoverTrigger>
						<PopoverPositioner align="end" sideOffset={8}>
							<PopoverContent className="w-48 p-1">
								<button
									type="button"
									onClick={() => {
										setIsOpen(false);
										navigate({ to: "/progress" });
									}}
									className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-stone-100"
								>
									<BarChart3 size={16} strokeWidth={1.5} className="text-stone-500" />
									<span className="text-stone-800">Progress</span>
								</button>
								<button
									type="button"
									onClick={() => {
										setIsOpen(false);
										navigate({ to: "/support" });
									}}
									className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-stone-100"
								>
									<Info size={16} strokeWidth={1.5} className="text-stone-500" />
									<span className="text-stone-800">About</span>
								</button>
								<div className="my-1 border-t border-stone-200" />
								<button
									type="button"
									onClick={() => {
										setIsOpen(false);
										onLogout();
									}}
									className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-stone-100"
								>
									<LogOut size={16} strokeWidth={1.5} className="text-stone-500" />
									<span className="text-stone-800">Sign Out</span>
								</button>
							</PopoverContent>
						</PopoverPositioner>
					</Popover>
				)}
				{!isAuthenticated && (
					<Link
						to="/login"
						className="px-3 py-1.5 text-sm font-medium text-stone-600 hover:text-stone-800"
					>
						Sign In
					</Link>
				)}
			</div>
		</header>
	);
}
