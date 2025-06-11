'use client';

import React from "react";
import { startOfWeek, addDays, format, isToday } from "date-fns";

interface Props {
  date: Date;
}

export default function CalendarWeek({ date }: Props) {
  const start = startOfWeek(date, { weekStartsOn: 0 });
  const days = Array.from({ length: 7 }, (_, i) => addDays(start, i));
  const hours = Array.from({ length: 12 }, (_, i) => `${i + 8}:00`);

  return (
    <div className="overflow-x-auto">
      <div className="grid grid-cols-8 min-w-[700px]">
        {/* 時間列 */}
        <div className="border bg-gray-100 text-sm text-center font-bold py-2">
          時間
        </div>
        {days.map((day, idx) => (
          <div
            key={idx}
            className={`border bg-gray-100 text-sm text-center font-bold py-2 ${
              isToday(day) ? "bg-blue-200" : ""
            }`}
          >
            {format(day, "M月d日 (E)")}
          </div>
        ))}

        {/* 時間ごとの行 */}
        {hours.map((hour, hIdx) => (
          <React.Fragment key={hIdx}>
            {/* 時間セル */}
            <div className="border text-xs text-center py-1 bg-gray-50">
              {hour}
            </div>

            {/* 各日の枠 */}
            {days.map((_, dIdx) => (
              <div
                key={`${hIdx}-${dIdx}`}
                className="border h-12 hover:bg-blue-50 cursor-pointer"
              />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
