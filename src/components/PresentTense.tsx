import React from "react";
import { Lightbulb } from "lucide-react";
import { VERB_CONJUGATIONS } from "../constants/verbs";
import type { VerbConjugation } from "../types/greek-reference";
import { Card, InfoBox, MonoText, Table } from "./ui";

const PresentTense: React.FC = () => {
	// Helper function to render highlighted verb forms
	const renderVerbForm = (conjugation: VerbConjugation, colorClass: string) => {
		if (!conjugation.highlighted) {
			return <MonoText>{conjugation.form}</MonoText>;
		}

		const parts = conjugation.form.split(conjugation.highlighted);
		return (
			<MonoText>
				{parts[0]}
				<span className={colorClass}>{conjugation.highlighted}</span>
				{parts[1]}
			</MonoText>
		);
	};

	return (
		<div className="space-y-10">
			<InfoBox
				variant="purple"
				title="Two Main Families"
				icon={<Lightbulb size={20} />}
			>
				Almost every Greek verb fits into one of these two patterns!
			</InfoBox>

			<div className="grid lg:grid-cols-2 gap-8">
				<Card variant="bordered" padding="lg">
					<h3 className="text-xl font-bold mb-4 text-blue-600">
						Family 1: Active (-ω verbs)
					</h3>

					<InfoBox variant="info" size="sm" title="🎵 The Rhythm">
						<MonoText variant="highlighted" size="lg">
							-ω, -εις, -ει, -ουμε, -ετε, -ουν(ε)
						</MonoText>
					</InfoBox>

					<div className="mt-6 space-y-6">
						<Table
							title="Type A: κάνω (I do) - stress on stem"
							rows={VERB_CONJUGATIONS.kano.map((conj) => [
								conj.person,
								renderVerbForm(conj, "bg-blue-200"),
								conj.english,
							])}
						/>

						<Table
							title="Type B: μιλάω (I speak) - stress on ending"
							rows={VERB_CONJUGATIONS.milao.map((conj) => [
								conj.person,
								renderVerbForm(conj, "bg-blue-200"),
								conj.english,
							])}
						/>
					</div>
				</Card>

				<div className="border rounded-lg p-4">
					<h3 className="text-lg font-bold mb-3 text-green-600">
						Family 2: Passive (-ομαι verbs)
					</h3>

					<div className="bg-green-50 p-3 rounded mb-4">
						<h4 className="font-bold">🎵 The Rhythm:</h4>
						<p className="font-mono text-lg">
							-ομαι, -εσαι, -εται, -όμαστε, -εστε, -ονται
						</p>
					</div>

					<h4 className="font-semibold mb-2">Type A: έρχομαι (I come)</h4>
					<Table
						rows={VERB_CONJUGATIONS.erhomai.map((conj) => [
							conj.person,
							renderVerbForm(conj, "bg-green-200"),
							conj.english,
						])}
						className="mb-4"
					/>

					<h4 className="font-semibold mb-2">Type B: θυμάμαι (I remember)</h4>
					<Table
						rows={VERB_CONJUGATIONS.thymamai.map((conj) => [
							conj.person,
							renderVerbForm(conj, "bg-green-200"),
							conj.english,
						])}
					/>
				</div>
			</div>

			<div className="bg-orange-50 p-4 rounded-lg">
				<h4 className="font-bold text-orange-800 mb-2">🧠 Memory Tips</h4>
				<div className="grid md:grid-cols-2 gap-4 text-orange-700">
					<div>
						<p>
							<strong>Active verbs (-ω):</strong> Someone DOES something
						</p>
						<p>
							<strong>Passive verbs (-ομαι):</strong> Look passive but often
							mean active actions
						</p>
					</div>
					<div>
						<p>
							<strong>Pattern recognition:</strong> Learn the "I" form (εγώ) and
							you know the family!
						</p>
						<p>
							<strong>έρχομαι = -ομαι family</strong>
						</p>
						<p>
							<strong>κάνω = -ω family</strong>
						</p>
					</div>
				</div>
			</div>

			<div className="bg-red-50 p-4 rounded-lg">
				<h4 className="font-bold text-red-800 mb-2">
					⚡ Irregular Verbs - Must Memorize!
				</h4>
				<div className="bg-red-100 p-2 rounded mb-3">
					<p className="text-sm text-red-700">
						These don't follow the standard patterns - learn them individually!
					</p>
				</div>

				<div className="grid md:grid-cols-2 gap-4 mb-4">
					<div>
						<h5 className="font-semibold mb-2">πάω (I go)</h5>
						<Table
							rows={VERB_CONJUGATIONS.pao.map((conj) => [
								conj.person,
								conj.form,
								conj.english,
							])}
						/>
					</div>

					<div>
						<h5 className="font-semibold mb-2">λέω (I say)</h5>
						<Table
							rows={VERB_CONJUGATIONS.leo.map((conj) => [
								conj.person,
								conj.form,
								conj.english,
							])}
						/>
					</div>
				</div>

				<div className="grid md:grid-cols-2 gap-4 mb-4">
					<div>
						<h5 className="font-semibold mb-2">τρώω (I eat) - drops ω</h5>
						<Table
							rows={VERB_CONJUGATIONS.troo.map((conj) => [
								conj.person,
								conj.form,
								conj.english,
							])}
						/>
					</div>

					<div>
						<h5 className="font-semibold mb-2">είμαι (I am)</h5>
						<Table
							rows={VERB_CONJUGATIONS.eimai.map((conj) => [
								conj.person,
								conj.form,
								conj.english,
							])}
						/>
					</div>
				</div>

				<div className="bg-orange-100 p-3 rounded">
					<h6 className="font-bold text-orange-800 mb-2">🧠 Memory Notes:</h6>
					<div className="text-sm text-orange-700 space-y-1">
						<p>
							<strong>πάω:</strong> Alternative form is πηγαίνω (follows normal
							Type A pattern)
						</p>
						<p>
							<strong>λέω:</strong> Notice how it drops the final ω in most
							forms
						</p>
						<p>
							<strong>τρώω:</strong> Similar to λέω - drops the final ω
						</p>
						<p>
							<strong>τα λέμε:</strong> "see ya later" (literally "we say them")
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PresentTense;
