import AuthNavbar from "./components/AuthNavbar";
import LoginForm from "./components/LoginFrom";

const Login = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <AuthNavbar />

            <main className="flex-grow pt-8 pb-12 px-4">
                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
                    {/* Left Image Section */}
                    <div className="w-full lg:w-1/2">
                        <img
                            src="https://plus.unsplash.com/premium_photo-1723619021737-df1d775eccc8?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bW90aXZhdGlvbmFsJTIwd2FsbHBhcGVyc3xlbnwwfHwwfHx8MA%3D%3D"
                            alt="Motivational Wallpaper"
                            className="w-full rounded-lg shadow-md"
                        />
                    </div>

                    {/* Right Login Form Section */}
                    <div className="w-full lg:w-1/2">
                        <LoginForm />
                    </div>
                </div>
            </main>

            <footer className="bg-white border-t py-4 shadow-inner">
                <div className="text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} EduPlatform. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default Login;
