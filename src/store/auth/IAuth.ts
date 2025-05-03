export interface ILogin {
    email: string;
    password: string;
    paymentKey: string;
}

export interface IRegister {
    name: string;
    email: string;
    password: string;
    paymentKey: string;
    plan: string;
}

export interface IAuthStore {
    login: (credentials: ILogin) => Promise<void>;
    register: (credentials: IRegister) => Promise<void>;
}