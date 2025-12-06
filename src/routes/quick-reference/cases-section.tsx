import { ChevronDown, Lightbulb, Target } from "lucide-react";
import type React from "react";
import { CASE_RECOGNITION } from "../../constants/recognition";
import { Card, MonoText } from "../../components";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export const CasesSection: React.FC = () => (
	<section id="cases" className="space-y-6">
		<div>
			<h2 className="text-2xl font-bold text-gray-800">Cases</h2>
			<p className="text-gray-600 mt-1">The framework that explains why words change</p>
		</div>

		<Alert variant="info">
			<Lightbulb size={16} />
			<AlertTitle>The Three Questions</AlertTitle>
			<AlertDescription>
				Greek uses cases to show a word's role. Master these three questions and you'll know which case to use.
			</AlertDescription>
		</Alert>

		<Card
			variant="elevated"
			padding="lg"
			className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200"
		>
			<div className="grid md:grid-cols-3 gap-4">
				{CASE_RECOGNITION.quickRules.map((rule, index) => (
					<div key={index} className="text-center p-4 bg-white rounded-xl shadow-sm">
						<div className="text-lg font-bold text-gray-800 mb-2">{rule.question}</div>
						<div className="text-blue-600 font-semibold mb-2">{rule.answer}</div>
						<MonoText variant="highlighted" size="sm">{rule.example}</MonoText>
					</div>
				))}
			</div>
		</Card>

		<Collapsible>
			<CollapsibleTrigger className="flex items-center gap-2 w-full p-3 rounded-lg bg-amber-50 hover:bg-amber-100 transition-colors text-left group border border-amber-200">
				<Target size={18} className="text-amber-600" />
				<span className="font-medium text-amber-800">Quick Spot-Check Patterns</span>
				<ChevronDown size={16} className="ml-auto text-amber-600 transition-transform group-data-[state=open]:rotate-180" />
			</CollapsibleTrigger>
			<CollapsibleContent>
				<div className="mt-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
					{CASE_RECOGNITION.quickSpotCheck?.map((check, index) => (
						<div key={index} className="p-4 bg-white rounded-xl shadow-sm border border-amber-200">
							<div className="text-lg font-bold text-amber-800 mb-2">{check.pattern}</div>
							<div className="text-amber-600 font-medium mb-3 text-sm">→ {check.meaning}</div>
							<div className="space-y-1">
								{check.examples.map((example, i) => (
									<MonoText key={i} variant="warning" size="sm" className="block">{example}</MonoText>
								))}
							</div>
						</div>
					))}
				</div>
			</CollapsibleContent>
		</Collapsible>
	</section>
);
