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
  selectedDate: number;
  changeSelectedDate: (timestamp: number) => void;
};

function CalendarCell({
  day,
  month,
  year,
  today,
  selectedDate,
  changeSelectedDate,
}: CalendarCellProps) {
  const events = useSelector((state: RootState) => state.events);
  const [hasEvent, setHasEvent] = useState<EventType[]>([]);
  const cellTimestamp = getTime(new Date(year, month - 1, day));

  useEffect(() => {
    const cellTimestamp = getTime(new Date(year, month - 1, day));
    const eventsOfTheDay = events.filter(
      (event) => Number(event.date) === Number(cellTimestamp)
    );
    setHasEvent(eventsOfTheDay);
  }, [events, year, month, day]);

  const handleShowEvent = () => {
    changeSelectedDate(cellTimestamp);
  };

  const renderEvents = hasEvent.map((_, index) => <EventIndicator key={index} />);

  return (
    <div
      className={`day calendar-cell not-empty ${today === cellTimestamp && "today"} ${
        selectedDate === cellTimestamp && "selected"
      }`}
      onClick={handleShowEvent}
    >
      <p className="day-number">
        <span>{day}</span>
      </p>
      {hasEvent && <div className="events-indicators">{renderEvents}</div>}
    </div>
  );
}

export default CalendarCell;
