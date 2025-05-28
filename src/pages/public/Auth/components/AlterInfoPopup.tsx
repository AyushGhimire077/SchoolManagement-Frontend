import { XMarkIcon } from "@heroicons/react/24/outline";

const AlterInfoPopup = ({ setInfoPopup, infoPopup }: { setInfoPopup: (val: boolean) => void; infoPopup: boolean }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
                <button
                    onClick={() => setInfoPopup(!infoPopup)}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                    <XMarkIcon className="h-6 w-6" />
                </button>
                <h2 className="text-xl font-semibold text-red-600 mb-2">Alert Notice!</h2>
                <div className="text-gray-700">
                    <p className="font-medium mb-1">Are you sure?</p>
                    <p>
                        If you're entering the correct credentials but still receiving an "Invalid credentials" error,
                        it may be because your registration hasn't been fully completed. Your account might not be activated yet.
                        Please contact support.
                    </p>
                </div>
                <div className="flex justify-end px-3">
                    <button className="px-4 py-2 bg-pink-500/90 text-white duration-300 rounded-md hover:bg-pink-500 mt-4" >Cotact us</button>

                </div>
            </div>
        </div>
    );
};

export default AlterInfoPopup;
