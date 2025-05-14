import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { IoCloseSharp } from 'react-icons/io5';
import playSound from '@/helpers/playSound';
import { useBoundStore } from '@/store/useBoundStore';
import PageLoading from '@/components/PageLoading';

export default function AuthForm() {
	const { dest, setDest, login, authloading } = useBoundStore(state => state);
	const dialog = useRef(null);
	const router = useRouter();

	// State for expanding/collapsing the sign-up section
	const [isSignUpExpanded, setIsSignUpExpanded] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();
		if (dest && dest !== 'create') {
			await login(e.target.username.value, e.target.password.value).then(closeDialog()).then(router.push('/' + dest));
		} else if (dest === 'create') {
			await login(e.target.username.value, e.target.password.value).then(closeDialog()).then(document.getElementById('createQuizRoomDialog')?.showModal());
		}
		setDest(null);
	}

	function clickOutsideDialog(e) {
		const rect = dialog.current.getBoundingClientRect();
		if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
			closeDialog();
		}
	}

	function closeDialog() {
		playSound('pop-down');
		dialog.current.classList.add('hide');
		function handleAnimationEnd() {
			dialog.current.classList.remove('hide');
			dialog.current.close();
			dialog.current.removeEventListener('animationend', handleAnimationEnd);
		}
		dialog.current.addEventListener('animationend', handleAnimationEnd);
	}

	return (
		<>
			{authloading && <PageLoading />}
			<dialog ref={dialog} onClick={(e) => clickOutsideDialog(e)} id="authDialog" className='fixed top-1/2 w-5/6 sm:w-fit left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-slate-900 m-0 backdrop-blur-lg rounded-md py-9 px-8 md:px-11'>
				<button className='absolute top-2 right-2 text-3xl hover:scale-110 transition-all' onClick={closeDialog} >
					<IoCloseSharp />
				</button>

				<form onSubmit={handleSubmit}>
					<div className='flex flex-col sm:flex-row gap-4 sm:gap-8 '>
						<div className={`expandable ${isSignUpExpanded ? '' : 'expanded py-2'}`}>
							<div className='flex flex-col gap-4'>
								<label className='flex flex-col'>
									<span className='font-semibold mb-2'>Username</span>
									<input type='text' name='username' className='p-2 mx-2 border rounded' required />
								</label>
								<label className='flex flex-col'>
									<span className='font-semibold mb-2'>Password</span>
									<input type='password' name='password' className='p-2 mx-2 border rounded' required />
								</label>
							</div>
						</div>
					</div>

					<div className="flex flex-col sm:flex-row gap-4 sm:gap-8 ">
						<div className={`expandable ${isSignUpExpanded ? 'expanded py-2' : ''}`}>
							<div className='flex flex-col gap-4'>
								<label className='flex flex-col'>
									<span className='font-semibold mb-2'>Email</span>
									<input type='email' name='email' className='p-2 mx-2 border rounded' required />
								</label>
								<label className='flex flex-col'>
									<span className='font-semibold mb-2'>Username</span>
									<input type='text' name='signupUsername' className='p-2 mx-2 border rounded' required />
								</label>
								<label className='flex flex-col'>
									<span className='font-semibold mb-2'>Password</span>
									<input type='password' name='signupPassword' className='p-2 mx-2 border rounded' required />
								</label>
							</div>
						</div>
					</div>

					<hr className='my-4' />

					<button type='submit' name='singUp' className={`${isSignUpExpanded ? '' : 'hidden'} btn-primary uppercase py-3 px-6 w-full mb-5 tracking-widest`}>Sign Up</button>
					<button type='submit' name='login' className={`${isSignUpExpanded ? 'hidden' : ''} btn-primary uppercase py-3 px-6 w-full mb-5 tracking-widest`}>Login</button>
					<div
						className="flex justify-center items-center cursor-pointer"
						onClick={() => setIsSignUpExpanded(!isSignUpExpanded)}
					>
						<span className="text-gray-700 font-medium">{isSignUpExpanded ? 'Login' : 'Sign-Up'}</span>
					</div>
				</form>
			</dialog>
		</>
	);
}
