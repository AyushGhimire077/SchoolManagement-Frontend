import { ArrowPathIcon } from "@heroicons/react/24/outline";
import TopOverview1 from "../componets/dashboard/TopOverview1";

const Overview = () => {
  return (
    <div className="flex gap-6 px-6">
      {/* left side*/}
      <div className="w-[70%] border-t border-r border-t-slate-200 border-r-slate-300/60 pr-4 py-3">
        {/* header part */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl text-secondary font-bold">General Report</h1>
            <button className="text-sm flex justify-center  items-center text-secondary hover:text-secondary-dark transition">
              <ArrowPathIcon className="w-4 h-4 mr-1" />
              Reload Data
            </button>
        </div>
        <div>
          <TopOverview1 />
        </div>
      </div>

      {/* right side */}
      <div className="w-[30%]">
      </div>
    </div>
  );
};

export default Overview;
