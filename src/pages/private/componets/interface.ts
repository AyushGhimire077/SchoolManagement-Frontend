import { ReactNode } from "react";

export interface IOverView1 {

    totelLenInfo?: TotalLenInfo,
    getTotalLenInfo: () => void


}
export interface LenBoxProps {
    len: number | undefined;
    icon: ReactNode;
    label: string;
    rate?: number;
}
export interface TotalLenInfo {
    totalStudents: number;
    totalTeachers: number;
    totalAdmins: number;

    studentRateChange: number;
    teacherRateChange: number;
    adminRateChange: number;
}
  