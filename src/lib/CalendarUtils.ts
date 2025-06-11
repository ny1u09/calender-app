import { addDays, endOfMonth, endOfWeek, startOfMonth, startOfWeek } from "date-fns"

export const generateMonthCalendar = (currentDate: Date): Date[][] => {
    const start = startOfWeek(startOfMonth(currentDate), { weekStartsOn: 0});
    const end = endOfWeek(endOfMonth(currentDate), {weekStartsOn: 0});

    const weeks: Date[][] = [];
    let current = start;

    while (current <= end) {
        const week: Date[] = [];
        for(let i = 0; i < 7; i++) {
            week.push(current);
            current = addDays(current, 1);
        }
        weeks.push(week);
    }

    return weeks;
};