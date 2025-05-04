import { JSX } from "react";

export interface SidebarItem {
    label: string;
    id: string;
    icon: JSX.Element;
    children?: SidebarItem[];
}