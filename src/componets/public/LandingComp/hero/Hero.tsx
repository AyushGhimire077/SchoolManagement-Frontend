import { motion } from "framer-motion";
import heroImg from "../../../../assets/heroImage.png";
import { containerVariants, fadeUp, imageVariants } from "../../LandingComp/motion";
import { useNavigate } from "react-router-dom";
const Hero: React.FC = () => {

    // navigate
    const navigate = useNavigate();

    return (
        <section id="home">
            <div className="max-w-7xl w-[90%] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20 min-h-[600px] relative overflow-hidden">
                    {/* Text Content */}
                    <motion.div
                        className="md:order-1 max-w-2xl flex flex-col justify-center text-center md:text-left z-10"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.h1
                            className="text-3xl md:text-5xl lg:text-6xl font-bold text-secondary mb-6 leading-tight"
                            variants={fadeUp}
                        >
                            Manage your institute with ease.
                            <span className="text-pink-400/75 tracking-wider border-r-2 border-pink-400 type-writer block mt-4">
                                SkoolPilot
                            </span>
                            {" "}is here to help you.
                        </motion.h1>

                        <motion.p
                            className="text-base md:text-lg text-secondary mb-8 max-w-2xl mx-auto md:mx-0 leading-relaxed"
                            variants={fadeUp}
                        >
                            SkoolPilot is a comprehensive school management system that simplifies
                            administration tasks. Manage <span className='text-shadow-blue-950'>students, teachers, subjects, statistics,
                                and more</span> with our intuitive platform.
                        </motion.p>

                        <motion.button
                            variants={fadeUp}
                            onClick={() => navigate('/auth/admin')}
                            className="bg-accent hover:bg-sky-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-300 shadow-lg
              hover:shadow-xl transform w-fit mx-auto md:mx-0"

                        >
                            Get Started Now
                        </motion.button>
                    </motion.div>

                    {/* Image */}
                    <motion.img
                        src={heroImg}
                        alt="School management interface"
                        variants={imageVariants}
                        initial="hidden"
                        animate="visible"
                        className="hidden xl:block absolute ml-10 inset-0 w-full h-full object-cover pointer-events-none 
                   drop-shadow-[0_0_5px_white] sm:drop-shadow-[0_0_8px_black]"
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;
