// Word types enum values
export const wordTypes = [
	"noun",
	"verb",
	"adjective",
	"adverb",
	"phrase",
	"preposition",
] as const;
export type WordType = (typeof wordTypes)[number];

// Gender enum values
export const genders = ["masculine", "feminine", "neuter"] as const;
export type Gender = (typeof genders)[number];

// Case types enum values
export const caseTypes = ["accusative", "genitive", "nominative", "vocative"] as const;
export type CaseType = (typeof caseTypes)[number];

// Session types enum values
export const sessionTypes = [
	"vocab_quiz",
	"case_drill",
	"conjugation_drill",
	"weak_area_focus",
] as const;
export type SessionType = (typeof sessionTypes)[number];

// Skill types enum values
export const skillTypes = ["recognition", "production"] as const;
export type SkillType = (typeof skillTypes)[number];

// Area types enum values
export const areaTypes = ["case", "gender", "verb_family"] as const;
export type AreaType = (typeof areaTypes)[number];

// Display sections for UI organization (tag_sections lookup table)
export const displaySections = ["nouns", "verbs", "phrases", "reference"] as const;
export type DisplaySection = (typeof displaySections)[number];

// Verb tenses for conjugation paradigms
export const verbTenses = ["present", "aorist", "past_continuous", "future"] as const;
export type VerbTense = (typeof verbTenses)[number];

// Person-number combinations (sg = singular, pl = plural)
export const personNumbers = ["sg1", "sg2", "sg3", "pl1", "pl2", "pl3"] as const;
export type PersonNumber = (typeof personNumbers)[number];

// Imperative aspects
export const imperativeAspects = ["imperfective", "perfective"] as const;
export type ImperativeAspect = (typeof imperativeAspects)[number];

// Grammatical numbers for imperatives
export const grammaticalNumbers = ["singular", "plural"] as const;
export type GrammaticalNumber = (typeof grammaticalNumbers)[number];

// Declension patterns for Greek nouns
export const declensionPatterns = [
	"masc-os", // ο φίλος -> τον φίλο -> του φίλου
	"masc-as", // ο πατέρας -> τον πατέρα -> του πατέρα
	"masc-is", // ο μαθητής -> τον μαθητή -> του μαθητή
	"masc-es", // ο καφές -> τον καφέ -> του καφέ
	"fem-a", // η γυναίκα -> την γυναίκα -> της γυναίκας
	"fem-i", // η ζωή -> την ζωή -> της ζωής
	"fem-si", // η πόλη -> την πόλη -> της πόλης (includes -ση/-ξη)
	"neut-o", // το βιβλίο -> το βιβλίο -> του βιβλίου
	"neut-i", // το παιδί -> το παιδί -> του παιδιού
	"neut-ma", // το όνομα -> το όνομα -> του ονόματος
] as const;
export type DeclensionPattern = (typeof declensionPatterns)[number];

// Auth challenge types for WebAuthn flow
export const challengeTypes = ["registration", "authentication"] as const;
export type ChallengeType = (typeof challengeTypes)[number];

// WebAuthn authenticator transports
export const authenticatorTransports = [
	"ble",
	"cable",
	"hybrid",
	"internal",
	"nfc",
	"smart-card",
	"usb",
] as const;
export type AuthenticatorTransport = (typeof authenticatorTransports)[number];
