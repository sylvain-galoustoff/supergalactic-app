import { Select, InputField } from "simplegems";
import { monthSelectOption } from "./calendarConfig";
import { useEffect, useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  getDaysInMonth,
  getMonth,
  getYear,
  getTime,
} from "date-fns";
import CalendarCell from "./CalendarCell";

type CalendarGridProps = {
  selectedDate: number;
  today: number;
  changeSelectedDate: (timestamp: number) => void;
};

function CalendarGrid({ selectedDate, today, changeSelectedDate }: CalendarGridProps) {
  const [month, setMonth] = useState("Janvier");
  const [year, setYear] = useState("2024");
  const [offset, setOffset] = useState(0);
  const [fillers, setFillers] = useState(0);
  const [days, setDays] = useState(30);

  useEffect(() => {
    const monthStart = startOfMonth(selectedDate);
    const offsetStart = Number(format(monthStart, "i")) - 1;
    setOffset(offsetStart);

    const monthEnd = endOfMonth(selectedDate);
    const offsetEnd = 7 - Number(format(monthEnd, "i"));
    setFillers(offsetEnd);

    const daysInMonth = getDaysInMonth(selectedDate);
    setDays(daysInMonth);
  }, [selectedDate]);

  useEffect(() => {
    const monthString = format(selectedDate, "MMMM");
    setMonth(monthString);

    const yearString = format(selectedDate, "yyyy");
    setYear(yearString);
  }, []);

  const handleMonthChange = (newMonth: { [key: string]: string }) => {
    const newDate = new Date(Number(year), Number(newMonth.value) - 1, 1);
    changeSelectedDate(getTime(newDate));
  };

  const handleYearChange = (newYear: string) => {
    setYear(newYear);
    const formatMonth = format(selectedDate, "M");
    const newDate = new Date(Number(newYear), Number(formatMonth) - 1, 1);
    if (newYear.length === 4) {
      changeSelectedDate(getTime(newDate));
    }
  };

  const renderOffset = Array.from({ length: offset }, (_, i) => i + 1).map((index) => (
    <div key={index} className="day calendar-cell" />
  ));

  const renderDays = Array.from({ length: days }, (_, i) => i + 1).map((index) => (
    <CalendarCell
      key={index}
      day={index}
      month={getMonth(selectedDate)}
      year={getYear(selectedDate)}
      today={today}
    />
  ));

  const renderFillers = Array.from({ length: fillers }, (_, i) => i + 1).map((index) => (
    <div key={index} className="day calendar-cell" />
  ));

  return (
    <div id="grid">
      <div id="grid-month-selection">
        <div className="calendar-cell" id="month">
          <Select
            data={monthSelectOption}
            id="month-selector"
            defaultValue={month}
            onChange={handleMonthChange}
          />
        </div>
        <div className="calendar-cell" id="year">
          <InputField
            id="year-input"
            type="text"
            value={year}
            onChange={handleYearChange}
          />
        </div>
      </div>
      <div id="weekdays">
        <div className="weekday calendar-cell">Lun</div>
        <div className="weekday calendar-cell">Mar</div>
        <div className="weekday calendar-cell">Mer</div>
        <div className="weekday calendar-cell">Jeu</div>
        <div className="weekday calendar-cell">Ven</div>
        <div className="weekday calendar-cell">Sam</div>
        <div className="weekday calendar-cell">Dim</div>
      </div>
      <div id="days">
        {renderOffset}
        {renderDays}
        {renderFillers}
      </div>
    </div>
  );
}

export default CalendarGrid;
