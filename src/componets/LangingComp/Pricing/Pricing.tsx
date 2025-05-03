import { motion } from "framer-motion";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const plans = [
    {
        name: "Basic Plan",
        price: "Rs. 4999/month",
        recommended: false,
        features: [
            "Teacher & Student Management",
            "Fees Tracking",
            "Parent Management",
            "Email & SMS Notifications",
            "Basic Reporting",
            "Up to 200 Students",
            "Standard Support",
        ],
    },
    {
        name: "Premium Plan",
        price: "Rs. 6999/month",
        recommended: true,
        features: [
            "Everything in Basic",
            "WhatsApp Integration",
            "Advanced Analytics",
            "Priority 24/7 Support",
            "Unlimited Students",
            "Custom Dashboards",
            "Role-Based Access Control",
        ],
    },
];

const Pricing: React.FC = () => {

    //navigate
    const navigate = useNavigate();

    return (
        <section className="py-20 bg-gray-100" id="pricing">
            <div className="max-w-7xl w-[90%] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-14"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                        Choose the Right Plan for You
                    </h1>
                    <p className="text-lg text-gray-600 max-w-xl mx-auto">
                        Scale confidently with powerful features tailored for your institution.
                    </p>
                </motion.div>

                <motion.div
                    className="grid gap-8 max-w-4xl mx-auto sm:grid-cols-2"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        visible: { transition: { staggerChildren: 0.2 } },
                        hidden: {},
                    }}
                >
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            variants={{
                                hidden: { opacity: 0, y: 40 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            transition={{ type: "spring", stiffness: 100, damping: 12 }}
                            className={`relative bg-white rounded-2xl p-8 border transition-all duration-300 ${plan.recommended
                                ? "border-accent shadow-xl scale-[1.02]"
                                : "border-gray-200 hover:border-blue-300"
                                }`}
                        >
                            {plan.recommended && (
                                <div className="absolute top-0 right-0 bg-accent text-white px-4 py-1 rounded-tr-2xl rounded-bl-xl text-sm font-semibold shadow-md">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-6">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-2 tracking-tight">
                                    {plan.name}
                                </h2>
                                <p className="text-3xl font-bold text-gray-900">{plan.price}</p>
                            </div>

                            <ul className="text-gray-700 space-y-3 text-sm mb-8">
                                {plan.features.map((feature, i) => (
                                    <motion.li
                                        key={i}
                                        whileHover={{ x: 6 }}
                                        className="flex items-start"
                                    >
                                        <CheckCircleIcon className="h-5 w-5 text-[#FFB6C1] mr-2 mt-[2px]" />
                                        <span>{feature}</span>
                                    </motion.li>
                                ))}
                            </ul>

                            <motion.button
                                onClick={() => navigate("/auth/admin")}
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                type="button"
                                className={`w-full py-3 px-6 rounded-lg text-sm font-medium transition-colors duration-200 ${plan.recommended
                                    ? "bg-blue-500 text-white hover:bg-blue-600"
                                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                                    }`}
                            >
                                Get Started
                            </motion.button>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="text-center mt-14 text-gray-600 text-sm"
                >
                    Need a custom solution?{" "}
                    <a id="contact" className="text-blue-500 font-medium hover:underline">
                        Contact us
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Pricing;
