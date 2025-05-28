export interface RegisterSchool {
    schoolName: string;
    schoolCode: string;
    schoolAddress: string;
    schoolPhone: string;
    schoolEmail: string;
    schoolPassword: string;
    plan: string;
    isPaid: boolean;
}


export interface LoginCredentials {
    phoneNumber: string;
    password: string;
}

export interface PublicAuthStore {
    userRole: string,
    loginAttempts: number
    userLogin: (loginCredentials: LoginCredentials) => Promise<unknown>;
    registerSchool: (formData: RegisterSchool) => Promise<unknown>;
    checkLoggedIn: () => Promise<unknown>;
  
}