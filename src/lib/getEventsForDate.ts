import { format } from 'date-fns';

export function getEventsForDate(date: Date): { time: string; title: string }[] {
    const key = `events-${format(date, 'yyyy-MM-dd')}`;
    const saved = localStorage.getItem(key);
    try {
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }
  