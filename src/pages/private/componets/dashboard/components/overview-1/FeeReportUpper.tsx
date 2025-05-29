import { useState } from "react";
import BSDateSelector from "../../../../../../componets/BSDateSelector";

const FeeReportUpper = () => {
    const [bs, setBs] = useState("");
    const [ad, setAd] = useState("");

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Fees Reports</h2>
            <BSDateSelector
                label="Select Date"
                onChange={(bsDate, adDate) => {
                    setBs(bsDate);
                    setAd(adDate ?? "");
                    console.log( "AD:", adDate);
                }}
            />
            <p className="mt-4 text-gray-600">
                <strong>BS:</strong> {bs} | <strong>AD:</strong> {ad}
            </p>
        </div>
    );
};

export default FeeReportUpper;
