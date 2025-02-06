import { create } from "zustand";

const useAuthStore = create((set) => ({
    // user: {
    //     email: "suyash@gmail.com",
    //     expertiseIN: [],
    //     id: "6727a3f7e2ffdd8c141c64df",
    //     name: "suyash",
    //     phone: "4561230789",
    //     pincode: "401501",
    //     role: "worker"
    // },
    user: null,
    setUser: (user) => {
        console.log(user);
        return set({ user })
    },
}))


export default useAuthStore;