import { create } from "zustand";
import { axiosInstance } from "../../global/axiosInstance";
import toast from "react-hot-toast";
import { handleApiError } from "../../utils/handleApiError";
import { PrivateStore } from "./IPrivate";

export const usePrivateStore = create<PrivateStore>((set) => ({
    sidebarItems: [],
    setSidebarItems: (items) => set({ sidebarItems: items }),

    getSidebarItems: async () => {
        try {
            const res = await axiosInstance.get("/auth/sidebar/get-sidebar");
            set({ sidebarItems: res.data });
        } catch (err) {
            handleApiError(err, "Fetching sidebar failed");
            toast.error("Failed to fetch sidebar items");
        }
    },

    activeItem: "",
    setActiveItem: (itemId) => set({ activeItem: itemId }),

}));
