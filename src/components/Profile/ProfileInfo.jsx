export default function ProfileInfo({ user, logout }) {
	return (
		<article className='bg-white p-6 rounded-md shadow-md w-full max-w-md text-black'>
			<img
				src={user?.profilePicture || '/default-avatar.jpg'}
				alt="Profile Picture"
				className="w-24 h-24 rounded-full mb-4 mx-auto"
			/>
			<h1 className='text-3xl font-bold mb-4'>{user ? user?.username : "Username"}</h1>
			<div className='text-left'>
				<p><strong>Username:</strong> {user?.username}</p>
				<p><strong>Email:</strong> {user?.email}</p>
				<p><strong>Joined:</strong> {new Date(user?.joined).toLocaleDateString()}</p>
			</div>
			<button className="btn-primary mt-4" onClick={logout}>Logout</button>
		</article>
	)
}
