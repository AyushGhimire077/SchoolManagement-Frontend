import { useState } from "react";
import { usePublicAuthStore } from "../publicAuthStore";
import { LoginCredentials } from "../IPublicAuth";

const LoginForm = () => {
    const { userLogin } = usePublicAuthStore();
    const [loginCredentials, setLoginCredentials] = useState<LoginCredentials>({
        phoneNumber: "",
        password: "",
    });


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
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-8 font-poppins">
            <h2 className="text-2xl font-bold text-center text-secondary mb-6">
                Login to LuxoraEd
            </h2>


            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label className="text-sm text-gray-700">Phone Number</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={loginCredentials.phoneNumber}
                        onChange={handleChange}
                        placeholder="Enter your phone"
                        className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                </div>

                <div>
                    <label className="text-sm text-gray-700">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={loginCredentials.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-secondary text-white font-semibold py-2 rounded-md hover:bg-opacity-90 transition"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
