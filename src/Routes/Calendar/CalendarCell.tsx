import { getTime } from "date-fns/getTime";
import { useEffect } from "react";

type CalendarCellProps = {
  dayNumber: number;
  fullDate: Date;
};

function CalendarCell({ dayNumber, fullDate }: CalendarCellProps) {
  useEffect(() => {
    console.log(getTime(fullDate));
  });

  return <div className="day calendar-cell">{dayNumber}</div>;
}

export default CalendarCell;
