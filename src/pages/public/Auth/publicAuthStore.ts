import { create } from "zustand";
import { axiosInstance } from "../../../global/axiosInstance";
import { RegisterSchool, LoginCredentials, PublicAuthStore } from "./IPublicAuth"
import { toast } from "react-hot-toast";
import { handleApiError } from "../../../utils/handleApiError";

export const usePublicAuthStore = create((set, get): PublicAuthStore => ({

    // logged user role
    userRole: "",
    userToken: "",

    loginAttempts: 0,

    userLogin: async (loginCredentials: LoginCredentials) => {
        try {
            const res = await axiosInstance.post("/auth/login", loginCredentials);

            if (res.status === 200) {
                set({ userRole: res.data.role, loginAttempts: 0 });
                toast.success(res?.data?.message || "Login successful");
                return res.data;
            } else {
                const currentAttempts = get().loginAttempts + 1;
                set({ loginAttempts: currentAttempts });
                toast.error(res?.data?.message || "Login failed");
                if (currentAttempts >= 3) {
                    toast("Too many failed attempts. Please check your credentials carefully.");
                }


                return res.data;
            }



        } catch (err) {
            const currentAttempts = get().loginAttempts + 1;
            set({ loginAttempts: currentAttempts });

            handleApiError(err, "Login failed");


        }
    },

    registerSchool: async (formData: RegisterSchool) => {
        try {
            const res = await axiosInstance.post(`/schools/register`, formData);

            if (res.status === 200) {
                toast.success(res?.data?.message || "Registration successful");
                return res.data;
            } else {
                toast.error(res?.data?.message || "Registration failed");
            }


            return res.data;
        } catch (err) {
            handleApiError(err, "Registration failed")
        }
    },

    // check is loggedin and who is 
    checkLoggedIn: async () => {
        const res = await axiosInstance.get(`/auth/check`);
        // set role
        set({ userToken: res.data.token })
        set({ userRole: res.data.role })
        return res.data;

    },

}));
