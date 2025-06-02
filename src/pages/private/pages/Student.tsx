import { useEffect, useState } from "react";
import GetStudents from "../componets/crud/GetStudents";
import { useOverview1Store } from "../componets/store";
import { useCrudStore } from "../componets/crud/store";
import { useNavigate } from "react-router-dom";

const Student = () => {
  const [activeTab, setActiveTab] = useState("students");
  const [searchTerm, setSearchTerm] = useState("");

  const { totelLenInfo, refreshData } = useOverview1Store();
  const { students } = useCrudStore();

  const navigate = useNavigate();

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="max-w-full w-[95%] pt-3 mx-auto shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold text-secondary tracking-wider">LuxoraEd</h1>
          </div>

          <div className=" md:mt-0 flex items-center space-x-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search students..."
                className="block w-full pl-10 pr-3 py-2 rounded-lg text-sm bg-white border-slate-200 outline-none text-slate-700 border transition"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="relative">
              <button className="flex items-center space-x-1 hover:bg-blue-600/80 bg-blue-500 px-4 py-1.5 rounded-lg transition">
                <span
                  onClick={() => navigate("student-more")}
                  className="text-white font-medium"
                >
                  View more
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                className={`px-6 py-4 font-medium text-sm relative ${activeTab === "students" ? "text-indigo-600" : "text-gray-500 hover:text-gray-700"
                  }`}
                onClick={() => setActiveTab("students")}
              >
                Students
                {activeTab === "students" && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent rounded-t-lg"></div>
                )}
              </button>
            </div>
          </div>

          {/* Toolbar */}
          <div className="px-6 py-4 border-b border-gray-200 flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Student Records</h2>
              <p className="text-sm text-gray-500 mt-1">Manage all student information in one place</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate("add-student")}
                className="flex items-center space-x-2 bg-secondary hover:bg-indigo-800 text-white px-4 py-2.5 rounded-lg shadow transition duration-300"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="font-medium">Add Student</span>
              </button>

              <button className="flex items-center space-x-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-lg shadow transition duration-300">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span className="font-medium">Export Data</span>
              </button>

              <button
                onClick={() => navigate("add-class")}
                className="flex items-center space-x-2 bg-pink-400 hover:bg-pink-500 text-white px-4 py-2.5 rounded-lg shadow transition duration-300"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="font-medium">Add Class</span>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 py-5">
            <div className="bg-indigo-50 rounded-xl p-5 border border-indigo-100">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-indigo-800">Total Students</h3>
                <div className="bg-indigo-100 p-2 rounded-lg">
                  <svg className="h-5 w-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900 mt-2">{totelLenInfo?.totalStudents}</p>
              <p className="text-xs text-indigo-600 mt-1">{totelLenInfo?.studentRateChange} rate of {totelLenInfo?.totalStudents}</p>
            </div>

            <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-emerald-800">Active Classes</h3>
                <div className="bg-emerald-100 p-2 rounded-lg">
                  <svg className="h-5 w-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                  </svg>
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {students?.isActiveClass?.length || 0}
              </p>

              <p className="text-xs text-emerald-600 mt-1">
                <span className="font-semibold">{students?.filter(student => !student?.isActiveClass)?.length || 0}</span> Inactive
              </p>

            </div>

            <div className="bg-amber-50 rounded-xl p-5 border border-amber-100">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-amber-800">Pending Actions</h3>
                <div className="bg-amber-100 p-2 rounded-lg">
                  <svg className="h-5 w-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {students?.filter(student => student.feePaid)?.length || 0}
              </p>
              <p className="text-xs text-amber-600 mt-1">Review required</p>
            </div>


          </div>

          {/* Students Table */}
          <GetStudents
            searchTerm={searchTerm}
            data={students}
          />
        </div>
      </main>
    </div>
  );
};

export default Student;
