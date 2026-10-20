import type { SimpleListItem } from "../../components/engines/deck";

/**
 * After a preposition, me and you take the long εμένα and εσένα, or μένα and σένα, never
 * με and σε. The preposition is given, since with you would otherwise also admit μαζί σου.
 * us and you all are left out: για μας and για σας are natural beside για εμάς and για εσάς.
 */
export const ITEMS: SimpleListItem[] = [
	{ id: "for-me", context: "για", label: "for me", greek: "για μένα", acceptAlso: "για εμένα" },
	{ id: "for-you", context: "για", label: "for you (a friend)", greek: "για σένα", acceptAlso: "για εσένα" },
	{ id: "with-me", context: "με", label: "with me", greek: "με μένα", acceptAlso: "με εμένα" },
	{ id: "with-you", context: "με", label: "with you (a friend)", greek: "με σένα", acceptAlso: "με εσένα" },
	{ id: "without-you", context: "χωρίς", label: "without you (a friend)", greek: "χωρίς εσένα", acceptAlso: "χωρίς σένα" },
	{ id: "without-me", context: "χωρίς", label: "without me", greek: "χωρίς εμένα", acceptAlso: "χωρίς μένα" },
	{ id: "from-me", context: "από", label: "from me", greek: "από μένα", acceptAlso: "από εμένα" },
	{ id: "from-you", context: "από", label: "from you (a friend)", greek: "από σένα", acceptAlso: "από εσένα" },
	{ id: "to-me", context: "σε", label: "to me", greek: "σε μένα", acceptAlso: "σε εμένα" },
	{ id: "to-you", context: "σε", label: "to you (a friend)", greek: "σε σένα", acceptAlso: "σε εσένα" },
	{ id: "from-him", context: "από", label: "from him", greek: "από αυτόν" },
	{ id: "from-her", context: "από", label: "from her", greek: "από αυτήν", acceptAlso: "από αυτή" },
	{ id: "with-him", context: "με", label: "with him", greek: "με αυτόν" },
	{ id: "with-her", context: "με", label: "with her", greek: "με αυτήν", acceptAlso: "με αυτή" },
	{ id: "with-them", context: "με", label: "with them (men, or a mix)", greek: "με αυτούς" },
	{
		id: "this-for-you",
		context: "για",
		label: "This is for you. (to a friend)",
		greek: "Αυτό είναι για σένα.",
		acceptAlso: "Αυτό είναι για εσένα.",
	},
	{ id: "for-me-q", context: "για", label: "Is it for me?", greek: "Είναι για μένα;", acceptAlso: "Είναι για εμένα;" },
	{ id: "about-me", context: "για", label: "He's talking about me.", greek: "Μιλάει για μένα.", acceptAlso: "Μιλάει για εμένα." },
];
