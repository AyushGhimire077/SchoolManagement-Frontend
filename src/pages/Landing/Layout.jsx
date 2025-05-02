import Navbar from "../../componets/LangingComp/Navbar";
import Hero from "../../componets/LangingComp/Hero";
const Layout = () => {
    return (
        <div className="bg-gradient-to-br from-[#FFB6C1] via-white to-[#4A90E2]">
            <Navbar />
            {/* <hr className=" p-2.5 text-[#E0E0E0]" /> */}
            <Hero />
        </div>
    )
}

export default Layout