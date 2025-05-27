export interface AuthState {
    schoolName: string;
    schoolCode: string;
    schoolAddress: string;
    schoolPhone: string;
    schoolEmail: string;
    schoolPassword: string;
    isPaid: boolean;
}


export interface LoginCredentials {
    phoneNumber: string;
    password: string;
}

export interface PublicAuthStore {
    userRole: string,
    userLogin: (loginCredentials: LoginCredentials) => Promise<unknown>;
    registerSchool: (formData: AuthState) => Promise<unknown>;
    checkLoggedIn: () => Promise<unknown>;
  
}