export const useAuthStore = (set, get) => ({
   user: null,
   authloading: false,
   dest: null,
   setDest: (dest) => {
      set({ dest })
   },
   setUser: (user) => {
      set({ user })
   },
   login: async (username, password) => {
      set({ authloading: true })
      // const response = await fetch('/api/login', {
      //    method: 'POST',
      //    headers: {
      //       'Content-Type': 'application/json',
      //    },
      //    body: JSON.stringify({ username, password }),
      // });

      // if (response.ok) {
      //    const userData = await response.json();
      //    set({ user: userData });
      //    // const router = useRouter();
      //    // router.push('/profile');
      // } else {
      //    throw new Error('Login failed');
      // }
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set({ authloading: false })
   },
   register: async (username, password) => {
      set({ authloading: true })
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
      set({ authloading: false })
   },
   logout: async () => {
      set({ authloading: true });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set({ user: null });
      set({ authloading: false });
   },
   isAuthenticated: () => {
      return get().user !== null;
   },
})
