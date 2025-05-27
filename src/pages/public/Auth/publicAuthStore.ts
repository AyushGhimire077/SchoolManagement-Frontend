import { create } from "zustand";
import { axiosInstance } from "../../../global/axiosInstance";
import { AuthState, LoginCredentials, PublicAuthStore } from "./IPublicAuth"

export const usePublicAuthStore = create((set): PublicAuthStore => ({

    // logged user role
    userRole: "",

    userLogin: async (loginCredentials: LoginCredentials) => {
        try {
            const res = await axiosInstance.post("/auth/login", loginCredentials);

            return res.data

        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    registerSchool: async (formData: AuthState) => {
        try {
            const res = await axiosInstance.post(`/schools/register`, formData);

            return res.data;
        } catch (err) {
            console.error("Registration failed:", err);
            throw err;
        }
    },

    // check is loggedin and who is 
    checkLoggedIn: async () => {
        try {
            const res = await axiosInstance.get(`/auth/check`);
            // set role
            set({ userRole: res.data.role })
            return res.data;
        } catch (err) {
            console.error("Registration failed:", err);
            set({ userRole: "" })
            throw err;
        }
    },

}));
