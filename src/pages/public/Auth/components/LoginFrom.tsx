import { useState } from "react";
import { usePublicAuthStore } from "../publicAuthStore";
import { LoginCredentials } from "../IPublicAuth";
const LoginForm = () => {
    const { userLogin } = usePublicAuthStore();
    const [loginCredentials, setLoginCredentials] = useState<LoginCredentials>({
        phoneNumber: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginCredentials((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await userLogin(loginCredentials);
        } catch (err: unknown) {
            console.log(err);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-2xl p-8 mt-12 font-poppins border border-gray-100">
            <div className="flex justify-center mb-8">
                <div className="bg-secondary p-3 rounded-full shadow-lg">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>
            </div>

            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 relative">
                Welcome Back
                <span className="block text-sm font-normal text-gray-500 mt-2">Login to your LuxoraEd account</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                    <input
                        type="text"
                        required
                        name="phoneNumber"
                        value={loginCredentials.phoneNumber}
                        onChange={handleChange}
                        placeholder=" "
                        className="w-full px-4 py-3 bg-transparent border-2 border-gray-200 rounded-lg focus:outline-none focus:border-secondary transition-colors peer"
                    />
                    <label className="absolute left-4 bg-white px-1 text-gray-500 transition-all duration-200 pointer-events-none 
    peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base 
    peer-focus:-top-2 peer-focus:text-sm peer-focus:text-secondary">
                        Phone Number
                    </label>

                </div>

                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        required
                        value={loginCredentials.password}
                        onChange={handleChange}
                        placeholder=" "
                        className="w-full px-4 py-3 bg-transparent border-2 border-gray-200 rounded-lg focus:outline-none focus:border-secondary transition-colors peer pr-12"
                    />
                    <label className="absolute left-4 bg-white px-1 text-gray-500 transition-all duration-200 pointer-events-none 
    peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base 
    peer-focus:-top-2 peer-focus:text-sm peer-focus:text-secondary">
                        Password
                    </label>

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-4 text-gray-400 hover:text-secondary transition-colors"
                    >
                        {/* {showPassword ? <EyeSlashIcon size={20} /> : <EyeIcon size={20} />} */}
                    </button>
                </div>



                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-secondary to-primary py-4 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Login
                </button>

            </form>
        </div>
    );
};

export default LoginForm;