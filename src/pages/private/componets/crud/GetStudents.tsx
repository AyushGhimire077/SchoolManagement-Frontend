import { useEffect, useState } from "react";
import { useCrudStore } from "./store";
import { TablePagination } from "@mui/material";
import { GetStudentsProps } from "./interface";

const GetStudents: React.FC<GetStudentsProps> = ({ searchTerm, data }) => {
    const {
        students = [],
        totalStudents = 0,
        currentPage = 0,
        setCurrentPage,
        fetchStudents,
    } = useCrudStore();

    const [loading, setLoading] = useState(true);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        if (!data) {
            const loadStudents = async () => {
                setLoading(true);
                await fetchStudents(currentPage, pageSize);
                setLoading(false);
            };
            loadStudents();
        } else {
            setLoading(false);
        }
    }, [currentPage, pageSize, fetchStudents, data]);

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

    const studentList = data || students;
    const filteredStudents = studentList.filter((student) =>
        !searchTerm || student?.username?.toLowerCase().includes(searchTerm.toLowerCase())
    );
      

    return (
        <div className="max-w-6xl mx-auto p-4 bg-white rounded-lg shadow-sm">
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : filteredStudents.length === 0 ? (
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
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Username</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">R/N</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Parent Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Parent Phone</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Class</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredStudents.map((student) => (
                                    <tr key={student?.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-2 text-sm capitalize">{student.username}</td>
                                        <td className="px-6 text-sm">{student.rollNumber || "N/A"}</td>
                                        <td className="px-6 text-sm">{student.phone || "-"}</td>
                                        <td className="px-6 text-sm">{student.parentName || "-"}</td>
                                        <td className="px-6 text-sm">{student.parentPhone || "-"}</td>
                                        <td className="px-6 text-sm">
                                            {student.classNumber
                                                ? `${student.classNumber}${student.sectionName ? `-${student.sectionName}` : ""}`
                                                : "-"}
                                        </td>
                                        <td className="px-6 text-sm text-center">
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${student?.feePaid ? "bg-green-100 text-green-800" : "bg-pink-100 text-pink-800"
                                                }`}>
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
                        count={totalStudents}
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
