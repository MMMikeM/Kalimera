export interface Question {
	id: string;
	prompt: string;
	promptSubtext?: string;
	options: string[];
	correctIndex: number;
	explanation: string;
}

export interface DrillState {
	questions: Question[];
	currentIndex: number;
	selectedAnswer: number | null;
	showFeedback: boolean;
	score: { correct: number; total: number };
	isComplete: boolean;
}

export type DrillAction =
	| { type: "SELECT_ANSWER"; index: number }
	| { type: "CHECK_ANSWER" }
	| { type: "NEXT_QUESTION" }
	| { type: "RESTART" };

export const initialDrillState = (questions: Question[]): DrillState => ({
	questions,
	currentIndex: 0,
	selectedAnswer: null,
	showFeedback: false,
	score: { correct: 0, total: 0 },
	isComplete: false,
});

export const drillReducer = (state: DrillState, action: DrillAction): DrillState => {
	switch (action.type) {
		case "SELECT_ANSWER":
			if (state.showFeedback) return state;
			return { ...state, selectedAnswer: action.index };

		case "CHECK_ANSWER": {
			if (state.selectedAnswer === null) return state;
			const isCorrect = state.selectedAnswer === state.questions[state.currentIndex].correctIndex;
			return {
				...state,
				showFeedback: true,
				score: {
					correct: state.score.correct + (isCorrect ? 1 : 0),
					total: state.score.total + 1,
				},
			};
		}

		case "NEXT_QUESTION": {
			const nextIndex = state.currentIndex + 1;
			if (nextIndex >= state.questions.length) {
				return { ...state, isComplete: true };
			}
			return {
				...state,
				currentIndex: nextIndex,
				selectedAnswer: null,
				showFeedback: false,
			};
		}

		case "RESTART":
			return initialDrillState(state.questions);

		default:
			return state;
	}
};

// Shuffle array utility
export const shuffleArray = <T,>(array: T[]): T[] => {
	const shuffled = [...array];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
};
