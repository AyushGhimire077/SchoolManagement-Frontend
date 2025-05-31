/* eslint-disable @typescript-eslint/no-unused-expressions */
import { create } from "zustand"
import { Class, CrudStore, Student } from "./interface";
import { axiosInstance } from "../../../../global/axiosInstance";
import toast from "react-hot-toast";

export const useCrudStore = create<CrudStore>(() => ({


    registerStudents: async (studentInfo: Student) => {

        try {
            const res = await axiosInstance.post("/mixin/register-student", studentInfo);

            if (res?.data?.status == 200) {
                toast.success(res?.data?.message) || "Student registerd succesfully)"
            } else {
                toast.error(res?.data?.message) || "Could not registerd student)"
            }

            return;
        } catch (error: any) {
            console.log(error);
            toast.error("Something went wrong!")
            return;
        }
    },

    registerClass: async (classInfo: Class) => {

        try {
            const res = await axiosInstance.post("/mixin/register-class", classInfo);
 
            toast.success("Succesfully registered class")

            return;
        } catch (error: any) {
            console.log(error);
            toast.error("Something went wrong!")
            return;
        }

    },

}));