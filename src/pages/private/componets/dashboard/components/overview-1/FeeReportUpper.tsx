import { useState } from "react";
import BSDateSelector from "../../../../../../componets/BSDateSelector";

const FeeReportUpper = () => {
    const [, setBs] = useState("");
    const [, setAd] = useState("");

    return (
        <div className="py-4 w-full mt-4 flex flex-col md:flex-row items-start md:items-center gap-4">
            
            <div className="w-full p-4 md:w-[56%] flex flex-col md:flex-row justify-between items-start md:items-center">
                <h2 className="text-lg font-semibold text-secondary whitespace-nowrap md:mr-2">
                    Fees Reports
                </h2>
                <div className="w-full md:w-auto mt-2 md:mt-0">
                    <BSDateSelector
                        label="Select Date"
                        onChange={(bsDate, adDate) => {
                            setBs(bsDate);
                            setAd(adDate ?? "");
                            console.log("AD:", adDate);
                        }}
                    />
                </div>
            </div>

            <div className="w-full flex flex-col sm:flex-row md:flex-row gap-4 md:gap-0 md:w-[44%]">
                <div className="w-full md:w-[50%]">
                    <h2 className="text-base font-medium text-gray-700">Income Report</h2>
                </div>

                <div className="w-full md:w-[50%]">
                    <h2 className="text-base font-medium text-gray-700">Expenses Report</h2>
                </div>
            </div>
        </div>
    );
};

export default FeeReportUpper;
