'use client';

import { format, addDays } from 'date-fns';
import {ja} from 'date-fns/locale/ja';

interface Props {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
}

export default function DayNavigator({ currentDate, setCurrentDate }: Props) {
  const handlePrev = () => setCurrentDate(addDays(currentDate, -1));
  const handleNext = () => setCurrentDate(addDays(currentDate, 1));

  return (
    <div className="flex items-center justify-between mb-4">
      <button onClick={handlePrev} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
        &laquo; 前の日
      </button>

      <span className="text-lg font-semibold">
        {format(currentDate, 'yyyy年M月d日（E）', { locale: ja })}
      </span>

      <button onClick={handleNext} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
        次の日 &raquo;
      </button>
    </div>
  );
}
