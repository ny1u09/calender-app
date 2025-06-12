'use client';

import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, format, isSameMonth } from 'date-fns';
import React from 'react';
import { useEffect, useState } from 'react';
import { getEventsForDate } from '@/lib/getEventsForDate';

interface Props {
  currentDate: Date;
}

export default function MonthView({ currentDate }: Props) {
  const [calendar, setCalendar] = useState<Date[][]>([]);

  useEffect(() => {
    const start = startOfWeek(startOfMonth(currentDate), { weekStartsOn: 0 });
    const end = endOfWeek(endOfMonth(currentDate), { weekStartsOn: 0 });

    const rows: Date[][] = [];
    let current = start;
    while (current <= end) {
      const week: Date[] = [];
      for (let i = 0; i < 7; i++) {
        week.push(current);
        current = addDays(current, 1);
      }
      rows.push(week);
    }

    setCalendar(rows);
  }, [currentDate]);

  return (
    <div className="grid grid-cols-7 gap-2">
      {['日', '月', '火', '水', '木', '金', '土'].map((day) => (
        <div key={day} className="text-center font-bold">
          {day}
        </div>
      ))}

      {calendar.map((week, i) => (
        <React.Fragment key={i}>
          {week.map((date, j) => {
            const events = getEventsForDate(date);
            return (
              <div
                key={j}
                className={`border p-1 min-h-[80px] ${isSameMonth(date, currentDate) ? 'bg-white' : 'bg-gray-100'}`}
              >
                <div className="text-xs font-semibold">{format(date, 'd')}</div>
                {events.slice(0, 2).map((event, idx) => (
                  <div key={idx} className="text-xs truncate text-blue-700">
                    {event.time} {event.title}
                  </div>
                ))}
                {events.length > 2 && <div className="text-xs text-gray-500">+{events.length - 2}件</div>}
              </div>
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
}
