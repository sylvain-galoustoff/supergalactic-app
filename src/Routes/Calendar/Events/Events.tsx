import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import { EventType } from "../../../models/event";
import EventCard from "./EventCard";
import NoEventCard from "./NoEventCard";
import { format } from "date-fns";

type EventsProps = {
  timestamp: number | null;
};

function Events({ timestamp }: EventsProps) {
  const events = useSelector((state: RootState) => state.events);
  const [dayEvents, setDayEvents] = useState<EventType[]>([]);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const cellEvents = events.filter((event) => event.date === timestamp);
    setDayEvents(cellEvents);

    if (timestamp) {
      setSelectedDate(format(new Date(timestamp), "eeee do MMMM yyyy"));
    }
  }, [events, timestamp]);

  const renderCards = dayEvents.map((event, index) => (
    <EventCard key={index} event={event} />
  ));

  return (
    <div id="events">
      {selectedDate && (
        <div id="events-list-header">
          <p className="help">Date sélectionée</p>
          <h4 className="black">{selectedDate}</h4>
        </div>
      )}
      {dayEvents.length > 0 ? renderCards : <NoEventCard />}
    </div>
  );
}

export default Events;
