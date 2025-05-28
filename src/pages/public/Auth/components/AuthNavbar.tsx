import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const AuthNavbar = () => {
  return (
    <div className="relative flex flex-col items-center justify-center bg-gray-50 px-6 py-4 shadow-md rounded-md font-poppins">
      <button
        onClick={() => window.history.back()}
        className="absolute top-[30%] left-[10%] flex items-center gap-2 text-gray-700 hover:text-black transition-colors"
        aria-label="Go back"
      >
        <ArrowLeftIcon className="w-8 h-8 text-gray-600 bg-white rounded-full p-1.5 shadow-md" />
      </button>

      <div className="text-center max-w-xl">
        <h2 className="text-3xl font-bold text-secondary">LuxoraEd</h2>
        <p className="text-gray-600 text-sm mt-2 font-sans">
          Take management to the{" "}
          <span className="font-semibold text-secondary">next level</span>{" "}
          with{" "}
          <span className="font-semibold text-secondary">premium learning</span>
        </p>

        <div className="mt-4 flex justify-center gap-4">
          <button className="px-4 py-2 rounded-2xl text-gray-700 hover:bg-gray-100 transition-all">
            Contact Us
          </button>
          <button className="px-4 py-2 rounded-2xl text-gray-700 hover:bg-gray-100 transition-all">
            Features
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthNavbar;
