import { FormEvent, useState } from "react";
import { usePublicAuthStore } from "../publicAuthStore";
import { AuthState } from "../IPublicAuth";
import { motion } from "framer-motion";

const inputAnimations = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 },
};

const RegisterForm = () => {
  const [formData, setFormData] = useState<AuthState>({
    schoolName: "",
    schoolCode: "",
    schoolAddress: "",
    schoolPhone: "",
    schoolEmail: "",
    schoolPassword: "",
    isPaid: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { registerSchool } = usePublicAuthStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
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
        <h1
          className="text-3xl font-bold text-primary"
        >
          School Registration
        </h1>
        <p className="text-gray-600">
          Create your institutional account to get started
        </p>
        <p className="text-gray-600">
          Take your school to the next level with EduPlatform
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 justify-center md:grid-cols-2 gap-6">
          {[
            { label: "School Name", name: "schoolName", required: true, type: "text", colSpan: false },
            { label: "School Code", name: "schoolCode", required: true, type: "text", colSpan: false },
            { label: "Address", name: "schoolAddress", required: false, type: "text", colSpan: true },
            { label: "Phone", name: "schoolPhone", required: false, type: "text", colSpan: false },
            { label: "Email", name: "schoolEmail", required: true, type: "email", colSpan: false },
            { label: "Password", name: "schoolPassword", required: true, type: "password", colSpan: false },
          ].map(({ label, name, required, type, colSpan }) => (
            <motion.div
              {...inputAnimations}
              className={colSpan ? "col-span-full" : ""}
              key={name}
            >
              <label
                className="block text-sm font-medium mb-2 text-primary"
                htmlFor={name}
              >
                {label}
              </label>
              <input
                id={name}
                name={name}
                type={type}
                required={required}
                value={formData[name as keyof AuthState] as string}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm
                           focus:border-var(--color-accent) focus:ring focus:ring-opacity-50
                           focus:ring-indigo-500 transition duration-300 px-4 py-2 font-sans text-primary"
              />
            </motion.div>
          ))}


        </div>

        <motion.button
          type="submit"
          disabled={isSubmitting}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className={`w-full md:w-auto px-8 py-4 rounded-lg font-semibold text-white shadow-lg
          transition-colors duration-300 ${isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-accent hover:bg-indigo-600"
            }`}
          style={{ backgroundColor: "var(--color-accent)" }}
        >
          {isSubmitting ? "Registering..." : "Register Now"}
        </motion.button>
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
