import getQuestions from '@/helpers/getQuestions'
import getQuestionsById from '@/helpers/getQuestionsById'

export const useQuestionsStore = (set, get) => ({
	questions: [],
	loading: false,
	loadingInfinity: false,
	error: [false, ''],
	currentQuestion: 1,
	score: 1,
	win: undefined,
	getQuestions: (topics, number, infinity) => {
		infinity ? set({ loadingInfinity: true }) : set({ loading: true })
		getQuestions(topics, number)
			.then(data => set({ questions: data }))
			.catch(err => set({ error: [true, err] }))
			.finally(() => infinity ? set({ loadingInfinity: false }) : set({ loading: false }))
	},
	getQuestionsById: (id, name) => {
		getQuestionsById(id, name)
			.then(data => {
				set(state => {
					const questions = [...state.questions]
					const questionIndex = questions.findIndex(q => q.id === id)
					if (questionIndex !== -1) {
						questions[questionIndex] = { ...questions[questionIndex], ...data }
					}
					return { questions }
				})
			})
			.catch(err => set({ error: [true, err] }))
			.finally(() => set({ loading: false }))
	},
	setCurrentQuestion: (number) => set({ currentQuestion: number }),
	setUserAnswer: (question, answer) => {
		if (get().queries.infinitymode) return
		set(state => {
			const questions = [...state.questions]
			questions[question].userAnswer = answer
			return { questions }
		})
	},
	cleanQuestions: () => set({ questions: [], score: 1, currentQuestion: 1, win: undefined }),
	setScore: (score) => set({ score }),
	setWin: (win) => set({ win })
})
