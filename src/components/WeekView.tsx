'use client';

import { startOfWeek, addDays, format } from 'date-fns';
import { getEventsForDate } from '@/lib/getEventsForDate';

interface Props {
  date: Date;
}

export default function WeekView({ date }: Props) {
  const start = startOfWeek(date, { weekStartsOn: 0 });
  const days = Array.from({ length: 7 }, (_, i) => addDays(start, i));

  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map((date, idx) => {
        const events = getEventsForDate(date);
        return (
          <div key={idx} className="border p-2 min-h-[100px] bg-white">
            <div className="font-semibold text-sm">{format(date, 'M/d (E)', { locale: undefined })}</div>
            {events.length > 0 ? (
              <ul className="mt-1 space-y-1 text-sm">
                {events.slice(0, 3).map((event, i) => (
                  <li key={i} className="truncate text-blue-700">
                    {event.time} {event.title}
                  </li>
                ))}
                {events.length > 3 && (
                  <li className="text-xs text-gray-500">+{events.length - 3}件</li>
                )}
              </ul>
            ) : (
              <p className="text-xs text-gray-400 mt-1">予定なし</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
