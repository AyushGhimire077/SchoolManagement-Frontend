import { motion } from "framer-motion";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

const Contact: React.FC = () => {
    const socials = [
        {
            icon: <EnvelopeIcon className="h-6 w-6 text-primary" />,
            href: "mailto:ayushghimire077@gmail.com",
            label: "Email",
            color: "hover:text-blue-500"
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
                    <path d="M12 0C5.37 0 0 5.37 0 12a12 12 0 008.21 11.42c.6.11.82-.26.82-.58v-2.17c-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.35-1.77-1.35-1.77-1.1-.75.08-.73.08-.73 1.22.09 1.87 1.25 1.87 1.25 1.08 1.85 2.83 1.31 3.52 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.28-1.55 3.3-1.23 3.3-1.23.66 1.64.24 2.86.12 3.16.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.63-5.47 5.93.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.82.58A12.01 12.01 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
            ),
            href: "https://github.com/AyushGhimire077",
            label: "GitHub",
            color: "hover:text-gray-800"
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
                    <path d="M22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.43c-1.14 0-2.06-.91-2.06-2.03s.92-2.03 2.06-2.03c1.14 0 2.06.91 2.06 2.03s-.92 2.03-2.06 2.03zM20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.95v5.66H9.33V9h3.42v1.56h.05c.48-.91 1.64-1.86 3.38-1.86 3.61 0 4.27 2.37 4.27 5.46v6.29z" />
                </svg>
            ),
            href: "https://www.linkedin.com/in/ayushghimiree/",
            label: "LinkedIn",
            color: "hover:text-blue-700"
        }
    ];

    return (
        <section id="contact" className="bg-gray-100 pt-20  relative">
            <div className="max-w-7xl w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center text-center min-h-[280px] relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="w-full max-w-3xl"
                    >
                        <motion.h2
                            className="text-4xl md:text-5xl font-bold text-secondary mb-6"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            Let's Connect
                        </motion.h2>

                        <motion.p
                            className="text-base md:text-lg text-gray-700 mb-6 leading-relaxed"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            Have a question, suggestion, or just want to say hello? Reach out to me anytime —
                            I'm always happy to connect and collaborate.
                        </motion.p>

                        <motion.div
                            className="flex justify-center gap-6 mt-8"
                            initial="hidden"
                            whileInView="visible"
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: {
                                        staggerChildren: 0.1,
                                        delayChildren: 0.6
                                    }
                                }
                            }}
                        >
                            {socials.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`text-secondary ${social.color} transition-colors`}
                                    aria-label={social.label}
                                    variants={{
                                        hidden: { opacity: 0, scale: 0.8 },
                                        visible: {
                                            opacity: 1,
                                            scale: 1,
                                            transition: {
                                                type: "spring",
                                                stiffness: 300,
                                                damping: 10
                                            }
                                        }
                                    }}
                                    whileHover={{
                                        scale: 1.1,
                                        y: -3
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <motion.div
                                        className="p-3 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow"
                                        whileHover={{ rotate: [0, -10, 10, 0] }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        {social.icon}
                                    </motion.div>
                                </motion.a>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Footer Message */}
            <motion.div
                className="text-center text-sm py-3.5 text-gray-500 "
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
            >
                © {new Date().getFullYear()} Ayush Ghimire. All rights reserved.
            </motion.div>
        </section>
    );
};

export default Contact;