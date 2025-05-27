import { FormEvent, useState } from "react";
import { usePublicAuthStore } from "../publicAuthStore";
import { RegisterSchool } from "../IPublicAuth";
import { motion } from "framer-motion";

const inputAnimations = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 },
};

const plans = [
  { label: "Basic", value: "BASIC" },
  { label: "Premium", value: "PREMIUM" },
];

const RegisterForm = () => {
  const [formData, setFormData] = useState<RegisterSchool>({
    schoolName: "",
    schoolCode: "",
    schoolAddress: "",
    schoolPhone: "",
    schoolEmail: "",
    plan: "",
    schoolPassword: "",
    isPaid: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { registerSchool } = usePublicAuthStore();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await registerSchool(formData);
      setFormData({
        schoolName: "",
        schoolCode: "",
        schoolAddress: "",
        schoolPhone: "",
        schoolEmail: "",
        schoolPassword: "",
        plan: "",
        isPaid: false,
      });
    } catch (err) {
      console.error("Registration failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl w-full mx-auto p-6 space-y-8 font-poppins"
    >
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-primary">School Registration</h1>
        <p className="text-gray-600">Create your institutional account to get started</p>
        <p className="text-gray-600">Take your school to the next level with EduPlatform</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1  md:grid-cols-2 gap-6">
          {[
            { label: "School Name", name: "schoolName", required: true, type: "text" },
            { label: "School Code", name: "schoolCode", required: true, type: "text" },
            { label: "Address", name: "schoolAddress", required: false, type: "text", full: true },
            { label: "Phone", name: "schoolPhone", required: false, type: "text" },
            { label: "Email", name: "schoolEmail", required: true, type: "email" },
            { label: "Password", name: "schoolPassword", required: true, type: "password" },
          ].map(({ label, name, required, type, full }) => (
            <motion.div
              key={name}
              {...inputAnimations}
              className={full ? "col-span-full" : ""}
            >
              <label htmlFor={name} className="block text-sm font-medium text-primary mb-2">
                {label}
              </label>
              <input
                id={name}
                name={name}
                type={type}
                required={required}
                value={formData[name as keyof RegisterSchool] as string}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 text-primary"
              />
            </motion.div>
          ))}

          <motion.div {...inputAnimations}>
            <label htmlFor="plan" className="block text-sm font-medium text-primary mb-2">
              Select Plan
            </label>
            <select
              name="plan"
              id="plan"
              required
              value={formData.plan}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 shadow-sm focus:ring focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 text-primary"
            >
              <option value="" disabled>Select a plan</option>
              {plans.map(({ label, value }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </motion.div>

          
        </div>

        <div className="flex items-center pt-3 justify-center">
          <motion.button
            type="submit"
            disabled={isSubmitting}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className={`w-full md:w-auto px-8 md:px-36 py-4 rounded-lg font-semibold text-white shadow-lg transition-colors duration-300 ${isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-accent hover:bg-indigo-600"
              }`}
            style={{ backgroundColor: "var(--color-accent)" }}
          >
            {isSubmitting ? "Registering..." : "Register Now"}
          </motion.button>
      </div>
      </form>

      <p className="text-center text-sm text-gray-500">
        By continuing, you agree to our
        <a href="#" className="text-indigo-600 hover:underline ml-1">
          Terms of Service
        </a>
      </p>
    </motion.div>
  );
};

export default RegisterForm;
