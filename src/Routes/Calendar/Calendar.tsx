import { useState } from "react";
import PageHeader from "../../Components/ui/PageHeader/PageHeader";
import Toolbar from "../../Components/ui/Toolbar";
import CalendarGrid from "./CalendarGrid";
import Events from "./Events/Events";

function Calendar() {
  const [date, setDate] = useState(new Date());
  const [eventsTimestamp, setEventsTimestamp] = useState<number | null>(null);

  return (
    <main id="calendar">
      <PageHeader title="Calendrier" />
      <Toolbar />
      <div className="zone content-zone" id="calendar-zone">
        <CalendarGrid
          date={date}
          changeDate={(date) => setDate(date)}
          showEvents={(timestamp) => setEventsTimestamp(timestamp)}
        />
        <Events timestamp={eventsTimestamp} />
      </div>
    </main>
  );
}

export default Calendar;
