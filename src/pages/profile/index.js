import Head from 'next/head'
import { useEffect } from 'react'
import { useBoundStore } from '@/store/useBoundStore'
import ProfileHeader from '@/components/Profile/ProfileHeader'
import PageLoading from '@/components/PageLoading'
import ProfileInfo from '@/components/Profile/ProfileInfo'
import QuizHistory from '@/components/Profile/QuizHistory'
import PageFooter from '@/components/PageFooter'
import { useRouter } from 'next/router'

export default function Profile() {
	const { user, logout, quizHistory, authloading } = useBoundStore(state => state)
	const router = useRouter()

	useEffect(() => { window.onbeforeunload = () => null }, [])

	const handleLogout = async () => {
		await logout().then(router.push('/'));
	};

	return (
		<>
			<Head>
				<title>Qao? | Profile</title>
			</Head>
			{authloading && <PageLoading />}
			{!authloading && <>
				<main className='bg-[url("/bg-profile3.svg")] bg-vertical-scroll-animation max-w-6xl relative mx-auto w-full min-h-[25rem] flex flex-col justify-between items-center px-5 md:px-10 py-20 lg:col-start-2 lg:row-start-1 lg:row-end-2 text-center text-white'>
					<ProfileInfo user={user} logout={handleLogout} />
				</main>
				<section className='max-w-6xl bg-[url("/bg-gamemodes.svg")] bg-horizontal-scroll-animation px-8 pb-6 flex flex-col justify-center text-slate-900 lg:col-start-1 lg:col-end-2'>
					<div className='flex flex-col gap-3'>
						<QuizHistory quizHistory={quizHistory} />
					</div>
				</section>
				<PageFooter />
			</>}
			<style jsx global>
				{`
				#__next {
					display: grid;
					grid-template-columns: 1fr;
				}
				@media (min-width: 1024px) {
					#__next {
						grid-template-columns: 1.4fr 1fr;
					}
				}
				`}
			</style>
		</>
	)
}
