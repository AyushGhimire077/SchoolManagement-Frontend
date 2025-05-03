import { ArrowLeftCircleIcon, ArrowRightIcon, ExclamationTriangleIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useAuthStore } from "../../store/auth/authStore";

// Define types for the form data and component state
interface FormData {
  name: string;
  email: string;
  password: string;
  paymentKey: string;
}

const AuthPage = () => {
  const [isRegister, setIsRegister] = useState<boolean>(true);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    paymentKey: ""
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  //for notice
  const [showNote, setShowNote] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(5);
  useEffect(() => {
    if (!showNote) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setShowNote(false);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [showNote]);



  const { login, register } = useAuthStore();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const toggleMode = () => {
    setIsRegister(!isRegister);
    setFormData({ name: "", paymentKey: "", email: "", password: "" });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isRegister) {
        await register(formData);
      } else {
        await login(formData);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#FFB6C1] via-white to-[#4A90E2] flex items-center justify-center px-4 py-10">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10 w-full max-w-md bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl shadow-xl p-8 sm:p-10"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="absolute top-4 left-4 text-gray-500 hover:text-gray-700 transition"
        >
          <ArrowLeftCircleIcon className="h-7 w-7 " onClick={() => window.history.back()} />
        </motion.button>

        <motion.div variants={itemVariants} className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
            {isRegister ? "Join SkoolPilot" : "Welcome Back"}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {isRegister
              ? "Create your premium account now."
              : "Sign in to access your dashboard."}
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {isRegister && (
            <>
              <motion.div variants={itemVariants}>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FF7EB3] focus:outline-none"
                />
              </motion.div>
            </>
          )}
          <motion.div variants={itemVariants}>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Payment Key</label>
            <input
              type="text"
              name="paymentKey"
              required
              value={formData.paymentKey}
              onChange={handleChange}
              placeholder="Enter payment key"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FF7EB3] focus:outline-none"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="skoolpilot@example.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FF7EB3] focus:outline-none"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="relative">
            <label className="text-sm font-medium text-gray-700 mb-1 block">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FF7EB3] focus:outline-none pr-12"
            />
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute right-3 top-[38px] text-gray-500"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </motion.button>
          </motion.div>

          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-[#FF7EB3] hover:bg-[#ff5d9c] transition text-white font-semibold py-3 rounded-lg shadow-sm flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="h-4 w-4 border-2 border-white rounded-full animate-spin" />
                {isRegister ? "Creating Account..." : "Signing In..."}
              </>
            ) : (
              isRegister ? "Sign Up" : "Sign In"
            )}
          </motion.button>
        </form>

        <AnimatePresence mode="wait">
          <motion.div
            key={isRegister ? "signup" : "login"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-6 text-sm text-center text-gray-600"
          >
            {isRegister ? (
              <>
                Already have an account?{" "}
                <button
                  onClick={toggleMode}
                  className="text-[#FF7EB3] font-semibold hover:underline transition"
                >
                  Sign In
                </button>
              </>
            ) : (
              <>
                Don’t have an account?{" "}
                <button
                  onClick={toggleMode}
                  className="text-[#FF7EB3] font-semibold hover:underline transition"
                >
                  Sign Up
                </button>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>


      {/* note */}
      <AnimatePresence>
        {showNote && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-5 right-5 max-w-md w-[90%] mx-auto p-6 bg-gradient-to-br from-[#FF6B8E] to-[#FF7EB3] rounded-xl shadow-xl border-2 border-white/20 z-50"
          >

            <div className="flex-shrink-0">
              <div className="h-6 w-6 bg-white/20 rounded-full flex items-center justify-center">
                <ExclamationTriangleIcon className="h-5 w-5 text-white" />
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-2 drop-shadow-md">
                Important Beta Notice
              </h3>
              <p className="text-white/90 text-sm leading-relaxed">
                SkoolPilot is currently in <span className="font-semibold">beta</span>.
                To request access, please contact our team. All payments are securely
                managed through SkoolPilot's platform.
              </p>
              <div className="mt-4 flex justify-between items-center">
                <button className="bg-white/10 hover:bg-white/20 px-6 py-2 text-sm rounded-lg text-white font-semibold flex items-center gap-2 transition-all">
                  Contact Us Now
                  <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
                <span className="text-white/70 text-sm">
                  Auto-closes in <span className="font-semibold">{secondsLeft}</span> seconds
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AuthPage;
