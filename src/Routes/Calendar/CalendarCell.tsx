import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getTime } from "date-fns";
import { EventType } from "../../models/event";
import EventIndicator from "./Events/EventIndicator";

type CalendarCellProps = {
  day: number;
  month: number;
  year: number;
  today: number;
  showEvents: (timestamp: number) => void;
};

function CalendarCell({ day, month, year, today, showEvents }: CalendarCellProps) {
  const events = useSelector((state: RootState) => state.events);
  const [hasEvent, setHasEvent] = useState<EventType[]>([]);

  useEffect(() => {
    const cellTimestamp = getTime(new Date(year, month, day));
    const eventsOfTheDay = events.filter(
      (event) => Number(event.date) === Number(cellTimestamp)
    );
    setHasEvent(eventsOfTheDay);
  }, [day, month, year]);

  const handleShowEvent = () => {
    const cellDate = new Date(year, month, day);
    const cellTimestamp = getTime(cellDate);
    showEvents(cellTimestamp);
  };

  const renderEvents = hasEvent.map((_, index) => <EventIndicator key={index} />);

  return (
    <div className="day calendar-cell not-empty" onClick={handleShowEvent}>
      <p
        className={`day-number ${
          today === getTime(new Date(year, month, day)) ? "today" : null
        }`}
      >
        <span>{day}</span>
      </p>
      {hasEvent && <div className="events-indicators">{renderEvents}</div>}
    </div>
  );
}

export default CalendarCell;
