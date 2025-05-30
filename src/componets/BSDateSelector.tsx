import React, { useState, useEffect, useRef } from "react";
import BikramSambat from "bikram-sambat-js";
import { convertBsToAdString } from "../utils/bsDateHelper";
import { BSDateSelectorProps } from "./interface";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";

const BSDatePicker: React.FC<BSDateSelectorProps> = ({
    label,
    defaultValue,
    onChange,
}) => {
    // Get today's date in AD and convert to BS
    const todayAd = new Date();
    const todayAdStr = `${todayAd.getFullYear()}-${String(todayAd.getMonth() + 1).padStart(2, "0")}-${String(todayAd.getDate()).padStart(2, "0")}`;
    const bsInstance = new BikramSambat(todayAdStr, "AD");
    const todayBs = bsInstance.toBS();


    const initialDate = defaultValue || todayBs;
    const [year, setYear] = useState(() => +initialDate.split("-")[0]);
    const [month, setMonth] = useState(() => +initialDate.split("-")[1]);
    const [day, setDay] = useState(() => +initialDate.split("-")[2]);

    const [open, setOpen] = useState(false);
    const pickerRef = useRef<HTMLDivElement>(null);

    const getDaysInMonth = (y: number, m: number) => {
        const bs = new BikramSambat(`${y}-${m}-1`, "BS");
        return bs["daysInBsMonth"](y, m);
    };

    const clampDay = (y: number, m: number, d: number) => {
        const max = getDaysInMonth(y, m);
        return Math.min(Math.max(1, d), max);
    };

    useEffect(() => {
        const bsDate = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
            2,
            "0"
        )}`;
        const adDate = convertBsToAdString(bsDate);
        onChange(bsDate, adDate);
    }, [year, month, day]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const daysInMonth = getDaysInMonth(year, month);
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const firstDayOfMonth = () => {
        const bsDate = `${year}-${String(month).padStart(2, "0")}-01`;
        const adDate = new Date(convertBsToAdString(bsDate || "") || "");
        return adDate.getDay() === 0 ? 7 : adDate.getDay();
    };

    const firstWeekday = firstDayOfMonth();

    const formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    const prevMonth = () => {
        let newMonth = month - 1;
        let newYear = year;
        if (newMonth < 1) {
            newMonth = 12;
            newYear -= 1;
        }
        const newDay = clampDay(newYear, newMonth, day);
        setYear(newYear);
        setMonth(newMonth);
        setDay(newDay);
    };

    const nextMonth = () => {
        let newMonth = month + 1;
        let newYear = year;
        if (newMonth > 12) {
            newMonth = 1;
            newYear += 1;
        }
        const newDay = clampDay(newYear, newMonth, day);
        setYear(newYear);
        setMonth(newMonth);
        setDay(newDay);
    };

    const prevYear = () => {
        const newYear = year - 1;
        const newDay = clampDay(newYear, month, day);
        setYear(newYear);
        setDay(newDay);
    };

    const nextYear = () => {
        const newYear = year + 1;
        const newDay = clampDay(newYear, month, day);
        setYear(newYear);
        setDay(newDay);
    };

    return (
        <div className="relative bg-white inline-block text-sm font-sans w-44" ref={pickerRef}>
            {/* {label && (
                <label
                    htmlFor="bs-date-input"
                    className="block mb-1 text-gray-700 text-xs font-semibold"
                >
                    {label}
                </label>
            )} */}
            <div className="relative">
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                    <CalendarDaysIcon className="h-4 w-4" />
                </span>
                <input
                    id="bs-date-input"
                    type="text"
                    readOnly
                    onClick={() => setOpen((v) => !v)}
                    value={formattedDate}
                    className="w-full cursor-pointer rounded border border-gray-300 px-2 py-1 pl-8 text-sm text-secondary focus:outline-none focus:ring-1 focus:ring-indigo-400"
                    aria-haspopup="true"
                    aria-expanded={open}
                />
            </div>

            {open && (
                <div
                    className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-300 rounded shadow-lg z-50 p-2 select-none"
                    role="dialog"
                    aria-modal="true"
                >
                    {/* Controls */}
                    <div className="flex justify-between items-center mb-2">
                        <button
                            type="button"
                            onClick={prevMonth}
                            className="p-1 hover:bg-gray-100 rounded"
                            aria-label="Previous Month"
                        >
                            ‹
                        </button>

                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={prevYear}
                                className="px-2 py-0.5 border border-gray-300 rounded hover:bg-gray-100"
                                aria-label="Previous Year"
                            >
                                −
                            </button>
                            <span className="font-semibold min-w-[3rem] text-center select-none">{year}</span>
                            <button
                                type="button"
                                onClick={nextYear}
                                className="px-2 py-0.5 border border-gray-300 rounded hover:bg-gray-100"
                                aria-label="Next Year"
                            >
                                +
                            </button>
                        </div>

                        <span className="font-semibold">{String(month).padStart(2, "0")}</span>

                        <button
                            type="button"
                            onClick={nextMonth}
                            className="p-1 hover:bg-gray-100 rounded"
                            aria-label="Next Month"
                        >
                            ›
                        </button>
                    </div>
                    {/* Weekday Labels */}
                    <div className="grid grid-cols-7 gap-1 text-xs text-center font-semibold text-gray-600 mb-1 select-none">
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((wd) => (
                            <div key={wd}>{wd}</div>
                        ))}
                    </div>
                    {/* Days grid */}
                    <div className="grid grid-cols-7 gap-1 text-center text-sm">
                        {/* Empty slots for previous month days */}
                        {Array.from({ length: firstWeekday - 1 }, (_, i) => (
                            <div key={"empty-" + i} />
                        ))}
                        {/* Actual days */}
                        {daysArray.map((d) => (
                            <button
                                key={d}
                                type="button"
                                onClick={() => {
                                    setDay(d);
                                    setOpen(false);
                                }}
                                className={`py-1 rounded hover:bg-indigo-100 focus:bg-indigo-200 ${d === day ? "bg-indigo-500 text-white font-semibold" : "text-gray-800"
                                    }`}
                                aria-current={d === day ? "date" : undefined}
                                aria-label={`Select day ${d}`}
                            >
                                {d}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BSDatePicker;
