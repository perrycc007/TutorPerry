import create from 'zustand';
import { devtools, persist } from 'zustand/middleware'
import Axios from "axios";
// define the store
let store = (set => ({
    userId: null,
    isLoggedin: false,
    favourite: [],
    fetchFavourite: async (userId) => {
      const res = await Axios.get('http://localhost:3001/favourite', 
      {userid: userId})
      set({ favourite: await res.data.result[0].caseid})
    },
    addUserid: (userid) => set({ userId: userid }),
    loginUserid: () => set({ isLoggedin: true }),
    logoutUserid: () => set({ isLoggedin: false }),
    cleanFavourite: () => set({favourite: []}),
    removeUserid: () => set({ userId:null}),
    addFavourite: (caseid) => set(state => 
      ({favourite : [...state.favourite,caseid]})),
    removeFavourite: (caseid) => set(state => 
      ({favourite :state.favourite.filter(cases => cases !==caseid)})), 
    }));

store = persist(store, {name: "data"})
const userStore =create(devtools(store))

  export default userStore;