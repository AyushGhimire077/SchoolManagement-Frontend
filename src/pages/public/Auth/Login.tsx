import { useEffect, useState } from "react";
import AuthNavbar from "./components/AuthNavbar";
import LoginForm from "./components/LoginFrom";
import { usePublicAuthStore } from "./publicAuthStore";
import AlterInfoPopup from "./components/AlterInfoPopup";
import Contact from "../../../componets/public/LandingComp/contact/Contact";

const Login = () => {
    const { loginAttempts } = usePublicAuthStore();
    const [infoPopup, setInfoPopup] = useState(false);

    useEffect(() => {
        if (loginAttempts >= 3) {
            setInfoPopup(true);
        }
        console.log(loginAttempts);
    }, [loginAttempts]);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <AuthNavbar />

            {infoPopup && (
                <AlterInfoPopup setInfoPopup={setInfoPopup} infoPopup={infoPopup} />
            )}

            <main className="flex-grow pt-8 pb-12 px-4">
                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
                    <div className="w-full hidden md:block lg:w-1/2">
                        <img
                            src="https://plus.unsplash.com/premium_photo-1723619021737-df1d775eccc8?fm=jpg&q=60&w=3000"
                            alt="Motivational Wallpaper"
                            className="w-full rounded-lg shadow-md"
                        />
                    </div>

                    <div className="w-full lg:w-1/2">
                        <LoginForm />
                    </div>
                </div>
            </main>

               <Contact />
        </div>
    );
};

export default Login;
