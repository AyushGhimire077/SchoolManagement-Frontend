import { axiosInstance } from './../../../global/axiosInstance';
import { create } from "zustand";
import toast from "react-hot-toast";
import { handleApiError } from "../../../global/handleApiError";
import { IOverView1 } from './interface';

export const useOverview1Store = create((set): IOverView1 => ({

    totelLenInfo: undefined,

    getTotalLenInfo: async () => {
        try {
            const res = await axiosInstance.get("/mixin/get-totalInfo");
            set({ totelLenInfo: res.data || [] });
            return;
        } catch (err) {
            handleApiError(err, "Fetching total len failed");
            toast.error("Failed to fetch total len");
            return;
        }
    },

}));