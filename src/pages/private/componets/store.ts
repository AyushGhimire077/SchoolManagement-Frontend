import { axiosInstance } from "../../../global/axiosInstance";
import { create } from "zustand";
import toast from "react-hot-toast";
import { handleApiError } from "../../../utils/handleApiError";
import { IOverView1 } from "./interface";

export const useOverview1Store = create<IOverView1>((set, get) => ({
    totelLenInfo: undefined,
    feeStatic: undefined,
    isReload: false,

    getTotalLenInfo: async () => {
        try {
            const res = await axiosInstance.get("/mixin/get-totalInfo");
            set({ totelLenInfo: res.data ?? [] });
        } catch (err) {
            handleApiError(err, "Fetching total length info failed");
            toast.error("Failed to fetch total length info");
        }
    },

    getFeesStatics: async (startDate?: string): Promise<void> => {
        try {
            const today = new Date().toISOString().split("T")[0];

            const params = {
                startDate: startDate || today,
            };
            console.log(params);

            const res = await axiosInstance.get("/mixin/get-feeStatic", { params });
            set({ feeStatic: res.data ?? [] });
        } catch (err) {
            handleApiError(err, "Fetching fee statistics failed");
            toast.error("Failed to fetch fee statistics");
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
    },
}));
