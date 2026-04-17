import { GENDER_STYLE } from "./drill-constants";
import { SimpleListDrill, type SimpleListItem } from "./components/SimpleListDrill";

// Forward: "house" → type "to spiti"  (article + noun, matchPhonetic handles "to spiti" → "το σπίτι")
// Reverse: show "σπίτι" (reverseGreek strips article) → select M / F / N

const NOUNS: SimpleListItem[] = [
	// Masculine (ο)
	{ id: "andras", greek: "ο άντρας", greeklish: "o andras", english: "man", label: "masculine", category: "masculine", dimension: "masculine", reverseGreek: "άντρας" },
	{ id: "filos", greek: "ο φίλος", greeklish: "o filos", english: "friend (m)", label: "masculine", category: "masculine", dimension: "masculine", reverseGreek: "φίλος" },
	{ id: "kafes", greek: "ο καφές", greeklish: "o kafes", english: "coffee", label: "masculine", category: "masculine", dimension: "masculine", reverseGreek: "καφές" },
	{ id: "dromos", greek: "ο δρόμος", greeklish: "o dromos", english: "road / street", label: "masculine", category: "masculine", dimension: "masculine", reverseGreek: "δρόμος" },
	{ id: "kairos", greek: "ο καιρός", greeklish: "o kairos", english: "weather / time", label: "masculine", category: "masculine", dimension: "masculine", reverseGreek: "καιρός" },
	{ id: "pateras", greek: "ο πατέρας", greeklish: "o pateras", english: "father", label: "masculine", category: "masculine", dimension: "masculine", reverseGreek: "πατέρας" },
	{ id: "gios", greek: "ο γιος", greeklish: "o gios", english: "son", label: "masculine", category: "masculine", dimension: "masculine", reverseGreek: "γιος" },
	{ id: "skilos", greek: "ο σκύλος", greeklish: "o skilos", english: "dog", label: "masculine", category: "masculine", dimension: "masculine", reverseGreek: "σκύλος" },
	{ id: "minas", greek: "ο μήνας", greeklish: "o minas", english: "month", label: "masculine", category: "masculine", dimension: "masculine", reverseGreek: "μήνας" },
	{ id: "kosmos", greek: "ο κόσμος", greeklish: "o kosmos", english: "world / people", label: "masculine", category: "masculine", dimension: "masculine", reverseGreek: "κόσμος" },
	// Feminine (η)
	{ id: "gynaika", greek: "η γυναίκα", greeklish: "i gynaika", english: "woman", label: "feminine", category: "feminine", dimension: "feminine", reverseGreek: "γυναίκα" },
	{ id: "fili", greek: "η φίλη", greeklish: "i fili", english: "friend (f)", label: "feminine", category: "feminine", dimension: "feminine", reverseGreek: "φίλη" },
	{ id: "thalassa", greek: "η θάλασσα", greeklish: "i thalassa", english: "sea", label: "feminine", category: "feminine", dimension: "feminine", reverseGreek: "θάλασσα" },
	{ id: "porta", greek: "η πόρτα", greeklish: "i porta", english: "door", label: "feminine", category: "feminine", dimension: "feminine", reverseGreek: "πόρτα" },
	{ id: "poli", greek: "η πόλη", greeklish: "i poli", english: "city", label: "feminine", category: "feminine", dimension: "feminine", reverseGreek: "πόλη" },
	{ id: "mitera", greek: "η μητέρα", greeklish: "i mitera", english: "mother", label: "feminine", category: "feminine", dimension: "feminine", reverseGreek: "μητέρα" },
	{ id: "kori", greek: "η κόρη", greeklish: "i kori", english: "daughter", label: "feminine", category: "feminine", dimension: "feminine", reverseGreek: "κόρη" },
	{ id: "glossa", greek: "η γλώσσα", greeklish: "i glossa", english: "language", label: "feminine", category: "feminine", dimension: "feminine", reverseGreek: "γλώσσα" },
	{ id: "nichta", greek: "η νύχτα", greeklish: "i nichta", english: "night", label: "feminine", category: "feminine", dimension: "feminine", reverseGreek: "νύχτα" },
	{ id: "oikogeneia", greek: "η οικογένεια", greeklish: "i ikogenia", english: "family", label: "feminine", category: "feminine", dimension: "feminine", reverseGreek: "οικογένεια" },
	// Neuter (το)
	{ id: "spiti", greek: "το σπίτι", greeklish: "to spiti", english: "house", label: "neuter", category: "neuter", dimension: "neuter", reverseGreek: "σπίτι" },
	{ id: "paidi", greek: "το παιδί", greeklish: "to paidi", english: "child", label: "neuter", category: "neuter", dimension: "neuter", reverseGreek: "παιδί" },
	{ id: "vivlio", greek: "το βιβλίο", greeklish: "to vivlio", english: "book", label: "neuter", category: "neuter", dimension: "neuter", reverseGreek: "βιβλίο" },
	{ id: "aftokinito", greek: "το αυτοκίνητο", greeklish: "to aftokinito", english: "car", label: "neuter", category: "neuter", dimension: "neuter", reverseGreek: "αυτοκίνητο" },
	{ id: "nero", greek: "το νερό", greeklish: "to nero", english: "water", label: "neuter", category: "neuter", dimension: "neuter", reverseGreek: "νερό" },
	{ id: "onoma", greek: "το όνομα", greeklish: "to onoma", english: "name", label: "neuter", category: "neuter", dimension: "neuter", reverseGreek: "όνομα" },
	{ id: "fagito", greek: "το φαγητό", greeklish: "to fagito", english: "food", label: "neuter", category: "neuter", dimension: "neuter", reverseGreek: "φαγητό" },
	{ id: "estiatorio", greek: "το εστιατόριο", greeklish: "to estiatorio", english: "restaurant", label: "neuter", category: "neuter", dimension: "neuter", reverseGreek: "εστιατόριο" },
	{ id: "xenodocheio", greek: "το ξενοδοχείο", greeklish: "to xenodocheio", english: "hotel", label: "neuter", category: "neuter", dimension: "neuter", reverseGreek: "ξενοδοχείο" },
	{ id: "proi", greek: "το πρωί", greeklish: "to proi", english: "morning", label: "neuter", category: "neuter", dimension: "neuter", reverseGreek: "πρωί" },
];

const CATEGORIES = [
	{ id: "masculine", label: "Masculine (ο)" },
	{ id: "feminine", label: "Feminine (η)" },
	{ id: "neuter", label: "Neuter (το)" },
];

const DIMENSION_OPTIONS = [
	{ id: "masculine", label: "Masculine (ο)", ...GENDER_STYLE.masculine },
	{ id: "feminine", label: "Feminine (η)", ...GENDER_STYLE.feminine },
	{ id: "neuter", label: "Neuter (το)", ...GENDER_STYLE.neuter },
];

export default function NounGendersDrill() {
	return (
		<SimpleListDrill
			items={NOUNS}
			title="Noun Genders"
			subtitle="30 nouns / timed"
			colorTheme="honey"
			forwardTimeLimit={5000}
			forwardDesc="English → article + noun (e.g. to spiti)"
			reverseDesc="Greek noun → select gender"
			categories={CATEGORIES}
			reverseDimension={{
				options: DIMENSION_OPTIONS,
				getCorrectId: (item) => item.dimension ?? "",
			}}
		/>
	);
}
