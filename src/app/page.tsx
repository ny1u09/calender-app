'use client';

import { useState } from "react";
import MonthView from "@/components/MonthView";
import ViewSwitcher from "@/components/ViewSwitcher";
import WeekView from "@/components/WeekView";
import WeekNavigator from "@/components/WeekNavigator";
import MonthNavigator from "@/components/MonthNavigator";
import DayNavigator from "@/components/DayNavigator";
import DayView from "@/components/DayView";

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
          <MonthView currentDate={currentDate} />
        </>
      )}

      {view === 'week' && (
        <>
          <WeekNavigator currentDate={currentDate} setCurrentDate={setCurrentDate} />
          <WeekView date={currentDate} />
        </>
      )}

      {view === 'day' && (
        <>
          <DayNavigator currentDate={currentDate} setCurrentDate={setCurrentDate} />
          <DayView date={currentDate} />
        </>
      )}
    </main>
  );
}