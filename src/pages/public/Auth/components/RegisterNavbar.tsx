const RegisterNavbar = () => {
  return (
    <div className="relative flex flex-col items-center justify-center  bg-white px-6 py-7 shadow-md rounded-md font-poppins">
      {/* Centered heading and tagline */}
      <div className="text-center flex-col gap-3 max-w-xl">
        <h2
          className="text-3xl font-bold text-secondary font-poppins"
        >
          LuxoraEd
        </h2>
        <p className="text-gray-600 text-sm mt-2 font-sans">
          Take management to the{" "}
          <span
            className="font-semibold text-secondary"
          >
            next level
          </span>{" "}
          with{" "}
          <span
            className="font-semibold text-secondary"
          >
            premium learning
          </span>
        </p>
        <div>
          <button className=" text-secondary  px-4 py-2 rounded-md">Cotact use</button>
        </div>
      </div>
    </div>
  );
};

export default RegisterNavbar;
