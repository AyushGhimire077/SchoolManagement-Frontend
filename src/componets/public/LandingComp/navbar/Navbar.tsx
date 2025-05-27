import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { logoVariants, listVariants, itemVariants, menuIconVariants, buttonVariants, mobileMenuVariants } from '../motion'
import { useNavigate } from 'react-router-dom';
const Navbar: React.FC = () => {
    const [mobileOpen, setMobileOpen] = useState<boolean>(false);
    const [active, setActive] = useState<string>('');
    // Navigation items
    const navItems = [
        { label: 'Home', id: 'home' },
        { label: 'Features', id: 'features' },
        { label: 'Pricing', id: 'pricing' },
        { label: 'Contact', id: 'contact' },
    ];


    // Toggle mobile menu
    const toggleMobileMenu = () => setMobileOpen(!mobileOpen);

    // Scroll to section
    const scrollToSection = (id: string) => {
        setActive(id);

        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
            setMobileOpen(false); // Close mobile menu if open
        }
    };

    // Navigate
    const navigate = useNavigate();

    return (
        <nav className="bg-* p-4 shadow-md  tracking-wider w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex  justify-between items-center h-16">
                    {/* Logo Section */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={logoVariants}
                        className="flex-shrink-0"

                    >
                        <span className="text-[22px] sm:text-3xl md:text-4xl font-serif font-semibold text-secondary tracking-wide hover:text-indigo-800/80 duration-300 cursor-pointer">
                            LuxoraEd
                        </span>
                    </motion.div>

                    {/* Desktop Links */}
                    <div className="hidden md:flex space-x-8">
                        <motion.ul
                            className="flex space-x-4"
                            variants={listVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {navItems.map((item) => (
                                <motion.li
                                    key={item.id}
                                    variants={itemVariants}
                                >
                                    <a onClick={() => scrollToSection(item.id)} className={` ${active === item.id ? 'text-accent' : ''} text-primary cursor-pointer capitalize  hover:text-accent duration-300 hover:scale-105 px-3 py-2 rounded-md text-sm font-medium`}>
                                        {item.label}
                                    </a>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </div>

                    {/* Mobile Menu Icon */}
                    <motion.div
                        className="md:hidden z-40 flex items-center"
                        animate={mobileOpen ? 'open' : 'closed'}
                    >
                        <button
                            onClick={toggleMobileMenu}
                            className="text-primary focus:outline-none"
                        >
                            <motion.div variants={menuIconVariants}>
                                {mobileOpen ? (
                                    ""
                                ) : (
                                    <Bars3Icon className="h-6 w-6 text-primary" />
                                )}
                            </motion.div>
                        </button>
                    </motion.div>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center space-x-6">
                        <motion.button
                            custom={0}
                            onClick={() => navigate('/auth')}
                            initial="hidden"
                            animate="visible"
                            variants={buttonVariants}
                            className="text-primary duration-300 hover:border-gray-500 border-b border-gray-400 hover:text-accent px-3 py-2 text-sm font-medium"
                        >
                            Login
                        </motion.button>

                        <div className="border-r-2 border-gray-500 h-6" />

                        <motion.button
                            custom={1}
                            onClick={() => navigate('/auth/register-school')}
                            initial="hidden"
                            animate="visible"
                            variants={buttonVariants}
                            className="bg-[#3c366be3] hover:bg-[#524790] text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-xl w-fit mx-auto md:mx-0"
                        >
                            Try now
                        </motion.button>
                    </div>
                </div>

                {/* Mobile Dropdown Menu */}
                <AnimatePresence>
                    {mobileOpen && (
                        <motion.div
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={mobileMenuVariants}
                            className="md:hidden fixed right-0 top-0 h-[100dvh] w-[70%] px-6  z-30 bg-white backdrop-blur-lg shadow-xl py-8"
                        >
                            <div className='flex items-center justify-end'>
                                <XMarkIcon onClick={toggleMobileMenu} className="h-6 w-6  text-primary" />
                            </div>
                            <motion.ul className="flex pt-10 flex-col items-center space-y-6">
                                {navItems.map((item, index) => (
                                    <motion.li
                                        key={item.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            type: 'spring',
                                            stiffness: 200,
                                            delay: index * 0.08
                                        }}
                                        className="border-b border-gray-100 w-full text-center"
                                    >
                                        <a
                                            onClick={() => scrollToSection(item.id)}
                                            className="block text-primary hover:text-accent px-3 py-3 rounded-md text-base font-medium"
                                        >
                                            {item.label}
                                        </a>
                                    </motion.li>
                                ))}
                            </motion.ul>

                            <div className="flex flex-col items-center mt-8 space-y-6">
                                <motion.button
                                    onClick={() => navigate('/auth')}
                                    className="text-primary border-b border-gray-300 hover:text-accent px-4 py-2 text-base font-medium"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    Login
                                </motion.button>
                                <motion.button
                                    onClick={() => navigate('/auth/admin')}
                                    className="text-blue-100 bg-accent hover:bg-accent-dark px-8 py-3 rounded-xl text-base font-medium shadow-lg"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    whileHover={{ scale: 1.05, boxShadow: '0px 4px 15px rgba(0,0,0,0.2)' }}
                                >
                                    Try now
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};

export default Navbar;