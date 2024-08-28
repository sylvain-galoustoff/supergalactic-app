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
  date: Date;
  changeDate: (date: Date) => void;
  showEvents: (timestamp: number) => void;
};

function CalendarGrid({ date, changeDate, showEvents }: CalendarGridProps) {
  const [month, setMonth] = useState("Janvier");
  const [year, setYear] = useState("2024");
  const [offset, setOffset] = useState(0);
  const [fillers, setFillers] = useState(0);
  const [days, setDays] = useState(30);
  const today = getTime(new Date().setHours(0, 0, 0, 0));

  useEffect(() => {
    const monthStart = startOfMonth(date);
    const offsetStart = Number(format(monthStart, "i")) - 1;
    setOffset(offsetStart);

    const monthEnd = endOfMonth(date);
    const offsetEnd = 7 - Number(format(monthEnd, "i"));
    setFillers(offsetEnd);

    const daysInMonth = getDaysInMonth(date);
    setDays(daysInMonth);
  }, [date]);

  useEffect(() => {
    const monthString = format(date, "MMMM");
    setMonth(monthString);

    const yearString = format(date, "yyyy");
    setYear(yearString);
  }, []);

  const handleMonthChange = (newMonth: { [key: string]: string }) => {
    const newDate = new Date(Number(year), Number(newMonth.value) - 1, 1);
    changeDate(newDate);
  };

  const handleYearChange = (newYear: string) => {
    setYear(newYear);
    const formatMonth = format(date, "M");
    const newDate = new Date(Number(newYear), Number(formatMonth) - 1, 1);
    if (newYear.length === 4) {
      changeDate(newDate);
    }
  };

  const renderOffset = Array.from({ length: offset }, (_, i) => i + 1).map((index) => (
    <div key={index} className="day calendar-cell" />
  ));

  const renderDays = Array.from({ length: days }, (_, i) => i + 1).map((index) => (
    <CalendarCell
      key={index}
      day={index}
      month={getMonth(date)}
      year={getYear(date)}
      today={today}
      showEvents={showEvents}
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
