import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import { EventType } from "../../../models/event";
import EventCard from "./EventCard";
import NoEventCard from "./NoEventCard";
import { format } from "date-fns";

type EventsProps = {
  selectedDate: number | null;
};

function Events({ selectedDate }: EventsProps) {
  const events = useSelector((state: RootState) => state.events);
  const [dayEvents, setDayEvents] = useState<EventType[]>([]);
  const [dateString, setDateString] = useState("");

  useEffect(() => {
    const cellEvents = events.filter((event) => event.date === selectedDate);
    setDayEvents(cellEvents);

    if (selectedDate) {
      setDateString(format(new Date(selectedDate), "eeee do MMMM yyyy"));
    }
  }, [events, selectedDate]);

  const renderCards = dayEvents.map((event, index) => (
    <EventCard key={index} event={event} />
  ));

  return (
    <div id="events">
      <div id="events-list-header">
        <p className="help">Date sélectionée</p>
        <h4 className="black">{dateString}</h4>
      </div>
      {dayEvents.length > 0 ? renderCards : <NoEventCard />}
    </div>
  );
}

export default Events;
