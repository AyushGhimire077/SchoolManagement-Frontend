import { create } from "zustand";
import { ICheckLoggedIn } from "./IAuth";
import { BASE_URL } from "../../global/api";
import axios from "axios";

export const useAuthCheck = create<ICheckLoggedIn>((set) => ({

    // check if user is logged in, default is false
    isLoggedIn: false,

    // check loggedIn
    checkLoggedIn: async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}/api/check/check-role`, {
                withCredentials: true,
            });
            if (data.success) {
                localStorage.setItem("role", data?.user?.role);
                console.log(data?.user?.role);
                set({ isLoggedIn: true });
            }else{
                localStorage.removeItem("role");
                set({ isLoggedIn: false });
            }
        } catch (error: any) {
            console.error(error);
            set({ isLoggedIn: false });
            localStorage.removeItem("role");
        }
    },

}));