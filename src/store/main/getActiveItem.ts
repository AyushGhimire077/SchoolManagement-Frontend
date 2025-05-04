import { create } from 'zustand';
import { IActiveItem } from './IMain';


export const useActiveItem = create<IActiveItem>((set) => ({
    activeItem: 'dashboard',
    setActiveItem: (item: string) => set({ activeItem: item }),
}));

