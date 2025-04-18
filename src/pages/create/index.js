import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import PageLoading from '@/components/PageLoading'
import PageError from '@/components/PageError'
import Footer from '@/components/PageFooter'
import CreateQuestions from '@/components/Create/CreateQuestions'

import queryValidator from '@/helpers/gameConfig'
import categories from '@/assets/categories.json'
import { useBoundStore } from '@/store/useBoundStore'
import CreateHeader from '@/components/Create/CreateHeader'
import CreateInfo from '@/components/Create/CreateInfo'

export default function Play() {
	const { createdQuestions, createdWildcards, createdCategories, cleanCreateQuestions, cleanCreateWildcards, cleanCreateCategories } = useBoundStore(state => state)
	const router = useRouter()

	// useEffect(() => {
	// 	if (router.isReady) {
	// 		const validQuery = queryValidator(router.query)
	// 		const cate = validQuery.categories.map(cat => categories.find(c => c.id === cat).name)
	// 		setQueries(validQuery)
	// 		getQuestions(cate, validQuery.infinitymode ? 5 : validQuery.questions)
	// 	}
	// }, [router.isReady])

	useEffect(() => {
		window.onbeforeunload = () => 'Are you sure you want to leave?'
		return () => cleanCreateQuestions() // Clean up createdQuestions on component unmount
	}, [])

	return (
		<>
			<Head><title>Quizi | Create</title></Head>

			<CreateHeader />
			<CreateInfo />
			<CreateQuestions />
			<Footer alert={true} />
			<style jsx global>
				{`
					body {
						background: url(bg-profile3.svg) center;
						.background-horizontal-scroll-animation;
					}

					@media (max-width: 1030px) {
						body {
							background-size: auto 100%;
						}
					}
				`}
			</style>
		</>
	)
}
