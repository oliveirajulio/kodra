import { useState } from 'react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  addDays, 
  isSameMonth, 
  isSameDay, 
  addMonths 
} from 'date-fns';

function useCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const changeMonth = (amount) => {
    setCurrentDate(addMonths(currentDate, amount));
  };

  const getDaysInMonth = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    
    const days = [];
    let day = startDate;
    
    while (day <= endDate) {
      days.push({
        date: day,
        isCurrentMonth: isSameMonth(day, monthStart)
      });
      day = addDays(day, 1);
    }
    
    return days;
  };

  return {
    currentDate,
    changeMonth,
    getDaysInMonth
  };
}

export default useCalendar;
