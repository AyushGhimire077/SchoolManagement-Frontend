import { axiosInstance } from './../../../global/axiosInstance';
import { create } from "zustand";
import toast from "react-hot-toast";
import { handleApiError } from "../../../utils/handleApiError";
import { IOverView1 } from './interface';

export const useOverview1Store = create((set, get): IOverView1 => ({

    totelLenInfo: undefined,
    feeStatic: undefined,
    isReload: false,

    getTotalLenInfo: async () => {
        try {
            const res = await axiosInstance.get("/mixin/get-totalInfo");
            set({ totelLenInfo: res.data || [] });
        } catch (err) {
            handleApiError(err, "Fetching total len failed");
            toast.error("Failed to fetch total len");
        }
    },

    getFeesStatics: async () => {
        try {
            const res = await axiosInstance.get("/mixin/get-feeStatic");
            set({ feeStatic: res.data || [] });
        } catch (err) {
            handleApiError(err, "Fetching fees statics failed");
            toast.error("Failed to fetch fees statics");
        }
    },

    refreshData: async () => {
        set({ isReload: true });
        await Promise.all([
            get().getTotalLenInfo(),
            get().getFeesStatics(),
        ]);
        set({ isReload: false });
        toast.success("Data refreshed");
    }

}));
