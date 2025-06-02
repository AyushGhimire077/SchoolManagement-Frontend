import { useState, useMemo, useEffect } from "react";
import { useCrudStore } from "./store";
import { Student, Payment } from "./interface";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const StudentForm = () => {
    const { registerStudents } = useCrudStore();

    const [formData, setFormData] = useState<Student>({
        username: "",
        password: "",
        email: "",
        phone: "",
        rollNumber: "",
        parentName: "",
        parentPhone: "",
        dateOfBirth: "",
        gender: "",
        address: "",
        lastPaidDate: new Date().toISOString().split("T")[0],
        classroomId: 0,
        fees: 0,
        discountType: "none",
        discountValue: 0,
        netFees: 0,
        payments: [],
        paymentStatus: "unpaid",
        sectionName: "",
        classNumber: "",
        admissionDate: new Date().toISOString().split("T")[0],
        feeDueDate: "",
        paymentMethod: "cash",
        bankName: "",
        transactionId: "",
        feeNotes: "",
    });

    const [addPayments, setAddPayments] = useState(false);
    const [paymentInputs, setPaymentInputs] = useState<Payment[]>([]);

    // Calculate net fees whenever fees, discount type, or discount value changes
    useEffect(() => {
        const calculateNetFees = () => {
            let net = formData.fees;
            if (formData.discountType === "percentage") {
                net = formData.fees * (1 - formData.discountValue / 100);
            } else if (formData.discountType === "fixed") {
                net = formData.fees - formData.discountValue;
            }
            setFormData(prev => ({ ...prev, netFees: Number(net.toFixed(2)) }));
        };

        calculateNetFees();
    }, [formData.fees, formData.discountType, formData.discountValue]);

    // Calculate total paid amount
    const totalPaid = useMemo(() => {
        return paymentInputs.reduce((sum, payment) => sum + payment.amount, 0);
    }, [paymentInputs]);

    // Calculate payment status
    useEffect(() => {
        if (totalPaid >= formData.netFees) {
            setFormData(prev => ({ ...prev, paymentStatus: "paid" }));
        } else if (totalPaid > 0) {
            setFormData(prev => ({ ...prev, paymentStatus: "partial" }));
        } else {
            setFormData(prev => ({ ...prev, paymentStatus: "unpaid" }));
        }
    }, [totalPaid, formData.netFees]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type, checked } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? checked
                    : name === "fees" ||
                        name === "classroomId" ||
                        name === "discountValue"
                        ? +value
                        : value,
        }));
    };

    const handlePaymentChange = (
        index: number,
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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
        setPaymentInputs(prev => [
            ...prev,
            {
                amount: 0,
                paymentDate: new Date().toISOString().split("T")[0],
                studentId: 0,
                method: "cash",
                bankName: "",
                transactionId: "",
            },
        ]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const finalData = {
            ...formData,
            payments: addPayments ? paymentInputs.map(p => ({ ...p, studentId: 0 })) : [],
        };
        registerStudents(finalData);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-8 space-y-6 relative"
        >
            <button
                type="button"
                onClick={() => window.history.back()}
                className="absolute top-4 left-4"
                aria-label="Go back"
            >
                <ArrowLeftIcon className="w-8 h-8 text-gray-600 bg-white rounded-full p-1.5 shadow-md" />
            </button>

            <h2 className="text-2xl font-semibold text-gray-700 text-center">Student Registration Form</h2>

            {/* Personal Information Section */}
            <div className="border-b pb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Username */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-600" htmlFor="username">
                            Username <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="username"
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            placeholder="Enter username"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-600" htmlFor="password">
                            Password <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="Enter password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-600" htmlFor="email">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-600" htmlFor="phone">
                            Phone
                        </label>
                        <input
                            id="phone"
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter phone number"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                        />
                    </div>

                    {/* Roll Number */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-600" htmlFor="rollNumber">
                            Roll Number
                        </label>
                        <input
                            id="rollNumber"
                            type="text"
                            name="rollNumber"
                            value={formData.rollNumber}
                            onChange={handleChange}
                            placeholder="Enter roll number"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                        />
                    </div>

                    {/* Date of Birth */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-600" htmlFor="dateOfBirth">
                            Date of Birth
                        </label>
                        <input
                            id="dateOfBirth"
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                        />
                    </div>

                    {/* Gender */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-600" htmlFor="gender">
                            Gender
                        </label>
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {/* Admission Date */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-600" htmlFor="admissionDate">
                            Admission Date
                        </label>
                        <input
                            id="admissionDate"
                            type="date"
                            name="admissionDate"
                            value={formData.admissionDate}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                        />
                    </div>

                    {/* Parent Name */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-600" htmlFor="parentName">
                            Parent Name
                        </label>
                        <input
                            id="parentName"
                            type="text"
                            name="parentName"
                            value={formData.parentName}
                            onChange={handleChange}
                            placeholder="Enter parent's name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                        />
                    </div>

                    {/* Parent Phone */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-600" htmlFor="parentPhone">
                            Parent Phone
                        </label>
                        <input
                            id="parentPhone"
                            type="tel"
                            name="parentPhone"
                            value={formData.parentPhone}
                            onChange={handleChange}
                            placeholder="Enter parent's phone"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                        />
                    </div>

                    {/* Address */}
                    <div className="md:col-span-2">
                        <label className="block mb-1 text-sm font-medium text-gray-600" htmlFor="address">
                            Address
                        </label>
                        <textarea
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Enter full address"
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none resize-none"
                        />
                    </div>
                </div>
            </div>

            {/* Academic Information Section */}
            <div className="border-b pb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Academic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Classroom ID */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-600" htmlFor="classroomId">
                            Classroom ID
                        </label>
                        <input
                            id="classroomId"
                            type="number"
                            name="classroomId"
                            value={formData.classroomId}
                            onChange={handleChange}
                            min={0}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                        />
                    </div>

                    {/* Class Number */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-600" htmlFor="classNumber">
                            Class/Grade
                        </label>
                        <input
                            id="classNumber"
                            type="text"
                            name="classNumber"
                            value={formData.classNumber}
                            onChange={handleChange}
                            placeholder="Enter class/grade"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                        />
                    </div>

                    {/* Section Name */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-600" htmlFor="sectionName">
                            Section
                        </label>
                        <input
                            id="sectionName"
                            type="text"
                            name="sectionName"
                            value={formData.sectionName}
                            onChange={handleChange}
                            placeholder="Enter section"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                        />
                    </div>
                </div>
            </div>

            {/* Financial Information Section */}
            <div className="border-b pb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Financial Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Fees */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-600" htmlFor="fees">
                            Total Fees (₹)
                        </label>
                        <input
                            id="fees"
                            type="number"
                            name="fees"
                            value={formData.fees}
                            onChange={handleChange}
                            min={0}
                            step="0.01"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                        />
                    </div>

                    {/* Fee Cycle */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-600" htmlFor="feeCycle">
                            Fee Cycle
                        </label>
                        <select
                            id="feeCycle"
                            name="feeCycle"
                            value={formData.feeCycle}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                        >
                            <option value="monthly">Monthly</option>
                            <option value="quarterly">Quarterly</option>
                            <option value="semester">Semester</option>
                            <option value="annual">Annual</option>
                        </select>
                    </div>

                    {/* Discount Type */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-600" htmlFor="discountType">
                            Discount Type
                        </label>
                        <select
                            id="discountType"
                            name="discountType"
                            value={formData.discountType}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                        >
                            <option value="none">None</option>
                            <option value="percentage">Percentage (%)</option>
                            <option value="fixed">Fixed Amount (₹)</option>
                        </select>
                    </div>

                    {/* Discount Value */}
                    {formData.discountType !== "none" && (
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-600" htmlFor="discountValue">
                                {formData.discountType === "percentage" ? "Discount (%)" : "Discount Amount (₹)"}
                            </label>
                            <input
                                id="discountValue"
                                type="number"
                                name="discountValue"
                                value={formData.discountValue}
                                onChange={handleChange}
                                min={0}
                                step={formData.discountType === "percentage" ? 1 : 0.01}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                            />
                        </div>
                    )}

                    {/* Net Fees */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-600" htmlFor="netFees">
                            Net Fees (₹)
                        </label>
                        <input
                            id="netFees"
                            type="number"
                            name="netFees"
                            value={formData.netFees}
                            readOnly
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                        />
                    </div>

                    {/* Fee Due Date */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-600" htmlFor="feeDueDate">
                            Fee Due Date
                        </label>
                        <input
                            id="feeDueDate"
                            type="date"
                            name="feeDueDate"
                            value={formData.feeDueDate}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                        />
                    </div>

                    {/* Last Paid Date */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-600" htmlFor="lastPaidDate">
                            Last Paid Date
                        </label>
                        <input
                            id="lastPaidDate"
                            type="date"
                            name="lastPaidDate"
                            value={formData.lastPaidDate}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                        />
                    </div>

                    {/* Payment Status */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-600">
                            Payment Status
                        </label>
                        <div className="px-4 py-2 bg-gray-100 rounded-lg capitalize">
                            {formData.paymentStatus}
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-600" htmlFor="paymentMethod">
                            Default Payment Method
                        </label>
                        <select
                            id="paymentMethod"
                            name="paymentMethod"
                            value={formData.paymentMethod}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                        >
                            <option value="cash">Cash</option>
                            <option value="check">Check</option>
                            <option value="bank">Bank Transfer</option>
                            <option value="online">Online Payment</option>
                        </select>
                    </div>

                    {/* Bank Name */}
                    {formData.paymentMethod === "bank" && (
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-600" htmlFor="bankName">
                                Bank Name
                            </label>
                            <input
                                id="bankName"
                                type="text"
                                name="bankName"
                                value={formData.bankName}
                                onChange={handleChange}
                                placeholder="Enter bank name"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                            />
                        </div>
                    )}

                    {/* Transaction ID */}
                    {formData.paymentMethod !== "cash" && (
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-600" htmlFor="transactionId">
                                Transaction/Check No.
                            </label>
                            <input
                                id="transactionId"
                                type="text"
                                name="transactionId"
                                value={formData.transactionId}
                                onChange={handleChange}
                                placeholder="Enter transaction ID"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                            />
                        </div>
                    )}

                    {/* Fee Notes */}
                    <div className="md:col-span-2">
                        <label className="block mb-1 text-sm font-medium text-gray-600" htmlFor="feeNotes">
                            Fee Notes
                        </label>
                        <textarea
                            id="feeNotes"
                            name="feeNotes"
                            value={formData.feeNotes}
                            onChange={handleChange}
                            placeholder="Enter fee-related notes"
                            rows={2}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none resize-none"
                        />
                    </div>
                </div>
            </div>

            {/* Toggle Add Payments */}
            <div className="flex items-center gap-3 mt-4">
                <label className="text-sm font-medium text-gray-700">Add Payment Records?</label>
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
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-gray-700">Payment Records</h3>
                        <div className="flex items-center gap-4">
                            <span className="text-gray-600">Total Paid: ₹{totalPaid.toFixed(2)}</span>
                            <span className="text-gray-600">Balance: ₹{(formData.netFees - totalPaid).toFixed(2)}</span>
                        </div>
                    </div>

                    {paymentInputs.length === 0 && (
                        <p className="text-gray-500">
                            No payments added yet. Click "Add Payment Record" to start.
                        </p>
                    )}

                    {paymentInputs.map((payment, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 border-b pb-4 last:border-0">
                            <div>
                                <label className="block mb-1 text-sm text-gray-600">Amount (₹)</label>
                                <input
                                    type="number"
                                    name="amount"
                                    value={payment.amount}
                                    onChange={(e) => handlePaymentChange(index, e)}
                                    className="w-full px-3 py-2 border rounded-lg"
                                    min={0}
                                    step="0.01"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 text-sm text-gray-600">Payment Date</label>
                                <input
                                    type="date"
                                    name="paymentDate"
                                    value={payment.paymentDate}
                                    onChange={(e) => handlePaymentChange(index, e)}
                                    className="w-full px-3 py-2 border rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 text-sm text-gray-600">Payment Method</label>
                                <select
                                    name="method"
                                    value={payment.method || ""}
                                    onChange={(e) => handlePaymentChange(index, e)}
                                    className="w-full px-3 py-2 border rounded-lg"
                                >
                                    <option value="">Select Method</option>
                                    <option value="Cash">Cash</option>
                                    <option value="Check">Check</option>
                                    <option value="Bank">Bank Transfer</option>
                                    <option value="Online">Online</option>
                                </select>
                            </div>
                            <div>
                                <label className="block mb-1 text-sm text-gray-600">Reference No.</label>
                                <input
                                    type="text"
                                    name="transactionId"
                                    value={payment.transactionId || ""}
                                    onChange={(e) => handlePaymentChange(index, e)}
                                    placeholder="Reference number"
                                    className="w-full px-3 py-2 border rounded-lg"
                                />
                            </div>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addNewPayment}
                        className="px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-600"
                    >
                        + Add Payment Record
                    </button>
                </div>
            )}

            <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg text-lg"
            >
                Register Student
            </button>
        </form>
    );
};

export default StudentForm;