import type React from "react";
import { FUTURE_TENSE_EXAMPLES, PAST_TENSE_EXAMPLES } from "../constants/verbs";
import { InfoBox, Table } from "./ui";

const OtherTenses: React.FC = () => {
	return (
		<div className="space-y-6">
			<InfoBox variant="purple" title="Future Reference - Key Patterns">
				These follow the same base patterns as present tense, just with
				different markers.
			</InfoBox>

			<div className="grid md:grid-cols-2 gap-6">
				<div className="border rounded-lg p-4">
					<h3 className="text-lg font-bold mb-3">
						Simple Future (θα + present)
					</h3>
					<div className="bg-blue-50 p-3 rounded mb-3">
						<p>
							<strong>Formula:</strong> θα + present tense forms
						</p>
					</div>
					<Table
						headers={["Person", "θα κάνω", "English"]}
						rows={FUTURE_TENSE_EXAMPLES.map((conj) => [
							conj.person,
							conj.form,
							conj.english,
						])}
					/>
				</div>

				<div className="border rounded-lg p-4">
					<h3 className="text-lg font-bold mb-3">
						Past Simple - Basic Pattern
					</h3>
					<div className="bg-green-50 p-3 rounded mb-3">
						<p>
							<strong>Key:</strong> Often starts with έ- and changes endings
						</p>
					</div>
					<Table
						headers={["Person", "έκανα", "English"]}
						rows={PAST_TENSE_EXAMPLES.map((conj) => [
							conj.person,
							conj.form,
							conj.english,
						])}
					/>
				</div>
			</div>

			<div className="bg-yellow-50 p-4 rounded-lg">
				<h4 className="font-bold text-yellow-800 mb-2">
					🎯 Focus on Present First!
				</h4>
				<p className="text-yellow-700">
					Master the present tense patterns before diving deep into other
					tenses. The same verb families apply - just with different time
					markers.
				</p>
			</div>
		</div>
	);
};

export default OtherTenses;
