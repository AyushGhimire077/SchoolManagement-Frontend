import { useState } from "react";
import { useCrudStore } from "./store";
import { Student, Payment } from "./interface";

const StudentForm = () => {
    const { registerStudents } = useCrudStore();

    const [formData, setFormData] = useState<Student>({
        username: "",
        password: "",
        phone: "",
        rollNumber: "",
        parentName: "",
        parentPhone: "",
        lastPaidDate: new Date().toISOString().split("T")[0],
        classroomId: 0,
        fees: 0,
        payments: [],
        paid: false,
    });

    const [addPayments, setAddPayments] = useState(false);
    const [paymentInputs, setPaymentInputs] = useState<Payment[]>([]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? checked
                    : name === "fees" || name === "classroomId"
                        ? +value
                        : value,
        }));
    };

    const handlePaymentChange = (
        index: number,
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        const updatedPayments = [...paymentInputs];
        updatedPayments[index] = {
            ...updatedPayments[index],
            [name]: name === "amount" ? +value : value,
        };
        setPaymentInputs(updatedPayments);
    };

    const addNewPayment = () => {
        setPaymentInputs((prev) => [
            ...prev,
            {
                amount: 0,
                paymentDate: new Date().toISOString().split("T")[0],
                studentId: 0,
            },
        ]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const finalData = {
            ...formData,
            payments: addPayments
                ? paymentInputs.map((p) => ({ ...p, studentId: 0 }))
                : [],
        };
        registerStudents(finalData);
    };

    const inputFields = [
        { name: "username", label: "Username" },
        { name: "password", label: "Password", type: "password" },
        { name: "phone", label: "Phone" },
        { name: "rollNumber", label: "Roll Number" },
        { name: "parentName", label: "Parent Name" },
        { name: "parentPhone", label: "Parent Phone" },
        { name: "lastPaidDate", label: "Last Paid Date", type: "date" },
        { name: "fees", label: "Fees", type: "number" },
        { name: "classroomId", label: "Classroom ID", type: "number" },
    ];

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-8 space-y-6"
        >
            <h2 className="text-2xl font-semibold text-gray-700">
                Register Student
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {inputFields.map(({ name, label, type = "text" }) => (
                    <div key={name}>
                        <label className="block mb-1 text-sm font-medium text-gray-600">
                            {label}
                        </label>
                        <input
                            type={type}
                            name={name}
                            value={(formData as any)[name]}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                        />
                    </div>
                ))}

                <div className="flex items-center gap-2 mt-2">
                    <input
                        type="checkbox"
                        name="paid"
                        checked={formData.paid}
                        onChange={handleChange}
                        className="w-5 h-5"
                    />
                    <label
                        htmlFor="paid"
                        className="text-sm font-medium text-gray-600"
                    >
                        Paid
                    </label>
                </div>
            </div>

            {/* Toggle Add Payments */}
            <div className="flex items-center gap-3 mt-4">
                <label className="text-sm font-medium text-gray-700">
                    Add Payments?
                </label>
                <input
                    type="checkbox"
                    checked={addPayments}
                    onChange={() => setAddPayments((prev) => !prev)}
                    className="w-5 h-5"
                />
            </div>

            {/* Payments Section */}
            {addPayments && (
                <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700">Payments</h3>
                    {paymentInputs.map((payment, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-1 md:grid-cols-3 gap-4"
                        >
                            <div>
                                <label className="block mb-1 text-sm text-gray-600">
                                    Amount
                                </label>
                                <input
                                    type="number"
                                    name="amount"
                                    value={payment.amount}
                                    onChange={(e) => handlePaymentChange(index, e)}
                                    className="w-full px-3 py-2 border rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 text-sm text-gray-600">
                                    Payment Date
                                </label>
                                <input
                                    type="date"
                                    name="paymentDate"
                                    value={payment.paymentDate}
                                    onChange={(e) => handlePaymentChange(index, e)}
                                    className="w-full px-3 py-2 border rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 text-sm text-gray-600">
                                    Method (optional)
                                </label>
                                <input
                                    type="text"
                                    name="method"
                                    value={payment.method || ""}
                                    onChange={(e) => handlePaymentChange(index, e)}
                                    className="w-full px-3 py-2 border rounded-lg"
                                />
                            </div>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addNewPayment}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        Add Another Payment
                    </button>
                </div>
            )}

            <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg text-lg"
            >
                Submit Student
            </button>
        </form>
    );
};

export default StudentForm;
