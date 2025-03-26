export const useAuthStore = (set, get) => ({
   user: null,
   login: async (username, password) => {
      const response = await fetch('/api/login', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
         const userData = await response.json();
         set({ user: userData });
         const router = useRouter();
         router.push('/profile');
      } else {
         throw new Error('Login failed');
      }
   },
   register: async (username, password) => {
      const response = await fetch('/api/register', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
         const userData = await response.json();
         set({ user: userData });
         const router = useRouter();
         router.push('/profile');
      } else {
         throw new Error('Login failed');
      }
   },
   logout: () => {
      set({ user: null });
      const router = useRouter();
      router.push('/');
   },
   isAuthenticated: () => {
      return get().user !== null;
   },
})
