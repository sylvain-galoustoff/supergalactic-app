import { useEffect, useState } from "react";
import { useModalContext } from "../../context/ModalContext";
import AddEvent from "./Events/AddEvent";
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
  const { setBox } = useModalContext();
  const events = useSelector((state: RootState) => state.events);
  const [hasEvent, setHasEvent] = useState<EventType[]>([]);

  useEffect(() => {
    const cellTimestamp = getTime(new Date(year, month, day));
    const eventsOfTheDay = events.filter(
      (event) => Number(event.date) === Number(cellTimestamp)
    );
    setHasEvent(eventsOfTheDay);
  }, [day, month, year]);

  const handleAddEvent = () => {
    setBox(<AddEvent date={new Date(year, month, day)} />);
  };

  const renderEvents = hasEvent.map((_, index) => <EventIndicator key={index} />);

  return (
    <div className="day calendar-cell not-empty" onClick={handleAddEvent}>
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
