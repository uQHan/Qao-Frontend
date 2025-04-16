export const useCreateQuestionsStore = (set, get) => ({
	createdQuestions: [],
	createdCategories: [],
	createdWildcards: { skip: 0, half: 0, lives: 0 },
	cleanCreateQuestions: () => set({ createdQuestions: [] }),
	cleanCreateWildcards: () => set({ createdWildcards: { skip: 0, half: 0, lives: 0 } }),
	cleanCreateCategories: () => set({ createdCategories: [] }),

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
});
