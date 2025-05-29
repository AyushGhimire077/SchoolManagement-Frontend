import { ReactNode } from "react";

export interface IOverView1 {

    totelLenInfo?: TotalLenInfo,
    getTotalLenInfo: () => void


}
export interface LenBoxProps {
    len: number | undefined;
    icon: ReactNode;
    label: string;
    rate?: string;
}
export interface TotalLenInfo {
    totalStudents: number;
    totalTeachers: number;
    totalAdmins: number;
}
  