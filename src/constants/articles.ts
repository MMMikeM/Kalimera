export const MOVABLE_NU_RULE = {
	rule: "The final -ν on τον/την/στον/στην is kept before: vowels, κ, π, τ, ξ, ψ, γκ, μπ, ντ",
	examples: {
		keep: [
			{ text: "τον άντρα", reason: "before vowel" },
			{ text: "την κόρη", reason: "before κ" },
			{ text: "στον παρκ", reason: "before π" },
		],
		drop: [
			{ text: "τη μητέρα", reason: "before μ" },
			{ text: "τη δουλειά", reason: "before δ" },
			{ text: "στη θάλασσα", reason: "before θ" },
		],
	},
};
