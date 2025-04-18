import { useRef } from 'react'
import { useRouter } from 'next/router'
import { IoCloseSharp } from 'react-icons/io5'
import playSound from '@/helpers/playSound'
import { useBoundStore } from '@/store/useBoundStore'
import PageLoading from '@/components/PageLoading'

export default function AuthForm() {
	const { dest, login, authloading } = useBoundStore(state => state)
	const dialog = useRef(null)
	const router = useRouter()

	async function handleSubmit(e) {
		e.preventDefault()
		await login(e.target.username.value, e.target.password.value).then(closeDialog()).then(router.push('/' + dest))
	}

	function clickOutsideDialog(e) {
		const rect = dialog.current.getBoundingClientRect()
		if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
			closeDialog()
		}
	}

	function closeDialog() {
		playSound('pop-down')
		dialog.current.classList.add('hide')
		function handleAnimationEnd() {
			dialog.current.classList.remove('hide')
			dialog.current.close()
			dialog.current.removeEventListener('animationend', handleAnimationEnd)
		}
		dialog.current.addEventListener('animationend', handleAnimationEnd)
	}

	return (
		<>
			{authloading && <PageLoading />}
			<dialog ref={dialog} onClick={(e) => clickOutsideDialog(e)} id="authDialog" className='fixed top-1/2 w-5/6 sm:w-fit left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-slate-900 m-0 backdrop-blur-lg rounded-md py-9 px-8 md:px-11'>
				<button className='absolute top-2 right-2 text-3xl hover:scale-110 transition-all' onClick={closeDialog} >
					<IoCloseSharp />
				</button>

				<form onSubmit={handleSubmit}>
					<div className='flex flex-col sm:flex-row gap-4 sm:gap-8 mb-4 md:mb-8'>
						<div className='flex flex-col gap-4'>
							<label className='flex flex-col'>
								<span className='font-semibold mb-2'>Username</span>
								<input type='text' name='username' className='p-2 border rounded' required />
							</label>
							<label className='flex flex-col'>
								<span className='font-semibold mb-2'>Password</span>
								<input type='password' name='password' className='p-2 border rounded' required />
							</label>
						</div>
					</div>

					<button type='submit' className='btn-primary uppercase py-3 px-6 w-full tracking-widest'>Login</button>
				</form>
			</dialog>
		</>
	)
}
