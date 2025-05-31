import { useState } from "react";
import { useCrudStore } from "./store";

const ClassForm = () => {
    const { registerClass } = useCrudStore();

    const [formData, setFormData] = useState({
        classNumber: null,
        sectionName: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "classNumber" ? +value : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        registerClass(formData);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 space-y-6"
        >
            <h2 className="text-2xl font-semibold text-gray-700 text-center">
                Create Class
            </h2>

            <div className="space-y-4">
                {/* Class Number */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Class Number
                    </label>
                    <input
                        type="number"
                        name="classNumber"
                        value={formData.classNumber}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Section Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Section Name
                    </label>
                    <input
                        type="text"
                        name="sectionName"
                        value={formData.sectionName}
                        onChange={handleChange}
                        placeholder="Eg: A, B, C"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
            </div>

            <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-lg"
            >
                Submit Class
            </button>
        </form>
    );
};

export default ClassForm;
