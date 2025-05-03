import Contact from "../../../componets/public/LandingComp/contact/Contact"
import Features from "../../../componets/public/LandingComp/features/Features"
import Hero from "../../../componets/public/LandingComp/hero/Hero"
import Navbar from "../../../componets/public/LandingComp/navbar/Navbar"
import Pricing from "../../../componets/public/LandingComp/Pricing/Pricing"

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