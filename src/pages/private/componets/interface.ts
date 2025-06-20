import { ReactNode } from "react";

export interface IOverView1 {

    totelLenInfo?: TotalLenInfo,
    feeStatic?: FeeStatic
    isReload?: boolean


    getTotalLenInfo: () => void
    getFeesStatics: (startDate?: string) => Promise<void>;
    refreshData: () => void


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
export interface FeeStatic {
    totalFeesCollected: number
    totalFeesPending: number
    latestPaymentDate: Date
    paidStudentsCount: number
    unpaidStudentsCount: number
    totalStudentsCount: number
    averageFeesCollected: number
}


export interface FeeStaticItem {
    month: string;
    totalFeesCollected: number;
    totalFeesPending: number;
    averageFeesCollected?: number;
}

export interface ChartDataItem {
    name: string;
    value: number;
}