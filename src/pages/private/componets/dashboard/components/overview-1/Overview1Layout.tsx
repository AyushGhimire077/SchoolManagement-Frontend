import { ArrowPathIcon } from "@heroicons/react/24/outline";
import TopOverview1 from "./TopOverview1";
import FeeReportUpper from "./FeeReportUpper";
import { useOverview1Store } from "../../../store";
import { useEffect } from "react";

const Overview1Layout = () => {
    const { refreshData, isReload } = useOverview1Store();

    useEffect(() => {
        refreshData();
    }, []);

    return (
        <div className="flex gap-6 px-6">
            {/* left side */}
            <div className="w-[70%] border-t border-r border-t-slate-200 border-r-slate-300/60 pr-4 py-3">
                {/* header part */}
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-xl text-secondary font-bold">General Report</h1>
                    <button
                        onClick={refreshData}
                        disabled={isReload}
                        className="text-sm flex justify-center items-center text-secondary hover:text-secondary-dark transition disabled:opacity-60"
                    >
                        <ArrowPathIcon
                            className={`w-4 h-4 mr-1 ${isReload ? "animate-spin" : ""}`}
                        />
                        {isReload ? "Refreshing..." : "Reload Data"}
                    </button>
                </div>

                {/* content */}
                <div>
                    <TopOverview1 />
                </div>
                <div>
                    <FeeReportUpper />
                </div>
            </div>

            {/* right side */}
            <div className="w-[30%]">{/* Optional widgets here */}</div>
        </div>
    );
};

export default Overview1Layout;
