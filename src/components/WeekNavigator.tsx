'use client';

import { addWeeks, endOfWeek, startOfWeek, format } from "date-fns";

interface Props {
    currentDate: Date;
    setCurrentDate: (date: Date) => void;
}

export default function WeekNavigator({currentDate, setCurrentDate}: Props) {
    const handlePrev = () => setCurrentDate(addWeeks(currentDate, -1));
    const handleNext = () => setCurrentDate(addWeeks(currentDate, 1));

    const start = startOfWeek(currentDate, { weekStartsOn: 0});
    const end = endOfWeek(currentDate, { weekStartsOn: 0});

    return (
        <div className="flex items-center justify-between mb-4">
            <button onClick={handlePrev} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
                &laquo; 前の週
            </button>

            <span className="text-lg font-semibold">
                {format(start, "M月d日")} ~ {format(end, "M月d日")}
            </span>

            <button onClick={handleNext} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
                次の週 &raquo;
            </button>
        </div>
    );
}