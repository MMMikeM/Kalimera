import { Link } from "react-router";
import { Palette, ChevronLeft } from "lucide-react";
import { Card } from "@/components/Card";
import { MonoText } from "@/components/MonoText";
import type { EssentialsLoaderData } from "../data.server";

interface Props {
	data: EssentialsLoaderData;
}

const COLOUR_HEX: Record<string, string> = {
	άσπρο: "#ffffff",
	μαύρο: "#1c1917",
	κόκκινο: "#dc2626",
	κίτρινο: "#facc15",
	μπλε: "#2563eb",
	πράσινο: "#16a34a",
	πορτοκαλί: "#f97316",
	μωβ: "#a855f7",
	γκρι: "#78716c",
	καφέ: "#78350f",
	"σκούρο μπλε": "#1e3a5f",
	ροζ: "#ec4899",
};

const COLOUR_PAIRS = [["άσπρο", "μαύρο"]];

function ColourSwatch({ greek }: { greek: string }) {
	const hex = COLOUR_HEX[greek] ?? "#9ca3af";
	const isLight = greek === "άσπρο" || greek === "κίτρινο";

	return (
		<span
			className={`w-4 h-4 rounded-full inline-block shrink-0 ${isLight ? "border border-stone-300" : ""}`}
			style={{ backgroundColor: hex }}
		/>
	);
}

export function ColoursSubtab({ data }: Props) {
	const pairedColours: Array<{
		left: (typeof data.colors)[0] | null;
		right: (typeof data.colors)[0] | null;
	}> = [];
	const usedIds = new Set<number>();

	for (const [leftGreek, rightGreek] of COLOUR_PAIRS) {
		const left = data.colors.find((c) => c.greek === leftGreek) || null;
		const right = data.colors.find((c) => c.greek === rightGreek) || null;
		if (left || right) {
			pairedColours.push({ left, right });
			if (left) usedIds.add(left.id);
			if (right) usedIds.add(right.id);
		}
	}

	const unpaired = data.colors.filter((c) => !usedIds.has(c.id));

	return (
		<div className="space-y-6">
			<Link
				to="/learn/vocabulary/essentials"
				className="inline-flex items-center gap-1 text-sm text-stone-600 hover:text-stone-900"
			>
				<ChevronLeft size={16} />
				Essentials
			</Link>

			<Card
				variant="bordered"
				padding="lg"
				className="bg-terracotta-50 border-terracotta-300"
			>
				<div className="flex items-center gap-3 mb-4">
					<div className="p-2 rounded-lg bg-terracotta-200">
						<Palette size={20} className="text-terracotta-text" />
					</div>
					<h3 className="text-lg font-bold text-terracotta-text">Colours</h3>
				</div>

				{pairedColours.length > 0 && (
					<div className="space-y-2 mb-4">
						<p className="text-xs text-stone-500 uppercase tracking-wide font-medium">
							Opposites
						</p>
						{pairedColours.map((pair) => (
							<div
								key={`${pair.left?.id ?? "empty"}-${pair.right?.id ?? "empty"}`}
								className="grid grid-cols-2 gap-4 p-3 bg-white rounded-lg border border-terracotta-200"
							>
								{pair.left ? (
									<div className="flex items-center gap-2">
										<ColourSwatch greek={pair.left.greek} />
										<MonoText variant="greek" size="md">
											{pair.left.greek}
										</MonoText>
										<span className="text-stone-600 text-sm">
											{pair.left.english}
										</span>
									</div>
								) : (
									<div />
								)}
								{pair.right ? (
									<div className="flex items-center gap-2">
										<span className="text-stone-400 mr-1">↔</span>
										<ColourSwatch greek={pair.right.greek} />
										<MonoText variant="greek" size="md">
											{pair.right.greek}
										</MonoText>
										<span className="text-stone-600 text-sm">
											{pair.right.english}
										</span>
									</div>
								) : (
									<div />
								)}
							</div>
						))}
					</div>
				)}

				{unpaired.length > 0 && (
					<div className="grid md:grid-cols-3 gap-3">
						{unpaired.map((color) => (
							<div key={color.id} className="flex items-center gap-2">
								<ColourSwatch greek={color.greek} />
								<MonoText variant="greek" size="md">
									{color.greek}
								</MonoText>
								<span className="text-stone-600 text-sm">{color.english}</span>
							</div>
						))}
					</div>
				)}
			</Card>
		</div>
	);
}
