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

  const handleAddEvent = () => {
    console.log("add event");
  };

  return (
    <div className="day calendar-cell" onClick={handleAddEvent}>
      <p>{dayNumber}</p>
      <div className="events-indicators">
        <span className="has-event"></span>
        <span className="has-event"></span>
        <span className="has-event"></span>
      </div>
    </div>
  );
}

export default CalendarCell;
