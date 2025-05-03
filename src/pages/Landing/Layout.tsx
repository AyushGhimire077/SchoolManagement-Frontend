import Navbar from "../../componets/LangingComp/navbar/Navbar";
import Hero from "../../componets/LangingComp/hero/Hero";
import Features from "../../componets/LangingComp/features/Features";
import Contact from "../../componets/LangingComp/contact/Contact";
import Pricing from "../../componets/LangingComp/Pricing/Pricing";
const Layout = () => {
    return (
        <div className="bg-gradient-to-br from-[#FFB6C1] via-white to-[#4A90E2]">
            <Navbar />
            <Hero />
            <hr className=" p-2.5 text-[#9fc3cd] max-w-full w-[80%] mx-auto" />
            <Features />
            <Pricing />
            <hr className="text-gray-200 " />
            <Contact />
        </div>
    )
}

export default Layout