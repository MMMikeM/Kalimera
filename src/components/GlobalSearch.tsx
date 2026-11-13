import { type ReactNode, useState } from "react";

import { SearchPanel } from "@/components/SearchPanel";
import {
	Popover,
	PopoverContent,
	PopoverPositioner,
	PopoverTrigger,
} from "@/components/ui/popover";

interface GlobalSearchProps {
	/** Render prop for custom trigger - receives isActive state */
	children: (props: { isActive: boolean }) => ReactNode;
}

export const GlobalSearch = ({ children }: GlobalSearchProps) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger
				render={
					<button
						type="button"
						aria-label="Search"
						className="rounded-md outline-none focus-visible:ring-2 focus-visible:ring-terracotta-300"
					/>
				}
			>
				{children({ isActive: isOpen })}
			</PopoverTrigger>
			<PopoverPositioner align="end" sideOffset={8}>
				<PopoverContent className="w-popover-clamp rounded-xl border-stone-200 bg-cream p-3 shadow-lg data-[closed]:animate-none data-[open]:animate-none">
					<SearchPanel variant="inline" focusOnMount onActivate={() => setIsOpen(false)} />
				</PopoverContent>
			</PopoverPositioner>
		</Popover>
	);
};
