import { useEffect, useCallback, useState } from "react";
import { useCrudStore } from "./store";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";


const GetStudents = () => {
    const {
        students = [],
        currentPage,
        totalPages,
        setCurrentPage,
        fetchStudents,
    } = useCrudStore();

    const [loading, setLoading] = useState(true);
    const [pageSize, setPageSize] = useState(10);

    const loadStudents = useCallback(async () => {
        setLoading(true);
        await fetchStudents(currentPage, pageSize);
        setLoading(false);
    }, [currentPage, fetchStudents, pageSize]);

    useEffect(() => {
        loadStudents();
    }, [loadStudents]);

    const goToPage = (page: number) => {
        if (page >= 0 && page < totalPages) {
            setCurrentPage(page);
        }
    };

    const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPageSize(Number(e.target.value));
        setCurrentPage(0);
    };

    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 0; i < totalPages; i++) pages.push(i);
        } else {
            let start = Math.max(0, currentPage - Math.floor(maxVisiblePages / 2));
            let end = start + maxVisiblePages - 1;

            if (end >= totalPages) {
                end = totalPages - 1;
                start = Math.max(0, end - maxVisiblePages + 1);
            }

            if (start > 0) pages.push(0, 'left-ellipsis');
            for (let i = start; i <= end; i++) pages.push(i);
            if (end < totalPages - 1) pages.push('right-ellipsis', totalPages - 1);
        }
        return pages;
    };

    return (
        <div className="max-w-6xl mx-auto p-4 bg-white rounded-lg shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h2 className="text-2xl font-bold text-gray-800">Student Records</h2>

                <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Rows per page:</span>
                    <select
                        value={pageSize}
                        onChange={handlePageSizeChange}
                        className="border border-gray-300 rounded px-2 py-1 text-sm"
                    >
                        {[5, 10, 20, 50].map(size => (
                            <option key={size} value={size}>{size}</option>
                        ))}
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : students.length === 0 ? (
                <div className="text-center py-12">
                    <div className="bg-gray-100 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No students found</h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                        No student records available. Try adjusting your search or add new students.
                    </p>
                </div>
            ) : (
                <div className="overflow-x-auto border border-gray-200 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll Number</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parent Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fee Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {students.map((student) => (
                                <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="font-medium text-gray-900">{student.username}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                                        {student.rollNumber || "N/A"}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                                        {student.phone || "-"}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-gray-700">{student.parentName || "-"}</div>
                                        {student.parentPhone && (
                                            <div className="text-sm text-gray-500">{student.parentPhone}</div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                                        {student.classNumber ? `${student.classNumber}${student.sectionName ? `-${student.sectionName}` : ''}` : "-"}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${student.feePaid
                                                ? "bg-green-100 text-green-800"
                                                : "bg-yellow-100 text-yellow-800"
                                            }`}>
                                            {student.feePaid ? "Paid" : "Pending"}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {totalPages > 0 && (
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-gray-700">
                        Showing <span className="font-medium">{students.length}</span> of{' '}
                        <span className="font-medium">{(currentPage * pageSize) + students.length}</span> results
                    </div>

                    <div className="flex items-center space-x-1">
                        <button
                            onClick={() => goToPage(0)}
                            disabled={currentPage === 0}
                            className="p-2 rounded-md border border-gray-300 bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                            aria-label="First Page"
                        >
                            <ChevronLeftIcon className="h-4 w-4 text-gray-600" />
                        </button>

                        <button
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 0}
                            className="p-2 rounded-md border border-gray-300 bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                            aria-label="Previous Page"
                        >
                            <ChevronLeftIcon className="h-4 w-4 text-gray-600" />
                        </button>

                        {getPageNumbers().map((page, index) => (
                            typeof page === 'number' ? (
                                <button
                                    key={index}
                                    onClick={() => goToPage(page)}
                                    className={`w-10 h-10 flex items-center justify-center rounded-md text-sm font-medium ${currentPage === page
                                            ? 'bg-blue-500 text-white border border-blue-500'
                                            : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                                        }`}
                                    aria-current={currentPage === page ? 'page' : undefined}
                                >
                                    {page + 1}
                                </button>
                            ) : (
                                <span key={index} className="px-3 text-gray-500">
                                    ...
                                </span>
                            )
                        ))}

                        <button
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage >= totalPages - 1}
                            className="p-2 rounded-md border border-gray-300 bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                            aria-label="Next Page"
                        >
                            <ChevronRightIcon className="h-4 w-4 text-gray-600" />
                        </button>

                        <button
                            onClick={() => goToPage(totalPages - 1)}
                            disabled={currentPage >= totalPages - 1}
                            className="p-2 rounded-md border border-gray-300 bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                            aria-label="Last Page"
                        >
                            <ChevronRightIcon className="h-4 w-4 text-gray-600" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GetStudents;