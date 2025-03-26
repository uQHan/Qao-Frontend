import Head from 'next/head'
import { useEffect } from 'react'
import { useBoundStore } from '@/store/useBoundStore'
import PageFooter from '@/components/PageFooter'

export default function Profile() {
	const { user } = useBoundStore(state => state)

	useEffect(() => { window.onbeforeunload = () => null }, [])

	return (
		<>
			<Head>
				<title>Qao? | Profile</title>
			</Head>
			<main className='mainHome max-w-6xl relative mx-auto w-full min-h-[25rem] flex flex-col justify-between items-center px-5 md:px-10 py-20 text-center text-white'>
				<article className='bg-white p-6 rounded-md shadow-md w-full max-w-md text-black'>
					<h1 className='text-3xl font-bold mb-4'>Profile</h1>
					<div className='text-left'>
						<p><strong>Username:</strong> {user?.username}</p>
						<p><strong>Email:</strong> {user?.email}</p>
						<p><strong>Joined:</strong> {new Date(user?.joined).toLocaleDateString()}</p>
					</div>
				</article>
				<PageFooter />
			</main>
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
