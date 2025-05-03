import axios from "axios";
import toast from "react-hot-toast";
import { ADMIN_API_ENDPOINTS, BASE_URL } from "../../global/api";
import { IAuthStore, ILogin, IRegister } from "./IAuth";
import { create } from "zustand";

export const useAuthStore = create<IAuthStore>((set) => ({
    login: async ({ email, password, paymentKey }: ILogin) => {
        try {
            const { data } = await axios.post(`${BASE_URL}${ADMIN_API_ENDPOINTS.LOGIN}`, {
                email,
                password,
                paymentKey,
            }, {
                withCredentials: true,
            });

            if (data.success) {
                toast.success(data.message || "Login successful");
                localStorage.setItem("info", JSON.stringify(data.savedUser));
            } else {
                toast.error(data.message || "Login failed");
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong");
            console.error(error);
        }
    },

    register: async ({ name, email, password, paymentKey }: IRegister) => {
        try {
            const { data } = await axios.post(`${BASE_URL}${ADMIN_API_ENDPOINTS.REGISTER}`, {
                name,
                email,
                password,
                paymentKey,
            }, {
                withCredentials: true,
            });

            if (data.success) {
                toast.success(data.message || "Registration successful");
            } else {
                toast.error(data.message || "Registration failed");
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong");
            console.error(error);
        }
    },
}));
