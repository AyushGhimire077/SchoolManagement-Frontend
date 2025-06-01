import { useState } from "react";
import GetStudents from "../componets/crud/GetStudents";

const Student = () => {
  const [activeTab, setActiveTab] = useState("students");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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
              <button
                className="flex items-center space-x-1 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition"
                onClick={() => setShowFilterMenu(!showFilterMenu)}
              >
                <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <span className="text-white font-medium">Filters</span>
              </button>

              {showFilterMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 z-10">
                  <div className="px-4 py-2 border-b">
                    <h3 className="text-sm font-medium text-gray-900">Filter Options</h3>
                  </div>
                  <div className="px-4 py-3 space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                        <option>All Students</option>
                        <option>Active</option>
                        <option>Inactive</option>
                        <option>Graduated</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                      <select className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                        <option>All Classes</option>
                        <option>Class A</option>
                        <option>Class B</option>
                        <option>Class C</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Enrollment Date</label>
                      <input type="date" className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 rounded-b-lg flex justify-end space-x-3">
                    <button className="px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition">
                      Reset
                    </button>
                    <button className="px-3 py-1.5 text-sm text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition">
                      Apply
                    </button>
                  </div>
                </div>
              )}
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
                className={`px-6 py-4 font-medium text-sm relative ${activeTab === 'students' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('students')}
              >
                Students
                {activeTab === 'students' && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 rounded-t-lg"></div>
                )}
              </button>
              <button
                className={`px-6 py-4 font-medium text-sm relative ${activeTab === 'classes' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('classes')}
              >
                Classes
                {activeTab === 'classes' && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 rounded-t-lg"></div>
                )}
              </button>
              <button
                className={`px-6 py-4 font-medium text-sm relative ${activeTab === 'reports' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('reports')}
              >
                Reports
                {activeTab === 'reports' && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 rounded-t-lg"></div>
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
                onClick={() => setShowAddModal(true)}
                className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg shadow transition duration-300"
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

              <button className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-lg shadow transition duration-300">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="font-medium">Add Class</span>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-6 py-5">
            <div className="bg-indigo-50 rounded-xl p-5 border border-indigo-100">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-indigo-800">Total Students</h3>
                <div className="bg-indigo-100 p-2 rounded-lg">
                  <svg className="h-5 w-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900 mt-2">1,248</p>
              <p className="text-xs text-indigo-600 mt-1">+12% from last month</p>
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
              <p className="text-2xl font-bold text-gray-900 mt-2">24</p>
              <p className="text-xs text-emerald-600 mt-1">+2 new classes</p>
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
              <p className="text-2xl font-bold text-gray-900 mt-2">18</p>
              <p className="text-xs text-amber-600 mt-1">Review required</p>
            </div>

            <div className="bg-rose-50 rounded-xl p-5 border border-rose-100">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-rose-800">Attendance Rate</h3>
                <div className="bg-rose-100 p-2 rounded-lg">
                  <svg className="h-5 w-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900 mt-2">94.5%</p>
              <p className="text-xs text-rose-600 mt-1">+3.2% improvement</p>
            </div>
          </div>

          {/* Student List */}
          <div className="p-6">
            <GetStudents />
          </div>
        </div>
      </main>

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="bg-indigo-600 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Add New Student</h2>
                <button
                  className="text-indigo-200 hover:text-white"
                  onClick={() => setShowAddModal(false)}
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-indigo-200 mt-1">Fill in the student details below</p>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="John Smith"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                  <select className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                    <option>Select a class</option>
                    <option>Class A - Mathematics</option>
                    <option>Class B - Science</option>
                    <option>Class C - Literature</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Enrollment Date</label>
                  <input
                    type="date"
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-3">
                <button
                  className="px-4 py-2.5 text-gray-700 font-medium hover:bg-gray-50 rounded-lg transition"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button className="px-4 py-2.5 bg-indigo-600 text-white font-medium hover:bg-indigo-700 rounded-lg shadow transition">
                  Add Student
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Student;