export interface CrudStore{
    registerStudents: (studentInfo: Student) => void;
    registerClass: (classInfo: Class) => void;
}

// types/Student.ts

export interface Payment {
    amount: number;
    paymentDate: string; 
    method?: string;
}

export interface Student {
    username: string;
    password: string;
    phone: string;
    rollNumber: string;
    parentName: string;
    parentPhone: string;
    lastPaidDate: string;
    classroomId: number;
    fees: number;
    paid: boolean;
    payments: Payment[];
}

export interface Class {
    classNumber: number;
    sectionName: string;
}
  