import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar: React.FC = () => {
    const [mobileOpen, setMobileOpen] = useState<boolean>(false);

    const toggleMobileMenu = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <nav className="bg-* p-4 shadow-md  tracking-wider w-full">
            <div className="max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between  items-center h-16">
                    {/* Logo Section */}
                    <div className="flex-shrink-0">
                        <span className="text-[18px] sm:text-xl md:text-3xl font-bold text-gray-600 tracking-widest hover:text-accent cursor-pointer transition-colors duration-300">
                            SkoolPilot
                        </span>
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden md:flex space-x-8">
                        <ul className="flex space-x-4">
                            {['Home', 'Features', 'Pricing', 'Contact'].map((item) => (
                                <li key={item}>
                                    <a
                                        href="#"
                                        className="text-primary hover:text-accent px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Mobile Menu Icon */}
                    <div className="md:hidden flex items-center">
                        <button onClick={toggleMobileMenu} className="text-primary focus:outline-none">
                            {mobileOpen ? (
                                <XMarkIcon className="h-6 w-6 text-primary" />
                            ) : (
                                <Bars3Icon className="h-6 w-6 text-primary" />
                            )}
                        </button>
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center space-x-6">
                        <button className="text-primary hover:border-gray-500 border-b border-gray-400 hover:text-accent px-3 py-2 text-sm font-medium transition-colors duration-300">
                            Login
                        </button>
                        <div className="border-r-2 border-gray-500 h-6"></div>
                        <button className="text-primary bg-accent hover:text-secondary px-6 py-2.5 rounded-xl text-sm font-medium transition-colors duration-300 shadow-md">
                            Try now
                        </button>
                    </div>
                </div>

                {/* Mobile Dropdown Menu */}
                {mobileOpen && (
                    <div className="md:hidden mt-4">
                        <ul className="flex flex-col space-y-2">
                            {['Home', 'Features', 'Pricing', 'Contact'].map((item) => (
                                <li key={item}>
                                    <a
                                        href="#"
                                        className="block text-primary hover:text-accent px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <div className="flex flex-col items-start mt-4 space-y-2">
                            <button className="text-primary hover:border-gray-500 border-b border-gray-400 hover:text-accent px-3 py-2 text-sm font-medium transition-colors duration-300">
                                Login
                            </button>
                            <button className="text-primary hover:border-gray-500 border-b border-gray-400 hover:text-accent px-3 py-2 text-sm font-medium transition-colors duration-300">
                                Try now
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
