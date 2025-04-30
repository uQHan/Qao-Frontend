import saveQuestions from "@/helpers/saveQuestions";
import saveQuiz from "@/helpers/saveQuiz";
import categoriesJSON from '@/assets/categories.json';

export const useCreateQuestionsStore = (set, get) => ({
	createdQuestions: [],
	createdCategories: [],
	createdWildcards: { skip: 0, half: 0, lives: 0 },
	quizId: null,
	quizQuery: {
		roomName: "",
		roomDesc: "",
		startTime: "",
		endTime: "",
		categories: categoriesJSON.map((cat) => cat.id),
	},

	// Clean-up methods
	cleanCreateQuestions: () => set({ createdQuestions: [] }),
	cleanCreateWildcards: () => set({ createdWildcards: { skip: 0, half: 0, lives: 0 } }),
	cleanCreateCategories: () => set({ createdCategories: [] }),

	// Add/remove methods
	addCreatedQuestion: (question) =>
		set((state) => ({ createdQuestions: [...state.createdQuestions, question] })),
	removeCreatedQuestion: (index) =>
		set((state) => ({
			createdQuestions: state.createdQuestions.filter((_, i) => i !== index),
		})),

	addCreatedCategory: (category) =>
		set((state) => ({ createdCategories: [...state.createdCategories, category] })),
	removeCreatedCategory: (index) =>
		set((state) => ({
			createdCategories: state.createdCategories.filter((_, i) => i !== index),
		})),

	// Setter for quizQuery
	setQuizQuery: (key, value) =>
		set((state) => ({
			quizQuery: {
				...state.quizQuery,
				[key]: value,
			},
		})),

	// Save questions
	saveQuestions: async () => {
		const { createdQuestions, quizId } = get();
		if (!quizId) {
			console.error("Quiz ID is missing. Cannot save questions.");
			return;
		}

		try {
			const response = await saveQuestions(createdQuestions, quizId);
			console.log("Questions saved successfully:", response);
		} catch (error) {
			console.error("Error saving questions:", error);
		}
	},

	// Save quiz
	saveQuiz: async () => {
		const { quizQuery } = get();
		const { roomName, roomDesc, startTime, endTime } = quizQuery;

		saveQuiz(roomName, roomDesc, startTime, endTime)
			.then((response) => {
				set({ quizId: response.quizId });
				console.log("QuizId:", response.quizId);
				if (response.statusCode >= 400) {
					return set({ error: [true, response.message] });
				}
			})
			.catch((error) => {
				set({ error: [true, error.message] });
			});
	},

	setQuizId: (quizId) => set({ quizId }),
});
