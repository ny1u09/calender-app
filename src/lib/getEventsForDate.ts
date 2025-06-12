export function getEventsForDate(date: Date): { time: string; title: string }[] {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      console.warn('Invalid date passed to getEventsForDate:', date);
      return [];
    }
    const key = `events-${date.toISOString().split('T')[0]}`;
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : [];
  }
  