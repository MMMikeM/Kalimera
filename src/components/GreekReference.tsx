import React, { useState } from "react";
import {
	BookOpen,
	Clock,
	FileText,
	Lightbulb,
	Search,
	Users,
	Download,
	X,
} from "lucide-react";
// Config and navigation
import { TABS, DEFAULT_TAB } from "../constants/config";
import type { TabId } from "../types/greek-reference";
import { Button } from "./ui";
import { exportOptions, downloadMarkdown } from "../utils/markdown-export";

// Section components
import ArticlesAndCases from "./ArticlesAndCases";
import PresentTense from "./PresentTense";
import OtherTenses from "./OtherTenses";
import EssentialWords from "./EssentialWords";
import SearchWords from "./SearchWords";

const GreekReference: React.FC = () => {
	const [activeTab, setActiveTab] = useState<TabId>(DEFAULT_TAB);
	const [showExportModal, setShowExportModal] = useState(false);

	// Helper function to get icon component
	const getIcon = (iconName: string) => {
		const iconMap = {
			Search: <Search size={16} />,
			BookOpen: <BookOpen size={16} />,
			Users: <Users size={16} />,
			Clock: <Clock size={16} />,
			FileText: <FileText size={16} />,
		};
		return iconMap[iconName as keyof typeof iconMap] || null;
	};

	// Handle export
	const handleExport = (optionId: string) => {
		const option = exportOptions.find((opt) => opt.id === optionId);
		if (option) {
			const content = option.exportFunction();
			downloadMarkdown(content, option.filename);
			setShowExportModal(false);
		}
	};

	const renderContent = () => {
		switch (activeTab) {
			case "articles":
				return <ArticlesAndCases />;
			case "present":
				return <PresentTense />;
			case "other-tenses":
				return <OtherTenses />;
			case "vocabulary":
				return <EssentialWords />;
			case "search":
				return <SearchWords />;
			default:
				return <ArticlesAndCases />;
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
			<div className="max-w-7xl mx-auto p-6">
				<header className="text-center mb-12 pt-8 relative">
					<div className="absolute top-4 right-4">
						<Button
							onClick={() => setShowExportModal(true)}
							variant="secondary"
							size="md"
							className="shadow-lg"
						>
							<Download size={16} />
							Export as Markdown
						</Button>
					</div>

					<div className="relative">
						<h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 leading-tight">
							Greek Conjugation Reference
						</h1>
						<div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-lg opacity-5 blur-xl"></div>
					</div>
					<p className="text-xl text-gray-600 font-medium mt-4 max-w-2xl mx-auto leading-relaxed">
						Your comprehensive pattern-based guide to Greek grammar
					</p>
				</header>

				<nav className="mb-10">
					<div className="flex flex-wrap gap-3 justify-center p-2 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
						{TABS.map((tab) => (
							<Button
								key={tab.id}
								onClick={() => setActiveTab(tab.id as TabId)}
								active={activeTab === tab.id}
								variant="secondary"
								size="lg"
								className="shadow-sm"
							>
								{getIcon(tab.icon)}
								{tab.label}
							</Button>
						))}
					</div>
				</nav>

				<main className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/30 p-8 mb-8">
					{renderContent()}
				</main>

				<footer className="text-center mt-8 mb-8">
					<div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-6 shadow-lg border border-white/30">
						<p className="text-lg text-gray-700 font-medium">
							💡 Remember: Patterns over memorization! Once you know the family,
							you know the conjugation.
						</p>
					</div>
				</footer>

				{/* Export Modal */}
				{showExportModal && (
					<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
						<div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
							<div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
								<div className="flex justify-between items-center">
									<h2 className="text-2xl font-bold">Export as Markdown</h2>
									<Button
										onClick={() => setShowExportModal(false)}
										variant="ghost"
										size="sm"
										className="text-white hover:bg-white/20"
									>
										<X size={20} />
									</Button>
								</div>
								<p className="mt-2 text-blue-100">
									Choose what to export for offline study or sharing
								</p>
							</div>

							<div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
								{exportOptions.map((option) => (
									<div
										key={option.id}
										className="border rounded-lg p-4 hover:shadow-lg transition-all duration-200 cursor-pointer group"
										onClick={() => handleExport(option.id)}
									>
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-3">
												<div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
													<FileText size={20} className="text-blue-600" />
												</div>
												<div>
													<h3 className="font-semibold text-gray-900 group-hover:text-blue-600">
														{option.label}
													</h3>
													<p className="text-sm text-gray-500">
														{option.filename}
													</p>
												</div>
											</div>
											<Download
												size={16}
												className="text-gray-400 group-hover:text-blue-600 transition-colors"
											/>
										</div>
									</div>
								))}
							</div>

							<div className="bg-gray-50 p-6 border-t">
								<div className="flex items-start gap-3">
									<div className="p-2 bg-yellow-100 rounded-lg">
										<Lightbulb size={16} className="text-yellow-600" />
									</div>
									<div className="text-sm text-gray-600">
										<p className="font-medium mb-1">📝 Perfect for:</p>
										<ul className="space-y-1 text-xs">
											<li>
												• Offline study with markdown apps (Obsidian, Notion)
											</li>
											<li>• Sharing with other Greek learners</li>
											<li>• Creating printable study materials</li>
											<li>• Backing up your reference content</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default GreekReference;
