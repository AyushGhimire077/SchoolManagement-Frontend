const AuthNavbar = () => {
  return (
    <div className="relative flex flex-col items-center justify-center bg-white px-6 py-7 shadow-md rounded-md font-poppins">
      <div className="text-center max-w-xl">
        <h2 className="text-3xl font-bold text-secondary">LuxoraEd</h2>
        <p className="text-gray-600 text-sm mt-2 font-sans">
          Take management to the{" "}
          <span className="font-semibold text-secondary">next level</span>{" "}
          with{" "}
          <span className="font-semibold text-secondary">premium learning</span>
        </p>

        <div className="mt-4 flex justify-center gap-4">
          <button className="px-4 py-2 rounded-md border border-secondary text-secondary hover:bg-secondary hover:text-white transition-all">
            Contact Us
          </button>
          <button className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all">
            Features
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthNavbar;
