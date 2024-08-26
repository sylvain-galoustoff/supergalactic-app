import { useState } from "react";
import PageHeader from "../../Components/ui/PageHeader/PageHeader";
import Toolbar from "../../Components/ui/Toolbar";
import CalendarGrid from "./CalendarGrid";

function Calendar() {
  const [date, setDate] = useState(new Date());

  return (
    <main id="calendar">
      <PageHeader title="Calendrier" />
      <Toolbar />
      <div className="zone content-zone" id="calendar-zone">
        <CalendarGrid date={date} changeDate={(date) => setDate(date)} />
        <div id="events"></div>
      </div>
    </main>
  );
}

export default Calendar;
