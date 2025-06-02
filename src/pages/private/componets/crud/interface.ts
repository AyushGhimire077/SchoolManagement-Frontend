import { Key } from "react";

export interface Payment {
    amount: number;
    paymentDate: string;
    method?: string;
}

export interface Student {
    id?: Key | null;
    feePaid?: boolean;
    sectionName?: number;
    classNumber?: string;

    isActiveClass?: boolean;

    username?: string;
    password?: string;
    phone?: string;
    rollNumber?: string;
    parentName?: string;
    parentPhone?: string;
    lastPaidDate?: string;
    classroomId?: number;
    fees?: number;
    paid?: boolean;
    payments?: Payment[];
  }

export interface Class {
    classNumber: number;
    sectionName: string;
}

export interface CrudStore {
    students: Student[];
    currentPage: number;
    totalPages: number;
    totalItems: number;

   
    registerStudents: (studentInfo: Student) => Promise<void>;
    registerClass: (classInfo: Class) => Promise<void>;
    setCurrentPage: (page: number) => void;
    fetchStudents: (page: number, size: number) => Promise<void>;
    searchStudents: (searchQuery: string) => Promise<void>;
}
  

export interface GetStudentsProps {
    searchTerm: string;
    data: any[];
  }