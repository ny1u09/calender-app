'use client';

import { useState } from "react";
import Calendar from "@/components/Calender";
import ViewSwitcher from "@/components/ViewSwitcher";
import CalendarWeek from "@/components/CalendarWeek";
import WeekNavigator from "@/components/WeekNavigator";
import MonthNavigator from "@/components/MonthNavigator";
import DayNavigator from "@/components/DayNavigator";

export default function Homepage() {
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <main className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">カレンダー</h1>
      <ViewSwitcher currentView={view}  onChange={setView} />
      {view === 'month' && (
        <>
          <MonthNavigator currentDate={currentDate} setCurrentDate={setCurrentDate} />
          <Calendar date={currentDate} />
        </>
      )}

      {view === 'week' && (
        <>
          <WeekNavigator currentDate={currentDate} setCurrentDate={setCurrentDate} />
          <CalendarWeek date={currentDate} />
        </>
      )}

      {view === 'day' && (
        <>
          <DayNavigator currentDate={currentDate} setCurrentDate={setCurrentDate} />
          {/* ここに日表示の詳細を書く */}
          <div className="text-center text-gray-600">
            
          </div>
        </>
      )}
    </main>
  );
}