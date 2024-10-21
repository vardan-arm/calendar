import {useState} from "react";
import {enUS, Locale} from 'date-fns/locale';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  subMonths,
  addMonths, isSameDay, isSameMonth
} from "date-fns";

function getWeekdays(locale: Locale) {
  const weekdays = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(2024, 0, i + 1); // Start with January 1st, 2024 (Monday)
    weekdays.push(format(day, 'EEE', {locale}));
  }
  return weekdays;
}

const Calendar = ({onDaySelect, locale = enUS}: {
  onDaySelect: (day: Date) => void;
  locale?: Locale
}) => {
  const today = new Date();

  const [selectedDay, setSelectedDay] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(today);
  const firstDayOfMonth = startOfMonth(currentMonth);
  const lastDayOfMonth = endOfMonth(currentMonth);
  const startDate = startOfWeek(firstDayOfMonth, {weekStartsOn: 1});
  const endDate = endOfWeek(lastDayOfMonth, {weekStartsOn: 1});

  const dateRange = eachDayOfInterval({start: startDate, end: endDate});

  const weekDays = getWeekdays(locale);

  const setPreviousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const setNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const handleDaySelect = (day: Date) => {
    setSelectedDay(day);

    onDaySelect(day);
  };

  const getDayClassName = (day: Date) => {
    let className = `p-1 sm:p-2 text-center flex justify-center items-center rounded-lg transition-colors 
        cursor-pointer hover:outline hover:outline-gray-400 
        dark:hover:bg-gray-700 dark:hover:outline dark:hover:outline-gray-400 `;

    if (isSameMonth(day, currentMonth)) {
      className +=
        'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 ';
    } else {
      className +=
        'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 ';
    }

    if (isSameDay(day, today)) {
      className += 'ring-1 ring-gray-500 ';
    }

    if (isSameDay(day, selectedDay)) {
      className += 'ring-1 ring-gray-400 dark:ring-gray-200 font-bold bg-gray-300 dark:bg-gray-600 ';
    }

    return className.trim();
  };

  return (
    <div
      className="w-full max-w-md mx-auto bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden transition-colors">
      <div className="p-2 sm:p-4">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={setPreviousMonth}
            className="p-1 sm:p-2 border-0 focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <div className="h-7 w-7 sm:h-6 sm:w-6 text-gray-600 dark:text-gray-400">&lt;</div>
          </button>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200 capitalize">
            {format(currentMonth, 'MMMM yyyy', {locale})}
          </h2>
          <button
            onClick={setNextMonth}
            className="p-1 sm:p-2 border-0 focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <div className="h-7 w-7 sm:h-6 sm:w-6 text-gray-600 dark:text-gray-400">&gt;</div>
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center capitalize">
          {weekDays.map((day) => (
            <div
              key={day}
              className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400"
            >
              {day}
            </div>
          ))}

          {dateRange.map((day) => (
            <div
              key={day.toISOString()}
              onClick={() => handleDaySelect(day)}
              className={`${getDayClassName(day)} h-10 md:h-14 md:w-14`}
            >
              <div className="text-xs sm:text-sm">{day.getDate()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Calendar;
