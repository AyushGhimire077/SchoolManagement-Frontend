import { useEffect, useState } from "react";
import { useCrudStore } from "./store";
import { TablePagination } from "@mui/material";

const GetStudents = () => {
    const {
        students = [],
        currentPage = 0,
        totalItems = 0,
        setCurrentPage,
        fetchStudents,
    } = useCrudStore();

    const [loading, setLoading] = useState<boolean>(true);
    const [pageSize, setPageSize] = useState<number>(10);

    // Fetch students on page or size change
    useEffect(() => {
        const loadStudents = async () => {
            setLoading(true);
            await fetchStudents(currentPage, pageSize);
            setLoading(false);
        };

        loadStudents();
    }, [currentPage, pageSize, fetchStudents]);

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSize = parseInt(event.target.value, 10);
        if (newSize !== pageSize) {
            setPageSize(newSize);
            setCurrentPage(0);
        }
    };

    const handleChangePage = (_: unknown, newPage: number) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="max-w-6xl mx-auto p-4 bg-white rounded-lg shadow-sm">

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : students.length === 0 ? (
                <div className="text-center py-12">
                    <div className="bg-gray-100 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No students found</h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                        No student records available. Try adjusting your search or add new students.
                    </p>
                </div>
            ) : (
                <>
                    <div className="overflow-x-auto border border-gray-200 rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3  text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                                    <th className="px-6 py-3  text-left text-xs font-medium text-gray-500 uppercase tracking-wider">R/N</th>
                                    <th className="px-6 py-3  text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                    <th className="px-6 py-3  text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parent Name</th>
                                    <th className="px-6 py-3  text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parent Phone</th>

                                    <th className="px-6 py-3  text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                                    <th className="px-6 py-3  text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {students.map((student) => (
                                    <tr key={student?.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-2 text-sm capitalize  whitespace-nowrap">
                                            <div className="font-medium text-gray-700">{student.username}</div>
                                        </td>
                                        <td className="px-6 text-sm capitalize  whitespace-nowrap text-gray-700/90">{student.rollNumber || "N/A"}</td>
                                        <td className="px-6 text-sm capitalize  whitespace-nowrap text-gray-700/90">{student.phone || "-"}</td>
                                        <td className="px-6 text-sm capitalize  whitespace-nowrap">
                                            <div className="text-gray-700/90">{student.parentName || "-"}</div>

                                        </td>
                                        <td className="px-6 text-sm capitalize  whitespace-nowrap">
                                            {student.parentPhone && (
                                                <div className="text-sm text-gray-500">{student.parentPhone}</div>
                                            )}
                                        </td>
                                        <td className="px-6 text-sm capitalize  whitespace-nowrap text-gray-700/90">
                                            {student?.classNumber
                                                ? `${student?.classNumber}${student?.sectionName ? `-${student?.sectionName}` : ""}`
                                                : "-"}
                                        </td>
                                        <td className="px-6 text-center mr-2 text-sm capitalize  whitespace-nowrap">
                                            <span
                                                className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${student?.feePaid
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-pink-100 text-pink-800"
                                                    }`}
                                            >
                                                {student?.feePaid ? "Paid" : "Pending"}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <TablePagination
                        component="div"
                        count={totalItems}
                        page={currentPage}
                        onPageChange={handleChangePage}
                        rowsPerPage={pageSize}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        rowsPerPageOptions={[5, 10, 20, 50]}
                    />
                </>
            )}
        </div>
    );
};

export default GetStudents;
