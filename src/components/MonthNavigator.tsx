'use client';

import { addMonths, format } from "date-fns";

interface Props {
    currentDate: Date;
    setCurrentDate: (date: Date) => void;
}

export default function MonthNavigator({ currentDate, setCurrentDate }: Props) {
    const handlePrev = () => setCurrentDate(addMonths(currentDate, -1));
    const handleNext = () => setCurrentDate(addMonths(currentDate, 1));

    return (
        <div className="flex items-center justify-between mb-4">
            <button onClick={handlePrev} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
                &laquo; 前の月
            </button>

            <span className="text-lg font-semibold">
                {format(currentDate, "yyyy年M月")}
            </span>

            <button onClick={handleNext} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
                次の月 &raquo;
            </button>
        </div>
    );
}