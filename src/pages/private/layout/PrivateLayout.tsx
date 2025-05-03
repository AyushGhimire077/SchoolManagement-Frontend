import Sidebar from "../../../componets/private/Sidebar";
import PrivateNavbar from "../../../componets/private/Navbar";
import { Outlet } from "react-router-dom";

const PrivateLayout = () => {
    return (
        <div className="flex h-screen font-poppins bg-[#0F40A0]">
            <Sidebar />

            <div className="flex flex-col bg-sky-50 mt-5 mx-5 rounded-3xl flex-1 overflow-hidden">
                    <PrivateNavbar />
                <main className="p-4 overflow-y-auto flex-1 ">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default PrivateLayout;
