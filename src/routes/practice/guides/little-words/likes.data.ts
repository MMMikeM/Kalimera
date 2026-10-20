import type { SimpleListItem } from "../../components/engines/deck";

/**
 * Liking with μου αρέσει: the verb agrees with the thing liked, which takes the Doer form.
 * No answer starts with του, της or τους, because the grader forgives a leading article
 * and would pass the answer without the person. τους is left out altogether: the grader
 * hears it as της.
 */
export const ITEMS: SimpleListItem[] = [
	{ id: "coffee", label: "I like coffee.", greek: "Μου αρέσει ο καφές." },
	{ id: "cats", label: "I like cats.", greek: "Μου αρέσουν οι γάτες." },
	{ id: "you", label: "I like you. (to a friend)", greek: "Μου αρέσεις." },
	{ id: "it-q", label: "Do you like it? (to a friend)", greek: "Σου αρέσει;" },
	{ id: "not-it", label: "I don't like it.", greek: "Δεν μου αρέσει.", acceptAlso: "Δε μου αρέσει." },
	{ id: "not-them", label: "I don't like them.", greek: "Δεν μου αρέσουν.", acceptAlso: "Δε μου αρέσουν." },
	{ id: "coffee-here-q", label: "Do you like the coffee here? (to a friend)", greek: "Σου αρέσει ο καφές εδώ;" },
	{ id: "she-not-dogs", label: "She doesn't like dogs.", greek: "Δεν της αρέσουν οι σκύλοι." },
	{ id: "music", label: "I like music.", greek: "Μου αρέσει η μουσική." },
	{ id: "concerts-q", label: "Do you like concerts? (to a friend)", greek: "Σου αρέσουν οι συναυλίες;" },
	{ id: "job-q", label: "Do you like your job? (to a friend)", greek: "Σου αρέσει η δουλειά σου;" },
	{ id: "cyprus-q", label: "Do you like Cyprus? (to a friend)", greek: "Σου αρέσει η Κύπρος;" },
	{ id: "parks", label: "We like the parks.", greek: "Μας αρέσουν τα πάρκα." },
	{ id: "town-q", label: "What do you like about your town? (to a friend)", greek: "Τι σου αρέσει στην πόλη σου;" },
	{ id: "he-not-coffee", label: "He doesn't like coffee.", greek: "Δεν του αρέσει ο καφές." },
	{ id: "he-not-bath", label: "He doesn't like having a bath.", greek: "Δεν του αρέσει να κάνει μπάνιο." },
	{ id: "travel", label: "I like travelling.", greek: "Μου αρέσει να ταξιδεύω." },
	{ id: "together", label: "We like doing things together.", greek: "Μας αρέσει να κάνουμε πράγματα μαζί." },
	{ id: "food-polite-q", label: "Do you like the food? (polite)", greek: "Σας αρέσει το φαγητό;" },
	{ id: "flowers", label: "I like flowers.", greek: "Μου αρέσουν τα λουλούδια." },
	{ id: "not-winter", label: "I don't like winter.", greek: "Δεν μου αρέσει ο χειμώνας.", acceptAlso: "Δε μου αρέσει ο χειμώνας." },
	{ id: "she-not-city", label: "She doesn't like the city.", greek: "Δεν της αρέσει η πόλη." },
	{ id: "greek-songs", label: "We like Greek songs.", greek: "Μας αρέσουν τα ελληνικά τραγούδια." },
	{ id: "dogs-q", label: "Do you like dogs? (to a friend)", greek: "Σου αρέσουν οι σκύλοι;" },
];
