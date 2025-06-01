import { create } from "zustand";
import { Class, CrudStore, Student } from "./interface";
import { axiosInstance } from "../../../../global/axiosInstance";
import toast from "react-hot-toast";

export const useCrudStore = create<CrudStore>((set) => ({
    students: [],
    currentPage: 0,
    totalPages: 0,
    totalItems: 0,

    registerStudents: async (studentInfo: Student) => {
        try {
            const res = await axiosInstance.post("/mixin/register-student", studentInfo);

            if (res?.data?.status === 200) {
                toast.success(res?.data?.message || "Student registered successfully");
            } else {
                toast.error(res?.data?.message || "Could not register student");
            }
        } catch (error: any) {
            console.error(error);
            toast.error("Something went wrong!");
        }
    },

    registerClass: async (classInfo: Class) => {
        try {
            await axiosInstance.post("/mixin/register-class", classInfo);
            toast.success("Successfully registered class");
        } catch (error: any) {
            console.error(error);
            toast.error("Something went wrong!");
        }
    },

    setCurrentPage: (page: number) => set({ currentPage: page }),

    fetchStudents: async (page: number, size: number) => {
        console.log(page, size)
        try {
            const res = await axiosInstance.get(`/mixin/fetch/students?page=${page}&size=${size}`);

            if (res?.data) {
                set({
                    students: res.data.content,
                    totalPages: res.data.totalPages,
                    totalItems: res.data.totalElements,
                });
            } else {
                toast.error("No data returned");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch students");
        }
    },
}));
