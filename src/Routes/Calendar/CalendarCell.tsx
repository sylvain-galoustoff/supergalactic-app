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
};

function CalendarCell({ day, month, year, today }: CalendarCellProps) {
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
    console.log("show event");
  };

  const renderEvents = hasEvent.map((_, index) => <EventIndicator key={index} />);

  return (
    <div className="day calendar-cell not-empty" onClick={handleShowEvent}>
      <p className={`day-number`}>
        <span>{day}</span>
      </p>
      {hasEvent && <div className="events-indicators">{renderEvents}</div>}
    </div>
  );
}

export default CalendarCell;
