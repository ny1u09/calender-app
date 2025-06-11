'use client';

import { generateMonthCalendar } from "@/lib/CalendarUtils";
import { format, isSameMonth, isSameDay } from "date-fns";

interface Props {
  date: Date;
}

export default function Calendar({ date }: Props) {
  const weeks = generateMonthCalendar(date);

  return (
    <div className="grid grid-cols-7 border rounded-md overflow-hidden text-sm">
      {/* 曜日ヘッダー */}
      {['日', '月', '火', '水', '木', '金', '土'].map((day) => (
        <div key={day} className="bg-gray-100 p-2 text-center font-bold">
          {day}
        </div>
      ))}

      {/* 日付セル */}
      {weeks.flat().map((day, idx) => (
        <div
          key={idx}
          className={`p-2 h-20 border text-center ${
            isSameMonth(day, date) ? '' : 'text-gray-400'
          } ${isSameDay(day, new Date()) ? 'bg-blue-200 font-bold' : ''}`}
        >
          {format(day, 'd')}
        </div>
      ))}
    </div>
  );
}
