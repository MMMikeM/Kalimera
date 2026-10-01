import { ParadigmTable } from "kalimera";

const FRAME = "max-w-md rounded-lg border border-stone-200 bg-card p-4 shadow-sm";

export const ActiveVerb = () => (
	<div className={FRAME}>
		<ParadigmTable
			stem="κάν"
			infinitive="κάνω"
			meaning="do, make"
			scheme="verb-active"
			forms={{
				sg1: { stem: "κάν", ending: "ω" },
				sg2: { stem: "κάν", ending: "εις" },
				sg3: { stem: "κάν", ending: "ει" },
				pl1: { stem: "κάν", ending: "ουμε" },
				pl2: { stem: "κάν", ending: "ετε" },
				pl3: { stem: "κάν", ending: "ουν" },
			}}
		/>
	</div>
);

export const ContractedVerb = () => (
	<div className={FRAME}>
		<ParadigmTable
			stem="μιλ"
			infinitive="μιλάω"
			meaning="speak"
			scheme="verb-contracted"
			forms={{
				sg1: { stem: "μιλ", ending: "άω" },
				sg2: { stem: "μιλ", ending: "άς" },
				sg3: { stem: "μιλ", ending: "άει" },
				pl1: { stem: "μιλ", ending: "άμε" },
				pl2: { stem: "μιλ", ending: "άτε" },
				pl3: { stem: "μιλ", ending: "άνε" },
			}}
		/>
	</div>
);

export const DeponentVerb = () => (
	<div className={FRAME}>
		<ParadigmTable
			stem="έρχ"
			infinitive="έρχομαι"
			meaning="come"
			scheme="verb-deponent"
			forms={{
				sg1: { stem: "έρχ", ending: "ομαι" },
				sg2: { stem: "έρχ", ending: "εσαι" },
				sg3: { stem: "έρχ", ending: "εται" },
				pl1: { stem: "ερχ", ending: "όμαστε" },
				pl2: { stem: "έρχ", ending: "εστε" },
				pl3: { stem: "έρχ", ending: "ονται" },
			}}
		/>
	</div>
);

export const IrregularWholeForms = () => (
	<div className={FRAME}>
		<ParadigmTable
			infinitive="είμαι"
			meaning="am, is, are"
			formClassName="text-stone-800 font-semibold"
			forms={{
				sg1: "είμαι",
				sg2: "είσαι",
				sg3: "είναι",
				pl1: "είμαστε",
				pl2: "είστε",
				pl3: "είναι",
			}}
		/>
		<p className="mt-2 text-xs text-stone-500 italic">3rd person is the same for singular and plural</p>
	</div>
);
