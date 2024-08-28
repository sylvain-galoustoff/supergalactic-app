import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import { EventType } from "../../../models/event";
import EventCard from "./EventCard";
import NoEventCard from "./NoEventCard";

type EventsProps = {
  selectedDate: number | null;
};

function Events({ selectedDate }: EventsProps) {
  const events = useSelector((state: RootState) => state.events);
  const [dayEvents, setDayEvents] = useState<EventType[]>([]);

  useEffect(() => {
    const cellEvents = events.filter((event) => event.date === selectedDate);
    setDayEvents(cellEvents);
  }, [events, selectedDate]);

  const renderCards = dayEvents.map((event, index) => (
    <EventCard key={index} event={event} />
  ));

  return <div id="events">{dayEvents.length > 0 ? renderCards : <NoEventCard />}</div>;
}

export default Events;
