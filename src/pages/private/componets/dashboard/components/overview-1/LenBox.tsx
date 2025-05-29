import React from "react";
import { LenBoxProps } from "../../../interface";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

interface ExtendedLenBoxProps extends LenBoxProps {
    color?: "blue" | "orange" | "yellow";
}

const colorMap = {
    blue: "text-blue-600 bg-blue-50 group-hover:bg-blue-100",
    orange: "text-orange-600 bg-orange-50 group-hover:bg-orange-100",
    yellow: "text-yellow-600 bg-yellow-50 group-hover:bg-yellow-100",
};

const LenBox: React.FC<ExtendedLenBoxProps> = ({ len, icon, label, rate, color = "blue" }) => {
    const isPositive = rate && rate > 0;

    return (
        <div className="relative w-full bg-white p-5 rounded-xl border shadow-lg border-gray-200 transition-all duration-300 
                    hover:shadow-xl hover:border-gray-300 group overflow-hidden">

            <div className="flex justify-between items-start">
                <div className={`p-2 rounded-lg transition-colors duration-300 ${colorMap[color]}`}>
                    {icon}
                </div>

                {rate && (
                    <div className={`flex gap-1 items-center text-xs font-medium px-2.5 py-1.5 rounded-full 
                          transition-transform duration-300 hover:scale-105
                          ${isPositive
                            ? "bg-green-100 text-green-800"
                            : "bg-rose-100 text-rose-800"}`}>
                        <span className="font-semibold">{rate}</span>
                        {isPositive ? (
                            <ChevronUpIcon className="w-3.5 h-3.5" />
                        ) : (
                            <ChevronDownIcon className="w-3.5 h-3.5" />
                        )}
                    </div>
                )}
            </div>

            <div className="mt-5">
                <h3 className="text-2xl font-bold text-gray-800 tracking-tight">{len}</h3>
                <p className="text-sm text-gray-500 mt-1.5 transition-colors group-hover:text-gray-600 duration-300">
                    {label}
                </p>
            </div>
        </div>
    );
};

export default LenBox;
